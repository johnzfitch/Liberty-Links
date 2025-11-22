/**
 * Liberty Links - URL Cleaning Rules
 * Based on ClearURLs database with enhancements
 */

export const providers = {
  // Global rules applied to all URLs
  globalRules: {
    urlPattern: ".*",
    rules: [
      "(?:%3F)?utm(?:_[a-z_]*)?",
      "(?:%3F)?mtm(?:_[a-z_]*)?",
      "(?:%3F)?ga_[a-z_]+",
      "(?:%3F)?yclid",
      "(?:%3F)?_openstat",
      "(?:%3F)?fb_action_(?:types|ids)",
      "(?:%3F)?fb_(?:source|ref)",
      "(?:%3F)?fbclid",
      "(?:%3F)?action_(?:object|type|ref)_map",
      "(?:%3F)?gs_l",
      "(?:%3F)?mkt_tok",
      "(?:%3F)?hmb_(?:campaign|medium|source)",
      "(?:%3F)?gclid",
      "(?:%3F)?srsltid",
      "(?:%3F)?otm_[a-z_]*",
      "(?:%3F)?cmpid",
      "(?:%3F)?os_ehash",
      "(?:%3F)?_ga",
      "(?:%3F)?_gl",
      "(?:%3F)?__twitter_impression",
      "(?:%3F)?wt_?z?mc",
      "(?:%3F)?wtrid",
      "(?:%3F)?[a-z]?mc",
      "(?:%3F)?dclid",
      "Echobox",
      "(?:%3F)?spm",
      "(?:%3F)?vn(?:_[a-z]*)+",
      "(?:%3F)?tracking_source",
      "(?:%3F)?ceneo_spo",
      "(?:%3F)?itm_(?:campaign|medium|source)",
      "(?:%3F)?__hsfp",
      "(?:%3F)?__hssc",
      "(?:%3F)?__hstc",
      "(?:%3F)?_hsenc",
      "(?:%3F)?__s",
      "(?:%3F)?hsCtaTracking",
      "(?:%3F)?mc_(?:eid|cid|tc)",
      "(?:%3F)?ml_subscriber",
      "(?:%3F)?ml_subscriber_hash",
      "(?:%3F)?msclkid",
      "(?:%3F)?oly_anon_id",
      "(?:%3F)?oly_enc_id",
      "(?:%3F)?rb_clickid",
      "(?:%3F)?s_cid",
      "(?:%3F)?vero_conv",
      "(?:%3F)?vero_id",
      "(?:%3F)?wickedid",
      "(?:%3F)?twclid"
    ],
    referralMarketing: ["(?:%3F)?ref_?", "(?:%3F)?referrer"],
    exceptions: [
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?matrix\\.org\\/_matrix\\/",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?(?:cloudflare\\.com|prismic\\.io|tangerine\\.ca|gitlab\\.com)",
      "^https?:\\/\\/myaccount.google(?:\\.[a-z]{2,}){1,}",
      "^https?:\\/\\/accounts.google(?:\\.[a-z]{2,}){1,}",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?github\\.com",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?amazon(?:\\.[a-z]{2,}){1,}\\/message-us\\?"
    ]
  },

  // Amazon
  amazon: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?amazon(?:\\.[a-z]{2,}){1,}",
    rules: [
      "p[fd]_rd_[a-z]*",
      "qid",
      "srs?",
      "__mk_[a-z]{1,3}_[a-z]{1,3}",
      "spIA",
      "ms3_c",
      "[a-z%0-9]*ie",
      "refRID",
      "colii?d",
      "[^a-z%0-9]adId",
      "qualifier",
      "_encoding",
      "smid",
      "field-lbr_brands_browse-bin",
      "ref_?",
      "th",
      "sprefix",
      "crid",
      "keywords",
      "cv_ct_[a-z]+",
      "linkCode",
      "creativeASIN",
      "ascsubtag",
      "aaxitk",
      "hsa_cr_id",
      "sb-ci-[a-z]+",
      "rnid",
      "dchild",
      "camp",
      "creative",
      "content-id",
      "dib",
      "dib_tag",
      "social_share",
      "starsLeft",
      "skipTwisterOG"
    ],
    rawRules: ["\\/ref=[^/?]*"],
    referralMarketing: ["tag", "ascsubtag"],
    exceptions: [
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?amazon(?:\\.[a-z]{2,}){1,}\\/gp\\/.*?(?:redirector.html|cart\\/ajax-update.html|video\\/api\\/)",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?amazon(?:\\.[a-z]{2,}){1,}\\/(?:hz\\/reviews-render\\/ajax\\/|message-us\\?|s\\?)"
    ]
  },

  // Google
  google: {
    forceRedirection: true,
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?google(?:\\.[a-z]{2,}){1,}",
    rules: [
      "ved",
      "bi[a-z]*",
      "gfe_[a-z]*",
      "ei",
      "source",
      "gs_[a-z]*",
      "site",
      "oq",
      "esrc",
      "uact",
      "cd",
      "cad",
      "gws_[a-z]*",
      "atyp",
      "vet",
      "_u",
      "je",
      "dcr",
      "ie",
      "sei",
      "sa",
      "dpr",
      "btn[a-z]*",
      "usg",
      "aqs",
      "sourceid",
      "sxsrf",
      "rlz",
      "i-would-rather-use-firefox",
      "pcampaignid",
      "sca_(?:esv|upv)",
      "iflsig",
      "fbs",
      "ictx",
      "cshid"
    ],
    referralMarketing: ["referrer"],
    exceptions: [
      "^https?:\\/\\/mail\\.google\\.com\\/mail\\/u\\/",
      "^https?:\\/\\/accounts\\.google\\.com\\/o\\/oauth2\\/",
      "^https?:\\/\\/accounts\\.google\\.com\\/signin\\/oauth\\/",
      "^https?:\\/\\/(?:docs|accounts)\\.google(?:\\.[a-z]{2,}){1,}",
      "^https?:\\/\\/([a-z0-9-\\.])*(chat|drive)\\.google\\.com\\/videoplayback",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?google(?:\\.[a-z]{2,}){1,}(?:\\/upload)?\\/drive\\/",
      "^https?:\\/\\/news\\.google\\.com.*\\?hl=.",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?google(?:\\.[a-z]{2,}){1,}\\/(?:complete\\/search|setprefs|searchbyimage)",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?google(?:\\.[a-z]{2,}){1,}\\/(?:appsactivity|aclk\\?)",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?google(?:\\.[a-z]{2,}){1,}\\/safe[-]?browsing\\/([^&]+)"
    ],
    redirections: [
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?google(?:\\.[a-z]{2,}){1,}\\/url\\?.*?(?:url|q)=(https?[^&]+)",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?google(?:\\.[a-z]{2,}){1,}\\/.*?adurl=([^&]+)",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?google(?:\\.[a-z]{2,}){1,}\\/amp\\/s\\/([^&]+)"
    ]
  },

  // YouTube
  youtube: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?(youtube\\.com|youtu\\.be)",
    rules: ["feature", "gclid", "kw", "si", "pp"],
    exceptions: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?youtube\\.com\\/signin\\?.*?"],
    redirections: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?youtube\\.com\\/redirect?.*?q=([^&]*)"]
  },

  // Facebook
  facebook: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?facebook\\.com",
    rules: [
      "hc_[a-z_%\\[\\]0-9]*",
      "[a-z]*ref[a-z]*",
      "__tn__",
      "eid",
      "__(?:xts|cft)__(?:\\[|%5B)\\d(?:\\]|%5D)",
      "comment_tracking",
      "dti",
      "app",
      "video_source",
      "ftentidentifier",
      "pageid",
      "padding",
      "ls_ref",
      "action_history",
      "tracking",
      "referral_code",
      "referral_story_type",
      "eav",
      "sfnsn",
      "idorvanity",
      "wtsid",
      "rdc",
      "rdr",
      "paipv",
      "_nc_x",
      "_rdr",
      "mibextid"
    ],
    exceptions: [
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?facebook\\.com\\/.*?(plugins|ajax)\\/",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?facebook\\.com\\/dialog\\/(?:share|send)",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?facebook\\.com\\/groups\\/member_bio\\/bio_dialog\\/",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?facebook\\.com\\/photo\\.php\\?",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?facebook\\.com\\/privacy\\/specific_audience_selector_dialog\\/",
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?facebook\\.com\\/photo\\/download\\/"
    ],
    redirections: ["^https?:\\/\\/l[a-z]?\\.facebook\\.com/l\\.php\\?.*?u=(https?%3A%2F%2F[^&]*)"]
  },

  // Twitter/X
  twitter: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?twitter.com",
    rules: ["(?:ref_?)?src", "s", "cn", "ref_url", "t"],
    exceptions: ["^https?:\\/\\/twitter.com\\/i\\/redirect"]
  },

  x: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?x.com",
    rules: ["(?:ref_?)?src", "s", "cn", "ref_url", "t"],
    exceptions: ["^https?:\\/\\/x.com\\/i\\/redirect"]
  },

  // Reddit
  reddit: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?reddit.com",
    rules: [
      "%24deep_link",
      "\\$deep_link",
      "correlation_id",
      "ref_campaign",
      "ref_source",
      "%243p",
      "rdt",
      "\\$3p",
      "%24original_url",
      "\\$original_url",
      "_branch_match_id",
      "share_id"
    ],
    redirections: [
      "^https?:\\/\\/out\\.reddit\\.com\\/.*?url=([^&]*)",
      "^https?:\\/\\/click\\.redditmail\\.com\\/.*?url=([^&]*)"
    ]
  },

  // Instagram
  instagram: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?instagram\\.com",
    rules: ["igshid", "igsh"],
    redirections: [".*u=([^&]*)"]
  },

  // TikTok
  tiktok: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?tiktok\\.com",
    rules: [
      "u_code",
      "preview_pb",
      "_d",
      "_t",
      "_r",
      "timestamp",
      "user_id",
      "share_app_name",
      "share_iid",
      "source"
    ]
  },

  // LinkedIn
  linkedin: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?linkedin\\.com",
    rules: ["refId", "trk", "li[a-z]{2}", "trackingId"]
  },

  linkedinLearning: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?linkedin\\.com\\/learning",
    rules: ["u"]
  },

  // eBay
  ebay: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?ebay(?:\\.[a-z]{2,}){1,}",
    rules: ["_trkparms", "_trksid", "_from", "hash"],
    redirections: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?rover\\.ebay(?:\\.[a-z]{2,}){1,}\\/rover.*mpre=([^&]*)"]
  },

  // Bing
  bing: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?bing(?:\\.[a-z]{2,}){1,}",
    rules: ["cvid", "sk", "sp", "sc", "qs", "qp"],
    referralMarketing: ["form"],
    exceptions: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?bing(?:\\.[a-z]{2,}){1,}\\/WS\\/redirect\\/"]
  },

  // Spotify
  spotify: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?spotify\\.com",
    rules: ["si"]
  },

  // Netflix
  netflix: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?netflix.com",
    rules: ["trackId", "tctx", "jb[a-z]*?"]
  },

  // DuckDuckGo
  duckduckgo: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?duckduckgo\\.com",
    redirections: ["^https?:\\/\\/duckduckgo\\.com\\/l\\/.*?uddg=([^&]+)"]
  },

  // Twitch
  twitch: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?twitch\\.com",
    rules: ["tt_medium", "tt_content"]
  },

  // Medium
  medium: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?medium\\.com",
    rules: ["source"]
  },

  // NYTimes
  nytimes: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?nytimes\\.com",
    rules: ["smid"]
  },

  // IMDB
  imdb: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?imdb\\.com",
    rules: ["ref_", "pf_rd_[a-z]*"]
  },

  // AliExpress
  aliexpress: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?aliexpress(?:\\.[a-z]{2,}){1,}",
    rules: [
      "ws_ab_test",
      "btsid",
      "algo_expid",
      "algo_pvid",
      "gps-id",
      "scm[_a-z-]*",
      "cv",
      "af",
      "mall_affr",
      "sk",
      "dp",
      "terminal_id",
      "aff_request_id"
    ]
  },

  // Etsy
  etsy: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?etsy\\.com",
    rules: ["click_key", "click_sum", "organic_search_click"]
  },

  // Bilibili
  bilibili: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?bilibili\\.com",
    rules: [
      "callback",
      "spm_id_from",
      "from_source",
      "from",
      "seid",
      "mid",
      "share_source",
      "msource",
      "refer_from",
      "share_from",
      "share_medium",
      "share_plat",
      "share_tag",
      "share_session_id",
      "timestamp",
      "unique_k",
      "vd_source",
      "plat_id",
      "buvid",
      "is_story_h5",
      "up_id"
    ],
    exceptions: ["^https?:\\/\\/api\\.bilibili\\.com", "^https?:\\/\\/space\\.bilibili\\.com"]
  },

  // Weibo
  weibo: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?weibo\\.(cn|com)",
    rules: ["weibo_id", "dt_dapp"]
  },

  // Taobao
  taobao: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?taobao\\.com",
    rules: [
      "price",
      "sourceType",
      "suid",
      "ut_sk",
      "un",
      "share_crt_v",
      "sp_tk",
      "cpp",
      "shareurl",
      "short_name",
      "app",
      "scm[_a-z-]*",
      "pvid",
      "algo_expid",
      "algo_pvid",
      "ns",
      "abbucket",
      "ali_refid",
      "ali_trackid",
      "acm",
      "utparam",
      "pos",
      "abtest",
      "trackInfo",
      "utkn",
      "scene",
      "mytmenu",
      "turing_bucket",
      "lygClk",
      "impid",
      "bftTag",
      "bftRwd",
      "spm",
      "_u"
    ]
  },

  // Shopee
  shopee: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?shopee\\.(com|co\\.th|tw)",
    rules: ["publish_id", "sp_atk", "xptdk"]
  },

  // Lazada
  lazada: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?lazada\\.(com|co\\.th|co\\.id|com\\.my|com\\.ph|sg|vn)",
    rules: [
      "clickTrackInfo",
      "abid",
      "pvid",
      "ad_src",
      "spm",
      "src",
      "from",
      "scm",
      "pa",
      "pid_pvid",
      "did",
      "mp",
      "cid",
      "impsrc",
      "pos"
    ]
  },

  // Steam
  steampowered: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?steampowered\\.com",
    rules: ["snr"]
  },

  steamcommunity: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?steamcommunity\\.com",
    redirections: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?steamcommunity\\.com\\/linkfilter\\/\\?url=([^&]*)"]
  },

  // Pocket
  pocket: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?getpocket\\.com",
    redirections: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?getpocket\\.com.*url=([^&]*)"]
  },

  // VK
  vk: {
    urlPattern: "^https?:\\/\\/vk\\.com",
    redirections: ["^https?:\\/\\/vk\\.com\\/away\\.php\\?to=([^&]*)"]
  },

  // Disqus
  disqus: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?disq\\.us",
    rules: ["cuid"],
    redirections: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?disq\\.us\\/.*?url=([^&]*)%3A"]
  },

  // Tumblr
  tumblr: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?umblr\\.com",
    redirections: ["^https?:\\/\\/t\\.umblr\\.com\\/redirect\\?z=([^&]+)"]
  },

  // Messenger
  messenger: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?messenger\\.com",
    redirections: ["^https?:\\/\\/l\\.messenger\\.com\\/l\\.php\\?u=([^&]*)"]
  },

  // BBC
  bbc: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?bbc\\.com",
    rules: ["xtor", "at_[a-z_]+"]
  },

  // Forbes
  forbes: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?forbes\\.com",
    rules: ["sh"]
  },

  // Wired
  wired: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?wired\\.com",
    rules: ["intcid"]
  },

  // The Guardian
  theguardian: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?theguardian\\.com",
    rules: ["CMP"]
  },

  // Reuters
  reuters: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?reuters\\.com",
    rules: ["taid"]
  },

  // Flipkart
  flipkart: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?flipkart\\.com",
    rules: [
      "otracker.?",
      "ssid",
      "[cilp]id",
      "marketplace",
      "store",
      "srno",
      "ppn",
      "ppt",
      "fm",
      "collection-tab-name",
      "sattr\\[\\]",
      "p\\[\\]",
      "st",
      "qH",
      "hpid",
      "ctx",
      "nnc"
    ]
  },

  // Airbnb
  airbnb: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?airbnb\\.(com|ae|ca|co\\.in|co\\.nz|co\\.uk|co\\.za|com\\.au|com\\.mt|com\\.sg|de|gy|ie)",
    rules: ["federated_search_id", "search_type", "source", "source_impression_id"]
  },

  // Change.org
  changeOrg: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?change\\.org",
    rules: ["source_location", "psf_variant", "share_intent"]
  },

  // Goodreads
  goodreads: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?goodreads\\.com",
    rules: ["from_search", "from_srp", "qid", "rank", "ac"]
  },

  // Epic Games
  epicgames: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?epicgames\\.com",
    rules: ["epic_affiliate", "epic_gameId"]
  },

  // Best Buy
  bestbuy: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?bestbuy\\.com",
    rules: ["irclickid", "irgwc", "loc", "acampID", "mpid", "intl"]
  },

  // Walmart
  walmart: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?walmart\\.com",
    rules: ["u1", "ath[a-z]*"]
  },

  // Target
  target: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?target\\.com",
    rules: ["lnk", "tref", "searchTermRaw", "afid", "clkid", "ref"]
  },

  // Newegg
  newegg: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?newegg\\.(com|ca)",
    rules: ["cm_sp", "icid", "ignorebbr"]
  },

  // Yahoo
  yahoo: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?yahoo\\.com",
    rules: ["guccounter", "guce_referrer", "guce_referrer_sig"]
  },

  // MSN
  msn: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?msn\\.com",
    rules: ["cvid", "ocid"]
  },

  // Fiverr
  fiverr: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?fiverr\\.com",
    rules: ["context_referrer", "source", "ref_ctx_id", "funnel"]
  },

  // Giphy
  giphy: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?giphy\\.com",
    rules: ["ref"]
  },

  // 9GAG
  ninegag: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?9gag\\.com",
    rules: ["ref"],
    exceptions: ["^https?:\\/\\/comment-cdn\\.9gag\\.com\\/.*?comment-list.json\\?"]
  },

  // GitHub (limited cleaning)
  github: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?github\\.com",
    rules: ["email_token", "email_source"]
  },

  // Mozilla
  mozilla: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?mozilla\\.org",
    rules: ["src", "platform", "redirect_source"],
    exceptions: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?mozilla.org\\/api"]
  },

  // Thunderbird
  thunderbird: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?thunderbird\\.net",
    rules: ["src"]
  },

  // DeviantArt
  deviantart: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?deviantart\\.com",
    redirections: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?deviantart\\.com\\/.*?\\/outgoing\\?(.*)"]
  },

  // Yandex
  yandex: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?(?:yandex(?:\\.[a-z]{2,}){1,}|ya\\.ru)",
    rules: ["lr", "redircnt"]
  },

  // Indeed
  indeed: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?indeed\\.com",
    rules: ["from", "alid", "[a-z]*tk"],
    exceptions: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?indeed\\.com\\/rc\\/clk"]
  },

  // Apple
  apple: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?apple\\.com",
    rules: ["app", "ign-itsc[a-z]+"]
  },

  // TechCrunch
  techcrunch: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?techcrunch\\.com",
    rules: ["ncid", "sr", "sr_share", "guccounter", "guce_referrer", "guce_referrer_sig"]
  },

  // CNET
  cnet: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?cnet\\.com",
    rules: ["ftag"]
  },

  // Roblox
  roblox: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?roblox\\.com",
    rules: ["refPageId"]
  },

  // Ozon (Russian ecommerce)
  ozon: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?ozon\\.ru",
    rules: ["partner"]
  },

  // MercadoLibre
  mercadolibre: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?mercadoli[bv]re\\.com",
    rules: [
      "DEAL_ID",
      "L",
      "S",
      "T",
      "V",
      "pdp_filters",
      "position",
      "search_layout",
      "tracking_id",
      "type",
      "c_[_a-zA-Z]+",
      "me\\.[_a-zA-Z]+",
      "reco_[_a-zA-Z]+",
      "ad_click_id"
    ]
  },

  // Tokopedia
  tokopedia: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?tokopedia\\.com",
    rules: ["src", "trkid", "whid"],
    redirections: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?tokopedia\\.com\\/promo.*r=([^&]*)"]
  },

  // Xiaohongshu (Little Red Book)
  xiaohongshu: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?xiaohongshu\\.com",
    rules: [
      "xhsshare",
      "author_share",
      "type",
      "xsec_source",
      "share_from_user_hidden",
      "app_version",
      "ignoreEngage",
      "app_platform",
      "apptime",
      "appuid",
      "shareRedId",
      "share_id",
      "exSource",
      "verifyUuid",
      "verifyType",
      "verifyBiz"
    ],
    exceptions: ["^https?:\\/\\/edith\\.xiaohongshu\\.com\\/api\\/sns\\/web\\/v1\\/user\\/hover_card"]
  },

  // Complete provider blocking (ad/tracking domains)
  googlesyndication: {
    completeProvider: true,
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?googlesyndication\\.com"
  },

  doubleclick: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?doubleclick(?:\\.[a-z]{2,}){1,}",
    redirections: [
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?doubleclick(?:\\.[a-z]{2,}){1,}\\/.*?tag_for_child_directed_treatment=;%3F([^&]*)"
    ]
  },

  googleadservices: {
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?googleadservices\\.com",
    redirections: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?googleadservices\\.com\\/.*?adurl=([^&]*)"]
  },

  adtech: {
    completeProvider: true,
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?adtech(?:\\.[a-z]{2,}){1,}"
  },

  amazonAdsystem: {
    completeProvider: true,
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?amazon-adsystem(?:\\.[a-z]{2,}){1,}",
    exceptions: ["^https?:\\/\\/(?:[a-z0-9-]+\\.)*?amazon-adsystem(?:\\.[a-z]{2,}){1,}\\/v3\\/oor\\?"],
    redirections: [
      "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?amazon-adsystem(?:\\.[a-z]{2,}){1,}\\/x\\/c\\/.+?\\/([^&]+)"
    ]
  },

  flsNaAmazon: {
    completeProvider: true,
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?fls-na\\.amazon(?:\\.[a-z]{2,}){1,}"
  },

  youtubePagead: {
    completeProvider: true,
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?youtube\\.com\\/pagead"
  },

  youtubeApiads: {
    completeProvider: true,
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?youtube\\.com\\/api\\/stats\\/ads"
  },

  adsensecustomsearchads: {
    completeProvider: true,
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?adsensecustomsearchads(?:\\.[a-z]{2,}){1,}"
  },

  bfAd: {
    completeProvider: true,
    urlPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?bf-ad(?:\\.[a-z]{2,}){1,}"
  }
};

// Compile regex patterns for performance
export function compileProviders() {
  const compiled = {};

  for (const [name, provider] of Object.entries(providers)) {
    compiled[name] = {
      ...provider,
      urlPatternRegex: new RegExp(provider.urlPattern, 'i'),
      rulesRegex: provider.rules ? provider.rules.map(r => new RegExp(`^${r}$`, 'i')) : [],
      exceptionsRegex: provider.exceptions ? provider.exceptions.map(e => new RegExp(e, 'i')) : [],
      redirectionsRegex: provider.redirections ? provider.redirections.map(r => new RegExp(r, 'i')) : [],
      rawRulesRegex: provider.rawRules ? provider.rawRules.map(r => new RegExp(r, 'gi')) : [],
      referralMarketingRegex: provider.referralMarketing ? provider.referralMarketing.map(r => new RegExp(`^${r}$`, 'i')) : []
    };
  }

  return compiled;
}

export default providers;
