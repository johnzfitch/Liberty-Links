/**
 * Liberty Links - Content Script
 * Cleans links on web pages in real-time
 */

(() => {
  'use strict';

  // Cache for cleaned URLs to avoid redundant API calls
  const cleanedUrlCache = new Map();
  const CACHE_MAX_SIZE = 1000;

  // Batch processing queue
  let batchQueue = [];
  let batchTimeout = null;
  const BATCH_DELAY = 50; // ms

  /**
   * Clean a single URL via background script
   */
  async function cleanUrl(url) {
    if (!url || !url.startsWith('http')) {
      return url;
    }

    // Check cache first
    if (cleanedUrlCache.has(url)) {
      return cleanedUrlCache.get(url);
    }

    try {
      const result = await chrome.runtime.sendMessage({
        type: 'cleanUrl',
        url: url
      });

      if (result && result.url) {
        // Cache the result
        if (cleanedUrlCache.size >= CACHE_MAX_SIZE) {
          // Remove oldest entry
          const firstKey = cleanedUrlCache.keys().next().value;
          cleanedUrlCache.delete(firstKey);
        }
        cleanedUrlCache.set(url, result.url);
        return result.url;
      }
    } catch (error) {
      // Extension context may have been invalidated
      console.debug('[Liberty Links] Error cleaning URL:', error);
    }

    return url;
  }

  /**
   * Process a batch of URLs
   */
  async function processBatch() {
    if (batchQueue.length === 0) return;

    const batch = batchQueue.splice(0, 100); // Process up to 100 at a time
    const urls = batch.map(item => item.url);

    try {
      const results = await chrome.runtime.sendMessage({
        type: 'cleanUrlBatch',
        urls: urls
      });

      if (results) {
        results.forEach((result, index) => {
          const { element, url: originalUrl } = batch[index];
          if (result && result.url && result.cleaned) {
            // Cache result
            cleanedUrlCache.set(originalUrl, result.url);
            // Update element
            if (element.href !== result.url) {
              element.href = result.url;
            }
          }
        });
      }
    } catch (error) {
      console.debug('[Liberty Links] Batch processing error:', error);
    }

    // Process remaining items
    if (batchQueue.length > 0) {
      batchTimeout = setTimeout(processBatch, BATCH_DELAY);
    }
  }

  /**
   * Queue a link for cleaning
   */
  function queueLinkForCleaning(element) {
    const url = element.href;
    if (!url || !url.startsWith('http')) return;

    // Check cache
    if (cleanedUrlCache.has(url)) {
      const cleanedUrl = cleanedUrlCache.get(url);
      if (element.href !== cleanedUrl) {
        element.href = cleanedUrl;
      }
      return;
    }

    // Add to batch queue
    batchQueue.push({ element, url });

    // Schedule batch processing
    if (!batchTimeout) {
      batchTimeout = setTimeout(() => {
        batchTimeout = null;
        processBatch();
      }, BATCH_DELAY);
    }
  }

  /**
   * Clean a single link element (synchronous fallback using cache)
   */
  async function cleanLink(element) {
    if (!element || !element.href) return;

    const url = element.href;
    if (!url.startsWith('http')) return;

    const cleanedUrl = await cleanUrl(url);
    if (cleanedUrl !== url) {
      element.href = cleanedUrl;
    }
  }

  /**
   * Process all links on the page
   */
  function processLinks() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      if (link.protocol && link.protocol.startsWith('http')) {
        queueLinkForCleaning(link);
      }
    });
  }

  /**
   * Remove tracking attributes from links
   */
  function removeTrackingAttributes(element) {
    // Remove ping attribute (used for tracking clicks)
    if (element.hasAttribute('ping')) {
      element.removeAttribute('ping');
    }

    // Remove data-* tracking attributes
    const trackingDataAttrs = [
      'data-click-id',
      'data-tracking',
      'data-ga',
      'data-analytics'
    ];
    trackingDataAttrs.forEach(attr => {
      if (element.hasAttribute(attr)) {
        element.removeAttribute(attr);
      }
    });

    // Remove onmousedown handlers (often used for tracking)
    if (element.hasAttribute('onmousedown')) {
      element.removeAttribute('onmousedown');
    }

    // Remove Google's jsaction attribute (used for click interception)
    if (element.hasAttribute('jsaction')) {
      const jsaction = element.getAttribute('jsaction');
      if (jsaction && jsaction.includes('click:')) {
        element.removeAttribute('jsaction');
      }
    }
  }

  /**
   * Handle a single link element
   */
  function handleLink(element) {
    if (!element || element.tagName !== 'A') return;
    if (!element.href || !element.protocol?.startsWith('http')) return;

    removeTrackingAttributes(element);
    queueLinkForCleaning(element);
  }

  /**
   * Set up MutationObserver for dynamic content
   */
  function setupObserver() {
    const seen = new WeakSet();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;

            // Process added link
            if (node.tagName === 'A' && !seen.has(node)) {
              seen.add(node);
              handleLink(node);
            }

            // Process links within added subtree
            if (node.querySelectorAll) {
              node.querySelectorAll('a[href]').forEach(link => {
                if (!seen.has(link)) {
                  seen.add(link);
                  handleLink(link);
                }
              });
            }
          });
        } else if (mutation.type === 'attributes') {
          if (mutation.target.tagName === 'A' && mutation.attributeName === 'href') {
            // Link href was modified
            seen.delete(mutation.target);
            handleLink(mutation.target);
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href']
    });

    return observer;
  }

  /**
   * Clean the current page URL (address bar)
   */
  async function cleanCurrentUrl() {
    const currentUrl = window.location.href;
    const cleanedUrl = await cleanUrl(currentUrl);

    if (cleanedUrl !== currentUrl) {
      // Update URL without reloading
      try {
        history.replaceState(history.state, '', cleanedUrl);
      } catch (error) {
        // Cross-origin or other security restriction
        console.debug('[Liberty Links] Could not update URL:', error);
      }
    }
  }

  /**
   * Handle messages from background script
   */
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
      case 'copyToClipboard':
        navigator.clipboard.writeText(message.text).then(() => {
          sendResponse({ success: true });
        }).catch(err => {
          console.error('[Liberty Links] Clipboard write failed:', err);
          sendResponse({ success: false });
        });
        return true;

      case 'reprocessPage':
        cleanedUrlCache.clear();
        processLinks();
        sendResponse({ success: true });
        break;
    }
  });

  /**
   * Initialize the content script
   */
  function init() {
    // Clean current page URL
    cleanCurrentUrl();

    // Process existing links
    processLinks();

    // Set up observer for dynamic content
    setupObserver();

    // Listen for History API changes
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setTimeout(cleanCurrentUrl, 0);
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
    };

    // Handle popstate events
    window.addEventListener('popstate', () => {
      setTimeout(cleanCurrentUrl, 0);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
