// ==UserScript==
// @name        General URL Cleaner Revived (Maintained Fork - Refactored)
// @namespace   https://github.com/YourUsername
// @author      Your Name (fork from dividedby)
// @description A maintained fork of dividedby's script. Cleans URLs with fixes for modern sites and enhanced tracking removal.
// @version     5.0.0
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     https://www.newegg.com/*
// @include     https://www.newegg.ca/*
// @include     /^https:\/\/[a-z.]*\.?bing(\.[a-z]{2,3})?(\.[a-z]+)?\/.*$/
// @include     https://www.youtube.com/*
// @include     /^https:\/\/m\.youtube\.com\/.*$/
// @include     /^https:\/\/youtu\.be\/.*$/
// @include     https://www.imdb.com/*
// @include     https://www.facebook.com/*
// @include     https://disqus.com/embed/comments/*
// @include     https://www.target.com/*
// @include     https://www.linkedin.com/*
// @include     https://www.etsy.com/*
// @include     https://www.yahoo.com/*
// @include     /^https:\/\/[a-z0-9.]*\.?amazon(\.[a-z0-9]{2,3})?(\.[a-z]+)?\/.*$/
// @include     /^https:\/\/[a-z0-9.]*\.?google(\.[a-z0-9]{2,3})?(\.[a-z]+)?\/.*$/
// @include     /^https:\/\/[a-z0-9.]*\.?ebay(desc)?(\.[a-z0-9]{2,3})?(\.[a-z]+)?\/.*$/
// @include     /^https:\/\/[a-z0-9.]*twitter.com\/.*$/
// @include     /^https:\/\/[a-z0-9.]*x\.com\/.*$/
// @include     https://www.instagram.com/*
// @include     https://www.tiktok.com/*
// @include     /^https:\/\/m\.tiktok\.com\/.*$/
// @include     https://www.reddit.com/*
// @exclude     /^https:\/\/[a-z0-9.]*\.?amazon(\.[a-z0-9]{2,3})?(\.[a-z]+)?\/(?:gp\/(?:cart|buy|css|legacy|your-account).*|sspa.*)$/
// @exclude     https://apis.google.com/*
// @exclude     https://accounts.google.com/*
// @exclude     https://support.google.com/*
// @exclude     https://www.google.com/recaptcha/*
// @exclude     https://hangouts.google.com/webchat/*
// @exclude     https://gsuite.google.com/*
// @exclude     https://calendar.google.com/*
// @exclude     https://docs.google.com/spreadsheets/*
// @exclude     https://takeout.google.com/*
// @run-at      document-idle
// ==/UserScript==

(() => {
  "use strict";

  // ============================================================================
  // CONFIGURATION: Provider definitions with performance optimizations
  // ============================================================================

  const PROVIDERS = {
    amazon: {
      test: (host) => /^[a-z0-9.]*\.?amazon(\.[a-z]{2,})?(\.[a-z]+)?$/.test(host),
      rules: ["pf_rd_", "pd_rd_", "ref_", "encoding", "th", "url", "bbn", "rw_html_to_wsrp", "content-id"],
      rawRules: [/\/ref=[^/?]*/g],
      parsers: ["Item_DP", "Item_GP", "Params"],
    },
    ebay: {
      test: (host) => /^[a-z0-9.]*\.?ebay(desc)?(\.[a-z]{2,})?(\.[a-z]+)?$/.test(host),
      rules: ["_sacat", "_odkw", "_from", "_trksid", "rt"],
      parsers: ["Item", "Params"],
    },
    google: {
      test: (host) => /^[a-z0-9.]*\.?google(\.[a-z]{2,})?(\.[a-z]+)?$/.test(host),
      rules: ["uact", "iflsig", "sxsrf", "ved", "source", "sei", "tab", "tbo", "hl", "num", "ie", "aqs", "bav", "biw", "bih", "bs", "bvm", "cad", "channel", "complete", "cp", "client", "dpr", "dcr", "ech", "emsg", "gfe_rd", "gws_rd", "gpsrc", "noj", "btnG", "oeq", "psi", "pf", "pq", "rct", "rlz", "site", "spell", "tbas", "usg", "xhr", "gs_l"],
      parsers: ["Redirect", "Params"],
      redirectPaths: ["/url", "/imgres"],
    },
    bing: {
      test: (host) => /^[a-z0-9.]*\.?bing(\.[a-z]{2,})?(\.[a-z]+)?$/.test(host),
      rules: ["redig", "toWww", "ghpl", "lq", "ghc", "ghsh", "ghacc", "go", "qs", "form", "FORM", "filt", "pq", "sc", "sk", "sp", "qpvt", "cvid"],
      parsers: ["Params"],
    },
    youtube: {
      test: (host) => /youtube\.com|youtu\.be/.test(host),
      rules: ["feature", "src_vid", "annotation_id", "gl", "hl"],
      parsers: ["Redirect", "Params"],
      redirectPaths: ["/redirect"],
      watchPath: "/watch",
    },
    newegg: {
      test: (host) => /newegg\.(com|ca)$/.test(host),
      rules: ["cm_sp", "icid", "ignorebbr"],
      parsers: ["Params"],
    },
    imdb: {
      test: (host) => host === "www.imdb.com",
      rules: ["pf_rd_", "ref_"],
      parsers: ["Params"],
    },
    facebook: {
      test: (host) => host === "www.facebook.com",
      rules: ["set", "hc_", "ref", "__tn__", "eid", "__xts__", "__cft__"],
      parsers: ["Params"],
    },
    twitter: {
      test: (host) => /^[a-z0-9.]*\.?twitter\.com$/.test(host),
      rules: ["src", "ref_src", "ref_url", "vertical", "s"],
      parsers: ["Params"],
    },
    x: {
      test: (host) => /^[a-z0-9.]*\.?x\.com$/.test(host),
      rules: ["src", "ref_src", "ref_url", "vertical", "s"],
      parsers: ["Params"],
    },
    instagram: {
      test: (host) => /instagram\.com$/.test(host),
      rules: ["igshid", "igsh"],
      parsers: ["Params"],
    },
    tiktok: {
      test: (host) => /tiktok\.com$/.test(host),
      rules: ["u_code", "preview_pb", "_d", "_t", "_r", "timestamp", "user_id"],
      parsers: ["Params"],
    },
    reddit: {
      test: (host) => /reddit\.com$/.test(host),
      rules: ["correlation_id", "ref_campaign", "ref_source", "rdt"],
      parsers: ["Redirect", "Params"],
      redirectPaths: ["/redirect"],
    },
    linkedin: {
      test: (host) => /linkedin\.com$/.test(host),
      rules: ["refId", "trk", "trackingId", "eBP", "lipi"],
      parsers: ["Params"],
    },
    etsy: {
      test: (host) => host === "www.etsy.com",
      rules: ["click_key", "click_sum", "ref", "pro", "frs", "organic_search_click"],
      parsers: ["Params"],
    },
    yahoo: {
      test: (host) => host === "www.yahoo.com",
      rules: ["guccounter", "guce_referrer", "guce_referrer_sig"],
      parsers: ["Params"],
    },
    target: {
      test: (host) => /target\.com$/.test(host),
      rules: ["lnk", "tref", "searchTermRaw"],
      parsers: ["Item_P", "Params"],
    },
    disqus: {
      test: (host) => host === "disqus.com",
      rules: [],
      parsers: [],
    },
    pocket: {
      test: (host) => /getpocket\.com$/.test(host),
      parsers: ["Redirect"],
      redirectPaths: ["/redirect"],
    },
  };

  // Global tracker parameters (high-performance compiled patterns)
  const GLOBAL_TRACKER_PARAMS = new Set([
    "gclid", "fbclid", "msclkid", "igshid", "_hsmi", "_hsenc",
    "rb_clickid", "sc_channel", "gclsrc", "gpromocode", "gqt",
    "dclid", "gbraid", "wbraid", "gad_source", "gad_campaignid",
    "srsltid", "twclid", "yclid", "_ga", "_gl", "gdfms", "gdftrk",
    "gdffi", "_ke", "_kx", "mkwid", "pcrid", "ef_id", "s_kwcid",
    "dm_i", "epik", "ttclid", "ndclid", "sccid", "rtid", "vmcid",
    "campid", "toolid", "customid", "mkevt", "mkcid", "mkrid"
  ]);

  const GLOBAL_TRACKER_PREFIXES = [
    "utm_", "mc_", "pk_", "piwik_", "matomo_", "mtm_",
    "hsa_", "klar_", "tw_", "sms_", "trk_", "_bta"
  ];

  // ============================================================================
  // REGEX CACHE: Pre-compiled patterns for performance
  // ============================================================================

  const regexCache = new Map();

  function getOrCompileRegex(pattern, flags = "") {
    const key = pattern + "|" + flags;
    if (!regexCache.has(key)) {
      regexCache.set(key, new RegExp(pattern, flags));
    }
    return regexCache.get(key);
  }

  // Pre-compile commonly used patterns
  const PATTERNS = {
    genericRedir: /[?&](?:new|img)?u(?:rl)?=([^&]+)/i,
    amazonItemDP: /\/dp\/([A-Z0-9]{10})(?:[/?#]|$)/,
    amazonItemGP: /\/([A-Z0-9]{10})(?:[/?#]|$)/,
    ebayItem: /\/([0-9]{12})(?:[/?#]|$)/,
    youtubeQ: /[?&]q=([^&]+)/,
    targetItem: /^(.*?\/p\/[^/]+)(?:\/.*)?(\/A-[^/?#]+)(?:[/?#].*)?$/,
    amazonRef: /\/ref=[^/?#]*/g,
    youtubeT: /[?&]t=([^&]+)/,
  };

  // ============================================================================
  // CORE LOGIC: Fast matching and cleaning
  // ============================================================================

  const currHost = location.host;
  const currPath = location.pathname;
  const currSearch = location.search;

  // Find matching provider
  let activeProvider = null;
  for (const [name, provider] of Object.entries(PROVIDERS)) {
    if (provider.test(currHost)) {
      activeProvider = { name, ...provider };
      break;
    }
  }

  // Check exceptions early for Amazon and Google
  if (activeProvider) {
    const fullUrl = location.href;
    if (activeProvider.name === "amazon" && /\/(?:gp\/(?:cart|buy|css|legacy|your-account)|sspa)/.test(fullUrl)) {
      return;
    }
    if (activeProvider.name === "google" && /(?:apis|accounts|support|calendar|takeout|recaptcha|gsuite)\.google\.com/.test(currHost)) {
      return;
    }
  }

  // Handle page load and set up observers
  if (activeProvider) {
    handleProvider(activeProvider);
  }

  // ============================================================================
  // PROVIDER HANDLERS
  // ============================================================================

  function handleProvider(provider) {
    switch (provider.name) {
      case "amazon":
        if (currPath.includes("/dp/")) {
          setCurrUrl(cleanAmazonItemDP(location));
        } else if (currPath.includes("/gp/product")) {
          setCurrUrl(cleanAmazonItemGP(location));
        } else if (currSearch) {
          setCurrUrl(cleanParamsByRules(currSearch, provider.rules));
        }
        observe(createAmazonParser(provider));
        break;

      case "ebay":
        if (currPath.includes("/itm/")) {
          setCurrUrl(cleanEbayItem(location));
        } else if (currSearch) {
          setCurrUrl(cleanParamsByRules(currSearch, provider.rules));
        }
        observe(createEbayParser(provider));
        onhashchange = deleteHash;
        break;

      case "google":
        if (currPath === "/url" || currPath === "/imgres") {
          location.href = cleanGenericRedir(currSearch);
        }
        if (!currSearch && !/[&#]q=/.test(location.hash)) {
          return;
        }
        setCurrUrl(cleanParamsByRules(currPath + currSearch, provider.rules));
        observe(createGoogleParser(provider));
        break;

      case "bing":
      case "linkedin":
      case "etsy":
      case "yahoo":
      case "newegg":
      case "imdb":
      case "facebook":
      case "twitter":
      case "x":
      case "instagram":
      case "tiktok":
      case "reddit":
        if (currSearch) {
          setCurrUrl(cleanParamsByRules(currSearch, provider.rules));
        }
        observe(createGenericParser(provider));
        break;

      case "youtube":
        if (currPath === "/redirect") {
          location.href = cleanYoutubeRedir(currSearch);
        }
        if (currPath === "/watch") {
          setCurrUrl(cleanParamsByRules(currSearch, provider.rules));
        }
        observe(createYoutubeParser(provider));
        break;

      case "target":
        if (currPath.includes("/p/")) {
          setCurrUrl(cleanTargetItem(location));
        } else if (currSearch) {
          setCurrUrl(cleanParamsByRules(currSearch, provider.rules));
        }
        observe(createTargetParser(provider));
        break;

      case "disqus":
        observe(createGenericParser(provider));
        break;

      case "pocket":
        observe(createPocketParser());
        break;
    }
  }

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  function setCurrUrl(url) {
    if (!url) return;
    const current = location.pathname + location.search;
    const target = url.startsWith("?") ? (location.pathname + url) : url;
    if (current !== target) {
      history.replaceState(null, "", target);
    }
  }

  function deleteHash() {
    history.replaceState(null, "", location.pathname + location.search);
  }

  function cleanParamsByRules(url, rules) {
    if (!url || !rules || rules.length === 0) return url;
    if (!url.includes("?")) return url;

    const [base, hash] = url.includes("#") ? url.split("#") : [url, ""];
    const [pathAndQuery] = base.split("?");
    const [, query] = base.split("?");

    if (!query) return url;

    const params = new URLSearchParams(query);
    const toDelete = [];

    for (const key of params.keys()) {
      const lowerKey = key.toLowerCase();

      // Check global trackers first
      if (GLOBAL_TRACKER_PARAMS.has(lowerKey)) {
        toDelete.push(key);
        continue;
      }

      // Check prefixes
      if (GLOBAL_TRACKER_PREFIXES.some(p => lowerKey.startsWith(p))) {
        toDelete.push(key);
        continue;
      }

      // Check provider-specific rules
      if (rules.some(rule => {
        const ruleLower = rule.toLowerCase();
        if (rule.includes("_")) {
          return lowerKey.startsWith(ruleLower);
        }
        return lowerKey === ruleLower || lowerKey.startsWith(ruleLower + "[");
      })) {
        toDelete.push(key);
      }
    }

    toDelete.forEach(key => params.delete(key));
    const newQuery = params.toString();
    const result = newQuery ? pathAndQuery + "?" + newQuery : pathAndQuery;
    return result + (hash ? "#" + hash : "");
  }

  function cleanGenericRedir(url) {
    let current = String(url || "");
    if (!current) return current;

    let iterations = 0;
    while (iterations < 5) {
      const match = current.match(PATTERNS.genericRedir);
      if (!match || !match[1]) break;

      try {
        const decoded = decodeURIComponent(match[1]);
        if (!decoded || decoded === current) break;
        current = decoded;
      } catch {
        break;
      }
      iterations++;
    }
    return current;
  }

  // ============================================================================
  // ITEM CLEANERS
  // ============================================================================

  function cleanAmazonItemDP(a) {
    const item = m(PATTERNS.amazonItemDP, a.pathname);
    return item ? (a.origin + "/dp/" + item + a.hash) : a.href;
  }

  function cleanAmazonItemGP(a) {
    const item = m(PATTERNS.amazonItemGP, a.pathname);
    return item ? (a.origin + "/gp/product/" + item + a.hash) : a.href;
  }

  function cleanEbayItem(a) {
    const id = m(PATTERNS.ebayItem, a.pathname);
    const orig = m(/[?&](orig_cvip=[^&]+)/, a.search);
    return id ? (a.origin + "/itm/" + id + (orig ? "?" + orig : "") + a.hash) : a.href;
  }

  function cleanTargetItem(a) {
    const p = a.pathname;
    const match = p.match(PATTERNS.targetItem);
    return match ? (a.origin + match[1] + match[2] + a.hash) : a.href;
  }

  function cleanYoutubeRedir(url) {
    const q = m(PATTERNS.youtubeQ, url);
    return q ? decodeURIComponent(q) : url;
  }

  // ============================================================================
  // PARSER FACTORIES
  // ============================================================================

  function createGenericParser(provider) {
    return (a) => {
      if (a.search) {
        a.search = cleanParamsByRules(a.search, provider.rules);
      }
      if (a.hash) {
        a.hash = cleanParamsByRules(a.hash, provider.rules);
      }
      a.removeAttribute("onmousedown");
      a.removeAttribute("ping");
    };
  }

  function createAmazonParser(provider) {
    return (a) => {
      if (!PROVIDERS.amazon.test(a.host)) return;

      if (a.pathname.includes("/dp/")) {
        a.href = cleanAmazonItemDP(a);
      } else if (a.pathname.includes("/gp/product")) {
        a.href = cleanAmazonItemGP(a);
      } else if (a.search) {
        a.search = cleanParamsByRules(a.search, provider.rules);
      }

      if (a.pathname.includes("/ref=")) {
        a.pathname = a.pathname.replace(PATTERNS.amazonRef, "");
      }
    };
  }

  function createEbayParser(provider) {
    return (a) => {
      if (!PROVIDERS.ebay.test(a.host)) return;

      if (a.pathname.includes("/itm/")) {
        a.href = cleanEbayItem(a);
      } else if (a.search) {
        a.search = cleanParamsByRules(a.search, provider.rules);
      }
    };
  }

  function createGoogleParser(provider) {
    return (a) => {
      if (!PROVIDERS.google.test(a.host)) return;

      if (a.pathname === "/imgres" || a.pathname === "/url") {
        const decoded = cleanGenericRedir(a.href);
        if (decoded && decoded !== a.href) {
          a.href = decoded;
        }
      } else if (a.search) {
        a.search = cleanParamsByRules(a.search, provider.rules);
      }

      a.removeAttribute("onmousedown");
      a.removeAttribute("ping");
      a.removeAttribute("jsaction");
    };
  }

  function createYoutubeParser(provider) {
    return (a) => {
      if (!PROVIDERS.youtube.test(a.host)) return;

      if (a.pathname === "/watch") {
        a.search = cleanParamsByRules(a.search, provider.rules);
      } else if (a.pathname === "/redirect") {
        a.href = cleanYoutubeRedir(a.search);
      }
    };
  }

  function createTargetParser(provider) {
    return (a) => {
      if (!PROVIDERS.target.test(a.host)) return;

      if (a.pathname.includes("/p/")) {
        a.href = cleanTargetItem(a);
      } else if (a.search) {
        a.search = cleanParamsByRules(a.search, provider.rules);
      }
    };
  }

  function createPocketParser() {
    return (a) => {
      if (a.pathname === "/redirect") {
        a.href = decodeURIComponent(a.href.replace("https://getpocket.com/redirect?url=", ""));
      }
    };
  }

  // ============================================================================
  // DOM OBSERVATION
  // ============================================================================

  function observe(parse) {
    const seen = new WeakSet();
    const lastProcessed = new WeakMap();

    const handle = (a) => {
      if (!a || seen.has(a)) return;
      if (a.protocol && a.protocol.startsWith("http")) {
        parse(a);
        lastProcessed.set(a, a.href);
      }
      seen.add(a);
    };

    const revisit = (a) => {
      if (!a) return;
      seen.delete(a);
      if (a.protocol && a.protocol.startsWith("http")) {
        parse(a);
        lastProcessed.set(a, a.href);
      }
      seen.add(a);
    };

    const visit = (node) => {
      if (node.nodeType !== 1) return;
      if (node.tagName === "A") handle(node);
      if (node.querySelectorAll) {
        node.querySelectorAll("a").forEach(handle);
      }
    };

    document.querySelectorAll("a").forEach(handle);

    new MutationObserver(muts => muts.forEach(m => {
      if (m.type === "childList") {
        m.addedNodes?.forEach(visit);
      } else if (m.type === "attributes" && m.target.tagName === "A" && m.attributeName === "href") {
        const last = lastProcessed.get(m.target);
        if (last !== m.target.href) {
          revisit(m.target);
        }
      }
    })).observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href", "onmousedown", "jsaction", "ping"]
    });
  }

  // ============================================================================
  // HELPERS
  // ============================================================================

  function m(re, s) {
    const r = String(s || "").match(re);
    return r ? r[1] || r[0] : "";
  }
})();
