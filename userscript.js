// ==UserScript==
// @name        General URL Cleaner Revived (Maintained Fork)
// @namespace   https://github.com/YourUsername
// @author      Your Name (fork from dividedby)
// @description A maintained fork of dividedby's script. Cleans URLs with fixes for modern sites and enhanced tracking removal.
// @version     4.3.2
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
// @downloadURL https://update.greasyfork.org/scripts/432387/General%20URL%20Cleaner%20Revived.user.js
// @updateURL https://update.greasyfork.org/scripts/432387/General%20URL%20Cleaner%20Revived.meta.js
// ==/UserScript==

(() => {
  /*
   * Vars
   */

  const currHost = location.host;
  const currPath = location.pathname;
  const currSearch = location.search;

  const ebay = /^[a-z.]*\.?ebay(desc)?(\.[a-z]{2,3})?(\.[a-z]+)?$/;
  const amazon = /^[a-z.]*\.?amazon(\.[a-z]{2,3})?(\.[a-z]+)?$/;
  const google = /^[a-z.]*\.?google(\.[a-z]{2,3})?(\.[a-z]+)?$/;
  const target = /^[a-z.]*\.?target\.com$/;
  const bing = /^[a-z.]*\.?bing(\.[a-z]{2,3})?(\.[a-z]+)?$/;

  const amazonParams =
    /&?_?(encoding|ref|th|url|pf_rd_[^&#]*?|pd_rd_[^&#]*?|bbn|rw_html_to_wsrp|ref_|content-id)(=[^&#]*)?($|&)/g;
  const neweggParams = /&(cm_sp|icid|ignorebbr)(=[^&#]*)?($|&)/g;
  const imdbParams = /&(pf_rd_[a-z]|ref_)(=[^&#]*)?($|&)/g;
  const bingParams =
    /&(redig|toWww|ghpl|lq|ghc|ghsh|ghacc|go|qs|form|FORM|filt|pq|s[cpk]|qpvt|cvid)(=[^&#]*)?(?=$|&)/g;
  const youtubeParams =
    /&(feature|src_vid|annotation_id|[gh]l)(=[^&#]*)?($|&)/g;
  const ebayParams = /[?&](_(o?sacat|odkw|from|trksid)|rt)(=[^&#]*)?(?=&|$)/g;
  const twitterParams = /&(src|ref_src|ref_url|vertical|s)(=[^&#]*)?($|&)/g;
  const targetParams = /&(lnk|tref|searchTermRaw)(=[^&#]*)?($|&)/g;
  const facebookParams = /&(set)(=[^&#]*)?($|&)/g;
  const googleParams =
    /(?:&|^)(uact|iflsig|sxsrf|ved|source(id)?|s?ei|tab|tbo|h[ls]|n?um|ie|aqs|as_qdr|bav|bi[wh]|bs|bvm|cad|channel|complete|cp|s?client|d[pc]r|e(ch|msg|s_sm)|g(fe|ws)_rd|gpsrc|noj|btnG|o[eq]|p(si|bx|f|q)|rct|rlz|site|spell|tbas|usg|xhr|gs_[a-z]+)(=[^&#]*)?(?=$|&)/g;
  const linkedinParams =
    /&(eBP|refId|trackingId|trk|flagship3_search_srp_jobs|lipi|lici)(=[^&#]*)?($|&)/g;
  const etsyParams =
    /&(click_key|click_sum|ref|pro|frs|ga_order|ga_search_type|ga_view_type|ga_search_query|sts|organic_search_click|plkey)(=[^&#]*)?($|&)/g;
  const yahooParams = /&(guccounter|guce_referrer|guce_referrer_sig)(=[^&#]*)?($|&)/g;

  const trackerParamSet = new Set([
    "gclid",
    "fbclid",
    "msclkid",
    "igshid",
    "_hsmi",
    "_hsenc",
    "rb_clickid",
    "sc_channel",
    "gclsrc",
    "gpromocode",
    "gqt",
    "dclid",
    "gbraid",
    "wbraid",
    "gad_source",
    "gad_campaignid",
    "srsltid",
    "twclid",
    "yclid",
    "_ga",
    "_gl",
    "gdfms",
    "gdftrk",
    "gdffi",
    "_ke",
    "_kx",
    "_branch_match_id",
    "redirect_log_mongo_id",
    "redirect_mongo_id",
    "sb_referer_host",
    "mkwid",
    "pcrid",
    "ef_id",
    "s_kwcid",
    "dm_i",
    "epik",
    "ttclid",
    "ndclid",
    "sccid",
    "rtid",
    "irclickid",
    "vmcid",
    "campid",
    "toolid",
    "customid",
    "mkevt",
    "mkcid",
    "mkrid",
    "si",
    "is_from_webapp",
    "sender_device",
    "sender_web_id",
    "share_link_id"
  ]);

  const trackerPrefixList = [
    "utm_",
    "mc_",
    "pk_",
    "piwik_",
    "matomo_",
    "mtm_",
    "hsa_",
    "klar_",
    "tw_",
    "sms_",
    "trk_",
    "_bta"
  ];

  const cleanGoogle = createCleaner(googleParams);
  const cleanBing = createCleaner(bingParams);
  const cleanLinkedin = createCleaner(linkedinParams);
  const cleanEtsy = createCleaner(etsyParams);
  const cleanYahoo = createCleaner(yahooParams);
  const cleanTwitterParams = createCleaner(twitterParams);
  const cleanYoutube = createCleaner(youtubeParams);
  const cleanImdb = createCleaner(imdbParams);
  const cleanNewegg = createCleaner(neweggParams);
  const cleanFacebookParams = createCleaner(facebookParams);
  const cleanAmazonParams = createCleaner(amazonParams);
  const cleanEbayParams = createCleaner(ebayParams);
  const cleanTargetParams = createCleaner(targetParams);

  /*
   * Main
   */

  if (bing.test(currHost)) {
    setCurrUrl(cleanBing(currSearch));
    observe(parserAll);
    return;
  }

  if (currHost == "www.linkedin.com") {
    setCurrUrl(cleanLinkedin(currSearch));
    observe(parserAll);
    return;
  }

  if (currHost == "www.etsy.com") {
    setCurrUrl(cleanEtsy(currSearch));
    observe(parserAll);
    return;
  }

  if (currHost == "www.yahoo.com") {
    setCurrUrl(cleanYahoo(currSearch));
    observe(parserAll);
    return;
  }

  if (currHost === "www.youtube.com" || currHost === "m.youtube.com") {
    if (currPath === "/redirect") {
      location.href = cleanYoutubeRedir(currSearch);
    }

    if (currPath === "/watch") {
      setCurrUrl(cleanYoutube(currSearch));
    }

    observe(parserYoutube);
    return;
  }

  if (currHost === "www.instagram.com" || currHost === "m.instagram.com") {
    observe(parserAll);
    return;
  }

  if (currHost === "www.tiktok.com" || currHost === "m.tiktok.com") {
    observe(parserAll);
    return;
  }

  if (currHost === "youtu.be") {
    if (currSearch) {
      const params = new URLSearchParams(currSearch.slice(1));
      const t = params.get("t");
      const next = t ? "?t=" + encodeURIComponent(t) : "";
      if (currSearch !== next) {
        setCurrUrl(next || location.pathname);
      }
    }
    observe(parserAll);
    return;
  }

  if (currHost.endsWith(".newegg.com") || currHost.endsWith(".newegg.ca")) {
    if (currSearch) {
      setCurrUrl(cleanNewegg(currSearch));
    }

    observe(parserNewegg);
    return;
  }

  if (currHost === "www.imdb.com") {
    if (currSearch) {
      setCurrUrl(cleanImdb(currSearch));
    }

    observe(parserIMDB);
    onhashchange = deleteHash;
    return;
  }

  if (google.test(currHost)) {
    if (currPath === "/url" || currPath === "/imgres") {
      location.href = cleanGenericRedir(currSearch);
    }

    if (!currSearch && !/[&#]q=/.test(location.hash)) {
      return;
    }

    setCurrUrl(cleanGoogle(currPath + currSearch));
    changeState(googleInstant);

    if (currSearch.includes("tbm=isch")) {
      observe(parserGoogleImages);
    } else {
      observe(parserGoogle);
    }

    return;
  }

  if (ebay.test(currHost)) {
    if (currPath.includes("/itm/")) {
      setCurrUrl(cleanEbayItem(location));
    } else if (currSearch) {
      setCurrUrl(cleanEbayParams(currSearch));
    }

    observe(parserEbay);
    onhashchange = deleteHash;
    return;
  }

  if (target.test(currHost)) {
    if (currPath.includes("/p/")) {
      setCurrUrl(cleanTargetItemp(location));
    } else if (currSearch) {
      setCurrUrl(cleanTargetParams(currSearch));
    }

    observe(parserTarget);
    onhashchange = deleteHash;
    return;
  }

  if (amazon.test(currHost)) {
    if (currPath.includes("/dp/")) {
      setCurrUrl(cleanAmazonItemdp(location));
    } else if (currPath.includes("/gp/product")) {
      setCurrUrl(cleanAmazonItemgp(location));
    } else if (currSearch) {
      setCurrUrl(cleanAmazonParams(currSearch));
    }

    observe(parserAmazon);
    onhashchange = deleteHash;
    return;
  }

  if (currHost == "twitter.com" || currHost == "x.com") {
    if (currSearch) {
      setCurrUrl(cleanTwitterParams(currSearch));
    }

    observe(parserTwitter);
    return;
  }

  if (currHost == "www.facebook.com") {
    if (currSearch) {
      setCurrUrl(cleanFacebookParams(currSearch));
    }

    observe(parserFacebook);
    return;
  }

  if (currHost == "disqus.com") {
    observe(parserDisqus);
    return;
  }

  if (currHost === "app.getpocket.com") {
    observe(parserAll);
    return;
  }

  /*
   * Boilerplate functions
   */

  function setCurrUrl(url) {
    const current = location.pathname + location.search;
    const target = url.startsWith("?") ? (location.pathname + url) : url;
    if (current !== target) history.replaceState(null, "", target);
  }


  function deleteHash() {
    history.replaceState(null, "", location.pathname + location.search);
  }

  if (currHost === "www.reddit.com") {
    observe(parserAll);
    return;
  }

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
      node.querySelectorAll && node.querySelectorAll("a").forEach(handle);
    };

    document.querySelectorAll("a").forEach(handle);

    new MutationObserver(muts => muts.forEach(m => {
      if (m.type === "childList") {
        m.addedNodes && m.addedNodes.forEach(visit);
      } else if (m.type === "attributes" && m.target.tagName === "A") {
        if (m.attributeName === "href") {
          const last = lastProcessed.get(m.target);
          if (last === m.target.href) {
            return;
          }
        }
        revisit(m.target);
      }
    })).observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href", "onmousedown", "jsaction", "ping"]
    });
  }

  function googleInstant(url) {
    let parts = url.split("#");
    if (parts.length !== 2) {
      return url;
    }

    let hash = parts[1];
    if (hash === "imgrc=_") {
      return " ";
    }

    if (/(^|&)q=/.test(hash)) {
      return "?" + hash;
    }

    return "#" + hash;
  }

  function changeState(mod) {
    const { pushState: realPush, replaceState: realReplace } = history;

    history.pushState = function(state, title, url) {
      try {
        return realPush.apply(history, [state, title, mod(url)]);
      } catch {
        return realPush.apply(history, [state, title, url]);
      }
    };

    history.replaceState = function(state, title, url) {
      try {
        return realReplace.apply(history, [state, title, mod(url)]);
      } catch {
        return realReplace.apply(history, [state, title, url]);
      }
    };
  }

  /*
   * Link parsing functions
   */

  function parserAll(a) {
    let host = a.host;
    let path = a.pathname;

    if (google.test(host)) {
      if (path === "/imgres" || path === "/url") {
        const decoded = cleanGenericRedir(a.href);
        if (decoded && decoded !== a.href) {
          a.href = decoded;
        }
        if (a.search) {
          const cleaned = cleanUtm(a.search);
          if (cleaned !== a.search) {
            a.search = cleaned;
          }
        }
        if (a.hash) {
          const cleanedHash = cleanUtm(a.hash);
          if (cleanedHash !== a.hash) {
            a.hash = cleanedHash;
          }
        }
      } else if (a.search) {
        a.search = cleanGoogle(a.search);
      }
      return;
    }

    if (host === "www.youtube.com" || host === "m.youtube.com") {
      if (path === "/watch") {
        a.search = cleanYoutube(a.search);
      } else if (path === "/redirect") {
        a.href = cleanYoutubeRedir(a.search);
      }
      return;
    }

    if (host === "youtu.be") {
      if (a.search) {
        const p = new URLSearchParams(a.search);
        const t = p.get("t");
        a.search = t ? "?t=" + encodeURIComponent(t) : "";
      }
      return;
    }

    if (host === "getpocket.com") {
      if (path === "/redirect") {
        a.href = cleanPocketRedir(a.href);
      }
    }

    if (host === "www.reddit.com") {
      if (path === "/redirect") {
        const decoded = cleanGenericRedir(a.search);
        if (decoded && decoded !== a.href) {
          a.href = decoded;
        }
        if (a.search) {
          const cleaned = cleanUtm(a.search);
          if (cleaned !== a.search) {
            a.search = cleaned;
          }
        }
        if (a.hash) {
          const cleanedHash = cleanUtm(a.hash);
          if (cleanedHash !== a.hash) {
            a.hash = cleanedHash;
          }
        }
      }
      return;
    }

    parserAmazon(a);
    parserEbay(a);
    parserNewegg(a);
    parserIMDB(a);

    if (a.hasAttribute("ping")) {
      a.removeAttribute("ping");
    }
    a.removeAttribute("onmousedown");

    if (a.search) {
      a.search = cleanUtm(a.search);
    }

    if (a.hash) {
      a.hash = cleanUtm(a.hash);
    }
  }

  function parserGoogle(a) {
    a.removeAttribute("onmousedown");
    a.removeAttribute("ping");
    parserAll(a);
  }

  function parserGoogleImages(a) {
    let jsaction = a.getAttribute("jsaction");
    if (jsaction && jsaction.includes("down:irc.rl")) {
      // Removing jsaction prevents Google's JavaScript from interfering with link cleaning,
      // ensuring the cleaned href is used when the link is clicked.
      a.removeAttribute("jsaction");
    }

    a.removeAttribute("onmousedown");
    a.removeAttribute("ping");
    parserAll(a);
  }

  function parserYoutube(a) {
    parserAll(a);
    let text = a.innerText;
    let href = a.getAttribute("href");
    if (
      text === href ||
      (text.endsWith("...") && href.startsWith(text.slice(0, -3)))
    ) {
      a.innerText = href;
    }
  }

  function parserTarget(a) {
    if (!target.test(a.host)) {
      return;
    }

    if (a.pathname.includes("/p/")) {
      a.href = cleanTargetItemp(a);
    } else if (a.search) {
      a.search = cleanTargetParams(a.search);
    }
  }

  function stripAmazonRefFromPath(pathname) {
    return pathname.replace(/\/ref=[^/?#]*/g, "");
  }

  function parserAmazon(a) {
    if (!amazon.test(a.host)) {
      return;
    }

    if (a.pathname.includes("black-curtain-redirect.html")) {
      const decoded = cleanAmazonRedir(a.href);
      if (decoded && decoded !== a.href) {
        a.href = decoded;
      }
      if (a.pathname.includes("/dp/")) {
        a.href = cleanAmazonItemdp(a);
      } else if (a.pathname.includes("/gp/product")) {
        a.href = cleanAmazonItemgp(a);
      }
      if (a.search) {
        a.search = cleanAmazonParams(a.search);
      }
      return;
    } else if (a.pathname.includes("/dp/")) {
      a.href = cleanAmazonItemdp(a);
    } else if (a.pathname.includes("/gp/product")) {
      a.href = cleanAmazonItemgp(a);
    } else if (a.pathname.includes("/picassoRedirect")) {
      a.href = cleanGenericRedir(a.search);
      a.search = "";
    } else if (a.search) {
      a.search = cleanAmazonParams(a.search);
    }

    if (a.pathname.includes("/ref=")) {
      a.pathname = stripAmazonRefFromPath(a.pathname);
    }
  }

  function parserEbay(a) {
    if (!ebay.test(a.host)) {
      return;
    }

    if (a.pathname.includes("/itm/")) {
      a.href = cleanEbayItem(a);
    } else if (a.host.startsWith("pulsar.")) {
      a.href = cleanEbayPulsar(a.search);
    } else if (a.search) {
      a.search = cleanEbayParams(a.search);
    }
  }

  function parserNewegg(a) {
    if (!a.host.endsWith(".newegg.com") && !a.host.endsWith(".newegg.ca")) {
      return;
    }

    if (a.search && !a.pathname.includes("/marketplace/")) {
      a.search = cleanNewegg(a.search);
    }
  }

  function parserIMDB(a) {
    if (a.host === "www.imdb.com" && a.search) {
      a.search = cleanImdb(a.search);
    }
  }

  function parserTwitter(a) {
    if (a.host !== "t.co") {
      return;
    }

    let fake = "t.co" + a.pathname;
    let real = a.getAttribute("data-expanded-url");
    if (real) {
      a.href = real;
      a.removeAttribute("data-expanded-url");
      sessionStorage.setItem(fake, real);
      return;
    }

    if (!a.classList.contains("TwitterCard-container")) {
      return;
    }

    real = sessionStorage.getItem(fake);
    if (real) {
      a.href = real;
    }
  }

  function parserFacebook(a) {
    let onclick = a.getAttribute("onclick");
    if (!onclick || !onclick.startsWith("LinkshimAsyncLink")) {
      return;
    }

    if (a.host !== "l.facebook.com") {
      return;
    }

    a.href = cleanGenericRedir(a.search);
    a.removeAttribute("onclick");
    a.removeAttribute("onmouseover");
  }

  function parserDisqus(a) {
    if (a.host === "disq.us" && a.pathname === "/url") {
      a.href = a.href.replace(/\:.*/, "");
    }
    a.href = cleanGenericRedir(a.search);

    parserAll(a);
  }

  /*
   * URL string functions
   */
  function m(re, s) { const r = String(s || "").match(re); return r ? r[1] || r[0] : ""; }

  function createCleaner(paramRegex) {
    const flags = paramRegex.flags.includes("g") ? paramRegex.flags.replace(/g/g, "") : paramRegex.flags;
    const matcher = new RegExp(paramRegex.source, flags);
    return function(url) {
      if (!url || !url.includes("?")) return url;

      const hashIndex = url.indexOf("#");
      const hash = hashIndex !== -1 ? url.slice(hashIndex) : "";
      const beforeHash = hashIndex !== -1 ? url.slice(0, hashIndex) : url;
      const questionIndex = beforeHash.indexOf("?");
      if (questionIndex === -1) return url;

      const base = beforeHash.slice(0, questionIndex);
      const query = beforeHash.slice(questionIndex + 1);

      const kept = [];
      for (const param of query.split("&")) {
        if (!param) continue;
        matcher.lastIndex = 0;
        if (!matcher.test("&" + param)) {
          kept.push(param);
        }
      }

      const queryString = kept.length ? "?" + kept.join("&") : "";
      const result = base ? (queryString ? base + queryString : base) : queryString;
      return result + hash;
    };
  }

  function cleanTargetItemp(a) {
    // Keep `/p/<slug>/A-<id>`; drop junk between slug and /A-
    const p = a.pathname;
    const m = p.match(/^(.*?\/p\/[^/]+)(?:\/.*)?(\/A-[^/?#]+)(?:[/?#].*)?$/);
    return m ? (a.origin + m[1] + m[2] + a.hash) : a.href;
  }

  function cleanAmazonItemgp(a) {
    const item = m(/\/([A-Z0-9]{10})(?:[/?#]|$)/, a.pathname);
    return item ? (a.origin + "/gp/product/" + item + a.hash) : a.href;
  }

  function cleanAmazonItemdp(a) {
    const item = m(/\/dp\/([A-Z0-9]{10})(?:[/?#]|$)/, a.pathname);
    return item ? (a.origin + "/dp/" + item + a.hash) : a.href;
  }

  function cleanEbayItem(a) {
    const id = m(/\/([0-9]{12})(?:[/?#]|$)/, a.pathname);
    const orig = m(/[?&](orig_cvip=[^&]+)/, a.search);
    return id ? (a.origin + "/itm/" + id + (orig ? "?" + orig : "") + a.hash) : a.href;
  }

  function cleanEbayPulsar(url) {
    const id = m(/%7B%22mecs%22%3A%22([0-9]{12})/, url);
    return id ? (location.origin + "/itm/" + id) : url;
  }

  function cleanYoutubeRedir(url) {
    const q = m(/[?&]q=([^&]+)/, url);
    return q ? decodeURIComponent(q) : url;
  }

  function cleanAmazonRedir(url) {
    const r = m(/[?&]redirectUrl=([^&]+)/, url);
    return r ? decodeURIComponent(r) : url;
  }

  function cleanGenericRedir(url) {
    let current = String(url || "");
    if (!current) return current;
    const pattern = /[?&](?:new|img)?u(?:rl)?=([^&]+)/i;
    let iterations = 0;
    while (iterations < 5) {
      const match = current.match(pattern);
      if (!match || !match[1]) break;
      const decoded = decodeURIComponent(match[1]);
      if (!decoded || decoded === current) break;
      current = decoded;
      iterations += 1;
    }
    return current;
  }

  function cleanUtm(url) {
    if (!url) return url;
  
    const isHash = url.startsWith('#');
    if (isHash && !url.includes('?')) {
        return url;
    }
  
    const [pathPart, queryPart] = isHash ? url.substring(1).split('?') : [null, url];
    const query = queryPart || pathPart;
  
    if (!query) return url;
  
    const params = new URLSearchParams(query.startsWith('?') ? query.substring(1) : query);

    for (const key of [...params.keys()]) {
      const lowerKey = key.toLowerCase();
      if (trackerParamSet.has(lowerKey)) {
        params.delete(key);
        continue;
      }
      if (trackerPrefixList.some(prefix => lowerKey.startsWith(prefix))) {
        params.delete(key);
      }
    }
  
    const newParams = params.toString();
    const newQueryString = newParams ? '?' + newParams : '';
  
    if (isHash) {
      return '#' + (queryPart ? `${pathPart}${newQueryString}` : newQueryString);
    }
    return newQueryString;
  }

  function cleanPocketRedir(url) {
    return decodeURIComponent(
      url.replace("https://getpocket.com/redirect?url=", "")
    );
  }
})();
