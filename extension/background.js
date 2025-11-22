/**
 * Liberty Links - Background Service Worker
 * Cleans URLs during navigation
 */

import { compileProviders } from './rules.js';

// Compile providers on startup
const compiledProviders = compileProviders();

// Statistics tracking
let stats = {
  urlsCleaned: 0,
  parametersCleaned: 0,
  redirectsHandled: 0,
  blockedRequests: 0
};

// Load stats from storage
chrome.storage.local.get(['stats', 'enabled'], (result) => {
  if (result.stats) {
    stats = result.stats;
  }
});

// Extension enabled state
let extensionEnabled = true;

chrome.storage.local.get(['enabled'], (result) => {
  extensionEnabled = result.enabled !== false;
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.enabled) {
    extensionEnabled = changes.enabled.newValue !== false;
  }
});

/**
 * Find matching providers for a URL
 */
function findMatchingProviders(url) {
  const matches = [];

  for (const [name, provider] of Object.entries(compiledProviders)) {
    if (provider.urlPatternRegex.test(url)) {
      matches.push({ name, provider });
    }
  }

  return matches;
}

/**
 * Check if URL matches any exception pattern
 */
function isException(url, provider) {
  return provider.exceptionsRegex.some(regex => regex.test(url));
}

/**
 * Extract redirect URL if present
 */
function extractRedirect(url, provider) {
  for (const regex of provider.redirectionsRegex) {
    const match = url.match(regex);
    if (match && match[1]) {
      try {
        return decodeURIComponent(match[1]);
      } catch {
        return match[1];
      }
    }
  }
  return null;
}

/**
 * Clean query parameters from URL
 */
function cleanQueryParams(url, providers) {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const toDelete = [];
    let cleaned = 0;

    for (const [key] of params) {
      for (const { provider } of providers) {
        // Check rules
        if (provider.rulesRegex.some(regex => regex.test(key))) {
          toDelete.push(key);
          cleaned++;
          break;
        }

        // Check referral marketing (if enabled to remove)
        if (provider.referralMarketingRegex.some(regex => regex.test(key))) {
          toDelete.push(key);
          cleaned++;
          break;
        }
      }
    }

    // Delete matched parameters
    for (const key of toDelete) {
      params.delete(key);
    }

    urlObj.search = params.toString();

    return { url: urlObj.toString(), cleaned };
  } catch {
    return { url, cleaned: 0 };
  }
}

/**
 * Apply raw rules (path modifications)
 */
function applyRawRules(url, providers) {
  let modified = url;

  for (const { provider } of providers) {
    for (const regex of provider.rawRulesRegex) {
      modified = modified.replace(regex, '');
    }
  }

  return modified;
}

/**
 * Main URL cleaning function
 */
function cleanUrl(url) {
  if (!extensionEnabled) {
    return { url, cleaned: false, blocked: false };
  }

  const providers = findMatchingProviders(url);

  if (providers.length === 0) {
    return { url, cleaned: false, blocked: false };
  }

  // Check for complete provider blocking
  for (const { provider } of providers) {
    if (provider.completeProvider && !isException(url, provider)) {
      stats.blockedRequests++;
      saveStats();
      return { url: null, cleaned: false, blocked: true };
    }
  }

  // Filter out providers where URL matches an exception
  const applicableProviders = providers.filter(({ provider }) => !isException(url, provider));

  if (applicableProviders.length === 0) {
    return { url, cleaned: false, blocked: false };
  }

  let currentUrl = url;
  let wasCleaned = false;

  // Check for redirections first
  for (const { provider } of applicableProviders) {
    const redirect = extractRedirect(currentUrl, provider);
    if (redirect) {
      currentUrl = redirect;
      stats.redirectsHandled++;
      wasCleaned = true;
      break;
    }
  }

  // Apply raw rules (path cleaning)
  const afterRawRules = applyRawRules(currentUrl, applicableProviders);
  if (afterRawRules !== currentUrl) {
    currentUrl = afterRawRules;
    wasCleaned = true;
  }

  // Clean query parameters
  const { url: cleanedUrl, cleaned } = cleanQueryParams(currentUrl, applicableProviders);

  if (cleaned > 0) {
    stats.parametersCleaned += cleaned;
    wasCleaned = true;
  }

  if (wasCleaned) {
    stats.urlsCleaned++;
    saveStats();
  }

  return { url: cleanedUrl, cleaned: wasCleaned, blocked: false };
}

/**
 * Save statistics to storage
 */
function saveStats() {
  chrome.storage.local.set({ stats });
}

/**
 * Handle navigation events
 */
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) return; // Only main frame

  const { url: cleanedUrl, cleaned, blocked } = cleanUrl(details.url);

  if (blocked) {
    // Can't block in MV3 webNavigation, but we track it
    console.log('[Liberty Links] Would block:', details.url);
    return;
  }

  if (cleaned && cleanedUrl !== details.url) {
    // Redirect to cleaned URL
    chrome.tabs.update(details.tabId, { url: cleanedUrl });
  }
});

/**
 * Handle committed navigations (for address bar update)
 */
/**
 * Message handler for content script and popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'cleanUrl':
      const result = cleanUrl(message.url);
      sendResponse(result);
      break;

    case 'getStats':
      sendResponse(stats);
      break;

    case 'resetStats':
      stats = {
        urlsCleaned: 0,
        parametersCleaned: 0,
        redirectsHandled: 0,
        blockedRequests: 0
      };
      saveStats();
      sendResponse(stats);
      break;

    case 'setEnabled':
      extensionEnabled = message.enabled;
      chrome.storage.local.set({ enabled: message.enabled });
      sendResponse({ enabled: extensionEnabled });
      break;

    case 'getEnabled':
      sendResponse({ enabled: extensionEnabled });
      break;

    case 'cleanUrlBatch':
      const results = message.urls.map(url => cleanUrl(url));
      sendResponse(results);
      break;
  }

  return true; // Keep channel open for async response
});

/**
 * Context menu for manual URL cleaning
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'cleanLink',
    title: 'Clean this link with Liberty Links',
    contexts: ['link']
  });

  chrome.contextMenus.create({
    id: 'copyCleanLink',
    title: 'Copy cleaned link',
    contexts: ['link']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'cleanLink') {
    const { url: cleanedUrl, cleaned } = cleanUrl(info.linkUrl);
    if (cleaned) {
      chrome.tabs.create({ url: cleanedUrl });
    } else {
      chrome.tabs.create({ url: info.linkUrl });
    }
  } else if (info.menuItemId === 'copyCleanLink') {
    const { url: cleanedUrl } = cleanUrl(info.linkUrl);
    // Send to content script to copy
    chrome.tabs.sendMessage(tab.id, {
      type: 'copyToClipboard',
      text: cleanedUrl
    });
  }
});

console.log('[Liberty Links] Background service worker initialized');
