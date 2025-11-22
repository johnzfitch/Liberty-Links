/**
 * Liberty Links - Popup Script
 */

document.addEventListener('DOMContentLoaded', async () => {
  const enabledToggle = document.getElementById('enabled-toggle');
  const statusIndicator = document.getElementById('status-indicator');
  const urlsCleaned = document.getElementById('urls-cleaned');
  const paramsRemoved = document.getElementById('params-removed');
  const redirectsHandled = document.getElementById('redirects-handled');
  const blockedRequests = document.getElementById('blocked-requests');
  const cleanCurrentBtn = document.getElementById('clean-current');
  const reprocessBtn = document.getElementById('reprocess-page');
  const resetStatsBtn = document.getElementById('reset-stats');

  /**
   * Format large numbers
   */
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  /**
   * Update statistics display
   */
  function updateStats(stats) {
    urlsCleaned.textContent = formatNumber(stats.urlsCleaned || 0);
    paramsRemoved.textContent = formatNumber(stats.parametersCleaned || 0);
    redirectsHandled.textContent = formatNumber(stats.redirectsHandled || 0);
    blockedRequests.textContent = formatNumber(stats.blockedRequests || 0);
  }

  /**
   * Update enabled state display
   */
  function updateEnabledState(enabled) {
    enabledToggle.checked = enabled;
    if (enabled) {
      statusIndicator.classList.add('active');
      statusIndicator.classList.remove('inactive');
    } else {
      statusIndicator.classList.remove('active');
      statusIndicator.classList.add('inactive');
    }
  }

  // Load initial state
  try {
    const statsResult = await chrome.runtime.sendMessage({ type: 'getStats' });
    if (statsResult) {
      updateStats(statsResult);
    }

    const enabledResult = await chrome.runtime.sendMessage({ type: 'getEnabled' });
    if (enabledResult) {
      updateEnabledState(enabledResult.enabled);
    }
  } catch (error) {
    console.error('Error loading initial state:', error);
  }

  // Handle toggle change
  enabledToggle.addEventListener('change', async () => {
    try {
      const result = await chrome.runtime.sendMessage({
        type: 'setEnabled',
        enabled: enabledToggle.checked
      });
      if (result) {
        updateEnabledState(result.enabled);
      }
    } catch (error) {
      console.error('Error toggling enabled state:', error);
    }
  });

  // Clean current page URL
  cleanCurrentBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url) {
        const result = await chrome.runtime.sendMessage({
          type: 'cleanUrl',
          url: tab.url
        });

        if (result && result.cleaned && result.url !== tab.url) {
          await chrome.tabs.update(tab.id, { url: result.url });
          cleanCurrentBtn.textContent = 'URL Cleaned!';
          setTimeout(() => {
            cleanCurrentBtn.textContent = 'Clean Current Page URL';
          }, 2000);
        } else {
          cleanCurrentBtn.textContent = 'Already Clean';
          setTimeout(() => {
            cleanCurrentBtn.textContent = 'Clean Current Page URL';
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Error cleaning current URL:', error);
    }
  });

  // Reprocess page links
  reprocessBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        await chrome.tabs.sendMessage(tab.id, { type: 'reprocessPage' });
        reprocessBtn.textContent = 'Done!';
        setTimeout(() => {
          reprocessBtn.textContent = 'Reprocess All Links';
        }, 2000);
      }
    } catch (error) {
      console.error('Error reprocessing page:', error);
      reprocessBtn.textContent = 'Error';
      setTimeout(() => {
        reprocessBtn.textContent = 'Reprocess All Links';
      }, 2000);
    }
  });

  // Reset statistics
  resetStatsBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to reset all statistics?')) {
      try {
        const result = await chrome.runtime.sendMessage({ type: 'resetStats' });
        if (result) {
          updateStats(result);
          resetStatsBtn.textContent = 'Reset!';
          setTimeout(() => {
            resetStatsBtn.textContent = 'Reset Statistics';
          }, 2000);
        }
      } catch (error) {
        console.error('Error resetting stats:', error);
      }
    }
  });

  // Refresh stats periodically while popup is open
  setInterval(async () => {
    try {
      const result = await chrome.runtime.sendMessage({ type: 'getStats' });
      if (result) {
        updateStats(result);
      }
    } catch {
      // Ignore errors (popup may have closed)
    }
  }, 1000);
});
