import Se, { forwardRef as xe, useState as je, Children as fr, useEffect as j } from "react";
import cr from "react-dom";
var ee = { exports: {} }, L = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function dr() {
  if (Oe)
    return L;
  Oe = 1;
  var R = Se, v = Symbol.for("react.element"), y = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, C = R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, x = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(a, d, b) {
    var m, T = {}, w = null, E = null;
    b !== void 0 && (w = "" + b), d.key !== void 0 && (w = "" + d.key), d.ref !== void 0 && (E = d.ref);
    for (m in d)
      c.call(d, m) && !x.hasOwnProperty(m) && (T[m] = d[m]);
    if (a && a.defaultProps)
      for (m in d = a.defaultProps, d)
        T[m] === void 0 && (T[m] = d[m]);
    return { $$typeof: v, type: a, key: w, ref: E, props: T, _owner: C.current };
  }
  return L.Fragment = y, L.jsx = h, L.jsxs = h, L;
}
var $ = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pe;
function vr() {
  return Pe || (Pe = 1, process.env.NODE_ENV !== "production" && function() {
    var R = Se, v = Symbol.for("react.element"), y = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), a = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), E = Symbol.for("react.offscreen"), k = Symbol.iterator, W = "@@iterator";
    function Y(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = k && e[k] || e[W];
      return typeof r == "function" ? r : null;
    }
    var O = R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function p(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        ke("error", e, t);
      }
    }
    function ke(e, r, t) {
      {
        var n = O.ReactDebugCurrentFrame, u = n.getStackAddendum();
        u !== "" && (r += "%s", t = t.concat([u]));
        var s = t.map(function(o) {
          return String(o);
        });
        s.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var De = !1, Ae = !1, Fe = !1, Ie = !1, Ne = !1, te;
    te = Symbol.for("react.module.reference");
    function Le(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === c || e === x || Ne || e === C || e === b || e === m || Ie || e === E || De || Ae || Fe || typeof e == "object" && e !== null && (e.$$typeof === w || e.$$typeof === T || e.$$typeof === h || e.$$typeof === a || e.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === te || e.getModuleId !== void 0));
    }
    function $e(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var u = r.displayName || r.name || "";
      return u !== "" ? t + "(" + u + ")" : t;
    }
    function ne(e) {
      return e.displayName || "Context";
    }
    function P(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && p("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case c:
          return "Fragment";
        case y:
          return "Portal";
        case x:
          return "Profiler";
        case C:
          return "StrictMode";
        case b:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case a:
            var r = e;
            return ne(r) + ".Consumer";
          case h:
            var t = e;
            return ne(t._context) + ".Provider";
          case d:
            return $e(e, e.render, "ForwardRef");
          case T:
            var n = e.displayName || null;
            return n !== null ? n : P(e.type) || "Memo";
          case w: {
            var u = e, s = u._payload, o = u._init;
            try {
              return P(o(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, I = 0, ae, ie, oe, ue, se, le, fe;
    function ce() {
    }
    ce.__reactDisabledLog = !0;
    function We() {
      {
        if (I === 0) {
          ae = console.log, ie = console.info, oe = console.warn, ue = console.error, se = console.group, le = console.groupCollapsed, fe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ce,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        I++;
      }
    }
    function Ye() {
      {
        if (I--, I === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, e, {
              value: ae
            }),
            info: D({}, e, {
              value: ie
            }),
            warn: D({}, e, {
              value: oe
            }),
            error: D({}, e, {
              value: ue
            }),
            group: D({}, e, {
              value: se
            }),
            groupCollapsed: D({}, e, {
              value: le
            }),
            groupEnd: D({}, e, {
              value: fe
            })
          });
        }
        I < 0 && p("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var J = O.ReactCurrentDispatcher, G;
    function M(e, r, t) {
      {
        if (G === void 0)
          try {
            throw Error();
          } catch (u) {
            var n = u.stack.trim().match(/\n( *(at )?)/);
            G = n && n[1] || "";
          }
        return `
` + G + e;
      }
    }
    var z = !1, B;
    {
      var Me = typeof WeakMap == "function" ? WeakMap : Map;
      B = new Me();
    }
    function de(e, r) {
      if (!e || z)
        return "";
      {
        var t = B.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      z = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = J.current, J.current = null, We();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (S) {
              n = S;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (S) {
              n = S;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (S) {
            n = S;
          }
          e();
        }
      } catch (S) {
        if (S && n && typeof S.stack == "string") {
          for (var i = S.stack.split(`
`), g = n.stack.split(`
`), l = i.length - 1, f = g.length - 1; l >= 1 && f >= 0 && i[l] !== g[f]; )
            f--;
          for (; l >= 1 && f >= 0; l--, f--)
            if (i[l] !== g[f]) {
              if (l !== 1 || f !== 1)
                do
                  if (l--, f--, f < 0 || i[l] !== g[f]) {
                    var _ = `
` + i[l].replace(" at new ", " at ");
                    return e.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", e.displayName)), typeof e == "function" && B.set(e, _), _;
                  }
                while (l >= 1 && f >= 0);
              break;
            }
        }
      } finally {
        z = !1, J.current = s, Ye(), Error.prepareStackTrace = u;
      }
      var F = e ? e.displayName || e.name : "", we = F ? M(F) : "";
      return typeof e == "function" && B.set(e, we), we;
    }
    function Be(e, r, t) {
      return de(e, !1);
    }
    function Ve(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function V(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return de(e, Ve(e));
      if (typeof e == "string")
        return M(e);
      switch (e) {
        case b:
          return M("Suspense");
        case m:
          return M("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Be(e.render);
          case T:
            return V(e.type, r, t);
          case w: {
            var n = e, u = n._payload, s = n._init;
            try {
              return V(s(u), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var U = Object.prototype.hasOwnProperty, ve = {}, pe = O.ReactDebugCurrentFrame;
    function q(e) {
      if (e) {
        var r = e._owner, t = V(e.type, e._source, r ? r.type : null);
        pe.setExtraStackFrame(t);
      } else
        pe.setExtraStackFrame(null);
    }
    function Ue(e, r, t, n, u) {
      {
        var s = Function.call.bind(U);
        for (var o in e)
          if (s(e, o)) {
            var i = void 0;
            try {
              if (typeof e[o] != "function") {
                var g = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw g.name = "Invariant Violation", g;
              }
              i = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (l) {
              i = l;
            }
            i && !(i instanceof Error) && (q(u), p("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof i), q(null)), i instanceof Error && !(i.message in ve) && (ve[i.message] = !0, q(u), p("Failed %s type: %s", t, i.message), q(null));
          }
      }
    }
    var qe = Array.isArray;
    function K(e) {
      return qe(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ge(e) {
      try {
        return ye(e), !1;
      } catch {
        return !0;
      }
    }
    function ye(e) {
      return "" + e;
    }
    function he(e) {
      if (Ge(e))
        return p("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), ye(e);
    }
    var N = O.ReactCurrentOwner, ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, me, ge, X;
    X = {};
    function Ke(e) {
      if (U.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Xe(e) {
      if (U.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ze(e, r) {
      if (typeof e.ref == "string" && N.current && r && N.current.stateNode !== r) {
        var t = P(N.current.type);
        X[t] || (p('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', P(N.current.type), e.ref), X[t] = !0);
      }
    }
    function Qe(e, r) {
      {
        var t = function() {
          me || (me = !0, p("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function He(e, r) {
      {
        var t = function() {
          ge || (ge = !0, p("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var er = function(e, r, t, n, u, s, o) {
      var i = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: v,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: s
      };
      return i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(i, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(i, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function rr(e, r, t, n, u) {
      {
        var s, o = {}, i = null, g = null;
        t !== void 0 && (he(t), i = "" + t), Xe(r) && (he(r.key), i = "" + r.key), Ke(r) && (g = r.ref, Ze(r, u));
        for (s in r)
          U.call(r, s) && !ze.hasOwnProperty(s) && (o[s] = r[s]);
        if (e && e.defaultProps) {
          var l = e.defaultProps;
          for (s in l)
            o[s] === void 0 && (o[s] = l[s]);
        }
        if (i || g) {
          var f = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          i && Qe(o, f), g && He(o, f);
        }
        return er(e, i, g, u, n, N.current, o);
      }
    }
    var Z = O.ReactCurrentOwner, Ee = O.ReactDebugCurrentFrame;
    function A(e) {
      if (e) {
        var r = e._owner, t = V(e.type, e._source, r ? r.type : null);
        Ee.setExtraStackFrame(t);
      } else
        Ee.setExtraStackFrame(null);
    }
    var Q;
    Q = !1;
    function H(e) {
      return typeof e == "object" && e !== null && e.$$typeof === v;
    }
    function be() {
      {
        if (Z.current) {
          var e = P(Z.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function tr(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var _e = {};
    function nr(e) {
      {
        var r = be();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Re(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = nr(r);
        if (_e[t])
          return;
        _e[t] = !0;
        var n = "";
        e && e._owner && e._owner !== Z.current && (n = " It was passed a child from " + P(e._owner.type) + "."), A(e), p('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), A(null);
      }
    }
    function Te(e, r) {
      {
        if (typeof e != "object")
          return;
        if (K(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            H(n) && Re(n, r);
          }
        else if (H(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var u = Y(e);
          if (typeof u == "function" && u !== e.entries)
            for (var s = u.call(e), o; !(o = s.next()).done; )
              H(o.value) && Re(o.value, r);
        }
      }
    }
    function ar(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === T))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = P(r);
          Ue(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !Q) {
          Q = !0;
          var u = P(r);
          p("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", u || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && p("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ir(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            A(e), p("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), A(null);
            break;
          }
        }
        e.ref !== null && (A(e), p("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    function Ce(e, r, t, n, u, s) {
      {
        var o = Le(e);
        if (!o) {
          var i = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var g = tr(u);
          g ? i += g : i += be();
          var l;
          e === null ? l = "null" : K(e) ? l = "array" : e !== void 0 && e.$$typeof === v ? (l = "<" + (P(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : l = typeof e, p("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", l, i);
        }
        var f = rr(e, r, t, u, s);
        if (f == null)
          return f;
        if (o) {
          var _ = r.children;
          if (_ !== void 0)
            if (n)
              if (K(_)) {
                for (var F = 0; F < _.length; F++)
                  Te(_[F], e);
                Object.freeze && Object.freeze(_);
              } else
                p("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(_, e);
        }
        return e === c ? ir(f) : ar(f), f;
      }
    }
    function or(e, r, t) {
      return Ce(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Ce(e, r, t, !1);
    }
    var sr = ur, lr = or;
    $.Fragment = c, $.jsx = sr, $.jsxs = lr;
  }()), $;
}
process.env.NODE_ENV === "production" ? ee.exports = dr() : ee.exports = vr();
var re = ee.exports;
const pr = xe(function({ open: v, onShow: y, onHide: c, children: C, ...x }, h) {
  const [a, d] = je(), { titleBar: b, saveBar: m, modalContent: T } = fr.toArray(C).reduce(
    (E, k) => {
      const W = yr(k), Y = W === "ui-title-bar", O = W === "ui-save-bar";
      return !Y && !O && E.modalContent.push(k), {
        ...E,
        titleBar: Y ? k : E.titleBar,
        saveBar: O ? k : E.saveBar
      };
    },
    { modalContent: [] }
  ), w = a && a.content ? cr.createPortal(T, a.content) : null;
  return j(() => {
    a && (v ? a.show() : a.hide());
  }, [a, v]), j(() => {
    if (!(!a || !y))
      return a.addEventListener("show", y), () => {
        a.removeEventListener("show", y);
      };
  }, [a, y]), j(() => {
    if (!(!a || !c))
      return a.addEventListener("hide", c), () => {
        a.removeEventListener("hide", c);
      };
  }, [a, c]), j(() => {
    if (a)
      return () => {
        a.hide();
      };
  }, [a]), /* @__PURE__ */ re.jsxs(
    "ui-modal",
    {
      ...x,
      ref: (E) => {
        d(E), h && (typeof h == "function" ? h(E) : h.current = E);
      },
      children: [
        b,
        m,
        /* @__PURE__ */ re.jsx("div", { children: w })
      ]
    }
  );
});
pr.displayName = "ui-modal";
function yr(R) {
  if (!R)
    return;
  const v = typeof R == "object" && "type" in R ? R.type : void 0, y = typeof v == "string" ? v : void 0, c = typeof v == "object" ? v.displayName : void 0;
  return y || (typeof c == "string" ? c : void 0);
}
const br = "ui-nav-menu", _r = "ui-title-bar", hr = xe(function({ open: v, onShow: y, onHide: c, children: C, ...x }, h) {
  const [a, d] = je();
  return j(() => {
    a && (v ? a.show() : a.hide());
  }, [a, v]), j(() => {
    if (!(!a || !y))
      return a.addEventListener("show", y), () => {
        a.removeEventListener("show", y);
      };
  }, [a, y]), j(() => {
    if (!(!a || !c))
      return a.addEventListener("hide", c), () => {
        a.removeEventListener("hide", c);
      };
  }, [a, c]), j(() => {
    if (a)
      return () => {
        a.hide();
      };
  }, [a]), /* @__PURE__ */ re.jsx(
    "ui-save-bar",
    {
      ...x,
      ref: (b) => {
        d(b), h && (typeof h == "function" ? h(b) : h.current = b);
      },
      children: C
    }
  );
});
hr.displayName = "ui-save-bar";
const mr = new Proxy(
  {},
  {
    get(R, v) {
      throw Error(
        `shopify.${String(
          v
        )} can't be used in a server environment. You likely need to move this code into an Effect.`
      );
    }
  }
);
function Rr() {
  if (typeof window > "u")
    return mr;
  if (!window.shopify)
    throw Error(
      "The shopify global is not defined. This likely means the App Bridge script tag was not added correctly to this page"
    );
  return window.shopify;
}
export {
  pr as Modal,
  br as NavMenu,
  hr as SaveBar,
  _r as TitleBar,
  Rr as useAppBridge
};
//# sourceMappingURL=index.js.map
