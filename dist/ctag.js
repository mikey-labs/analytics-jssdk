"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/Command/Executor.ts
  var Executor = class {
    constructor(ctx) {
      this.factory = {};
      this.records = [];
      this.ctx = ctx;
    }
    addCommand(command, execute) {
      this.factory[command] = execute;
    }
    execute(command) {
      return __async(this, null, function* () {
        const [...record] = command;
        this.records.push(record);
        const [instruction, ...arg] = record;
        if (typeof instruction === "function") {
          instruction(this.ctx);
        } else {
          yield this.factory[instruction].execute(...arg);
        }
      });
    }
  };

  // src/Utils/AssignObjectFilterSource.ts
  function assignObjectFilterSource(source, target) {
    const mergeConfig = {};
    Object.keys(source).map((key) => {
      if (target.hasOwnProperty(key)) {
        mergeConfig[key] = target[key];
      }
    });
    return Object.assign(source, mergeConfig);
  }

  // node_modules/.pnpm/@zhengxy+use@0.0.7-beta.1/node_modules/@zhengxy/use/dist/index.esm.mjs
  var __async2 = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  var inBrowser = typeof window !== "undefined" && "onload" in window;
  var isSupportFetch = inBrowser && typeof window["fetch"] === "function";
  var isSupportFileReader = inBrowser && typeof window["FileReader"] !== "undefined";
  var isSafari = inBrowser && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
  var isIElt10 = inBrowser && /MSIE [1-9]\./.test(navigator.userAgent);
  var isSupportStorage = ((w) => {
    try {
      return inBrowser && typeof w.localStorage !== "undefined" && typeof w.sessionStorage !== "undefined";
    } catch (e) {
      return false;
    }
  })(window);
  var isMobile = inBrowser && "ontouchstart" in document.documentElement;
  var isSupportInterSectionObserver = inBrowser && "IntersectionObserver" in window;
  var isSupportPostMessage = inBrowser && typeof window.postMessage === "function";
  var object2Url = (obj) => {
    const res = [];
    for (let key in obj) {
      res.push(`${key}=${obj[key]}`);
    }
    return res.join("&");
  };
  var bindEventListener = function() {
    return function(element, event, handler, options = false) {
      if (element && event && handler) {
        if (document["addEventListener"]) {
          element.addEventListener(event, handler, options);
        } else {
          element.attachEvent("on" + event, handler);
        }
      }
    };
  }();
  var unbindEventListener = function() {
    return function(element, event, handler, options = false) {
      if (element && event) {
        if (document["removeEventListener"]) {
          element.removeEventListener(event, handler, options);
        } else {
          element.detachEvent("on" + event, handler);
        }
      }
    };
  }();
  var createHttpRequest = () => {
    return new XMLHttpRequest();
  };
  function fetchCaller(url, options) {
    return fetch(url, options).then((response) => __async2(this, null, function* () {
      var _a;
      if (response.status === 200) {
        const contentType = (_a = response.headers.get("content-type")) != null ? _a : "";
        if (contentType.includes(
          "application/json"
          /* json */
        ))
          return response.json();
        if (contentType.includes(
          "text/plain"
          /* text */
        ) || contentType.includes(
          "text/html"
          /* html */
        ))
          return response.text();
        return response.blob();
      } else {
        throw Error(yield response.text());
      }
    }));
  }
  function xmlHttpCaller(url, options) {
    const { method, body, headers, credentials, responseType } = options;
    return new Promise((resolve, reject) => {
      const request = createHttpRequest();
      request.open(method, url);
      for (let key in headers) {
        request.setRequestHeader(key, headers[key]);
      }
      request.withCredentials = credentials === "same-origin" || credentials === "include";
      request.send(body);
      request.responseType = responseType != null ? responseType : "";
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            switch (request.responseType) {
              case "":
              case "text":
                try {
                  const json = JSON.parse(request.responseText);
                  resolve(json);
                } catch (e) {
                  resolve(request.responseText);
                }
                break;
              case "document":
                resolve(request.responseXML);
                break;
              default:
                resolve(request.response);
                break;
            }
          } else {
            reject(request.response);
          }
        }
      };
    });
  }
  var getAjaxInstance = () => {
    return isSupportFetch ? fetchCaller : xmlHttpCaller;
  };
  var serializeBody = (body) => {
    if (Object.prototype.toString.call(body) === "[object Object]") {
      return JSON.stringify(body);
    } else {
      return body;
    }
  };
  var httpCaller = function(method, url, params = {}, config = {}) {
    const { credentials, headers, responseType } = config;
    const upperCaseMethod = method.toUpperCase();
    switch (upperCaseMethod) {
      case "GET":
        const querystring = object2Url(params);
        if (querystring) {
          url += (url.includes("?") ? "&" : "?") + querystring;
        }
        return getAjaxInstance()(url, {
          method,
          credentials,
          responseType,
          headers
        });
      default:
        return getAjaxInstance()(url, {
          method,
          credentials,
          responseType,
          body: serializeBody(params),
          headers
        });
    }
  };
  var _config;
  var _defaultFetchConfig;
  var _request;
  var request_get;
  _config = /* @__PURE__ */ new WeakMap();
  _defaultFetchConfig = /* @__PURE__ */ new WeakMap();
  _request = /* @__PURE__ */ new WeakSet();
  request_get = function() {
    if (inBrowser) {
      return httpCaller;
    } else {
      throw new Error("HttpRequest only browsers are supported.");
    }
  };
  function usePageVisibility(callback) {
    function visibilitychangeHandler() {
      callback == null ? void 0 : callback.call(this, document.visibilityState);
    }
    bindEventListener(window, "visibilitychange", visibilitychangeHandler);
    return {
      stop: unbindEventListener.bind(window, window, "visibilitychange", visibilitychangeHandler)
    };
  }
  var MethodKeys = {
    fullscreenEnabled: 0,
    fullscreenElement: 1,
    requestFullscreen: 2,
    exitFullscreen: 3,
    fullscreenchange: 4,
    fullscreenerror: 5
  };
  var WebkitMethods = [
    "webkitFullscreenEnabled",
    "webkitFullscreenElement",
    "webkitRequestFullscreen",
    "webkitExitFullscreen",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ];
  var MozMethods = [
    "mozFullScreenEnabled",
    "mozFullScreenElement",
    "mozRequestFullScreen",
    "mozCancelFullScreen",
    "mozfullscreenchange",
    "mozfullscreenerror"
  ];
  var MSMethods = [
    "msFullscreenEnabled",
    "msFullscreenElement",
    "msRequestFullscreen",
    "msExitFullscreen",
    "MSFullscreenChange",
    "MSFullscreenError"
  ];
  var vendor = "fullscreenEnabled" in document && Object.keys(MethodKeys) || WebkitMethods[0] in document && WebkitMethods || MozMethods[0] in document && MozMethods || MSMethods[0] in document && MSMethods || [];
  var _config2;
  _config2 = /* @__PURE__ */ new WeakMap();

  // src/TagManager/Trigger/TriggerBase.ts
  var TriggerBase = class {
    constructor(trackingId) {
      this.trackingId = trackingId;
    }
  };

  // src/TagManager/Trigger/StayDurationTrigger.ts
  var StayDurationTrigger = class extends TriggerBase {
    constructor(trackingId) {
      super(trackingId);
      this.time = Date.now();
    }
    stop() {
      var _a;
      (_a = this.stopper) == null ? void 0 : _a.call(this);
    }
    start() {
      this.stop();
      const { stop } = usePageVisibility((visibility) => {
        if (visibility === "hidden") {
          const timeValue = Date.now() - this.time;
          if (timeValue >= 1e3) {
            window.CQueue.push([
              "send",
              "timing",
              {
                timing_category: "page view",
                //计时类别
                timing_var: "time",
                //计时变量
                timing_value: timeValue,
                //计时时间
                timing_label: "stay duration"
                //计时标签
              },
              this.trackingId
            ]);
          }
        } else {
          this.time = Date.now();
        }
      });
      this.stopper = stop;
    }
  };

  // src/TagManager/Trigger/ExceptionReportTrigger.ts
  var ExceptionReportTrigger = class extends TriggerBase {
    constructor(trackingId) {
      super(trackingId);
    }
    start() {
    }
    stop() {
    }
  };

  // src/TagManager/Trigger/ScreenViewTrigger.ts
  var ScreenViewTrigger = class extends TriggerBase {
    //只发送一次
    constructor(trackingId) {
      super(trackingId);
      this.alreadySend = false;
    }
    start() {
      if (!this.alreadySend) {
        window.CQueue.push([
          "send",
          "screen_view",
          {
            page_name: document.title,
            screen_id: ""
          },
          this.trackingId
        ]);
        this.alreadySend = true;
      }
    }
    stop() {
    }
  };

  // src/TagManager/index.ts
  var TagManager = class {
    constructor(trackingId, baseInfo, options) {
      this.hTime = Date.now();
      this.config = {
        stay_duration: true,
        screen_view: true,
        exception_report: false,
        disable: false
      };
      this.trackingId = trackingId;
      this.baseInfo = baseInfo;
      this.triggers = {
        stay_duration: new StayDurationTrigger(trackingId),
        exception_report: new ExceptionReportTrigger(trackingId),
        screen_view: new ScreenViewTrigger(trackingId)
      };
      options && (this.config = assignObjectFilterSource(this.config, options));
    }
    setConfig(config) {
      this.config = assignObjectFilterSource(this.config, config);
      this.run(config);
    }
    setBaseInfo(baseInfo) {
      this.baseInfo = assignObjectFilterSource(this.baseInfo, baseInfo);
    }
    run(config = this.config) {
      const { stay_duration, exception_report, screen_view, disable } = config;
      if (disable) {
        this.stopAll();
        return;
      }
      if (screen_view) {
        this.triggers.screen_view.start();
      } else {
        this.triggers.screen_view.stop();
      }
      if (stay_duration) {
        this.triggers.stay_duration.start();
      } else {
        this.triggers.stay_duration.stop();
      }
      if (exception_report) {
        this.triggers.exception_report.start();
      } else {
        this.triggers.exception_report.stop();
      }
    }
    stopAll() {
      Object.keys(this.triggers).map((key) => {
        this.triggers[key].stop();
      });
    }
  };

  // src/Command/CommandBase.ts
  var CommandBase = class {
    constructor(ctx) {
      this.ctx = ctx;
    }
  };

  // src/Plugins/PluginBase.ts
  var PluginBase = class {
    constructor(options) {
    }
  };
  var PluginCore = class extends PluginBase {
    constructor(ctx) {
      super();
      this.ctx = ctx;
    }
  };

  // src/Core/Footprint/MurmurHash3.ts
  var MurmurHash3 = {
    "version": "2.1.2",
    "x86": {
      hash32: null,
      hash128: null
    },
    "x64": {
      hash128: null
    }
  };
  function _x86Multiply(m, n) {
    return (m & 65535) * n + (((m >>> 16) * n & 65535) << 16);
  }
  function _x86Rotl(m, n) {
    return m << n | m >>> 32 - n;
  }
  function _x86Fmix(h) {
    h ^= h >>> 16;
    h = _x86Multiply(h, 2246822507);
    h ^= h >>> 13;
    h = _x86Multiply(h, 3266489909);
    h ^= h >>> 16;
    return h;
  }
  function _x64Add(m, n) {
    m = [m[0] >>> 16, m[0] & 65535, m[1] >>> 16, m[1] & 65535];
    n = [n[0] >>> 16, n[0] & 65535, n[1] >>> 16, n[1] & 65535];
    let o = [0, 0, 0, 0];
    o[3] += m[3] + n[3];
    o[2] += o[3] >>> 16;
    o[3] &= 65535;
    o[2] += m[2] + n[2];
    o[1] += o[2] >>> 16;
    o[2] &= 65535;
    o[1] += m[1] + n[1];
    o[0] += o[1] >>> 16;
    o[1] &= 65535;
    o[0] += m[0] + n[0];
    o[0] &= 65535;
    return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
  }
  function _x64Multiply(m, n) {
    m = [m[0] >>> 16, m[0] & 65535, m[1] >>> 16, m[1] & 65535];
    n = [n[0] >>> 16, n[0] & 65535, n[1] >>> 16, n[1] & 65535];
    let o = [0, 0, 0, 0];
    o[3] += m[3] * n[3];
    o[2] += o[3] >>> 16;
    o[3] &= 65535;
    o[2] += m[2] * n[3];
    o[1] += o[2] >>> 16;
    o[2] &= 65535;
    o[2] += m[3] * n[2];
    o[1] += o[2] >>> 16;
    o[2] &= 65535;
    o[1] += m[1] * n[3];
    o[0] += o[1] >>> 16;
    o[1] &= 65535;
    o[1] += m[2] * n[2];
    o[0] += o[1] >>> 16;
    o[1] &= 65535;
    o[1] += m[3] * n[1];
    o[0] += o[1] >>> 16;
    o[1] &= 65535;
    o[0] += m[0] * n[3] + m[1] * n[2] + m[2] * n[1] + m[3] * n[0];
    o[0] &= 65535;
    return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
  }
  function _x64Rotl(m, n) {
    n %= 64;
    if (n === 32) {
      return [m[1], m[0]];
    } else if (n < 32) {
      return [m[0] << n | m[1] >>> 32 - n, m[1] << n | m[0] >>> 32 - n];
    } else {
      n -= 32;
      return [m[1] << n | m[0] >>> 32 - n, m[0] << n | m[1] >>> 32 - n];
    }
  }
  function _x64LeftShift(m, n) {
    n %= 64;
    if (n === 0) {
      return m;
    } else if (n < 32) {
      return [m[0] << n | m[1] >>> 32 - n, m[1] << n];
    } else {
      return [m[1] << n - 32, 0];
    }
  }
  function _x64Xor(m, n) {
    return [m[0] ^ n[0], m[1] ^ n[1]];
  }
  function _x64Fmix(h) {
    h = _x64Xor(h, [0, h[0] >>> 1]);
    h = _x64Multiply(h, [4283543511, 3981806797]);
    h = _x64Xor(h, [0, h[0] >>> 1]);
    h = _x64Multiply(h, [3301882366, 444984403]);
    h = _x64Xor(h, [0, h[0] >>> 1]);
    return h;
  }
  MurmurHash3.x86.hash32 = function(key, seed) {
    key = key || "";
    seed = seed || 0;
    let remainder = key.length % 4;
    let bytes = key.length - remainder;
    let h1 = seed;
    let k1 = 0;
    let c1 = 3432918353;
    let c2 = 461845907;
    let i;
    for (i = 0; i < bytes; i = i + 4) {
      k1 = key.charCodeAt(i) & 255 | (key.charCodeAt(i + 1) & 255) << 8 | (key.charCodeAt(i + 2) & 255) << 16 | (key.charCodeAt(i + 3) & 255) << 24;
      k1 = _x86Multiply(k1, c1);
      k1 = _x86Rotl(k1, 15);
      k1 = _x86Multiply(k1, c2);
      h1 ^= k1;
      h1 = _x86Rotl(h1, 13);
      h1 = _x86Multiply(h1, 5) + 3864292196;
    }
    k1 = 0;
    switch (remainder) {
      case 3:
        k1 ^= (key.charCodeAt(i + 2) & 255) << 16;
      case 2:
        k1 ^= (key.charCodeAt(i + 1) & 255) << 8;
      case 1:
        k1 ^= key.charCodeAt(i) & 255;
        k1 = _x86Multiply(k1, c1);
        k1 = _x86Rotl(k1, 15);
        k1 = _x86Multiply(k1, c2);
        h1 ^= k1;
    }
    h1 ^= key.length;
    h1 = _x86Fmix(h1);
    return h1 >>> 0;
  };
  MurmurHash3.x86.hash128 = function(key, seed) {
    key = key || "";
    seed = seed || 0;
    let remainder = key.length % 16;
    let bytes = key.length - remainder;
    let h1 = seed;
    let h2 = seed;
    let h3 = seed;
    let h4 = seed;
    let k1 = 0;
    let k2 = 0;
    let k3 = 0;
    let k4 = 0;
    let c1 = 597399067;
    let c2 = 2869860233;
    let c3 = 951274213;
    let c4 = 2716044179;
    let i;
    for (i = 0; i < bytes; i = i + 16) {
      k1 = key.charCodeAt(i) & 255 | (key.charCodeAt(i + 1) & 255) << 8 | (key.charCodeAt(i + 2) & 255) << 16 | (key.charCodeAt(i + 3) & 255) << 24;
      k2 = key.charCodeAt(i + 4) & 255 | (key.charCodeAt(i + 5) & 255) << 8 | (key.charCodeAt(i + 6) & 255) << 16 | (key.charCodeAt(i + 7) & 255) << 24;
      k3 = key.charCodeAt(i + 8) & 255 | (key.charCodeAt(i + 9) & 255) << 8 | (key.charCodeAt(i + 10) & 255) << 16 | (key.charCodeAt(i + 11) & 255) << 24;
      k4 = key.charCodeAt(i + 12) & 255 | (key.charCodeAt(i + 13) & 255) << 8 | (key.charCodeAt(i + 14) & 255) << 16 | (key.charCodeAt(i + 15) & 255) << 24;
      k1 = _x86Multiply(k1, c1);
      k1 = _x86Rotl(k1, 15);
      k1 = _x86Multiply(k1, c2);
      h1 ^= k1;
      h1 = _x86Rotl(h1, 19);
      h1 += h2;
      h1 = _x86Multiply(h1, 5) + 1444728091;
      k2 = _x86Multiply(k2, c2);
      k2 = _x86Rotl(k2, 16);
      k2 = _x86Multiply(k2, c3);
      h2 ^= k2;
      h2 = _x86Rotl(h2, 17);
      h2 += h3;
      h2 = _x86Multiply(h2, 5) + 197830471;
      k3 = _x86Multiply(k3, c3);
      k3 = _x86Rotl(k3, 17);
      k3 = _x86Multiply(k3, c4);
      h3 ^= k3;
      h3 = _x86Rotl(h3, 15);
      h3 += h4;
      h3 = _x86Multiply(h3, 5) + 2530024501;
      k4 = _x86Multiply(k4, c4);
      k4 = _x86Rotl(k4, 18);
      k4 = _x86Multiply(k4, c1);
      h4 ^= k4;
      h4 = _x86Rotl(h4, 13);
      h4 += h1;
      h4 = _x86Multiply(h4, 5) + 850148119;
    }
    k1 = 0;
    k2 = 0;
    k3 = 0;
    k4 = 0;
    switch (remainder) {
      case 15:
        k4 ^= key.charCodeAt(i + 14) << 16;
      case 14:
        k4 ^= key.charCodeAt(i + 13) << 8;
      case 13:
        k4 ^= key.charCodeAt(i + 12);
        k4 = _x86Multiply(k4, c4);
        k4 = _x86Rotl(k4, 18);
        k4 = _x86Multiply(k4, c1);
        h4 ^= k4;
      case 12:
        k3 ^= key.charCodeAt(i + 11) << 24;
      case 11:
        k3 ^= key.charCodeAt(i + 10) << 16;
      case 10:
        k3 ^= key.charCodeAt(i + 9) << 8;
      case 9:
        k3 ^= key.charCodeAt(i + 8);
        k3 = _x86Multiply(k3, c3);
        k3 = _x86Rotl(k3, 17);
        k3 = _x86Multiply(k3, c4);
        h3 ^= k3;
      case 8:
        k2 ^= key.charCodeAt(i + 7) << 24;
      case 7:
        k2 ^= key.charCodeAt(i + 6) << 16;
      case 6:
        k2 ^= key.charCodeAt(i + 5) << 8;
      case 5:
        k2 ^= key.charCodeAt(i + 4);
        k2 = _x86Multiply(k2, c2);
        k2 = _x86Rotl(k2, 16);
        k2 = _x86Multiply(k2, c3);
        h2 ^= k2;
      case 4:
        k1 ^= key.charCodeAt(i + 3) << 24;
      case 3:
        k1 ^= key.charCodeAt(i + 2) << 16;
      case 2:
        k1 ^= key.charCodeAt(i + 1) << 8;
      case 1:
        k1 ^= key.charCodeAt(i);
        k1 = _x86Multiply(k1, c1);
        k1 = _x86Rotl(k1, 15);
        k1 = _x86Multiply(k1, c2);
        h1 ^= k1;
    }
    h1 ^= key.length;
    h2 ^= key.length;
    h3 ^= key.length;
    h4 ^= key.length;
    h1 += h2;
    h1 += h3;
    h1 += h4;
    h2 += h1;
    h3 += h1;
    h4 += h1;
    h1 = _x86Fmix(h1);
    h2 = _x86Fmix(h2);
    h3 = _x86Fmix(h3);
    h4 = _x86Fmix(h4);
    h1 += h2;
    h1 += h3;
    h1 += h4;
    h2 += h1;
    h3 += h1;
    h4 += h1;
    return ("00000000" + (h1 >>> 0).toString(16)).slice(-8) + ("00000000" + (h2 >>> 0).toString(16)).slice(-8) + ("00000000" + (h3 >>> 0).toString(16)).slice(-8) + ("00000000" + (h4 >>> 0).toString(16)).slice(-8);
  };
  MurmurHash3.x64.hash128 = function(key, seed) {
    key = key || "";
    seed = seed || 0;
    let remainder = key.length % 16;
    let bytes = key.length - remainder;
    let h1 = [0, seed];
    let h2 = [0, seed];
    let k1 = [0, 0];
    let k2 = [0, 0];
    let c1 = [2277735313, 289559509];
    let c2 = [1291169091, 658871167];
    let i;
    for (i = 0; i < bytes; i = i + 16) {
      k1 = [key.charCodeAt(i + 4) & 255 | (key.charCodeAt(i + 5) & 255) << 8 | (key.charCodeAt(i + 6) & 255) << 16 | (key.charCodeAt(i + 7) & 255) << 24, key.charCodeAt(i) & 255 | (key.charCodeAt(i + 1) & 255) << 8 | (key.charCodeAt(i + 2) & 255) << 16 | (key.charCodeAt(i + 3) & 255) << 24];
      k2 = [key.charCodeAt(i + 12) & 255 | (key.charCodeAt(i + 13) & 255) << 8 | (key.charCodeAt(i + 14) & 255) << 16 | (key.charCodeAt(i + 15) & 255) << 24, key.charCodeAt(i + 8) & 255 | (key.charCodeAt(i + 9) & 255) << 8 | (key.charCodeAt(i + 10) & 255) << 16 | (key.charCodeAt(i + 11) & 255) << 24];
      k1 = _x64Multiply(k1, c1);
      k1 = _x64Rotl(k1, 31);
      k1 = _x64Multiply(k1, c2);
      h1 = _x64Xor(h1, k1);
      h1 = _x64Rotl(h1, 27);
      h1 = _x64Add(h1, h2);
      h1 = _x64Add(_x64Multiply(h1, [0, 5]), [0, 1390208809]);
      k2 = _x64Multiply(k2, c2);
      k2 = _x64Rotl(k2, 33);
      k2 = _x64Multiply(k2, c1);
      h2 = _x64Xor(h2, k2);
      h2 = _x64Rotl(h2, 31);
      h2 = _x64Add(h2, h1);
      h2 = _x64Add(_x64Multiply(h2, [0, 5]), [0, 944331445]);
    }
    k1 = [0, 0];
    k2 = [0, 0];
    switch (remainder) {
      case 15:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 14)], 48));
      case 14:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 13)], 40));
      case 13:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 12)], 32));
      case 12:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 11)], 24));
      case 11:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 10)], 16));
      case 10:
        k2 = _x64Xor(k2, _x64LeftShift([0, key.charCodeAt(i + 9)], 8));
      case 9:
        k2 = _x64Xor(k2, [0, key.charCodeAt(i + 8)]);
        k2 = _x64Multiply(k2, c2);
        k2 = _x64Rotl(k2, 33);
        k2 = _x64Multiply(k2, c1);
        h2 = _x64Xor(h2, k2);
      case 8:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 7)], 56));
      case 7:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 6)], 48));
      case 6:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 5)], 40));
      case 5:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 4)], 32));
      case 4:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 3)], 24));
      case 3:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 2)], 16));
      case 2:
        k1 = _x64Xor(k1, _x64LeftShift([0, key.charCodeAt(i + 1)], 8));
      case 1:
        k1 = _x64Xor(k1, [0, key.charCodeAt(i)]);
        k1 = _x64Multiply(k1, c1);
        k1 = _x64Rotl(k1, 31);
        k1 = _x64Multiply(k1, c2);
        h1 = _x64Xor(h1, k1);
    }
    h1 = _x64Xor(h1, [0, key.length]);
    h2 = _x64Xor(h2, [0, key.length]);
    h1 = _x64Add(h1, h2);
    h2 = _x64Add(h2, h1);
    h1 = _x64Fmix(h1);
    h2 = _x64Fmix(h2);
    h1 = _x64Add(h1, h2);
    h2 = _x64Add(h2, h1);
    return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
  };

  // src/Core/Footprint/AudioPrint.ts
  var AudioPrint = class {
    constructor() {
      this.fingerprint = "";
      const audioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      this.context = new audioContext(1, 44100, 44100);
      this.currentTime = this.context.currentTime;
      this.oscillator = this.context.createOscillator();
      this.compressor = this.context.createDynamicsCompressor();
      this.setOscillator();
      this.setCompressor();
    }
    setOscillator() {
      this.oscillator.type = "triangle";
      this.oscillator.frequency.setValueAtTime(1e4, this.currentTime);
    }
    setCompressor() {
      this.setCompressorValueIfDefined("threshold", -50);
      this.setCompressorValueIfDefined("knee", 40);
      this.setCompressorValueIfDefined("ratio", 12);
      this.setCompressorValueIfDefined("reduction", -20);
      this.setCompressorValueIfDefined("attack", 0);
      this.setCompressorValueIfDefined("release", 0.25);
    }
    setCompressorValueIfDefined(item, value) {
      const audioParam = this.compressor[item];
      if (audioParam && typeof audioParam.setValueAtTime === "function") {
        audioParam.setValueAtTime(value, this.context.currentTime);
      }
    }
    generateFingerprints(event) {
      let output = "";
      for (let i = 4500; 5e3 > i; i++) {
        const channelData = event.renderedBuffer.getChannelData(0)[i];
        output += Math.abs(channelData);
      }
      return output.toString();
    }
    run() {
      return new Promise((resolve, reject) => __async(this, null, function* () {
        this.oscillator.connect(this.compressor);
        this.compressor.connect(this.context.destination);
        this.oscillator.start(0);
        this.context.oncomplete = (event) => {
          const print = this.generateFingerprints(event);
          this.compressor.disconnect();
          resolve(print);
        };
        yield this.context.startRendering();
      }));
    }
  };

  // src/Core/Footprint/index.ts
  var Footprint = class {
    constructor(options) {
      this.SPLIT_CODE = "www.zaobao.com";
      this.options = {
        canvas: true,
        screenResolution: true
      };
      this.options = options;
    }
    run() {
      return new Promise((resolve, reject) => __async(this, null, function* () {
        const GUPInfo = this.getGPUInfo();
        let headlessStr = "";
        if (/HeadlessChrome/.test(window.navigator.userAgent)) {
          headlessStr = "headless_chrome_";
        }
        if (navigator.languages.toString() === "") {
          headlessStr = "headless_no_lang_";
        }
        if (GUPInfo.vendor == "Brian Paul" && GUPInfo.render == "Mesa OffScreen") {
          headlessStr = "headless_no_gpu_";
        }
        const keys = [];
        keys.push(navigator.userAgent);
        keys.push(this.getColorGamut());
        keys.push(this.getDeviceMemory());
        keys.push(this.getConcurrency());
        keys.push(this.areColorsForced());
        keys.push(this.isHDR());
        keys.push(this.getLanguages());
        keys.push(this.getIndexedDB());
        keys.push(this.isMotionReduced());
        keys.push(GUPInfo.vendor + this.SPLIT_CODE + GUPInfo.render);
        keys.push(screen.colorDepth);
        if (this.options.screenResolution) {
          const resolution = Footprint.getScreenResolution();
          if (resolution) {
            keys.push(resolution.join("x"));
          } else {
            headlessStr = "headless_no_screen_resolution_";
          }
        }
        const audioPrintRes = yield new AudioPrint().run();
        keys.push(audioPrintRes);
        keys.push((/* @__PURE__ */ new Date()).getTimezoneOffset());
        keys.push(this.hasSessionStorage());
        keys.push(this.hasLocalStorage());
        if (document.body) {
          keys.push(typeof document.body.addBehavior);
        } else {
          keys.push("undefined");
        }
        keys.push(typeof window.openDatabase);
        keys.push(navigator.cpuClass);
        keys.push(navigator.platform);
        keys.push(navigator.doNotTrack);
        keys.push(this.getPluginsString());
        if (this.options.canvas && this.isCanvasSupported()) {
          keys.push(this.getCanvasFingerprint());
        }
        resolve(headlessStr + MurmurHash3.x86.hash128(keys.join(this.SPLIT_CODE), 2 ** 5 - 1));
      }));
    }
    hasLocalStorage() {
      try {
        return !!window.localStorage;
      } catch (e) {
        return true;
      }
    }
    hasSessionStorage() {
      try {
        return !!window.sessionStorage;
      } catch (e) {
        return true;
      }
    }
    isCanvasSupported() {
      const elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    }
    getRegularPluginsString() {
      return Array.from(navigator.plugins).map(function(p) {
        const mimeTypes = Array.from(p).map((mt) => {
          return [mt.type, mt.suffixes].join("~");
        }).join(",");
        return [p.name, p.description, mimeTypes].join("::");
      }).join(";");
    }
    static getScreenResolution() {
      const height = screen.height;
      const width = screen.width;
      return height && width ? [screen.height, screen.width] : null;
    }
    getDeviceMemory() {
      const memory = Number.parseFloat(navigator.deviceMemory || "");
      return Number.isNaN(memory) ? void 0 : memory;
    }
    isIE() {
      if (navigator.appName === "Microsoft Internet Explorer") {
        return true;
      } else if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) {
        return true;
      }
      return false;
    }
    getIEPluginsString() {
      if (window.ActiveXObject) {
        var names = [
          "ShockwaveFlash.ShockwaveFlash",
          //flash plugin
          "AcroPDF.PDF",
          // Adobe PDF reader 7+
          "PDF.PdfCtrl",
          // Adobe PDF reader 6 and earlier, brrr
          "QuickTime.QuickTime",
          // QuickTime
          // 5 versions of real players
          "rmocx.RealPlayer G2 Control",
          "rmocx.RealPlayer G2 Control.1",
          "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
          "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
          "RealPlayer",
          "SWCtl.SWCtl",
          // ShockWave player
          "WMPlayer.OCX",
          // Windows media player
          "AgControl.AgControl",
          // Silverlight
          "Skype.Detection"
        ];
        return names.map(function(name) {
          try {
            new ActiveXObject(name);
            return name;
          } catch (e) {
            return null;
          }
        }).join(";");
      } else {
        return "";
      }
    }
    getPluginsString() {
      if (this.isIE()) {
        return this.getIEPluginsString();
      } else {
        return this.getRegularPluginsString();
      }
    }
    getConcurrency() {
      const Concurrency = Number.parseFloat(navigator.hardwareConcurrency.toString());
      return Number.isNaN(Concurrency) ? void 0 : Concurrency;
    }
    getCanvasFingerprint() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const txt = "Welcome to zaobao.com";
      ctx.textBaseline = "top";
      ctx.font = "14px 'Arial'";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      ctx.fillText(txt, 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
      ctx.fillText(txt, 4, 17);
      return canvas.toDataURL();
    }
    getGPUInfo() {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("experimental-webgl");
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      return {
        vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
        render: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      };
    }
    getColorGamut() {
      for (const gamut of ["rec2020", "p3", "srgb"]) {
        if (matchMedia(`(color-gamut: ${gamut})`).matches) {
          return gamut;
        }
      }
      return void 0;
    }
    areColorsForced() {
      if (matchMedia(`(forced-colors: active)`).matches) {
        return true;
      }
      if (matchMedia(`(forced-colors: none)`).matches) {
        return false;
      }
      return void 0;
    }
    isHDR() {
      if (matchMedia(`(dynamic-range: high)`).matches) {
        return true;
      }
      if (matchMedia(`(dynamic-range: standard)`).matches) {
        return false;
      }
      return void 0;
    }
    getLanguages() {
      const n = navigator;
      const result = [];
      const language = n.language || n.userLanguage || n.browserLanguage || n.systemLanguage;
      if (language !== void 0) {
        result.push([language]);
      }
      if (Array.isArray(n.languages)) {
        if (!(this.isChromium() && this.isChromium86OrNewer())) {
          result.push(n.languages);
        }
      } else if (typeof n.languages === "string") {
        const languages = n.languages;
        result.push(languages.split(","));
      }
      return result.join(",");
    }
    isChromium() {
      const w = window;
      const n = navigator;
      return this.countTruthy([
        "webkitPersistentStorage" in n,
        "webkitTemporaryStorage" in n,
        n.vendor.indexOf("Google") === 0,
        "webkitResolveLocalFileSystemURL" in w,
        "BatteryManager" in w,
        "webkitMediaStream" in w,
        "webkitSpeechGrammar" in w
      ]) >= 5;
    }
    countTruthy(values) {
      return values.reduce((sum, value) => sum + (value ? 1 : 0), 0);
    }
    isChromium86OrNewer() {
      const w = window;
      return this.countTruthy([
        !("MediaSettingsRange" in w),
        "RTCEncodedAudioFrame" in w,
        "" + w.Intl === "[object Intl]",
        "" + w.Reflect === "[object Reflect]"
      ]) >= 3;
    }
    getIndexedDB() {
      try {
        return !!window.indexedDB;
      } catch (e) {
        return true;
      }
    }
    isMotionReduced() {
      if (matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
        return true;
      }
      if (matchMedia(`(prefers-reduced-motion: no-preference)`).matches) {
        return false;
      }
      return void 0;
    }
  };

  // node_modules/.pnpm/js-cookie@3.0.5/node_modules/js-cookie/dist/js.cookie.mjs
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init(converter, defaultAttributes) {
    function set2(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get2(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set: set2,
        get: get2,
        remove: function(name, attributes) {
          set2(
            name,
            "",
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init(assign({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  var api = init(defaultConverter, { path: "/" });

  // src/Core/Footprint/ImmortalDB/Store.ts
  var Store = class {
  };

  // src/Core/Footprint/ImmortalDB/CookieStore.ts
  var DEFAULT_COOKIE_TTL = 365;
  var CROSS_ORIGIN_IFRAME = amIInsideACrossOriginIframe();
  var DEFAULT_SECURE = CROSS_ORIGIN_IFRAME;
  var DEFAULT_SAME_SITE = CROSS_ORIGIN_IFRAME ? "None" : "Lax";
  function amIInsideACrossOriginIframe() {
    var _a;
    try {
      return !Boolean((_a = window == null ? void 0 : window.top) == null ? void 0 : _a.location.href);
    } catch (err) {
      return true;
    }
  }
  var CookieStore = class extends Store {
    constructor({
      ttl = DEFAULT_COOKIE_TTL,
      secure = DEFAULT_SECURE,
      sameSite = DEFAULT_SAME_SITE
    } = {}) {
      super();
      this._ready = false;
      this.ttl = ttl;
      this.secure = secure;
      this.sameSite = sameSite;
      this._ready = true;
    }
    get(key) {
      return __async(this, null, function* () {
        const value = api.get(key);
        return typeof value === "string" ? value : void 0;
      });
    }
    set(key, value) {
      return __async(this, null, function* () {
        api.set(key, value, this._constructCookieParams());
      });
    }
    remove(key) {
      return __async(this, null, function* () {
        api.remove(key, this._constructCookieParams());
      });
    }
    _constructCookieParams() {
      return {
        expires: this.ttl,
        secure: this.secure,
        sameSite: this.sameSite
      };
    }
  };

  // node_modules/.pnpm/idb-keyval@6.2.1/node_modules/idb-keyval/dist/index.js
  function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
      request.oncomplete = request.onsuccess = () => resolve(request.result);
      request.onabort = request.onerror = () => reject(request.error);
    });
  }
  function createStore(dbName, storeName) {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
  }
  var defaultGetStoreFunc;
  function defaultGetStore() {
    if (!defaultGetStoreFunc) {
      defaultGetStoreFunc = createStore("keyval-store", "keyval");
    }
    return defaultGetStoreFunc;
  }
  function get(key, customStore = defaultGetStore()) {
    return customStore("readonly", (store) => promisifyRequest(store.get(key)));
  }
  function set(key, value, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.put(value, key);
      return promisifyRequest(store.transaction);
    });
  }
  function del(key, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.delete(key);
      return promisifyRequest(store.transaction);
    });
  }

  // src/Core/Footprint/ImmortalDB/IndexDB.ts
  var DEFAULT_DATABASE_NAME = "ImmortalDB";
  var DEFAULT_STORE_NAME = "key-value-pairs";
  var IndexedDbStore = class extends Store {
    constructor(dbName = DEFAULT_DATABASE_NAME, storeName = DEFAULT_STORE_NAME) {
      super();
      this._ready = false;
      this.store = createStore(dbName, storeName);
      this._ready = true;
    }
    get(key) {
      return __async(this, null, function* () {
        const value = yield get(key, this.store);
        return typeof value === "string" ? value : void 0;
      });
    }
    set(key, value) {
      return __async(this, null, function* () {
        yield set(key, value, this.store);
      });
    }
    remove(key) {
      return __async(this, null, function* () {
        yield del(key, this.store);
      });
    }
  };

  // src/Core/Footprint/ImmortalDB/WebStorage.ts
  var StorageApiWrapper = class extends Store {
    constructor(store) {
      super();
      this._ready = false;
      this.store = store;
      this._ready = true;
    }
    get(key) {
      return __async(this, null, function* () {
        const value = this.store.getItem(key);
        return value || void 0;
      });
    }
    set(key, value) {
      return __async(this, null, function* () {
        this.store.setItem(key, value);
      });
    }
    remove(key) {
      return __async(this, null, function* () {
        this.store.removeItem(key);
      });
    }
  };
  var LocalStorageStore = class extends StorageApiWrapper {
    constructor() {
      super(window.localStorage);
    }
  };
  var SessionStorageStore = class extends StorageApiWrapper {
    constructor() {
      super(window.sessionStorage);
    }
  };

  // src/Core/Footprint/ImmortalDB/index.ts
  var DEFAULT_KEY_PREFIX = "_immortal|";
  var DEFAULT_STORES = [new CookieStore()];
  try {
    if (window.localStorage) {
      DEFAULT_STORES.push(new LocalStorageStore());
    }
  } catch (err) {
  }
  try {
    if (window.sessionStorage) {
      DEFAULT_STORES.push(new SessionStorageStore());
    }
  } catch (err) {
  }
  try {
    if (window.indexedDB) {
      const indexedDB2 = new IndexedDbStore();
      DEFAULT_STORES.push(indexedDB2);
    }
  } catch (err) {
    console.log(err);
  }
  var ImmortalStorage = class extends Store {
    constructor() {
      super();
      this.stores = DEFAULT_STORES;
      this._ready = false;
      this._ready = this.stores.every((store) => store._ready);
    }
    get(key) {
      return __async(this, null, function* () {
        const prefixedKey = `${DEFAULT_KEY_PREFIX}${key}`;
        const values = (yield Promise.all(
          this.stores.map((store) => __async(this, null, function* () {
            try {
              return yield store.get(prefixedKey);
            } catch (err) {
              console.log(err);
            }
          }))
        )).filter((item) => !!item);
        const value = values[0];
        if (value !== void 0) {
          yield this.set(key, value);
          return value;
        } else {
          yield this.remove(key);
          return void 0;
        }
      });
    }
    set(key, value) {
      return __async(this, null, function* () {
        key = `${DEFAULT_KEY_PREFIX}${key}`;
        yield Promise.all(
          this.stores.map((store) => __async(this, null, function* () {
            try {
              yield store.set(key, value);
            } catch (err) {
              console.log(err);
            }
          }))
        );
        return value;
      });
    }
    remove(key) {
      return __async(this, null, function* () {
        key = `${DEFAULT_KEY_PREFIX}${key}`;
        yield Promise.all(
          this.stores.map((store) => __async(this, null, function* () {
            try {
              yield store.remove(key);
            } catch (err) {
              console.log(err);
            }
          }))
        );
      });
    }
  };
  var ImmortalDB = new ImmortalStorage();

  // src/Plugins/PluginMeasurement.ts
  var PluginMeasurement = class extends PluginCore {
    constructor(ctx) {
      super(ctx);
      this.version = "1.0.0";
    }
    setup() {
      return this;
    }
    execute() {
      return __async(this, null, function* () {
        var _a;
        const {
          domainLookupEnd,
          domainLookupStart,
          connectEnd,
          connectStart,
          redirectStart,
          redirectEnd,
          responseStart,
          responseEnd,
          requestStart,
          domContentLoadedEventEnd,
          domContentLoadedEventStart,
          startTime,
          loadEventEnd
        } = typeof window.performance.getEntriesByType === "function" ? window.performance.getEntriesByType("navigation")[0] : window.performance.timing;
        return {
          scene_id: "",
          ga_id: (yield new CookieStore().get("_ga")) || "",
          ua: navigator.userAgent,
          referrer: document.referrer,
          resolution: (_a = Footprint.getScreenResolution()) == null ? void 0 : _a.join("x"),
          url: location.href,
          geoid: "",
          host: location.host,
          path: location.pathname,
          title: document.title,
          page_load_time: loadEventEnd - (startTime || 0),
          page_download_time: responseEnd - responseStart,
          //响应到响应完成时间
          redirect_time: redirectEnd - redirectStart,
          tcp: connectEnd - connectStart,
          dns: domainLookupEnd - domainLookupStart,
          serve_response_time: responseStart - requestStart,
          //请求到开始响应时间
          content_load_time: domContentLoadedEventEnd - domContentLoadedEventStart
        };
      });
    }
  };
  PluginMeasurement.NAME = "measurement";

  // src/Command/CommandCreate.ts
  var CommandCreate = class extends CommandBase {
    constructor(ctx) {
      super(ctx);
      this.version = "1.0.0";
    }
    execute(trackingId, options) {
      return __async(this, null, function* () {
        if (!trackingId) {
          throw Error(`Tracking ID can not be null!`);
        }
        if (this.ctx.getters.instance(trackingId)) {
          throw Error(`This tracking ID:[${trackingId}] has already been created!`);
        }
        const measurement = yield this.ctx.core.plugins[PluginMeasurement.NAME].execute();
        const tagManager = new TagManager(trackingId, measurement, options);
        const instanceKey = Object.keys(this.ctx.instances).length === 0 ? DEFAULT_TAG_NAME : trackingId;
        this.ctx.instances[instanceKey] = tagManager;
      });
    }
  };
  CommandCreate.NAME = "create";

  // src/Command/CommandConfig.ts
  var CommandConfig = class extends CommandBase {
    constructor(ctx) {
      super(ctx);
      this.version = "1.0.0";
    }
    execute(config, trackingId) {
      const instance = this.ctx.getters.instance(trackingId);
      if (instance) {
        instance.setConfig(config);
      } else {
        throw Error(`Can't find tracking instance ID:[${trackingId}]!`);
      }
    }
  };
  CommandConfig.NAME = "config";

  // src/Command/CommandInstall.ts
  var CommandInstall = class extends CommandBase {
    constructor(ctx) {
      super(ctx);
      this.version = "1.0.0";
    }
    execute(plugin, options) {
      this.ctx.registerPlugin(plugin, options);
    }
  };
  CommandInstall.NAME = "install";

  // src/Command/CommandRemove.ts
  var CommandRemove = class extends CommandBase {
    constructor(ctx) {
      super(ctx);
      this.ctx = ctx;
      this.version = "1.0.0";
    }
    execute(methodName, callback) {
      var _a;
      if (!methodName.includes(".")) {
        throw Error(
          `The param ${methodName} must have "." for separate module and name, e.g:instance.\${trackingId}`
        );
      }
      const [module, name] = methodName.split(".");
      switch (module) {
        case "instance":
          const targetName = name === ((_a = this.ctx.getters.instance()) == null ? void 0 : _a.trackingId) ? DEFAULT_TAG_NAME : name;
          callback(delete this.ctx.instances[targetName]);
          break;
        case "plugin":
          callback(delete this.ctx.plugins[name]);
          break;
        default:
          throw Error("The module name mush 'instance' or 'plugin'!");
      }
    }
  };
  CommandRemove.NAME = "remove";

  // src/Utils/Object2UrlString.ts
  function object2UrlString(obj) {
    const res = [];
    return Object.keys(obj).reduce((all, key) => {
      let value;
      switch (typeof obj[key]) {
        case "object":
          value = JSON.stringify(obj[key]);
          break;
        case "undefined":
          value = "";
          break;
        default:
          value = obj[key];
      }
      all.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      return all;
    }, res).join("&");
  }

  // src/Utils/URLSearchParams.ts
  function getSearchParam(key, url = document.location.search) {
    const re = new RegExp("(?:\\?|&)" + key + "=(.*?)(?=&|$)", "gi");
    let r = [], m;
    while ((m = re.exec(url)) != null)
      r[r.length] = m[1];
    return r.length ? r[0] : null;
  }

  // src/Plugins/PluginFootPrint.ts
  var FOOT_PRINT_KEY = "fp_";
  var PluginFootPrint = class extends PluginCore {
    constructor(ctx) {
      super(ctx);
      this.version = "1.0.0";
      this.Storage = ImmortalDB;
    }
    setup() {
      this.execute();
      return this;
    }
    execute() {
      return __async(this, null, function* () {
        return new Promise((resolve, reject) => __async(this, null, function* () {
          const footPrint = (yield ImmortalDB.get(FOOT_PRINT_KEY)) || getSearchParam(FOOT_PRINT_KEY, window.name) || (yield new Footprint({
            canvas: true,
            screenResolution: true
          }).run());
          window.name = `?${FOOT_PRINT_KEY}=${footPrint}`;
          yield this.Storage.set(FOOT_PRINT_KEY, footPrint);
          resolve(footPrint);
        }));
      });
    }
  };
  PluginFootPrint.NAME = "footprint";

  // src/Command/CommandSend.ts
  var CommandSend = class extends CommandBase {
    constructor(ctx) {
      super(ctx);
      this.version = "1.0.0";
    }
    execute(eventType, entity, trackingId) {
      return __async(this, null, function* () {
        const instance = this.ctx.getters.instance(trackingId);
        if (!instance)
          throw Error(`Can't find instance tracking ID:${trackingId}!`);
        const { api_secret, api_version, user_id } = this.ctx.getters.globalConfig();
        const measurement = {
          tracking_id: instance.trackingId,
          api_secret,
          user_id,
          api_version,
          version: this.ctx.version,
          client_id: yield this.ctx.core.plugins[PluginFootPrint.NAME].execute(),
          events: [
            {
              name: eventType,
              local_time_ms: Date.now(),
              params: __spreadValues(__spreadValues({}, instance.baseInfo), entity)
            }
          ]
        };
        yield this.send(measurement);
      });
    }
    send(measurement) {
      return __async(this, null, function* () {
        const stringify = object2UrlString(measurement);
        const carrier = new Image();
        carrier.src = "./cg.gif?" + stringify;
        carrier.onload = function(e) {
          console.log(e);
        };
      });
    }
  };
  CommandSend.NAME = "send";

  // src/Utils/ArrayWatcher.ts
  function createArrayAddWatcher(array, callback) {
    const ArrayExtender = Object.create(Array.prototype);
    ArrayExtender.push = function(...arg) {
      Array.prototype.push.apply(this, arg);
      callback(arg);
    };
    array.__proto__ = ArrayExtender;
  }

  // src/Command/index.ts
  function createCommandQueueProcessor(ctx) {
    return __async(this, null, function* () {
      createArrayAddWatcher(window.CQueue, executeQueueCommand.bind(ctx));
      yield executeQueueCommand.call(ctx);
    });
  }
  function executeQueueCommand() {
    return __async(this, null, function* () {
      while (window.CQueue.length > 0) {
        yield this.executor.execute(window.CQueue.shift());
      }
    });
  }

  // src/Command/CommandGet.ts
  var CommandGet = class extends CommandBase {
    constructor(ctx) {
      super(ctx);
      this.version = "1.0.0";
    }
    execute(methodName, callback, params) {
      return __async(this, null, function* () {
        if (typeof this.ctx.getters[methodName] === "function")
          return callback(yield this.ctx.getters[methodName](params));
        throw Error(`Can't find command:[${methodName}]!`);
      });
    }
  };
  CommandGet.NAME = "get";

  // src/Command/CommandSet.ts
  var CommandSet = class extends CommandBase {
    constructor(ctx) {
      super(ctx);
      this.version = "1.0.0";
    }
    execute(module, config, trackingId) {
      return __async(this, null, function* () {
        var _a;
        switch (module) {
          case "global":
            this.ctx.setters.globalConfig(config);
            break;
          case "page":
            (_a = this.ctx.getters.instance(trackingId)) == null ? void 0 : _a.setBaseInfo(config);
            break;
        }
      });
    }
  };
  CommandSet.NAME = "set";

  // node_modules/.pnpm/@zhengxy+exposure@0.0.1-beta.6/node_modules/@zhengxy/exposure/dist/index.esm.mjs
  var ScrollObserver = class {
    constructor(options) {
      this.DomRefs = [];
      this.clientSize = {
        width: innerWidth,
        height: innerHeight
      };
      this.options = options;
    }
    setClientSize(size) {
      this.clientSize = size;
    }
    getRefs() {
      return this.DomRefs;
    }
    unobserve(index) {
      this.DomRefs.splice(index, 1);
    }
    isIntersecting(rect, position) {
      const { width, height, left, top } = rect;
      const { left: scrollLeft, top: scrollTop } = position;
      const { threshold } = this.options;
      const { width: clientWidth, height: clientHeight } = this.clientSize;
      return (clientHeight - top + scrollTop) * (clientWidth - left + scrollLeft) > height * width * threshold;
    }
    interSectionChecking(isIntersecting, index, domRef) {
      if (isIntersecting !== domRef.isIntersecting) {
        domRef.isIntersecting = isIntersecting;
        domRef.element.callback.call(
          null,
          isIntersecting,
          () => {
            this.unobserve(index);
          },
          ...arguments
        );
      }
    }
    onScroll(position) {
      this.DomRefs.map((domRef, index) => {
        const isIntersecting = this.isIntersecting(
          domRef.element.getBoundingClientRect(),
          position
        );
        this.interSectionChecking(isIntersecting, index, domRef);
      });
    }
    observe(el) {
      const isIntersecting = this.isIntersecting(el.getBoundingClientRect(), { left: 0, top: 0 });
      const ref = {
        element: el,
        isIntersecting: void 0
      };
      this.DomRefs.push(ref);
      this.interSectionChecking(isIntersecting, this.DomRefs.length - 1, ref);
    }
    stop() {
      this.DomRefs = [];
    }
  };
  function getElements(el) {
    return Array.isArray(el) || el instanceof HTMLCollection ? Array.from(el) : [el];
  }
  var Exposure = class {
    constructor(options = { threshold: 0.3 }) {
      const callback = (entries, observer) => {
        entries.map((entry) => {
          const { target, isIntersecting } = entry;
          target.callback.call(
            null,
            isIntersecting,
            () => observer.unobserve(target),
            ...arguments
          );
        });
      };
      this.Observer = new IntersectionObserver(callback, options);
      this.ScrObserver = new ScrollObserver(options);
    }
    observe(el, callback) {
      el.callback = callback;
      this.Observer.observe(el);
    }
    scrollEventHandler(position = { left: 0, top: 0 }) {
      this.ScrObserver.onScroll(position);
    }
    observeByScroll(el, callback) {
      el.callback = callback;
      this.ScrObserver.observe(el);
    }
    unobserve(el) {
      getElements(el).map((target) => this.Observer.unobserve(target));
    }
    unobserveByScroll(el) {
      getElements(el).map((target) => {
        const findIndex = this.ScrObserver.getRefs().findIndex(({ element: ref }) => ref === target);
        if (findIndex >= 0)
          this.ScrObserver.unobserve(findIndex);
      });
    }
    setClientSize(size) {
      this.ScrObserver.setClientSize(size);
    }
    stopByScroll() {
      this.ScrObserver.stop();
    }
    stop() {
      this.Observer.disconnect();
    }
  };

  // src/Plugins/PluginExposure.ts
  var PluginExposure = class extends PluginBase {
    constructor() {
      super();
      this.version = "1.0.0";
      this.exposure = new Exposure();
    }
    observe(el, callback) {
      let timer;
      this.exposure.observe(el, (isIntersecting, stop) => {
        if (isIntersecting) {
          timer = setTimeout(() => {
            callback(isIntersecting, stop);
          }, 500);
        } else {
          clearTimeout(timer);
          callback(isIntersecting, stop);
        }
      });
    }
  };
  PluginExposure.NAME = "exposure";

  // src/Command/CommandPlugin.ts
  var CommandPlugin = class extends CommandBase {
    constructor(ctx) {
      super(ctx);
      this.version = "1.0.0";
    }
    execute(pluginAndMethodName, ...params) {
      return __async(this, null, function* () {
        const [pluginName, methodName] = pluginAndMethodName.split(":");
        const plugin = this.ctx.plugins[pluginName];
        if (plugin) {
          return yield plugin[methodName](...params);
        }
        throw Error(`Can't find plugin:[${pluginName}]!`);
      });
    }
  };
  CommandPlugin.NAME = "plugin";

  // src/Bootstrap/CTagContext.ts
  var DEFAULT_TAG_NAME = "default";
  var CTagContext = class {
    constructor() {
      this.version = "1.0.0";
      this.globalConfig = {
        api_version: "1.0.0",
        api_secret: "",
        user_id: ""
      };
      this.instances = {};
      this.plugins = {};
      this.executor = new Executor(this);
      this.setters = {
        globalConfig: (config) => {
          this.globalConfig = assignObjectFilterSource(this.globalConfig, config);
        }
      };
      this.getters = {
        config: (trackingId) => {
          const instance = this.getters.instance(trackingId);
          if (!instance) {
            throw Error(`Can't find instance tracking ID:${trackingId}`);
          }
          return __spreadValues({}, instance.config);
        },
        instance: (trackingId) => {
          var _a;
          const targetId = !trackingId || ((_a = this.instances[DEFAULT_TAG_NAME]) == null ? void 0 : _a.trackingId) === trackingId ? DEFAULT_TAG_NAME : trackingId;
          return this.instances[targetId];
        },
        plugin: (name) => {
          if (!name) {
            throw Error("The plugin name can not be null!");
          }
          return this.plugins[name];
        },
        globalConfig: () => {
          return this.globalConfig;
        },
        clientId: () => __async(this, null, function* () {
          return yield this.core.plugins[PluginFootPrint.NAME].execute();
        }),
        measurement: () => __async(this, null, function* () {
          return yield this.core.plugins[PluginMeasurement.NAME].execute();
        })
      };
      this.registerCommand(CommandCreate);
      this.registerCommand(CommandConfig);
      this.registerCommand(CommandInstall);
      this.registerCommand(CommandRemove);
      this.registerCommand(CommandSend);
      this.registerCommand(CommandGet);
      this.registerCommand(CommandSet);
      this.registerCommand(CommandPlugin);
      this.core = {
        plugins: {
          [PluginMeasurement.NAME]: new PluginMeasurement(this).setup(),
          [PluginFootPrint.NAME]: new PluginFootPrint(this).setup()
        }
      };
      this.registerPlugin(PluginExposure);
    }
    bootstrap() {
      return __async(this, null, function* () {
        yield createCommandQueueProcessor(this);
        return this;
      });
    }
    registerPlugin(PluginClass, options) {
      this.plugins[PluginClass.NAME] = new PluginClass(options);
    }
    registerCommand(CommandClass) {
      const commander = new CommandClass(this);
      this.executor.addCommand(CommandClass.NAME, commander);
    }
    autoTasks() {
      Object.keys(this.instances).map((key) => {
        this.instances[key].run();
      });
    }
  };
  function buildCTagContext() {
    return __async(this, null, function* () {
      return new CTagContext().bootstrap();
    });
  }

  // src/Bootstrap/index.ts
  window.CQueue = window.CQueue || [];
  if (document.currentScript) {
    const currentSrc = document.currentScript.src;
    if (currentSrc) {
      const trackingId = getSearchParam("id", currentSrc);
      if (trackingId) {
        const options = {};
        ["screen_view", "stay_duration", "exception_report", "disable"].map((key) => {
          try {
            const value = getSearchParam(key, currentSrc);
            if (value)
              options[key] = JSON.parse(value);
          } catch (e) {
            throw Error(`The param [${key}]'s value is not boolean type!`);
          }
        });
        window.CQueue.unshift(["create", trackingId, options]);
      }
    }
  }
  window.ctag = window.ctag || function ctag(...args) {
    window.CQueue.push(args);
  };
  buildCTagContext().then((ctx) => {
    window.ctag.ctx = ctx;
    ctx.autoTasks();
  });
})();
/*! Bundled license information:

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)
*/
