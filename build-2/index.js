var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.jsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { isbot } from "isbot";

// app/shopify.server.js
import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07";

// app/db.server.js
import { PrismaClient } from "@prisma/client";
var prisma = global.prisma || new PrismaClient(), db_server_default = prisma;

// app/shopify.server.js
var shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.July24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(db_server_default),
  distribution: AppDistribution.AppStore,
  restResources,
  future: {
    unstable_newEmbeddedAuthStrategy: !0
  },
  ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
var apiVersion = ApiVersion.July24, addDocumentResponseHeaders = shopify.addDocumentResponseHeaders, authenticate = shopify.authenticate, unauthenticated = shopify.unauthenticated, login = shopify.login, registerWebhooks = shopify.registerWebhooks, sessionStorage = shopify.sessionStorage;

// app/entry.server.jsx
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  addDocumentResponseHeaders(request, responseHeaders);
  let userAgent = request.headers.get("user-agent"), callbackName = isbot(userAgent ?? "") ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    let { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        [callbackName]: () => {
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  headers: () => headers,
  links: () => links,
  loader: () => loader
});
import { json } from "@remix-run/node";
import { useLoaderData, useRouteError, Links, Meta, Outlet, Scripts, ScrollRestoration, useFetcher, useRevalidator } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider as AppProvider2 } from "@shopify/shopify-app-remix/react";

// node_modules/@shopify/polaris/build/esm/types.js
var Key = /* @__PURE__ */ function(Key2) {
  return Key2[Key2.Backspace = 8] = "Backspace", Key2[Key2.Tab = 9] = "Tab", Key2[Key2.Enter = 13] = "Enter", Key2[Key2.Shift = 16] = "Shift", Key2[Key2.Ctrl = 17] = "Ctrl", Key2[Key2.Alt = 18] = "Alt", Key2[Key2.Pause = 19] = "Pause", Key2[Key2.CapsLock = 20] = "CapsLock", Key2[Key2.Escape = 27] = "Escape", Key2[Key2.Space = 32] = "Space", Key2[Key2.PageUp = 33] = "PageUp", Key2[Key2.PageDown = 34] = "PageDown", Key2[Key2.End = 35] = "End", Key2[Key2.Home = 36] = "Home", Key2[Key2.LeftArrow = 37] = "LeftArrow", Key2[Key2.UpArrow = 38] = "UpArrow", Key2[Key2.RightArrow = 39] = "RightArrow", Key2[Key2.DownArrow = 40] = "DownArrow", Key2[Key2.Insert = 45] = "Insert", Key2[Key2.Delete = 46] = "Delete", Key2[Key2.Key0 = 48] = "Key0", Key2[Key2.Key1 = 49] = "Key1", Key2[Key2.Key2 = 50] = "Key2", Key2[Key2.Key3 = 51] = "Key3", Key2[Key2.Key4 = 52] = "Key4", Key2[Key2.Key5 = 53] = "Key5", Key2[Key2.Key6 = 54] = "Key6", Key2[Key2.Key7 = 55] = "Key7", Key2[Key2.Key8 = 56] = "Key8", Key2[Key2.Key9 = 57] = "Key9", Key2[Key2.KeyA = 65] = "KeyA", Key2[Key2.KeyB = 66] = "KeyB", Key2[Key2.KeyC = 67] = "KeyC", Key2[Key2.KeyD = 68] = "KeyD", Key2[Key2.KeyE = 69] = "KeyE", Key2[Key2.KeyF = 70] = "KeyF", Key2[Key2.KeyG = 71] = "KeyG", Key2[Key2.KeyH = 72] = "KeyH", Key2[Key2.KeyI = 73] = "KeyI", Key2[Key2.KeyJ = 74] = "KeyJ", Key2[Key2.KeyK = 75] = "KeyK", Key2[Key2.KeyL = 76] = "KeyL", Key2[Key2.KeyM = 77] = "KeyM", Key2[Key2.KeyN = 78] = "KeyN", Key2[Key2.KeyO = 79] = "KeyO", Key2[Key2.KeyP = 80] = "KeyP", Key2[Key2.KeyQ = 81] = "KeyQ", Key2[Key2.KeyR = 82] = "KeyR", Key2[Key2.KeyS = 83] = "KeyS", Key2[Key2.KeyT = 84] = "KeyT", Key2[Key2.KeyU = 85] = "KeyU", Key2[Key2.KeyV = 86] = "KeyV", Key2[Key2.KeyW = 87] = "KeyW", Key2[Key2.KeyX = 88] = "KeyX", Key2[Key2.KeyY = 89] = "KeyY", Key2[Key2.KeyZ = 90] = "KeyZ", Key2[Key2.LeftMeta = 91] = "LeftMeta", Key2[Key2.RightMeta = 92] = "RightMeta", Key2[Key2.Select = 93] = "Select", Key2[Key2.Numpad0 = 96] = "Numpad0", Key2[Key2.Numpad1 = 97] = "Numpad1", Key2[Key2.Numpad2 = 98] = "Numpad2", Key2[Key2.Numpad3 = 99] = "Numpad3", Key2[Key2.Numpad4 = 100] = "Numpad4", Key2[Key2.Numpad5 = 101] = "Numpad5", Key2[Key2.Numpad6 = 102] = "Numpad6", Key2[Key2.Numpad7 = 103] = "Numpad7", Key2[Key2.Numpad8 = 104] = "Numpad8", Key2[Key2.Numpad9 = 105] = "Numpad9", Key2[Key2.Multiply = 106] = "Multiply", Key2[Key2.Add = 107] = "Add", Key2[Key2.Subtract = 109] = "Subtract", Key2[Key2.Decimal = 110] = "Decimal", Key2[Key2.Divide = 111] = "Divide", Key2[Key2.F1 = 112] = "F1", Key2[Key2.F2 = 113] = "F2", Key2[Key2.F3 = 114] = "F3", Key2[Key2.F4 = 115] = "F4", Key2[Key2.F5 = 116] = "F5", Key2[Key2.F6 = 117] = "F6", Key2[Key2.F7 = 118] = "F7", Key2[Key2.F8 = 119] = "F8", Key2[Key2.F9 = 120] = "F9", Key2[Key2.F10 = 121] = "F10", Key2[Key2.F11 = 122] = "F11", Key2[Key2.F12 = 123] = "F12", Key2[Key2.NumLock = 144] = "NumLock", Key2[Key2.ScrollLock = 145] = "ScrollLock", Key2[Key2.Semicolon = 186] = "Semicolon", Key2[Key2.Equals = 187] = "Equals", Key2[Key2.Comma = 188] = "Comma", Key2[Key2.Dash = 189] = "Dash", Key2[Key2.Period = 190] = "Period", Key2[Key2.ForwardSlash = 191] = "ForwardSlash", Key2[Key2.GraveAccent = 192] = "GraveAccent", Key2[Key2.OpenBracket = 219] = "OpenBracket", Key2[Key2.BackSlash = 220] = "BackSlash", Key2[Key2.CloseBracket = 221] = "CloseBracket", Key2[Key2.SingleQuote = 222] = "SingleQuote", Key2;
}({});

// node_modules/@shopify/polaris/build/esm/components/shared.js
var scrollable = {
  props: {
    "data-polaris-scrollable": !0
  },
  selector: "[data-polaris-scrollable]"
}, overlay = {
  props: {
    "data-polaris-overlay": !0
  },
  selector: "[data-polaris-overlay]"
}, layer = {
  props: {
    "data-polaris-layer": !0
  },
  selector: "[data-polaris-layer]"
}, unstyled = {
  props: {
    "data-polaris-unstyled": !0
  },
  selector: "[data-polaris-unstyled]"
}, dataPolarisTopBar = {
  props: {
    "data-polaris-top-bar": !0
  },
  selector: "[data-polaris-top-bar]"
};
var portal = {
  props: ["data-portal-id"],
  selector: "[data-portal-id]"
};

// node_modules/@shopify/polaris/build/esm/components/ThemeProvider/ThemeProvider.js
import React from "react";
import { createThemeClassName, themeNameDefault } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/use-theme.js
import { useContext, createContext } from "react";
import { themes } from "@shopify/polaris-tokens";
var ThemeContext = /* @__PURE__ */ createContext(null), ThemeNameContext = /* @__PURE__ */ createContext(null);
function getTheme(themeName) {
  return themes[themeName];
}
function useTheme() {
  let theme = useContext(ThemeContext);
  if (!theme)
    throw new Error("No theme was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  return theme;
}
function useThemeName() {
  let themeName = useContext(ThemeNameContext);
  if (!themeName)
    throw new Error("No themeName was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  return themeName;
}

// node_modules/@shopify/polaris/build/esm/utilities/css.js
import { breakpointsAliases } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/is-object.js
function isObject(value) {
  let type = typeof value;
  return value != null && (type === "object" || type === "function");
}

// node_modules/@shopify/polaris/build/esm/utilities/css.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function variationName(name, value) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
function sanitizeCustomProperties(styles39) {
  let nonNullValues = Object.entries(styles39).filter(([_, value]) => value != null);
  return nonNullValues.length ? Object.fromEntries(nonNullValues) : void 0;
}
function getResponsiveProps(componentName, componentProp, tokenSubgroup, responsiveProp) {
  if (!responsiveProp)
    return {};
  let result;
  return isObject(responsiveProp) ? result = Object.fromEntries(Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [breakpointAlias, `var(--p-${tokenSubgroup}-${aliasOrScale})`])) : result = {
    [breakpointsAliases[0]]: `var(--p-${tokenSubgroup}-${responsiveProp})`
  }, Object.fromEntries(Object.entries(result).map(([breakpointAlias, value]) => [`--pc-${componentName}-${componentProp}-${breakpointAlias}`, value]));
}
function getResponsiveValue(componentName, componentProp, responsiveProp) {
  return responsiveProp ? isObject(responsiveProp) ? Object.fromEntries(Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [`--pc-${componentName}-${componentProp}-${breakpointAlias}`, responsiveValue])) : {
    [`--pc-${componentName}-${componentProp}-${breakpointsAliases[0]}`]: responsiveProp
  } : {};
}

// node_modules/@shopify/polaris/build/esm/components/ThemeProvider/ThemeProvider.css.js
var styles = {
  themeContainer: "Polaris-ThemeProvider--themeContainer"
};

// node_modules/@shopify/polaris/build/esm/components/ThemeProvider/ThemeProvider.js
var themeNamesLocal = ["light", "dark-experimental"], isThemeNameLocal = (name) => themeNamesLocal.includes(name);
function ThemeProvider(props) {
  let {
    as: ThemeContainer = "div",
    children,
    className,
    theme: themeName = themeNameDefault
  } = props;
  return /* @__PURE__ */ React.createElement(ThemeNameContext.Provider, {
    value: themeName
  }, /* @__PURE__ */ React.createElement(ThemeContext.Provider, {
    value: getTheme(themeName)
  }, /* @__PURE__ */ React.createElement(ThemeContainer, {
    "data-portal-id": props["data-portal-id"],
    className: classNames(createThemeClassName(themeName), styles.themeContainer, className)
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/utilities/within-content-context.js
import { createContext as createContext2 } from "react";
var WithinContentContext = /* @__PURE__ */ createContext2(!1);

// node_modules/@shopify/polaris/build/esm/utilities/use-event-listener.js
import { useRef, useEffect as useEffect2 } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/use-isomorphic-layout-effect.js
import { useEffect, useLayoutEffect } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/target.js
var isServer = typeof window > "u" || typeof document > "u";

// node_modules/@shopify/polaris/build/esm/utilities/use-isomorphic-layout-effect.js
var useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;

// node_modules/@shopify/polaris/build/esm/utilities/use-event-listener.js
function useEventListener(eventName, handler, target, options) {
  let handlerRef = useRef(handler), optionsRef = useRef(options);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]), useIsomorphicLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]), useEffect2(() => {
    if (!(typeof eventName == "string" && target !== null))
      return;
    let targetElement;
    if (typeof target > "u")
      targetElement = window;
    else if ("current" in target) {
      if (target.current === null)
        return;
      targetElement = target.current;
    } else
      targetElement = target;
    let eventOptions = optionsRef.current, eventListener = (event) => handlerRef.current(event);
    return targetElement.addEventListener(eventName, eventListener, eventOptions), () => {
      targetElement.removeEventListener(eventName, eventListener, eventOptions);
    };
  }, [eventName, target]);
}

// node_modules/@shopify/polaris/build/esm/utilities/breakpoints.js
import { useState } from "react";
import { themeDefault, getMediaConditions } from "@shopify/polaris-tokens";
var Breakpoints = {
  // TODO: Update to smDown
  navigationBarCollapsed: "767.95px",
  // TODO: Update to lgDown
  stackedContent: "1039.95px"
}, noWindowMatches = {
  media: "",
  addListener: noop,
  removeListener: noop,
  matches: !1,
  onchange: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: (_) => !0
};
function noop() {
}
function navigationBarCollapsed() {
  return isServer ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}
function stackedContent() {
  return isServer ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}
var hookCallbacks = /* @__PURE__ */ new Set(), breakpointsQueryEntries = getBreakpointsQueryEntries(themeDefault.breakpoints);
isServer || breakpointsQueryEntries.forEach(([breakpointAlias, query]) => {
  let eventListener = (event) => {
    for (let hookCallback of hookCallbacks)
      hookCallback(breakpointAlias, event.matches);
  }, mql = window.matchMedia(query);
  mql.addListener ? mql.addListener(eventListener) : mql.addEventListener("change", eventListener);
});
function getDefaultMatches(defaults) {
  return Object.fromEntries(breakpointsQueryEntries.map(([directionAlias]) => [directionAlias, typeof defaults == "boolean" ? defaults : defaults?.[directionAlias] ?? !1]));
}
function getLiveMatches() {
  return Object.fromEntries(breakpointsQueryEntries.map(([directionAlias, query]) => [directionAlias, window.matchMedia(query).matches]));
}
function useBreakpoints(options) {
  let [breakpoints, setBreakpoints] = useState(getDefaultMatches(options?.defaults));
  return useIsomorphicLayoutEffect(() => {
    setBreakpoints(getLiveMatches());
    let callback = (breakpointAlias, matches2) => {
      setBreakpoints((prevBreakpoints) => ({
        ...prevBreakpoints,
        [breakpointAlias]: matches2
      }));
    };
    return hookCallbacks.add(callback), () => {
      hookCallbacks.delete(callback);
    };
  }, []), breakpoints;
}
function getBreakpointsQueryEntries(breakpoints) {
  return Object.entries(getMediaConditions(breakpoints)).map(([breakpointsToken, mediaConditions]) => Object.entries(mediaConditions).map(([direction, mediaCondition]) => [`${breakpointsToken.split("-")[1]}${capitalize(direction)}`, mediaCondition])).flat();
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// node_modules/@shopify/polaris/build/esm/components/AppProvider/AppProvider.js
import React7, { Component } from "react";
import { themeNames, createThemeClassName as createThemeClassName2, themeNameDefault as themeNameDefault2 } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/sticky-manager.js
import { themeDefault as themeDefault2 } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/debounce.js
function debounce(func, waitArg, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = !1, maxing = !1, trailing = !0, useRAF = !waitArg && waitArg !== 0;
  if (typeof func != "function")
    throw new TypeError("Expected a function");
  let wait = waitArg || 0;
  typeof options == "object" && (leading = Boolean(options.leading), maxing = "maxWait" in options, maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : void 0, trailing = "trailing" in options ? Boolean(options.trailing) : trailing);
  function invokeFunc(time) {
    let args = lastArgs, thisArg = lastThis;
    return lastArgs = void 0, lastThis = void 0, lastInvokeTime = time, result = func.apply(thisArg, args), result;
  }
  function startTimer(pendingFunc, wait2) {
    return useRAF ? (cancelAnimationFrame(timerId), requestAnimationFrame(pendingFunc)) : setTimeout(pendingFunc, wait2);
  }
  function cancelTimer(id) {
    if (useRAF)
      return cancelAnimationFrame(id);
    clearTimeout(id);
  }
  function leadingEdge(time) {
    return lastInvokeTime = time, timerId = startTimer(timerExpired, wait), leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    let timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing && maxWait ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    let timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && maxWait && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    let time = Date.now();
    if (shouldInvoke(time))
      return trailingEdge(time);
    timerId = startTimer(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    return timerId = void 0, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = void 0, result);
  }
  function cancel() {
    timerId !== void 0 && cancelTimer(timerId), lastInvokeTime = 0, lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(Date.now());
  }
  function pending() {
    return timerId !== void 0;
  }
  function debounced(...args) {
    let time = Date.now(), isInvoking = shouldInvoke(time);
    if (lastArgs = args, lastThis = this, lastCallTime = time, isInvoking) {
      if (timerId === void 0)
        return leadingEdge(lastCallTime);
      if (maxing)
        return timerId = startTimer(timerExpired, wait), invokeFunc(lastCallTime);
    }
    return timerId === void 0 && (timerId = startTimer(timerExpired, wait)), result;
  }
  return debounced.cancel = cancel, debounced.flush = flush, debounced.pending = pending, debounced;
}

// node_modules/@shopify/polaris/build/esm/utilities/geometry.js
var Rect = class {
  static get zero() {
    return new Rect();
  }
  constructor({
    top = 0,
    left = 0,
    width = 0,
    height = 0
  } = {}) {
    this.top = top, this.left = left, this.width = width, this.height = height;
  }
  get center() {
    return {
      x: this.left + this.width / 2,
      y: this.top + this.height / 2
    };
  }
};
function getRectForNode(node) {
  try {
    let rect = node.getBoundingClientRect();
    return new Rect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    });
  } catch {
    return new Rect({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
}

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/sticky-manager.js
var SIXTY_FPS = 1e3 / 60, StickyManager = class {
  constructor(container) {
    this.stickyItems = [], this.stuckItems = [], this.container = null, this.topBarOffset = 0, this.handleResize = debounce(() => {
      this.manageStickyItems();
    }, SIXTY_FPS, {
      leading: !0,
      trailing: !0,
      maxWait: SIXTY_FPS
    }), this.handleScroll = debounce(() => {
      this.manageStickyItems();
    }, SIXTY_FPS, {
      leading: !0,
      trailing: !0,
      maxWait: SIXTY_FPS
    }), container && this.setContainer(container);
  }
  registerStickyItem(stickyItem) {
    this.stickyItems.push(stickyItem);
  }
  unregisterStickyItem(nodeToRemove) {
    let nodeIndex = this.stickyItems.findIndex(({
      stickyNode
    }) => nodeToRemove === stickyNode);
    this.stickyItems.splice(nodeIndex, 1);
  }
  getStickyItem(node) {
    return this.stickyItems.find(({
      stickyNode
    }) => node === stickyNode);
  }
  setContainer(el) {
    this.container = el, isDocument(el) && this.setTopBarOffset(el), this.container.addEventListener("scroll", this.handleScroll), window.addEventListener("resize", this.handleResize), this.manageStickyItems();
  }
  removeScrollListener() {
    this.container && (this.container.removeEventListener("scroll", this.handleScroll), window.removeEventListener("resize", this.handleResize));
  }
  manageStickyItems() {
    if (this.stickyItems.length <= 0)
      return;
    let scrollTop = this.container ? scrollTopFor(this.container) : 0, containerTop = getRectForNode(this.container).top + this.topBarOffset;
    this.stickyItems.forEach((stickyItem) => {
      let {
        handlePositioning
      } = stickyItem, {
        sticky,
        top,
        left,
        width
      } = this.evaluateStickyItem(stickyItem, scrollTop, containerTop);
      this.updateStuckItems(stickyItem, sticky), handlePositioning(sticky, top, left, width);
    });
  }
  evaluateStickyItem(stickyItem, scrollTop, containerTop) {
    let {
      stickyNode,
      placeHolderNode,
      boundingElement,
      offset,
      disableWhenStacked
    } = stickyItem;
    if (disableWhenStacked && stackedContent().matches)
      return {
        sticky: !1,
        top: 0,
        left: 0,
        width: "auto"
      };
    let stickyOffset = offset ? this.getOffset(stickyNode) + parseInt(
      // Important: This will not update when the active theme changes.
      // Update this to `useTheme` once converted to a function component.
      themeDefault2.space["space-500"],
      10
    ) : this.getOffset(stickyNode), scrollPosition2 = scrollTop + stickyOffset, placeHolderNodeCurrentTop = placeHolderNode.getBoundingClientRect().top - containerTop + scrollTop, top = containerTop + stickyOffset, width = placeHolderNode.getBoundingClientRect().width, left = placeHolderNode.getBoundingClientRect().left, sticky;
    if (boundingElement == null)
      sticky = scrollPosition2 >= placeHolderNodeCurrentTop;
    else {
      let stickyItemHeight = stickyNode.getBoundingClientRect().height || stickyNode.firstElementChild?.getBoundingClientRect().height || 0, stickyItemBottomPosition = boundingElement.getBoundingClientRect().bottom - stickyItemHeight + scrollTop - containerTop;
      sticky = scrollPosition2 >= placeHolderNodeCurrentTop && scrollPosition2 < stickyItemBottomPosition;
    }
    return {
      sticky,
      top,
      left,
      width
    };
  }
  updateStuckItems(item, sticky) {
    let {
      stickyNode
    } = item;
    sticky && !this.isNodeStuck(stickyNode) ? this.addStuckItem(item) : !sticky && this.isNodeStuck(stickyNode) && this.removeStuckItem(item);
  }
  addStuckItem(stickyItem) {
    this.stuckItems.push(stickyItem);
  }
  removeStuckItem(stickyItem) {
    let {
      stickyNode: nodeToRemove
    } = stickyItem, nodeIndex = this.stuckItems.findIndex(({
      stickyNode
    }) => nodeToRemove === stickyNode);
    this.stuckItems.splice(nodeIndex, 1);
  }
  getOffset(node) {
    if (this.stuckItems.length === 0)
      return 0;
    let offset = 0, count = 0, stuckNodesLength = this.stuckItems.length, nodeRect = getRectForNode(node);
    for (; count < stuckNodesLength; ) {
      let stuckNode = this.stuckItems[count].stickyNode;
      if (stuckNode !== node) {
        let stuckNodeRect = getRectForNode(stuckNode);
        horizontallyOverlaps(nodeRect, stuckNodeRect) || (offset += getRectForNode(stuckNode).height);
      } else
        break;
      count++;
    }
    return offset;
  }
  isNodeStuck(node) {
    return this.stuckItems.findIndex(({
      stickyNode
    }) => node === stickyNode) >= 0;
  }
  setTopBarOffset(container) {
    let topbarElement = container.querySelector(`:not(${scrollable.selector}) ${dataPolarisTopBar.selector}`);
    this.topBarOffset = topbarElement ? topbarElement.clientHeight : 0;
  }
};
function isDocument(node) {
  return node === document;
}
function scrollTopFor(container) {
  return isDocument(container) ? document.body.scrollTop || document.documentElement.scrollTop : container.scrollTop;
}
function horizontallyOverlaps(rect1, rect2) {
  let rect1Left = rect1.left, rect1Right = rect1.left + rect1.width, rect2Left = rect2.left;
  return rect2.left + rect2.width < rect1Left || rect1Right < rect2Left;
}

// node_modules/@shopify/polaris/build/esm/utilities/scroll-lock-manager/scroll-lock-manager.js
var SCROLL_LOCKING_ATTRIBUTE = "data-lock-scrolling", SCROLL_LOCKING_HIDDEN_ATTRIBUTE = "data-lock-scrolling-hidden", SCROLL_LOCKING_WRAPPER_ATTRIBUTE = "data-lock-scrolling-wrapper", scrollPosition = 0;
function isScrollBarVisible() {
  let {
    body
  } = document;
  return body.scrollHeight > body.clientHeight;
}
var ScrollLockManager = class {
  constructor() {
    this.scrollLocks = 0, this.locked = !1;
  }
  registerScrollLock() {
    this.scrollLocks += 1, this.handleScrollLocking();
  }
  unregisterScrollLock() {
    this.scrollLocks -= 1, this.handleScrollLocking();
  }
  handleScrollLocking() {
    if (isServer)
      return;
    let {
      scrollLocks
    } = this, {
      body
    } = document, wrapper = body.firstElementChild;
    scrollLocks === 0 ? (body.removeAttribute(SCROLL_LOCKING_ATTRIBUTE), body.removeAttribute(SCROLL_LOCKING_HIDDEN_ATTRIBUTE), wrapper && wrapper.removeAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE), window.scroll(0, scrollPosition), this.locked = !1) : scrollLocks > 0 && !this.locked && (scrollPosition = window.pageYOffset, body.setAttribute(SCROLL_LOCKING_ATTRIBUTE, ""), isScrollBarVisible() || body.setAttribute(SCROLL_LOCKING_HIDDEN_ATTRIBUTE, ""), wrapper && (wrapper.setAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE, ""), wrapper.scrollTop = scrollPosition), this.locked = !0);
  }
  resetScrollPosition() {
    scrollPosition = 0;
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/get.js
var OBJECT_NOTATION_MATCHER = /\[(.*?)\]|(\w+)/g;
function get(obj, keypath, defaultValue) {
  if (obj == null)
    return;
  let keys = Array.isArray(keypath) ? keypath : getKeypath(keypath), acc = obj;
  for (let i = 0; i < keys.length; i++) {
    let val = acc[keys[i]];
    if (val === void 0)
      return defaultValue;
    acc = val;
  }
  return acc;
}
function getKeypath(str) {
  let path = [], result;
  for (; result = OBJECT_NOTATION_MATCHER.exec(str); ) {
    let [, first, second] = result;
    path.push(first || second);
  }
  return path;
}

// node_modules/@shopify/polaris/build/esm/utilities/merge.js
function merge(...objs) {
  let final = {};
  for (let obj of objs)
    final = mergeRecursively(final, obj);
  return final;
}
function mergeRecursively(inputObjA, objB) {
  let objA = Array.isArray(inputObjA) ? [...inputObjA] : {
    ...inputObjA
  };
  for (let key in objB)
    if (Object.prototype.hasOwnProperty.call(objB, key))
      isMergeableValue(objB[key]) && isMergeableValue(objA[key]) ? objA[key] = mergeRecursively(objA[key], objB[key]) : objA[key] = objB[key];
    else
      continue;
  return objA;
}
function isMergeableValue(value) {
  return value !== null && typeof value == "object";
}

// node_modules/@shopify/polaris/build/esm/utilities/i18n/I18n.js
var REPLACE_REGEX = /{([^}]*)}/g, I18n = class {
  /**
   * @param translation A locale object or array of locale objects that overrides default translations. If specifying an array then your desired language dictionary should come first, followed by your fallback language dictionaries
   */
  constructor(translation) {
    this.translation = {}, this.translation = Array.isArray(translation) ? merge(...translation.slice().reverse()) : translation;
  }
  translate(id, replacements) {
    let text = get(this.translation, id, "");
    return text ? replacements ? text.replace(REPLACE_REGEX, (match) => {
      let replacement = match.substring(1, match.length - 1);
      if (replacements[replacement] === void 0) {
        let replacementData = JSON.stringify(replacements);
        throw new Error(`Error in translation for key '${id}'. No replacement found for key '${replacement}'. The following replacements were passed: '${replacementData}'`);
      }
      return replacements[replacement];
    }) : text : "";
  }
  translationKeyExists(path) {
    return Boolean(get(this.translation, path));
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/features/context.js
import { createContext as createContext3 } from "react";
var FeaturesContext = /* @__PURE__ */ createContext3(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/i18n/context.js
import { createContext as createContext4 } from "react";
var I18nContext = /* @__PURE__ */ createContext4(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/scroll-lock-manager/context.js
import { createContext as createContext5 } from "react";
var ScrollLockManagerContext = /* @__PURE__ */ createContext5(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/context.js
import { createContext as createContext6 } from "react";
var StickyManagerContext = /* @__PURE__ */ createContext6(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/link/context.js
import { createContext as createContext7 } from "react";
var LinkContext = /* @__PURE__ */ createContext7(void 0);

// node_modules/@shopify/polaris/build/esm/components/MediaQueryProvider/MediaQueryProvider.js
import React2, { useState as useState2, useCallback, useEffect as useEffect3, useMemo } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/media-query/context.js
import { createContext as createContext8 } from "react";
var MediaQueryContext = /* @__PURE__ */ createContext8(void 0);

// node_modules/@shopify/polaris/build/esm/components/EventListener/EventListener.js
import { PureComponent } from "react";
var EventListener = class extends PureComponent {
  componentDidMount() {
    this.attachListener();
  }
  componentDidUpdate({
    passive,
    ...detachProps
  }) {
    this.detachListener(detachProps), this.attachListener();
  }
  componentWillUnmount() {
    this.detachListener();
  }
  render() {
    return null;
  }
  attachListener() {
    let {
      event,
      handler,
      capture,
      passive,
      window: customWindow
    } = this.props;
    (customWindow || globalThis.window).addEventListener(event, handler, {
      capture,
      passive
    });
  }
  detachListener(prevProps) {
    let {
      event,
      handler,
      capture,
      window: customWindow
    } = prevProps || this.props;
    (customWindow || globalThis.window).removeEventListener(event, handler, capture);
  }
};

// node_modules/@shopify/polaris/build/esm/components/MediaQueryProvider/MediaQueryProvider.js
var MediaQueryProvider = function({
  children
}) {
  let [isNavigationCollapsed, setIsNavigationCollapsed] = useState2(!1), handleResize = useCallback(debounce(() => {
    isNavigationCollapsed !== navigationBarCollapsed().matches && setIsNavigationCollapsed(!isNavigationCollapsed);
  }, 40, {
    trailing: !0,
    leading: !0,
    maxWait: 40
  }), [isNavigationCollapsed]);
  useEffect3(() => {
    setIsNavigationCollapsed(navigationBarCollapsed().matches);
  }, []);
  let context = useMemo(() => ({
    isNavigationCollapsed
  }), [isNavigationCollapsed]);
  return /* @__PURE__ */ React2.createElement(MediaQueryContext.Provider, {
    value: context
  }, /* @__PURE__ */ React2.createElement(EventListener, {
    event: "resize",
    handler: handleResize
  }), children);
};

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/PortalsManager.js
import React4, { useRef as useRef2, useMemo as useMemo2 } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/use-is-after-initial-mount.js
import { useState as useState3, useEffect as useEffect4 } from "react";
function useIsAfterInitialMount() {
  let [isAfterInitialMount, setIsAfterInitialMount] = useState3(!1);
  return useEffect4(() => {
    setIsAfterInitialMount(!0);
  }, []), isAfterInitialMount;
}

// node_modules/@shopify/polaris/build/esm/utilities/portals/context.js
import { createContext as createContext9 } from "react";
var PortalsManagerContext = /* @__PURE__ */ createContext9(void 0);

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/components/PortalsContainer/PortalsContainer.js
import React3, { forwardRef } from "react";
function PortalsContainerComponent(_props, ref) {
  return /* @__PURE__ */ React3.createElement("div", {
    id: "PolarisPortalsContainer",
    ref
  });
}
var PortalsContainer = /* @__PURE__ */ forwardRef(PortalsContainerComponent);

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/PortalsManager.js
function PortalsManager({
  children,
  container
}) {
  let isMounted = useIsAfterInitialMount(), ref = useRef2(null), contextValue = useMemo2(() => container ? {
    container
  } : isMounted ? {
    container: ref.current
  } : {
    container: null
  }, [container, isMounted]);
  return /* @__PURE__ */ React4.createElement(PortalsManagerContext.Provider, {
    value: contextValue
  }, children, container ? null : /* @__PURE__ */ React4.createElement(PortalsContainer, {
    ref
  }));
}

// node_modules/@shopify/polaris/build/esm/components/FocusManager/FocusManager.js
import React5, { useState as useState4, useCallback as useCallback2, useMemo as useMemo3 } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/focus-manager/context.js
import { createContext as createContext10 } from "react";
var FocusManagerContext = /* @__PURE__ */ createContext10(void 0);

// node_modules/@shopify/polaris/build/esm/components/FocusManager/FocusManager.js
function FocusManager({
  children
}) {
  let [trapFocusList, setTrapFocusList] = useState4([]), add = useCallback2((id) => {
    setTrapFocusList((list) => [...list, id]);
  }, []), remove = useCallback2((id) => {
    let removed = !0;
    return setTrapFocusList((list) => {
      let clone = [...list], index = clone.indexOf(id);
      return index === -1 ? removed = !1 : clone.splice(index, 1), clone;
    }), removed;
  }, []), value = useMemo3(() => ({
    trapFocusList,
    add,
    remove
  }), [add, trapFocusList, remove]);
  return /* @__PURE__ */ React5.createElement(FocusManagerContext.Provider, {
    value
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/EphemeralPresenceManager/EphemeralPresenceManager.js
import React6, { useState as useState5, useCallback as useCallback3, useMemo as useMemo4 } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/ephemeral-presence-manager/context.js
import { createContext as createContext11 } from "react";
var EphemeralPresenceManagerContext = /* @__PURE__ */ createContext11(void 0);

// node_modules/@shopify/polaris/build/esm/components/EphemeralPresenceManager/EphemeralPresenceManager.js
var defaultState = {
  tooltip: 0,
  hovercard: 0
};
function EphemeralPresenceManager({
  children
}) {
  let [presenceCounter, setPresenceCounter] = useState5(defaultState), addPresence = useCallback3((key) => {
    setPresenceCounter((prevList) => ({
      ...prevList,
      [key]: prevList[key] + 1
    }));
  }, []), removePresence = useCallback3((key) => {
    setPresenceCounter((prevList) => ({
      ...prevList,
      [key]: prevList[key] - 1
    }));
  }, []), value = useMemo4(() => ({
    presenceList: Object.entries(presenceCounter).reduce((previousValue, currentValue) => {
      let [key, value2] = currentValue;
      return {
        ...previousValue,
        [key]: value2 >= 1
      };
    }, {}),
    presenceCounter,
    addPresence,
    removePresence
  }), [addPresence, removePresence, presenceCounter]);
  return /* @__PURE__ */ React6.createElement(EphemeralPresenceManagerContext.Provider, {
    value
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/AppProvider/AppProvider.js
var MAX_SCROLLBAR_WIDTH = 20, SCROLLBAR_TEST_ELEMENT_PARENT_SIZE = 30, SCROLLBAR_TEST_ELEMENT_CHILD_SIZE = SCROLLBAR_TEST_ELEMENT_PARENT_SIZE + 10;
function measureScrollbars() {
  let parentEl = document.createElement("div");
  parentEl.setAttribute("style", `position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px; height:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px;`);
  let child = document.createElement("div");
  child.setAttribute("style", `width:100%; height: ${SCROLLBAR_TEST_ELEMENT_CHILD_SIZE}; overflow:scroll; scrollbar-width: thin;`), parentEl.appendChild(child), document.body.appendChild(parentEl);
  let scrollbarWidth = SCROLLBAR_TEST_ELEMENT_PARENT_SIZE - (parentEl.firstElementChild?.clientWidth ?? 0), scrollbarWidthWithSafetyHatch = Math.min(scrollbarWidth, MAX_SCROLLBAR_WIDTH);
  document.documentElement.style.setProperty("--pc-app-provider-scrollbar-width", `${scrollbarWidthWithSafetyHatch}px`), document.body.removeChild(parentEl);
}
var AppProvider = class extends Component {
  constructor(props) {
    super(props), this.setBodyStyles = () => {
      document.body.style.backgroundColor = "var(--p-color-bg)", document.body.style.color = "var(--p-color-text)";
    }, this.setRootAttributes = () => {
      let activeThemeName = this.getThemeName();
      themeNames.forEach((themeName) => {
        document.documentElement.classList.toggle(createThemeClassName2(themeName), themeName === activeThemeName);
      });
    }, this.getThemeName = () => this.props.theme ?? themeNameDefault2, this.stickyManager = new StickyManager(), this.scrollLockManager = new ScrollLockManager();
    let {
      i18n,
      linkComponent
    } = this.props;
    this.state = {
      link: linkComponent,
      intl: new I18n(i18n)
    };
  }
  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document), this.setBodyStyles(), this.setRootAttributes();
      let isSafari16 = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome") && (navigator.userAgent.includes("Version/16.1") || navigator.userAgent.includes("Version/16.2") || navigator.userAgent.includes("Version/16.3")), isMobileApp16 = navigator.userAgent.includes("Shopify Mobile/iOS") && (navigator.userAgent.includes("OS 16_1") || navigator.userAgent.includes("OS 16_2") || navigator.userAgent.includes("OS 16_3"));
      (isSafari16 || isMobileApp16) && document.documentElement.classList.add("Polaris-Safari-16-Font-Optical-Sizing-Patch");
    }
    measureScrollbars();
  }
  componentDidUpdate({
    i18n: prevI18n,
    linkComponent: prevLinkComponent
  }) {
    let {
      i18n,
      linkComponent
    } = this.props;
    this.setRootAttributes(), !(i18n === prevI18n && linkComponent === prevLinkComponent) && this.setState({
      link: linkComponent,
      intl: new I18n(i18n)
    });
  }
  render() {
    let {
      children,
      features = {}
    } = this.props, themeName = this.getThemeName(), {
      intl,
      link
    } = this.state;
    return /* @__PURE__ */ React7.createElement(ThemeNameContext.Provider, {
      value: themeName
    }, /* @__PURE__ */ React7.createElement(ThemeContext.Provider, {
      value: getTheme(themeName)
    }, /* @__PURE__ */ React7.createElement(FeaturesContext.Provider, {
      value: features
    }, /* @__PURE__ */ React7.createElement(I18nContext.Provider, {
      value: intl
    }, /* @__PURE__ */ React7.createElement(ScrollLockManagerContext.Provider, {
      value: this.scrollLockManager
    }, /* @__PURE__ */ React7.createElement(StickyManagerContext.Provider, {
      value: this.stickyManager
    }, /* @__PURE__ */ React7.createElement(LinkContext.Provider, {
      value: link
    }, /* @__PURE__ */ React7.createElement(MediaQueryProvider, null, /* @__PURE__ */ React7.createElement(PortalsManager, null, /* @__PURE__ */ React7.createElement(FocusManager, null, /* @__PURE__ */ React7.createElement(EphemeralPresenceManager, null, children)))))))))));
  }
};

// node_modules/@shopify/polaris/build/esm/components/Button/utils.js
import React14 from "react";

// node_modules/@shopify/polaris/build/esm/components/Button/Button.js
import React13 from "react";
import { SelectIcon, ChevronDownIcon, ChevronUpIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/utilities/is-element-in-viewport.js
function isElementInViewport(element) {
  let {
    top,
    left,
    bottom,
    right
  } = element.getBoundingClientRect(), window2 = element.ownerDocument.defaultView || globalThis.window;
  return top >= 0 && right <= window2.innerWidth && bottom <= window2.innerHeight && left >= 0;
}

// node_modules/@shopify/polaris/build/esm/utilities/focus.js
var FOCUSABLE_SELECTOR = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]', KEYBOARD_FOCUSABLE_SELECTORS = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]:not([tabindex="-1"])', MENUITEM_FOCUSABLE_SELECTORS = 'a[role="menuitem"],frame[role="menuitem"],iframe[role="menuitem"],input[role="menuitem"]:not([type=hidden]):not(:disabled),select[role="menuitem"]:not(:disabled),textarea[role="menuitem"]:not(:disabled),button[role="menuitem"]:not(:disabled),*[tabindex]:not([tabindex="-1"])', handleMouseUpByBlurring = ({
  currentTarget
}) => currentTarget.blur();
function nextFocusableNode(node, filter) {
  let allFocusableElements = [...document.querySelectorAll(FOCUSABLE_SELECTOR)], sliceLocation = allFocusableElements.indexOf(node) + 1, focusableElementsAfterNode = allFocusableElements.slice(sliceLocation);
  for (let focusableElement of focusableElementsAfterNode)
    if (isElementInViewport(focusableElement) && (!filter || filter && filter(focusableElement)))
      return focusableElement;
  return null;
}
function findFirstFocusableNode(element, onlyDescendants = !0) {
  return !onlyDescendants && matches(element, FOCUSABLE_SELECTOR) ? element : element.querySelector(FOCUSABLE_SELECTOR);
}
function findFirstFocusableNodeIncludingDisabled(element) {
  let focusableSelector = "a,button,frame,iframe,input:not([type=hidden]),select,textarea,*[tabindex]";
  return matches(element, focusableSelector) ? element : element.querySelector(focusableSelector);
}
function focusNextFocusableNode(node, filter) {
  let nextFocusable = nextFocusableNode(node, filter);
  return nextFocusable && nextFocusable instanceof HTMLElement ? (nextFocusable.focus(), !0) : !1;
}
function findFirstKeyboardFocusableNode(element, onlyDescendants = !0) {
  return !onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS) ? element : element.querySelector(KEYBOARD_FOCUSABLE_SELECTORS);
}
function wrapFocusPreviousFocusableMenuItem(parentElement, currentFocusedElement) {
  let allFocusableChildren = getMenuFocusableDescendants(parentElement), currentItemIdx = getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement);
  currentItemIdx === -1 ? allFocusableChildren[0].focus() : allFocusableChildren[(currentItemIdx - 1 + allFocusableChildren.length) % allFocusableChildren.length].focus();
}
function wrapFocusNextFocusableMenuItem(parentElement, currentFocusedElement) {
  let allFocusableChildren = getMenuFocusableDescendants(parentElement), currentItemIdx = getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement);
  currentItemIdx === -1 ? allFocusableChildren[0].focus() : allFocusableChildren[(currentItemIdx + 1) % allFocusableChildren.length].focus();
}
function getMenuFocusableDescendants(element) {
  return element.querySelectorAll(MENUITEM_FOCUSABLE_SELECTORS);
}
function getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement) {
  let currentItemIdx = 0;
  for (let focusableChild of allFocusableChildren) {
    if (focusableChild === currentFocusedElement)
      break;
    currentItemIdx++;
  }
  return currentItemIdx === allFocusableChildren.length ? -1 : currentItemIdx;
}
function matches(node, selector) {
  if (node.matches)
    return node.matches(selector);
  let matches2 = (node.ownerDocument || document).querySelectorAll(selector), i = matches2.length;
  for (; --i >= 0 && matches2.item(i) !== node; )
    return i > -1;
}

// node_modules/@shopify/polaris/build/esm/components/Button/Button.css.js
var styles2 = {
  Button: "Polaris-Button",
  disabled: "Polaris-Button--disabled",
  pressed: "Polaris-Button--pressed",
  variantPrimary: "Polaris-Button--variantPrimary",
  variantSecondary: "Polaris-Button--variantSecondary",
  variantTertiary: "Polaris-Button--variantTertiary",
  variantPlain: "Polaris-Button--variantPlain",
  removeUnderline: "Polaris-Button--removeUnderline",
  variantMonochromePlain: "Polaris-Button--variantMonochromePlain",
  toneSuccess: "Polaris-Button--toneSuccess",
  toneCritical: "Polaris-Button--toneCritical",
  sizeMicro: "Polaris-Button--sizeMicro",
  sizeSlim: "Polaris-Button--sizeSlim",
  sizeMedium: "Polaris-Button--sizeMedium",
  sizeLarge: "Polaris-Button--sizeLarge",
  textAlignCenter: "Polaris-Button--textAlignCenter",
  textAlignStart: "Polaris-Button--textAlignStart",
  textAlignLeft: "Polaris-Button--textAlignLeft",
  textAlignEnd: "Polaris-Button--textAlignEnd",
  textAlignRight: "Polaris-Button--textAlignRight",
  fullWidth: "Polaris-Button--fullWidth",
  iconOnly: "Polaris-Button--iconOnly",
  iconWithText: "Polaris-Button--iconWithText",
  disclosure: "Polaris-Button--disclosure",
  loading: "Polaris-Button--loading",
  pressable: "Polaris-Button--pressable",
  hidden: "Polaris-Button--hidden",
  Icon: "Polaris-Button__Icon",
  Spinner: "Polaris-Button__Spinner"
};

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.js
import React9 from "react";

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.css.js
var styles3 = {
  Icon: "Polaris-Icon",
  toneInherit: "Polaris-Icon--toneInherit",
  toneBase: "Polaris-Icon--toneBase",
  toneSubdued: "Polaris-Icon--toneSubdued",
  toneCaution: "Polaris-Icon--toneCaution",
  toneWarning: "Polaris-Icon--toneWarning",
  toneCritical: "Polaris-Icon--toneCritical",
  toneInteractive: "Polaris-Icon--toneInteractive",
  toneInfo: "Polaris-Icon--toneInfo",
  toneSuccess: "Polaris-Icon--toneSuccess",
  tonePrimary: "Polaris-Icon--tonePrimary",
  toneEmphasis: "Polaris-Icon--toneEmphasis",
  toneMagic: "Polaris-Icon--toneMagic",
  toneTextCaution: "Polaris-Icon--toneTextCaution",
  toneTextWarning: "Polaris-Icon--toneTextWarning",
  toneTextCritical: "Polaris-Icon--toneTextCritical",
  toneTextInfo: "Polaris-Icon--toneTextInfo",
  toneTextPrimary: "Polaris-Icon--toneTextPrimary",
  toneTextSuccess: "Polaris-Icon--toneTextSuccess",
  toneTextMagic: "Polaris-Icon--toneTextMagic",
  Svg: "Polaris-Icon__Svg",
  Img: "Polaris-Icon__Img",
  Placeholder: "Polaris-Icon__Placeholder"
};

// node_modules/@shopify/polaris/build/esm/components/Text/Text.js
import React8 from "react";

// node_modules/@shopify/polaris/build/esm/components/Text/Text.css.js
var styles4 = {
  root: "Polaris-Text--root",
  block: "Polaris-Text--block",
  truncate: "Polaris-Text--truncate",
  visuallyHidden: "Polaris-Text--visuallyHidden",
  start: "Polaris-Text--start",
  center: "Polaris-Text--center",
  end: "Polaris-Text--end",
  justify: "Polaris-Text--justify",
  base: "Polaris-Text--base",
  inherit: "Polaris-Text--inherit",
  disabled: "Polaris-Text--disabled",
  success: "Polaris-Text--success",
  critical: "Polaris-Text--critical",
  caution: "Polaris-Text--caution",
  subdued: "Polaris-Text--subdued",
  magic: "Polaris-Text--magic",
  "magic-subdued": "Polaris-Text__magic--subdued",
  "text-inverse": "Polaris-Text__text--inverse",
  "text-inverse-secondary": "Polaris-Text--textInverseSecondary",
  headingXs: "Polaris-Text--headingXs",
  headingSm: "Polaris-Text--headingSm",
  headingMd: "Polaris-Text--headingMd",
  headingLg: "Polaris-Text--headingLg",
  headingXl: "Polaris-Text--headingXl",
  heading2xl: "Polaris-Text--heading2xl",
  heading3xl: "Polaris-Text--heading3xl",
  bodyXs: "Polaris-Text--bodyXs",
  bodySm: "Polaris-Text--bodySm",
  bodyMd: "Polaris-Text--bodyMd",
  bodyLg: "Polaris-Text--bodyLg",
  regular: "Polaris-Text--regular",
  medium: "Polaris-Text--medium",
  semibold: "Polaris-Text--semibold",
  bold: "Polaris-Text--bold",
  break: "Polaris-Text--break",
  numeric: "Polaris-Text--numeric",
  "line-through": "Polaris-Text__line--through"
};

// node_modules/@shopify/polaris/build/esm/components/Text/Text.js
var Text = ({
  alignment,
  as,
  breakWord,
  children,
  tone,
  fontWeight,
  id,
  numeric = !1,
  truncate = !1,
  variant,
  visuallyHidden = !1,
  textDecorationLine
}) => {
  let Component2 = as || (visuallyHidden ? "span" : "p"), className = classNames(styles4.root, variant && styles4[variant], fontWeight && styles4[fontWeight], (alignment || truncate) && styles4.block, alignment && styles4[alignment], breakWord && styles4.break, tone && styles4[tone], numeric && styles4.numeric, truncate && styles4.truncate, visuallyHidden && styles4.visuallyHidden, textDecorationLine && styles4[textDecorationLine]);
  return /* @__PURE__ */ React8.createElement(Component2, Object.assign({
    className
  }, id && {
    id
  }), children);
};

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.js
function Icon({
  source,
  tone,
  accessibilityLabel
}) {
  let sourceType;
  typeof source == "function" ? sourceType = "function" : source === "placeholder" ? sourceType = "placeholder" : sourceType = "external";
  let className = classNames(styles3.Icon, tone && styles3[variationName("tone", tone)]), {
    mdDown
  } = useBreakpoints(), SourceComponent = source, contentMarkup = {
    function: /* @__PURE__ */ React9.createElement(SourceComponent, Object.assign({
      className: styles3.Svg,
      focusable: "false",
      "aria-hidden": "true"
      // On Mobile we're scaling the viewBox to 18x18 to make the icons bigger
      // Also, we're setting the viewport origin to 1x1 to center the icon
      // We use this syntax so we don't override the existing viewBox value if we don't need to.
    }, mdDown ? {
      viewBox: "1 1 18 18"
    } : {})),
    placeholder: /* @__PURE__ */ React9.createElement("div", {
      className: styles3.Placeholder
    }),
    external: /* @__PURE__ */ React9.createElement("img", {
      className: styles3.Img,
      src: `data:image/svg+xml;utf8,${source}`,
      alt: "",
      "aria-hidden": "true"
    })
  };
  return /* @__PURE__ */ React9.createElement("span", {
    className
  }, accessibilityLabel && /* @__PURE__ */ React9.createElement(Text, {
    as: "span",
    visuallyHidden: !0
  }, accessibilityLabel), contentMarkup[sourceType]);
}

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js
import React10 from "react";

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.css.js
var styles5 = {
  Spinner: "Polaris-Spinner",
  sizeSmall: "Polaris-Spinner--sizeSmall",
  sizeLarge: "Polaris-Spinner--sizeLarge"
};

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js
function Spinner({
  size = "large",
  accessibilityLabel,
  hasFocusableParent
}) {
  let isAfterInitialMount = useIsAfterInitialMount(), className = classNames(styles5.Spinner, size && styles5[variationName("size", size)]), spinnerSVGMarkup = size === "large" ? /* @__PURE__ */ React10.createElement("svg", {
    viewBox: "0 0 44 44",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React10.createElement("path", {
    d: "M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z"
  })) : /* @__PURE__ */ React10.createElement("svg", {
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React10.createElement("path", {
    d: "M7.229 1.173a9.25 9.25 0 1011.655 11.412 1.25 1.25 0 10-2.4-.698 6.75 6.75 0 11-8.506-8.329 1.25 1.25 0 10-.75-2.385z"
  })), spanAttributes = {
    ...!hasFocusableParent && {
      role: "status"
    }
  }, accessibilityLabelMarkup = (isAfterInitialMount || !hasFocusableParent) && /* @__PURE__ */ React10.createElement(Text, {
    as: "span",
    visuallyHidden: !0
  }, accessibilityLabel);
  return /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement("span", {
    className
  }, spinnerSVGMarkup), /* @__PURE__ */ React10.createElement("span", spanAttributes, accessibilityLabelMarkup));
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledButton/UnstyledButton.js
import React12 from "react";

// node_modules/@shopify/polaris/build/esm/utilities/use-disable-interaction.js
import { useCallback as useCallback4 } from "react";
function useDisableClick(disabled, handleClick) {
  let handleClickWrapper = useCallback4((event) => {
    disabled && (event.preventDefault(), event.stopPropagation());
  }, [disabled]);
  return disabled ? handleClickWrapper : handleClick;
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledLink/UnstyledLink.js
import React11, { memo, forwardRef as forwardRef2 } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/link/hooks.js
import { useContext as useContext2 } from "react";
function useLink() {
  return useContext2(LinkContext);
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledLink/UnstyledLink.js
var UnstyledLink = /* @__PURE__ */ memo(/* @__PURE__ */ forwardRef2(function(props, _ref) {
  let LinkComponent = useLink();
  if (LinkComponent)
    return /* @__PURE__ */ React11.createElement(LinkComponent, Object.assign({}, unstyled.props, props, {
      ref: _ref
    }));
  let {
    external,
    url,
    target: targetProp,
    ...rest
  } = props, target;
  external ? target = "_blank" : target = targetProp ?? void 0;
  let rel = target === "_blank" ? "noopener noreferrer" : void 0;
  return /* @__PURE__ */ React11.createElement("a", Object.assign({
    target
  }, rest, {
    href: url,
    rel
  }, unstyled.props, {
    ref: _ref
  }));
}));

// node_modules/@shopify/polaris/build/esm/components/UnstyledButton/UnstyledButton.js
function UnstyledButton({
  id,
  children,
  className,
  url,
  external,
  target,
  download,
  submit,
  disabled,
  loading,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaDescribedBy,
  ariaChecked,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  ...rest
}) {
  let buttonMarkup, commonProps = {
    id,
    className,
    "aria-label": accessibilityLabel
  }, interactiveProps = {
    ...commonProps,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart
  }, handleClick = useDisableClick(disabled, onClick);
  return url ? buttonMarkup = disabled ? (
    // Render an `<a>` so toggling disabled/enabled state changes only the
    // `href` attribute instead of replacing the whole element.
    /* @__PURE__ */ React12.createElement("a", commonProps, children)
  ) : /* @__PURE__ */ React12.createElement(UnstyledLink, Object.assign({}, interactiveProps, {
    url,
    external,
    target,
    download
  }, rest), children) : buttonMarkup = /* @__PURE__ */ React12.createElement("button", Object.assign({}, interactiveProps, {
    "aria-disabled": disabled,
    type: submit ? "submit" : "button",
    "aria-busy": loading ? !0 : void 0,
    "aria-controls": ariaControls,
    "aria-expanded": ariaExpanded,
    "aria-describedby": ariaDescribedBy,
    "aria-checked": ariaChecked,
    "aria-pressed": pressed,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onClick: handleClick,
    tabIndex: disabled ? -1 : void 0
  }, rest), children), buttonMarkup;
}

// node_modules/@shopify/polaris/build/esm/utilities/i18n/hooks.js
import { useContext as useContext3 } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/errors.js
var MissingAppProviderError = class extends Error {
  constructor(message = "") {
    super(`${message && `${message} `}Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.`), this.name = "MissingAppProviderError";
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/i18n/hooks.js
function useI18n() {
  let i18n = useContext3(I18nContext);
  if (!i18n)
    throw new MissingAppProviderError("No i18n was provided.");
  return i18n;
}

// node_modules/@shopify/polaris/build/esm/components/Button/Button.js
function Button({
  id,
  children,
  url,
  disabled,
  external,
  download,
  target,
  submit,
  loading,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaDescribedBy,
  ariaChecked,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  onPointerDown,
  icon,
  disclosure,
  removeUnderline,
  size = "medium",
  textAlign = "center",
  fullWidth,
  dataPrimaryLink,
  tone,
  variant = "secondary"
}) {
  let i18n = useI18n(), isDisabled = disabled || loading, {
    mdUp
  } = useBreakpoints(), className = classNames(styles2.Button, styles2.pressable, styles2[variationName("variant", variant)], styles2[variationName("size", size)], styles2[variationName("textAlign", textAlign)], fullWidth && styles2.fullWidth, disclosure && styles2.disclosure, icon && children && styles2.iconWithText, icon && children == null && styles2.iconOnly, isDisabled && styles2.disabled, loading && styles2.loading, pressed && !disabled && !url && styles2.pressed, removeUnderline && styles2.removeUnderline, tone && styles2[variationName("tone", tone)]), disclosureMarkup = disclosure ? /* @__PURE__ */ React13.createElement("span", {
    className: loading ? styles2.hidden : styles2.Icon
  }, /* @__PURE__ */ React13.createElement(Icon, {
    source: loading ? "placeholder" : getDisclosureIconSource(disclosure, ChevronUpIcon, ChevronDownIcon)
  })) : null, iconSource = isIconSource(icon) ? /* @__PURE__ */ React13.createElement(Icon, {
    source: loading ? "placeholder" : icon
  }) : icon, iconMarkup = iconSource ? /* @__PURE__ */ React13.createElement("span", {
    className: loading ? styles2.hidden : styles2.Icon
  }, iconSource) : null, hasPlainText = ["plain", "monochromePlain"].includes(variant), textFontWeight = "medium";
  hasPlainText ? textFontWeight = "regular" : variant === "primary" && (textFontWeight = mdUp ? "medium" : "semibold");
  let textVariant = "bodySm";
  (size === "large" || hasPlainText && size !== "micro") && (textVariant = "bodyMd");
  let childMarkup = children ? /* @__PURE__ */ React13.createElement(Text, {
    as: "span",
    variant: textVariant,
    fontWeight: textFontWeight,
    key: disabled ? "text-disabled" : "text"
  }, children) : null, spinnerSVGMarkup = loading ? /* @__PURE__ */ React13.createElement("span", {
    className: styles2.Spinner
  }, /* @__PURE__ */ React13.createElement(Spinner, {
    size: "small",
    accessibilityLabel: i18n.translate("Polaris.Button.spinnerAccessibilityLabel")
  })) : null, commonProps = {
    id,
    className,
    accessibilityLabel,
    ariaDescribedBy,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
    "data-primary-link": dataPrimaryLink
  }, linkProps = {
    url,
    external,
    download,
    target
  }, actionProps = {
    submit,
    disabled: isDisabled,
    loading,
    ariaControls,
    ariaExpanded,
    ariaChecked,
    pressed,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onPointerDown
  };
  return /* @__PURE__ */ React13.createElement(UnstyledButton, Object.assign({}, commonProps, linkProps, actionProps), spinnerSVGMarkup, iconMarkup, childMarkup, disclosureMarkup);
}
function isIconSource(x) {
  return typeof x == "string" || typeof x == "object" && x.body || typeof x == "function";
}
function getDisclosureIconSource(disclosure, upIcon, downIcon) {
  return disclosure === "select" ? SelectIcon : disclosure === "up" ? upIcon : downIcon;
}

// node_modules/@shopify/polaris/build/esm/components/Button/utils.js
function buttonFrom({
  content,
  onAction,
  plain,
  destructive,
  ...action5
}, overrides, key) {
  let plainVariant = plain ? "plain" : void 0, destructiveVariant = destructive ? "primary" : void 0, tone = !overrides?.tone && destructive ? "critical" : overrides?.tone;
  return /* @__PURE__ */ React14.createElement(Button, Object.assign({
    key,
    onClick: onAction,
    tone,
    variant: plainVariant || destructiveVariant
  }, action5, overrides), content);
}

// node_modules/@shopify/polaris/build/esm/components/Card/Card.js
import React17 from "react";

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.js
import React15 from "react";

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.css.js
var styles6 = {
  ShadowBevel: "Polaris-ShadowBevel"
};

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.js
function ShadowBevel(props) {
  let {
    as = "div",
    bevel = !0,
    borderRadius,
    boxShadow,
    children,
    zIndex = "0"
  } = props, Component2 = as;
  return /* @__PURE__ */ React15.createElement(Component2, {
    className: styles6.ShadowBevel,
    style: {
      "--pc-shadow-bevel-z-index": zIndex,
      ...getResponsiveValue("shadow-bevel", "content", mapResponsiveProp(bevel, (bevel2) => bevel2 ? '""' : "none")),
      ...getResponsiveValue("shadow-bevel", "box-shadow", mapResponsiveProp(bevel, (bevel2) => bevel2 ? `var(--p-shadow-${boxShadow})` : "none")),
      ...getResponsiveValue("shadow-bevel", "border-radius", mapResponsiveProp(bevel, (bevel2) => bevel2 ? `var(--p-border-radius-${borderRadius})` : "var(--p-border-radius-0)"))
    }
  }, children);
}
function mapResponsiveProp(responsiveProp, callback) {
  return typeof responsiveProp == "boolean" ? callback(responsiveProp) : Object.fromEntries(Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [breakpointsAlias, callback(value)]));
}

// node_modules/@shopify/polaris/build/esm/components/Box/Box.js
import React16, { forwardRef as forwardRef3 } from "react";

// node_modules/@shopify/polaris/build/esm/components/Box/Box.css.js
var styles7 = {
  listReset: "Polaris-Box--listReset",
  Box: "Polaris-Box",
  visuallyHidden: "Polaris-Box--visuallyHidden",
  printHidden: "Polaris-Box--printHidden"
};

// node_modules/@shopify/polaris/build/esm/components/Box/Box.js
var Box = /* @__PURE__ */ forwardRef3(({
  as = "div",
  background,
  borderColor,
  borderStyle,
  borderWidth,
  borderBlockStartWidth,
  borderBlockEndWidth,
  borderInlineStartWidth,
  borderInlineEndWidth,
  borderRadius,
  borderEndStartRadius,
  borderEndEndRadius,
  borderStartStartRadius,
  borderStartEndRadius,
  children,
  color,
  id,
  minHeight,
  minWidth,
  maxWidth,
  overflowX,
  overflowY,
  outlineColor,
  outlineStyle,
  outlineWidth,
  padding,
  paddingBlock,
  paddingBlockStart,
  paddingBlockEnd,
  paddingInline,
  paddingInlineStart,
  paddingInlineEnd,
  role,
  shadow,
  tabIndex,
  width,
  printHidden,
  visuallyHidden,
  position,
  insetBlockStart,
  insetBlockEnd,
  insetInlineStart,
  insetInlineEnd,
  zIndex,
  opacity,
  ...restProps
}, ref) => {
  let borderStyleValue = borderStyle || (borderColor || borderWidth || borderBlockStartWidth || borderBlockEndWidth || borderInlineStartWidth || borderInlineEndWidth ? "solid" : void 0), outlineStyleValue = outlineStyle || (outlineColor || outlineWidth ? "solid" : void 0), style = {
    "--pc-box-color": color ? `var(--p-color-${color})` : void 0,
    "--pc-box-background": background ? `var(--p-color-${background})` : void 0,
    // eslint-disable-next-line no-nested-ternary
    "--pc-box-border-color": borderColor ? borderColor === "transparent" ? "transparent" : `var(--p-color-${borderColor})` : void 0,
    "--pc-box-border-style": borderStyleValue,
    "--pc-box-border-radius": borderRadius ? `var(--p-border-radius-${borderRadius})` : void 0,
    "--pc-box-border-end-start-radius": borderEndStartRadius ? `var(--p-border-radius-${borderEndStartRadius})` : void 0,
    "--pc-box-border-end-end-radius": borderEndEndRadius ? `var(--p-border-radius-${borderEndEndRadius})` : void 0,
    "--pc-box-border-start-start-radius": borderStartStartRadius ? `var(--p-border-radius-${borderStartStartRadius})` : void 0,
    "--pc-box-border-start-end-radius": borderStartEndRadius ? `var(--p-border-radius-${borderStartEndRadius})` : void 0,
    "--pc-box-border-width": borderWidth ? `var(--p-border-width-${borderWidth})` : void 0,
    "--pc-box-border-block-start-width": borderBlockStartWidth ? `var(--p-border-width-${borderBlockStartWidth})` : void 0,
    "--pc-box-border-block-end-width": borderBlockEndWidth ? `var(--p-border-width-${borderBlockEndWidth})` : void 0,
    "--pc-box-border-inline-start-width": borderInlineStartWidth ? `var(--p-border-width-${borderInlineStartWidth})` : void 0,
    "--pc-box-border-inline-end-width": borderInlineEndWidth ? `var(--p-border-width-${borderInlineEndWidth})` : void 0,
    "--pc-box-min-height": minHeight,
    "--pc-box-min-width": minWidth,
    "--pc-box-max-width": maxWidth,
    "--pc-box-outline-color": outlineColor ? `var(--p-color-${outlineColor})` : void 0,
    "--pc-box-outline-style": outlineStyleValue,
    "--pc-box-outline-width": outlineWidth ? `var(--p-border-width-${outlineWidth})` : void 0,
    "--pc-box-overflow-x": overflowX,
    "--pc-box-overflow-y": overflowY,
    ...getResponsiveProps("box", "padding-block-start", "space", paddingBlockStart || paddingBlock || padding),
    ...getResponsiveProps("box", "padding-block-end", "space", paddingBlockEnd || paddingBlock || padding),
    ...getResponsiveProps("box", "padding-inline-start", "space", paddingInlineStart || paddingInline || padding),
    ...getResponsiveProps("box", "padding-inline-end", "space", paddingInlineEnd || paddingInline || padding),
    "--pc-box-shadow": shadow ? `var(--p-shadow-${shadow})` : void 0,
    "--pc-box-width": width,
    position,
    "--pc-box-inset-block-start": insetBlockStart ? `var(--p-space-${insetBlockStart})` : void 0,
    "--pc-box-inset-block-end": insetBlockEnd ? `var(--p-space-${insetBlockEnd})` : void 0,
    "--pc-box-inset-inline-start": insetInlineStart ? `var(--p-space-${insetInlineStart})` : void 0,
    "--pc-box-inset-inline-end": insetInlineEnd ? `var(--p-space-${insetInlineEnd})` : void 0,
    zIndex,
    opacity
  }, className = classNames(styles7.Box, visuallyHidden && styles7.visuallyHidden, printHidden && styles7.printHidden, as === "ul" && styles7.listReset);
  return /* @__PURE__ */ React16.createElement(as, {
    className,
    id,
    ref,
    style: sanitizeCustomProperties(style),
    role,
    tabIndex,
    ...restProps
  }, children);
});
Box.displayName = "Box";

// node_modules/@shopify/polaris/build/esm/components/Card/Card.js
var Card = ({
  children,
  background = "bg-surface",
  padding = {
    xs: "400"
  },
  roundedAbove = "sm"
}) => {
  let breakpoints = useBreakpoints(), defaultBorderRadius = "300", hasBorderRadius = Boolean(breakpoints[`${roundedAbove}Up`]);
  return /* @__PURE__ */ React17.createElement(WithinContentContext.Provider, {
    value: !0
  }, /* @__PURE__ */ React17.createElement(ShadowBevel, {
    boxShadow: "100",
    borderRadius: hasBorderRadius ? defaultBorderRadius : "0",
    zIndex: "32"
  }, /* @__PURE__ */ React17.createElement(Box, {
    background,
    padding,
    overflowX: "clip",
    overflowY: "clip",
    minHeight: "100%"
  }, children)));
};

// node_modules/@shopify/polaris/build/esm/components/InlineStack/InlineStack.js
import React18 from "react";

// node_modules/@shopify/polaris/build/esm/components/InlineStack/InlineStack.css.js
var styles8 = {
  InlineStack: "Polaris-InlineStack"
};

// node_modules/@shopify/polaris/build/esm/components/InlineStack/InlineStack.js
var InlineStack = function({
  as: Element2 = "div",
  align,
  direction = "row",
  blockAlign,
  gap,
  wrap = !0,
  children
}) {
  let style = {
    "--pc-inline-stack-align": align,
    "--pc-inline-stack-block-align": blockAlign,
    "--pc-inline-stack-wrap": wrap ? "wrap" : "nowrap",
    ...getResponsiveProps("inline-stack", "gap", "space", gap),
    ...getResponsiveValue("inline-stack", "flex-direction", direction)
  };
  return /* @__PURE__ */ React18.createElement(Element2, {
    className: styles8.InlineStack,
    style
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/BlockStack/BlockStack.js
import React19 from "react";

// node_modules/@shopify/polaris/build/esm/components/BlockStack/BlockStack.css.js
var styles9 = {
  BlockStack: "Polaris-BlockStack",
  listReset: "Polaris-BlockStack--listReset",
  fieldsetReset: "Polaris-BlockStack--fieldsetReset"
};

// node_modules/@shopify/polaris/build/esm/components/BlockStack/BlockStack.js
var BlockStack = ({
  as = "div",
  children,
  align,
  inlineAlign,
  gap,
  id,
  reverseOrder = !1,
  ...restProps
}) => {
  let className = classNames(styles9.BlockStack, (as === "ul" || as === "ol") && styles9.listReset, as === "fieldset" && styles9.fieldsetReset), style = {
    "--pc-block-stack-align": align ? `${align}` : null,
    "--pc-block-stack-inline-align": inlineAlign ? `${inlineAlign}` : null,
    "--pc-block-stack-order": reverseOrder ? "column-reverse" : "column",
    ...getResponsiveProps("block-stack", "gap", "space", gap)
  };
  return /* @__PURE__ */ React19.createElement(as, {
    className,
    id,
    style: sanitizeCustomProperties(style),
    ...restProps
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.js
import React39, { useContext as useContext8, useRef as useRef12, useState as useState11, useMemo as useMemo5 } from "react";
import { SearchIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/components/FilterActionsProvider/FilterActionsProvider.js
import React20, { createContext as createContext12 } from "react";
var FilterActionsContext = /* @__PURE__ */ createContext12(!1);
function FilterActionsProvider({
  children,
  filterActions
}) {
  return /* @__PURE__ */ React20.createElement(FilterActionsContext.Provider, {
    value: filterActions
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Section/Section.js
import React30 from "react";

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Item/Item.js
import React29, { useRef as useRef8, useState as useState9 } from "react";

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.css.js
var styles10 = {
  Item: "Polaris-ActionList__Item",
  default: "Polaris-ActionList--default",
  active: "Polaris-ActionList--active",
  destructive: "Polaris-ActionList--destructive",
  disabled: "Polaris-ActionList--disabled",
  Prefix: "Polaris-ActionList__Prefix",
  Suffix: "Polaris-ActionList__Suffix",
  indented: "Polaris-ActionList--indented",
  menu: "Polaris-ActionList--menu",
  Text: "Polaris-ActionList__Text"
};

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.js
import React22, { useContext as useContext4 } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/within-filter-context.js
import { createContext as createContext13 } from "react";
var WithinFilterContext = /* @__PURE__ */ createContext13(!1);

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.css.js
var styles11 = {
  Badge: "Polaris-Badge",
  toneSuccess: "Polaris-Badge--toneSuccess",
  "toneSuccess-strong": "Polaris-Badge__toneSuccess--strong",
  toneInfo: "Polaris-Badge--toneInfo",
  "toneInfo-strong": "Polaris-Badge__toneInfo--strong",
  toneAttention: "Polaris-Badge--toneAttention",
  "toneAttention-strong": "Polaris-Badge__toneAttention--strong",
  toneWarning: "Polaris-Badge--toneWarning",
  "toneWarning-strong": "Polaris-Badge__toneWarning--strong",
  toneCritical: "Polaris-Badge--toneCritical",
  "toneCritical-strong": "Polaris-Badge__toneCritical--strong",
  toneNew: "Polaris-Badge--toneNew",
  toneMagic: "Polaris-Badge--toneMagic",
  "toneRead-only": "Polaris-Badge__toneRead--only",
  toneEnabled: "Polaris-Badge--toneEnabled",
  sizeLarge: "Polaris-Badge--sizeLarge",
  withinFilter: "Polaris-Badge--withinFilter",
  Icon: "Polaris-Badge__Icon",
  PipContainer: "Polaris-Badge__PipContainer"
};

// node_modules/@shopify/polaris/build/esm/components/Badge/types.js
var ToneValue = /* @__PURE__ */ function(ToneValue2) {
  return ToneValue2.Info = "info", ToneValue2.Success = "success", ToneValue2.Warning = "warning", ToneValue2.Critical = "critical", ToneValue2.Attention = "attention", ToneValue2.New = "new", ToneValue2.Magic = "magic", ToneValue2.InfoStrong = "info-strong", ToneValue2.SuccessStrong = "success-strong", ToneValue2.WarningStrong = "warning-strong", ToneValue2.CriticalStrong = "critical-strong", ToneValue2.AttentionStrong = "attention-strong", ToneValue2.ReadOnly = "read-only", ToneValue2.Enabled = "enabled", ToneValue2;
}({}), ProgressValue = /* @__PURE__ */ function(ProgressValue2) {
  return ProgressValue2.Incomplete = "incomplete", ProgressValue2.PartiallyComplete = "partiallyComplete", ProgressValue2.Complete = "complete", ProgressValue2;
}({});

// node_modules/@shopify/polaris/build/esm/components/Badge/utils.js
function getDefaultAccessibilityLabel(i18n, progress, tone) {
  let progressLabel = "", toneLabel = "";
  if (!progress && !tone)
    return "";
  switch (progress) {
    case ProgressValue.Incomplete:
      progressLabel = i18n.translate("Polaris.Badge.PROGRESS_LABELS.incomplete");
      break;
    case ProgressValue.PartiallyComplete:
      progressLabel = i18n.translate("Polaris.Badge.PROGRESS_LABELS.partiallyComplete");
      break;
    case ProgressValue.Complete:
      progressLabel = i18n.translate("Polaris.Badge.PROGRESS_LABELS.complete");
      break;
  }
  switch (tone) {
    case ToneValue.Info:
    case ToneValue.InfoStrong:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.info");
      break;
    case ToneValue.Success:
    case ToneValue.SuccessStrong:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.success");
      break;
    case ToneValue.Warning:
    case ToneValue.WarningStrong:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.warning");
      break;
    case ToneValue.Critical:
    case ToneValue.CriticalStrong:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.critical");
      break;
    case ToneValue.Attention:
    case ToneValue.AttentionStrong:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.attention");
      break;
    case ToneValue.New:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.new");
      break;
    case ToneValue.ReadOnly:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.readOnly");
      break;
    case ToneValue.Enabled:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.enabled");
      break;
  }
  return !tone && progress ? progressLabel : tone && !progress ? toneLabel : i18n.translate("Polaris.Badge.progressAndTone", {
    progressLabel,
    toneLabel
  });
}

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.js
import React21 from "react";

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.css.js
var styles12 = {
  Pip: "Polaris-Badge-Pip",
  toneInfo: "Polaris-Badge-Pip--toneInfo",
  toneSuccess: "Polaris-Badge-Pip--toneSuccess",
  toneNew: "Polaris-Badge-Pip--toneNew",
  toneAttention: "Polaris-Badge-Pip--toneAttention",
  toneWarning: "Polaris-Badge-Pip--toneWarning",
  toneCritical: "Polaris-Badge-Pip--toneCritical",
  progressIncomplete: "Polaris-Badge-Pip--progressIncomplete",
  progressPartiallyComplete: "Polaris-Badge-Pip--progressPartiallyComplete",
  progressComplete: "Polaris-Badge-Pip--progressComplete"
};

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.js
function Pip({
  tone,
  progress = "complete",
  accessibilityLabelOverride
}) {
  let i18n = useI18n(), className = classNames(styles12.Pip, tone && styles12[variationName("tone", tone)], progress && styles12[variationName("progress", progress)]), accessibilityLabel = accessibilityLabelOverride || getDefaultAccessibilityLabel(i18n, progress, tone);
  return /* @__PURE__ */ React21.createElement("span", {
    className
  }, /* @__PURE__ */ React21.createElement(Text, {
    as: "span",
    visuallyHidden: !0
  }, accessibilityLabel));
}

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.js
var DEFAULT_SIZE = "medium", progressIconMap = {
  complete: () => /* @__PURE__ */ React22.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ React22.createElement("path", {
    d: "M6 10c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.121-2.122C8.605 6 9.07 6 10 6c.93 0 1.395 0 1.776.102a3 3 0 0 1 2.122 2.122C14 8.605 14 9.07 14 10s0 1.395-.102 1.777a3 3 0 0 1-2.122 2.12C11.395 14 10.93 14 10 14s-1.395 0-1.777-.102a3 3 0 0 1-2.12-2.121C6 11.395 6 10.93 6 10Z"
  })),
  partiallyComplete: () => /* @__PURE__ */ React22.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ React22.createElement("path", {
    fillRule: "evenodd",
    d: "m8.888 6.014-.017-.018-.02.02c-.253.013-.45.038-.628.086a3 3 0 0 0-2.12 2.122C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.121 2.12C8.605 14 9.07 14 10 14c.93 0 1.395 0 1.776-.102a3 3 0 0 0 2.122-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.122-2.122C11.395 6 10.93 6 10 6c-.475 0-.829 0-1.112.014ZM8.446 7.34a1.75 1.75 0 0 0-1.041.94l4.314 4.315c.443-.2.786-.576.941-1.042L8.446 7.34Zm4.304 2.536L10.124 7.25c.908.001 1.154.013 1.329.06a1.75 1.75 0 0 1 1.237 1.237c.047.175.059.42.06 1.329ZM8.547 12.69c.182.05.442.06 1.453.06h.106L7.25 9.894V10c0 1.01.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237Z"
  })),
  incomplete: () => /* @__PURE__ */ React22.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ React22.createElement("path", {
    fillRule: "evenodd",
    d: "M8.547 12.69c.183.05.443.06 1.453.06s1.27-.01 1.453-.06a1.75 1.75 0 0 0 1.237-1.237c.05-.182.06-.443.06-1.453s-.01-1.27-.06-1.453a1.75 1.75 0 0 0-1.237-1.237c-.182-.05-.443-.06-1.453-.06s-1.27.01-1.453.06A1.75 1.75 0 0 0 7.31 8.547c-.05.183-.06.443-.06 1.453s.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237ZM6.102 8.224C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C8.605 14 9.07 14 10 14s1.395 0 1.777-.102a3 3 0 0 0 2.12-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.121-2.122C11.395 6 10.93 6 10 6c-.93 0-1.395 0-1.776.102a3 3 0 0 0-2.122 2.122Z"
  }))
};
function Badge({
  children,
  tone,
  progress,
  icon,
  size = DEFAULT_SIZE,
  toneAndProgressLabelOverride
}) {
  let i18n = useI18n(), withinFilter = useContext4(WithinFilterContext), className = classNames(styles11.Badge, tone && styles11[variationName("tone", tone)], size && size !== DEFAULT_SIZE && styles11[variationName("size", size)], withinFilter && styles11.withinFilter), accessibilityLabel = toneAndProgressLabelOverride || getDefaultAccessibilityLabel(i18n, progress, tone), accessibilityMarkup = Boolean(accessibilityLabel) && /* @__PURE__ */ React22.createElement(Text, {
    as: "span",
    visuallyHidden: !0
  }, accessibilityLabel);
  return progress && !icon && (accessibilityMarkup = /* @__PURE__ */ React22.createElement("span", {
    className: styles11.Icon
  }, /* @__PURE__ */ React22.createElement(Icon, {
    accessibilityLabel,
    source: progressIconMap[progress]
  }))), /* @__PURE__ */ React22.createElement("span", {
    className
  }, accessibilityMarkup, icon && /* @__PURE__ */ React22.createElement("span", {
    className: styles11.Icon
  }, /* @__PURE__ */ React22.createElement(Icon, {
    source: icon
  })), children && /* @__PURE__ */ React22.createElement(Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: tone === "new" ? "medium" : void 0
  }, children));
}
Badge.Pip = Pip;

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.js
import React28, { useState as useState8, useId as useId3, useRef as useRef7, useCallback as useCallback7, useEffect as useEffect8 } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/use-toggle.js
import { useState as useState6, useCallback as useCallback5 } from "react";
function useToggle(initialState) {
  let [value, setState] = useState6(initialState);
  return {
    value,
    toggle: useCallback5(() => setState((state) => !state), []),
    setTrue: useCallback5(() => setState(!0), []),
    setFalse: useCallback5(() => setState(!1), [])
  };
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.css.js
var styles13 = {
  TooltipContainer: "Polaris-Tooltip__TooltipContainer",
  HasUnderline: "Polaris-Tooltip__HasUnderline"
};

// node_modules/@shopify/polaris/build/esm/utilities/ephemeral-presence-manager/hooks.js
import { useContext as useContext5 } from "react";
function useEphemeralPresenceManager() {
  let ephemeralPresenceManager = useContext5(EphemeralPresenceManagerContext);
  if (!ephemeralPresenceManager)
    throw new Error("No ephemeral presence manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  return ephemeralPresenceManager;
}

// node_modules/@shopify/polaris/build/esm/components/Portal/Portal.js
import { themeNameDefault as themeNameDefault3 } from "@shopify/polaris-tokens";
import React23, { useId, useEffect as useEffect5 } from "react";
import { createPortal } from "react-dom";

// node_modules/@shopify/polaris/build/esm/utilities/portals/hooks.js
import { useContext as useContext6 } from "react";
function usePortalsManager() {
  let portalsManager = useContext6(PortalsManagerContext);
  if (!portalsManager)
    throw new Error("No portals manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  return portalsManager;
}

// node_modules/@shopify/polaris/build/esm/components/Portal/Portal.js
function Portal({
  children,
  idPrefix = "",
  onPortalCreated = noop2
}) {
  let themeName = useThemeName(), {
    container
  } = usePortalsManager(), uniqueId = useId(), portalId = idPrefix !== "" ? `${idPrefix}-${uniqueId}` : uniqueId;
  return useEffect5(() => {
    onPortalCreated();
  }, [onPortalCreated]), container ? /* @__PURE__ */ createPortal(/* @__PURE__ */ React23.createElement(ThemeProvider, {
    theme: isThemeNameLocal(themeName) ? themeName : themeNameDefault3,
    "data-portal-id": portalId
  }, children), container) : null;
}
function noop2() {
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js
import React27 from "react";

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.css.js
var styles14 = {
  TooltipOverlay: "Polaris-Tooltip-TooltipOverlay",
  Tail: "Polaris-Tooltip-TooltipOverlay__Tail",
  positionedAbove: "Polaris-Tooltip-TooltipOverlay--positionedAbove",
  measuring: "Polaris-Tooltip-TooltipOverlay--measuring",
  measured: "Polaris-Tooltip-TooltipOverlay--measured",
  instant: "Polaris-Tooltip-TooltipOverlay--instant",
  Content: "Polaris-Tooltip-TooltipOverlay__Content",
  default: "Polaris-Tooltip-TooltipOverlay--default",
  wide: "Polaris-Tooltip-TooltipOverlay--wide"
};

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.js
import React26, { PureComponent as PureComponent2 } from "react";

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/utilities/math.js
function calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed, topBarOffset = 0) {
  let activatorTop = activatorRect.top, activatorBottom = activatorTop + activatorRect.height, spaceAbove = activatorRect.top - topBarOffset, spaceBelow = containerRect.height - activatorRect.top - activatorRect.height, desiredHeight = overlayRect.height, verticalMargins = overlayMargins.activator + overlayMargins.container, minimumSpaceToScroll = overlayMargins.container, distanceToTopScroll = activatorRect.top - Math.max(scrollableContainerRect.top, 0), distanceToBottomScroll = containerRect.top + Math.min(containerRect.height, scrollableContainerRect.top + scrollableContainerRect.height) - (activatorRect.top + activatorRect.height), enoughSpaceFromTopScroll = distanceToTopScroll >= minimumSpaceToScroll, enoughSpaceFromBottomScroll = distanceToBottomScroll >= minimumSpaceToScroll, heightIfAbove = Math.min(spaceAbove, desiredHeight), heightIfBelow = Math.min(spaceBelow, desiredHeight), heightIfAboveCover = Math.min(spaceAbove + activatorRect.height, desiredHeight), heightIfBelowCover = Math.min(spaceBelow + activatorRect.height, desiredHeight), containerRectTop = fixed ? 0 : containerRect.top, positionIfAbove = {
    height: heightIfAbove - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove,
    positioning: "above"
  }, positionIfBelow = {
    height: heightIfBelow - verticalMargins,
    top: activatorBottom + containerRectTop,
    positioning: "below"
  }, positionIfCoverBelow = {
    height: heightIfBelowCover - verticalMargins,
    top: activatorTop + containerRectTop,
    positioning: "cover"
  }, positionIfCoverAbove = {
    height: heightIfAboveCover - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove + activatorRect.height + verticalMargins,
    positioning: "cover"
  };
  return preferredPosition === "above" ? (enoughSpaceFromTopScroll || distanceToTopScroll >= distanceToBottomScroll && !enoughSpaceFromBottomScroll) && (spaceAbove > desiredHeight || spaceAbove > spaceBelow) ? positionIfAbove : positionIfBelow : preferredPosition === "below" ? (enoughSpaceFromBottomScroll || distanceToBottomScroll >= distanceToTopScroll && !enoughSpaceFromTopScroll) && (spaceBelow > desiredHeight || spaceBelow > spaceAbove) ? positionIfBelow : positionIfAbove : preferredPosition === "cover" ? (enoughSpaceFromBottomScroll || distanceToBottomScroll >= distanceToTopScroll && !enoughSpaceFromTopScroll) && (spaceBelow + activatorRect.height > desiredHeight || spaceBelow > spaceAbove) ? positionIfCoverBelow : positionIfCoverAbove : enoughSpaceFromTopScroll && enoughSpaceFromBottomScroll ? spaceAbove > spaceBelow ? positionIfAbove : positionIfBelow : distanceToTopScroll > minimumSpaceToScroll ? positionIfAbove : positionIfBelow;
}
function calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment) {
  let maximum = containerRect.width - overlayRect.width;
  if (preferredAlignment === "left")
    return Math.min(maximum, Math.max(0, activatorRect.left - overlayMargins.horizontal));
  if (preferredAlignment === "right") {
    let activatorRight = containerRect.width - (activatorRect.left + activatorRect.width);
    return Math.min(maximum, Math.max(0, activatorRight - overlayMargins.horizontal));
  }
  return Math.min(maximum, Math.max(0, activatorRect.center.x - overlayRect.width / 2));
}
function rectIsOutsideOfRect(inner, outer) {
  let {
    center
  } = inner;
  return center.y < outer.top || center.y > outer.top + outer.height;
}
function intersectionWithViewport(rect, viewport = windowRect()) {
  let top = Math.max(rect.top, 0), left = Math.max(rect.left, 0), bottom = Math.min(rect.top + rect.height, viewport.height), right = Math.min(rect.left + rect.width, viewport.width);
  return new Rect({
    top,
    left,
    height: bottom - top,
    width: right - left
  });
}
function windowRect(node) {
  let document2 = node?.ownerDocument || globalThis.document, window2 = document2.defaultView || globalThis.window;
  return new Rect({
    top: window2.scrollY,
    left: window2.scrollX,
    height: window2.innerHeight,
    width: document2.body.clientWidth
  });
}

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.css.js
var styles15 = {
  PositionedOverlay: "Polaris-PositionedOverlay",
  fixed: "Polaris-PositionedOverlay--fixed",
  calculating: "Polaris-PositionedOverlay--calculating",
  preventInteraction: "Polaris-PositionedOverlay--preventInteraction"
};

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.js
import React25, { forwardRef as forwardRef4, useState as useState7, useRef as useRef6, useCallback as useCallback6, useImperativeHandle, useEffect as useEffect7 } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/use-lazy-ref.js
import { useRef as useRef3 } from "react";
var UNIQUE_IDENTIFIER = Symbol("unique_identifier");
function useLazyRef(initialValue) {
  let lazyRef = useRef3(UNIQUE_IDENTIFIER);
  return lazyRef.current === UNIQUE_IDENTIFIER && (lazyRef.current = initialValue()), lazyRef;
}

// node_modules/@shopify/polaris/build/esm/utilities/use-component-did-mount.js
import { useRef as useRef4 } from "react";
function useComponentDidMount(callback) {
  let isAfterInitialMount = useIsAfterInitialMount(), hasInvokedLifeCycle = useRef4(!1);
  if (isAfterInitialMount && !hasInvokedLifeCycle.current)
    return hasInvokedLifeCycle.current = !0, callback();
}

// node_modules/@shopify/polaris/build/esm/components/Scrollable/context.js
import { createContext as createContext14 } from "react";
var ScrollableContext = /* @__PURE__ */ createContext14(void 0);

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.css.js
var styles16 = {
  Scrollable: "Polaris-Scrollable",
  hasTopShadow: "Polaris-Scrollable--hasTopShadow",
  hasBottomShadow: "Polaris-Scrollable--hasBottomShadow",
  horizontal: "Polaris-Scrollable--horizontal",
  vertical: "Polaris-Scrollable--vertical",
  scrollbarWidthThin: "Polaris-Scrollable--scrollbarWidthThin",
  scrollbarWidthNone: "Polaris-Scrollable--scrollbarWidthNone",
  scrollbarWidthAuto: "Polaris-Scrollable--scrollbarWidthAuto",
  scrollbarGutterStable: "Polaris-Scrollable--scrollbarGutterStable",
  "scrollbarGutterStableboth-edges": "Polaris-Scrollable__scrollbarGutterStableboth--edges"
};

// node_modules/@shopify/polaris/build/esm/components/Scrollable/components/ScrollTo/ScrollTo.js
import React24, { useRef as useRef5, useContext as useContext7, useEffect as useEffect6, useId as useId2 } from "react";
function ScrollTo() {
  let anchorNode = useRef5(null), scrollToPosition = useContext7(ScrollableContext);
  useEffect6(() => {
    !scrollToPosition || !anchorNode.current || scrollToPosition(anchorNode.current.offsetTop);
  }, [scrollToPosition]);
  let id = useId2();
  return /* @__PURE__ */ React24.createElement("a", {
    id,
    ref: anchorNode
  });
}

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.js
var MAX_SCROLL_HINT_DISTANCE = 100, LOW_RES_BUFFER = 2, ScrollableComponent = /* @__PURE__ */ forwardRef4(({
  children,
  className,
  horizontal = !0,
  vertical = !0,
  shadow,
  hint,
  focusable,
  scrollbarWidth = "thin",
  scrollbarGutter,
  onScrolledToBottom,
  ...rest
}, forwardedRef) => {
  let [topShadow, setTopShadow] = useState7(!1), [bottomShadow, setBottomShadow] = useState7(!1), stickyManager = useLazyRef(() => new StickyManager()), scrollArea = useRef6(null), scrollTo = useCallback6((scrollY, options = {}) => {
    let optionsBehavior = options.behavior || "smooth", behavior = prefersReducedMotion() ? "auto" : optionsBehavior;
    scrollArea.current?.scrollTo({
      top: scrollY,
      behavior
    });
  }, []), defaultRef = useRef6();
  useImperativeHandle(forwardedRef || defaultRef, () => ({
    scrollTo
  }));
  let handleScroll = useCallback6(() => {
    let currentScrollArea = scrollArea.current;
    currentScrollArea && requestAnimationFrame(() => {
      let {
        scrollTop,
        clientHeight,
        scrollHeight
      } = currentScrollArea, canScroll = Boolean(scrollHeight > clientHeight), isBelowTopOfScroll = Boolean(scrollTop > 0), isAtBottomOfScroll = Boolean(scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER);
      setTopShadow(isBelowTopOfScroll), setBottomShadow(!isAtBottomOfScroll), canScroll && isAtBottomOfScroll && onScrolledToBottom && onScrolledToBottom();
    });
  }, [onScrolledToBottom]);
  useComponentDidMount(() => {
    handleScroll(), hint && requestAnimationFrame(() => performScrollHint(scrollArea.current));
  }), useEffect7(() => {
    let currentScrollArea = scrollArea.current;
    if (!currentScrollArea)
      return;
    let handleResize = debounce(handleScroll, 50, {
      trailing: !0
    });
    return stickyManager.current?.setContainer(currentScrollArea), currentScrollArea.addEventListener("scroll", handleScroll), globalThis.addEventListener("resize", handleResize), () => {
      currentScrollArea.removeEventListener("scroll", handleScroll), globalThis.removeEventListener("resize", handleResize);
    };
  }, [stickyManager, handleScroll]);
  let finalClassName = classNames(className, styles16.Scrollable, vertical && styles16.vertical, horizontal && styles16.horizontal, shadow && topShadow && styles16.hasTopShadow, shadow && bottomShadow && styles16.hasBottomShadow, scrollbarWidth && styles16[variationName("scrollbarWidth", scrollbarWidth)], scrollbarGutter && styles16[variationName("scrollbarGutter", scrollbarGutter.replace(" ", ""))]);
  return /* @__PURE__ */ React25.createElement(ScrollableContext.Provider, {
    value: scrollTo
  }, /* @__PURE__ */ React25.createElement(StickyManagerContext.Provider, {
    value: stickyManager.current
  }, /* @__PURE__ */ React25.createElement("div", Object.assign({
    className: finalClassName
  }, scrollable.props, rest, {
    ref: scrollArea,
    tabIndex: focusable ? 0 : void 0
  }), children)));
});
ScrollableComponent.displayName = "Scrollable";
function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
function performScrollHint(elem) {
  if (!elem || prefersReducedMotion())
    return;
  let scrollableDistance = elem.scrollHeight - elem.clientHeight, distanceToPeek = Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER, goBackToTop = () => {
    requestAnimationFrame(() => {
      elem.scrollTop >= distanceToPeek && (elem.removeEventListener("scroll", goBackToTop), elem.scrollTo({
        top: 0,
        behavior: "smooth"
      }));
    });
  };
  elem.addEventListener("scroll", goBackToTop), elem.scrollTo({
    top: MAX_SCROLL_HINT_DISTANCE,
    behavior: "smooth"
  });
}
var forNode = (node) => {
  let closestElement = node.closest(scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
}, Scrollable = ScrollableComponent;
Scrollable.ScrollTo = ScrollTo;
Scrollable.forNode = forNode;

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.js
var OBSERVER_CONFIG = {
  childList: !0,
  subtree: !0,
  characterData: !0,
  attributeFilter: ["style"]
}, PositionedOverlay = class extends PureComponent2 {
  constructor(props) {
    super(props), this.state = {
      measuring: !0,
      activatorRect: getRectForNode(this.props.activator),
      right: void 0,
      left: void 0,
      top: 0,
      height: 0,
      width: null,
      positioning: "below",
      zIndex: null,
      outsideScrollableContainer: !1,
      lockPosition: !1,
      chevronOffset: 0
    }, this.overlay = null, this.scrollableContainers = [], this.overlayDetails = () => {
      let {
        measuring,
        left,
        right,
        positioning,
        height,
        activatorRect,
        chevronOffset
      } = this.state;
      return {
        measuring,
        left,
        right,
        desiredHeight: height,
        positioning,
        activatorRect,
        chevronOffset
      };
    }, this.setOverlay = (node) => {
      this.overlay = node;
    }, this.setScrollableContainers = () => {
      let containers = [], scrollableContainer = Scrollable.forNode(this.props.activator);
      if (scrollableContainer)
        for (containers.push(scrollableContainer); scrollableContainer?.parentElement; )
          scrollableContainer = Scrollable.forNode(scrollableContainer.parentElement), containers.push(scrollableContainer);
      this.scrollableContainers = containers;
    }, this.registerScrollHandlers = () => {
      this.scrollableContainers.forEach((node) => {
        node.addEventListener("scroll", this.handleMeasurement);
      });
    }, this.unregisterScrollHandlers = () => {
      this.scrollableContainers.forEach((node) => {
        node.removeEventListener("scroll", this.handleMeasurement);
      });
    }, this.handleMeasurement = () => {
      let {
        lockPosition,
        top
      } = this.state;
      this.observer.disconnect(), this.setState(({
        left,
        top: top2,
        right
      }) => ({
        left,
        right,
        top: top2,
        height: 0,
        positioning: "below",
        measuring: !0
      }), () => {
        if (this.overlay == null || this.firstScrollableContainer == null)
          return;
        let {
          activator,
          preferredPosition = "below",
          preferredAlignment = "center",
          onScrollOut,
          fullWidth,
          fixed,
          preferInputActivator = !0
        } = this.props, document2 = activator.ownerDocument, preferredActivator = preferInputActivator && activator.querySelector("input") || activator, activatorRect = getRectForNode(preferredActivator), currentOverlayRect = getRectForNode(this.overlay), scrollableElement = isDocument2(this.firstScrollableContainer) ? document2.body : this.firstScrollableContainer, scrollableContainerRect = getRectForNode(scrollableElement), overlayRect = fullWidth || preferredPosition === "cover" ? new Rect({
          ...currentOverlayRect,
          width: activatorRect.width
        }) : currentOverlayRect;
        scrollableElement === document2.body && (scrollableContainerRect.height = document2.body.scrollHeight);
        let topBarOffset = 0, topBarElement = scrollableElement.querySelector(`${dataPolarisTopBar.selector}`);
        topBarElement && (topBarOffset = topBarElement.clientHeight);
        let overlayMargins = {
          activator: 0,
          container: 0,
          horizontal: 0
        };
        this.overlay.firstElementChild && (overlayMargins = getMarginsForNode(this.overlay.firstElementChild));
        let containerRect = windowRect(activator), zIndexForLayer = getZIndexForLayerFromNode(activator), zIndex = zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1, verticalPosition = calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed, topBarOffset), horizontalPosition = calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment), chevronOffset = activatorRect.center.x - horizontalPosition + overlayMargins.horizontal * 2;
        this.setState({
          measuring: !1,
          activatorRect: getRectForNode(activator),
          left: preferredAlignment !== "right" ? horizontalPosition : void 0,
          right: preferredAlignment === "right" ? horizontalPosition : void 0,
          top: lockPosition ? top : verticalPosition.top,
          lockPosition: Boolean(fixed),
          height: verticalPosition.height || 0,
          width: fullWidth || preferredPosition === "cover" ? overlayRect.width : null,
          positioning: verticalPosition.positioning,
          outsideScrollableContainer: onScrollOut != null && rectIsOutsideOfRect(activatorRect, intersectionWithViewport(scrollableContainerRect, containerRect)),
          zIndex,
          chevronOffset
        }, () => {
          this.overlay && (this.observer.observe(this.overlay, OBSERVER_CONFIG), this.observer.observe(activator, OBSERVER_CONFIG));
        });
      });
    }, this.observer = new MutationObserver(this.handleMeasurement);
  }
  componentDidMount() {
    this.setScrollableContainers(), this.scrollableContainers.length && !this.props.fixed && this.registerScrollHandlers(), this.handleMeasurement();
  }
  componentWillUnmount() {
    this.observer.disconnect(), this.scrollableContainers.length && !this.props.fixed && this.unregisterScrollHandlers();
  }
  componentDidUpdate() {
    let {
      outsideScrollableContainer,
      top
    } = this.state, {
      onScrollOut,
      active
    } = this.props;
    active && onScrollOut != null && top !== 0 && outsideScrollableContainer && onScrollOut();
  }
  render() {
    let {
      left,
      right,
      top,
      zIndex,
      width
    } = this.state, {
      render,
      fixed,
      preventInteraction,
      classNames: propClassNames,
      zIndexOverride
    } = this.props, style = {
      top: top == null || isNaN(top) ? void 0 : top,
      left: left == null || isNaN(left) ? void 0 : left,
      right: right == null || isNaN(right) ? void 0 : right,
      width: width == null || isNaN(width) ? void 0 : width,
      zIndex: zIndexOverride || zIndex || void 0
    }, className = classNames(styles15.PositionedOverlay, fixed && styles15.fixed, preventInteraction && styles15.preventInteraction, propClassNames);
    return /* @__PURE__ */ React26.createElement("div", {
      className,
      style,
      ref: this.setOverlay
    }, /* @__PURE__ */ React26.createElement(EventListener, {
      event: "resize",
      handler: this.handleMeasurement,
      window: this.overlay?.ownerDocument.defaultView
    }), render(this.overlayDetails()));
  }
  get firstScrollableContainer() {
    return this.scrollableContainers[0] ?? null;
  }
  forceUpdatePosition() {
    requestAnimationFrame(this.handleMeasurement);
  }
};
function getMarginsForNode(node) {
  let nodeStyles = (node.ownerDocument.defaultView || globalThis.window).getComputedStyle(node);
  return {
    activator: parseFloat(nodeStyles.marginTop || "0"),
    container: parseFloat(nodeStyles.marginBottom || "0"),
    horizontal: parseFloat(nodeStyles.marginLeft || "0")
  };
}
function getZIndexForLayerFromNode(node) {
  let layerNode = node.closest(layer.selector) || node.ownerDocument.body, zIndex = layerNode === node.ownerDocument.body ? "auto" : parseInt(window.getComputedStyle(layerNode).zIndex || "0", 10);
  return zIndex === "auto" || isNaN(zIndex) ? null : zIndex;
}
function isDocument2(node) {
  return node.ownerDocument === null;
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js
var tailUpPaths = /* @__PURE__ */ React27.createElement(React27.Fragment, null, /* @__PURE__ */ React27.createElement("path", {
  d: "M18.829 8.171 11.862.921A3 3 0 0 0 7.619.838L0 8.171h1.442l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557h1.387Z",
  fill: "var(--p-color-tooltip-tail-up-border)"
}), /* @__PURE__ */ React27.createElement("path", {
  d: "M17.442 10.171h-16v-2l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557v2Z",
  fill: "var(--p-color-bg-surface)"
})), tailDownPaths = /* @__PURE__ */ React27.createElement(React27.Fragment, null, /* @__PURE__ */ React27.createElement("path", {
  d: "m0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z",
  fill: "var(--p-color-tooltip-tail-down-border)"
}), /* @__PURE__ */ React27.createElement("path", {
  d: "M1.387 0h16v2l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2V0Z",
  fill: "var(--p-color-bg-surface)"
}));
function TooltipOverlay({
  active,
  activator,
  preferredPosition = "above",
  preventInteraction,
  id,
  children,
  accessibilityLabel,
  width,
  padding,
  borderRadius,
  zIndexOverride,
  instant
}) {
  let i18n = useI18n();
  return active ? /* @__PURE__ */ React27.createElement(PositionedOverlay, {
    active,
    activator,
    preferredPosition,
    preventInteraction,
    render: renderTooltip,
    zIndexOverride
  }) : null;
  function renderTooltip(overlayDetails) {
    let {
      measuring,
      desiredHeight,
      positioning,
      chevronOffset
    } = overlayDetails, containerClassName = classNames(styles14.TooltipOverlay, measuring && styles14.measuring, !measuring && styles14.measured, instant && styles14.instant, positioning === "above" && styles14.positionedAbove), contentClassName = classNames(styles14.Content, width && styles14[width]), contentStyles = measuring ? void 0 : {
      minHeight: desiredHeight
    }, style = {
      "--pc-tooltip-chevron-x-pos": `${chevronOffset}px`,
      "--pc-tooltip-border-radius": borderRadius ? `var(--p-border-radius-${borderRadius})` : void 0,
      "--pc-tooltip-padding": padding && padding === "default" ? "var(--p-space-100) var(--p-space-200)" : `var(--p-space-${padding})`
    };
    return /* @__PURE__ */ React27.createElement("div", Object.assign({
      style,
      className: containerClassName
    }, layer.props), /* @__PURE__ */ React27.createElement("svg", {
      className: styles14.Tail,
      width: "19",
      height: "11",
      fill: "none"
    }, positioning === "above" ? tailDownPaths : tailUpPaths), /* @__PURE__ */ React27.createElement("div", {
      id,
      role: "tooltip",
      className: contentClassName,
      style: {
        ...contentStyles,
        ...style
      },
      "aria-label": accessibilityLabel ? i18n.translate("Polaris.TooltipOverlay.accessibilityLabel", {
        label: accessibilityLabel
      }) : void 0
    }, children));
  }
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.js
var HOVER_OUT_TIMEOUT = 150;
function Tooltip({
  children,
  content,
  dismissOnMouseOut,
  active: originalActive,
  hoverDelay,
  preferredPosition = "above",
  activatorWrapper = "span",
  accessibilityLabel,
  width = "default",
  padding = "default",
  borderRadius: borderRadiusProp,
  zIndexOverride,
  hasUnderline,
  persistOnClick,
  onOpen,
  onClose
}) {
  let borderRadius = borderRadiusProp || "200", WrapperComponent = activatorWrapper, {
    value: active,
    setTrue: setActiveTrue,
    setFalse: handleBlur
  } = useToggle(Boolean(originalActive)), {
    value: persist,
    toggle: togglePersisting
  } = useToggle(Boolean(originalActive) && Boolean(persistOnClick)), [activatorNode, setActivatorNode] = useState8(null), {
    presenceList,
    addPresence,
    removePresence
  } = useEphemeralPresenceManager(), id = useId3(), activatorContainer = useRef7(null), mouseEntered = useRef7(!1), [shouldAnimate, setShouldAnimate] = useState8(Boolean(!originalActive)), hoverDelayTimeout = useRef7(null), hoverOutTimeout = useRef7(null), handleFocus = useCallback7(() => {
    originalActive !== !1 && setActiveTrue();
  }, [originalActive, setActiveTrue]);
  useEffect8(() => {
    let accessibilityNode = (activatorContainer.current ? findFirstFocusableNode(activatorContainer.current) : null) || activatorContainer.current;
    accessibilityNode && (accessibilityNode.tabIndex = 0, accessibilityNode.setAttribute("aria-describedby", id), accessibilityNode.setAttribute("data-polaris-tooltip-activator", "true"));
  }, [id, children]), useEffect8(() => () => {
    hoverDelayTimeout.current && clearTimeout(hoverDelayTimeout.current), hoverOutTimeout.current && clearTimeout(hoverOutTimeout.current);
  }, []);
  let handleOpen = useCallback7(() => {
    setShouldAnimate(!presenceList.tooltip && !active), onOpen?.(), addPresence("tooltip");
  }, [addPresence, presenceList.tooltip, onOpen, active]), handleClose = useCallback7(() => {
    onClose?.(), setShouldAnimate(!1), hoverOutTimeout.current = setTimeout(() => {
      removePresence("tooltip");
    }, HOVER_OUT_TIMEOUT);
  }, [removePresence, onClose]), handleKeyUp = useCallback7((event) => {
    event.key === "Escape" && (handleClose?.(), handleBlur(), persistOnClick && togglePersisting());
  }, [handleBlur, handleClose, persistOnClick, togglePersisting]);
  useEffect8(() => {
    originalActive === !1 && active && (handleClose(), handleBlur());
  }, [originalActive, active, handleClose, handleBlur]);
  let portal2 = activatorNode ? /* @__PURE__ */ React28.createElement(Portal, {
    idPrefix: "tooltip"
  }, /* @__PURE__ */ React28.createElement(TooltipOverlay, {
    id,
    preferredPosition,
    activator: activatorNode,
    active,
    accessibilityLabel,
    onClose: noop3,
    preventInteraction: dismissOnMouseOut,
    width,
    padding,
    borderRadius,
    zIndexOverride,
    instant: !shouldAnimate
  }, /* @__PURE__ */ React28.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, content))) : null, wrapperClassNames = classNames(activatorWrapper === "div" && styles13.TooltipContainer, hasUnderline && styles13.HasUnderline);
  return /* @__PURE__ */ React28.createElement(WrapperComponent, {
    onFocus: () => {
      handleOpen(), handleFocus();
    },
    onBlur: () => {
      handleClose(), handleBlur(), persistOnClick && togglePersisting();
    },
    onMouseLeave: handleMouseLeave,
    onMouseOver: handleMouseEnterFix,
    onMouseDown: persistOnClick ? togglePersisting : void 0,
    ref: setActivator,
    onKeyUp: handleKeyUp,
    className: wrapperClassNames
  }, children, portal2);
  function setActivator(node) {
    let activatorContainerRef = activatorContainer;
    if (node == null) {
      activatorContainerRef.current = null, setActivatorNode(null);
      return;
    }
    node.firstElementChild && setActivatorNode(node.firstElementChild), activatorContainerRef.current = node;
  }
  function handleMouseEnter() {
    mouseEntered.current = !0, hoverDelay && !presenceList.tooltip ? hoverDelayTimeout.current = setTimeout(() => {
      handleOpen(), handleFocus();
    }, hoverDelay) : (handleOpen(), handleFocus());
  }
  function handleMouseLeave() {
    hoverDelayTimeout.current && (clearTimeout(hoverDelayTimeout.current), hoverDelayTimeout.current = null), mouseEntered.current = !1, handleClose(), persist || handleBlur();
  }
  function handleMouseEnterFix() {
    !mouseEntered.current && handleMouseEnter();
  }
}
function noop3() {
}

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Item/Item.js
function Item({
  id,
  badge,
  content,
  accessibilityLabel,
  helpText,
  url,
  onAction,
  onMouseEnter,
  icon,
  image,
  prefix,
  suffix,
  disabled,
  external,
  destructive,
  ellipsis,
  truncate,
  active,
  role,
  variant = "default"
}) {
  let className = classNames(styles10.Item, disabled && styles10.disabled, destructive && styles10.destructive, active && styles10.active, variant === "default" && styles10.default, variant === "indented" && styles10.indented, variant === "menu" && styles10.menu), prefixMarkup = null;
  prefix ? prefixMarkup = /* @__PURE__ */ React29.createElement("span", {
    className: styles10.Prefix
  }, prefix) : icon ? prefixMarkup = /* @__PURE__ */ React29.createElement("span", {
    className: styles10.Prefix
  }, /* @__PURE__ */ React29.createElement(Icon, {
    source: icon
  })) : image && (prefixMarkup = /* @__PURE__ */ React29.createElement("span", {
    role: "presentation",
    className: styles10.Prefix,
    style: {
      backgroundImage: `url(${image}`
    }
  }));
  let contentText = content || "";
  truncate && content ? contentText = /* @__PURE__ */ React29.createElement(TruncateText, null, content) : ellipsis && (contentText = `${content}\u2026`);
  let contentMarkup = helpText ? /* @__PURE__ */ React29.createElement(React29.Fragment, null, /* @__PURE__ */ React29.createElement(Box, null, contentText), /* @__PURE__ */ React29.createElement(Text, {
    as: "span",
    variant: "bodySm",
    tone: active || disabled ? void 0 : "subdued"
  }, helpText)) : /* @__PURE__ */ React29.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    fontWeight: active ? "semibold" : "regular"
  }, contentText), badgeMarkup = badge && /* @__PURE__ */ React29.createElement("span", {
    className: styles10.Suffix
  }, /* @__PURE__ */ React29.createElement(Badge, {
    tone: badge.tone
  }, badge.content)), suffixMarkup = suffix && /* @__PURE__ */ React29.createElement(Box, null, /* @__PURE__ */ React29.createElement("span", {
    className: styles10.Suffix
  }, suffix)), textMarkup = /* @__PURE__ */ React29.createElement("span", {
    className: styles10.Text
  }, /* @__PURE__ */ React29.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    fontWeight: active ? "semibold" : "regular"
  }, contentMarkup)), contentElement = /* @__PURE__ */ React29.createElement(InlineStack, {
    blockAlign: "center",
    gap: "150",
    wrap: !1
  }, prefixMarkup, textMarkup, badgeMarkup, suffixMarkup), contentWrapper = /* @__PURE__ */ React29.createElement(Box, {
    width: "100%"
  }, contentElement), scrollMarkup = active ? /* @__PURE__ */ React29.createElement(Scrollable.ScrollTo, null) : null, control = url ? /* @__PURE__ */ React29.createElement(UnstyledLink, {
    id,
    url: disabled ? null : url,
    className,
    external,
    "aria-label": accessibilityLabel,
    onClick: disabled ? null : onAction,
    role
  }, contentWrapper) : /* @__PURE__ */ React29.createElement("button", {
    id,
    type: "button",
    className,
    disabled,
    "aria-label": accessibilityLabel,
    onClick: onAction,
    onMouseUp: handleMouseUpByBlurring,
    role,
    onMouseEnter
  }, contentWrapper);
  return /* @__PURE__ */ React29.createElement(React29.Fragment, null, scrollMarkup, control);
}
var TruncateText = ({
  children
}) => {
  let theme = useTheme(), textRef = useRef8(null), [isOverflowing, setIsOverflowing] = useState9(!1);
  return useIsomorphicLayoutEffect(() => {
    textRef.current && setIsOverflowing(textRef.current.scrollWidth > textRef.current.offsetWidth);
  }, [children]), isOverflowing ? /* @__PURE__ */ React29.createElement(Tooltip, {
    zIndexOverride: Number(theme.zIndex["z-index-11"]),
    preferredPosition: "above",
    hoverDelay: 1e3,
    content: children,
    dismissOnMouseOut: !0
  }, /* @__PURE__ */ React29.createElement(Text, {
    as: "span",
    truncate: !0
  }, children)) : /* @__PURE__ */ React29.createElement(Text, {
    as: "span",
    truncate: !0
  }, /* @__PURE__ */ React29.createElement(Box, {
    width: "100%",
    ref: textRef
  }, children));
};

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Section/Section.js
function Section({
  section,
  hasMultipleSections,
  isFirst,
  actionRole,
  onActionAnyItem
}) {
  let handleAction = (itemOnAction) => () => {
    itemOnAction && itemOnAction(), onActionAnyItem && onActionAnyItem();
  }, actionMarkup = section.items.map(({
    content,
    helpText,
    onAction,
    ...item
  }, index) => {
    let itemMarkup = /* @__PURE__ */ React30.createElement(Item, Object.assign({
      content,
      helpText,
      role: actionRole,
      onAction: handleAction(onAction)
    }, item));
    return /* @__PURE__ */ React30.createElement(Box, {
      as: "li",
      key: `${content}-${index}`,
      role: actionRole === "menuitem" ? "presentation" : void 0
    }, /* @__PURE__ */ React30.createElement(InlineStack, {
      wrap: !1
    }, itemMarkup));
  }), titleMarkup = null;
  section.title && (titleMarkup = typeof section.title == "string" ? /* @__PURE__ */ React30.createElement(Box, {
    paddingBlockStart: "300",
    paddingBlockEnd: "100",
    paddingInlineStart: "300",
    paddingInlineEnd: "300"
  }, /* @__PURE__ */ React30.createElement(Text, {
    as: "p",
    variant: "headingSm"
  }, section.title)) : /* @__PURE__ */ React30.createElement(Box, {
    padding: "200",
    paddingInlineEnd: "150"
  }, section.title));
  let sectionRole;
  switch (actionRole) {
    case "option":
      sectionRole = "presentation";
      break;
    case "menuitem":
      sectionRole = hasMultipleSections ? "presentation" : "menu";
      break;
    default:
      sectionRole = void 0;
      break;
  }
  let sectionMarkup = /* @__PURE__ */ React30.createElement(React30.Fragment, null, titleMarkup, /* @__PURE__ */ React30.createElement(Box, Object.assign({
    as: "div",
    padding: "150"
  }, hasMultipleSections && {
    paddingBlockStart: "0"
  }, {
    tabIndex: hasMultipleSections ? void 0 : -1
  }), /* @__PURE__ */ React30.createElement(BlockStack, Object.assign({
    gap: "050",
    as: "ul"
  }, sectionRole && {
    role: sectionRole
  }), actionMarkup)));
  return hasMultipleSections ? /* @__PURE__ */ React30.createElement(Box, Object.assign({
    as: "li",
    role: "presentation",
    borderColor: "border-secondary"
  }, !isFirst && {
    borderBlockStartWidth: "025"
  }, !section.title && {
    paddingBlockStart: "150"
  }), sectionMarkup) : sectionMarkup;
}

// node_modules/@shopify/polaris/build/esm/components/KeypressListener/KeypressListener.js
import { useRef as useRef9, useCallback as useCallback8, useEffect as useEffect9 } from "react";
function KeypressListener({
  keyCode,
  handler,
  keyEvent = "keyup",
  options,
  useCapture,
  document: ownerDocument = globalThis.document
}) {
  let tracked = useRef9({
    handler,
    keyCode
  });
  useIsomorphicLayoutEffect(() => {
    tracked.current = {
      handler,
      keyCode
    };
  }, [handler, keyCode]);
  let handleKeyEvent = useCallback8((event) => {
    let {
      handler: handler2,
      keyCode: keyCode2
    } = tracked.current;
    event.keyCode === keyCode2 && handler2(event);
  }, []);
  return useEffect9(() => (ownerDocument.addEventListener(keyEvent, handleKeyEvent, useCapture || options), () => {
    ownerDocument.removeEventListener(keyEvent, handleKeyEvent, useCapture || options);
  }), [keyEvent, handleKeyEvent, useCapture, options, ownerDocument]), null;
}

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.js
import React38, { useState as useState10, useId as useId4, useRef as useRef11, useCallback as useCallback10, useEffect as useEffect11, createElement } from "react";
import { XCircleIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.css.js
var styles17 = {
  TextField: "Polaris-TextField",
  ClearButton: "Polaris-TextField__ClearButton",
  Loading: "Polaris-TextField__Loading",
  disabled: "Polaris-TextField--disabled",
  error: "Polaris-TextField--error",
  readOnly: "Polaris-TextField--readOnly",
  Input: "Polaris-TextField__Input",
  Backdrop: "Polaris-TextField__Backdrop",
  multiline: "Polaris-TextField--multiline",
  hasValue: "Polaris-TextField--hasValue",
  focus: "Polaris-TextField--focus",
  VerticalContent: "Polaris-TextField__VerticalContent",
  InputAndSuffixWrapper: "Polaris-TextField__InputAndSuffixWrapper",
  toneMagic: "Polaris-TextField--toneMagic",
  Prefix: "Polaris-TextField__Prefix",
  Suffix: "Polaris-TextField__Suffix",
  AutoSizeWrapper: "Polaris-TextField__AutoSizeWrapper",
  AutoSizeWrapperWithSuffix: "Polaris-TextField__AutoSizeWrapperWithSuffix",
  suggestion: "Polaris-TextField--suggestion",
  borderless: "Polaris-TextField--borderless",
  slim: "Polaris-TextField--slim",
  "Input-hasClearButton": "Polaris-TextField__Input--hasClearButton",
  "Input-suffixed": "Polaris-TextField__Input--suffixed",
  "Input-alignRight": "Polaris-TextField__Input--alignRight",
  "Input-alignLeft": "Polaris-TextField__Input--alignLeft",
  "Input-alignCenter": "Polaris-TextField__Input--alignCenter",
  "Input-autoSize": "Polaris-TextField__Input--autoSize",
  PrefixIcon: "Polaris-TextField__PrefixIcon",
  CharacterCount: "Polaris-TextField__CharacterCount",
  AlignFieldBottom: "Polaris-TextField__AlignFieldBottom",
  Spinner: "Polaris-TextField__Spinner",
  SpinnerIcon: "Polaris-TextField__SpinnerIcon",
  Resizer: "Polaris-TextField__Resizer",
  DummyInput: "Polaris-TextField__DummyInput",
  Segment: "Polaris-TextField__Segment",
  monospaced: "Polaris-TextField--monospaced"
};

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.js
import React33 from "react";

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.css.js
var styles18 = {
  hidden: "Polaris-Labelled--hidden",
  LabelWrapper: "Polaris-Labelled__LabelWrapper",
  disabled: "Polaris-Labelled--disabled",
  HelpText: "Polaris-Labelled__HelpText",
  readOnly: "Polaris-Labelled--readOnly",
  Error: "Polaris-Labelled__Error",
  Action: "Polaris-Labelled__Action"
};

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.js
import React31 from "react";
import { AlertCircleIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.css.js
var styles19 = {
  InlineError: "Polaris-InlineError",
  Icon: "Polaris-InlineError__Icon"
};

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.js
function InlineError({
  message,
  fieldID
}) {
  return message ? /* @__PURE__ */ React31.createElement("div", {
    id: errorTextID(fieldID),
    className: styles19.InlineError
  }, /* @__PURE__ */ React31.createElement("div", {
    className: styles19.Icon
  }, /* @__PURE__ */ React31.createElement(Icon, {
    source: AlertCircleIcon
  })), /* @__PURE__ */ React31.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, message)) : null;
}
function errorTextID(id) {
  return `${id}Error`;
}

// node_modules/@shopify/polaris/build/esm/components/Label/Label.js
import React32 from "react";

// node_modules/@shopify/polaris/build/esm/components/Label/Label.css.js
var styles20 = {
  Label: "Polaris-Label",
  hidden: "Polaris-Label--hidden",
  Text: "Polaris-Label__Text",
  RequiredIndicator: "Polaris-Label__RequiredIndicator"
};

// node_modules/@shopify/polaris/build/esm/components/Label/Label.js
function labelID(id) {
  return `${id}Label`;
}
function Label({
  children,
  id,
  hidden,
  requiredIndicator
}) {
  let className = classNames(styles20.Label, hidden && styles20.hidden);
  return /* @__PURE__ */ React32.createElement("div", {
    className
  }, /* @__PURE__ */ React32.createElement("label", {
    id: labelID(id),
    htmlFor: id,
    className: classNames(styles20.Text, requiredIndicator && styles20.RequiredIndicator)
  }, /* @__PURE__ */ React32.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.js
function Labelled({
  id,
  label,
  error,
  action: action5,
  helpText,
  children,
  labelHidden,
  requiredIndicator,
  disabled,
  readOnly,
  ...rest
}) {
  let className = classNames(labelHidden && styles18.hidden, disabled && styles18.disabled, readOnly && styles18.readOnly), actionMarkup = action5 ? /* @__PURE__ */ React33.createElement("div", {
    className: styles18.Action
  }, buttonFrom(action5, {
    variant: "plain"
  })) : null, helpTextMarkup = helpText ? /* @__PURE__ */ React33.createElement("div", {
    className: styles18.HelpText,
    id: helpTextID(id),
    "aria-disabled": disabled
  }, /* @__PURE__ */ React33.createElement(Text, {
    as: "span",
    tone: "subdued",
    variant: "bodyMd",
    breakWord: !0
  }, helpText)) : null, errorMarkup = error && typeof error != "boolean" && /* @__PURE__ */ React33.createElement("div", {
    className: styles18.Error
  }, /* @__PURE__ */ React33.createElement(InlineError, {
    message: error,
    fieldID: id
  })), labelMarkup = label ? /* @__PURE__ */ React33.createElement("div", {
    className: styles18.LabelWrapper
  }, /* @__PURE__ */ React33.createElement(Label, Object.assign({
    id,
    requiredIndicator
  }, rest, {
    hidden: !1
  }), label), actionMarkup) : null;
  return /* @__PURE__ */ React33.createElement("div", {
    className
  }, labelMarkup, children, errorMarkup, helpTextMarkup);
}
function helpTextID(id) {
  return `${id}HelpText`;
}

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.js
import React35 from "react";

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.css.js
var styles21 = {
  Connected: "Polaris-Connected",
  Item: "Polaris-Connected__Item",
  "Item-primary": "Polaris-Connected__Item--primary",
  "Item-focused": "Polaris-Connected__Item--focused"
};

// node_modules/@shopify/polaris/build/esm/components/Connected/components/Item/Item.js
import React34 from "react";
function Item2({
  children,
  position
}) {
  let {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(!1), className = classNames(styles21.Item, focused && styles21["Item-focused"], position === "primary" ? styles21["Item-primary"] : styles21["Item-connection"]);
  return /* @__PURE__ */ React34.createElement("div", {
    onBlur: forceFalseFocused,
    onFocus: forceTrueFocused,
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.js
function Connected({
  children,
  left,
  right
}) {
  let leftConnectionMarkup = left ? /* @__PURE__ */ React35.createElement(Item2, {
    position: "left"
  }, left) : null, rightConnectionMarkup = right ? /* @__PURE__ */ React35.createElement(Item2, {
    position: "right"
  }, right) : null;
  return /* @__PURE__ */ React35.createElement("div", {
    className: styles21.Connected
  }, leftConnectionMarkup, /* @__PURE__ */ React35.createElement(Item2, {
    position: "primary"
  }, children), rightConnectionMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/TextField/components/Spinner/Spinner.js
import React36 from "react";
import { ChevronUpIcon as ChevronUpIcon2, ChevronDownIcon as ChevronDownIcon2 } from "@shopify/polaris-icons";
var Spinner2 = /* @__PURE__ */ React36.forwardRef(function({
  onChange,
  onClick,
  onMouseDown,
  onMouseUp,
  onBlur
}, ref) {
  function handleStep(step) {
    return () => onChange(step);
  }
  function handleMouseDown(onChange2) {
    return (event) => {
      event.button === 0 && onMouseDown?.(onChange2);
    };
  }
  return /* @__PURE__ */ React36.createElement("div", {
    className: styles17.Spinner,
    onClick,
    "aria-hidden": !0,
    ref
  }, /* @__PURE__ */ React36.createElement("div", {
    role: "button",
    className: styles17.Segment,
    tabIndex: -1,
    onClick: handleStep(1),
    onMouseDown: handleMouseDown(handleStep(1)),
    onMouseUp,
    onBlur
  }, /* @__PURE__ */ React36.createElement("div", {
    className: styles17.SpinnerIcon
  }, /* @__PURE__ */ React36.createElement(Icon, {
    source: ChevronUpIcon2
  }))), /* @__PURE__ */ React36.createElement("div", {
    role: "button",
    className: styles17.Segment,
    tabIndex: -1,
    onClick: handleStep(-1),
    onMouseDown: handleMouseDown(handleStep(-1)),
    onMouseUp,
    onBlur
  }, /* @__PURE__ */ React36.createElement("div", {
    className: styles17.SpinnerIcon
  }, /* @__PURE__ */ React36.createElement(Icon, {
    source: ChevronDownIcon2
  }))));
});

// node_modules/@shopify/polaris/build/esm/components/TextField/components/Resizer/Resizer.js
import React37, { useRef as useRef10, useEffect as useEffect10, useCallback as useCallback9 } from "react";
function Resizer({
  contents,
  currentHeight: currentHeightProp = null,
  minimumLines,
  onHeightChange
}) {
  let contentNode = useRef10(null), minimumLinesNode = useRef10(null), animationFrame = useRef10(), currentHeight = useRef10(currentHeightProp);
  currentHeightProp !== currentHeight.current && (currentHeight.current = currentHeightProp), useEffect10(() => () => {
    animationFrame.current && cancelAnimationFrame(animationFrame.current);
  }, []);
  let minimumLinesMarkup = minimumLines ? /* @__PURE__ */ React37.createElement("div", {
    ref: minimumLinesNode,
    className: styles17.DummyInput,
    dangerouslySetInnerHTML: {
      __html: getContentsForMinimumLines(minimumLines)
    }
  }) : null, handleHeightCheck = useCallback9(() => {
    animationFrame.current && cancelAnimationFrame(animationFrame.current), animationFrame.current = requestAnimationFrame(() => {
      if (!contentNode.current || !minimumLinesNode.current)
        return;
      let newHeight = Math.max(contentNode.current.offsetHeight, minimumLinesNode.current.offsetHeight);
      newHeight !== currentHeight.current && onHeightChange(newHeight);
    });
  }, [onHeightChange]);
  return useIsomorphicLayoutEffect(() => {
    handleHeightCheck();
  }), /* @__PURE__ */ React37.createElement("div", {
    "aria-hidden": !0,
    className: styles17.Resizer
  }, /* @__PURE__ */ React37.createElement(EventListener, {
    event: "resize",
    handler: handleHeightCheck
  }), /* @__PURE__ */ React37.createElement("div", {
    ref: contentNode,
    className: styles17.DummyInput,
    dangerouslySetInnerHTML: {
      __html: getFinalContents(contents)
    }
  }), minimumLinesMarkup);
}
var ENTITIES_TO_REPLACE = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\n": "<br>",
  "\r": ""
}, REPLACE_REGEX2 = new RegExp(`[${Object.keys(ENTITIES_TO_REPLACE).join()}]`, "g");
function replaceEntity(entity) {
  return ENTITIES_TO_REPLACE[entity];
}
function getContentsForMinimumLines(minimumLines) {
  let content = "";
  for (let line = 0; line < minimumLines; line++)
    content += "<br>";
  return content;
}
function getFinalContents(contents) {
  return contents ? `${contents.replace(REPLACE_REGEX2, replaceEntity)}<br>` : "<br>";
}

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.js
function TextField({
  prefix,
  suffix,
  verticalContent,
  placeholder,
  value = "",
  helpText,
  label,
  labelAction,
  labelHidden,
  disabled,
  clearButton,
  readOnly,
  autoFocus,
  focused,
  multiline,
  error,
  connectedRight,
  connectedLeft,
  type = "text",
  name,
  id: idProp,
  role,
  step,
  largeStep,
  autoComplete,
  max,
  maxLength,
  maxHeight,
  min,
  minLength,
  pattern,
  inputMode,
  spellCheck,
  ariaOwns,
  ariaControls,
  ariaExpanded,
  ariaActiveDescendant,
  ariaAutocomplete,
  showCharacterCount,
  align,
  requiredIndicator,
  monospaced,
  selectTextOnFocus,
  suggestion,
  variant = "inherit",
  size = "medium",
  onClearButtonClick,
  onChange,
  onSpinnerChange,
  onFocus,
  onBlur,
  tone,
  autoSize,
  loading
}) {
  let i18n = useI18n(), [height, setHeight] = useState10(null), [focus, setFocus] = useState10(Boolean(focused)), isAfterInitial = useIsAfterInitialMount(), uniqId = useId4(), id = idProp ?? uniqId, textFieldRef = useRef11(null), inputRef = useRef11(null), textAreaRef = useRef11(null), prefixRef = useRef11(null), suffixRef = useRef11(null), loadingRef = useRef11(null), verticalContentRef = useRef11(null), buttonPressTimer = useRef11(), spinnerRef = useRef11(null), getInputRef = useCallback10(() => multiline ? textAreaRef.current : inputRef.current, [multiline]);
  useEffect11(() => {
    let input2 = getInputRef();
    !input2 || focused === void 0 || (focused ? input2.focus() : input2.blur());
  }, [focused, verticalContent, getInputRef]), useEffect11(() => {
    let input2 = inputRef.current;
    !input2 || !(type === "text" || type === "tel" || type === "search" || type === "url" || type === "password") || !suggestion || input2.setSelectionRange(value.length, suggestion.length);
  }, [focus, value, type, suggestion]);
  let normalizedValue = suggestion || value, normalizedStep = step ?? 1, normalizedMax = max ?? 1 / 0, normalizedMin = min ?? -1 / 0, className = classNames(styles17.TextField, Boolean(normalizedValue) && styles17.hasValue, disabled && styles17.disabled, readOnly && styles17.readOnly, error && styles17.error, tone && styles17[variationName("tone", tone)], multiline && styles17.multiline, focus && !disabled && styles17.focus, variant !== "inherit" && styles17[variant], size === "slim" && styles17.slim), inputType = type === "currency" ? "text" : type, isNumericType = type === "number" || type === "integer", iconPrefix = /* @__PURE__ */ React38.isValidElement(prefix) && prefix.type === Icon, prefixMarkup = prefix ? /* @__PURE__ */ React38.createElement("div", {
    className: classNames(styles17.Prefix, iconPrefix && styles17.PrefixIcon),
    id: `${id}-Prefix`,
    ref: prefixRef
  }, /* @__PURE__ */ React38.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, prefix)) : null, suffixMarkup = suffix ? /* @__PURE__ */ React38.createElement("div", {
    className: styles17.Suffix,
    id: `${id}-Suffix`,
    ref: suffixRef
  }, /* @__PURE__ */ React38.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, suffix)) : null, loadingMarkup = loading ? /* @__PURE__ */ React38.createElement("div", {
    className: styles17.Loading,
    id: `${id}-Loading`,
    ref: loadingRef
  }, /* @__PURE__ */ React38.createElement(Spinner, {
    size: "small"
  })) : null, characterCountMarkup = null;
  if (showCharacterCount) {
    let characterCount = normalizedValue.length, characterCountLabel = maxLength ? i18n.translate("Polaris.TextField.characterCountWithMaxLength", {
      count: characterCount,
      limit: maxLength
    }) : i18n.translate("Polaris.TextField.characterCount", {
      count: characterCount
    }), characterCountClassName = classNames(styles17.CharacterCount, multiline && styles17.AlignFieldBottom), characterCountText = maxLength ? `${characterCount}/${maxLength}` : characterCount;
    characterCountMarkup = /* @__PURE__ */ React38.createElement("div", {
      id: `${id}-CharacterCounter`,
      className: characterCountClassName,
      "aria-label": characterCountLabel,
      "aria-live": focus ? "polite" : "off",
      "aria-atomic": "true",
      onClick: handleClickChild
    }, /* @__PURE__ */ React38.createElement(Text, {
      as: "span",
      variant: "bodyMd"
    }, characterCountText));
  }
  let clearButtonMarkup = clearButton && normalizedValue !== "" ? /* @__PURE__ */ React38.createElement("button", {
    type: "button",
    className: styles17.ClearButton,
    onClick: handleClearButtonPress,
    disabled
  }, /* @__PURE__ */ React38.createElement(Text, {
    as: "span",
    visuallyHidden: !0
  }, i18n.translate("Polaris.Common.clear")), /* @__PURE__ */ React38.createElement(Icon, {
    source: XCircleIcon,
    tone: "base"
  })) : null, handleNumberChange = useCallback10((steps, stepAmount = normalizedStep) => {
    if (onChange == null && onSpinnerChange == null)
      return;
    let dpl = (num) => (num.toString().split(".")[1] || []).length, numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue))
      return;
    let decimalPlaces = type === "integer" ? 0 : Math.max(dpl(numericValue), dpl(stepAmount)), newValue = Math.min(Number(normalizedMax), Math.max(numericValue + steps * stepAmount, Number(normalizedMin)));
    onSpinnerChange != null ? onSpinnerChange(String(newValue.toFixed(decimalPlaces)), id) : onChange?.(String(newValue.toFixed(decimalPlaces)), id);
  }, [id, normalizedMax, normalizedMin, onChange, onSpinnerChange, normalizedStep, type, value]), handleSpinnerButtonRelease = useCallback10(() => {
    clearTimeout(buttonPressTimer.current);
  }, []), handleSpinnerButtonPress = useCallback10((onChange2) => {
    let interval = 200, onChangeInterval = () => {
      interval > 50 && (interval -= 10), onChange2(0), buttonPressTimer.current = window.setTimeout(onChangeInterval, interval);
    };
    buttonPressTimer.current = window.setTimeout(onChangeInterval, interval), document.addEventListener("mouseup", handleSpinnerButtonRelease, {
      once: !0
    });
  }, [handleSpinnerButtonRelease]), spinnerMarkup = isNumericType && step !== 0 && !disabled && !readOnly ? /* @__PURE__ */ React38.createElement(Spinner2, {
    onClick: handleClickChild,
    onChange: handleNumberChange,
    onMouseDown: handleSpinnerButtonPress,
    onMouseUp: handleSpinnerButtonRelease,
    ref: spinnerRef,
    onBlur: handleOnBlur
  }) : null, style = multiline && height ? {
    height,
    maxHeight
  } : null, handleExpandingResize = useCallback10((height2) => {
    setHeight(height2);
  }, []), resizer = multiline && isAfterInitial ? /* @__PURE__ */ React38.createElement(Resizer, {
    contents: normalizedValue || placeholder,
    currentHeight: height,
    minimumLines: typeof multiline == "number" ? multiline : 1,
    onHeightChange: handleExpandingResize
  }) : null, describedBy = [];
  error && describedBy.push(`${id}Error`), helpText && describedBy.push(helpTextID(id)), showCharacterCount && describedBy.push(`${id}-CharacterCounter`);
  let labelledBy = [];
  prefix && labelledBy.push(`${id}-Prefix`), suffix && labelledBy.push(`${id}-Suffix`), verticalContent && labelledBy.push(`${id}-VerticalContent`), labelledBy.unshift(labelID(id));
  let inputClassName = classNames(styles17.Input, align && styles17[variationName("Input-align", align)], suffix && styles17["Input-suffixed"], clearButton && styles17["Input-hasClearButton"], monospaced && styles17.monospaced, suggestion && styles17.suggestion, autoSize && styles17["Input-autoSize"]), handleOnFocus = (event) => {
    setFocus(!0), selectTextOnFocus && !suggestion && getInputRef()?.select(), onFocus && onFocus(event);
  };
  useEventListener("wheel", handleOnWheel, inputRef);
  function handleOnWheel(event) {
    document.activeElement === event.target && isNumericType && event.stopPropagation();
  }
  let input = /* @__PURE__ */ createElement(multiline ? "textarea" : "input", {
    name,
    id,
    disabled,
    readOnly,
    role,
    autoFocus,
    value: normalizedValue,
    placeholder,
    style,
    autoComplete,
    className: inputClassName,
    ref: multiline ? textAreaRef : inputRef,
    min,
    max,
    step,
    minLength,
    maxLength,
    spellCheck,
    pattern,
    inputMode,
    type: inputType,
    rows: getRows(multiline),
    size: autoSize ? 1 : void 0,
    "aria-describedby": describedBy.length ? describedBy.join(" ") : void 0,
    "aria-labelledby": labelledBy.join(" "),
    "aria-invalid": Boolean(error),
    "aria-owns": ariaOwns,
    "aria-activedescendant": ariaActiveDescendant,
    "aria-autocomplete": ariaAutocomplete,
    "aria-controls": ariaControls,
    "aria-expanded": ariaExpanded,
    "aria-required": requiredIndicator,
    ...normalizeAriaMultiline(multiline),
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    onClick: handleClickChild,
    onKeyPress: handleKeyPress,
    onKeyDown: handleKeyDown,
    onChange: suggestion ? void 0 : handleChange,
    onInput: suggestion ? handleChange : void 0,
    // 1Password disable data attribute
    "data-1p-ignore": autoComplete === "off" || void 0,
    // LastPass disable data attribute
    "data-lpignore": autoComplete === "off" || void 0,
    // Dashlane disable data attribute
    "data-form-type": autoComplete === "off" ? "other" : void 0
  }), inputWithVerticalContentMarkup = verticalContent ? /* @__PURE__ */ React38.createElement("div", {
    className: styles17.VerticalContent,
    id: `${id}-VerticalContent`,
    ref: verticalContentRef,
    onClick: handleClickChild
  }, verticalContent, input) : null, inputMarkup = verticalContent ? inputWithVerticalContentMarkup : input, backdropMarkup = /* @__PURE__ */ React38.createElement("div", {
    className: classNames(styles17.Backdrop, connectedLeft && styles17["Backdrop-connectedLeft"], connectedRight && styles17["Backdrop-connectedRight"])
  }), inputAndSuffixMarkup = autoSize ? /* @__PURE__ */ React38.createElement("div", {
    className: styles17.InputAndSuffixWrapper
  }, /* @__PURE__ */ React38.createElement("div", {
    className: classNames(styles17.AutoSizeWrapper, suffix && styles17.AutoSizeWrapperWithSuffix),
    "data-auto-size-value": value || placeholder
  }, inputMarkup), suffixMarkup) : /* @__PURE__ */ React38.createElement(React38.Fragment, null, inputMarkup, suffixMarkup);
  return /* @__PURE__ */ React38.createElement(Labelled, {
    label,
    id,
    error,
    action: labelAction,
    labelHidden,
    helpText,
    requiredIndicator,
    disabled,
    readOnly
  }, /* @__PURE__ */ React38.createElement(Connected, {
    left: connectedLeft,
    right: connectedRight
  }, /* @__PURE__ */ React38.createElement("div", {
    className,
    onClick: handleClick,
    ref: textFieldRef
  }, prefixMarkup, inputAndSuffixMarkup, characterCountMarkup, loadingMarkup, clearButtonMarkup, spinnerMarkup, backdropMarkup, resizer)));
  function handleChange(event) {
    onChange && onChange(event.currentTarget.value, id);
  }
  function handleClick(event) {
    let {
      target
    } = event, inputRefRole = inputRef?.current?.getAttribute("role");
    if (target === inputRef.current && inputRefRole === "combobox") {
      inputRef.current?.focus(), handleOnFocus(event);
      return;
    }
    isPrefixOrSuffix(target) || isVerticalContent(target) || isInput(target) || isSpinner(target) || isLoadingSpinner(target) || focus || getInputRef()?.focus();
  }
  function handleClickChild(event) {
    !isSpinner(event.target) && !isInput(event.target) && event.stopPropagation(), !(isPrefixOrSuffix(event.target) || isVerticalContent(event.target) || isInput(event.target) || isLoadingSpinner(event.target) || focus) && (setFocus(!0), getInputRef()?.focus());
  }
  function handleClearButtonPress() {
    onClearButtonClick && onClearButtonClick(id);
  }
  function handleKeyPress(event) {
    let {
      key,
      which
    } = event, numbersSpec = /[\d.,eE+-]$/, integerSpec = /[\deE+-]$/;
    !isNumericType || which === Key.Enter || type === "number" && numbersSpec.test(key) || type === "integer" && integerSpec.test(key) || event.preventDefault();
  }
  function handleKeyDown(event) {
    if (!isNumericType)
      return;
    let {
      key,
      which
    } = event;
    type === "integer" && (key === "ArrowUp" || which === Key.UpArrow) && (handleNumberChange(1), event.preventDefault()), type === "integer" && (key === "ArrowDown" || which === Key.DownArrow) && (handleNumberChange(-1), event.preventDefault()), (which === Key.Home || key === "Home") && min !== void 0 && (onSpinnerChange != null ? onSpinnerChange(String(min), id) : onChange?.(String(min), id)), (which === Key.End || key === "End") && max !== void 0 && (onSpinnerChange != null ? onSpinnerChange(String(max), id) : onChange?.(String(max), id)), (which === Key.PageUp || key === "PageUp") && largeStep !== void 0 && handleNumberChange(1, largeStep), (which === Key.PageDown || key === "PageDown") && largeStep !== void 0 && handleNumberChange(-1, largeStep);
  }
  function handleOnBlur(event) {
    setFocus(!1), !textFieldRef.current?.contains(event?.relatedTarget) && onBlur && onBlur(event);
  }
  function isInput(target) {
    let input2 = getInputRef();
    return target instanceof HTMLElement && input2 && (input2.contains(target) || input2.contains(document.activeElement));
  }
  function isPrefixOrSuffix(target) {
    return target instanceof Element && (prefixRef.current && prefixRef.current.contains(target) || suffixRef.current && suffixRef.current.contains(target));
  }
  function isSpinner(target) {
    return target instanceof Element && spinnerRef.current && spinnerRef.current.contains(target);
  }
  function isLoadingSpinner(target) {
    return target instanceof Element && loadingRef.current && loadingRef.current.contains(target);
  }
  function isVerticalContent(target) {
    return target instanceof Element && verticalContentRef.current && (verticalContentRef.current.contains(target) || verticalContentRef.current.contains(document.activeElement));
  }
}
function getRows(multiline) {
  if (multiline)
    return typeof multiline == "number" ? multiline : 1;
}
function normalizeAriaMultiline(multiline) {
  if (multiline)
    return Boolean(multiline) || typeof multiline == "number" && multiline > 0 ? {
      "aria-multiline": !0
    } : void 0;
}

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.js
var FILTER_ACTIONS_THRESHOLD = 8;
function ActionList({
  items,
  sections = [],
  actionRole,
  allowFiltering,
  onActionAnyItem,
  filterLabel
}) {
  let i18n = useI18n(), filterActions = useContext8(FilterActionsContext), finalSections = [], actionListRef = useRef12(null), [searchText, setSearchText] = useState11("");
  items ? finalSections = [{
    items
  }, ...sections] : sections && (finalSections = sections);
  let isFilterable = finalSections?.some((section) => section.items.some((item) => typeof item.content == "string")), hasMultipleSections = finalSections.length > 1, elementRole = hasMultipleSections && actionRole === "menuitem" ? "menu" : void 0, elementTabIndex = hasMultipleSections && actionRole === "menuitem" ? -1 : void 0, filteredSections = finalSections?.map((section) => ({
    ...section,
    items: section.items.filter(({
      content
    }) => typeof content == "string" ? content?.toLowerCase().includes(searchText.toLowerCase()) : content)
  })), sectionMarkup = filteredSections.map((section, index) => section.items.length > 0 ? /* @__PURE__ */ React39.createElement(Section, {
    key: typeof section.title == "string" ? section.title : index,
    section,
    hasMultipleSections,
    actionRole,
    onActionAnyItem,
    isFirst: index === 0
  }) : null), handleFocusPreviousItem = (evt) => {
    evt.preventDefault(), actionListRef.current && evt.target && actionListRef.current.contains(evt.target) && wrapFocusPreviousFocusableMenuItem(actionListRef.current, evt.target);
  }, handleFocusNextItem = (evt) => {
    evt.preventDefault(), actionListRef.current && evt.target && actionListRef.current.contains(evt.target) && wrapFocusNextFocusableMenuItem(actionListRef.current, evt.target);
  }, listeners = actionRole === "menuitem" ? /* @__PURE__ */ React39.createElement(React39.Fragment, null, /* @__PURE__ */ React39.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.DownArrow,
    handler: handleFocusNextItem
  }), /* @__PURE__ */ React39.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.UpArrow,
    handler: handleFocusPreviousItem
  })) : null, totalFilteredActions = useMemo5(() => filteredSections?.reduce((acc, section) => acc + section.items.length, 0) || 0, [filteredSections]), hasManyActions = (finalSections?.reduce((acc, section) => acc + section.items.length, 0) || 0) >= FILTER_ACTIONS_THRESHOLD;
  return /* @__PURE__ */ React39.createElement(React39.Fragment, null, (allowFiltering || filterActions) && hasManyActions && isFilterable && /* @__PURE__ */ React39.createElement(Box, {
    padding: "200",
    paddingBlockEnd: totalFilteredActions > 0 ? "0" : "200"
  }, /* @__PURE__ */ React39.createElement(TextField, {
    clearButton: !0,
    labelHidden: !0,
    label: filterLabel || i18n.translate("Polaris.ActionList.SearchField.placeholder"),
    placeholder: filterLabel || i18n.translate("Polaris.ActionList.SearchField.placeholder"),
    autoComplete: "off",
    value: searchText,
    onChange: (value) => setSearchText(value),
    prefix: /* @__PURE__ */ React39.createElement(Icon, {
      source: SearchIcon
    }),
    onClearButtonClick: () => setSearchText("")
  })), /* @__PURE__ */ React39.createElement(Box, {
    as: hasMultipleSections ? "ul" : "div",
    ref: actionListRef,
    role: elementRole,
    tabIndex: elementTabIndex
  }, listeners, sectionMarkup));
}
ActionList.Item = Item;

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.js
import React50 from "react";

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.css.js
var styles22 = {
  ActionMenu: "Polaris-ActionMenu"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.js
import React45 from "react";
import { MenuHorizontalIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.css.js
var styles23 = {
  RollupActivator: "Polaris-ActionMenu-RollupActions__RollupActivator"
};

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.js
import React44, { forwardRef as forwardRef5, useState as useState12, useRef as useRef13, useId as useId5, useImperativeHandle as useImperativeHandle2, useCallback as useCallback11, useEffect as useEffect12, Children as Children3 } from "react";

// node_modules/@shopify/polaris/build/esm/components/Popover/set-activator-attributes.js
function setActivatorAttributes(activator, {
  id,
  active = !1,
  ariaHaspopup,
  activatorDisabled = !1
}) {
  activatorDisabled || (activator.tabIndex = activator.tabIndex || 0), activator.setAttribute("aria-controls", id), activator.setAttribute("aria-owns", id), activator.setAttribute("aria-expanded", String(active)), activator.setAttribute("data-state", active ? "open" : "closed"), ariaHaspopup != null && activator.setAttribute("aria-haspopup", String(ariaHaspopup));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/PopoverOverlay/PopoverOverlay.js
import React43, { PureComponent as PureComponent3, createRef, Children as Children2 } from "react";
import { themeDefault as themeDefault3 } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/components.js
import React40, { isValidElement, Children } from "react";
function wrapWithComponent(element, Component2, props) {
  return element == null ? null : isElementOfType(element, Component2) ? element : /* @__PURE__ */ React40.createElement(Component2, props, element);
}
var isComponent = (AComponent, AnotherComponent) => AComponent === AnotherComponent;
function isElementOfType(element, Component2) {
  if (element == null || !/* @__PURE__ */ isValidElement(element) || typeof element.type == "string")
    return !1;
  let {
    type: defaultType
  } = element, type = element.props?.__type__ || defaultType;
  return (Array.isArray(Component2) ? Component2 : [Component2]).some((AComponent) => typeof type != "string" && isComponent(AComponent, type));
}
function elementChildren(children, predicate = () => !0) {
  return Children.toArray(children).filter((child) => /* @__PURE__ */ isValidElement(child) && predicate(child));
}
function ConditionalWrapper({
  condition,
  wrapper,
  children
}) {
  return condition ? wrapper(children) : children;
}
function ConditionalRender({
  condition,
  children
}) {
  return condition ? children : null;
}

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.css.js
var styles24 = {
  Popover: "Polaris-Popover",
  PopoverOverlay: "Polaris-Popover__PopoverOverlay",
  "PopoverOverlay-noAnimation": "Polaris-Popover__PopoverOverlay--noAnimation",
  "PopoverOverlay-entering": "Polaris-Popover__PopoverOverlay--entering",
  "PopoverOverlay-open": "Polaris-Popover__PopoverOverlay--open",
  measuring: "Polaris-Popover--measuring",
  "PopoverOverlay-exiting": "Polaris-Popover__PopoverOverlay--exiting",
  fullWidth: "Polaris-Popover--fullWidth",
  Content: "Polaris-Popover__Content",
  positionedAbove: "Polaris-Popover--positionedAbove",
  positionedCover: "Polaris-Popover--positionedCover",
  ContentContainer: "Polaris-Popover__ContentContainer",
  "Content-fullHeight": "Polaris-Popover__Content--fullHeight",
  "Content-fluidContent": "Polaris-Popover__Content--fluidContent",
  Pane: "Polaris-Popover__Pane",
  "Pane-fixed": "Polaris-Popover__Pane--fixed",
  "Pane-subdued": "Polaris-Popover__Pane--subdued",
  "Pane-captureOverscroll": "Polaris-Popover__Pane--captureOverscroll",
  Section: "Polaris-Popover__Section",
  FocusTracker: "Polaris-Popover__FocusTracker",
  "PopoverOverlay-hideOnPrint": "Polaris-Popover__PopoverOverlay--hideOnPrint"
};

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Pane/Pane.js
import React42 from "react";

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Section/Section.js
import React41 from "react";
function Section2({
  children
}) {
  return /* @__PURE__ */ React41.createElement("div", {
    className: styles24.Section
  }, /* @__PURE__ */ React41.createElement(Box, {
    paddingInlineStart: "300",
    paddingInlineEnd: "300",
    paddingBlockStart: "200",
    paddingBlockEnd: "150"
  }, children));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Pane/Pane.js
function Pane({
  captureOverscroll = !1,
  fixed,
  sectioned,
  children,
  height,
  maxHeight,
  minHeight,
  subdued,
  onScrolledToBottom
}) {
  let className = classNames(styles24.Pane, fixed && styles24["Pane-fixed"], subdued && styles24["Pane-subdued"], captureOverscroll && styles24["Pane-captureOverscroll"]), content = sectioned ? wrapWithComponent(children, Section2, {}) : children, style = {
    height,
    maxHeight,
    minHeight
  };
  return fixed ? /* @__PURE__ */ React42.createElement("div", {
    style,
    className
  }, content) : /* @__PURE__ */ React42.createElement(Scrollable, {
    shadow: !0,
    className,
    style,
    onScrolledToBottom,
    scrollbarWidth: "thin"
  }, content);
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/PopoverOverlay/PopoverOverlay.js
var PopoverCloseSource = /* @__PURE__ */ function(PopoverCloseSource2) {
  return PopoverCloseSource2[PopoverCloseSource2.Click = 0] = "Click", PopoverCloseSource2[PopoverCloseSource2.EscapeKeypress = 1] = "EscapeKeypress", PopoverCloseSource2[PopoverCloseSource2.FocusOut = 2] = "FocusOut", PopoverCloseSource2[PopoverCloseSource2.ScrollOut = 3] = "ScrollOut", PopoverCloseSource2;
}({}), TransitionStatus = /* @__PURE__ */ function(TransitionStatus2) {
  return TransitionStatus2.Entering = "entering", TransitionStatus2.Entered = "entered", TransitionStatus2.Exiting = "exiting", TransitionStatus2.Exited = "exited", TransitionStatus2;
}(TransitionStatus || {}), PopoverOverlay = class extends PureComponent3 {
  constructor(props) {
    super(props), this.state = {
      transitionStatus: this.props.active ? TransitionStatus.Entering : TransitionStatus.Exited
    }, this.contentNode = /* @__PURE__ */ createRef(), this.renderPopover = (overlayDetails) => {
      let {
        measuring,
        desiredHeight,
        positioning
      } = overlayDetails, {
        id,
        children,
        sectioned,
        fullWidth,
        fullHeight,
        fluidContent,
        hideOnPrint,
        autofocusTarget,
        captureOverscroll
      } = this.props, isCovering = positioning === "cover", className = classNames(styles24.Popover, measuring && styles24.measuring, (fullWidth || isCovering) && styles24.fullWidth, hideOnPrint && styles24["PopoverOverlay-hideOnPrint"], positioning && styles24[variationName("positioned", positioning)]), contentStyles = measuring ? void 0 : {
        height: desiredHeight
      }, contentClassNames = classNames(styles24.Content, fullHeight && styles24["Content-fullHeight"], fluidContent && styles24["Content-fluidContent"]), {
        window: window2
      } = this.state;
      return /* @__PURE__ */ React43.createElement("div", Object.assign({
        className
      }, overlay.props), /* @__PURE__ */ React43.createElement(EventListener, {
        event: "click",
        handler: this.handleClick,
        window: window2
      }), /* @__PURE__ */ React43.createElement(EventListener, {
        event: "touchstart",
        handler: this.handleClick,
        window: window2
      }), /* @__PURE__ */ React43.createElement(KeypressListener, {
        keyCode: Key.Escape,
        handler: this.handleEscape,
        document: window2?.document
      }), /* @__PURE__ */ React43.createElement("div", {
        className: styles24.FocusTracker,
        tabIndex: 0,
        onFocus: this.handleFocusFirstItem
      }), /* @__PURE__ */ React43.createElement("div", {
        className: styles24.ContentContainer
      }, /* @__PURE__ */ React43.createElement("div", {
        id,
        tabIndex: autofocusTarget === "none" ? void 0 : -1,
        className: contentClassNames,
        style: contentStyles,
        ref: this.contentNode
      }, renderPopoverContent(children, {
        captureOverscroll,
        sectioned
      }))), /* @__PURE__ */ React43.createElement("div", {
        className: styles24.FocusTracker,
        tabIndex: 0,
        onFocus: this.handleFocusLastItem
      }));
    }, this.handleClick = (event) => {
      let target = event.target, {
        contentNode,
        props: {
          activator,
          onClose,
          preventCloseOnChildOverlayClick
        }
      } = this, composedPath = event.composedPath(), wasDescendant = preventCloseOnChildOverlayClick ? wasPolarisPortalDescendant(composedPath, this.context.container) : wasContentNodeDescendant(composedPath, contentNode), isActivatorDescendant = nodeContainsDescendant(activator, target);
      wasDescendant || isActivatorDescendant || this.state.transitionStatus !== TransitionStatus.Entered || onClose(PopoverCloseSource.Click);
    }, this.handleScrollOut = () => {
      this.props.onClose(PopoverCloseSource.ScrollOut);
    }, this.handleEscape = (event) => {
      let target = event.target, {
        contentNode,
        props: {
          activator
        }
      } = this, composedPath = event.composedPath(), wasDescendant = wasContentNodeDescendant(composedPath, contentNode), isActivatorDescendant = nodeContainsDescendant(activator, target);
      (wasDescendant || isActivatorDescendant) && this.props.onClose(PopoverCloseSource.EscapeKeypress);
    }, this.handleFocusFirstItem = () => {
      this.props.onClose(PopoverCloseSource.FocusOut);
    }, this.handleFocusLastItem = () => {
      this.props.onClose(PopoverCloseSource.FocusOut);
    }, this.overlayRef = /* @__PURE__ */ createRef();
  }
  forceUpdatePosition() {
    this.overlayRef.current?.forceUpdatePosition();
  }
  changeTransitionStatus(transitionStatus, cb) {
    this.setState({
      transitionStatus
    }, cb), this.contentNode.current && this.contentNode.current.getBoundingClientRect();
  }
  componentDidMount() {
    this.props.active && (this.focusContent(), this.changeTransitionStatus(TransitionStatus.Entered)), this.observer = new ResizeObserver(() => {
      this.setState({
        /**
         * This is a workaround to enable event listeners to be
         * re-attached when moving from one document to another
         * when using a React portal across iframes.
         * Using a resize observer works because when the clientWidth
         * will go from 0 to the real width after the activator
         * gets rendered in its new place.
         */
        window: this.props.activator.ownerDocument.defaultView
      });
    }), this.observer.observe(this.props.activator);
  }
  componentDidUpdate(oldProps) {
    this.props.active && !oldProps.active && (this.focusContent(), this.changeTransitionStatus(TransitionStatus.Entering, () => {
      this.clearTransitionTimeout(), this.enteringTimer = window.setTimeout(() => {
        this.setState({
          transitionStatus: TransitionStatus.Entered
        });
      }, parseInt(themeDefault3.motion["motion-duration-100"], 10));
    })), !this.props.active && oldProps.active && (this.clearTransitionTimeout(), this.setState({
      transitionStatus: TransitionStatus.Exited
    })), this.props.activator !== oldProps.activator && (this.observer?.unobserve(oldProps.activator), this.observer?.observe(this.props.activator));
  }
  componentWillUnmount() {
    this.clearTransitionTimeout(), this.observer?.disconnect();
  }
  render() {
    let {
      active,
      activator,
      fullWidth,
      preferredPosition = "below",
      preferredAlignment = "center",
      preferInputActivator = !0,
      fixed,
      zIndexOverride
    } = this.props, {
      transitionStatus
    } = this.state;
    if (transitionStatus === TransitionStatus.Exited && !active)
      return null;
    let className = classNames(styles24.PopoverOverlay, transitionStatus === TransitionStatus.Entering && styles24["PopoverOverlay-entering"], transitionStatus === TransitionStatus.Entered && styles24["PopoverOverlay-open"], transitionStatus === TransitionStatus.Exiting && styles24["PopoverOverlay-exiting"], preferredPosition === "cover" && styles24["PopoverOverlay-noAnimation"]);
    return /* @__PURE__ */ React43.createElement(PositionedOverlay, {
      ref: this.overlayRef,
      fullWidth,
      active,
      activator,
      preferInputActivator,
      preferredPosition,
      preferredAlignment,
      render: this.renderPopover.bind(this),
      fixed,
      onScrollOut: this.handleScrollOut,
      classNames: className,
      zIndexOverride
    });
  }
  clearTransitionTimeout() {
    this.enteringTimer && window.clearTimeout(this.enteringTimer);
  }
  focusContent() {
    let {
      autofocusTarget = "container"
    } = this.props;
    autofocusTarget === "none" || this.contentNode == null || requestAnimationFrame(() => {
      if (this.contentNode.current == null)
        return;
      let focusableChild = findFirstKeyboardFocusableNode(this.contentNode.current);
      focusableChild && autofocusTarget === "first-node" ? focusableChild.focus({
        preventScroll: !1
      }) : this.contentNode.current.focus({
        preventScroll: !1
      });
    });
  }
};
PopoverOverlay.contextType = PortalsManagerContext;
function renderPopoverContent(children, props) {
  let childrenArray = Children2.toArray(children);
  return isElementOfType(childrenArray[0], Pane) ? childrenArray : wrapWithComponent(childrenArray, Pane, props);
}
function nodeContainsDescendant(rootNode, descendant) {
  if (rootNode === descendant)
    return !0;
  let parent = descendant.parentNode;
  for (; parent != null; ) {
    if (parent === rootNode)
      return !0;
    parent = parent.parentNode;
  }
  return !1;
}
function wasContentNodeDescendant(composedPath, contentNode) {
  return contentNode.current != null && composedPath.includes(contentNode.current);
}
function wasPolarisPortalDescendant(composedPath, portalsContainerElement) {
  return composedPath.some((eventTarget) => eventTarget instanceof Node && portalsContainerElement?.contains(eventTarget));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.js
var PopoverComponent = /* @__PURE__ */ forwardRef5(function({
  activatorWrapper = "div",
  children,
  onClose,
  activator,
  preventFocusOnClose,
  active,
  fixed,
  ariaHaspopup,
  preferInputActivator = !0,
  zIndexOverride,
  ...rest
}, ref) {
  let [isDisplayed, setIsDisplay] = useState12(!1), [activatorNode, setActivatorNode] = useState12(), overlayRef = useRef13(null), activatorContainer = useRef13(null), WrapperComponent = activatorWrapper, id = useId5();
  function forceUpdatePosition() {
    overlayRef.current?.forceUpdatePosition();
  }
  let handleClose = (source) => {
    if (onClose(source), !(activatorContainer.current == null || preventFocusOnClose)) {
      if (source === PopoverCloseSource.FocusOut && activatorNode) {
        let focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode) || findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current;
        focusNextFocusableNode(focusableActivator, isInPortal) || focusableActivator.focus();
      } else if (source === PopoverCloseSource.EscapeKeypress && activatorNode) {
        let focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode) || findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current;
        focusableActivator ? focusableActivator.focus() : focusNextFocusableNode(focusableActivator, isInPortal);
      }
    }
  };
  useImperativeHandle2(ref, () => ({
    forceUpdatePosition,
    close: (target = "activator") => {
      let source = target === "activator" ? PopoverCloseSource.EscapeKeypress : PopoverCloseSource.FocusOut;
      handleClose(source);
    }
  }));
  let setAccessibilityAttributes = useCallback11(() => {
    if (activatorContainer.current == null)
      return;
    let focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current, activatorDisabled = "disabled" in focusableActivator && Boolean(focusableActivator.disabled);
    setActivatorAttributes(focusableActivator, {
      id,
      active,
      ariaHaspopup,
      activatorDisabled
    });
  }, [id, active, ariaHaspopup]);
  useEffect12(() => {
    function setDisplayState() {
      setIsDisplay(Boolean(activatorContainer.current && (activatorContainer.current.offsetParent !== null || activatorContainer.current === activatorContainer.current.ownerDocument.body && activatorContainer.current.clientWidth > 0)));
    }
    if (!activatorContainer.current)
      return;
    let observer = new ResizeObserver(setDisplayState);
    return observer.observe(activatorContainer.current), setDisplayState(), () => {
      observer.disconnect();
    };
  }, []), useEffect12(() => {
    (!activatorNode && activatorContainer.current || activatorNode && activatorContainer.current && !activatorContainer.current.contains(activatorNode)) && setActivatorNode(activatorContainer.current.firstElementChild), setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]), useEffect12(() => {
    activatorNode && activatorContainer.current && setActivatorNode(activatorContainer.current.firstElementChild), setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]);
  let portal2 = activatorNode && isDisplayed ? /* @__PURE__ */ React44.createElement(Portal, {
    idPrefix: "popover"
  }, /* @__PURE__ */ React44.createElement(PopoverOverlay, Object.assign({
    ref: overlayRef,
    id,
    activator: activatorNode,
    preferInputActivator,
    onClose: handleClose,
    active,
    fixed,
    zIndexOverride
  }, rest), children)) : null;
  return /* @__PURE__ */ React44.createElement(WrapperComponent, {
    ref: activatorContainer
  }, Children3.only(activator), portal2);
});
function isInPortal(element) {
  let parentElement = element.parentElement;
  for (; parentElement; ) {
    if (parentElement.matches(portal.selector))
      return !1;
    parentElement = parentElement.parentElement;
  }
  return !0;
}
var Popover2 = Object.assign(PopoverComponent, {
  Pane,
  Section: Section2
});

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.js
function RollupActions({
  accessibilityLabel,
  items = [],
  sections = []
}) {
  let i18n = useI18n(), {
    value: rollupOpen,
    toggle: toggleRollupOpen
  } = useToggle(!1);
  if (items.length === 0 && sections.length === 0)
    return null;
  let activatorMarkup = /* @__PURE__ */ React45.createElement("div", {
    className: styles23.RollupActivator
  }, /* @__PURE__ */ React45.createElement(Button, {
    icon: MenuHorizontalIcon,
    accessibilityLabel: accessibilityLabel || i18n.translate("Polaris.ActionMenu.RollupActions.rollupButton"),
    onClick: toggleRollupOpen
  }));
  return /* @__PURE__ */ React45.createElement(Popover2, {
    active: rollupOpen,
    activator: activatorMarkup,
    preferredAlignment: "right",
    onClose: toggleRollupOpen,
    hideOnPrint: !0
  }, /* @__PURE__ */ React45.createElement(ActionList, {
    items,
    sections,
    onActionAnyItem: toggleRollupOpen
  }));
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.js
import React49, { useRef as useRef15, useState as useState13, useReducer, useCallback as useCallback14, useEffect as useEffect14, useMemo as useMemo6 } from "react";

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.css.js
var styles25 = {
  ActionsLayoutOuter: "Polaris-ActionMenu-Actions__ActionsLayoutOuter",
  ActionsLayout: "Polaris-ActionMenu-Actions__ActionsLayout",
  "ActionsLayout--measuring": "Polaris-ActionMenu-Actions--actionsLayoutMeasuring",
  ActionsLayoutMeasurer: "Polaris-ActionMenu-Actions__ActionsLayoutMeasurer"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/utilities.js
function getVisibleAndHiddenActionsIndices(actions = [], groups = [], disclosureWidth, actionsWidths, containerWidth) {
  let sumTabWidths = actionsWidths.reduce((sum, width) => sum + width, 0), arrayOfActionsIndices = actions.map((_, index) => index), arrayOfGroupsIndices = groups.map((_, index) => index), visibleActions = [], hiddenActions = [], visibleGroups = [], hiddenGroups = [];
  if (containerWidth > sumTabWidths)
    visibleActions.push(...arrayOfActionsIndices), visibleGroups.push(...arrayOfGroupsIndices);
  else {
    let accumulatedWidth = 0;
    arrayOfActionsIndices.forEach((currentActionsIndex) => {
      let currentActionsWidth = actionsWidths[currentActionsIndex];
      if (accumulatedWidth + currentActionsWidth >= containerWidth - disclosureWidth) {
        hiddenActions.push(currentActionsIndex);
        return;
      }
      visibleActions.push(currentActionsIndex), accumulatedWidth += currentActionsWidth;
    }), arrayOfGroupsIndices.forEach((currentGroupsIndex) => {
      let currentActionsWidth = actionsWidths[currentGroupsIndex + actions.length];
      if (accumulatedWidth + currentActionsWidth >= containerWidth - disclosureWidth) {
        hiddenGroups.push(currentGroupsIndex);
        return;
      }
      visibleGroups.push(currentGroupsIndex), accumulatedWidth += currentActionsWidth;
    });
  }
  return {
    visibleActions,
    hiddenActions,
    visibleGroups,
    hiddenGroups
  };
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/MenuGroup/MenuGroup.js
import React47, { useCallback as useCallback12 } from "react";

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/MenuGroup/MenuGroup.css.js
var styles26 = {
  Details: "Polaris-ActionMenu-MenuGroup__Details"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.js
import React46 from "react";

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.css.js
var styles27 = {
  SecondaryAction: "Polaris-ActionMenu-SecondaryAction",
  critical: "Polaris-ActionMenu-SecondaryAction--critical"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.js
function SecondaryAction({
  children,
  tone,
  helpText,
  onAction,
  destructive,
  ...rest
}) {
  let buttonMarkup = /* @__PURE__ */ React46.createElement(Button, Object.assign({
    onClick: onAction,
    tone: destructive ? "critical" : void 0
  }, rest), children), actionMarkup = helpText ? /* @__PURE__ */ React46.createElement(Tooltip, {
    preferredPosition: "below",
    content: helpText
  }, buttonMarkup) : buttonMarkup;
  return /* @__PURE__ */ React46.createElement("div", {
    className: classNames(styles27.SecondaryAction, tone === "critical" && styles27.critical)
  }, actionMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/MenuGroup/MenuGroup.js
function MenuGroup({
  accessibilityLabel,
  active,
  actions,
  details,
  title,
  icon,
  disabled,
  onClick,
  onClose,
  onOpen,
  sections
}) {
  let handleClose = useCallback12(() => {
    onClose(title);
  }, [onClose, title]), handleOpen = useCallback12(() => {
    onOpen(title);
  }, [onOpen, title]), handleClick = useCallback12(() => {
    onClick ? onClick(handleOpen) : handleOpen();
  }, [onClick, handleOpen]), popoverActivator = /* @__PURE__ */ React47.createElement(SecondaryAction, {
    disclosure: !0,
    disabled,
    icon,
    accessibilityLabel,
    onClick: handleClick
  }, title);
  return /* @__PURE__ */ React47.createElement(Popover2, {
    active: Boolean(active),
    activator: popoverActivator,
    preferredAlignment: "left",
    onClose: handleClose,
    hideOnPrint: !0
  }, /* @__PURE__ */ React47.createElement(ActionList, {
    items: actions,
    sections,
    onActionAnyItem: handleClose
  }), details && /* @__PURE__ */ React47.createElement("div", {
    className: styles26.Details
  }, details));
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/components/ActionsMeasurer/ActionsMeasurer.js
import React48, { useRef as useRef14, useCallback as useCallback13, useEffect as useEffect13 } from "react";
var ACTION_SPACING = 8;
function ActionsMeasurer({
  actions = [],
  groups = [],
  handleMeasurement: handleMeasurementProp
}) {
  let i18n = useI18n(), containerNode = useRef14(null), defaultRollupGroup = {
    title: i18n.translate("Polaris.ActionMenu.Actions.moreActions"),
    actions: []
  }, activator = /* @__PURE__ */ React48.createElement(SecondaryAction, {
    disclosure: !0
  }, defaultRollupGroup.title), handleMeasurement = useCallback13(() => {
    if (!containerNode.current)
      return;
    let containerWidth = containerNode.current.offsetWidth, hiddenActionNodes = containerNode.current.children, hiddenActionsWidths = Array.from(hiddenActionNodes).map((node) => Math.ceil(node.getBoundingClientRect().width) + ACTION_SPACING), disclosureWidth = hiddenActionsWidths.pop() || 0;
    handleMeasurementProp({
      containerWidth,
      disclosureWidth,
      hiddenActionsWidths
    });
  }, [handleMeasurementProp]);
  useEffect13(() => {
    handleMeasurement();
  }, [handleMeasurement, actions, groups]);
  let actionsMarkup = actions.map((action5) => {
    let {
      content,
      onAction,
      ...rest
    } = action5;
    return /* @__PURE__ */ React48.createElement(SecondaryAction, Object.assign({
      key: content,
      onClick: onAction
    }, rest), content);
  }), groupsMarkup = groups.map((group) => {
    let {
      title,
      icon
    } = group;
    return /* @__PURE__ */ React48.createElement(SecondaryAction, {
      key: title,
      disclosure: !0,
      icon
    }, title);
  });
  return useEventListener("resize", handleMeasurement), /* @__PURE__ */ React48.createElement("div", {
    className: styles25.ActionsLayoutMeasurer,
    ref: containerNode
  }, actionsMarkup, groupsMarkup, activator);
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.js
function Actions({
  actions,
  groups,
  onActionRollup
}) {
  let i18n = useI18n(), rollupActiveRef = useRef15(null), [activeMenuGroup, setActiveMenuGroup] = useState13(void 0), [state, setState] = useReducer((data, partialData) => ({
    ...data,
    ...partialData
  }), {
    disclosureWidth: 0,
    containerWidth: 1 / 0,
    actionsWidths: [],
    visibleActions: [],
    hiddenActions: [],
    visibleGroups: [],
    hiddenGroups: [],
    hasMeasured: !1
  }), {
    visibleActions,
    hiddenActions,
    visibleGroups,
    hiddenGroups,
    containerWidth,
    disclosureWidth,
    actionsWidths,
    hasMeasured
  } = state, defaultRollupGroup = {
    title: i18n.translate("Polaris.ActionMenu.Actions.moreActions"),
    actions: []
  }, handleMenuGroupToggle = useCallback14((group) => setActiveMenuGroup(activeMenuGroup ? void 0 : group), [activeMenuGroup]), handleMenuGroupClose = useCallback14(() => setActiveMenuGroup(void 0), []);
  useEffect14(() => {
    if (containerWidth === 0)
      return;
    let {
      visibleActions: visibleActions2,
      visibleGroups: visibleGroups2,
      hiddenActions: hiddenActions2,
      hiddenGroups: hiddenGroups2
    } = getVisibleAndHiddenActionsIndices(actions, groups, disclosureWidth, actionsWidths, containerWidth);
    setState({
      visibleActions: visibleActions2,
      visibleGroups: visibleGroups2,
      hiddenActions: hiddenActions2,
      hiddenGroups: hiddenGroups2,
      hasMeasured: containerWidth !== 1 / 0
    });
  }, [containerWidth, disclosureWidth, actions, groups, actionsWidths, setState]);
  let actionsOrDefault = useMemo6(() => actions ?? [], [actions]), groupsOrDefault = useMemo6(() => groups ?? [], [groups]), actionsMarkup = actionsOrDefault.filter((_, index) => !!visibleActions.includes(index)).map((action5) => {
    let {
      content,
      onAction,
      ...rest
    } = action5;
    return /* @__PURE__ */ React49.createElement(SecondaryAction, Object.assign({
      key: content,
      onClick: onAction
    }, rest), content);
  }), filteredGroups = (hiddenGroups.length > 0 || hiddenActions.length > 0 ? [...groupsOrDefault, defaultRollupGroup] : [...groupsOrDefault]).filter((group, index) => {
    let hasNoGroupsProp = groupsOrDefault.length === 0, isVisibleGroup = visibleGroups.includes(index), isDefaultGroup = group === defaultRollupGroup;
    return hasNoGroupsProp ? hiddenActions.length > 0 : isDefaultGroup ? !0 : isVisibleGroup;
  }), hiddenActionObjects = hiddenActions.map((index) => actionsOrDefault[index]).filter((action5) => action5 != null), hiddenGroupObjects = hiddenGroups.map((index) => groupsOrDefault[index]).filter((group) => group != null), groupsMarkup = filteredGroups.map((group) => {
    let {
      title,
      actions: groupActions,
      ...rest
    } = group, isDefaultGroup = group === defaultRollupGroup, allHiddenItems = [...hiddenActionObjects, ...hiddenGroupObjects], [finalRolledUpActions, finalRolledUpSectionGroups] = allHiddenItems.reduce(([actions2, sections], action5) => (isMenuGroup(action5) ? sections.push({
      title: action5.title,
      items: action5.actions.map((sectionAction) => ({
        ...sectionAction,
        disabled: action5.disabled || sectionAction.disabled
      }))
    }) : actions2.push(action5), [actions2, sections]), [[], []]);
    return isDefaultGroup ? /* @__PURE__ */ React49.createElement(MenuGroup, Object.assign({
      key: title,
      title,
      active: title === activeMenuGroup,
      actions: [...finalRolledUpActions, ...groupActions],
      sections: finalRolledUpSectionGroups
    }, rest, {
      onOpen: handleMenuGroupToggle,
      onClose: handleMenuGroupClose
    })) : /* @__PURE__ */ React49.createElement(MenuGroup, Object.assign({
      key: title,
      title,
      active: title === activeMenuGroup,
      actions: groupActions
    }, rest, {
      onOpen: handleMenuGroupToggle,
      onClose: handleMenuGroupClose
    }));
  }), handleMeasurement = useCallback14((measurements) => {
    let {
      hiddenActionsWidths: actionsWidths2,
      containerWidth: containerWidth2,
      disclosureWidth: disclosureWidth2
    } = measurements, {
      visibleActions: visibleActions2,
      hiddenActions: hiddenActions2,
      visibleGroups: visibleGroups2,
      hiddenGroups: hiddenGroups2
    } = getVisibleAndHiddenActionsIndices(actionsOrDefault, groupsOrDefault, disclosureWidth2, actionsWidths2, containerWidth2);
    if (onActionRollup) {
      let isRollupActive = hiddenActions2.length > 0 || hiddenGroups2.length > 0;
      rollupActiveRef.current !== isRollupActive && (onActionRollup(isRollupActive), rollupActiveRef.current = isRollupActive);
    }
    setState({
      visibleActions: visibleActions2,
      hiddenActions: hiddenActions2,
      visibleGroups: visibleGroups2,
      hiddenGroups: hiddenGroups2,
      actionsWidths: actionsWidths2,
      containerWidth: containerWidth2,
      disclosureWidth: disclosureWidth2,
      hasMeasured: !0
    });
  }, [actionsOrDefault, groupsOrDefault, onActionRollup]), actionsMeasurer = /* @__PURE__ */ React49.createElement(ActionsMeasurer, {
    actions,
    groups,
    handleMeasurement
  });
  return /* @__PURE__ */ React49.createElement("div", {
    className: styles25.ActionsLayoutOuter
  }, actionsMeasurer, /* @__PURE__ */ React49.createElement("div", {
    className: classNames(styles25.ActionsLayout, !hasMeasured && styles25["ActionsLayout--measuring"])
  }, actionsMarkup, groupsMarkup));
}
function isMenuGroup(actionOrMenuGroup) {
  return "title" in actionOrMenuGroup;
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.js
function ActionMenu({
  actions = [],
  groups = [],
  rollup,
  rollupActionsLabel,
  onActionRollup
}) {
  if (actions.length === 0 && groups.length === 0)
    return null;
  let actionMenuClassNames = classNames(styles22.ActionMenu, rollup && styles22.rollup), rollupSections = groups.map((group) => convertGroupToSection(group));
  return /* @__PURE__ */ React50.createElement("div", {
    className: actionMenuClassNames
  }, rollup ? /* @__PURE__ */ React50.createElement(RollupActions, {
    accessibilityLabel: rollupActionsLabel,
    items: actions,
    sections: rollupSections
  }) : /* @__PURE__ */ React50.createElement(Actions, {
    actions,
    groups,
    onActionRollup
  }));
}
function hasGroupsWithActions(groups = []) {
  return groups.length === 0 ? !1 : groups.some((group) => group.actions.length > 0);
}
function convertGroupToSection({
  title,
  actions,
  disabled
}) {
  return {
    title,
    items: actions.map((action5) => ({
      ...action5,
      disabled: disabled || action5.disabled
    }))
  };
}

// node_modules/@shopify/polaris/build/esm/utilities/banner-context.js
import { createContext as createContext15 } from "react";
var BannerContext = /* @__PURE__ */ createContext15(!1);

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.js
import React52 from "react";

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.css.js
var styles28 = {
  ButtonGroup: "Polaris-ButtonGroup",
  Item: "Polaris-ButtonGroup__Item",
  "Item-plain": "Polaris-ButtonGroup__Item--plain",
  variantSegmented: "Polaris-ButtonGroup--variantSegmented",
  "Item-focused": "Polaris-ButtonGroup__Item--focused",
  fullWidth: "Polaris-ButtonGroup--fullWidth",
  extraTight: "Polaris-ButtonGroup--extraTight",
  tight: "Polaris-ButtonGroup--tight",
  loose: "Polaris-ButtonGroup--loose",
  noWrap: "Polaris-ButtonGroup--noWrap"
};

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/components/Item/Item.js
import React51 from "react";
function Item3({
  button
}) {
  let {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(!1), className = classNames(styles28.Item, focused && styles28["Item-focused"], button.props.variant === "plain" && styles28["Item-plain"]);
  return /* @__PURE__ */ React51.createElement("div", {
    className,
    onFocus: forceTrueFocused,
    onBlur: forceFalseFocused
  }, button);
}

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.js
function ButtonGroup({
  children,
  gap,
  variant,
  fullWidth,
  connectedTop,
  noWrap
}) {
  let className = classNames(styles28.ButtonGroup, gap && styles28[gap], variant && styles28[variationName("variant", variant)], fullWidth && styles28.fullWidth, noWrap && styles28.noWrap), contents = elementChildren(children).map((child, index) => /* @__PURE__ */ React52.createElement(Item3, {
    button: child,
    key: index
  }));
  return /* @__PURE__ */ React52.createElement("div", {
    className,
    "data-buttongroup-variant": variant,
    "data-buttongroup-connected-top": connectedTop,
    "data-buttongroup-full-width": fullWidth,
    "data-buttongroup-no-wrap": noWrap
  }, contents);
}

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.js
import React53 from "react";

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.css.js
var styles29 = {
  Bleed: "Polaris-Bleed"
};

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.js
var Bleed = ({
  marginInline,
  marginBlock,
  marginBlockStart,
  marginBlockEnd,
  marginInlineStart,
  marginInlineEnd,
  children
}) => {
  let getNegativeMargins = (direction) => {
    let xAxis = ["marginInlineStart", "marginInlineEnd"], yAxis = ["marginBlockStart", "marginBlockEnd"], directionValues = {
      marginBlockStart,
      marginBlockEnd,
      marginInlineStart,
      marginInlineEnd,
      marginInline,
      marginBlock
    };
    if (directionValues[direction])
      return directionValues[direction];
    if (xAxis.includes(direction) && marginInline)
      return directionValues.marginInline;
    if (yAxis.includes(direction) && marginBlock)
      return directionValues.marginBlock;
  }, negativeMarginBlockStart = getNegativeMargins("marginBlockStart"), negativeMarginBlockEnd = getNegativeMargins("marginBlockEnd"), negativeMarginInlineStart = getNegativeMargins("marginInlineStart"), negativeMarginInlineEnd = getNegativeMargins("marginInlineEnd"), style = {
    ...getResponsiveProps("bleed", "margin-block-start", "space", negativeMarginBlockStart),
    ...getResponsiveProps("bleed", "margin-block-end", "space", negativeMarginBlockEnd),
    ...getResponsiveProps("bleed", "margin-inline-start", "space", negativeMarginInlineStart),
    ...getResponsiveProps("bleed", "margin-inline-end", "space", negativeMarginInlineEnd)
  };
  return /* @__PURE__ */ React53.createElement("div", {
    className: styles29.Bleed,
    style: sanitizeCustomProperties(style)
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/Breadcrumbs/Breadcrumbs.js
import React54 from "react";
import { ArrowLeftIcon } from "@shopify/polaris-icons";
function Breadcrumbs({
  backAction
}) {
  let {
    content
  } = backAction;
  return /* @__PURE__ */ React54.createElement(Button, {
    key: content,
    url: "url" in backAction ? backAction.url : void 0,
    onClick: "onAction" in backAction ? backAction.onAction : void 0,
    onPointerDown: handleMouseUpByBlurring,
    icon: ArrowLeftIcon,
    accessibilityLabel: backAction.accessibilityLabel ?? content
  });
}

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.js
import { ChevronLeftIcon, ChevronRightIcon } from "@shopify/polaris-icons";
import React55, { createRef as createRef2 } from "react";

// node_modules/@shopify/polaris/build/esm/utilities/is-input-focused.js
var EditableTarget = /* @__PURE__ */ function(EditableTarget2) {
  return EditableTarget2.Input = "INPUT", EditableTarget2.Textarea = "TEXTAREA", EditableTarget2.Select = "SELECT", EditableTarget2.ContentEditable = "contenteditable", EditableTarget2;
}(EditableTarget || {});
function isInputFocused() {
  if (document == null || document.activeElement == null)
    return !1;
  let {
    tagName
  } = document.activeElement;
  return tagName === EditableTarget.Input || tagName === EditableTarget.Textarea || tagName === EditableTarget.Select || document.activeElement.hasAttribute(EditableTarget.ContentEditable);
}

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.css.js
var styles30 = {
  Pagination: "Polaris-Pagination",
  table: "Polaris-Pagination--table",
  TablePaginationActions: "Polaris-Pagination__TablePaginationActions"
};

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.js
function Pagination({
  hasNext,
  hasPrevious,
  nextURL,
  previousURL,
  onNext,
  onPrevious,
  nextTooltip,
  previousTooltip,
  nextKeys,
  previousKeys,
  accessibilityLabel,
  accessibilityLabels,
  label,
  type = "page"
}) {
  let i18n = useI18n(), node = /* @__PURE__ */ createRef2(), navLabel = accessibilityLabel || i18n.translate("Polaris.Pagination.pagination"), previousLabel = accessibilityLabels?.previous || i18n.translate("Polaris.Pagination.previous"), nextLabel = accessibilityLabels?.next || i18n.translate("Polaris.Pagination.next"), prev = /* @__PURE__ */ React55.createElement(Button, {
    icon: ChevronLeftIcon,
    accessibilityLabel: previousLabel,
    url: previousURL,
    onClick: onPrevious,
    disabled: !hasPrevious,
    id: "previousURL"
  }), constructedPrevious = previousTooltip && hasPrevious ? /* @__PURE__ */ React55.createElement(Tooltip, {
    activatorWrapper: "span",
    content: previousTooltip,
    preferredPosition: "below"
  }, prev) : prev, next = /* @__PURE__ */ React55.createElement(Button, {
    icon: ChevronRightIcon,
    accessibilityLabel: nextLabel,
    url: nextURL,
    onClick: onNext,
    disabled: !hasNext,
    id: "nextURL"
  }), constructedNext = nextTooltip && hasNext ? /* @__PURE__ */ React55.createElement(Tooltip, {
    activatorWrapper: "span",
    content: nextTooltip,
    preferredPosition: "below"
  }, next) : next, previousHandler = onPrevious || noop4, previousButtonEvents = previousKeys && (previousURL || onPrevious) && hasPrevious && previousKeys.map((key) => /* @__PURE__ */ React55.createElement(KeypressListener, {
    key,
    keyCode: key,
    handler: handleCallback(previousURL ? clickPaginationLink("previousURL", node) : previousHandler)
  })), nextHandler = onNext || noop4, nextButtonEvents = nextKeys && (nextURL || onNext) && hasNext && nextKeys.map((key) => /* @__PURE__ */ React55.createElement(KeypressListener, {
    key,
    keyCode: key,
    handler: handleCallback(nextURL ? clickPaginationLink("nextURL", node) : nextHandler)
  }));
  if (type === "table") {
    let labelMarkup2 = label ? /* @__PURE__ */ React55.createElement(Box, {
      padding: "300",
      paddingBlockStart: "0",
      paddingBlockEnd: "0"
    }, /* @__PURE__ */ React55.createElement(Text, {
      as: "span",
      variant: "bodySm",
      fontWeight: "medium"
    }, label)) : null;
    return /* @__PURE__ */ React55.createElement("nav", {
      "aria-label": navLabel,
      ref: node,
      className: classNames(styles30.Pagination, styles30.table)
    }, previousButtonEvents, nextButtonEvents, /* @__PURE__ */ React55.createElement(Box, {
      background: "bg-surface-secondary",
      paddingBlockStart: "150",
      paddingBlockEnd: "150",
      paddingInlineStart: "300",
      paddingInlineEnd: "200"
    }, /* @__PURE__ */ React55.createElement(InlineStack, {
      align: "center",
      blockAlign: "center"
    }, /* @__PURE__ */ React55.createElement("div", {
      className: styles30.TablePaginationActions,
      "data-buttongroup-variant": "segmented"
    }, /* @__PURE__ */ React55.createElement("div", null, constructedPrevious), labelMarkup2, /* @__PURE__ */ React55.createElement("div", null, constructedNext)))));
  }
  let labelTextMarkup = hasNext && hasPrevious ? /* @__PURE__ */ React55.createElement("span", null, label) : /* @__PURE__ */ React55.createElement(Text, {
    tone: "subdued",
    as: "span"
  }, label), labelMarkup = label ? /* @__PURE__ */ React55.createElement(Box, {
    padding: "300",
    paddingBlockStart: "0",
    paddingBlockEnd: "0"
  }, /* @__PURE__ */ React55.createElement("div", {
    "aria-live": "polite"
  }, labelTextMarkup)) : null;
  return /* @__PURE__ */ React55.createElement("nav", {
    "aria-label": navLabel,
    ref: node,
    className: styles30.Pagination
  }, previousButtonEvents, nextButtonEvents, /* @__PURE__ */ React55.createElement(ButtonGroup, {
    variant: "segmented"
  }, constructedPrevious, labelMarkup, constructedNext));
}
function clickPaginationLink(id, node) {
  return () => {
    if (node.current == null)
      return;
    let link = node.current.querySelector(`#${id}`);
    link && link.click();
  };
}
function handleCallback(fn) {
  return () => {
    isInputFocused() || fn();
  };
}
function noop4() {
}

// node_modules/@shopify/polaris/build/esm/components/FormLayout/FormLayout.js
import React58, { memo as memo2, Children as Children5 } from "react";

// node_modules/@shopify/polaris/build/esm/components/FormLayout/components/Group/Group.js
import React57, { useId as useId6, Children as Children4 } from "react";

// node_modules/@shopify/polaris/build/esm/components/FormLayout/components/Item/Item.js
import React56 from "react";

// node_modules/@shopify/polaris/build/esm/components/FormLayout/FormLayout.css.js
var styles31 = {
  Item: "Polaris-FormLayout__Item",
  grouped: "Polaris-FormLayout--grouped",
  condensed: "Polaris-FormLayout--condensed"
};

// node_modules/@shopify/polaris/build/esm/components/FormLayout/components/Item/Item.js
function Item4({
  children,
  condensed = !1
}) {
  let className = classNames(styles31.Item, condensed ? styles31.condensed : styles31.grouped);
  return children ? /* @__PURE__ */ React56.createElement("div", {
    className
  }, children) : null;
}

// node_modules/@shopify/polaris/build/esm/components/FormLayout/components/Group/Group.js
function Group({
  children,
  condensed,
  title,
  helpText
}) {
  let id = useId6(), helpTextElement = null, helpTextId, titleElement = null, titleId;
  helpText && (helpTextId = `${id}HelpText`, helpTextElement = /* @__PURE__ */ React57.createElement(Box, {
    id: helpTextId,
    color: "text-secondary"
  }, helpText)), title && (titleId = `${id}Title`, titleElement = /* @__PURE__ */ React57.createElement(Text, {
    id: titleId,
    as: "p"
  }, title));
  let itemsMarkup = Children4.map(children, (child) => wrapWithComponent(child, Item4, {
    condensed
  }));
  return /* @__PURE__ */ React57.createElement(BlockStack, {
    role: "group",
    gap: "200",
    "aria-labelledby": titleId,
    "aria-describedby": helpTextId
  }, titleElement, /* @__PURE__ */ React57.createElement(InlineStack, {
    gap: "300"
  }, itemsMarkup), helpTextElement);
}

// node_modules/@shopify/polaris/build/esm/components/FormLayout/FormLayout.js
var FormLayout = /* @__PURE__ */ memo2(function({
  children
}) {
  return /* @__PURE__ */ React58.createElement(BlockStack, {
    gap: "400"
  }, Children5.map(children, wrapChildren));
});
FormLayout.Group = Group;
function wrapChildren(child, index) {
  return isElementOfType(child, Group) ? child : wrapWithComponent(child, Item4, {
    key: index
  });
}

// node_modules/@shopify/polaris/build/esm/utilities/media-query/hooks.js
import { useContext as useContext9 } from "react";
function useMediaQuery() {
  let mediaQuery = useContext9(MediaQueryContext);
  if (!mediaQuery)
    throw new Error("No mediaQuery was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  return mediaQuery;
}

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.js
import React62 from "react";

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.css.js
var styles32 = {
  Layout: "Polaris-Layout",
  Section: "Polaris-Layout__Section",
  "Section-fullWidth": "Polaris-Layout__Section--fullWidth",
  "Section-oneHalf": "Polaris-Layout__Section--oneHalf",
  "Section-oneThird": "Polaris-Layout__Section--oneThird",
  AnnotatedSection: "Polaris-Layout__AnnotatedSection",
  AnnotationWrapper: "Polaris-Layout__AnnotationWrapper",
  AnnotationContent: "Polaris-Layout__AnnotationContent",
  Annotation: "Polaris-Layout__Annotation"
};

// node_modules/@shopify/polaris/build/esm/components/Layout/components/AnnotatedSection/AnnotatedSection.js
import React60 from "react";

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.js
import React59 from "react";

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.css.js
var styles33 = {
  TextContainer: "Polaris-TextContainer",
  spacingTight: "Polaris-TextContainer--spacingTight",
  spacingLoose: "Polaris-TextContainer--spacingLoose"
};

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.js
function TextContainer({
  spacing,
  children
}) {
  let className = classNames(styles33.TextContainer, spacing && styles33[variationName("spacing", spacing)]);
  return /* @__PURE__ */ React59.createElement("div", {
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/Layout/components/AnnotatedSection/AnnotatedSection.js
function AnnotatedSection({
  children,
  title,
  description,
  id
}) {
  let descriptionMarkup = typeof description == "string" ? /* @__PURE__ */ React60.createElement(Text, {
    as: "p",
    variant: "bodyMd"
  }, description) : description;
  return /* @__PURE__ */ React60.createElement("div", {
    className: styles32.AnnotatedSection
  }, /* @__PURE__ */ React60.createElement("div", {
    className: styles32.AnnotationWrapper
  }, /* @__PURE__ */ React60.createElement("div", {
    className: styles32.Annotation
  }, /* @__PURE__ */ React60.createElement(TextContainer, {
    spacing: "tight"
  }, /* @__PURE__ */ React60.createElement(Text, {
    id,
    variant: "headingMd",
    as: "h2"
  }, title), descriptionMarkup && /* @__PURE__ */ React60.createElement(Box, {
    color: "text-secondary"
  }, descriptionMarkup))), /* @__PURE__ */ React60.createElement("div", {
    className: styles32.AnnotationContent
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/components/Layout/components/Section/Section.js
import React61 from "react";
function Section3({
  children,
  variant
}) {
  let className = classNames(styles32.Section, styles32[`Section-${variant}`]);
  return /* @__PURE__ */ React61.createElement("div", {
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.js
var Layout = function({
  sectioned,
  children
}) {
  let content = sectioned ? /* @__PURE__ */ React62.createElement(Section3, null, children) : children;
  return /* @__PURE__ */ React62.createElement("div", {
    className: styles32.Layout
  }, content);
};
Layout.AnnotatedSection = AnnotatedSection;
Layout.Section = Section3;

// node_modules/@shopify/polaris/build/esm/components/Link/Link.js
import React63 from "react";

// node_modules/@shopify/polaris/build/esm/components/Link/Link.css.js
var styles34 = {
  Link: "Polaris-Link",
  monochrome: "Polaris-Link--monochrome",
  removeUnderline: "Polaris-Link--removeUnderline"
};

// node_modules/@shopify/polaris/build/esm/components/Link/Link.js
function Link({
  url,
  children,
  onClick,
  external,
  target,
  id,
  monochrome,
  removeUnderline,
  accessibilityLabel,
  dataPrimaryLink
}) {
  return /* @__PURE__ */ React63.createElement(BannerContext.Consumer, null, (BannerContext2) => {
    let shouldBeMonochrome = monochrome || BannerContext2, className = classNames(styles34.Link, shouldBeMonochrome && styles34.monochrome, removeUnderline && styles34.removeUnderline);
    return url ? /* @__PURE__ */ React63.createElement(UnstyledLink, {
      onClick,
      className,
      url,
      external,
      target,
      id,
      "aria-label": accessibilityLabel,
      "data-primary-link": dataPrimaryLink
    }, children) : /* @__PURE__ */ React63.createElement("button", {
      type: "button",
      onClick,
      className,
      id,
      "aria-label": accessibilityLabel,
      "data-primary-link": dataPrimaryLink
    }, children);
  });
}

// node_modules/@shopify/polaris/build/esm/components/List/List.js
import React65 from "react";

// node_modules/@shopify/polaris/build/esm/components/List/List.css.js
var styles35 = {
  List: "Polaris-List",
  typeNumber: "Polaris-List--typeNumber",
  Item: "Polaris-List__Item",
  spacingLoose: "Polaris-List--spacingLoose"
};

// node_modules/@shopify/polaris/build/esm/components/List/components/Item/Item.js
import React64 from "react";
function Item5({
  children
}) {
  return /* @__PURE__ */ React64.createElement("li", {
    className: styles35.Item
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/List/List.js
var List = function({
  children,
  gap = "loose",
  type = "bullet"
}) {
  let className = classNames(styles35.List, gap && styles35[variationName("spacing", gap)], type && styles35[variationName("type", type)]), ListElement = type === "bullet" ? "ul" : "ol";
  return /* @__PURE__ */ React65.createElement(ListElement, {
    className
  }, children);
};
List.Item = Item5;

// node_modules/@shopify/polaris/build/esm/components/Page/Page.js
import React68 from "react";

// node_modules/@shopify/polaris/build/esm/utilities/is-interface.js
import { isValidElement as isValidElement2 } from "react";
function isInterface(x) {
  return !/* @__PURE__ */ isValidElement2(x) && x !== void 0;
}

// node_modules/@shopify/polaris/build/esm/utilities/is-react-element.js
import { isValidElement as isValidElement3 } from "react";
function isReactElement(x) {
  return /* @__PURE__ */ isValidElement3(x) && x !== void 0;
}

// node_modules/@shopify/polaris/build/esm/components/Page/Page.css.js
var styles36 = {
  Page: "Polaris-Page",
  fullWidth: "Polaris-Page--fullWidth",
  narrowWidth: "Polaris-Page--narrowWidth",
  Content: "Polaris-Page__Content"
};

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.js
import React67 from "react";

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.css.js
var styles37 = {
  TitleWrapper: "Polaris-Page-Header__TitleWrapper",
  TitleWrapperExpand: "Polaris-Page-Header__TitleWrapperExpand",
  BreadcrumbWrapper: "Polaris-Page-Header__BreadcrumbWrapper",
  PaginationWrapper: "Polaris-Page-Header__PaginationWrapper",
  PrimaryActionWrapper: "Polaris-Page-Header__PrimaryActionWrapper",
  Row: "Polaris-Page-Header__Row",
  mobileView: "Polaris-Page-Header--mobileView",
  RightAlign: "Polaris-Page-Header__RightAlign",
  noBreadcrumbs: "Polaris-Page-Header--noBreadcrumbs",
  AdditionalMetaData: "Polaris-Page-Header__AdditionalMetaData",
  Actions: "Polaris-Page-Header__Actions",
  longTitle: "Polaris-Page-Header--longTitle",
  mediumTitle: "Polaris-Page-Header--mediumTitle",
  isSingleRow: "Polaris-Page-Header--isSingleRow"
};

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.js
import React66 from "react";

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.css.js
var styles38 = {
  Title: "Polaris-Header-Title",
  TitleWithSubtitle: "Polaris-Header-Title__TitleWithSubtitle",
  TitleWrapper: "Polaris-Header-Title__TitleWrapper",
  SubTitle: "Polaris-Header-Title__SubTitle",
  SubtitleCompact: "Polaris-Header-Title__SubtitleCompact",
  SubtitleMaxWidth: "Polaris-Header-Title__SubtitleMaxWidth"
};

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.js
function Title({
  title,
  subtitle,
  titleMetadata,
  compactTitle,
  hasSubtitleMaxWidth
}) {
  let className = classNames(styles38.Title, subtitle && styles38.TitleWithSubtitle), titleMarkup = title ? /* @__PURE__ */ React66.createElement("h1", {
    className
  }, /* @__PURE__ */ React66.createElement(Text, {
    as: "span",
    variant: "headingLg",
    fontWeight: "bold"
  }, title)) : null, titleMetadataMarkup = titleMetadata ? /* @__PURE__ */ React66.createElement(Bleed, {
    marginBlock: "100"
  }, titleMetadata) : null, wrappedTitleMarkup = /* @__PURE__ */ React66.createElement("div", {
    className: styles38.TitleWrapper
  }, titleMarkup, titleMetadataMarkup), subtitleMarkup = subtitle ? /* @__PURE__ */ React66.createElement("div", {
    className: classNames(styles38.SubTitle, compactTitle && styles38.SubtitleCompact, hasSubtitleMaxWidth && styles38.SubtitleMaxWidth)
  }, /* @__PURE__ */ React66.createElement(Text, {
    as: "p",
    variant: "bodySm",
    tone: "subdued"
  }, subtitle)) : null;
  return /* @__PURE__ */ React66.createElement(React66.Fragment, null, wrappedTitleMarkup, subtitleMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.js
var SHORT_TITLE = 20, REALLY_SHORT_TITLE = 8, LONG_TITLE = 34;
function Header({
  title,
  subtitle,
  pageReadyAccessibilityLabel,
  titleMetadata,
  additionalMetadata,
  titleHidden = !1,
  primaryAction,
  pagination,
  filterActions,
  backAction,
  secondaryActions = [],
  actionGroups = [],
  compactTitle = !1,
  onActionRollup
}) {
  let i18n = useI18n(), {
    isNavigationCollapsed
  } = useMediaQuery(), isSingleRow = !primaryAction && !pagination && (isInterface(secondaryActions) && !secondaryActions.length || isReactElement(secondaryActions)) && !actionGroups.length, hasActionGroupsOrSecondaryActions = actionGroups.length > 0 || isInterface(secondaryActions) && secondaryActions.length > 0 || isReactElement(secondaryActions), breadcrumbMarkup = backAction ? /* @__PURE__ */ React67.createElement("div", {
    className: styles37.BreadcrumbWrapper
  }, /* @__PURE__ */ React67.createElement(Box, {
    maxWidth: "100%",
    paddingInlineEnd: "100",
    printHidden: !0
  }, /* @__PURE__ */ React67.createElement(Breadcrumbs, {
    backAction
  }))) : null, paginationMarkup = pagination && !isNavigationCollapsed ? /* @__PURE__ */ React67.createElement("div", {
    className: styles37.PaginationWrapper
  }, /* @__PURE__ */ React67.createElement(Box, {
    printHidden: !0
  }, /* @__PURE__ */ React67.createElement(Pagination, Object.assign({}, pagination, {
    hasPrevious: pagination.hasPrevious,
    hasNext: pagination.hasNext
  })))) : null, pageTitleMarkup = /* @__PURE__ */ React67.createElement("div", {
    className: classNames(styles37.TitleWrapper, !hasActionGroupsOrSecondaryActions && styles37.TitleWrapperExpand)
  }, /* @__PURE__ */ React67.createElement(Title, {
    title,
    subtitle,
    titleMetadata,
    compactTitle,
    hasSubtitleMaxWidth: hasActionGroupsOrSecondaryActions
  })), labelForPageReadyAccessibilityLabel = pageReadyAccessibilityLabel || title, pageReadyAccessibilityLabelMarkup = labelForPageReadyAccessibilityLabel ? /* @__PURE__ */ React67.createElement("div", {
    role: "status"
  }, /* @__PURE__ */ React67.createElement(Text, {
    visuallyHidden: !0,
    as: "p"
  }, i18n.translate("Polaris.Page.Header.pageReadyAccessibilityLabel", {
    title: labelForPageReadyAccessibilityLabel
  }))) : void 0, primaryActionMarkup = primaryAction ? /* @__PURE__ */ React67.createElement(PrimaryActionMarkup, {
    primaryAction
  }) : null, actionMenuMarkup = null;
  isInterface(secondaryActions) && (secondaryActions.length > 0 || hasGroupsWithActions(actionGroups)) ? actionMenuMarkup = /* @__PURE__ */ React67.createElement(ActionMenu, {
    actions: secondaryActions,
    groups: actionGroups,
    rollup: isNavigationCollapsed,
    rollupActionsLabel: title ? i18n.translate("Polaris.Page.Header.rollupActionsLabel", {
      title
    }) : void 0,
    onActionRollup
  }) : isReactElement(secondaryActions) && (actionMenuMarkup = /* @__PURE__ */ React67.createElement(React67.Fragment, null, secondaryActions));
  let navigationMarkup = breadcrumbMarkup || paginationMarkup ? /* @__PURE__ */ React67.createElement(Box, {
    printHidden: !0,
    paddingBlockEnd: "100",
    paddingInlineEnd: actionMenuMarkup && isNavigationCollapsed ? "1000" : void 0
  }, /* @__PURE__ */ React67.createElement(InlineStack, {
    gap: "400",
    align: "space-between",
    blockAlign: "center"
  }, breadcrumbMarkup, paginationMarkup)) : null, additionalMetadataMarkup = additionalMetadata ? /* @__PURE__ */ React67.createElement("div", {
    className: styles37.AdditionalMetaData
  }, /* @__PURE__ */ React67.createElement(Text, {
    tone: "subdued",
    as: "span",
    variant: "bodySm"
  }, additionalMetadata)) : null, headerClassNames = classNames(isSingleRow && styles37.isSingleRow, navigationMarkup && styles37.hasNavigation, actionMenuMarkup && styles37.hasActionMenu, isNavigationCollapsed && styles37.mobileView, !backAction && styles37.noBreadcrumbs, title && title.length < LONG_TITLE && styles37.mediumTitle, title && title.length > LONG_TITLE && styles37.longTitle), {
    slot1,
    slot2,
    slot3,
    slot4,
    slot5
  } = determineLayout({
    actionMenuMarkup,
    additionalMetadataMarkup,
    breadcrumbMarkup,
    isNavigationCollapsed,
    pageTitleMarkup,
    paginationMarkup,
    primaryActionMarkup,
    title
  });
  return /* @__PURE__ */ React67.createElement(Box, {
    position: "relative",
    paddingBlockStart: {
      xs: "400",
      md: "600"
    },
    paddingBlockEnd: {
      xs: "400",
      md: "600"
    },
    paddingInlineStart: {
      xs: "400",
      sm: "0"
    },
    paddingInlineEnd: {
      xs: "400",
      sm: "0"
    },
    visuallyHidden: titleHidden
  }, pageReadyAccessibilityLabelMarkup, /* @__PURE__ */ React67.createElement("div", {
    className: headerClassNames
  }, /* @__PURE__ */ React67.createElement(FilterActionsProvider, {
    filterActions: Boolean(filterActions)
  }, /* @__PURE__ */ React67.createElement(ConditionalRender, {
    condition: [slot1, slot2, slot3, slot4].some(notNull)
  }, /* @__PURE__ */ React67.createElement("div", {
    className: styles37.Row
  }, slot1, slot2, /* @__PURE__ */ React67.createElement(ConditionalRender, {
    condition: [slot3, slot4].some(notNull)
  }, /* @__PURE__ */ React67.createElement("div", {
    className: styles37.RightAlign
  }, /* @__PURE__ */ React67.createElement(ConditionalWrapper, {
    condition: [slot3, slot4].every(notNull),
    wrapper: (children) => /* @__PURE__ */ React67.createElement("div", {
      className: styles37.Actions
    }, children)
  }, slot3, slot4))))), /* @__PURE__ */ React67.createElement(ConditionalRender, {
    condition: [slot5].some(notNull)
  }, /* @__PURE__ */ React67.createElement("div", {
    className: styles37.Row
  }, /* @__PURE__ */ React67.createElement(InlineStack, {
    gap: "400"
  }, slot5))))));
}
function PrimaryActionMarkup({
  primaryAction
}) {
  let {
    isNavigationCollapsed
  } = useMediaQuery(), actionMarkup;
  if (isInterface(primaryAction)) {
    let {
      primary: isPrimary,
      helpText
    } = primaryAction, primary = isPrimary === void 0 ? !0 : isPrimary, content = buttonFrom(shouldShowIconOnly(isNavigationCollapsed, primaryAction), {
      variant: primary ? "primary" : void 0
    });
    actionMarkup = helpText ? /* @__PURE__ */ React67.createElement(Tooltip, {
      content: helpText
    }, content) : content;
  } else
    actionMarkup = primaryAction;
  return /* @__PURE__ */ React67.createElement("div", {
    className: styles37.PrimaryActionWrapper
  }, /* @__PURE__ */ React67.createElement(Box, {
    printHidden: !0
  }, actionMarkup));
}
function shouldShowIconOnly(isMobile, action5) {
  let {
    content,
    accessibilityLabel
  } = action5, {
    icon
  } = action5;
  return icon == null ? {
    ...action5,
    icon: void 0
  } : (isMobile && (accessibilityLabel = accessibilityLabel || content, content = void 0), {
    ...action5,
    content,
    accessibilityLabel,
    icon
  });
}
function notNull(value) {
  return value != null;
}
function determineLayout({
  actionMenuMarkup,
  additionalMetadataMarkup,
  breadcrumbMarkup,
  isNavigationCollapsed,
  pageTitleMarkup,
  paginationMarkup,
  primaryActionMarkup,
  title
}) {
  let layouts = {
    mobileCompact: {
      slots: {
        slot1: null,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: isNavigationCollapsed && breadcrumbMarkup == null && title != null && title.length <= REALLY_SHORT_TITLE
    },
    mobileDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: isNavigationCollapsed
    },
    desktopCompact: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: !isNavigationCollapsed && paginationMarkup == null && actionMenuMarkup == null && title != null && title.length <= SHORT_TITLE
    },
    desktopDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: /* @__PURE__ */ React67.createElement(React67.Fragment, null, actionMenuMarkup, primaryActionMarkup),
        slot4: paginationMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: !isNavigationCollapsed
    }
  };
  return (Object.values(layouts).find((layout2) => layout2.condition) || layouts.desktopDefault).slots;
}

// node_modules/@shopify/polaris/build/esm/components/Page/Page.js
function Page({
  children,
  fullWidth,
  narrowWidth,
  ...rest
}) {
  let pageClassName = classNames(styles36.Page, fullWidth && styles36.fullWidth, narrowWidth && styles36.narrowWidth), hasHeaderContent = rest.title != null && rest.title !== "" || rest.subtitle != null && rest.subtitle !== "" || rest.primaryAction != null || rest.secondaryActions != null && (isInterface(rest.secondaryActions) && rest.secondaryActions.length > 0 || isReactElement(rest.secondaryActions)) || rest.actionGroups != null && rest.actionGroups.length > 0 || rest.backAction != null, contentClassName = classNames(!hasHeaderContent && styles36.Content), headerMarkup = hasHeaderContent ? /* @__PURE__ */ React68.createElement(Header, Object.assign({
    filterActions: !0
  }, rest)) : null;
  return /* @__PURE__ */ React68.createElement("div", {
    className: pageClassName
  }, headerMarkup, /* @__PURE__ */ React68.createElement("div", {
    className: contentClassName
  }, children));
}

// app/root.jsx
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { PrismaClient as PrismaClient2 } from "@prisma/client";
import { useState as useState14, useEffect as useEffect15 } from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var prisma2 = new PrismaClient2(), links = () => [
  { rel: "stylesheet", href: polarisStyles },
  { rel: "stylesheet", href: "./custom/admin-style.css" }
], loader = async () => {
  let fetchDiamondsFromDB = await prisma2.diamond.findMany(), colorSetting = await prisma2.colorsetting.findFirst();
  return colorSetting || (colorSetting = await prisma2.colorsetting.create({
    data: { color: "#ffffff" }
  })), json({
    products: fetchDiamondsFromDB,
    color: colorSetting.color,
    message: `Total diamonds in database: ${fetchDiamondsFromDB.length}`,
    syncCount: null
  });
};
function App() {
  let loaderData = useLoaderData(), fetcher = useFetcher(), revalidator = useRevalidator(), [isSyncing, setIsSyncing] = useState14(!1), [syncMessage, setSyncMessage] = useState14(null), { products, message, color, syncCount } = loaderData || {
    products: [],
    message: "Loading...",
    color: "#ffffff",
    syncCount: null
  };
  useEffect15(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setIsSyncing(!1), setSyncMessage(fetcher.data.message), fetcher.data.success && revalidator.revalidate();
      let timer = setTimeout(() => setSyncMessage(null), 5e3);
      return () => clearTimeout(timer);
    }
  }, [fetcher.state, fetcher.data, revalidator]);
  let handleSync = () => {
    setIsSyncing(!0), setSyncMessage("Syncing diamonds..."), fetcher.submit(
      { sync: "true" },
      { method: "post", action: "/api/sync" }
    );
  };
  return !products || !Array.isArray(products) ? /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx2("div", { children: "Error: Products data is not available" }),
      /* @__PURE__ */ jsx2(Scripts, {})
    ] })
  ] }) : /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx2("link", { rel: "preconnect", href: "https://cdn.shopify.com/" }),
      /* @__PURE__ */ jsx2(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        }
      ),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx2(AppProvider2, { children: /* @__PURE__ */ jsx2("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "admin_dash", children: [
        /* @__PURE__ */ jsx2("h1", { className: "title", children: "Diamonds Management" }),
        /* @__PURE__ */ jsx2(Card, { children: /* @__PURE__ */ jsx2(BlockStack, { gap: "300", children: /* @__PURE__ */ jsxs(InlineStack, { align: "space-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx2("h2", { children: "Database Status" }),
            /* @__PURE__ */ jsx2("p", { className: "text", children: message }),
            syncMessage && /* @__PURE__ */ jsx2(Text, { as: "p", variant: "bodyMd", color: fetcher.data?.success ? "success" : "critical", children: syncMessage })
          ] }),
          /* @__PURE__ */ jsx2(
            Button,
            {
              onClick: handleSync,
              disabled: isSyncing,
              variant: "primary",
              children: isSyncing ? "Syncing..." : "Sync Diamonds"
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsx2(Outlet, {})
      ] }) }) }),
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {})
    ] })
  ] });
}
function ErrorBoundary() {
  let error = useRouteError();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx2("h2", { children: "Something went wrong" }),
    /* @__PURE__ */ jsx2("pre", { children: error.message })
  ] });
}
var headers = (headersArgs) => boundary.headers(headersArgs);

// app/routes/app.additional.jsx
var app_additional_exports = {};
__export(app_additional_exports, {
  default: () => AdditionalPage
});
import { TitleBar } from "@shopify/app-bridge-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function AdditionalPage() {
  return /* @__PURE__ */ jsxs2(Page, { children: [
    /* @__PURE__ */ jsx3(TitleBar, { title: "Additional page" }),
    /* @__PURE__ */ jsxs2(Layout, { children: [
      /* @__PURE__ */ jsx3(Layout.Section, { children: /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ jsxs2(Text, { as: "p", variant: "bodyMd", children: [
          "The app template comes with an additional page which demonstrates how to create multiple pages within app navigation using",
          " ",
          /* @__PURE__ */ jsx3(
            Link,
            {
              url: "https://shopify.dev/docs/apps/tools/app-bridge",
              target: "_blank",
              removeUnderline: !0,
              children: "App Bridge"
            }
          ),
          "."
        ] }),
        /* @__PURE__ */ jsxs2(Text, { as: "p", variant: "bodyMd", children: [
          "To create your own page and have it show up in the app navigation, add a page inside ",
          /* @__PURE__ */ jsx3(Code, { children: "app/routes" }),
          ", and a link to it in the ",
          /* @__PURE__ */ jsx3(Code, { children: "<NavMenu>" }),
          " component found in ",
          /* @__PURE__ */ jsx3(Code, { children: "app/routes/app.jsx" }),
          "."
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx3(Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(BlockStack, { gap: "200", children: [
        /* @__PURE__ */ jsx3(Text, { as: "h2", variant: "headingMd", children: "Resources" }),
        /* @__PURE__ */ jsx3(List, { children: /* @__PURE__ */ jsx3(List.Item, { children: /* @__PURE__ */ jsx3(
          Link,
          {
            url: "https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav",
            target: "_blank",
            removeUnderline: !0,
            children: "App nav best practices"
          }
        ) }) })
      ] }) }) })
    ] })
  ] });
}
function Code({ children }) {
  return /* @__PURE__ */ jsx3(
    Box,
    {
      as: "span",
      padding: "025",
      paddingInlineStart: "100",
      paddingInlineEnd: "100",
      background: "bg-surface-active",
      borderWidth: "025",
      borderColor: "border",
      borderRadius: "100",
      children: /* @__PURE__ */ jsx3("code", { children })
    }
  );
}

// app/routes/app._index.jsx
var app_index_exports = {};
__export(app_index_exports, {
  action: () => action,
  default: () => Index,
  loader: () => loader2
});
import { useEffect as useEffect16 } from "react";
import { json as json2 } from "@remix-run/node";
import { useFetcher as useFetcher2 } from "@remix-run/react";
import { TitleBar as TitleBar2, useAppBridge } from "@shopify/app-bridge-react";
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var loader2 = async ({ request }) => (await authenticate.admin(request), null), action = async ({ request }) => {
  let { admin } = await authenticate.admin(request), color = ["Red", "Orange", "Yellow", "Green"][Math.floor(Math.random() * 4)], responseJson = await (await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`
        }
      }
    }
  )).json(), product = responseJson.data.productCreate.product, variantId = product.variants.edges[0].node.id, variantResponseJson = await (await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }]
      }
    }
  )).json();
  return json2({
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants
  });
};
function Index() {
  let fetcher = useFetcher2(), shopify2 = useAppBridge(), isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST", productId = fetcher.data?.product?.id.replace(
    "gid://shopify/Product/",
    ""
  );
  useEffect16(() => {
    productId && shopify2.toast.show("Product created");
  }, [productId, shopify2]);
  let generateProduct = () => fetcher.submit({}, { method: "POST" });
  return /* @__PURE__ */ jsxs3(Page, { children: [
    /* @__PURE__ */ jsx4(TitleBar2, { title: "Remix app template", children: /* @__PURE__ */ jsx4("button", { variant: "primary", onClick: generateProduct, children: "Generate a product" }) }),
    /* @__PURE__ */ jsx4(BlockStack, { gap: "500", children: /* @__PURE__ */ jsxs3(Layout, { children: [
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { gap: "500", children: [
        /* @__PURE__ */ jsxs3(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text, { as: "h2", variant: "headingMd", children: "Congrats on creating a new Shopify app \u{1F389}" }),
          /* @__PURE__ */ jsxs3(Text, { variant: "bodyMd", as: "p", children: [
            "This embedded app template uses",
            " ",
            /* @__PURE__ */ jsx4(
              Link,
              {
                url: "https://shopify.dev/docs/apps/tools/app-bridge",
                target: "_blank",
                removeUnderline: !0,
                children: "App Bridge"
              }
            ),
            " ",
            "interface examples like an",
            " ",
            /* @__PURE__ */ jsx4(Link, { url: "/app/additional", removeUnderline: !0, children: "additional page in the app nav" }),
            ", as well as an",
            " ",
            /* @__PURE__ */ jsx4(
              Link,
              {
                url: "https://shopify.dev/docs/api/admin-graphql",
                target: "_blank",
                removeUnderline: !0,
                children: "Admin GraphQL"
              }
            ),
            " ",
            "mutation demo, to provide a starting point for app development."
          ] })
        ] }),
        /* @__PURE__ */ jsxs3(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text, { as: "h3", variant: "headingMd", children: "Get started with products" }),
          /* @__PURE__ */ jsxs3(Text, { as: "p", variant: "bodyMd", children: [
            "Generate a product with GraphQL and get the JSON output for that product. Learn more about the",
            " ",
            /* @__PURE__ */ jsx4(
              Link,
              {
                url: "https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate",
                target: "_blank",
                removeUnderline: !0,
                children: "productCreate"
              }
            ),
            " ",
            "mutation in our API references."
          ] })
        ] }),
        /* @__PURE__ */ jsxs3(InlineStack, { gap: "300", children: [
          /* @__PURE__ */ jsx4(Button, { loading: isLoading, onClick: generateProduct, children: "Generate a product" }),
          fetcher.data?.product && /* @__PURE__ */ jsx4(
            Button,
            {
              url: `shopify:admin/products/${productId}`,
              target: "_blank",
              variant: "plain",
              children: "View product"
            }
          )
        ] }),
        fetcher.data?.product && /* @__PURE__ */ jsxs3(Fragment, { children: [
          /* @__PURE__ */ jsxs3(Text, { as: "h3", variant: "headingMd", children: [
            " ",
            "productCreate mutation"
          ] }),
          /* @__PURE__ */ jsx4(
            Box,
            {
              padding: "400",
              background: "bg-surface-active",
              borderWidth: "025",
              borderRadius: "200",
              borderColor: "border",
              overflowX: "scroll",
              children: /* @__PURE__ */ jsx4("pre", { style: { margin: 0 }, children: /* @__PURE__ */ jsx4("code", { children: JSON.stringify(fetcher.data.product, null, 2) }) })
            }
          ),
          /* @__PURE__ */ jsxs3(Text, { as: "h3", variant: "headingMd", children: [
            " ",
            "productVariantsBulkUpdate mutation"
          ] }),
          /* @__PURE__ */ jsx4(
            Box,
            {
              padding: "400",
              background: "bg-surface-active",
              borderWidth: "025",
              borderRadius: "200",
              borderColor: "border",
              overflowX: "scroll",
              children: /* @__PURE__ */ jsx4("pre", { style: { margin: 0 }, children: /* @__PURE__ */ jsx4("code", { children: JSON.stringify(fetcher.data.variant, null, 2) }) })
            }
          )
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ jsxs3(BlockStack, { gap: "500", children: [
        /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text, { as: "h2", variant: "headingMd", children: "App template specs" }),
          /* @__PURE__ */ jsxs3(BlockStack, { gap: "200", children: [
            /* @__PURE__ */ jsxs3(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text, { as: "span", variant: "bodyMd", children: "Framework" }),
              /* @__PURE__ */ jsx4(
                Link,
                {
                  url: "https://remix.run",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "Remix"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs3(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text, { as: "span", variant: "bodyMd", children: "Database" }),
              /* @__PURE__ */ jsx4(
                Link,
                {
                  url: "https://www.prisma.io/",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "Prisma"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs3(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text, { as: "span", variant: "bodyMd", children: "Interface" }),
              /* @__PURE__ */ jsxs3("span", { children: [
                /* @__PURE__ */ jsx4(
                  Link,
                  {
                    url: "https://polaris.shopify.com",
                    target: "_blank",
                    removeUnderline: !0,
                    children: "Polaris"
                  }
                ),
                ", ",
                /* @__PURE__ */ jsx4(
                  Link,
                  {
                    url: "https://shopify.dev/docs/apps/tools/app-bridge",
                    target: "_blank",
                    removeUnderline: !0,
                    children: "App Bridge"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs3(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text, { as: "span", variant: "bodyMd", children: "API" }),
              /* @__PURE__ */ jsx4(
                Link,
                {
                  url: "https://shopify.dev/docs/api/admin-graphql",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "GraphQL API"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text, { as: "h2", variant: "headingMd", children: "Next steps" }),
          /* @__PURE__ */ jsxs3(List, { children: [
            /* @__PURE__ */ jsxs3(List.Item, { children: [
              "Build an",
              " ",
              /* @__PURE__ */ jsxs3(
                Link,
                {
                  url: "https://shopify.dev/docs/apps/getting-started/build-app-example",
                  target: "_blank",
                  removeUnderline: !0,
                  children: [
                    " ",
                    "example app"
                  ]
                }
              ),
              " ",
              "to get started"
            ] }),
            /* @__PURE__ */ jsxs3(List.Item, { children: [
              "Explore Shopify\u2019s API with",
              " ",
              /* @__PURE__ */ jsx4(
                Link,
                {
                  url: "https://shopify.dev/docs/apps/tools/graphiql-admin-api",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "GraphiQL"
                }
              )
            ] })
          ] })
        ] }) })
      ] }) })
    ] }) })
  ] });
}

// app/routes/auth.login/route.jsx
var route_exports = {};
__export(route_exports, {
  action: () => action2,
  default: () => Auth,
  links: () => links2,
  loader: () => loader3
});
import { useState as useState15 } from "react";
import { json as json3 } from "@remix-run/node";
import { Form, useActionData, useLoaderData as useLoaderData2 } from "@remix-run/react";
import polarisTranslations from "@shopify/polaris/locales/en.json" assert { type: "json" };
import polarisStyles2 from "@shopify/polaris/build/esm/styles.css?url";

// app/routes/auth.login/error.server.jsx
import { LoginErrorType } from "@shopify/shopify-app-remix/server";
function loginErrorMessage(loginErrors) {
  return loginErrors?.shop === LoginErrorType.MissingShop ? { shop: "Please enter your shop domain to log in" } : loginErrors?.shop === LoginErrorType.InvalidShop ? { shop: "Please enter a valid shop domain to log in" } : {};
}

// app/routes/auth.login/route.jsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var links2 = () => [{ rel: "stylesheet", href: polarisStyles2 }], loader3 = async ({ request }) => {
  let errors = loginErrorMessage(await login(request));
  return json3({ errors, polarisTranslations });
}, action2 = async ({ request }) => {
  let errors = loginErrorMessage(await login(request));
  return json3({
    errors
  });
};
function Auth() {
  let loaderData = useLoaderData2(), actionData = useActionData(), [shop, setShop] = useState15(""), { errors } = actionData || loaderData;
  return /* @__PURE__ */ jsx5(AppProvider, { i18n: loaderData.polarisTranslations, children: /* @__PURE__ */ jsx5(Page, { children: /* @__PURE__ */ jsx5(Card, { children: /* @__PURE__ */ jsx5(Form, { method: "post", children: /* @__PURE__ */ jsxs4(FormLayout, { children: [
    /* @__PURE__ */ jsx5(Text, { variant: "headingMd", as: "h2", children: "Log in" }),
    /* @__PURE__ */ jsx5(
      TextField,
      {
        type: "text",
        name: "shop",
        label: "Shop domain",
        helpText: "example.myshopify.com",
        value: shop,
        onChange: setShop,
        autoComplete: "on",
        error: errors.shop
      }
    ),
    /* @__PURE__ */ jsx5(Button, { submit: !0, children: "Log in" })
  ] }) }) }) }) });
}

// app/routes/webhooks.jsx
var webhooks_exports = {};
__export(webhooks_exports, {
  action: () => action3
});
var action3 = async ({ request }) => {
  let { topic, shop, session, admin } = await authenticate.webhook(request), normalizedTopic = topic && topic.replace(/\//g, "_").toUpperCase();
  if (!admin && normalizedTopic !== "SHOP_REDACT")
    throw new Response();
  switch (normalizedTopic) {
    case "APP_UNINSTALLED":
      session && await db_server_default.session.deleteMany({ where: { shop } });
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }
  throw new Response();
};

// app/routes/auth.$.jsx
var auth_exports = {};
__export(auth_exports, {
  loader: () => loader4
});
var loader4 = async ({ request }) => (await authenticate.admin(request), null);

// app/routes/_index/route.jsx
var route_exports2 = {};
__export(route_exports2, {
  default: () => App2,
  loader: () => loader5
});
import { json as json4, redirect } from "@remix-run/node";
import { Form as Form2, useLoaderData as useLoaderData3 } from "@remix-run/react";

// app/routes/_index/styles.module.css
var styles_module_default = { index: "LQCYp", heading: "bVg-E", text: "_5LEJl", content: "IjJz7", form: "sI1Wg", label: "py2aZ", input: "k8y5b", button: "DcRe8", list: "qyGLW" };

// app/routes/_index/route.jsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var loader5 = async ({ request }) => {
  let url = new URL(request.url);
  if (url.searchParams.get("shop"))
    throw redirect(`/app?${url.searchParams.toString()}`);
  return json4({ showForm: Boolean(login) });
};
function App2() {
  let { showForm } = useLoaderData3();
  return /* @__PURE__ */ jsx6("div", { className: styles_module_default.index, children: /* @__PURE__ */ jsxs5("div", { className: styles_module_default.content, children: [
    /* @__PURE__ */ jsx6("h1", { className: styles_module_default.heading, children: "A short heading about [your app]" }),
    /* @__PURE__ */ jsx6("p", { className: styles_module_default.text, children: "A tagline about [your app] that describes your value proposition." }),
    showForm && /* @__PURE__ */ jsxs5(Form2, { className: styles_module_default.form, method: "post", action: "/auth/login", children: [
      /* @__PURE__ */ jsxs5("label", { className: styles_module_default.label, children: [
        /* @__PURE__ */ jsx6("span", { children: "Shop domain" }),
        /* @__PURE__ */ jsx6("input", { className: styles_module_default.input, type: "text", name: "shop" }),
        /* @__PURE__ */ jsx6("span", { children: "e.g: my-shop-domain.myshopify.com" })
      ] }),
      /* @__PURE__ */ jsx6("button", { className: styles_module_default.button, type: "submit", children: "Log in" })
    ] }),
    /* @__PURE__ */ jsxs5("ul", { className: styles_module_default.list, children: [
      /* @__PURE__ */ jsxs5("li", { children: [
        /* @__PURE__ */ jsx6("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] }),
      /* @__PURE__ */ jsxs5("li", { children: [
        /* @__PURE__ */ jsx6("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] }),
      /* @__PURE__ */ jsxs5("li", { children: [
        /* @__PURE__ */ jsx6("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] })
    ] })
  ] }) });
}

// app/routes/app.jsx
var app_exports = {};
__export(app_exports, {
  ErrorBoundary: () => ErrorBoundary2,
  action: () => action4,
  default: () => AppRoute,
  loader: () => loader6
});
import { json as json5 } from "@remix-run/node";
import { Link as Link3, useLoaderData as useLoaderData4, useActionData as useActionData2, Form as Form3 } from "@remix-run/react";
import { PrismaClient as PrismaClient3 } from "@prisma/client";
import { NavMenu } from "@shopify/app-bridge-react";
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var prisma3 = new PrismaClient3(), loader6 = async () => {
  try {
    let colorSetting = await prisma3.colorsetting.findFirst();
    return json5({
      color: colorSetting?.color || "#ffffff"
    });
  } catch (error) {
    return console.error("Loader error:", error), json5({ color: "#ffffff" });
  }
}, action4 = async ({ request }) => {
  try {
    let color = (await request.formData()).get("color") || "#ffffff";
    return await prisma3.colorsetting.upsert({
      where: { id: 1 },
      update: { color },
      create: { color }
    }), json5({
      message: "Color saved successfully!",
      color
    });
  } catch (error) {
    return console.error("Error saving color:", error), json5({ error: "Failed to save color" }, { status: 500 });
  }
};
function AppRoute() {
  let { color } = useLoaderData4(), actionData = useActionData2();
  return /* @__PURE__ */ jsxs6(Fragment2, { children: [
    /* @__PURE__ */ jsxs6(NavMenu, { children: [
      /* @__PURE__ */ jsx7(Link3, { to: "/app", rel: "home", children: "Home" }),
      /* @__PURE__ */ jsx7(Link3, { to: "/app/additional", children: "Additional page" })
    ] }),
    /* @__PURE__ */ jsx7("h2", { children: "Customize Appearance" }),
    /* @__PURE__ */ jsxs6(Form3, { method: "post", children: [
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx7("label", { htmlFor: "color", children: "Select Color: " }),
        /* @__PURE__ */ jsx7(
          "input",
          {
            type: "color",
            name: "color",
            id: "color",
            defaultValue: color,
            required: !0
          }
        )
      ] }),
      actionData?.error && /* @__PURE__ */ jsx7("div", { style: { color: "red" }, children: actionData.error }),
      actionData?.message && /* @__PURE__ */ jsx7("div", { style: { color: "green" }, children: actionData.message }),
      /* @__PURE__ */ jsx7("button", { type: "submit", children: "Save Color" })
    ] }),
    /* @__PURE__ */ jsxs6("div", { children: [
      /* @__PURE__ */ jsx7("p", { children: "Current Color:" }),
      /* @__PURE__ */ jsx7(
        "div",
        {
          style: {
            width: "50px",
            height: "50px",
            backgroundColor: actionData?.color || color,
            border: "1px solid #000"
          }
        }
      )
    ] })
  ] });
}
function ErrorBoundary2() {
  return /* @__PURE__ */ jsx7("div", { children: "Something went wrong in the app route!" });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-OCFFAO65.js", imports: ["/build/_shared/chunk-OPUZDJLF.js", "/build/_shared/chunk-TQC3RT7F.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-7K2K64IM.js", imports: ["/build/_shared/chunk-J47K56SK.js", "/build/_shared/chunk-ATGOYAQF.js", "/build/_shared/chunk-4NWZINHR.js", "/build/_shared/chunk-PGOH7JLP.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-XK2XWPF7.js", imports: ["/build/_shared/chunk-WK3XIJ7S.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app": { id: "routes/app", parentId: "root", path: "app", index: void 0, caseSensitive: void 0, module: "/build/routes/app-6VYENVK2.js", imports: ["/build/_shared/chunk-5LFJ7ZD4.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/app._index": { id: "routes/app._index", parentId: "routes/app", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/app._index-EDWXJX33.js", imports: ["/build/_shared/chunk-4NWZINHR.js", "/build/_shared/chunk-PGOH7JLP.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app.additional": { id: "routes/app.additional", parentId: "routes/app", path: "additional", index: void 0, caseSensitive: void 0, module: "/build/routes/app.additional-QNCY2FW7.js", imports: ["/build/_shared/chunk-4NWZINHR.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.$": { id: "routes/auth.$", parentId: "root", path: "auth/*", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.$-JID2MVQG.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.login": { id: "routes/auth.login", parentId: "root", path: "auth/login", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.login-3G7VFXPC.js", imports: ["/build/_shared/chunk-WK3XIJ7S.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/webhooks": { id: "routes/webhooks", parentId: "root", path: "webhooks", index: void 0, caseSensitive: void 0, module: "/build/routes/webhooks-U3VAOICH.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "9ab5c30e", hmr: void 0, url: "/build/manifest-9AB5C30E.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !0, v3_relativeSplatPath: !0, v3_throwAbortReason: !0, v3_routeConfig: !1, v3_singleFetch: !0, v3_lazyRouteDiscovery: !0, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/app.additional": {
    id: "routes/app.additional",
    parentId: "routes/app",
    path: "additional",
    index: void 0,
    caseSensitive: void 0,
    module: app_additional_exports
  },
  "routes/app._index": {
    id: "routes/app._index",
    parentId: "routes/app",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: app_index_exports
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: webhooks_exports
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: route_exports2
  },
  "routes/app": {
    id: "routes/app",
    parentId: "root",
    path: "app",
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
