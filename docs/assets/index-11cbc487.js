var jd = Object.defineProperty;
var Rd = (e, t, n) =>
    t in e
        ? jd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (e[t] = n);
var $e = (e, t, n) => (Rd(e, typeof t != "symbol" ? t + "" : t, n), n);
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        r(i);
    new MutationObserver((i) => {
        for (const o of i)
            if (o.type === "childList")
                for (const s of o.addedNodes)
                    s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(i) {
        const o = {};
        return (
            i.integrity && (o.integrity = i.integrity),
            i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
            i.crossOrigin === "use-credentials"
                ? (o.credentials = "include")
                : i.crossOrigin === "anonymous"
                ? (o.credentials = "omit")
                : (o.credentials = "same-origin"),
            o
        );
    }
    function r(i) {
        if (i.ep) return;
        i.ep = !0;
        const o = n(i);
        fetch(i.href, o);
    }
})();
var Za = { exports: {} },
    Mi = {},
    eu = { exports: {} },
    V = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Er = Symbol.for("react.element"),
    Td = Symbol.for("react.portal"),
    _d = Symbol.for("react.fragment"),
    Ld = Symbol.for("react.strict_mode"),
    Od = Symbol.for("react.profiler"),
    Id = Symbol.for("react.provider"),
    Md = Symbol.for("react.context"),
    Fd = Symbol.for("react.forward_ref"),
    zd = Symbol.for("react.suspense"),
    Bd = Symbol.for("react.memo"),
    Dd = Symbol.for("react.lazy"),
    Tl = Symbol.iterator;
function bd(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (Tl && e[Tl]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var tu = {
        isMounted: function () {
            return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
    },
    nu = Object.assign,
    ru = {};
function On(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = ru),
        (this.updater = n || tu);
}
On.prototype.isReactComponent = {};
On.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
            "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
    this.updater.enqueueSetState(this, e, t, "setState");
};
On.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function iu() {}
iu.prototype = On.prototype;
function As(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = ru),
        (this.updater = n || tu);
}
var Ns = (As.prototype = new iu());
Ns.constructor = As;
nu(Ns, On.prototype);
Ns.isPureReactComponent = !0;
var _l = Array.isArray,
    ou = Object.prototype.hasOwnProperty,
    js = { current: null },
    su = { key: !0, ref: !0, __self: !0, __source: !0 };
function lu(e, t, n) {
    var r,
        i = {},
        o = null,
        s = null;
    if (t != null)
        for (r in (t.ref !== void 0 && (s = t.ref),
        t.key !== void 0 && (o = "" + t.key),
        t))
            ou.call(t, r) && !su.hasOwnProperty(r) && (i[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1) i.children = n;
    else if (1 < a) {
        for (var u = Array(a), f = 0; f < a; f++) u[f] = arguments[f + 2];
        i.children = u;
    }
    if (e && e.defaultProps)
        for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
    return {
        $$typeof: Er,
        type: e,
        key: o,
        ref: s,
        props: i,
        _owner: js.current,
    };
}
function Ud(e, t) {
    return {
        $$typeof: Er,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
    };
}
function Rs(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Er;
}
function qd(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
        "$" +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var Ll = /\/+/g;
function Xi(e, t) {
    return typeof e == "object" && e !== null && e.key != null
        ? qd("" + e.key)
        : t.toString(36);
}
function Qr(e, t, n, r, i) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var s = !1;
    if (e === null) s = !0;
    else
        switch (o) {
            case "string":
            case "number":
                s = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case Er:
                    case Td:
                        s = !0;
                }
        }
    if (s)
        return (
            (s = e),
            (i = i(s)),
            (e = r === "" ? "." + Xi(s, 0) : r),
            _l(i)
                ? ((n = ""),
                  e != null && (n = e.replace(Ll, "$&/") + "/"),
                  Qr(i, t, n, "", function (f) {
                      return f;
                  }))
                : i != null &&
                  (Rs(i) &&
                      (i = Ud(
                          i,
                          n +
                              (!i.key || (s && s.key === i.key)
                                  ? ""
                                  : ("" + i.key).replace(Ll, "$&/") + "/") +
                              e
                      )),
                  t.push(i)),
            1
        );
    if (((s = 0), (r = r === "" ? "." : r + ":"), _l(e)))
        for (var a = 0; a < e.length; a++) {
            o = e[a];
            var u = r + Xi(o, a);
            s += Qr(o, t, n, u, i);
        }
    else if (((u = bd(e)), typeof u == "function"))
        for (e = u.call(e), a = 0; !(o = e.next()).done; )
            (o = o.value), (u = r + Xi(o, a++)), (s += Qr(o, t, n, u, i));
    else if (o === "object")
        throw (
            ((t = String(e)),
            Error(
                "Objects are not valid as a React child (found: " +
                    (t === "[object Object]"
                        ? "object with keys {" + Object.keys(e).join(", ") + "}"
                        : t) +
                    "). If you meant to render a collection of children, use an array instead."
            ))
        );
    return s;
}
function Tr(e, t, n) {
    if (e == null) return e;
    var r = [],
        i = 0;
    return (
        Qr(e, r, "", "", function (o) {
            return t.call(n, o, i++);
        }),
        r
    );
}
function Vd(e) {
    if (e._status === -1) {
        var t = e._result;
        (t = t()),
            t.then(
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 1), (e._result = n));
                },
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 2), (e._result = n));
                }
            ),
            e._status === -1 && ((e._status = 0), (e._result = t));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
}
var Pe = { current: null },
    Gr = { transition: null },
    Jd = {
        ReactCurrentDispatcher: Pe,
        ReactCurrentBatchConfig: Gr,
        ReactCurrentOwner: js,
    };
V.Children = {
    map: Tr,
    forEach: function (e, t, n) {
        Tr(
            e,
            function () {
                t.apply(this, arguments);
            },
            n
        );
    },
    count: function (e) {
        var t = 0;
        return (
            Tr(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            Tr(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!Rs(e))
            throw Error(
                "React.Children.only expected to receive a single React element child."
            );
        return e;
    },
};
V.Component = On;
V.Fragment = _d;
V.Profiler = Od;
V.PureComponent = As;
V.StrictMode = Ld;
V.Suspense = zd;
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Jd;
V.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error(
            "React.cloneElement(...): The argument must be a React element, but you passed " +
                e +
                "."
        );
    var r = nu({}, e.props),
        i = e.key,
        o = e.ref,
        s = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((o = t.ref), (s = js.current)),
            t.key !== void 0 && (i = "" + t.key),
            e.type && e.type.defaultProps)
        )
            var a = e.type.defaultProps;
        for (u in t)
            ou.call(t, u) &&
                !su.hasOwnProperty(u) &&
                (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
    }
    var u = arguments.length - 2;
    if (u === 1) r.children = n;
    else if (1 < u) {
        a = Array(u);
        for (var f = 0; f < u; f++) a[f] = arguments[f + 2];
        r.children = a;
    }
    return { $$typeof: Er, type: e.type, key: i, ref: o, props: r, _owner: s };
};
V.createContext = function (e) {
    return (
        (e = {
            $$typeof: Md,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
        }),
        (e.Provider = { $$typeof: Id, _context: e }),
        (e.Consumer = e)
    );
};
V.createElement = lu;
V.createFactory = function (e) {
    var t = lu.bind(null, e);
    return (t.type = e), t;
};
V.createRef = function () {
    return { current: null };
};
V.forwardRef = function (e) {
    return { $$typeof: Fd, render: e };
};
V.isValidElement = Rs;
V.lazy = function (e) {
    return { $$typeof: Dd, _payload: { _status: -1, _result: e }, _init: Vd };
};
V.memo = function (e, t) {
    return { $$typeof: Bd, type: e, compare: t === void 0 ? null : t };
};
V.startTransition = function (e) {
    var t = Gr.transition;
    Gr.transition = {};
    try {
        e();
    } finally {
        Gr.transition = t;
    }
};
V.unstable_act = function () {
    throw Error("act(...) is not supported in production builds of React.");
};
V.useCallback = function (e, t) {
    return Pe.current.useCallback(e, t);
};
V.useContext = function (e) {
    return Pe.current.useContext(e);
};
V.useDebugValue = function () {};
V.useDeferredValue = function (e) {
    return Pe.current.useDeferredValue(e);
};
V.useEffect = function (e, t) {
    return Pe.current.useEffect(e, t);
};
V.useId = function () {
    return Pe.current.useId();
};
V.useImperativeHandle = function (e, t, n) {
    return Pe.current.useImperativeHandle(e, t, n);
};
V.useInsertionEffect = function (e, t) {
    return Pe.current.useInsertionEffect(e, t);
};
V.useLayoutEffect = function (e, t) {
    return Pe.current.useLayoutEffect(e, t);
};
V.useMemo = function (e, t) {
    return Pe.current.useMemo(e, t);
};
V.useReducer = function (e, t, n) {
    return Pe.current.useReducer(e, t, n);
};
V.useRef = function (e) {
    return Pe.current.useRef(e);
};
V.useState = function (e) {
    return Pe.current.useState(e);
};
V.useSyncExternalStore = function (e, t, n) {
    return Pe.current.useSyncExternalStore(e, t, n);
};
V.useTransition = function () {
    return Pe.current.useTransition();
};
V.version = "18.2.0";
eu.exports = V;
var M = eu.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hd = M,
    $d = Symbol.for("react.element"),
    Wd = Symbol.for("react.fragment"),
    Kd = Object.prototype.hasOwnProperty,
    Qd =
        Hd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Gd = { key: !0, ref: !0, __self: !0, __source: !0 };
function au(e, t, n) {
    var r,
        i = {},
        o = null,
        s = null;
    n !== void 0 && (o = "" + n),
        t.key !== void 0 && (o = "" + t.key),
        t.ref !== void 0 && (s = t.ref);
    for (r in t) Kd.call(t, r) && !Gd.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: $d,
        type: e,
        key: o,
        ref: s,
        props: i,
        _owner: Qd.current,
    };
}
Mi.Fragment = Wd;
Mi.jsx = au;
Mi.jsxs = au;
Za.exports = Mi;
var l = Za.exports,
    No = {},
    uu = { exports: {} },
    Fe = {},
    cu = { exports: {} },
    du = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
    function t(x, S) {
        var L = x.length;
        x.push(S);
        e: for (; 0 < L; ) {
            var I = (L - 1) >>> 1,
                D = x[I];
            if (0 < i(D, S)) (x[I] = S), (x[L] = D), (L = I);
            else break e;
        }
    }
    function n(x) {
        return x.length === 0 ? null : x[0];
    }
    function r(x) {
        if (x.length === 0) return null;
        var S = x[0],
            L = x.pop();
        if (L !== S) {
            x[0] = L;
            e: for (var I = 0, D = x.length, b = D >>> 1; I < b; ) {
                var W = 2 * (I + 1) - 1,
                    K = x[W],
                    ye = W + 1,
                    fe = x[ye];
                if (0 > i(K, L))
                    ye < D && 0 > i(fe, K)
                        ? ((x[I] = fe), (x[ye] = L), (I = ye))
                        : ((x[I] = K), (x[W] = L), (I = W));
                else if (ye < D && 0 > i(fe, L))
                    (x[I] = fe), (x[ye] = L), (I = ye);
                else break e;
            }
        }
        return S;
    }
    function i(x, S) {
        var L = x.sortIndex - S.sortIndex;
        return L !== 0 ? L : x.id - S.id;
    }
    if (
        typeof performance == "object" &&
        typeof performance.now == "function"
    ) {
        var o = performance;
        e.unstable_now = function () {
            return o.now();
        };
    } else {
        var s = Date,
            a = s.now();
        e.unstable_now = function () {
            return s.now() - a;
        };
    }
    var u = [],
        f = [],
        g = 1,
        h = null,
        m = 3,
        y = !1,
        A = !1,
        P = !1,
        B = typeof setTimeout == "function" ? setTimeout : null,
        d = typeof clearTimeout == "function" ? clearTimeout : null,
        c = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function p(x) {
        for (var S = n(f); S !== null; ) {
            if (S.callback === null) r(f);
            else if (S.startTime <= x)
                r(f), (S.sortIndex = S.expirationTime), t(u, S);
            else break;
            S = n(f);
        }
    }
    function k(x) {
        if (((P = !1), p(x), !A))
            if (n(u) !== null) (A = !0), R(v);
            else {
                var S = n(f);
                S !== null && O(k, S.startTime - x);
            }
    }
    function v(x, S) {
        (A = !1), P && ((P = !1), d(T), (T = -1)), (y = !0);
        var L = m;
        try {
            for (
                p(S), h = n(u);
                h !== null && (!(h.expirationTime > S) || (x && !$()));

            ) {
                var I = h.callback;
                if (typeof I == "function") {
                    (h.callback = null), (m = h.priorityLevel);
                    var D = I(h.expirationTime <= S);
                    (S = e.unstable_now()),
                        typeof D == "function"
                            ? (h.callback = D)
                            : h === n(u) && r(u),
                        p(S);
                } else r(u);
                h = n(u);
            }
            if (h !== null) var b = !0;
            else {
                var W = n(f);
                W !== null && O(k, W.startTime - S), (b = !1);
            }
            return b;
        } finally {
            (h = null), (m = L), (y = !1);
        }
    }
    var C = !1,
        w = null,
        T = -1,
        U = 5,
        F = -1;
    function $() {
        return !(e.unstable_now() - F < U);
    }
    function q() {
        if (w !== null) {
            var x = e.unstable_now();
            F = x;
            var S = !0;
            try {
                S = w(!0, x);
            } finally {
                S ? j() : ((C = !1), (w = null));
            }
        } else C = !1;
    }
    var j;
    if (typeof c == "function")
        j = function () {
            c(q);
        };
    else if (typeof MessageChannel < "u") {
        var N = new MessageChannel(),
            z = N.port2;
        (N.port1.onmessage = q),
            (j = function () {
                z.postMessage(null);
            });
    } else
        j = function () {
            B(q, 0);
        };
    function R(x) {
        (w = x), C || ((C = !0), j());
    }
    function O(x, S) {
        T = B(function () {
            x(e.unstable_now());
        }, S);
    }
    (e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (x) {
            x.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            A || y || ((A = !0), R(v));
        }),
        (e.unstable_forceFrameRate = function (x) {
            0 > x || 125 < x
                ? console.error(
                      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                  )
                : (U = 0 < x ? Math.floor(1e3 / x) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return m;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(u);
        }),
        (e.unstable_next = function (x) {
            switch (m) {
                case 1:
                case 2:
                case 3:
                    var S = 3;
                    break;
                default:
                    S = m;
            }
            var L = m;
            m = S;
            try {
                return x();
            } finally {
                m = L;
            }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (x, S) {
            switch (x) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    x = 3;
            }
            var L = m;
            m = x;
            try {
                return S();
            } finally {
                m = L;
            }
        }),
        (e.unstable_scheduleCallback = function (x, S, L) {
            var I = e.unstable_now();
            switch (
                (typeof L == "object" && L !== null
                    ? ((L = L.delay),
                      (L = typeof L == "number" && 0 < L ? I + L : I))
                    : (L = I),
                x)
            ) {
                case 1:
                    var D = -1;
                    break;
                case 2:
                    D = 250;
                    break;
                case 5:
                    D = 1073741823;
                    break;
                case 4:
                    D = 1e4;
                    break;
                default:
                    D = 5e3;
            }
            return (
                (D = L + D),
                (x = {
                    id: g++,
                    callback: S,
                    priorityLevel: x,
                    startTime: L,
                    expirationTime: D,
                    sortIndex: -1,
                }),
                L > I
                    ? ((x.sortIndex = L),
                      t(f, x),
                      n(u) === null &&
                          x === n(f) &&
                          (P ? (d(T), (T = -1)) : (P = !0), O(k, L - I)))
                    : ((x.sortIndex = D), t(u, x), A || y || ((A = !0), R(v))),
                x
            );
        }),
        (e.unstable_shouldYield = $),
        (e.unstable_wrapCallback = function (x) {
            var S = m;
            return function () {
                var L = m;
                m = S;
                try {
                    return x.apply(this, arguments);
                } finally {
                    m = L;
                }
            };
        });
})(du);
cu.exports = du;
var Yd = cu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var fu = M,
    Me = Yd;
function E(e) {
    for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
            n = 1;
        n < arguments.length;
        n++
    )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
}
var pu = new Set(),
    ar = {};
function nn(e, t) {
    An(e, t), An(e + "Capture", t);
}
function An(e, t) {
    for (ar[e] = t, e = 0; e < t.length; e++) pu.add(t[e]);
}
var gt = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
    ),
    jo = Object.prototype.hasOwnProperty,
    Xd =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Ol = {},
    Il = {};
function Zd(e) {
    return jo.call(Il, e)
        ? !0
        : jo.call(Ol, e)
        ? !1
        : Xd.test(e)
        ? (Il[e] = !0)
        : ((Ol[e] = !0), !1);
}
function ef(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r
                ? !1
                : n !== null
                ? !n.acceptsBooleans
                : ((e = e.toLowerCase().slice(0, 5)),
                  e !== "data-" && e !== "aria-");
        default:
            return !1;
    }
}
function tf(e, t, n, r) {
    if (t === null || typeof t > "u" || ef(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t;
        }
    return !1;
}
function Ce(e, t, n, r, i, o, s) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o),
        (this.removeEmptyString = s);
}
var me = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
        me[e] = new Ce(e, 0, !1, e, null, !1, !1);
    });
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
].forEach(function (e) {
    var t = e[0];
    me[t] = new Ce(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    me[e] = new Ce(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
].forEach(function (e) {
    me[e] = new Ce(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
        me[e] = new Ce(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
    me[e] = new Ce(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
    me[e] = new Ce(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
    me[e] = new Ce(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
    me[e] = new Ce(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ts = /[\-:]([a-z])/g;
function _s(e) {
    return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(Ts, _s);
        me[t] = new Ce(t, 1, !1, e, null, !1, !1);
    });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(Ts, _s);
        me[t] = new Ce(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(Ts, _s);
    me[t] = new Ce(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
    me[e] = new Ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
me.xlinkHref = new Ce(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
    me[e] = new Ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ls(e, t, n, r) {
    var i = me.hasOwnProperty(t) ? me[t] : null;
    (i !== null
        ? i.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== "o" && t[0] !== "O") ||
          (t[1] !== "n" && t[1] !== "N")) &&
        (tf(t, n, i, r) && (n = null),
        r || i === null
            ? Zd(t) &&
              (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
            : i.mustUseProperty
            ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
            : ((t = i.attributeName),
              (r = i.attributeNamespace),
              n === null
                  ? e.removeAttribute(t)
                  : ((i = i.type),
                    (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var kt = fu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    _r = Symbol.for("react.element"),
    ln = Symbol.for("react.portal"),
    an = Symbol.for("react.fragment"),
    Os = Symbol.for("react.strict_mode"),
    Ro = Symbol.for("react.profiler"),
    hu = Symbol.for("react.provider"),
    mu = Symbol.for("react.context"),
    Is = Symbol.for("react.forward_ref"),
    To = Symbol.for("react.suspense"),
    _o = Symbol.for("react.suspense_list"),
    Ms = Symbol.for("react.memo"),
    Pt = Symbol.for("react.lazy"),
    yu = Symbol.for("react.offscreen"),
    Ml = Symbol.iterator;
function Dn(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (Ml && e[Ml]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var ne = Object.assign,
    Zi;
function Kn(e) {
    if (Zi === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            Zi = (t && t[1]) || "";
        }
    return (
        `
` +
        Zi +
        e
    );
}
var eo = !1;
function to(e, t) {
    if (!e || eo) return "";
    eo = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (
                ((t = function () {
                    throw Error();
                }),
                Object.defineProperty(t.prototype, "props", {
                    set: function () {
                        throw Error();
                    },
                }),
                typeof Reflect == "object" && Reflect.construct)
            ) {
                try {
                    Reflect.construct(t, []);
                } catch (f) {
                    var r = f;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (f) {
                    r = f;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (f) {
                r = f;
            }
            e();
        }
    } catch (f) {
        if (f && r && typeof f.stack == "string") {
            for (
                var i = f.stack.split(`
`),
                    o = r.stack.split(`
`),
                    s = i.length - 1,
                    a = o.length - 1;
                1 <= s && 0 <= a && i[s] !== o[a];

            )
                a--;
            for (; 1 <= s && 0 <= a; s--, a--)
                if (i[s] !== o[a]) {
                    if (s !== 1 || a !== 1)
                        do
                            if ((s--, a--, 0 > a || i[s] !== o[a])) {
                                var u =
                                    `
` + i[s].replace(" at new ", " at ");
                                return (
                                    e.displayName &&
                                        u.includes("<anonymous>") &&
                                        (u = u.replace(
                                            "<anonymous>",
                                            e.displayName
                                        )),
                                    u
                                );
                            }
                        while (1 <= s && 0 <= a);
                    break;
                }
        }
    } finally {
        (eo = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? Kn(e) : "";
}
function nf(e) {
    switch (e.tag) {
        case 5:
            return Kn(e.type);
        case 16:
            return Kn("Lazy");
        case 13:
            return Kn("Suspense");
        case 19:
            return Kn("SuspenseList");
        case 0:
        case 2:
        case 15:
            return (e = to(e.type, !1)), e;
        case 11:
            return (e = to(e.type.render, !1)), e;
        case 1:
            return (e = to(e.type, !0)), e;
        default:
            return "";
    }
}
function Lo(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case an:
            return "Fragment";
        case ln:
            return "Portal";
        case Ro:
            return "Profiler";
        case Os:
            return "StrictMode";
        case To:
            return "Suspense";
        case _o:
            return "SuspenseList";
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
            case mu:
                return (e.displayName || "Context") + ".Consumer";
            case hu:
                return (e._context.displayName || "Context") + ".Provider";
            case Is:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e ||
                        ((e = t.displayName || t.name || ""),
                        (e =
                            e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
                    e
                );
            case Ms:
                return (
                    (t = e.displayName || null),
                    t !== null ? t : Lo(e.type) || "Memo"
                );
            case Pt:
                (t = e._payload), (e = e._init);
                try {
                    return Lo(e(t));
                } catch {}
        }
    return null;
}
function rf(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return (
                (e = t.render),
                (e = e.displayName || e.name || ""),
                t.displayName ||
                    (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
            );
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return Lo(t);
        case 8:
            return t === Os ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t;
    }
    return null;
}
function zt(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return "";
    }
}
function gu(e) {
    var t = e.type;
    return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
    );
}
function of(e) {
    var t = gu(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (
        !e.hasOwnProperty(t) &&
        typeof n < "u" &&
        typeof n.get == "function" &&
        typeof n.set == "function"
    ) {
        var i = n.get,
            o = n.set;
        return (
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return i.call(this);
                },
                set: function (s) {
                    (r = "" + s), o.call(this, s);
                },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
                getValue: function () {
                    return r;
                },
                setValue: function (s) {
                    r = "" + s;
                },
                stopTracking: function () {
                    (e._valueTracker = null), delete e[t];
                },
            }
        );
    }
}
function Lr(e) {
    e._valueTracker || (e._valueTracker = of(e));
}
function vu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return (
        e && (r = gu(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
    );
}
function ci(e) {
    if (
        ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
        return null;
    try {
        return e.activeElement || e.body;
    } catch {
        return e.body;
    }
}
function Oo(e, t) {
    var n = t.checked;
    return ne({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
    });
}
function Fl(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    (n = zt(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
                t.type === "checkbox" || t.type === "radio"
                    ? t.checked != null
                    : t.value != null,
        });
}
function wu(e, t) {
    (t = t.checked), t != null && Ls(e, "checked", t, !1);
}
function Io(e, t) {
    wu(e, t);
    var n = zt(t.value),
        r = t.type;
    if (n != null)
        r === "number"
            ? ((n === 0 && e.value === "") || e.value != n) &&
              (e.value = "" + n)
            : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return;
    }
    t.hasOwnProperty("value")
        ? Mo(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && Mo(e, t.type, zt(t.defaultValue)),
        t.checked == null &&
            t.defaultChecked != null &&
            (e.defaultChecked = !!t.defaultChecked);
}
function zl(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
            !(
                (r !== "submit" && r !== "reset") ||
                (t.value !== void 0 && t.value !== null)
            )
        )
            return;
        (t = "" + e._wrapperState.initialValue),
            n || t === e.value || (e.value = t),
            (e.defaultValue = t);
    }
    (n = e.name),
        n !== "" && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== "" && (e.name = n);
}
function Mo(e, t, n) {
    (t !== "number" || ci(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = "" + e._wrapperState.initialValue)
            : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Qn = Array.isArray;
function wn(e, t, n, r) {
    if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
            (i = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== i && (e[n].selected = i),
                i && r && (e[n].defaultSelected = !0);
    } else {
        for (n = "" + zt(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                (e[i].selected = !0), r && (e[i].defaultSelected = !0);
                return;
            }
            t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
    }
}
function Fo(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(E(91));
    return ne({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
    });
}
function Bl(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(E(92));
            if (Qn(n)) {
                if (1 < n.length) throw Error(E(93));
                n = n[0];
            }
            t = n;
        }
        t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: zt(n) };
}
function Su(e, t) {
    var n = zt(t.value),
        r = zt(t.defaultValue);
    n != null &&
        ((n = "" + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = "" + r);
}
function Dl(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
        t !== "" &&
        t !== null &&
        (e.value = t);
}
function ku(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml";
    }
}
function zo(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
        ? ku(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
}
var Or,
    xu = (function (e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
            ? function (t, n, r, i) {
                  MSApp.execUnsafeLocalFunction(function () {
                      return e(t, n, r, i);
                  });
              }
            : e;
    })(function (e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
            e.innerHTML = t;
        else {
            for (
                Or = Or || document.createElement("div"),
                    Or.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
                    t = Or.firstChild;
                e.firstChild;

            )
                e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
    });
function ur(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var Zn = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
    },
    sf = ["Webkit", "ms", "Moz", "O"];
Object.keys(Zn).forEach(function (e) {
    sf.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Zn[t] = Zn[e]);
    });
});
function Pu(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
        ? ""
        : n ||
          typeof t != "number" ||
          t === 0 ||
          (Zn.hasOwnProperty(e) && Zn[e])
        ? ("" + t).trim()
        : t + "px";
}
function Cu(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                i = Pu(n, t[n], r);
            n === "float" && (n = "cssFloat"),
                r ? e.setProperty(n, i) : (e[n] = i);
        }
}
var lf = ne(
    { menuitem: !0 },
    {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
    }
);
function Bo(e, t) {
    if (t) {
        if (lf[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(E(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(E(60));
            if (
                typeof t.dangerouslySetInnerHTML != "object" ||
                !("__html" in t.dangerouslySetInnerHTML)
            )
                throw Error(E(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(E(62));
    }
}
function Do(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0;
    }
}
var bo = null;
function Fs(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var Uo = null,
    Sn = null,
    kn = null;
function bl(e) {
    if ((e = jr(e))) {
        if (typeof Uo != "function") throw Error(E(280));
        var t = e.stateNode;
        t && ((t = bi(t)), Uo(e.stateNode, e.type, t));
    }
}
function Eu(e) {
    Sn ? (kn ? kn.push(e) : (kn = [e])) : (Sn = e);
}
function Au() {
    if (Sn) {
        var e = Sn,
            t = kn;
        if (((kn = Sn = null), bl(e), t))
            for (e = 0; e < t.length; e++) bl(t[e]);
    }
}
function Nu(e, t) {
    return e(t);
}
function ju() {}
var no = !1;
function Ru(e, t, n) {
    if (no) return e(t, n);
    no = !0;
    try {
        return Nu(e, t, n);
    } finally {
        (no = !1), (Sn !== null || kn !== null) && (ju(), Au());
    }
}
function cr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = bi(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) ||
                ((e = e.type),
                (r = !(
                    e === "button" ||
                    e === "input" ||
                    e === "select" ||
                    e === "textarea"
                ))),
                (e = !r);
            break e;
        default:
            e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(E(231, t, typeof n));
    return n;
}
var qo = !1;
if (gt)
    try {
        var bn = {};
        Object.defineProperty(bn, "passive", {
            get: function () {
                qo = !0;
            },
        }),
            window.addEventListener("test", bn, bn),
            window.removeEventListener("test", bn, bn);
    } catch {
        qo = !1;
    }
function af(e, t, n, r, i, o, s, a, u) {
    var f = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, f);
    } catch (g) {
        this.onError(g);
    }
}
var er = !1,
    di = null,
    fi = !1,
    Vo = null,
    uf = {
        onError: function (e) {
            (er = !0), (di = e);
        },
    };
function cf(e, t, n, r, i, o, s, a, u) {
    (er = !1), (di = null), af.apply(uf, arguments);
}
function df(e, t, n, r, i, o, s, a, u) {
    if ((cf.apply(this, arguments), er)) {
        if (er) {
            var f = di;
            (er = !1), (di = null);
        } else throw Error(E(198));
        fi || ((fi = !0), (Vo = f));
    }
}
function rn(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
        e = t;
        do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
        while (e);
    }
    return t.tag === 3 ? n : null;
}
function Tu(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (
            (t === null &&
                ((e = e.alternate), e !== null && (t = e.memoizedState)),
            t !== null)
        )
            return t.dehydrated;
    }
    return null;
}
function Ul(e) {
    if (rn(e) !== e) throw Error(E(188));
}
function ff(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = rn(e)), t === null)) throw Error(E(188));
        return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
        var i = n.return;
        if (i === null) break;
        var o = i.alternate;
        if (o === null) {
            if (((r = i.return), r !== null)) {
                n = r;
                continue;
            }
            break;
        }
        if (i.child === o.child) {
            for (o = i.child; o; ) {
                if (o === n) return Ul(i), e;
                if (o === r) return Ul(i), t;
                o = o.sibling;
            }
            throw Error(E(188));
        }
        if (n.return !== r.return) (n = i), (r = o);
        else {
            for (var s = !1, a = i.child; a; ) {
                if (a === n) {
                    (s = !0), (n = i), (r = o);
                    break;
                }
                if (a === r) {
                    (s = !0), (r = i), (n = o);
                    break;
                }
                a = a.sibling;
            }
            if (!s) {
                for (a = o.child; a; ) {
                    if (a === n) {
                        (s = !0), (n = o), (r = i);
                        break;
                    }
                    if (a === r) {
                        (s = !0), (r = o), (n = i);
                        break;
                    }
                    a = a.sibling;
                }
                if (!s) throw Error(E(189));
            }
        }
        if (n.alternate !== r) throw Error(E(190));
    }
    if (n.tag !== 3) throw Error(E(188));
    return n.stateNode.current === n ? e : t;
}
function _u(e) {
    return (e = ff(e)), e !== null ? Lu(e) : null;
}
function Lu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
        var t = Lu(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var Ou = Me.unstable_scheduleCallback,
    ql = Me.unstable_cancelCallback,
    pf = Me.unstable_shouldYield,
    hf = Me.unstable_requestPaint,
    oe = Me.unstable_now,
    mf = Me.unstable_getCurrentPriorityLevel,
    zs = Me.unstable_ImmediatePriority,
    Iu = Me.unstable_UserBlockingPriority,
    pi = Me.unstable_NormalPriority,
    yf = Me.unstable_LowPriority,
    Mu = Me.unstable_IdlePriority,
    Fi = null,
    st = null;
function gf(e) {
    if (st && typeof st.onCommitFiberRoot == "function")
        try {
            st.onCommitFiberRoot(
                Fi,
                e,
                void 0,
                (e.current.flags & 128) === 128
            );
        } catch {}
}
var Xe = Math.clz32 ? Math.clz32 : Sf,
    vf = Math.log,
    wf = Math.LN2;
function Sf(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((vf(e) / wf) | 0)) | 0;
}
var Ir = 64,
    Mr = 4194304;
function Gn(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e;
    }
}
function hi(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        i = e.suspendedLanes,
        o = e.pingedLanes,
        s = n & 268435455;
    if (s !== 0) {
        var a = s & ~i;
        a !== 0 ? (r = Gn(a)) : ((o &= s), o !== 0 && (r = Gn(o)));
    } else (s = n & ~i), s !== 0 ? (r = Gn(s)) : o !== 0 && (r = Gn(o));
    if (r === 0) return 0;
    if (
        t !== 0 &&
        t !== r &&
        !(t & i) &&
        ((i = r & -r),
        (o = t & -t),
        i >= o || (i === 16 && (o & 4194240) !== 0))
    )
        return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; )
            (n = 31 - Xe(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
    return r;
}
function kf(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1;
    }
}
function xf(e, t) {
    for (
        var n = e.suspendedLanes,
            r = e.pingedLanes,
            i = e.expirationTimes,
            o = e.pendingLanes;
        0 < o;

    ) {
        var s = 31 - Xe(o),
            a = 1 << s,
            u = i[s];
        u === -1
            ? (!(a & n) || a & r) && (i[s] = kf(a, t))
            : u <= t && (e.expiredLanes |= a),
            (o &= ~a);
    }
}
function Jo(e) {
    return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
}
function Fu() {
    var e = Ir;
    return (Ir <<= 1), !(Ir & 4194240) && (Ir = 64), e;
}
function ro(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function Ar(e, t, n) {
    (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - Xe(t)),
        (e[t] = n);
}
function Pf(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var i = 31 - Xe(n),
            o = 1 << i;
        (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
    }
}
function Bs(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
        var r = 31 - Xe(n),
            i = 1 << r;
        (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
    }
}
var Q = 0;
function zu(e) {
    return (
        (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
}
var Bu,
    Ds,
    Du,
    bu,
    Uu,
    Ho = !1,
    Fr = [],
    Rt = null,
    Tt = null,
    _t = null,
    dr = new Map(),
    fr = new Map(),
    Et = [],
    Cf =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
            " "
        );
function Vl(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            Rt = null;
            break;
        case "dragenter":
        case "dragleave":
            Tt = null;
            break;
        case "mouseover":
        case "mouseout":
            _t = null;
            break;
        case "pointerover":
        case "pointerout":
            dr.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            fr.delete(t.pointerId);
    }
}
function Un(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o
        ? ((e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: o,
              targetContainers: [i],
          }),
          t !== null && ((t = jr(t)), t !== null && Ds(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
}
function Ef(e, t, n, r, i) {
    switch (t) {
        case "focusin":
            return (Rt = Un(Rt, e, t, n, r, i)), !0;
        case "dragenter":
            return (Tt = Un(Tt, e, t, n, r, i)), !0;
        case "mouseover":
            return (_t = Un(_t, e, t, n, r, i)), !0;
        case "pointerover":
            var o = i.pointerId;
            return dr.set(o, Un(dr.get(o) || null, e, t, n, r, i)), !0;
        case "gotpointercapture":
            return (
                (o = i.pointerId),
                fr.set(o, Un(fr.get(o) || null, e, t, n, r, i)),
                !0
            );
    }
    return !1;
}
function qu(e) {
    var t = Ht(e.target);
    if (t !== null) {
        var n = rn(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = Tu(n)), t !== null)) {
                    (e.blockedOn = t),
                        Uu(e.priority, function () {
                            Du(n);
                        });
                    return;
                }
            } else if (
                t === 3 &&
                n.stateNode.current.memoizedState.isDehydrated
            ) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
            }
        }
    }
    e.blockedOn = null;
}
function Yr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = $o(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            (bo = r), n.target.dispatchEvent(r), (bo = null);
        } else return (t = jr(n)), t !== null && Ds(t), (e.blockedOn = n), !1;
        t.shift();
    }
    return !0;
}
function Jl(e, t, n) {
    Yr(e) && n.delete(t);
}
function Af() {
    (Ho = !1),
        Rt !== null && Yr(Rt) && (Rt = null),
        Tt !== null && Yr(Tt) && (Tt = null),
        _t !== null && Yr(_t) && (_t = null),
        dr.forEach(Jl),
        fr.forEach(Jl);
}
function qn(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null),
        Ho ||
            ((Ho = !0),
            Me.unstable_scheduleCallback(Me.unstable_NormalPriority, Af)));
}
function pr(e) {
    function t(i) {
        return qn(i, e);
    }
    if (0 < Fr.length) {
        qn(Fr[0], e);
        for (var n = 1; n < Fr.length; n++) {
            var r = Fr[n];
            r.blockedOn === e && (r.blockedOn = null);
        }
    }
    for (
        Rt !== null && qn(Rt, e),
            Tt !== null && qn(Tt, e),
            _t !== null && qn(_t, e),
            dr.forEach(t),
            fr.forEach(t),
            n = 0;
        n < Et.length;
        n++
    )
        (r = Et[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Et.length && ((n = Et[0]), n.blockedOn === null); )
        qu(n), n.blockedOn === null && Et.shift();
}
var xn = kt.ReactCurrentBatchConfig,
    mi = !0;
function Nf(e, t, n, r) {
    var i = Q,
        o = xn.transition;
    xn.transition = null;
    try {
        (Q = 1), bs(e, t, n, r);
    } finally {
        (Q = i), (xn.transition = o);
    }
}
function jf(e, t, n, r) {
    var i = Q,
        o = xn.transition;
    xn.transition = null;
    try {
        (Q = 4), bs(e, t, n, r);
    } finally {
        (Q = i), (xn.transition = o);
    }
}
function bs(e, t, n, r) {
    if (mi) {
        var i = $o(e, t, n, r);
        if (i === null) ho(e, t, r, yi, n), Vl(e, r);
        else if (Ef(i, e, t, n, r)) r.stopPropagation();
        else if ((Vl(e, r), t & 4 && -1 < Cf.indexOf(e))) {
            for (; i !== null; ) {
                var o = jr(i);
                if (
                    (o !== null && Bu(o),
                    (o = $o(e, t, n, r)),
                    o === null && ho(e, t, r, yi, n),
                    o === i)
                )
                    break;
                i = o;
            }
            i !== null && r.stopPropagation();
        } else ho(e, t, r, null, n);
    }
}
var yi = null;
function $o(e, t, n, r) {
    if (((yi = null), (e = Fs(r)), (e = Ht(e)), e !== null))
        if (((t = rn(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = Tu(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return (yi = e), null;
}
function Vu(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (mf()) {
                case zs:
                    return 1;
                case Iu:
                    return 4;
                case pi:
                case yf:
                    return 16;
                case Mu:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var Nt = null,
    Us = null,
    Xr = null;
function Ju() {
    if (Xr) return Xr;
    var e,
        t = Us,
        n = t.length,
        r,
        i = "value" in Nt ? Nt.value : Nt.textContent,
        o = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var s = n - e;
    for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
    return (Xr = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Zr(e) {
    var t = e.keyCode;
    return (
        "charCode" in e
            ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
            : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function zr() {
    return !0;
}
function Hl() {
    return !1;
}
function ze(e) {
    function t(n, r, i, o, s) {
        (this._reactName = n),
            (this._targetInst = i),
            (this.type = r),
            (this.nativeEvent = o),
            (this.target = s),
            (this.currentTarget = null);
        for (var a in e)
            e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
        return (
            (this.isDefaultPrevented = (
                o.defaultPrevented != null
                    ? o.defaultPrevented
                    : o.returnValue === !1
            )
                ? zr
                : Hl),
            (this.isPropagationStopped = Hl),
            this
        );
    }
    return (
        ne(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault
                        ? n.preventDefault()
                        : typeof n.returnValue != "unknown" &&
                          (n.returnValue = !1),
                    (this.isDefaultPrevented = zr));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != "unknown" &&
                          (n.cancelBubble = !0),
                    (this.isPropagationStopped = zr));
            },
            persist: function () {},
            isPersistent: zr,
        }),
        t
    );
}
var In = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
    },
    qs = ze(In),
    Nr = ne({}, In, { view: 0, detail: 0 }),
    Rf = ze(Nr),
    io,
    oo,
    Vn,
    zi = ne({}, Nr, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Vs,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0
                ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                : e.relatedTarget;
        },
        movementX: function (e) {
            return "movementX" in e
                ? e.movementX
                : (e !== Vn &&
                      (Vn && e.type === "mousemove"
                          ? ((io = e.screenX - Vn.screenX),
                            (oo = e.screenY - Vn.screenY))
                          : (oo = io = 0),
                      (Vn = e)),
                  io);
        },
        movementY: function (e) {
            return "movementY" in e ? e.movementY : oo;
        },
    }),
    $l = ze(zi),
    Tf = ne({}, zi, { dataTransfer: 0 }),
    _f = ze(Tf),
    Lf = ne({}, Nr, { relatedTarget: 0 }),
    so = ze(Lf),
    Of = ne({}, In, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    If = ze(Of),
    Mf = ne({}, In, {
        clipboardData: function (e) {
            return "clipboardData" in e
                ? e.clipboardData
                : window.clipboardData;
        },
    }),
    Ff = ze(Mf),
    zf = ne({}, In, { data: 0 }),
    Wl = ze(zf),
    Bf = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
    },
    Df = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
    },
    bf = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
    };
function Uf(e) {
    var t = this.nativeEvent;
    return t.getModifierState
        ? t.getModifierState(e)
        : (e = bf[e])
        ? !!t[e]
        : !1;
}
function Vs() {
    return Uf;
}
var qf = ne({}, Nr, {
        key: function (e) {
            if (e.key) {
                var t = Bf[e.key] || e.key;
                if (t !== "Unidentified") return t;
            }
            return e.type === "keypress"
                ? ((e = Zr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
                : e.type === "keydown" || e.type === "keyup"
                ? Df[e.keyCode] || "Unidentified"
                : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Vs,
        charCode: function (e) {
            return e.type === "keypress" ? Zr(e) : 0;
        },
        keyCode: function (e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
            return e.type === "keypress"
                ? Zr(e)
                : e.type === "keydown" || e.type === "keyup"
                ? e.keyCode
                : 0;
        },
    }),
    Vf = ze(qf),
    Jf = ne({}, zi, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
    }),
    Kl = ze(Jf),
    Hf = ne({}, Nr, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Vs,
    }),
    $f = ze(Hf),
    Wf = ne({}, In, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Kf = ze(Wf),
    Qf = ne({}, zi, {
        deltaX: function (e) {
            return "deltaX" in e
                ? e.deltaX
                : "wheelDeltaX" in e
                ? -e.wheelDeltaX
                : 0;
        },
        deltaY: function (e) {
            return "deltaY" in e
                ? e.deltaY
                : "wheelDeltaY" in e
                ? -e.wheelDeltaY
                : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
    }),
    Gf = ze(Qf),
    Yf = [9, 13, 27, 32],
    Js = gt && "CompositionEvent" in window,
    tr = null;
gt && "documentMode" in document && (tr = document.documentMode);
var Xf = gt && "TextEvent" in window && !tr,
    Hu = gt && (!Js || (tr && 8 < tr && 11 >= tr)),
    Ql = String.fromCharCode(32),
    Gl = !1;
function $u(e, t) {
    switch (e) {
        case "keyup":
            return Yf.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1;
    }
}
function Wu(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var un = !1;
function Zf(e, t) {
    switch (e) {
        case "compositionend":
            return Wu(t);
        case "keypress":
            return t.which !== 32 ? null : ((Gl = !0), Ql);
        case "textInput":
            return (e = t.data), e === Ql && Gl ? null : e;
        default:
            return null;
    }
}
function ep(e, t) {
    if (un)
        return e === "compositionend" || (!Js && $u(e, t))
            ? ((e = Ju()), (Xr = Us = Nt = null), (un = !1), e)
            : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (
                !(t.ctrlKey || t.altKey || t.metaKey) ||
                (t.ctrlKey && t.altKey)
            ) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
            }
            return null;
        case "compositionend":
            return Hu && t.locale !== "ko" ? null : t.data;
        default:
            return null;
    }
}
var tp = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
};
function Yl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!tp[e.type] : t === "textarea";
}
function Ku(e, t, n, r) {
    Eu(r),
        (t = gi(t, "onChange")),
        0 < t.length &&
            ((n = new qs("onChange", "change", null, n, r)),
            e.push({ event: n, listeners: t }));
}
var nr = null,
    hr = null;
function np(e) {
    oc(e, 0);
}
function Bi(e) {
    var t = fn(e);
    if (vu(t)) return e;
}
function rp(e, t) {
    if (e === "change") return t;
}
var Qu = !1;
if (gt) {
    var lo;
    if (gt) {
        var ao = "oninput" in document;
        if (!ao) {
            var Xl = document.createElement("div");
            Xl.setAttribute("oninput", "return;"),
                (ao = typeof Xl.oninput == "function");
        }
        lo = ao;
    } else lo = !1;
    Qu = lo && (!document.documentMode || 9 < document.documentMode);
}
function Zl() {
    nr && (nr.detachEvent("onpropertychange", Gu), (hr = nr = null));
}
function Gu(e) {
    if (e.propertyName === "value" && Bi(hr)) {
        var t = [];
        Ku(t, hr, e, Fs(e)), Ru(np, t);
    }
}
function ip(e, t, n) {
    e === "focusin"
        ? (Zl(), (nr = t), (hr = n), nr.attachEvent("onpropertychange", Gu))
        : e === "focusout" && Zl();
}
function op(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Bi(hr);
}
function sp(e, t) {
    if (e === "click") return Bi(t);
}
function lp(e, t) {
    if (e === "input" || e === "change") return Bi(t);
}
function ap(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var et = typeof Object.is == "function" ? Object.is : ap;
function mr(e, t) {
    if (et(e, t)) return !0;
    if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
    )
        return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!jo.call(t, i) || !et(e[i], t[i])) return !1;
    }
    return !0;
}
function ea(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
}
function ta(e, t) {
    var n = ea(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t))
                return { node: n, offset: t - e };
            e = r;
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e;
                }
                n = n.parentNode;
            }
            n = void 0;
        }
        n = ea(n);
    }
}
function Yu(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
            ? Yu(e, t.parentNode)
            : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
            ? !!(e.compareDocumentPosition(t) & 16)
            : !1
        : !1;
}
function Xu() {
    for (var e = window, t = ci(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string";
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = ci(e.document);
    }
    return t;
}
function Hs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
        t &&
        ((t === "input" &&
            (e.type === "text" ||
                e.type === "search" ||
                e.type === "tel" ||
                e.type === "url" ||
                e.type === "password")) ||
            t === "textarea" ||
            e.contentEditable === "true")
    );
}
function up(e) {
    var t = Xu(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (
        t !== n &&
        n &&
        n.ownerDocument &&
        Yu(n.ownerDocument.documentElement, n)
    ) {
        if (r !== null && Hs(n)) {
            if (
                ((t = r.start),
                (e = r.end),
                e === void 0 && (e = t),
                "selectionStart" in n)
            )
                (n.selectionStart = t),
                    (n.selectionEnd = Math.min(e, n.value.length));
            else if (
                ((e =
                    ((t = n.ownerDocument || document) && t.defaultView) ||
                    window),
                e.getSelection)
            ) {
                e = e.getSelection();
                var i = n.textContent.length,
                    o = Math.min(r.start, i);
                (r = r.end === void 0 ? o : Math.min(r.end, i)),
                    !e.extend && o > r && ((i = r), (r = o), (o = i)),
                    (i = ta(n, o));
                var s = ta(n, r);
                i &&
                    s &&
                    (e.rangeCount !== 1 ||
                        e.anchorNode !== i.node ||
                        e.anchorOffset !== i.offset ||
                        e.focusNode !== s.node ||
                        e.focusOffset !== s.offset) &&
                    ((t = t.createRange()),
                    t.setStart(i.node, i.offset),
                    e.removeAllRanges(),
                    o > r
                        ? (e.addRange(t), e.extend(s.node, s.offset))
                        : (t.setEnd(s.node, s.offset), e.addRange(t)));
            }
        }
        for (t = [], e = n; (e = e.parentNode); )
            e.nodeType === 1 &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
            typeof n.focus == "function" && n.focus(), n = 0;
            n < t.length;
            n++
        )
            (e = t[n]),
                (e.element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
    }
}
var cp = gt && "documentMode" in document && 11 >= document.documentMode,
    cn = null,
    Wo = null,
    rr = null,
    Ko = !1;
function na(e, t, n) {
    var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ko ||
        cn == null ||
        cn !== ci(r) ||
        ((r = cn),
        "selectionStart" in r && Hs(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : ((r = (
                  (r.ownerDocument && r.ownerDocument.defaultView) ||
                  window
              ).getSelection()),
              (r = {
                  anchorNode: r.anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
              })),
        (rr && mr(rr, r)) ||
            ((rr = r),
            (r = gi(Wo, "onSelect")),
            0 < r.length &&
                ((t = new qs("onSelect", "select", null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = cn))));
}
function Br(e, t) {
    var n = {};
    return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
    );
}
var dn = {
        animationend: Br("Animation", "AnimationEnd"),
        animationiteration: Br("Animation", "AnimationIteration"),
        animationstart: Br("Animation", "AnimationStart"),
        transitionend: Br("Transition", "TransitionEnd"),
    },
    uo = {},
    Zu = {};
gt &&
    ((Zu = document.createElement("div").style),
    "AnimationEvent" in window ||
        (delete dn.animationend.animation,
        delete dn.animationiteration.animation,
        delete dn.animationstart.animation),
    "TransitionEvent" in window || delete dn.transitionend.transition);
function Di(e) {
    if (uo[e]) return uo[e];
    if (!dn[e]) return e;
    var t = dn[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in Zu) return (uo[e] = t[n]);
    return e;
}
var ec = Di("animationend"),
    tc = Di("animationiteration"),
    nc = Di("animationstart"),
    rc = Di("transitionend"),
    ic = new Map(),
    ra =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
            " "
        );
function Dt(e, t) {
    ic.set(e, t), nn(t, [e]);
}
for (var co = 0; co < ra.length; co++) {
    var fo = ra[co],
        dp = fo.toLowerCase(),
        fp = fo[0].toUpperCase() + fo.slice(1);
    Dt(dp, "on" + fp);
}
Dt(ec, "onAnimationEnd");
Dt(tc, "onAnimationIteration");
Dt(nc, "onAnimationStart");
Dt("dblclick", "onDoubleClick");
Dt("focusin", "onFocus");
Dt("focusout", "onBlur");
Dt(rc, "onTransitionEnd");
An("onMouseEnter", ["mouseout", "mouseover"]);
An("onMouseLeave", ["mouseout", "mouseover"]);
An("onPointerEnter", ["pointerout", "pointerover"]);
An("onPointerLeave", ["pointerout", "pointerover"]);
nn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
        " "
    )
);
nn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
    )
);
nn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
nn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
nn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
nn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Yn =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
            " "
        ),
    pp = new Set(
        "cancel close invalid load scroll toggle".split(" ").concat(Yn)
    );
function ia(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), df(r, t, void 0, e), (e.currentTarget = null);
}
function oc(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            i = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var s = r.length - 1; 0 <= s; s--) {
                    var a = r[s],
                        u = a.instance,
                        f = a.currentTarget;
                    if (((a = a.listener), u !== o && i.isPropagationStopped()))
                        break e;
                    ia(i, a, f), (o = u);
                }
            else
                for (s = 0; s < r.length; s++) {
                    if (
                        ((a = r[s]),
                        (u = a.instance),
                        (f = a.currentTarget),
                        (a = a.listener),
                        u !== o && i.isPropagationStopped())
                    )
                        break e;
                    ia(i, a, f), (o = u);
                }
        }
    }
    if (fi) throw ((e = Vo), (fi = !1), (Vo = null), e);
}
function Y(e, t) {
    var n = t[Zo];
    n === void 0 && (n = t[Zo] = new Set());
    var r = e + "__bubble";
    n.has(r) || (sc(t, e, 2, !1), n.add(r));
}
function po(e, t, n) {
    var r = 0;
    t && (r |= 4), sc(n, e, r, t);
}
var Dr = "_reactListening" + Math.random().toString(36).slice(2);
function yr(e) {
    if (!e[Dr]) {
        (e[Dr] = !0),
            pu.forEach(function (n) {
                n !== "selectionchange" &&
                    (pp.has(n) || po(n, !1, e), po(n, !0, e));
            });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Dr] || ((t[Dr] = !0), po("selectionchange", !1, t));
    }
}
function sc(e, t, n, r) {
    switch (Vu(t)) {
        case 1:
            var i = Nf;
            break;
        case 4:
            i = jf;
            break;
        default:
            i = bs;
    }
    (n = i.bind(null, t, n, e)),
        (i = void 0),
        !qo ||
            (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
            (i = !0),
        r
            ? i !== void 0
                ? e.addEventListener(t, n, { capture: !0, passive: i })
                : e.addEventListener(t, n, !0)
            : i !== void 0
            ? e.addEventListener(t, n, { passive: i })
            : e.addEventListener(t, n, !1);
}
function ho(e, t, n, r, i) {
    var o = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (;;) {
            if (r === null) return;
            var s = r.tag;
            if (s === 3 || s === 4) {
                var a = r.stateNode.containerInfo;
                if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
                if (s === 4)
                    for (s = r.return; s !== null; ) {
                        var u = s.tag;
                        if (
                            (u === 3 || u === 4) &&
                            ((u = s.stateNode.containerInfo),
                            u === i || (u.nodeType === 8 && u.parentNode === i))
                        )
                            return;
                        s = s.return;
                    }
                for (; a !== null; ) {
                    if (((s = Ht(a)), s === null)) return;
                    if (((u = s.tag), u === 5 || u === 6)) {
                        r = o = s;
                        continue e;
                    }
                    a = a.parentNode;
                }
            }
            r = r.return;
        }
    Ru(function () {
        var f = o,
            g = Fs(n),
            h = [];
        e: {
            var m = ic.get(e);
            if (m !== void 0) {
                var y = qs,
                    A = e;
                switch (e) {
                    case "keypress":
                        if (Zr(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        y = Vf;
                        break;
                    case "focusin":
                        (A = "focus"), (y = so);
                        break;
                    case "focusout":
                        (A = "blur"), (y = so);
                        break;
                    case "beforeblur":
                    case "afterblur":
                        y = so;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        y = $l;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        y = _f;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        y = $f;
                        break;
                    case ec:
                    case tc:
                    case nc:
                        y = If;
                        break;
                    case rc:
                        y = Kf;
                        break;
                    case "scroll":
                        y = Rf;
                        break;
                    case "wheel":
                        y = Gf;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        y = Ff;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        y = Kl;
                }
                var P = (t & 4) !== 0,
                    B = !P && e === "scroll",
                    d = P ? (m !== null ? m + "Capture" : null) : m;
                P = [];
                for (var c = f, p; c !== null; ) {
                    p = c;
                    var k = p.stateNode;
                    if (
                        (p.tag === 5 &&
                            k !== null &&
                            ((p = k),
                            d !== null &&
                                ((k = cr(c, d)),
                                k != null && P.push(gr(c, k, p)))),
                        B)
                    )
                        break;
                    c = c.return;
                }
                0 < P.length &&
                    ((m = new y(m, A, null, n, g)),
                    h.push({ event: m, listeners: P }));
            }
        }
        if (!(t & 7)) {
            e: {
                if (
                    ((m = e === "mouseover" || e === "pointerover"),
                    (y = e === "mouseout" || e === "pointerout"),
                    m &&
                        n !== bo &&
                        (A = n.relatedTarget || n.fromElement) &&
                        (Ht(A) || A[vt]))
                )
                    break e;
                if (
                    (y || m) &&
                    ((m =
                        g.window === g
                            ? g
                            : (m = g.ownerDocument)
                            ? m.defaultView || m.parentWindow
                            : window),
                    y
                        ? ((A = n.relatedTarget || n.toElement),
                          (y = f),
                          (A = A ? Ht(A) : null),
                          A !== null &&
                              ((B = rn(A)),
                              A !== B || (A.tag !== 5 && A.tag !== 6)) &&
                              (A = null))
                        : ((y = null), (A = f)),
                    y !== A)
                ) {
                    if (
                        ((P = $l),
                        (k = "onMouseLeave"),
                        (d = "onMouseEnter"),
                        (c = "mouse"),
                        (e === "pointerout" || e === "pointerover") &&
                            ((P = Kl),
                            (k = "onPointerLeave"),
                            (d = "onPointerEnter"),
                            (c = "pointer")),
                        (B = y == null ? m : fn(y)),
                        (p = A == null ? m : fn(A)),
                        (m = new P(k, c + "leave", y, n, g)),
                        (m.target = B),
                        (m.relatedTarget = p),
                        (k = null),
                        Ht(g) === f &&
                            ((P = new P(d, c + "enter", A, n, g)),
                            (P.target = p),
                            (P.relatedTarget = B),
                            (k = P)),
                        (B = k),
                        y && A)
                    )
                        t: {
                            for (P = y, d = A, c = 0, p = P; p; p = on(p)) c++;
                            for (p = 0, k = d; k; k = on(k)) p++;
                            for (; 0 < c - p; ) (P = on(P)), c--;
                            for (; 0 < p - c; ) (d = on(d)), p--;
                            for (; c--; ) {
                                if (
                                    P === d ||
                                    (d !== null && P === d.alternate)
                                )
                                    break t;
                                (P = on(P)), (d = on(d));
                            }
                            P = null;
                        }
                    else P = null;
                    y !== null && oa(h, m, y, P, !1),
                        A !== null && B !== null && oa(h, B, A, P, !0);
                }
            }
            e: {
                if (
                    ((m = f ? fn(f) : window),
                    (y = m.nodeName && m.nodeName.toLowerCase()),
                    y === "select" || (y === "input" && m.type === "file"))
                )
                    var v = rp;
                else if (Yl(m))
                    if (Qu) v = lp;
                    else {
                        v = op;
                        var C = ip;
                    }
                else
                    (y = m.nodeName) &&
                        y.toLowerCase() === "input" &&
                        (m.type === "checkbox" || m.type === "radio") &&
                        (v = sp);
                if (v && (v = v(e, f))) {
                    Ku(h, v, n, g);
                    break e;
                }
                C && C(e, m, f),
                    e === "focusout" &&
                        (C = m._wrapperState) &&
                        C.controlled &&
                        m.type === "number" &&
                        Mo(m, "number", m.value);
            }
            switch (((C = f ? fn(f) : window), e)) {
                case "focusin":
                    (Yl(C) || C.contentEditable === "true") &&
                        ((cn = C), (Wo = f), (rr = null));
                    break;
                case "focusout":
                    rr = Wo = cn = null;
                    break;
                case "mousedown":
                    Ko = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    (Ko = !1), na(h, n, g);
                    break;
                case "selectionchange":
                    if (cp) break;
                case "keydown":
                case "keyup":
                    na(h, n, g);
            }
            var w;
            if (Js)
                e: {
                    switch (e) {
                        case "compositionstart":
                            var T = "onCompositionStart";
                            break e;
                        case "compositionend":
                            T = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            T = "onCompositionUpdate";
                            break e;
                    }
                    T = void 0;
                }
            else
                un
                    ? $u(e, n) && (T = "onCompositionEnd")
                    : e === "keydown" &&
                      n.keyCode === 229 &&
                      (T = "onCompositionStart");
            T &&
                (Hu &&
                    n.locale !== "ko" &&
                    (un || T !== "onCompositionStart"
                        ? T === "onCompositionEnd" && un && (w = Ju())
                        : ((Nt = g),
                          (Us = "value" in Nt ? Nt.value : Nt.textContent),
                          (un = !0))),
                (C = gi(f, T)),
                0 < C.length &&
                    ((T = new Wl(T, e, null, n, g)),
                    h.push({ event: T, listeners: C }),
                    w
                        ? (T.data = w)
                        : ((w = Wu(n)), w !== null && (T.data = w)))),
                (w = Xf ? Zf(e, n) : ep(e, n)) &&
                    ((f = gi(f, "onBeforeInput")),
                    0 < f.length &&
                        ((g = new Wl(
                            "onBeforeInput",
                            "beforeinput",
                            null,
                            n,
                            g
                        )),
                        h.push({ event: g, listeners: f }),
                        (g.data = w)));
        }
        oc(h, t);
    });
}
function gr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function gi(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var i = e,
            o = i.stateNode;
        i.tag === 5 &&
            o !== null &&
            ((i = o),
            (o = cr(e, n)),
            o != null && r.unshift(gr(e, o, i)),
            (o = cr(e, t)),
            o != null && r.push(gr(e, o, i))),
            (e = e.return);
    }
    return r;
}
function on(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function oa(e, t, n, r, i) {
    for (var o = t._reactName, s = []; n !== null && n !== r; ) {
        var a = n,
            u = a.alternate,
            f = a.stateNode;
        if (u !== null && u === r) break;
        a.tag === 5 &&
            f !== null &&
            ((a = f),
            i
                ? ((u = cr(n, o)), u != null && s.unshift(gr(n, u, a)))
                : i || ((u = cr(n, o)), u != null && s.push(gr(n, u, a)))),
            (n = n.return);
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
}
var hp = /\r\n?/g,
    mp = /\u0000|\uFFFD/g;
function sa(e) {
    return (typeof e == "string" ? e : "" + e)
        .replace(
            hp,
            `
`
        )
        .replace(mp, "");
}
function br(e, t, n) {
    if (((t = sa(t)), sa(e) !== t && n)) throw Error(E(425));
}
function vi() {}
var Qo = null,
    Go = null;
function Yo(e, t) {
    return (
        e === "textarea" ||
        e === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
    );
}
var Xo = typeof setTimeout == "function" ? setTimeout : void 0,
    yp = typeof clearTimeout == "function" ? clearTimeout : void 0,
    la = typeof Promise == "function" ? Promise : void 0,
    gp =
        typeof queueMicrotask == "function"
            ? queueMicrotask
            : typeof la < "u"
            ? function (e) {
                  return la.resolve(null).then(e).catch(vp);
              }
            : Xo;
function vp(e) {
    setTimeout(function () {
        throw e;
    });
}
function mo(e, t) {
    var n = t,
        r = 0;
    do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8))
            if (((n = i.data), n === "/$")) {
                if (r === 0) {
                    e.removeChild(i), pr(t);
                    return;
                }
                r--;
            } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
        n = i;
    } while (n);
    pr(t);
}
function Lt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
            if (t === "/$") return null;
        }
    }
    return e;
}
function aa(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--;
            } else n === "/$" && t++;
        }
        e = e.previousSibling;
    }
    return null;
}
var Mn = Math.random().toString(36).slice(2),
    ot = "__reactFiber$" + Mn,
    vr = "__reactProps$" + Mn,
    vt = "__reactContainer$" + Mn,
    Zo = "__reactEvents$" + Mn,
    wp = "__reactListeners$" + Mn,
    Sp = "__reactHandles$" + Mn;
function Ht(e) {
    var t = e[ot];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
        if ((t = n[vt] || n[ot])) {
            if (
                ((n = t.alternate),
                t.child !== null || (n !== null && n.child !== null))
            )
                for (e = aa(e); e !== null; ) {
                    if ((n = e[ot])) return n;
                    e = aa(e);
                }
            return t;
        }
        (e = n), (n = e.parentNode);
    }
    return null;
}
function jr(e) {
    return (
        (e = e[ot] || e[vt]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
            ? null
            : e
    );
}
function fn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(E(33));
}
function bi(e) {
    return e[vr] || null;
}
var es = [],
    pn = -1;
function bt(e) {
    return { current: e };
}
function X(e) {
    0 > pn || ((e.current = es[pn]), (es[pn] = null), pn--);
}
function G(e, t) {
    pn++, (es[pn] = e.current), (e.current = t);
}
var Bt = {},
    Se = bt(Bt),
    je = bt(!1),
    Yt = Bt;
function Nn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Bt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var i = {},
        o;
    for (o in n) i[o] = t[o];
    return (
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = i)),
        i
    );
}
function Re(e) {
    return (e = e.childContextTypes), e != null;
}
function wi() {
    X(je), X(Se);
}
function ua(e, t, n) {
    if (Se.current !== Bt) throw Error(E(168));
    G(Se, t), G(je, n);
}
function lc(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
        return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(E(108, rf(e) || "Unknown", i));
    return ne({}, n, r);
}
function Si(e) {
    return (
        (e =
            ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
            Bt),
        (Yt = Se.current),
        G(Se, e),
        G(je, je.current),
        !0
    );
}
function ca(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(E(169));
    n
        ? ((e = lc(e, t, Yt)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          X(je),
          X(Se),
          G(Se, e))
        : X(je),
        G(je, n);
}
var pt = null,
    Ui = !1,
    yo = !1;
function ac(e) {
    pt === null ? (pt = [e]) : pt.push(e);
}
function kp(e) {
    (Ui = !0), ac(e);
}
function Ut() {
    if (!yo && pt !== null) {
        yo = !0;
        var e = 0,
            t = Q;
        try {
            var n = pt;
            for (Q = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null);
            }
            (pt = null), (Ui = !1);
        } catch (i) {
            throw (pt !== null && (pt = pt.slice(e + 1)), Ou(zs, Ut), i);
        } finally {
            (Q = t), (yo = !1);
        }
    }
    return null;
}
var hn = [],
    mn = 0,
    ki = null,
    xi = 0,
    De = [],
    be = 0,
    Xt = null,
    ht = 1,
    mt = "";
function Vt(e, t) {
    (hn[mn++] = xi), (hn[mn++] = ki), (ki = e), (xi = t);
}
function uc(e, t, n) {
    (De[be++] = ht), (De[be++] = mt), (De[be++] = Xt), (Xt = e);
    var r = ht;
    e = mt;
    var i = 32 - Xe(r) - 1;
    (r &= ~(1 << i)), (n += 1);
    var o = 32 - Xe(t) + i;
    if (30 < o) {
        var s = i - (i % 5);
        (o = (r & ((1 << s) - 1)).toString(32)),
            (r >>= s),
            (i -= s),
            (ht = (1 << (32 - Xe(t) + i)) | (n << i) | r),
            (mt = o + e);
    } else (ht = (1 << o) | (n << i) | r), (mt = e);
}
function $s(e) {
    e.return !== null && (Vt(e, 1), uc(e, 1, 0));
}
function Ws(e) {
    for (; e === ki; )
        (ki = hn[--mn]), (hn[mn] = null), (xi = hn[--mn]), (hn[mn] = null);
    for (; e === Xt; )
        (Xt = De[--be]),
            (De[be] = null),
            (mt = De[--be]),
            (De[be] = null),
            (ht = De[--be]),
            (De[be] = null);
}
var Ie = null,
    Oe = null,
    Z = !1,
    Ye = null;
function cc(e, t) {
    var n = qe(5, null, null, 0);
    (n.elementType = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function da(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return (
                (t =
                    t.nodeType !== 1 ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                        ? null
                        : t),
                t !== null
                    ? ((e.stateNode = t), (Ie = e), (Oe = Lt(t.firstChild)), !0)
                    : !1
            );
        case 6:
            return (
                (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (Ie = e), (Oe = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = Xt !== null ? { id: ht, overflow: mt } : null),
                      (e.memoizedState = {
                          dehydrated: t,
                          treeContext: n,
                          retryLane: 1073741824,
                      }),
                      (n = qe(18, null, null, 0)),
                      (n.stateNode = t),
                      (n.return = e),
                      (e.child = n),
                      (Ie = e),
                      (Oe = null),
                      !0)
                    : !1
            );
        default:
            return !1;
    }
}
function ts(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ns(e) {
    if (Z) {
        var t = Oe;
        if (t) {
            var n = t;
            if (!da(e, t)) {
                if (ts(e)) throw Error(E(418));
                t = Lt(n.nextSibling);
                var r = Ie;
                t && da(e, t)
                    ? cc(r, n)
                    : ((e.flags = (e.flags & -4097) | 2), (Z = !1), (Ie = e));
            }
        } else {
            if (ts(e)) throw Error(E(418));
            (e.flags = (e.flags & -4097) | 2), (Z = !1), (Ie = e);
        }
    }
}
function fa(e) {
    for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
        e = e.return;
    Ie = e;
}
function Ur(e) {
    if (e !== Ie) return !1;
    if (!Z) return fa(e), (Z = !0), !1;
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type),
            (t = t !== "head" && t !== "body" && !Yo(e.type, e.memoizedProps))),
        t && (t = Oe))
    ) {
        if (ts(e)) throw (dc(), Error(E(418)));
        for (; t; ) cc(e, t), (t = Lt(t.nextSibling));
    }
    if ((fa(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
            throw Error(E(317));
        e: {
            for (e = e.nextSibling, t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Oe = Lt(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
                }
                e = e.nextSibling;
            }
            Oe = null;
        }
    } else Oe = Ie ? Lt(e.stateNode.nextSibling) : null;
    return !0;
}
function dc() {
    for (var e = Oe; e; ) e = Lt(e.nextSibling);
}
function jn() {
    (Oe = Ie = null), (Z = !1);
}
function Ks(e) {
    Ye === null ? (Ye = [e]) : Ye.push(e);
}
var xp = kt.ReactCurrentBatchConfig;
function Ke(e, t) {
    if (e && e.defaultProps) {
        (t = ne({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
var Pi = bt(null),
    Ci = null,
    yn = null,
    Qs = null;
function Gs() {
    Qs = yn = Ci = null;
}
function Ys(e) {
    var t = Pi.current;
    X(Pi), (e._currentValue = t);
}
function rs(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if (
            ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
                : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
        )
            break;
        e = e.return;
    }
}
function Pn(e, t) {
    (Ci = e),
        (Qs = yn = null),
        (e = e.dependencies),
        e !== null &&
            e.firstContext !== null &&
            (e.lanes & t && (Ne = !0), (e.firstContext = null));
}
function Je(e) {
    var t = e._currentValue;
    if (Qs !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), yn === null)) {
            if (Ci === null) throw Error(E(308));
            (yn = e), (Ci.dependencies = { lanes: 0, firstContext: e });
        } else yn = yn.next = e;
    return t;
}
var $t = null;
function Xs(e) {
    $t === null ? ($t = [e]) : $t.push(e);
}
function fc(e, t, n, r) {
    var i = t.interleaved;
    return (
        i === null ? ((n.next = n), Xs(t)) : ((n.next = i.next), (i.next = n)),
        (t.interleaved = n),
        wt(e, r)
    );
}
function wt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        (e.childLanes |= t),
            (n = e.alternate),
            n !== null && (n.childLanes |= t),
            (n = e),
            (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
}
var Ct = !1;
function Zs(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
    };
}
function pc(e, t) {
    (e = e.updateQueue),
        t.updateQueue === e &&
            (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
            });
}
function yt(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
    };
}
function Ot(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), H & 2)) {
        var i = r.pending;
        return (
            i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
            (r.pending = t),
            wt(e, n)
        );
    }
    return (
        (i = r.interleaved),
        i === null ? ((t.next = t), Xs(r)) : ((t.next = i.next), (i.next = t)),
        (r.interleaved = t),
        wt(e, n)
    );
}
function ei(e, t, n) {
    if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Bs(e, n);
    }
}
function pa(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
            o = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
            do {
                var s = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null,
                };
                o === null ? (i = o = s) : (o = o.next = s), (n = n.next);
            } while (n !== null);
            o === null ? (i = o = t) : (o = o.next = t);
        } else i = o = t;
        (n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: o,
            shared: r.shared,
            effects: r.effects,
        }),
            (e.updateQueue = n);
        return;
    }
    (e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t);
}
function Ei(e, t, n, r) {
    var i = e.updateQueue;
    Ct = !1;
    var o = i.firstBaseUpdate,
        s = i.lastBaseUpdate,
        a = i.shared.pending;
    if (a !== null) {
        i.shared.pending = null;
        var u = a,
            f = u.next;
        (u.next = null), s === null ? (o = f) : (s.next = f), (s = u);
        var g = e.alternate;
        g !== null &&
            ((g = g.updateQueue),
            (a = g.lastBaseUpdate),
            a !== s &&
                (a === null ? (g.firstBaseUpdate = f) : (a.next = f),
                (g.lastBaseUpdate = u)));
    }
    if (o !== null) {
        var h = i.baseState;
        (s = 0), (g = f = u = null), (a = o);
        do {
            var m = a.lane,
                y = a.eventTime;
            if ((r & m) === m) {
                g !== null &&
                    (g = g.next =
                        {
                            eventTime: y,
                            lane: 0,
                            tag: a.tag,
                            payload: a.payload,
                            callback: a.callback,
                            next: null,
                        });
                e: {
                    var A = e,
                        P = a;
                    switch (((m = t), (y = n), P.tag)) {
                        case 1:
                            if (((A = P.payload), typeof A == "function")) {
                                h = A.call(y, h, m);
                                break e;
                            }
                            h = A;
                            break e;
                        case 3:
                            A.flags = (A.flags & -65537) | 128;
                        case 0:
                            if (
                                ((A = P.payload),
                                (m =
                                    typeof A == "function"
                                        ? A.call(y, h, m)
                                        : A),
                                m == null)
                            )
                                break e;
                            h = ne({}, h, m);
                            break e;
                        case 2:
                            Ct = !0;
                    }
                }
                a.callback !== null &&
                    a.lane !== 0 &&
                    ((e.flags |= 64),
                    (m = i.effects),
                    m === null ? (i.effects = [a]) : m.push(a));
            } else
                (y = {
                    eventTime: y,
                    lane: m,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null,
                }),
                    g === null ? ((f = g = y), (u = h)) : (g = g.next = y),
                    (s |= m);
            if (((a = a.next), a === null)) {
                if (((a = i.shared.pending), a === null)) break;
                (m = a),
                    (a = m.next),
                    (m.next = null),
                    (i.lastBaseUpdate = m),
                    (i.shared.pending = null);
            }
        } while (1);
        if (
            (g === null && (u = h),
            (i.baseState = u),
            (i.firstBaseUpdate = f),
            (i.lastBaseUpdate = g),
            (t = i.shared.interleaved),
            t !== null)
        ) {
            i = t;
            do (s |= i.lane), (i = i.next);
            while (i !== t);
        } else o === null && (i.shared.lanes = 0);
        (en |= s), (e.lanes = s), (e.memoizedState = h);
    }
}
function ha(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                i = r.callback;
            if (i !== null) {
                if (((r.callback = null), (r = n), typeof i != "function"))
                    throw Error(E(191, i));
                i.call(r);
            }
        }
}
var hc = new fu.Component().refs;
function is(e, t, n, r) {
    (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : ne({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
}
var qi = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? rn(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = xe(),
            i = Mt(e),
            o = yt(r, i);
        (o.payload = t),
            n != null && (o.callback = n),
            (t = Ot(e, o, i)),
            t !== null && (Ze(t, e, i, r), ei(t, e, i));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = xe(),
            i = Mt(e),
            o = yt(r, i);
        (o.tag = 1),
            (o.payload = t),
            n != null && (o.callback = n),
            (t = Ot(e, o, i)),
            t !== null && (Ze(t, e, i, r), ei(t, e, i));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = xe(),
            r = Mt(e),
            i = yt(n, r);
        (i.tag = 2),
            t != null && (i.callback = t),
            (t = Ot(e, i, r)),
            t !== null && (Ze(t, e, r, n), ei(t, e, r));
    },
};
function ma(e, t, n, r, i, o, s) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
            ? e.shouldComponentUpdate(r, o, s)
            : t.prototype && t.prototype.isPureReactComponent
            ? !mr(n, r) || !mr(i, o)
            : !0
    );
}
function mc(e, t, n) {
    var r = !1,
        i = Bt,
        o = t.contextType;
    return (
        typeof o == "object" && o !== null
            ? (o = Je(o))
            : ((i = Re(t) ? Yt : Se.current),
              (r = t.contextTypes),
              (o = (r = r != null) ? Nn(e, i) : Bt)),
        (t = new t(n, o)),
        (e.memoizedState =
            t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = qi),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = i),
            (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
    );
}
function ya(e, t, n, r) {
    (e = t.state),
        typeof t.componentWillReceiveProps == "function" &&
            t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
            t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && qi.enqueueReplaceState(t, t.state, null);
}
function os(e, t, n, r) {
    var i = e.stateNode;
    (i.props = n), (i.state = e.memoizedState), (i.refs = hc), Zs(e);
    var o = t.contextType;
    typeof o == "object" && o !== null
        ? (i.context = Je(o))
        : ((o = Re(t) ? Yt : Se.current), (i.context = Nn(e, o))),
        (i.state = e.memoizedState),
        (o = t.getDerivedStateFromProps),
        typeof o == "function" && (is(e, t, o, n), (i.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
            typeof i.getSnapshotBeforeUpdate == "function" ||
            (typeof i.UNSAFE_componentWillMount != "function" &&
                typeof i.componentWillMount != "function") ||
            ((t = i.state),
            typeof i.componentWillMount == "function" && i.componentWillMount(),
            typeof i.UNSAFE_componentWillMount == "function" &&
                i.UNSAFE_componentWillMount(),
            t !== i.state && qi.enqueueReplaceState(i, i.state, null),
            Ei(e, n, i, r),
            (i.state = e.memoizedState)),
        typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Jn(e, t, n) {
    if (
        ((e = n.ref),
        e !== null && typeof e != "function" && typeof e != "object")
    ) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(E(309));
                var r = n.stateNode;
            }
            if (!r) throw Error(E(147, e));
            var i = r,
                o = "" + e;
            return t !== null &&
                t.ref !== null &&
                typeof t.ref == "function" &&
                t.ref._stringRef === o
                ? t.ref
                : ((t = function (s) {
                      var a = i.refs;
                      a === hc && (a = i.refs = {}),
                          s === null ? delete a[o] : (a[o] = s);
                  }),
                  (t._stringRef = o),
                  t);
        }
        if (typeof e != "string") throw Error(E(284));
        if (!n._owner) throw Error(E(290, e));
    }
    return e;
}
function qr(e, t) {
    throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
            E(
                31,
                e === "[object Object]"
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : e
            )
        ))
    );
}
function ga(e) {
    var t = e._init;
    return t(e._payload);
}
function yc(e) {
    function t(d, c) {
        if (e) {
            var p = d.deletions;
            p === null ? ((d.deletions = [c]), (d.flags |= 16)) : p.push(c);
        }
    }
    function n(d, c) {
        if (!e) return null;
        for (; c !== null; ) t(d, c), (c = c.sibling);
        return null;
    }
    function r(d, c) {
        for (d = new Map(); c !== null; )
            c.key !== null ? d.set(c.key, c) : d.set(c.index, c),
                (c = c.sibling);
        return d;
    }
    function i(d, c) {
        return (d = Ft(d, c)), (d.index = 0), (d.sibling = null), d;
    }
    function o(d, c, p) {
        return (
            (d.index = p),
            e
                ? ((p = d.alternate),
                  p !== null
                      ? ((p = p.index), p < c ? ((d.flags |= 2), c) : p)
                      : ((d.flags |= 2), c))
                : ((d.flags |= 1048576), c)
        );
    }
    function s(d) {
        return e && d.alternate === null && (d.flags |= 2), d;
    }
    function a(d, c, p, k) {
        return c === null || c.tag !== 6
            ? ((c = Po(p, d.mode, k)), (c.return = d), c)
            : ((c = i(c, p)), (c.return = d), c);
    }
    function u(d, c, p, k) {
        var v = p.type;
        return v === an
            ? g(d, c, p.props.children, k, p.key)
            : c !== null &&
              (c.elementType === v ||
                  (typeof v == "object" &&
                      v !== null &&
                      v.$$typeof === Pt &&
                      ga(v) === c.type))
            ? ((k = i(c, p.props)), (k.ref = Jn(d, c, p)), (k.return = d), k)
            : ((k = si(p.type, p.key, p.props, null, d.mode, k)),
              (k.ref = Jn(d, c, p)),
              (k.return = d),
              k);
    }
    function f(d, c, p, k) {
        return c === null ||
            c.tag !== 4 ||
            c.stateNode.containerInfo !== p.containerInfo ||
            c.stateNode.implementation !== p.implementation
            ? ((c = Co(p, d.mode, k)), (c.return = d), c)
            : ((c = i(c, p.children || [])), (c.return = d), c);
    }
    function g(d, c, p, k, v) {
        return c === null || c.tag !== 7
            ? ((c = Qt(p, d.mode, k, v)), (c.return = d), c)
            : ((c = i(c, p)), (c.return = d), c);
    }
    function h(d, c, p) {
        if ((typeof c == "string" && c !== "") || typeof c == "number")
            return (c = Po("" + c, d.mode, p)), (c.return = d), c;
        if (typeof c == "object" && c !== null) {
            switch (c.$$typeof) {
                case _r:
                    return (
                        (p = si(c.type, c.key, c.props, null, d.mode, p)),
                        (p.ref = Jn(d, null, c)),
                        (p.return = d),
                        p
                    );
                case ln:
                    return (c = Co(c, d.mode, p)), (c.return = d), c;
                case Pt:
                    var k = c._init;
                    return h(d, k(c._payload), p);
            }
            if (Qn(c) || Dn(c))
                return (c = Qt(c, d.mode, p, null)), (c.return = d), c;
            qr(d, c);
        }
        return null;
    }
    function m(d, c, p, k) {
        var v = c !== null ? c.key : null;
        if ((typeof p == "string" && p !== "") || typeof p == "number")
            return v !== null ? null : a(d, c, "" + p, k);
        if (typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
                case _r:
                    return p.key === v ? u(d, c, p, k) : null;
                case ln:
                    return p.key === v ? f(d, c, p, k) : null;
                case Pt:
                    return (v = p._init), m(d, c, v(p._payload), k);
            }
            if (Qn(p) || Dn(p)) return v !== null ? null : g(d, c, p, k, null);
            qr(d, p);
        }
        return null;
    }
    function y(d, c, p, k, v) {
        if ((typeof k == "string" && k !== "") || typeof k == "number")
            return (d = d.get(p) || null), a(c, d, "" + k, v);
        if (typeof k == "object" && k !== null) {
            switch (k.$$typeof) {
                case _r:
                    return (
                        (d = d.get(k.key === null ? p : k.key) || null),
                        u(c, d, k, v)
                    );
                case ln:
                    return (
                        (d = d.get(k.key === null ? p : k.key) || null),
                        f(c, d, k, v)
                    );
                case Pt:
                    var C = k._init;
                    return y(d, c, p, C(k._payload), v);
            }
            if (Qn(k) || Dn(k))
                return (d = d.get(p) || null), g(c, d, k, v, null);
            qr(c, k);
        }
        return null;
    }
    function A(d, c, p, k) {
        for (
            var v = null, C = null, w = c, T = (c = 0), U = null;
            w !== null && T < p.length;
            T++
        ) {
            w.index > T ? ((U = w), (w = null)) : (U = w.sibling);
            var F = m(d, w, p[T], k);
            if (F === null) {
                w === null && (w = U);
                break;
            }
            e && w && F.alternate === null && t(d, w),
                (c = o(F, c, T)),
                C === null ? (v = F) : (C.sibling = F),
                (C = F),
                (w = U);
        }
        if (T === p.length) return n(d, w), Z && Vt(d, T), v;
        if (w === null) {
            for (; T < p.length; T++)
                (w = h(d, p[T], k)),
                    w !== null &&
                        ((c = o(w, c, T)),
                        C === null ? (v = w) : (C.sibling = w),
                        (C = w));
            return Z && Vt(d, T), v;
        }
        for (w = r(d, w); T < p.length; T++)
            (U = y(w, d, T, p[T], k)),
                U !== null &&
                    (e &&
                        U.alternate !== null &&
                        w.delete(U.key === null ? T : U.key),
                    (c = o(U, c, T)),
                    C === null ? (v = U) : (C.sibling = U),
                    (C = U));
        return (
            e &&
                w.forEach(function ($) {
                    return t(d, $);
                }),
            Z && Vt(d, T),
            v
        );
    }
    function P(d, c, p, k) {
        var v = Dn(p);
        if (typeof v != "function") throw Error(E(150));
        if (((p = v.call(p)), p == null)) throw Error(E(151));
        for (
            var C = (v = null), w = c, T = (c = 0), U = null, F = p.next();
            w !== null && !F.done;
            T++, F = p.next()
        ) {
            w.index > T ? ((U = w), (w = null)) : (U = w.sibling);
            var $ = m(d, w, F.value, k);
            if ($ === null) {
                w === null && (w = U);
                break;
            }
            e && w && $.alternate === null && t(d, w),
                (c = o($, c, T)),
                C === null ? (v = $) : (C.sibling = $),
                (C = $),
                (w = U);
        }
        if (F.done) return n(d, w), Z && Vt(d, T), v;
        if (w === null) {
            for (; !F.done; T++, F = p.next())
                (F = h(d, F.value, k)),
                    F !== null &&
                        ((c = o(F, c, T)),
                        C === null ? (v = F) : (C.sibling = F),
                        (C = F));
            return Z && Vt(d, T), v;
        }
        for (w = r(d, w); !F.done; T++, F = p.next())
            (F = y(w, d, T, F.value, k)),
                F !== null &&
                    (e &&
                        F.alternate !== null &&
                        w.delete(F.key === null ? T : F.key),
                    (c = o(F, c, T)),
                    C === null ? (v = F) : (C.sibling = F),
                    (C = F));
        return (
            e &&
                w.forEach(function (q) {
                    return t(d, q);
                }),
            Z && Vt(d, T),
            v
        );
    }
    function B(d, c, p, k) {
        if (
            (typeof p == "object" &&
                p !== null &&
                p.type === an &&
                p.key === null &&
                (p = p.props.children),
            typeof p == "object" && p !== null)
        ) {
            switch (p.$$typeof) {
                case _r:
                    e: {
                        for (var v = p.key, C = c; C !== null; ) {
                            if (C.key === v) {
                                if (((v = p.type), v === an)) {
                                    if (C.tag === 7) {
                                        n(d, C.sibling),
                                            (c = i(C, p.props.children)),
                                            (c.return = d),
                                            (d = c);
                                        break e;
                                    }
                                } else if (
                                    C.elementType === v ||
                                    (typeof v == "object" &&
                                        v !== null &&
                                        v.$$typeof === Pt &&
                                        ga(v) === C.type)
                                ) {
                                    n(d, C.sibling),
                                        (c = i(C, p.props)),
                                        (c.ref = Jn(d, C, p)),
                                        (c.return = d),
                                        (d = c);
                                    break e;
                                }
                                n(d, C);
                                break;
                            } else t(d, C);
                            C = C.sibling;
                        }
                        p.type === an
                            ? ((c = Qt(p.props.children, d.mode, k, p.key)),
                              (c.return = d),
                              (d = c))
                            : ((k = si(
                                  p.type,
                                  p.key,
                                  p.props,
                                  null,
                                  d.mode,
                                  k
                              )),
                              (k.ref = Jn(d, c, p)),
                              (k.return = d),
                              (d = k));
                    }
                    return s(d);
                case ln:
                    e: {
                        for (C = p.key; c !== null; ) {
                            if (c.key === C)
                                if (
                                    c.tag === 4 &&
                                    c.stateNode.containerInfo ===
                                        p.containerInfo &&
                                    c.stateNode.implementation ===
                                        p.implementation
                                ) {
                                    n(d, c.sibling),
                                        (c = i(c, p.children || [])),
                                        (c.return = d),
                                        (d = c);
                                    break e;
                                } else {
                                    n(d, c);
                                    break;
                                }
                            else t(d, c);
                            c = c.sibling;
                        }
                        (c = Co(p, d.mode, k)), (c.return = d), (d = c);
                    }
                    return s(d);
                case Pt:
                    return (C = p._init), B(d, c, C(p._payload), k);
            }
            if (Qn(p)) return A(d, c, p, k);
            if (Dn(p)) return P(d, c, p, k);
            qr(d, p);
        }
        return (typeof p == "string" && p !== "") || typeof p == "number"
            ? ((p = "" + p),
              c !== null && c.tag === 6
                  ? (n(d, c.sibling), (c = i(c, p)), (c.return = d), (d = c))
                  : (n(d, c), (c = Po(p, d.mode, k)), (c.return = d), (d = c)),
              s(d))
            : n(d, c);
    }
    return B;
}
var Rn = yc(!0),
    gc = yc(!1),
    Rr = {},
    lt = bt(Rr),
    wr = bt(Rr),
    Sr = bt(Rr);
function Wt(e) {
    if (e === Rr) throw Error(E(174));
    return e;
}
function el(e, t) {
    switch ((G(Sr, t), G(wr, e), G(lt, Rr), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : zo(null, "");
            break;
        default:
            (e = e === 8 ? t.parentNode : t),
                (t = e.namespaceURI || null),
                (e = e.tagName),
                (t = zo(t, e));
    }
    X(lt), G(lt, t);
}
function Tn() {
    X(lt), X(wr), X(Sr);
}
function vc(e) {
    Wt(Sr.current);
    var t = Wt(lt.current),
        n = zo(t, e.type);
    t !== n && (G(wr, e), G(lt, n));
}
function tl(e) {
    wr.current === e && (X(lt), X(wr));
}
var ee = bt(0);
function Ai(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (
                n !== null &&
                ((n = n.dehydrated),
                n === null || n.data === "$?" || n.data === "$!")
            )
                return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t;
        } else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
}
var go = [];
function nl() {
    for (var e = 0; e < go.length; e++)
        go[e]._workInProgressVersionPrimary = null;
    go.length = 0;
}
var ti = kt.ReactCurrentDispatcher,
    vo = kt.ReactCurrentBatchConfig,
    Zt = 0,
    te = null,
    ae = null,
    ce = null,
    Ni = !1,
    ir = !1,
    kr = 0,
    Pp = 0;
function ge() {
    throw Error(E(321));
}
function rl(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!et(e[n], t[n])) return !1;
    return !0;
}
function il(e, t, n, r, i, o) {
    if (
        ((Zt = o),
        (te = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (ti.current = e === null || e.memoizedState === null ? Np : jp),
        (e = n(r, i)),
        ir)
    ) {
        o = 0;
        do {
            if (((ir = !1), (kr = 0), 25 <= o)) throw Error(E(301));
            (o += 1),
                (ce = ae = null),
                (t.updateQueue = null),
                (ti.current = Rp),
                (e = n(r, i));
        } while (ir);
    }
    if (
        ((ti.current = ji),
        (t = ae !== null && ae.next !== null),
        (Zt = 0),
        (ce = ae = te = null),
        (Ni = !1),
        t)
    )
        throw Error(E(300));
    return e;
}
function ol() {
    var e = kr !== 0;
    return (kr = 0), e;
}
function it() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
    };
    return ce === null ? (te.memoizedState = ce = e) : (ce = ce.next = e), ce;
}
function He() {
    if (ae === null) {
        var e = te.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = ae.next;
    var t = ce === null ? te.memoizedState : ce.next;
    if (t !== null) (ce = t), (ae = e);
    else {
        if (e === null) throw Error(E(310));
        (ae = e),
            (e = {
                memoizedState: ae.memoizedState,
                baseState: ae.baseState,
                baseQueue: ae.baseQueue,
                queue: ae.queue,
                next: null,
            }),
            ce === null ? (te.memoizedState = ce = e) : (ce = ce.next = e);
    }
    return ce;
}
function xr(e, t) {
    return typeof t == "function" ? t(e) : t;
}
function wo(e) {
    var t = He(),
        n = t.queue;
    if (n === null) throw Error(E(311));
    n.lastRenderedReducer = e;
    var r = ae,
        i = r.baseQueue,
        o = n.pending;
    if (o !== null) {
        if (i !== null) {
            var s = i.next;
            (i.next = o.next), (o.next = s);
        }
        (r.baseQueue = i = o), (n.pending = null);
    }
    if (i !== null) {
        (o = i.next), (r = r.baseState);
        var a = (s = null),
            u = null,
            f = o;
        do {
            var g = f.lane;
            if ((Zt & g) === g)
                u !== null &&
                    (u = u.next =
                        {
                            lane: 0,
                            action: f.action,
                            hasEagerState: f.hasEagerState,
                            eagerState: f.eagerState,
                            next: null,
                        }),
                    (r = f.hasEagerState ? f.eagerState : e(r, f.action));
            else {
                var h = {
                    lane: g,
                    action: f.action,
                    hasEagerState: f.hasEagerState,
                    eagerState: f.eagerState,
                    next: null,
                };
                u === null ? ((a = u = h), (s = r)) : (u = u.next = h),
                    (te.lanes |= g),
                    (en |= g);
            }
            f = f.next;
        } while (f !== null && f !== o);
        u === null ? (s = r) : (u.next = a),
            et(r, t.memoizedState) || (Ne = !0),
            (t.memoizedState = r),
            (t.baseState = s),
            (t.baseQueue = u),
            (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
        i = e;
        do (o = i.lane), (te.lanes |= o), (en |= o), (i = i.next);
        while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function So(e) {
    var t = He(),
        n = t.queue;
    if (n === null) throw Error(E(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        i = n.pending,
        o = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var s = (i = i.next);
        do (o = e(o, s.action)), (s = s.next);
        while (s !== i);
        et(o, t.memoizedState) || (Ne = !0),
            (t.memoizedState = o),
            t.baseQueue === null && (t.baseState = o),
            (n.lastRenderedState = o);
    }
    return [o, r];
}
function wc() {}
function Sc(e, t) {
    var n = te,
        r = He(),
        i = t(),
        o = !et(r.memoizedState, i);
    if (
        (o && ((r.memoizedState = i), (Ne = !0)),
        (r = r.queue),
        sl(Pc.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || o || (ce !== null && ce.memoizedState.tag & 1))
    ) {
        if (
            ((n.flags |= 2048),
            Pr(9, xc.bind(null, n, r, i, t), void 0, null),
            de === null)
        )
            throw Error(E(349));
        Zt & 30 || kc(n, t, i);
    }
    return i;
}
function kc(e, t, n) {
    (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = te.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (te.updateQueue = t),
              (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function xc(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), Cc(t) && Ec(e);
}
function Pc(e, t, n) {
    return n(function () {
        Cc(t) && Ec(e);
    });
}
function Cc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !et(e, n);
    } catch {
        return !0;
    }
}
function Ec(e) {
    var t = wt(e, 1);
    t !== null && Ze(t, e, 1, -1);
}
function va(e) {
    var t = it();
    return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: xr,
            lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = Ap.bind(null, te, e)),
        [t.memoizedState, e]
    );
}
function Pr(e, t, n, r) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = te.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (te.updateQueue = t),
              (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
              n === null
                  ? (t.lastEffect = e.next = e)
                  : ((r = n.next),
                    (n.next = e),
                    (e.next = r),
                    (t.lastEffect = e))),
        e
    );
}
function Ac() {
    return He().memoizedState;
}
function ni(e, t, n, r) {
    var i = it();
    (te.flags |= e),
        (i.memoizedState = Pr(1 | t, n, void 0, r === void 0 ? null : r));
}
function Vi(e, t, n, r) {
    var i = He();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (ae !== null) {
        var s = ae.memoizedState;
        if (((o = s.destroy), r !== null && rl(r, s.deps))) {
            i.memoizedState = Pr(t, n, o, r);
            return;
        }
    }
    (te.flags |= e), (i.memoizedState = Pr(1 | t, n, o, r));
}
function wa(e, t) {
    return ni(8390656, 8, e, t);
}
function sl(e, t) {
    return Vi(2048, 8, e, t);
}
function Nc(e, t) {
    return Vi(4, 2, e, t);
}
function jc(e, t) {
    return Vi(4, 4, e, t);
}
function Rc(e, t) {
    if (typeof t == "function")
        return (
            (e = e()),
            t(e),
            function () {
                t(null);
            }
        );
    if (t != null)
        return (
            (e = e()),
            (t.current = e),
            function () {
                t.current = null;
            }
        );
}
function Tc(e, t, n) {
    return (
        (n = n != null ? n.concat([e]) : null), Vi(4, 4, Rc.bind(null, t, e), n)
    );
}
function ll() {}
function _c(e, t) {
    var n = He();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && rl(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
}
function Lc(e, t) {
    var n = He();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && rl(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Oc(e, t, n) {
    return Zt & 21
        ? (et(n, t) ||
              ((n = Fu()), (te.lanes |= n), (en |= n), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (Ne = !0)),
          (e.memoizedState = n));
}
function Cp(e, t) {
    var n = Q;
    (Q = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = vo.transition;
    vo.transition = {};
    try {
        e(!1), t();
    } finally {
        (Q = n), (vo.transition = r);
    }
}
function Ic() {
    return He().memoizedState;
}
function Ep(e, t, n) {
    var r = Mt(e);
    if (
        ((n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        }),
        Mc(e))
    )
        Fc(t, n);
    else if (((n = fc(e, t, n, r)), n !== null)) {
        var i = xe();
        Ze(n, e, r, i), zc(n, t, r);
    }
}
function Ap(e, t, n) {
    var r = Mt(e),
        i = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        };
    if (Mc(e)) Fc(t, i);
    else {
        var o = e.alternate;
        if (
            e.lanes === 0 &&
            (o === null || o.lanes === 0) &&
            ((o = t.lastRenderedReducer), o !== null)
        )
            try {
                var s = t.lastRenderedState,
                    a = o(s, n);
                if (((i.hasEagerState = !0), (i.eagerState = a), et(a, s))) {
                    var u = t.interleaved;
                    u === null
                        ? ((i.next = i), Xs(t))
                        : ((i.next = u.next), (u.next = i)),
                        (t.interleaved = i);
                    return;
                }
            } catch {
            } finally {
            }
        (n = fc(e, t, i, r)),
            n !== null && ((i = xe()), Ze(n, e, r, i), zc(n, t, r));
    }
}
function Mc(e) {
    var t = e.alternate;
    return e === te || (t !== null && t === te);
}
function Fc(e, t) {
    ir = Ni = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
}
function zc(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Bs(e, n);
    }
}
var ji = {
        readContext: Je,
        useCallback: ge,
        useContext: ge,
        useEffect: ge,
        useImperativeHandle: ge,
        useInsertionEffect: ge,
        useLayoutEffect: ge,
        useMemo: ge,
        useReducer: ge,
        useRef: ge,
        useState: ge,
        useDebugValue: ge,
        useDeferredValue: ge,
        useTransition: ge,
        useMutableSource: ge,
        useSyncExternalStore: ge,
        useId: ge,
        unstable_isNewReconciler: !1,
    },
    Np = {
        readContext: Je,
        useCallback: function (e, t) {
            return (it().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: Je,
        useEffect: wa,
        useImperativeHandle: function (e, t, n) {
            return (
                (n = n != null ? n.concat([e]) : null),
                ni(4194308, 4, Rc.bind(null, t, e), n)
            );
        },
        useLayoutEffect: function (e, t) {
            return ni(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return ni(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = it();
            return (
                (t = t === void 0 ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
            );
        },
        useReducer: function (e, t, n) {
            var r = it();
            return (
                (t = n !== void 0 ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = Ep.bind(null, te, e)),
                [r.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = it();
            return (e = { current: e }), (t.memoizedState = e);
        },
        useState: va,
        useDebugValue: ll,
        useDeferredValue: function (e) {
            return (it().memoizedState = e);
        },
        useTransition: function () {
            var e = va(!1),
                t = e[0];
            return (e = Cp.bind(null, e[1])), (it().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
            var r = te,
                i = it();
            if (Z) {
                if (n === void 0) throw Error(E(407));
                n = n();
            } else {
                if (((n = t()), de === null)) throw Error(E(349));
                Zt & 30 || kc(r, t, n);
            }
            i.memoizedState = n;
            var o = { value: n, getSnapshot: t };
            return (
                (i.queue = o),
                wa(Pc.bind(null, r, o, e), [e]),
                (r.flags |= 2048),
                Pr(9, xc.bind(null, r, o, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = it(),
                t = de.identifierPrefix;
            if (Z) {
                var n = mt,
                    r = ht;
                (n = (r & ~(1 << (32 - Xe(r) - 1))).toString(32) + n),
                    (t = ":" + t + "R" + n),
                    (n = kr++),
                    0 < n && (t += "H" + n.toString(32)),
                    (t += ":");
            } else (n = Pp++), (t = ":" + t + "r" + n.toString(32) + ":");
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
    },
    jp = {
        readContext: Je,
        useCallback: _c,
        useContext: Je,
        useEffect: sl,
        useImperativeHandle: Tc,
        useInsertionEffect: Nc,
        useLayoutEffect: jc,
        useMemo: Lc,
        useReducer: wo,
        useRef: Ac,
        useState: function () {
            return wo(xr);
        },
        useDebugValue: ll,
        useDeferredValue: function (e) {
            var t = He();
            return Oc(t, ae.memoizedState, e);
        },
        useTransition: function () {
            var e = wo(xr)[0],
                t = He().memoizedState;
            return [e, t];
        },
        useMutableSource: wc,
        useSyncExternalStore: Sc,
        useId: Ic,
        unstable_isNewReconciler: !1,
    },
    Rp = {
        readContext: Je,
        useCallback: _c,
        useContext: Je,
        useEffect: sl,
        useImperativeHandle: Tc,
        useInsertionEffect: Nc,
        useLayoutEffect: jc,
        useMemo: Lc,
        useReducer: So,
        useRef: Ac,
        useState: function () {
            return So(xr);
        },
        useDebugValue: ll,
        useDeferredValue: function (e) {
            var t = He();
            return ae === null
                ? (t.memoizedState = e)
                : Oc(t, ae.memoizedState, e);
        },
        useTransition: function () {
            var e = So(xr)[0],
                t = He().memoizedState;
            return [e, t];
        },
        useMutableSource: wc,
        useSyncExternalStore: Sc,
        useId: Ic,
        unstable_isNewReconciler: !1,
    };
function _n(e, t) {
    try {
        var n = "",
            r = t;
        do (n += nf(r)), (r = r.return);
        while (r);
        var i = n;
    } catch (o) {
        i =
            `
Error generating stack: ` +
            o.message +
            `
` +
            o.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
}
function ko(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ss(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var Tp = typeof WeakMap == "function" ? WeakMap : Map;
function Bc(e, t, n) {
    (n = yt(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
        (n.callback = function () {
            Ti || ((Ti = !0), (ys = r)), ss(e, t);
        }),
        n
    );
}
function Dc(e, t, n) {
    (n = yt(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var i = t.value;
        (n.payload = function () {
            return r(i);
        }),
            (n.callback = function () {
                ss(e, t);
            });
    }
    var o = e.stateNode;
    return (
        o !== null &&
            typeof o.componentDidCatch == "function" &&
            (n.callback = function () {
                ss(e, t),
                    typeof r != "function" &&
                        (It === null ? (It = new Set([this])) : It.add(this));
                var s = t.stack;
                this.componentDidCatch(t.value, {
                    componentStack: s !== null ? s : "",
                });
            }),
        n
    );
}
function Sa(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new Tp();
        var i = new Set();
        r.set(t, i);
    } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
    i.has(n) || (i.add(n), (e = Jp.bind(null, e, t, n)), t.then(e, e));
}
function ka(e) {
    do {
        var t;
        if (
            ((t = e.tag === 13) &&
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated !== null : !0)),
            t)
        )
            return e;
        e = e.return;
    } while (e !== null);
    return null;
}
function xa(e, t, n, r, i) {
    return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = i), e)
        : (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 &&
                    (n.alternate === null
                        ? (n.tag = 17)
                        : ((t = yt(-1, 1)), (t.tag = 2), Ot(n, t, 1))),
                (n.lanes |= 1)),
          e);
}
var _p = kt.ReactCurrentOwner,
    Ne = !1;
function ke(e, t, n, r) {
    t.child = e === null ? gc(t, null, n, r) : Rn(t, e.child, n, r);
}
function Pa(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return (
        Pn(t, i),
        (r = il(e, t, n, r, o, i)),
        (n = ol()),
        e !== null && !Ne
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              St(e, t, i))
            : (Z && n && $s(t), (t.flags |= 1), ke(e, t, r, i), t.child)
    );
}
function Ca(e, t, n, r, i) {
    if (e === null) {
        var o = n.type;
        return typeof o == "function" &&
            !ml(o) &&
            o.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = o), bc(e, t, o, r, i))
            : ((e = si(n.type, null, r, t, t.mode, i)),
              (e.ref = t.ref),
              (e.return = t),
              (t.child = e));
    }
    if (((o = e.child), !(e.lanes & i))) {
        var s = o.memoizedProps;
        if (
            ((n = n.compare),
            (n = n !== null ? n : mr),
            n(s, r) && e.ref === t.ref)
        )
            return St(e, t, i);
    }
    return (
        (t.flags |= 1),
        (e = Ft(o, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
    );
}
function bc(e, t, n, r, i) {
    if (e !== null) {
        var o = e.memoizedProps;
        if (mr(o, r) && e.ref === t.ref)
            if (((Ne = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
                e.flags & 131072 && (Ne = !0);
            else return (t.lanes = e.lanes), St(e, t, i);
    }
    return ls(e, t, n, r, i);
}
function Uc(e, t, n) {
    var r = t.pendingProps,
        i = r.children,
        o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
            }),
                G(vn, Le),
                (Le |= n);
        else {
            if (!(n & 1073741824))
                return (
                    (e = o !== null ? o.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null,
                    }),
                    (t.updateQueue = null),
                    G(vn, Le),
                    (Le |= e),
                    null
                );
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
            }),
                (r = o !== null ? o.baseLanes : n),
                G(vn, Le),
                (Le |= r);
        }
    else
        o !== null
            ? ((r = o.baseLanes | n), (t.memoizedState = null))
            : (r = n),
            G(vn, Le),
            (Le |= r);
    return ke(e, t, i, n), t.child;
}
function qc(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
}
function ls(e, t, n, r, i) {
    var o = Re(n) ? Yt : Se.current;
    return (
        (o = Nn(t, o)),
        Pn(t, i),
        (n = il(e, t, n, r, o, i)),
        (r = ol()),
        e !== null && !Ne
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              St(e, t, i))
            : (Z && r && $s(t), (t.flags |= 1), ke(e, t, n, i), t.child)
    );
}
function Ea(e, t, n, r, i) {
    if (Re(n)) {
        var o = !0;
        Si(t);
    } else o = !1;
    if ((Pn(t, i), t.stateNode === null))
        ri(e, t), mc(t, n, r), os(t, n, r, i), (r = !0);
    else if (e === null) {
        var s = t.stateNode,
            a = t.memoizedProps;
        s.props = a;
        var u = s.context,
            f = n.contextType;
        typeof f == "object" && f !== null
            ? (f = Je(f))
            : ((f = Re(n) ? Yt : Se.current), (f = Nn(t, f)));
        var g = n.getDerivedStateFromProps,
            h =
                typeof g == "function" ||
                typeof s.getSnapshotBeforeUpdate == "function";
        h ||
            (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
                typeof s.componentWillReceiveProps != "function") ||
            ((a !== r || u !== f) && ya(t, s, r, f)),
            (Ct = !1);
        var m = t.memoizedState;
        (s.state = m),
            Ei(t, r, s, i),
            (u = t.memoizedState),
            a !== r || m !== u || je.current || Ct
                ? (typeof g == "function" &&
                      (is(t, n, g, r), (u = t.memoizedState)),
                  (a = Ct || ma(t, n, a, r, m, u, f))
                      ? (h ||
                            (typeof s.UNSAFE_componentWillMount != "function" &&
                                typeof s.componentWillMount != "function") ||
                            (typeof s.componentWillMount == "function" &&
                                s.componentWillMount(),
                            typeof s.UNSAFE_componentWillMount == "function" &&
                                s.UNSAFE_componentWillMount()),
                        typeof s.componentDidMount == "function" &&
                            (t.flags |= 4194308))
                      : (typeof s.componentDidMount == "function" &&
                            (t.flags |= 4194308),
                        (t.memoizedProps = r),
                        (t.memoizedState = u)),
                  (s.props = r),
                  (s.state = u),
                  (s.context = f),
                  (r = a))
                : (typeof s.componentDidMount == "function" &&
                      (t.flags |= 4194308),
                  (r = !1));
    } else {
        (s = t.stateNode),
            pc(e, t),
            (a = t.memoizedProps),
            (f = t.type === t.elementType ? a : Ke(t.type, a)),
            (s.props = f),
            (h = t.pendingProps),
            (m = s.context),
            (u = n.contextType),
            typeof u == "object" && u !== null
                ? (u = Je(u))
                : ((u = Re(n) ? Yt : Se.current), (u = Nn(t, u)));
        var y = n.getDerivedStateFromProps;
        (g =
            typeof y == "function" ||
            typeof s.getSnapshotBeforeUpdate == "function") ||
            (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
                typeof s.componentWillReceiveProps != "function") ||
            ((a !== h || m !== u) && ya(t, s, r, u)),
            (Ct = !1),
            (m = t.memoizedState),
            (s.state = m),
            Ei(t, r, s, i);
        var A = t.memoizedState;
        a !== h || m !== A || je.current || Ct
            ? (typeof y == "function" &&
                  (is(t, n, y, r), (A = t.memoizedState)),
              (f = Ct || ma(t, n, f, r, m, A, u) || !1)
                  ? (g ||
                        (typeof s.UNSAFE_componentWillUpdate != "function" &&
                            typeof s.componentWillUpdate != "function") ||
                        (typeof s.componentWillUpdate == "function" &&
                            s.componentWillUpdate(r, A, u),
                        typeof s.UNSAFE_componentWillUpdate == "function" &&
                            s.UNSAFE_componentWillUpdate(r, A, u)),
                    typeof s.componentDidUpdate == "function" && (t.flags |= 4),
                    typeof s.getSnapshotBeforeUpdate == "function" &&
                        (t.flags |= 1024))
                  : (typeof s.componentDidUpdate != "function" ||
                        (a === e.memoizedProps && m === e.memoizedState) ||
                        (t.flags |= 4),
                    typeof s.getSnapshotBeforeUpdate != "function" ||
                        (a === e.memoizedProps && m === e.memoizedState) ||
                        (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = A)),
              (s.props = r),
              (s.state = A),
              (s.context = u),
              (r = f))
            : (typeof s.componentDidUpdate != "function" ||
                  (a === e.memoizedProps && m === e.memoizedState) ||
                  (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != "function" ||
                  (a === e.memoizedProps && m === e.memoizedState) ||
                  (t.flags |= 1024),
              (r = !1));
    }
    return as(e, t, n, r, o, i);
}
function as(e, t, n, r, i, o) {
    qc(e, t);
    var s = (t.flags & 128) !== 0;
    if (!r && !s) return i && ca(t, n, !1), St(e, t, o);
    (r = t.stateNode), (_p.current = t);
    var a =
        s && typeof n.getDerivedStateFromError != "function"
            ? null
            : r.render();
    return (
        (t.flags |= 1),
        e !== null && s
            ? ((t.child = Rn(t, e.child, null, o)),
              (t.child = Rn(t, null, a, o)))
            : ke(e, t, a, o),
        (t.memoizedState = r.state),
        i && ca(t, n, !0),
        t.child
    );
}
function Vc(e) {
    var t = e.stateNode;
    t.pendingContext
        ? ua(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && ua(e, t.context, !1),
        el(e, t.containerInfo);
}
function Aa(e, t, n, r, i) {
    return jn(), Ks(i), (t.flags |= 256), ke(e, t, n, r), t.child;
}
var us = { dehydrated: null, treeContext: null, retryLane: 0 };
function cs(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function Jc(e, t, n) {
    var r = t.pendingProps,
        i = ee.current,
        o = !1,
        s = (t.flags & 128) !== 0,
        a;
    if (
        ((a = s) ||
            (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
        a
            ? ((o = !0), (t.flags &= -129))
            : (e === null || e.memoizedState !== null) && (i |= 1),
        G(ee, i & 1),
        e === null)
    )
        return (
            ns(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
                ? (t.mode & 1
                      ? e.data === "$!"
                          ? (t.lanes = 8)
                          : (t.lanes = 1073741824)
                      : (t.lanes = 1),
                  null)
                : ((s = r.children),
                  (e = r.fallback),
                  o
                      ? ((r = t.mode),
                        (o = t.child),
                        (s = { mode: "hidden", children: s }),
                        !(r & 1) && o !== null
                            ? ((o.childLanes = 0), (o.pendingProps = s))
                            : (o = $i(s, r, 0, null)),
                        (e = Qt(e, r, n, null)),
                        (o.return = t),
                        (e.return = t),
                        (o.sibling = e),
                        (t.child = o),
                        (t.child.memoizedState = cs(n)),
                        (t.memoizedState = us),
                        e)
                      : al(t, s))
        );
    if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
        return Lp(e, t, s, r, a, i, n);
    if (o) {
        (o = r.fallback), (s = t.mode), (i = e.child), (a = i.sibling);
        var u = { mode: "hidden", children: r.children };
        return (
            !(s & 1) && t.child !== i
                ? ((r = t.child),
                  (r.childLanes = 0),
                  (r.pendingProps = u),
                  (t.deletions = null))
                : ((r = Ft(i, u)),
                  (r.subtreeFlags = i.subtreeFlags & 14680064)),
            a !== null
                ? (o = Ft(a, o))
                : ((o = Qt(o, s, n, null)), (o.flags |= 2)),
            (o.return = t),
            (r.return = t),
            (r.sibling = o),
            (t.child = r),
            (r = o),
            (o = t.child),
            (s = e.child.memoizedState),
            (s =
                s === null
                    ? cs(n)
                    : {
                          baseLanes: s.baseLanes | n,
                          cachePool: null,
                          transitions: s.transitions,
                      }),
            (o.memoizedState = s),
            (o.childLanes = e.childLanes & ~n),
            (t.memoizedState = us),
            r
        );
    }
    return (
        (o = e.child),
        (e = o.sibling),
        (r = Ft(o, { mode: "visible", children: r.children })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
            ((n = t.deletions),
            n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
    );
}
function al(e, t) {
    return (
        (t = $i({ mode: "visible", children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
    );
}
function Vr(e, t, n, r) {
    return (
        r !== null && Ks(r),
        Rn(t, e.child, null, n),
        (e = al(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function Lp(e, t, n, r, i, o, s) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (r = ko(Error(E(422)))), Vr(e, t, s, r))
            : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((o = r.fallback),
              (i = t.mode),
              (r = $i({ mode: "visible", children: r.children }, i, 0, null)),
              (o = Qt(o, i, s, null)),
              (o.flags |= 2),
              (r.return = t),
              (o.return = t),
              (r.sibling = o),
              (t.child = r),
              t.mode & 1 && Rn(t, e.child, null, s),
              (t.child.memoizedState = cs(s)),
              (t.memoizedState = us),
              o);
    if (!(t.mode & 1)) return Vr(e, t, s, null);
    if (i.data === "$!") {
        if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
        return (
            (r = a), (o = Error(E(419))), (r = ko(o, r, void 0)), Vr(e, t, s, r)
        );
    }
    if (((a = (s & e.childLanes) !== 0), Ne || a)) {
        if (((r = de), r !== null)) {
            switch (s & -s) {
                case 4:
                    i = 2;
                    break;
                case 16:
                    i = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    i = 32;
                    break;
                case 536870912:
                    i = 268435456;
                    break;
                default:
                    i = 0;
            }
            (i = i & (r.suspendedLanes | s) ? 0 : i),
                i !== 0 &&
                    i !== o.retryLane &&
                    ((o.retryLane = i), wt(e, i), Ze(r, e, i, -1));
        }
        return hl(), (r = ko(Error(E(421)))), Vr(e, t, s, r);
    }
    return i.data === "$?"
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = Hp.bind(null, e)),
          (i._reactRetry = t),
          null)
        : ((e = o.treeContext),
          (Oe = Lt(i.nextSibling)),
          (Ie = t),
          (Z = !0),
          (Ye = null),
          e !== null &&
              ((De[be++] = ht),
              (De[be++] = mt),
              (De[be++] = Xt),
              (ht = e.id),
              (mt = e.overflow),
              (Xt = t)),
          (t = al(t, r.children)),
          (t.flags |= 4096),
          t);
}
function Na(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), rs(e.return, t, n);
}
function xo(e, t, n, r, i) {
    var o = e.memoizedState;
    o === null
        ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: i,
          })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = r),
          (o.tail = n),
          (o.tailMode = i));
}
function Hc(e, t, n) {
    var r = t.pendingProps,
        i = r.revealOrder,
        o = r.tail;
    if ((ke(e, t, r.children, n), (r = ee.current), r & 2))
        (r = (r & 1) | 2), (t.flags |= 128);
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13) e.memoizedState !== null && Na(e, n, t);
                else if (e.tag === 19) Na(e, n, t);
                else if (e.child !== null) {
                    (e.child.return = e), (e = e.child);
                    continue;
                }
                if (e === t) break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
            }
        r &= 1;
    }
    if ((G(ee, r), !(t.mode & 1))) t.memoizedState = null;
    else
        switch (i) {
            case "forwards":
                for (n = t.child, i = null; n !== null; )
                    (e = n.alternate),
                        e !== null && Ai(e) === null && (i = n),
                        (n = n.sibling);
                (n = i),
                    n === null
                        ? ((i = t.child), (t.child = null))
                        : ((i = n.sibling), (n.sibling = null)),
                    xo(t, !1, i, n, o);
                break;
            case "backwards":
                for (n = null, i = t.child, t.child = null; i !== null; ) {
                    if (((e = i.alternate), e !== null && Ai(e) === null)) {
                        t.child = i;
                        break;
                    }
                    (e = i.sibling), (i.sibling = n), (n = i), (i = e);
                }
                xo(t, !0, n, null, o);
                break;
            case "together":
                xo(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function ri(e, t) {
    !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function St(e, t, n) {
    if (
        (e !== null && (t.dependencies = e.dependencies),
        (en |= t.lanes),
        !(n & t.childLanes))
    )
        return null;
    if (e !== null && t.child !== e.child) throw Error(E(153));
    if (t.child !== null) {
        for (
            e = t.child, n = Ft(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;

        )
            (e = e.sibling),
                (n = n.sibling = Ft(e, e.pendingProps)),
                (n.return = t);
        n.sibling = null;
    }
    return t.child;
}
function Op(e, t, n) {
    switch (t.tag) {
        case 3:
            Vc(t), jn();
            break;
        case 5:
            vc(t);
            break;
        case 1:
            Re(t.type) && Si(t);
            break;
        case 4:
            el(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                i = t.memoizedProps.value;
            G(Pi, r._currentValue), (r._currentValue = i);
            break;
        case 13:
            if (((r = t.memoizedState), r !== null))
                return r.dehydrated !== null
                    ? (G(ee, ee.current & 1), (t.flags |= 128), null)
                    : n & t.child.childLanes
                    ? Jc(e, t, n)
                    : (G(ee, ee.current & 1),
                      (e = St(e, t, n)),
                      e !== null ? e.sibling : null);
            G(ee, ee.current & 1);
            break;
        case 19:
            if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
                if (r) return Hc(e, t, n);
                t.flags |= 128;
            }
            if (
                ((i = t.memoizedState),
                i !== null &&
                    ((i.rendering = null),
                    (i.tail = null),
                    (i.lastEffect = null)),
                G(ee, ee.current),
                r)
            )
                break;
            return null;
        case 22:
        case 23:
            return (t.lanes = 0), Uc(e, t, n);
    }
    return St(e, t, n);
}
var $c, ds, Wc, Kc;
$c = function (e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            (n.child.return = n), (n = n.child);
            continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t) return;
            n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
    }
};
ds = function () {};
Wc = function (e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        (e = t.stateNode), Wt(lt.current);
        var o = null;
        switch (n) {
            case "input":
                (i = Oo(e, i)), (r = Oo(e, r)), (o = []);
                break;
            case "select":
                (i = ne({}, i, { value: void 0 })),
                    (r = ne({}, r, { value: void 0 })),
                    (o = []);
                break;
            case "textarea":
                (i = Fo(e, i)), (r = Fo(e, r)), (o = []);
                break;
            default:
                typeof i.onClick != "function" &&
                    typeof r.onClick == "function" &&
                    (e.onclick = vi);
        }
        Bo(n, r);
        var s;
        n = null;
        for (f in i)
            if (!r.hasOwnProperty(f) && i.hasOwnProperty(f) && i[f] != null)
                if (f === "style") {
                    var a = i[f];
                    for (s in a)
                        a.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
                } else
                    f !== "dangerouslySetInnerHTML" &&
                        f !== "children" &&
                        f !== "suppressContentEditableWarning" &&
                        f !== "suppressHydrationWarning" &&
                        f !== "autoFocus" &&
                        (ar.hasOwnProperty(f)
                            ? o || (o = [])
                            : (o = o || []).push(f, null));
        for (f in r) {
            var u = r[f];
            if (
                ((a = i != null ? i[f] : void 0),
                r.hasOwnProperty(f) && u !== a && (u != null || a != null))
            )
                if (f === "style")
                    if (a) {
                        for (s in a)
                            !a.hasOwnProperty(s) ||
                                (u && u.hasOwnProperty(s)) ||
                                (n || (n = {}), (n[s] = ""));
                        for (s in u)
                            u.hasOwnProperty(s) &&
                                a[s] !== u[s] &&
                                (n || (n = {}), (n[s] = u[s]));
                    } else n || (o || (o = []), o.push(f, n)), (n = u);
                else
                    f === "dangerouslySetInnerHTML"
                        ? ((u = u ? u.__html : void 0),
                          (a = a ? a.__html : void 0),
                          u != null && a !== u && (o = o || []).push(f, u))
                        : f === "children"
                        ? (typeof u != "string" && typeof u != "number") ||
                          (o = o || []).push(f, "" + u)
                        : f !== "suppressContentEditableWarning" &&
                          f !== "suppressHydrationWarning" &&
                          (ar.hasOwnProperty(f)
                              ? (u != null &&
                                    f === "onScroll" &&
                                    Y("scroll", e),
                                o || a === u || (o = []))
                              : (o = o || []).push(f, u));
        }
        n && (o = o || []).push("style", n);
        var f = o;
        (t.updateQueue = f) && (t.flags |= 4);
    }
};
Kc = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
};
function Hn(e, t) {
    if (!Z)
        switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null; )
                    t.alternate !== null && (n = t), (t = t.sibling);
                n === null ? (e.tail = null) : (n.sibling = null);
                break;
            case "collapsed":
                n = e.tail;
                for (var r = null; n !== null; )
                    n.alternate !== null && (r = n), (n = n.sibling);
                r === null
                    ? t || e.tail === null
                        ? (e.tail = null)
                        : (e.tail.sibling = null)
                    : (r.sibling = null);
        }
}
function ve(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var i = e.child; i !== null; )
            (n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags & 14680064),
                (r |= i.flags & 14680064),
                (i.return = e),
                (i = i.sibling);
    else
        for (i = e.child; i !== null; )
            (n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags),
                (r |= i.flags),
                (i.return = e),
                (i = i.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Ip(e, t, n) {
    var r = t.pendingProps;
    switch ((Ws(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return ve(t), null;
        case 1:
            return Re(t.type) && wi(), ve(t), null;
        case 3:
            return (
                (r = t.stateNode),
                Tn(),
                X(je),
                X(Se),
                nl(),
                r.pendingContext &&
                    ((r.context = r.pendingContext), (r.pendingContext = null)),
                (e === null || e.child === null) &&
                    (Ur(t)
                        ? (t.flags |= 4)
                        : e === null ||
                          (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                          ((t.flags |= 1024),
                          Ye !== null && (ws(Ye), (Ye = null)))),
                ds(e, t),
                ve(t),
                null
            );
        case 5:
            tl(t);
            var i = Wt(Sr.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                Wc(e, t, n, r, i),
                    e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(E(166));
                    return ve(t), null;
                }
                if (((e = Wt(lt.current)), Ur(t))) {
                    (r = t.stateNode), (n = t.type);
                    var o = t.memoizedProps;
                    switch (
                        ((r[ot] = t), (r[vr] = o), (e = (t.mode & 1) !== 0), n)
                    ) {
                        case "dialog":
                            Y("cancel", r), Y("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            Y("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (i = 0; i < Yn.length; i++) Y(Yn[i], r);
                            break;
                        case "source":
                            Y("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            Y("error", r), Y("load", r);
                            break;
                        case "details":
                            Y("toggle", r);
                            break;
                        case "input":
                            Fl(r, o), Y("invalid", r);
                            break;
                        case "select":
                            (r._wrapperState = { wasMultiple: !!o.multiple }),
                                Y("invalid", r);
                            break;
                        case "textarea":
                            Bl(r, o), Y("invalid", r);
                    }
                    Bo(n, o), (i = null);
                    for (var s in o)
                        if (o.hasOwnProperty(s)) {
                            var a = o[s];
                            s === "children"
                                ? typeof a == "string"
                                    ? r.textContent !== a &&
                                      (o.suppressHydrationWarning !== !0 &&
                                          br(r.textContent, a, e),
                                      (i = ["children", a]))
                                    : typeof a == "number" &&
                                      r.textContent !== "" + a &&
                                      (o.suppressHydrationWarning !== !0 &&
                                          br(r.textContent, a, e),
                                      (i = ["children", "" + a]))
                                : ar.hasOwnProperty(s) &&
                                  a != null &&
                                  s === "onScroll" &&
                                  Y("scroll", r);
                        }
                    switch (n) {
                        case "input":
                            Lr(r), zl(r, o, !0);
                            break;
                        case "textarea":
                            Lr(r), Dl(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof o.onClick == "function" && (r.onclick = vi);
                    }
                    (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
                } else {
                    (s = i.nodeType === 9 ? i : i.ownerDocument),
                        e === "http://www.w3.org/1999/xhtml" && (e = ku(n)),
                        e === "http://www.w3.org/1999/xhtml"
                            ? n === "script"
                                ? ((e = s.createElement("div")),
                                  (e.innerHTML = "<script></script>"),
                                  (e = e.removeChild(e.firstChild)))
                                : typeof r.is == "string"
                                ? (e = s.createElement(n, { is: r.is }))
                                : ((e = s.createElement(n)),
                                  n === "select" &&
                                      ((s = e),
                                      r.multiple
                                          ? (s.multiple = !0)
                                          : r.size && (s.size = r.size)))
                            : (e = s.createElementNS(e, n)),
                        (e[ot] = t),
                        (e[vr] = r),
                        $c(e, t, !1, !1),
                        (t.stateNode = e);
                    e: {
                        switch (((s = Do(n, r)), n)) {
                            case "dialog":
                                Y("cancel", e), Y("close", e), (i = r);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                Y("load", e), (i = r);
                                break;
                            case "video":
                            case "audio":
                                for (i = 0; i < Yn.length; i++) Y(Yn[i], e);
                                i = r;
                                break;
                            case "source":
                                Y("error", e), (i = r);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                Y("error", e), Y("load", e), (i = r);
                                break;
                            case "details":
                                Y("toggle", e), (i = r);
                                break;
                            case "input":
                                Fl(e, r), (i = Oo(e, r)), Y("invalid", e);
                                break;
                            case "option":
                                i = r;
                                break;
                            case "select":
                                (e._wrapperState = {
                                    wasMultiple: !!r.multiple,
                                }),
                                    (i = ne({}, r, { value: void 0 })),
                                    Y("invalid", e);
                                break;
                            case "textarea":
                                Bl(e, r), (i = Fo(e, r)), Y("invalid", e);
                                break;
                            default:
                                i = r;
                        }
                        Bo(n, i), (a = i);
                        for (o in a)
                            if (a.hasOwnProperty(o)) {
                                var u = a[o];
                                o === "style"
                                    ? Cu(e, u)
                                    : o === "dangerouslySetInnerHTML"
                                    ? ((u = u ? u.__html : void 0),
                                      u != null && xu(e, u))
                                    : o === "children"
                                    ? typeof u == "string"
                                        ? (n !== "textarea" || u !== "") &&
                                          ur(e, u)
                                        : typeof u == "number" && ur(e, "" + u)
                                    : o !== "suppressContentEditableWarning" &&
                                      o !== "suppressHydrationWarning" &&
                                      o !== "autoFocus" &&
                                      (ar.hasOwnProperty(o)
                                          ? u != null &&
                                            o === "onScroll" &&
                                            Y("scroll", e)
                                          : u != null && Ls(e, o, u, s));
                            }
                        switch (n) {
                            case "input":
                                Lr(e), zl(e, r, !1);
                                break;
                            case "textarea":
                                Lr(e), Dl(e);
                                break;
                            case "option":
                                r.value != null &&
                                    e.setAttribute("value", "" + zt(r.value));
                                break;
                            case "select":
                                (e.multiple = !!r.multiple),
                                    (o = r.value),
                                    o != null
                                        ? wn(e, !!r.multiple, o, !1)
                                        : r.defaultValue != null &&
                                          wn(
                                              e,
                                              !!r.multiple,
                                              r.defaultValue,
                                              !0
                                          );
                                break;
                            default:
                                typeof i.onClick == "function" &&
                                    (e.onclick = vi);
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1;
                        }
                    }
                    r && (t.flags |= 4);
                }
                t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return ve(t), null;
        case 6:
            if (e && t.stateNode != null) Kc(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null)
                    throw Error(E(166));
                if (((n = Wt(Sr.current)), Wt(lt.current), Ur(t))) {
                    if (
                        ((r = t.stateNode),
                        (n = t.memoizedProps),
                        (r[ot] = t),
                        (o = r.nodeValue !== n) && ((e = Ie), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                br(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !==
                                    !0 &&
                                    br(r.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    o && (t.flags |= 4);
                } else
                    (r = (
                        n.nodeType === 9 ? n : n.ownerDocument
                    ).createTextNode(r)),
                        (r[ot] = t),
                        (t.stateNode = r);
            }
            return ve(t), null;
        case 13:
            if (
                (X(ee),
                (r = t.memoizedState),
                e === null ||
                    (e.memoizedState !== null &&
                        e.memoizedState.dehydrated !== null))
            ) {
                if (Z && Oe !== null && t.mode & 1 && !(t.flags & 128))
                    dc(), jn(), (t.flags |= 98560), (o = !1);
                else if (((o = Ur(t)), r !== null && r.dehydrated !== null)) {
                    if (e === null) {
                        if (!o) throw Error(E(318));
                        if (
                            ((o = t.memoizedState),
                            (o = o !== null ? o.dehydrated : null),
                            !o)
                        )
                            throw Error(E(317));
                        o[ot] = t;
                    } else
                        jn(),
                            !(t.flags & 128) && (t.memoizedState = null),
                            (t.flags |= 4);
                    ve(t), (o = !1);
                } else Ye !== null && (ws(Ye), (Ye = null)), (o = !0);
                if (!o) return t.flags & 65536 ? t : null;
            }
            return t.flags & 128
                ? ((t.lanes = n), t)
                : ((r = r !== null),
                  r !== (e !== null && e.memoizedState !== null) &&
                      r &&
                      ((t.child.flags |= 8192),
                      t.mode & 1 &&
                          (e === null || ee.current & 1
                              ? ue === 0 && (ue = 3)
                              : hl())),
                  t.updateQueue !== null && (t.flags |= 4),
                  ve(t),
                  null);
        case 4:
            return (
                Tn(),
                ds(e, t),
                e === null && yr(t.stateNode.containerInfo),
                ve(t),
                null
            );
        case 10:
            return Ys(t.type._context), ve(t), null;
        case 17:
            return Re(t.type) && wi(), ve(t), null;
        case 19:
            if ((X(ee), (o = t.memoizedState), o === null)) return ve(t), null;
            if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
                if (r) Hn(o, !1);
                else {
                    if (ue !== 0 || (e !== null && e.flags & 128))
                        for (e = t.child; e !== null; ) {
                            if (((s = Ai(e)), s !== null)) {
                                for (
                                    t.flags |= 128,
                                        Hn(o, !1),
                                        r = s.updateQueue,
                                        r !== null &&
                                            ((t.updateQueue = r),
                                            (t.flags |= 4)),
                                        t.subtreeFlags = 0,
                                        r = n,
                                        n = t.child;
                                    n !== null;

                                )
                                    (o = n),
                                        (e = r),
                                        (o.flags &= 14680066),
                                        (s = o.alternate),
                                        s === null
                                            ? ((o.childLanes = 0),
                                              (o.lanes = e),
                                              (o.child = null),
                                              (o.subtreeFlags = 0),
                                              (o.memoizedProps = null),
                                              (o.memoizedState = null),
                                              (o.updateQueue = null),
                                              (o.dependencies = null),
                                              (o.stateNode = null))
                                            : ((o.childLanes = s.childLanes),
                                              (o.lanes = s.lanes),
                                              (o.child = s.child),
                                              (o.subtreeFlags = 0),
                                              (o.deletions = null),
                                              (o.memoizedProps =
                                                  s.memoizedProps),
                                              (o.memoizedState =
                                                  s.memoizedState),
                                              (o.updateQueue = s.updateQueue),
                                              (o.type = s.type),
                                              (e = s.dependencies),
                                              (o.dependencies =
                                                  e === null
                                                      ? null
                                                      : {
                                                            lanes: e.lanes,
                                                            firstContext:
                                                                e.firstContext,
                                                        })),
                                        (n = n.sibling);
                                return G(ee, (ee.current & 1) | 2), t.child;
                            }
                            e = e.sibling;
                        }
                    o.tail !== null &&
                        oe() > Ln &&
                        ((t.flags |= 128),
                        (r = !0),
                        Hn(o, !1),
                        (t.lanes = 4194304));
                }
            else {
                if (!r)
                    if (((e = Ai(s)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                            (r = !0),
                            (n = e.updateQueue),
                            n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                            Hn(o, !0),
                            o.tail === null &&
                                o.tailMode === "hidden" &&
                                !s.alternate &&
                                !Z)
                        )
                            return ve(t), null;
                    } else
                        2 * oe() - o.renderingStartTime > Ln &&
                            n !== 1073741824 &&
                            ((t.flags |= 128),
                            (r = !0),
                            Hn(o, !1),
                            (t.lanes = 4194304));
                o.isBackwards
                    ? ((s.sibling = t.child), (t.child = s))
                    : ((n = o.last),
                      n !== null ? (n.sibling = s) : (t.child = s),
                      (o.last = s));
            }
            return o.tail !== null
                ? ((t = o.tail),
                  (o.rendering = t),
                  (o.tail = t.sibling),
                  (o.renderingStartTime = oe()),
                  (t.sibling = null),
                  (n = ee.current),
                  G(ee, r ? (n & 1) | 2 : n & 1),
                  t)
                : (ve(t), null);
        case 22:
        case 23:
            return (
                pl(),
                (r = t.memoizedState !== null),
                e !== null &&
                    (e.memoizedState !== null) !== r &&
                    (t.flags |= 8192),
                r && t.mode & 1
                    ? Le & 1073741824 &&
                      (ve(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                    : ve(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(E(156, t.tag));
}
function Mp(e, t) {
    switch ((Ws(t), t.tag)) {
        case 1:
            return (
                Re(t.type) && wi(),
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 3:
            return (
                Tn(),
                X(je),
                X(Se),
                nl(),
                (e = t.flags),
                e & 65536 && !(e & 128)
                    ? ((t.flags = (e & -65537) | 128), t)
                    : null
            );
        case 5:
            return tl(t), null;
        case 13:
            if (
                (X(ee),
                (e = t.memoizedState),
                e !== null && e.dehydrated !== null)
            ) {
                if (t.alternate === null) throw Error(E(340));
                jn();
            }
            return (
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 19:
            return X(ee), null;
        case 4:
            return Tn(), null;
        case 10:
            return Ys(t.type._context), null;
        case 22:
        case 23:
            return pl(), null;
        case 24:
            return null;
        default:
            return null;
    }
}
var Jr = !1,
    we = !1,
    Fp = typeof WeakSet == "function" ? WeakSet : Set,
    _ = null;
function gn(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null);
            } catch (r) {
                re(e, t, r);
            }
        else n.current = null;
}
function fs(e, t, n) {
    try {
        n();
    } catch (r) {
        re(e, t, r);
    }
}
var ja = !1;
function zp(e, t) {
    if (((Qo = mi), (e = Xu()), Hs(e))) {
        if ("selectionStart" in e)
            var n = { start: e.selectionStart, end: e.selectionEnd };
        else
            e: {
                n = ((n = e.ownerDocument) && n.defaultView) || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var i = r.anchorOffset,
                        o = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType, o.nodeType;
                    } catch {
                        n = null;
                        break e;
                    }
                    var s = 0,
                        a = -1,
                        u = -1,
                        f = 0,
                        g = 0,
                        h = e,
                        m = null;
                    t: for (;;) {
                        for (
                            var y;
                            h !== n ||
                                (i !== 0 && h.nodeType !== 3) ||
                                (a = s + i),
                                h !== o ||
                                    (r !== 0 && h.nodeType !== 3) ||
                                    (u = s + r),
                                h.nodeType === 3 && (s += h.nodeValue.length),
                                (y = h.firstChild) !== null;

                        )
                            (m = h), (h = y);
                        for (;;) {
                            if (h === e) break t;
                            if (
                                (m === n && ++f === i && (a = s),
                                m === o && ++g === r && (u = s),
                                (y = h.nextSibling) !== null)
                            )
                                break;
                            (h = m), (m = h.parentNode);
                        }
                        h = y;
                    }
                    n = a === -1 || u === -1 ? null : { start: a, end: u };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (
        Go = { focusedElem: e, selectionRange: n }, mi = !1, _ = t;
        _ !== null;

    )
        if (
            ((t = _),
            (e = t.child),
            (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
            (e.return = t), (_ = e);
        else
            for (; _ !== null; ) {
                t = _;
                try {
                    var A = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (A !== null) {
                                    var P = A.memoizedProps,
                                        B = A.memoizedState,
                                        d = t.stateNode,
                                        c = d.getSnapshotBeforeUpdate(
                                            t.elementType === t.type
                                                ? P
                                                : Ke(t.type, P),
                                            B
                                        );
                                    d.__reactInternalSnapshotBeforeUpdate = c;
                                }
                                break;
                            case 3:
                                var p = t.stateNode.containerInfo;
                                p.nodeType === 1
                                    ? (p.textContent = "")
                                    : p.nodeType === 9 &&
                                      p.documentElement &&
                                      p.removeChild(p.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(E(163));
                        }
                } catch (k) {
                    re(t, t.return, k);
                }
                if (((e = t.sibling), e !== null)) {
                    (e.return = t.return), (_ = e);
                    break;
                }
                _ = t.return;
            }
    return (A = ja), (ja = !1), A;
}
function or(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var i = (r = r.next);
        do {
            if ((i.tag & e) === e) {
                var o = i.destroy;
                (i.destroy = void 0), o !== void 0 && fs(t, n, o);
            }
            i = i.next;
        } while (i !== r);
    }
}
function Ji(e, t) {
    if (
        ((t = t.updateQueue),
        (t = t !== null ? t.lastEffect : null),
        t !== null)
    ) {
        var n = (t = t.next);
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
            }
            n = n.next;
        } while (n !== t);
    }
}
function ps(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n;
        }
        typeof t == "function" ? t(e) : (t.current = e);
    }
}
function Qc(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), Qc(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
            ((t = e.stateNode),
            t !== null &&
                (delete t[ot],
                delete t[vr],
                delete t[Zo],
                delete t[wp],
                delete t[Sp])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
}
function Gc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ra(e) {
    e: for (;;) {
        for (; e.sibling === null; ) {
            if (e.return === null || Gc(e.return)) return null;
            e = e.return;
        }
        for (
            e.sibling.return = e.return, e = e.sibling;
            e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

        ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            (e.child.return = e), (e = e.child);
        }
        if (!(e.flags & 2)) return e.stateNode;
    }
}
function hs(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode),
            t
                ? n.nodeType === 8
                    ? n.parentNode.insertBefore(e, t)
                    : n.insertBefore(e, t)
                : (n.nodeType === 8
                      ? ((t = n.parentNode), t.insertBefore(e, n))
                      : ((t = n), t.appendChild(e)),
                  (n = n._reactRootContainer),
                  n != null || t.onclick !== null || (t.onclick = vi));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (hs(e, t, n), e = e.sibling; e !== null; )
            hs(e, t, n), (e = e.sibling);
}
function ms(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
        for (ms(e, t, n), e = e.sibling; e !== null; )
            ms(e, t, n), (e = e.sibling);
}
var pe = null,
    Qe = !1;
function xt(e, t, n) {
    for (n = n.child; n !== null; ) Yc(e, t, n), (n = n.sibling);
}
function Yc(e, t, n) {
    if (st && typeof st.onCommitFiberUnmount == "function")
        try {
            st.onCommitFiberUnmount(Fi, n);
        } catch {}
    switch (n.tag) {
        case 5:
            we || gn(n, t);
        case 6:
            var r = pe,
                i = Qe;
            (pe = null),
                xt(e, t, n),
                (pe = r),
                (Qe = i),
                pe !== null &&
                    (Qe
                        ? ((e = pe),
                          (n = n.stateNode),
                          e.nodeType === 8
                              ? e.parentNode.removeChild(n)
                              : e.removeChild(n))
                        : pe.removeChild(n.stateNode));
            break;
        case 18:
            pe !== null &&
                (Qe
                    ? ((e = pe),
                      (n = n.stateNode),
                      e.nodeType === 8
                          ? mo(e.parentNode, n)
                          : e.nodeType === 1 && mo(e, n),
                      pr(e))
                    : mo(pe, n.stateNode));
            break;
        case 4:
            (r = pe),
                (i = Qe),
                (pe = n.stateNode.containerInfo),
                (Qe = !0),
                xt(e, t, n),
                (pe = r),
                (Qe = i);
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (
                !we &&
                ((r = n.updateQueue),
                r !== null && ((r = r.lastEffect), r !== null))
            ) {
                i = r = r.next;
                do {
                    var o = i,
                        s = o.destroy;
                    (o = o.tag),
                        s !== void 0 && (o & 2 || o & 4) && fs(n, t, s),
                        (i = i.next);
                } while (i !== r);
            }
            xt(e, t, n);
            break;
        case 1:
            if (
                !we &&
                (gn(n, t),
                (r = n.stateNode),
                typeof r.componentWillUnmount == "function")
            )
                try {
                    (r.props = n.memoizedProps),
                        (r.state = n.memoizedState),
                        r.componentWillUnmount();
                } catch (a) {
                    re(n, t, a);
                }
            xt(e, t, n);
            break;
        case 21:
            xt(e, t, n);
            break;
        case 22:
            n.mode & 1
                ? ((we = (r = we) || n.memoizedState !== null),
                  xt(e, t, n),
                  (we = r))
                : xt(e, t, n);
            break;
        default:
            xt(e, t, n);
    }
}
function Ta(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Fp()),
            t.forEach(function (r) {
                var i = $p.bind(null, e, r);
                n.has(r) || (n.add(r), r.then(i, i));
            });
    }
}
function We(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var o = e,
                    s = t,
                    a = s;
                e: for (; a !== null; ) {
                    switch (a.tag) {
                        case 5:
                            (pe = a.stateNode), (Qe = !1);
                            break e;
                        case 3:
                            (pe = a.stateNode.containerInfo), (Qe = !0);
                            break e;
                        case 4:
                            (pe = a.stateNode.containerInfo), (Qe = !0);
                            break e;
                    }
                    a = a.return;
                }
                if (pe === null) throw Error(E(160));
                Yc(o, s, i), (pe = null), (Qe = !1);
                var u = i.alternate;
                u !== null && (u.return = null), (i.return = null);
            } catch (f) {
                re(i, t, f);
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) Xc(t, e), (t = t.sibling);
}
function Xc(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if ((We(t, e), rt(e), r & 4)) {
                try {
                    or(3, e, e.return), Ji(3, e);
                } catch (P) {
                    re(e, e.return, P);
                }
                try {
                    or(5, e, e.return);
                } catch (P) {
                    re(e, e.return, P);
                }
            }
            break;
        case 1:
            We(t, e), rt(e), r & 512 && n !== null && gn(n, n.return);
            break;
        case 5:
            if (
                (We(t, e),
                rt(e),
                r & 512 && n !== null && gn(n, n.return),
                e.flags & 32)
            ) {
                var i = e.stateNode;
                try {
                    ur(i, "");
                } catch (P) {
                    re(e, e.return, P);
                }
            }
            if (r & 4 && ((i = e.stateNode), i != null)) {
                var o = e.memoizedProps,
                    s = n !== null ? n.memoizedProps : o,
                    a = e.type,
                    u = e.updateQueue;
                if (((e.updateQueue = null), u !== null))
                    try {
                        a === "input" &&
                            o.type === "radio" &&
                            o.name != null &&
                            wu(i, o),
                            Do(a, s);
                        var f = Do(a, o);
                        for (s = 0; s < u.length; s += 2) {
                            var g = u[s],
                                h = u[s + 1];
                            g === "style"
                                ? Cu(i, h)
                                : g === "dangerouslySetInnerHTML"
                                ? xu(i, h)
                                : g === "children"
                                ? ur(i, h)
                                : Ls(i, g, h, f);
                        }
                        switch (a) {
                            case "input":
                                Io(i, o);
                                break;
                            case "textarea":
                                Su(i, o);
                                break;
                            case "select":
                                var m = i._wrapperState.wasMultiple;
                                i._wrapperState.wasMultiple = !!o.multiple;
                                var y = o.value;
                                y != null
                                    ? wn(i, !!o.multiple, y, !1)
                                    : m !== !!o.multiple &&
                                      (o.defaultValue != null
                                          ? wn(
                                                i,
                                                !!o.multiple,
                                                o.defaultValue,
                                                !0
                                            )
                                          : wn(
                                                i,
                                                !!o.multiple,
                                                o.multiple ? [] : "",
                                                !1
                                            ));
                        }
                        i[vr] = o;
                    } catch (P) {
                        re(e, e.return, P);
                    }
            }
            break;
        case 6:
            if ((We(t, e), rt(e), r & 4)) {
                if (e.stateNode === null) throw Error(E(162));
                (i = e.stateNode), (o = e.memoizedProps);
                try {
                    i.nodeValue = o;
                } catch (P) {
                    re(e, e.return, P);
                }
            }
            break;
        case 3:
            if (
                (We(t, e),
                rt(e),
                r & 4 && n !== null && n.memoizedState.isDehydrated)
            )
                try {
                    pr(t.containerInfo);
                } catch (P) {
                    re(e, e.return, P);
                }
            break;
        case 4:
            We(t, e), rt(e);
            break;
        case 13:
            We(t, e),
                rt(e),
                (i = e.child),
                i.flags & 8192 &&
                    ((o = i.memoizedState !== null),
                    (i.stateNode.isHidden = o),
                    !o ||
                        (i.alternate !== null &&
                            i.alternate.memoizedState !== null) ||
                        (dl = oe())),
                r & 4 && Ta(e);
            break;
        case 22:
            if (
                ((g = n !== null && n.memoizedState !== null),
                e.mode & 1
                    ? ((we = (f = we) || g), We(t, e), (we = f))
                    : We(t, e),
                rt(e),
                r & 8192)
            ) {
                if (
                    ((f = e.memoizedState !== null),
                    (e.stateNode.isHidden = f) && !g && e.mode & 1)
                )
                    for (_ = e, g = e.child; g !== null; ) {
                        for (h = _ = g; _ !== null; ) {
                            switch (((m = _), (y = m.child), m.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    or(4, m, m.return);
                                    break;
                                case 1:
                                    gn(m, m.return);
                                    var A = m.stateNode;
                                    if (
                                        typeof A.componentWillUnmount ==
                                        "function"
                                    ) {
                                        (r = m), (n = m.return);
                                        try {
                                            (t = r),
                                                (A.props = t.memoizedProps),
                                                (A.state = t.memoizedState),
                                                A.componentWillUnmount();
                                        } catch (P) {
                                            re(r, n, P);
                                        }
                                    }
                                    break;
                                case 5:
                                    gn(m, m.return);
                                    break;
                                case 22:
                                    if (m.memoizedState !== null) {
                                        La(h);
                                        continue;
                                    }
                            }
                            y !== null ? ((y.return = m), (_ = y)) : La(h);
                        }
                        g = g.sibling;
                    }
                e: for (g = null, h = e; ; ) {
                    if (h.tag === 5) {
                        if (g === null) {
                            g = h;
                            try {
                                (i = h.stateNode),
                                    f
                                        ? ((o = i.style),
                                          typeof o.setProperty == "function"
                                              ? o.setProperty(
                                                    "display",
                                                    "none",
                                                    "important"
                                                )
                                              : (o.display = "none"))
                                        : ((a = h.stateNode),
                                          (u = h.memoizedProps.style),
                                          (s =
                                              u != null &&
                                              u.hasOwnProperty("display")
                                                  ? u.display
                                                  : null),
                                          (a.style.display = Pu("display", s)));
                            } catch (P) {
                                re(e, e.return, P);
                            }
                        }
                    } else if (h.tag === 6) {
                        if (g === null)
                            try {
                                h.stateNode.nodeValue = f
                                    ? ""
                                    : h.memoizedProps;
                            } catch (P) {
                                re(e, e.return, P);
                            }
                    } else if (
                        ((h.tag !== 22 && h.tag !== 23) ||
                            h.memoizedState === null ||
                            h === e) &&
                        h.child !== null
                    ) {
                        (h.child.return = h), (h = h.child);
                        continue;
                    }
                    if (h === e) break e;
                    for (; h.sibling === null; ) {
                        if (h.return === null || h.return === e) break e;
                        g === h && (g = null), (h = h.return);
                    }
                    g === h && (g = null),
                        (h.sibling.return = h.return),
                        (h = h.sibling);
                }
            }
            break;
        case 19:
            We(t, e), rt(e), r & 4 && Ta(e);
            break;
        case 21:
            break;
        default:
            We(t, e), rt(e);
    }
}
function rt(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Gc(n)) {
                        var r = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(E(160));
            }
            switch (r.tag) {
                case 5:
                    var i = r.stateNode;
                    r.flags & 32 && (ur(i, ""), (r.flags &= -33));
                    var o = Ra(e);
                    ms(e, o, i);
                    break;
                case 3:
                case 4:
                    var s = r.stateNode.containerInfo,
                        a = Ra(e);
                    hs(e, a, s);
                    break;
                default:
                    throw Error(E(161));
            }
        } catch (u) {
            re(e, e.return, u);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function Bp(e, t, n) {
    (_ = e), Zc(e);
}
function Zc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; _ !== null; ) {
        var i = _,
            o = i.child;
        if (i.tag === 22 && r) {
            var s = i.memoizedState !== null || Jr;
            if (!s) {
                var a = i.alternate,
                    u = (a !== null && a.memoizedState !== null) || we;
                a = Jr;
                var f = we;
                if (((Jr = s), (we = u) && !f))
                    for (_ = i; _ !== null; )
                        (s = _),
                            (u = s.child),
                            s.tag === 22 && s.memoizedState !== null
                                ? Oa(i)
                                : u !== null
                                ? ((u.return = s), (_ = u))
                                : Oa(i);
                for (; o !== null; ) (_ = o), Zc(o), (o = o.sibling);
                (_ = i), (Jr = a), (we = f);
            }
            _a(e);
        } else
            i.subtreeFlags & 8772 && o !== null
                ? ((o.return = i), (_ = o))
                : _a(e);
    }
}
function _a(e) {
    for (; _ !== null; ) {
        var t = _;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            we || Ji(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !we)
                                if (n === null) r.componentDidMount();
                                else {
                                    var i =
                                        t.elementType === t.type
                                            ? n.memoizedProps
                                            : Ke(t.type, n.memoizedProps);
                                    r.componentDidUpdate(
                                        i,
                                        n.memoizedState,
                                        r.__reactInternalSnapshotBeforeUpdate
                                    );
                                }
                            var o = t.updateQueue;
                            o !== null && ha(t, o, r);
                            break;
                        case 3:
                            var s = t.updateQueue;
                            if (s !== null) {
                                if (((n = null), t.child !== null))
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode;
                                    }
                                ha(t, s, n);
                            }
                            break;
                        case 5:
                            var a = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = a;
                                var u = t.memoizedProps;
                                switch (t.type) {
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        u.autoFocus && n.focus();
                                        break;
                                    case "img":
                                        u.src && (n.src = u.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var f = t.alternate;
                                if (f !== null) {
                                    var g = f.memoizedState;
                                    if (g !== null) {
                                        var h = g.dehydrated;
                                        h !== null && pr(h);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(E(163));
                    }
                we || (t.flags & 512 && ps(t));
            } catch (m) {
                re(t, t.return, m);
            }
        }
        if (t === e) {
            _ = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            (n.return = t.return), (_ = n);
            break;
        }
        _ = t.return;
    }
}
function La(e) {
    for (; _ !== null; ) {
        var t = _;
        if (t === e) {
            _ = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            (n.return = t.return), (_ = n);
            break;
        }
        _ = t.return;
    }
}
function Oa(e) {
    for (; _ !== null; ) {
        var t = _;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        Ji(4, t);
                    } catch (u) {
                        re(t, n, u);
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var i = t.return;
                        try {
                            r.componentDidMount();
                        } catch (u) {
                            re(t, i, u);
                        }
                    }
                    var o = t.return;
                    try {
                        ps(t);
                    } catch (u) {
                        re(t, o, u);
                    }
                    break;
                case 5:
                    var s = t.return;
                    try {
                        ps(t);
                    } catch (u) {
                        re(t, s, u);
                    }
            }
        } catch (u) {
            re(t, t.return, u);
        }
        if (t === e) {
            _ = null;
            break;
        }
        var a = t.sibling;
        if (a !== null) {
            (a.return = t.return), (_ = a);
            break;
        }
        _ = t.return;
    }
}
var Dp = Math.ceil,
    Ri = kt.ReactCurrentDispatcher,
    ul = kt.ReactCurrentOwner,
    Ve = kt.ReactCurrentBatchConfig,
    H = 0,
    de = null,
    se = null,
    he = 0,
    Le = 0,
    vn = bt(0),
    ue = 0,
    Cr = null,
    en = 0,
    Hi = 0,
    cl = 0,
    sr = null,
    Ae = null,
    dl = 0,
    Ln = 1 / 0,
    ft = null,
    Ti = !1,
    ys = null,
    It = null,
    Hr = !1,
    jt = null,
    _i = 0,
    lr = 0,
    gs = null,
    ii = -1,
    oi = 0;
function xe() {
    return H & 6 ? oe() : ii !== -1 ? ii : (ii = oe());
}
function Mt(e) {
    return e.mode & 1
        ? H & 2 && he !== 0
            ? he & -he
            : xp.transition !== null
            ? (oi === 0 && (oi = Fu()), oi)
            : ((e = Q),
              e !== 0 ||
                  ((e = window.event), (e = e === void 0 ? 16 : Vu(e.type))),
              e)
        : 1;
}
function Ze(e, t, n, r) {
    if (50 < lr) throw ((lr = 0), (gs = null), Error(E(185)));
    Ar(e, n, r),
        (!(H & 2) || e !== de) &&
            (e === de && (!(H & 2) && (Hi |= n), ue === 4 && At(e, he)),
            Te(e, r),
            n === 1 &&
                H === 0 &&
                !(t.mode & 1) &&
                ((Ln = oe() + 500), Ui && Ut()));
}
function Te(e, t) {
    var n = e.callbackNode;
    xf(e, t);
    var r = hi(e, e === de ? he : 0);
    if (r === 0)
        n !== null && ql(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && ql(n), t === 1))
            e.tag === 0 ? kp(Ia.bind(null, e)) : ac(Ia.bind(null, e)),
                gp(function () {
                    !(H & 6) && Ut();
                }),
                (n = null);
        else {
            switch (zu(r)) {
                case 1:
                    n = zs;
                    break;
                case 4:
                    n = Iu;
                    break;
                case 16:
                    n = pi;
                    break;
                case 536870912:
                    n = Mu;
                    break;
                default:
                    n = pi;
            }
            n = ld(n, ed.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
    }
}
function ed(e, t) {
    if (((ii = -1), (oi = 0), H & 6)) throw Error(E(327));
    var n = e.callbackNode;
    if (Cn() && e.callbackNode !== n) return null;
    var r = hi(e, e === de ? he : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = Li(e, r);
    else {
        t = r;
        var i = H;
        H |= 2;
        var o = nd();
        (de !== e || he !== t) && ((ft = null), (Ln = oe() + 500), Kt(e, t));
        do
            try {
                qp();
                break;
            } catch (a) {
                td(e, a);
            }
        while (1);
        Gs(),
            (Ri.current = o),
            (H = i),
            se !== null ? (t = 0) : ((de = null), (he = 0), (t = ue));
    }
    if (t !== 0) {
        if (
            (t === 2 && ((i = Jo(e)), i !== 0 && ((r = i), (t = vs(e, i)))),
            t === 1)
        )
            throw ((n = Cr), Kt(e, 0), At(e, r), Te(e, oe()), n);
        if (t === 6) At(e, r);
        else {
            if (
                ((i = e.current.alternate),
                !(r & 30) &&
                    !bp(i) &&
                    ((t = Li(e, r)),
                    t === 2 &&
                        ((o = Jo(e)), o !== 0 && ((r = o), (t = vs(e, o)))),
                    t === 1))
            )
                throw ((n = Cr), Kt(e, 0), At(e, r), Te(e, oe()), n);
            switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                    throw Error(E(345));
                case 2:
                    Jt(e, Ae, ft);
                    break;
                case 3:
                    if (
                        (At(e, r),
                        (r & 130023424) === r &&
                            ((t = dl + 500 - oe()), 10 < t))
                    ) {
                        if (hi(e, 0) !== 0) break;
                        if (((i = e.suspendedLanes), (i & r) !== r)) {
                            xe(), (e.pingedLanes |= e.suspendedLanes & i);
                            break;
                        }
                        e.timeoutHandle = Xo(Jt.bind(null, e, Ae, ft), t);
                        break;
                    }
                    Jt(e, Ae, ft);
                    break;
                case 4:
                    if ((At(e, r), (r & 4194240) === r)) break;
                    for (t = e.eventTimes, i = -1; 0 < r; ) {
                        var s = 31 - Xe(r);
                        (o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o);
                    }
                    if (
                        ((r = i),
                        (r = oe() - r),
                        (r =
                            (120 > r
                                ? 120
                                : 480 > r
                                ? 480
                                : 1080 > r
                                ? 1080
                                : 1920 > r
                                ? 1920
                                : 3e3 > r
                                ? 3e3
                                : 4320 > r
                                ? 4320
                                : 1960 * Dp(r / 1960)) - r),
                        10 < r)
                    ) {
                        e.timeoutHandle = Xo(Jt.bind(null, e, Ae, ft), r);
                        break;
                    }
                    Jt(e, Ae, ft);
                    break;
                case 5:
                    Jt(e, Ae, ft);
                    break;
                default:
                    throw Error(E(329));
            }
        }
    }
    return Te(e, oe()), e.callbackNode === n ? ed.bind(null, e) : null;
}
function vs(e, t) {
    var n = sr;
    return (
        e.current.memoizedState.isDehydrated && (Kt(e, t).flags |= 256),
        (e = Li(e, t)),
        e !== 2 && ((t = Ae), (Ae = n), t !== null && ws(t)),
        e
    );
}
function ws(e) {
    Ae === null ? (Ae = e) : Ae.push.apply(Ae, e);
}
function bp(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        o = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!et(o(), i)) return !1;
                    } catch {
                        return !1;
                    }
                }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
            (n.return = t), (t = n);
        else {
            if (t === e) break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) return !0;
                t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
        }
    }
    return !0;
}
function At(e, t) {
    for (
        t &= ~cl,
            t &= ~Hi,
            e.suspendedLanes |= t,
            e.pingedLanes &= ~t,
            e = e.expirationTimes;
        0 < t;

    ) {
        var n = 31 - Xe(t),
            r = 1 << n;
        (e[n] = -1), (t &= ~r);
    }
}
function Ia(e) {
    if (H & 6) throw Error(E(327));
    Cn();
    var t = hi(e, 0);
    if (!(t & 1)) return Te(e, oe()), null;
    var n = Li(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Jo(e);
        r !== 0 && ((t = r), (n = vs(e, r)));
    }
    if (n === 1) throw ((n = Cr), Kt(e, 0), At(e, t), Te(e, oe()), n);
    if (n === 6) throw Error(E(345));
    return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        Jt(e, Ae, ft),
        Te(e, oe()),
        null
    );
}
function fl(e, t) {
    var n = H;
    H |= 1;
    try {
        return e(t);
    } finally {
        (H = n), H === 0 && ((Ln = oe() + 500), Ui && Ut());
    }
}
function tn(e) {
    jt !== null && jt.tag === 0 && !(H & 6) && Cn();
    var t = H;
    H |= 1;
    var n = Ve.transition,
        r = Q;
    try {
        if (((Ve.transition = null), (Q = 1), e)) return e();
    } finally {
        (Q = r), (Ve.transition = n), (H = t), !(H & 6) && Ut();
    }
}
function pl() {
    (Le = vn.current), X(vn);
}
function Kt(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), yp(n)), se !== null))
        for (n = se.return; n !== null; ) {
            var r = n;
            switch ((Ws(r), r.tag)) {
                case 1:
                    (r = r.type.childContextTypes), r != null && wi();
                    break;
                case 3:
                    Tn(), X(je), X(Se), nl();
                    break;
                case 5:
                    tl(r);
                    break;
                case 4:
                    Tn();
                    break;
                case 13:
                    X(ee);
                    break;
                case 19:
                    X(ee);
                    break;
                case 10:
                    Ys(r.type._context);
                    break;
                case 22:
                case 23:
                    pl();
            }
            n = n.return;
        }
    if (
        ((de = e),
        (se = e = Ft(e.current, null)),
        (he = Le = t),
        (ue = 0),
        (Cr = null),
        (cl = Hi = en = 0),
        (Ae = sr = null),
        $t !== null)
    ) {
        for (t = 0; t < $t.length; t++)
            if (((n = $t[t]), (r = n.interleaved), r !== null)) {
                n.interleaved = null;
                var i = r.next,
                    o = n.pending;
                if (o !== null) {
                    var s = o.next;
                    (o.next = i), (r.next = s);
                }
                n.pending = r;
            }
        $t = null;
    }
    return e;
}
function td(e, t) {
    do {
        var n = se;
        try {
            if ((Gs(), (ti.current = ji), Ni)) {
                for (var r = te.memoizedState; r !== null; ) {
                    var i = r.queue;
                    i !== null && (i.pending = null), (r = r.next);
                }
                Ni = !1;
            }
            if (
                ((Zt = 0),
                (ce = ae = te = null),
                (ir = !1),
                (kr = 0),
                (ul.current = null),
                n === null || n.return === null)
            ) {
                (ue = 1), (Cr = t), (se = null);
                break;
            }
            e: {
                var o = e,
                    s = n.return,
                    a = n,
                    u = t;
                if (
                    ((t = he),
                    (a.flags |= 32768),
                    u !== null &&
                        typeof u == "object" &&
                        typeof u.then == "function")
                ) {
                    var f = u,
                        g = a,
                        h = g.tag;
                    if (!(g.mode & 1) && (h === 0 || h === 11 || h === 15)) {
                        var m = g.alternate;
                        m
                            ? ((g.updateQueue = m.updateQueue),
                              (g.memoizedState = m.memoizedState),
                              (g.lanes = m.lanes))
                            : ((g.updateQueue = null),
                              (g.memoizedState = null));
                    }
                    var y = ka(s);
                    if (y !== null) {
                        (y.flags &= -257),
                            xa(y, s, a, o, t),
                            y.mode & 1 && Sa(o, f, t),
                            (t = y),
                            (u = f);
                        var A = t.updateQueue;
                        if (A === null) {
                            var P = new Set();
                            P.add(u), (t.updateQueue = P);
                        } else A.add(u);
                        break e;
                    } else {
                        if (!(t & 1)) {
                            Sa(o, f, t), hl();
                            break e;
                        }
                        u = Error(E(426));
                    }
                } else if (Z && a.mode & 1) {
                    var B = ka(s);
                    if (B !== null) {
                        !(B.flags & 65536) && (B.flags |= 256),
                            xa(B, s, a, o, t),
                            Ks(_n(u, a));
                        break e;
                    }
                }
                (o = u = _n(u, a)),
                    ue !== 4 && (ue = 2),
                    sr === null ? (sr = [o]) : sr.push(o),
                    (o = s);
                do {
                    switch (o.tag) {
                        case 3:
                            (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                            var d = Bc(o, u, t);
                            pa(o, d);
                            break e;
                        case 1:
                            a = u;
                            var c = o.type,
                                p = o.stateNode;
                            if (
                                !(o.flags & 128) &&
                                (typeof c.getDerivedStateFromError ==
                                    "function" ||
                                    (p !== null &&
                                        typeof p.componentDidCatch ==
                                            "function" &&
                                        (It === null || !It.has(p))))
                            ) {
                                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                                var k = Dc(o, a, t);
                                pa(o, k);
                                break e;
                            }
                    }
                    o = o.return;
                } while (o !== null);
            }
            id(n);
        } catch (v) {
            (t = v), se === n && n !== null && (se = n = n.return);
            continue;
        }
        break;
    } while (1);
}
function nd() {
    var e = Ri.current;
    return (Ri.current = ji), e === null ? ji : e;
}
function hl() {
    (ue === 0 || ue === 3 || ue === 2) && (ue = 4),
        de === null || (!(en & 268435455) && !(Hi & 268435455)) || At(de, he);
}
function Li(e, t) {
    var n = H;
    H |= 2;
    var r = nd();
    (de !== e || he !== t) && ((ft = null), Kt(e, t));
    do
        try {
            Up();
            break;
        } catch (i) {
            td(e, i);
        }
    while (1);
    if ((Gs(), (H = n), (Ri.current = r), se !== null)) throw Error(E(261));
    return (de = null), (he = 0), ue;
}
function Up() {
    for (; se !== null; ) rd(se);
}
function qp() {
    for (; se !== null && !pf(); ) rd(se);
}
function rd(e) {
    var t = sd(e.alternate, e, Le);
    (e.memoizedProps = e.pendingProps),
        t === null ? id(e) : (se = t),
        (ul.current = null);
}
function id(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
            if (((n = Mp(n, t)), n !== null)) {
                (n.flags &= 32767), (se = n);
                return;
            }
            if (e !== null)
                (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            else {
                (ue = 6), (se = null);
                return;
            }
        } else if (((n = Ip(n, t, Le)), n !== null)) {
            se = n;
            return;
        }
        if (((t = t.sibling), t !== null)) {
            se = t;
            return;
        }
        se = t = e;
    } while (t !== null);
    ue === 0 && (ue = 5);
}
function Jt(e, t, n) {
    var r = Q,
        i = Ve.transition;
    try {
        (Ve.transition = null), (Q = 1), Vp(e, t, n, r);
    } finally {
        (Ve.transition = i), (Q = r);
    }
    return null;
}
function Vp(e, t, n, r) {
    do Cn();
    while (jt !== null);
    if (H & 6) throw Error(E(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(E(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var o = n.lanes | n.childLanes;
    if (
        (Pf(e, o),
        e === de && ((se = de = null), (he = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
            Hr ||
            ((Hr = !0),
            ld(pi, function () {
                return Cn(), null;
            })),
        (o = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || o)
    ) {
        (o = Ve.transition), (Ve.transition = null);
        var s = Q;
        Q = 1;
        var a = H;
        (H |= 4),
            (ul.current = null),
            zp(e, n),
            Xc(n, e),
            up(Go),
            (mi = !!Qo),
            (Go = Qo = null),
            (e.current = n),
            Bp(n),
            hf(),
            (H = a),
            (Q = s),
            (Ve.transition = o);
    } else e.current = n;
    if (
        (Hr && ((Hr = !1), (jt = e), (_i = i)),
        (o = e.pendingLanes),
        o === 0 && (It = null),
        gf(n.stateNode),
        Te(e, oe()),
        t !== null)
    )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            (i = t[n]),
                r(i.value, { componentStack: i.stack, digest: i.digest });
    if (Ti) throw ((Ti = !1), (e = ys), (ys = null), e);
    return (
        _i & 1 && e.tag !== 0 && Cn(),
        (o = e.pendingLanes),
        o & 1 ? (e === gs ? lr++ : ((lr = 0), (gs = e))) : (lr = 0),
        Ut(),
        null
    );
}
function Cn() {
    if (jt !== null) {
        var e = zu(_i),
            t = Ve.transition,
            n = Q;
        try {
            if (((Ve.transition = null), (Q = 16 > e ? 16 : e), jt === null))
                var r = !1;
            else {
                if (((e = jt), (jt = null), (_i = 0), H & 6))
                    throw Error(E(331));
                var i = H;
                for (H |= 4, _ = e.current; _ !== null; ) {
                    var o = _,
                        s = o.child;
                    if (_.flags & 16) {
                        var a = o.deletions;
                        if (a !== null) {
                            for (var u = 0; u < a.length; u++) {
                                var f = a[u];
                                for (_ = f; _ !== null; ) {
                                    var g = _;
                                    switch (g.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            or(8, g, o);
                                    }
                                    var h = g.child;
                                    if (h !== null) (h.return = g), (_ = h);
                                    else
                                        for (; _ !== null; ) {
                                            g = _;
                                            var m = g.sibling,
                                                y = g.return;
                                            if ((Qc(g), g === f)) {
                                                _ = null;
                                                break;
                                            }
                                            if (m !== null) {
                                                (m.return = y), (_ = m);
                                                break;
                                            }
                                            _ = y;
                                        }
                                }
                            }
                            var A = o.alternate;
                            if (A !== null) {
                                var P = A.child;
                                if (P !== null) {
                                    A.child = null;
                                    do {
                                        var B = P.sibling;
                                        (P.sibling = null), (P = B);
                                    } while (P !== null);
                                }
                            }
                            _ = o;
                        }
                    }
                    if (o.subtreeFlags & 2064 && s !== null)
                        (s.return = o), (_ = s);
                    else
                        e: for (; _ !== null; ) {
                            if (((o = _), o.flags & 2048))
                                switch (o.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        or(9, o, o.return);
                                }
                            var d = o.sibling;
                            if (d !== null) {
                                (d.return = o.return), (_ = d);
                                break e;
                            }
                            _ = o.return;
                        }
                }
                var c = e.current;
                for (_ = c; _ !== null; ) {
                    s = _;
                    var p = s.child;
                    if (s.subtreeFlags & 2064 && p !== null)
                        (p.return = s), (_ = p);
                    else
                        e: for (s = c; _ !== null; ) {
                            if (((a = _), a.flags & 2048))
                                try {
                                    switch (a.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Ji(9, a);
                                    }
                                } catch (v) {
                                    re(a, a.return, v);
                                }
                            if (a === s) {
                                _ = null;
                                break e;
                            }
                            var k = a.sibling;
                            if (k !== null) {
                                (k.return = a.return), (_ = k);
                                break e;
                            }
                            _ = a.return;
                        }
                }
                if (
                    ((H = i),
                    Ut(),
                    st && typeof st.onPostCommitFiberRoot == "function")
                )
                    try {
                        st.onPostCommitFiberRoot(Fi, e);
                    } catch {}
                r = !0;
            }
            return r;
        } finally {
            (Q = n), (Ve.transition = t);
        }
    }
    return !1;
}
function Ma(e, t, n) {
    (t = _n(n, t)),
        (t = Bc(e, t, 1)),
        (e = Ot(e, t, 1)),
        (t = xe()),
        e !== null && (Ar(e, 1, t), Te(e, t));
}
function re(e, t, n) {
    if (e.tag === 3) Ma(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Ma(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == "function" ||
                    (typeof r.componentDidCatch == "function" &&
                        (It === null || !It.has(r)))
                ) {
                    (e = _n(n, e)),
                        (e = Dc(t, e, 1)),
                        (t = Ot(t, e, 1)),
                        (e = xe()),
                        t !== null && (Ar(t, 1, e), Te(t, e));
                    break;
                }
            }
            t = t.return;
        }
}
function Jp(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
        (t = xe()),
        (e.pingedLanes |= e.suspendedLanes & n),
        de === e &&
            (he & n) === n &&
            (ue === 4 ||
            (ue === 3 && (he & 130023424) === he && 500 > oe() - dl)
                ? Kt(e, 0)
                : (cl |= n)),
        Te(e, t);
}
function od(e, t) {
    t === 0 &&
        (e.mode & 1
            ? ((t = Mr), (Mr <<= 1), !(Mr & 130023424) && (Mr = 4194304))
            : (t = 1));
    var n = xe();
    (e = wt(e, t)), e !== null && (Ar(e, t, n), Te(e, n));
}
function Hp(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), od(e, n);
}
function $p(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                i = e.memoizedState;
            i !== null && (n = i.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(E(314));
    }
    r !== null && r.delete(t), od(e, n);
}
var sd;
sd = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || je.current) Ne = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return (Ne = !1), Op(e, t, n);
            Ne = !!(e.flags & 131072);
        }
    else (Ne = !1), Z && t.flags & 1048576 && uc(t, xi, t.index);
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var r = t.type;
            ri(e, t), (e = t.pendingProps);
            var i = Nn(t, Se.current);
            Pn(t, n), (i = il(null, t, r, e, i, n));
            var o = ol();
            return (
                (t.flags |= 1),
                typeof i == "object" &&
                i !== null &&
                typeof i.render == "function" &&
                i.$$typeof === void 0
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      Re(r) ? ((o = !0), Si(t)) : (o = !1),
                      (t.memoizedState =
                          i.state !== null && i.state !== void 0
                              ? i.state
                              : null),
                      Zs(t),
                      (i.updater = qi),
                      (t.stateNode = i),
                      (i._reactInternals = t),
                      os(t, r, e, n),
                      (t = as(null, t, r, !0, o, n)))
                    : ((t.tag = 0),
                      Z && o && $s(t),
                      ke(null, t, i, n),
                      (t = t.child)),
                t
            );
        case 16:
            r = t.elementType;
            e: {
                switch (
                    (ri(e, t),
                    (e = t.pendingProps),
                    (i = r._init),
                    (r = i(r._payload)),
                    (t.type = r),
                    (i = t.tag = Kp(r)),
                    (e = Ke(r, e)),
                    i)
                ) {
                    case 0:
                        t = ls(null, t, r, e, n);
                        break e;
                    case 1:
                        t = Ea(null, t, r, e, n);
                        break e;
                    case 11:
                        t = Pa(null, t, r, e, n);
                        break e;
                    case 14:
                        t = Ca(null, t, r, Ke(r.type, e), n);
                        break e;
                }
                throw Error(E(306, r, ""));
            }
            return t;
        case 0:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : Ke(r, i)),
                ls(e, t, r, i, n)
            );
        case 1:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : Ke(r, i)),
                Ea(e, t, r, i, n)
            );
        case 3:
            e: {
                if ((Vc(t), e === null)) throw Error(E(387));
                (r = t.pendingProps),
                    (o = t.memoizedState),
                    (i = o.element),
                    pc(e, t),
                    Ei(t, r, null, n);
                var s = t.memoizedState;
                if (((r = s.element), o.isDehydrated))
                    if (
                        ((o = {
                            element: r,
                            isDehydrated: !1,
                            cache: s.cache,
                            pendingSuspenseBoundaries:
                                s.pendingSuspenseBoundaries,
                            transitions: s.transitions,
                        }),
                        (t.updateQueue.baseState = o),
                        (t.memoizedState = o),
                        t.flags & 256)
                    ) {
                        (i = _n(Error(E(423)), t)), (t = Aa(e, t, r, n, i));
                        break e;
                    } else if (r !== i) {
                        (i = _n(Error(E(424)), t)), (t = Aa(e, t, r, n, i));
                        break e;
                    } else
                        for (
                            Oe = Lt(t.stateNode.containerInfo.firstChild),
                                Ie = t,
                                Z = !0,
                                Ye = null,
                                n = gc(t, null, r, n),
                                t.child = n;
                            n;

                        )
                            (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
                else {
                    if ((jn(), r === i)) {
                        t = St(e, t, n);
                        break e;
                    }
                    ke(e, t, r, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                vc(t),
                e === null && ns(t),
                (r = t.type),
                (i = t.pendingProps),
                (o = e !== null ? e.memoizedProps : null),
                (s = i.children),
                Yo(r, i)
                    ? (s = null)
                    : o !== null && Yo(r, o) && (t.flags |= 32),
                qc(e, t),
                ke(e, t, s, n),
                t.child
            );
        case 6:
            return e === null && ns(t), null;
        case 13:
            return Jc(e, t, n);
        case 4:
            return (
                el(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                e === null ? (t.child = Rn(t, null, r, n)) : ke(e, t, r, n),
                t.child
            );
        case 11:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : Ke(r, i)),
                Pa(e, t, r, i, n)
            );
        case 7:
            return ke(e, t, t.pendingProps, n), t.child;
        case 8:
            return ke(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return ke(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (
                    ((r = t.type._context),
                    (i = t.pendingProps),
                    (o = t.memoizedProps),
                    (s = i.value),
                    G(Pi, r._currentValue),
                    (r._currentValue = s),
                    o !== null)
                )
                    if (et(o.value, s)) {
                        if (o.children === i.children && !je.current) {
                            t = St(e, t, n);
                            break e;
                        }
                    } else
                        for (
                            o = t.child, o !== null && (o.return = t);
                            o !== null;

                        ) {
                            var a = o.dependencies;
                            if (a !== null) {
                                s = o.child;
                                for (var u = a.firstContext; u !== null; ) {
                                    if (u.context === r) {
                                        if (o.tag === 1) {
                                            (u = yt(-1, n & -n)), (u.tag = 2);
                                            var f = o.updateQueue;
                                            if (f !== null) {
                                                f = f.shared;
                                                var g = f.pending;
                                                g === null
                                                    ? (u.next = u)
                                                    : ((u.next = g.next),
                                                      (g.next = u)),
                                                    (f.pending = u);
                                            }
                                        }
                                        (o.lanes |= n),
                                            (u = o.alternate),
                                            u !== null && (u.lanes |= n),
                                            rs(o.return, n, t),
                                            (a.lanes |= n);
                                        break;
                                    }
                                    u = u.next;
                                }
                            } else if (o.tag === 10)
                                s = o.type === t.type ? null : o.child;
                            else if (o.tag === 18) {
                                if (((s = o.return), s === null))
                                    throw Error(E(341));
                                (s.lanes |= n),
                                    (a = s.alternate),
                                    a !== null && (a.lanes |= n),
                                    rs(s, n, t),
                                    (s = o.sibling);
                            } else s = o.child;
                            if (s !== null) s.return = o;
                            else
                                for (s = o; s !== null; ) {
                                    if (s === t) {
                                        s = null;
                                        break;
                                    }
                                    if (((o = s.sibling), o !== null)) {
                                        (o.return = s.return), (s = o);
                                        break;
                                    }
                                    s = s.return;
                                }
                            o = s;
                        }
                ke(e, t, i.children, n), (t = t.child);
            }
            return t;
        case 9:
            return (
                (i = t.type),
                (r = t.pendingProps.children),
                Pn(t, n),
                (i = Je(i)),
                (r = r(i)),
                (t.flags |= 1),
                ke(e, t, r, n),
                t.child
            );
        case 14:
            return (
                (r = t.type),
                (i = Ke(r, t.pendingProps)),
                (i = Ke(r.type, i)),
                Ca(e, t, r, i, n)
            );
        case 15:
            return bc(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : Ke(r, i)),
                ri(e, t),
                (t.tag = 1),
                Re(r) ? ((e = !0), Si(t)) : (e = !1),
                Pn(t, n),
                mc(t, r, i),
                os(t, r, i, n),
                as(null, t, r, !0, e, n)
            );
        case 19:
            return Hc(e, t, n);
        case 22:
            return Uc(e, t, n);
    }
    throw Error(E(156, t.tag));
};
function ld(e, t) {
    return Ou(e, t);
}
function Wp(e, t, n, r) {
    (this.tag = e),
        (this.key = n),
        (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
                null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
            this.memoizedState =
            this.updateQueue =
            this.memoizedProps =
                null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
}
function qe(e, t, n, r) {
    return new Wp(e, t, n, r);
}
function ml(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Kp(e) {
    if (typeof e == "function") return ml(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === Is)) return 11;
        if (e === Ms) return 14;
    }
    return 2;
}
function Ft(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = qe(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t),
              (n.type = e.type),
              (n.flags = 0),
              (n.subtreeFlags = 0),
              (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
            t === null
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
    );
}
function si(e, t, n, r, i, o) {
    var s = 2;
    if (((r = e), typeof e == "function")) ml(e) && (s = 1);
    else if (typeof e == "string") s = 5;
    else
        e: switch (e) {
            case an:
                return Qt(n.children, i, o, t);
            case Os:
                (s = 8), (i |= 8);
                break;
            case Ro:
                return (
                    (e = qe(12, n, t, i | 2)),
                    (e.elementType = Ro),
                    (e.lanes = o),
                    e
                );
            case To:
                return (
                    (e = qe(13, n, t, i)),
                    (e.elementType = To),
                    (e.lanes = o),
                    e
                );
            case _o:
                return (
                    (e = qe(19, n, t, i)),
                    (e.elementType = _o),
                    (e.lanes = o),
                    e
                );
            case yu:
                return $i(n, i, o, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                        case hu:
                            s = 10;
                            break e;
                        case mu:
                            s = 9;
                            break e;
                        case Is:
                            s = 11;
                            break e;
                        case Ms:
                            s = 14;
                            break e;
                        case Pt:
                            (s = 16), (r = null);
                            break e;
                    }
                throw Error(E(130, e == null ? e : typeof e, ""));
        }
    return (
        (t = qe(s, n, t, i)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = o),
        t
    );
}
function Qt(e, t, n, r) {
    return (e = qe(7, e, r, t)), (e.lanes = n), e;
}
function $i(e, t, n, r) {
    return (
        (e = qe(22, e, r, t)),
        (e.elementType = yu),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
    );
}
function Po(e, t, n) {
    return (e = qe(6, e, null, t)), (e.lanes = n), e;
}
function Co(e, t, n) {
    return (
        (t = qe(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
        }),
        t
    );
}
function Qp(e, t, n, r, i) {
    (this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
            this.pingCache =
            this.current =
            this.pendingChildren =
                null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = ro(0)),
        (this.expirationTimes = ro(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
                0),
        (this.entanglements = ro(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = i),
        (this.mutableSourceEagerHydrationData = null);
}
function yl(e, t, n, r, i, o, s, a, u) {
    return (
        (e = new Qp(e, t, n, a, u)),
        t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
        (o = qe(3, null, null, t)),
        (e.current = o),
        (o.stateNode = e),
        (o.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
        }),
        Zs(o),
        e
    );
}
function Gp(e, t, n) {
    var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: ln,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n,
    };
}
function ad(e) {
    if (!e) return Bt;
    e = e._reactInternals;
    e: {
        if (rn(e) !== e || e.tag !== 1) throw Error(E(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (Re(t.type)) {
                        t =
                            t.stateNode
                                .__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(E(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if (Re(n)) return lc(e, n, t);
    }
    return t;
}
function ud(e, t, n, r, i, o, s, a, u) {
    return (
        (e = yl(n, r, !0, e, i, o, s, a, u)),
        (e.context = ad(null)),
        (n = e.current),
        (r = xe()),
        (i = Mt(n)),
        (o = yt(r, i)),
        (o.callback = t ?? null),
        Ot(n, o, i),
        (e.current.lanes = i),
        Ar(e, i, r),
        Te(e, r),
        e
    );
}
function Wi(e, t, n, r) {
    var i = t.current,
        o = xe(),
        s = Mt(i);
    return (
        (n = ad(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = yt(o, s)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = Ot(i, t, s)),
        e !== null && (Ze(e, i, s, o), ei(e, i, s)),
        s
    );
}
function Oi(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function Fa(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function gl(e, t) {
    Fa(e, t), (e = e.alternate) && Fa(e, t);
}
function Yp() {
    return null;
}
var cd =
    typeof reportError == "function"
        ? reportError
        : function (e) {
              console.error(e);
          };
function vl(e) {
    this._internalRoot = e;
}
Ki.prototype.render = vl.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(E(409));
    Wi(e, t, null, null);
};
Ki.prototype.unmount = vl.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        tn(function () {
            Wi(null, e, null, null);
        }),
            (t[vt] = null);
    }
};
function Ki(e) {
    this._internalRoot = e;
}
Ki.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = bu();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < Et.length && t !== 0 && t < Et[n].priority; n++);
        Et.splice(n, 0, e), n === 0 && qu(e);
    }
};
function wl(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Qi(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 ||
                e.nodeValue !== " react-mount-point-unstable "))
    );
}
function za() {}
function Xp(e, t, n, r, i) {
    if (i) {
        if (typeof r == "function") {
            var o = r;
            r = function () {
                var f = Oi(s);
                o.call(f);
            };
        }
        var s = ud(t, r, e, 0, null, !1, !1, "", za);
        return (
            (e._reactRootContainer = s),
            (e[vt] = s.current),
            yr(e.nodeType === 8 ? e.parentNode : e),
            tn(),
            s
        );
    }
    for (; (i = e.lastChild); ) e.removeChild(i);
    if (typeof r == "function") {
        var a = r;
        r = function () {
            var f = Oi(u);
            a.call(f);
        };
    }
    var u = yl(e, 0, !1, null, null, !1, !1, "", za);
    return (
        (e._reactRootContainer = u),
        (e[vt] = u.current),
        yr(e.nodeType === 8 ? e.parentNode : e),
        tn(function () {
            Wi(t, u, n, r);
        }),
        u
    );
}
function Gi(e, t, n, r, i) {
    var o = n._reactRootContainer;
    if (o) {
        var s = o;
        if (typeof i == "function") {
            var a = i;
            i = function () {
                var u = Oi(s);
                a.call(u);
            };
        }
        Wi(t, s, e, i);
    } else s = Xp(n, t, e, i, r);
    return Oi(s);
}
Bu = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Gn(t.pendingLanes);
                n !== 0 &&
                    (Bs(t, n | 1),
                    Te(t, oe()),
                    !(H & 6) && ((Ln = oe() + 500), Ut()));
            }
            break;
        case 13:
            tn(function () {
                var r = wt(e, 1);
                if (r !== null) {
                    var i = xe();
                    Ze(r, e, 1, i);
                }
            }),
                gl(e, 1);
    }
};
Ds = function (e) {
    if (e.tag === 13) {
        var t = wt(e, 134217728);
        if (t !== null) {
            var n = xe();
            Ze(t, e, 134217728, n);
        }
        gl(e, 134217728);
    }
};
Du = function (e) {
    if (e.tag === 13) {
        var t = Mt(e),
            n = wt(e, t);
        if (n !== null) {
            var r = xe();
            Ze(n, e, t, r);
        }
        gl(e, t);
    }
};
bu = function () {
    return Q;
};
Uu = function (e, t) {
    var n = Q;
    try {
        return (Q = e), t();
    } finally {
        Q = n;
    }
};
Uo = function (e, t, n) {
    switch (t) {
        case "input":
            if ((Io(e, n), (t = n.name), n.type === "radio" && t != null)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                    n = n.querySelectorAll(
                        "input[name=" +
                            JSON.stringify("" + t) +
                            '][type="radio"]'
                    ),
                        t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var i = bi(r);
                        if (!i) throw Error(E(90));
                        vu(r), Io(r, i);
                    }
                }
            }
            break;
        case "textarea":
            Su(e, n);
            break;
        case "select":
            (t = n.value), t != null && wn(e, !!n.multiple, t, !1);
    }
};
Nu = fl;
ju = tn;
var Zp = { usingClientEntryPoint: !1, Events: [jr, fn, bi, Eu, Au, fl] },
    $n = {
        findFiberByHostInstance: Ht,
        bundleType: 0,
        version: "18.2.0",
        rendererPackageName: "react-dom",
    },
    eh = {
        bundleType: $n.bundleType,
        version: $n.version,
        rendererPackageName: $n.rendererPackageName,
        rendererConfig: $n.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: kt.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return (e = _u(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: $n.findFiberByHostInstance || Yp,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var $r = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$r.isDisabled && $r.supportsFiber)
        try {
            (Fi = $r.inject(eh)), (st = $r);
        } catch {}
}
Fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Zp;
Fe.createPortal = function (e, t) {
    var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!wl(t)) throw Error(E(200));
    return Gp(e, t, null, n);
};
Fe.createRoot = function (e, t) {
    if (!wl(e)) throw Error(E(299));
    var n = !1,
        r = "",
        i = cd;
    return (
        t != null &&
            (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = yl(e, 1, !1, null, null, n, !1, r, i)),
        (e[vt] = t.current),
        yr(e.nodeType === 8 ? e.parentNode : e),
        new vl(t)
    );
};
Fe.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function"
            ? Error(E(188))
            : ((e = Object.keys(e).join(",")), Error(E(268, e)));
    return (e = _u(t)), (e = e === null ? null : e.stateNode), e;
};
Fe.flushSync = function (e) {
    return tn(e);
};
Fe.hydrate = function (e, t, n) {
    if (!Qi(t)) throw Error(E(200));
    return Gi(null, e, t, !0, n);
};
Fe.hydrateRoot = function (e, t, n) {
    if (!wl(e)) throw Error(E(405));
    var r = (n != null && n.hydratedSources) || null,
        i = !1,
        o = "",
        s = cd;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (i = !0),
            n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
        (t = ud(t, null, e, 1, n ?? null, i, !1, o, s)),
        (e[vt] = t.current),
        yr(e),
        r)
    )
        for (e = 0; e < r.length; e++)
            (n = r[e]),
                (i = n._getVersion),
                (i = i(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, i])
                    : t.mutableSourceEagerHydrationData.push(n, i);
    return new Ki(t);
};
Fe.render = function (e, t, n) {
    if (!Qi(t)) throw Error(E(200));
    return Gi(null, e, t, !1, n);
};
Fe.unmountComponentAtNode = function (e) {
    if (!Qi(e)) throw Error(E(40));
    return e._reactRootContainer
        ? (tn(function () {
              Gi(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[vt] = null);
              });
          }),
          !0)
        : !1;
};
Fe.unstable_batchedUpdates = fl;
Fe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!Qi(n)) throw Error(E(200));
    if (e == null || e._reactInternals === void 0) throw Error(E(38));
    return Gi(e, t, n, !1, r);
};
Fe.version = "18.2.0-next-9e3b772b8-20220608";
function dd() {
    if (
        !(
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
    )
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(dd);
        } catch (e) {
            console.error(e);
        }
}
dd(), (uu.exports = Fe);
var th = uu.exports,
    Ba = th;
(No.createRoot = Ba.createRoot), (No.hydrateRoot = Ba.hydrateRoot);
class Da {
    constructor(t, n) {
        $e(this, "id");
        $e(this, "username");
        $e(this, "icon");
        $e(this, "position");
        $e(this, "balance");
        $e(this, "properties");
        $e(this, "isInJail");
        $e(this, "jailTurnsRemaining");
        $e(this, "getoutCards");
        $e(this, "ready");
        (this.id = t),
            (this.username = n),
            (this.icon = -1),
            (this.position = 0),
            (this.balance = 1500),
            (this.properties = []),
            (this.isInJail = !1),
            (this.jailTurnsRemaining = 0),
            (this.getoutCards = 0),
            (this.ready = !1);
    }
    recieveJson(t) {
        return (
            (this.username = t.username),
            (this.position = t.position),
            (this.icon = t.icon),
            (this.balance = t.balance),
            (this.properties = t.properties),
            (this.isInJail = t.isInJail),
            (this.jailTurnsRemaining = t.jailTurnsRemaining),
            (this.getoutCards = t.getoutCards),
            this
        );
    }
    toJson() {
        return {
            balance: this.balance,
            icon: this.icon,
            id: this.id,
            isInJail: this.isInJail,
            jailTurnsRemaining: this.jailTurnsRemaining,
            position: this.position,
            properties: this.properties,
            username: this.username,
            getoutCards: this.getoutCards,
        };
    }
}
const nh = "./assets/players-69e481c3.png",
    ba = "./assets/chat-98a8e3f3.png",
    rh = "./assets/chat_new-733d0bcc.png",
    ih =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAjpQTFRFAAAA509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P/m/HAgAAAL50Uk5TABmAwNbYyZApXvX//H8BhTam5vvli0I8oud1DYTvgxQd+p4n/qwzukHITwLUXATfagnoeA/whhb3lB+hKq+9RMpRXwXhbQrqexDyiRj4liGkLLI5R81VA9liBuPrsdAONO0Hcodh/flD9OQg2xfDtZVxUPM1JKXs2s/CtIFvQKgM1x5GVxxokbniKEVWaX6Tp7gLEziInWQVVBIjIt6CWL96dO5OSUtmu7yrbhE9t5cajXfp0U0uJZySfGdSzLBMfx0AAATRSURBVHic7d35fxNFGAbwFxoK9AloFQtigUYDWCqI9aBYMAKCWiwoVpCzgEoFTzwIh1qqiOCJijfgfVRRvG//N7eNNWn2SrKTnbzv531+ntl5v712dnYmJdJoNKVkzNi6xDh7qR8/wYxjYgMsJzlpsgmHbcZQzovuGGP9+zGc8yNDxtom5NIYGVJnm5DLBZEhCduEXC6MDBlnm5BLUiEKqU4UEgCZclHT1FgyrcoQ4OLpl0S+bglprjoEmDFzloFKQxIHBGgY3xK91ODEAwFSl15moNqAxAUB0rPnGKjXN/FBnMy93MQzj3dihQCt89oMFO2VmCHAFfMXGCjbndghwJULrzJQeHEsQID2q68xUProWIEA1163yEDxhbEEAToWX2+g/HysQZwH0s4lBgAjsQhxsjT6ws1I7EKAGzKG7pG2IcCNy4zcI+1DgMTyFTIgwE0rV8mAADffcqsMCNC1+jYZEKB7zVoZEKeC2++QAXGy7k4hEKCup5J7ZA1CgLvWb5ABAe7euEkGBNgsBQKFKEQhCvHK9IKuWzhDphZ03coZ0rYt37XHp01vyXMfixDa3jHSs9OvSaaZA4QyO/5z7PRtgXs4QGjRvYnuLVv9fq6GIbiPAyQ0DmTXMiEQ9N0vBILdpSzTcoBgRwlr5ywg2POAEAgefEgIBNvCljW5QPBwyFozGwgeCX4BwAeCxsC3MowgeDRoKswJgplSINgrBYLlUiDJx4RA0NckBILHn7ALebK5ouxzj5L1PpIVF8T9pa04ezz39jCEYL/XVJgjBAc8dsGxhOCgeyrME4JDrqkwUwj2FU+FuUKwuGgqzBaCp6RA8LQUCCZKgSTnCYGg+xkhEHRtFwLBaiGQ/vyeJNaQuQUbkjhD6g8XDMAYMjDqrCRfyOZnRw3AFlL86M4V4nqvyBSSeq54AJ6Q9BHXADwhC90DsIRM8hiAI6T4KZcrpN/zFVxckOePVpQX3KMc897xzW41ftQEizFkwO/DKJhBjrf4teQFyb7o25IVJGjjFidI6qWAlowg6ZeDWjKCvBLYkg/k1eCWbCCvhWwu5wI5EXbynAnk9dAjdTwgrW+EtmQBSbwZ3pIDxH+CxQsSMMFiBdntsx2otiAn3+p/+53eIEgqU9qVrELePTTcL/uePyS9vsRr2YS8PzDS0/fUTiZ4glUjkPyusu4PfJr4Hr6qJcipgq5ryuxbU5CjBV1Pc4acKeia4gwRc+hYIQpRiEIUohCFKEQhClGIQhSiEIUoRCEKUYhCFKIQhZSdD8vL0pqFRIhCFFKlKOT/DIQPEkc6IkM+sk3IpT4y5GPbhFw+iQyZ9altw1DaA3Y6lZrPdtlWOL/qAZ/4W3o+b7ftyH5hwkF0+MvGrwbzOTCj0oIGK8rX35w143Dn2+8qg1SrngiZMzstA0K0ZFpSBoTo1Lk+GRCi739okAFxbpdnyvkTZrvawPT++JMMCNGqlcdlQIg2bdwvA0K04cjPMiBEk39plQFxKE2DMiBOTq4TAiH69UTA44vt4srLb7+nZECIWv7okAEZ+o80XTIgRGf/zMqAOA/Ie6fIgBDt/Ou0DAjRgvkJGRCitr//kQFxZi49B2VAKL98ZLsOA8ktH9muwkgmdCZlQIjWnrNdgUaj8c6/sjbbOODJyXwAAAAASUVORK5CYII=",
    oh = "./assets/proprety-ed9394e1.png",
    sh = "./assets/settings-ec1fd821.png",
    lh = "./assets/icon-96ad3b33.png",
    Sl =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOoAAADYCAMAAADS+I/aAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGxQTFRFAAAAoM6mW7BnVK1hdLp+1enX7fbuRqdUL6BCOKJJNKFGHpw1qdOu6PPqPaRNI5054vDkKp8/KJ48mMqf0OfTvt3CkMeXuNq9isSSrdSyf7+IeryDbbd3YbJtMaFE3+/iyePNSapYrdWyxuHJWHk5egAAACR0Uk5TAP//////IP///////3D//9D/////////////////////////OqkGVgAABKFJREFUeJzt3dFW4jAUheGiAm3RFCqIjgIq7/+Og+OoUJImTXLaHdn/tXblW+iyx5SQZUy00dX1zXjoRfTRZJoXRTm7HXod8t2pQn1UjYZeiXTz8lP6+63jxZdUqfp+6NVItqzVUb/ZuqrUSfVDl+9WDkmtvGvrWXNl9WOHb0+I+lSdL23RwZoOdaSRHqx/nC+QDPWh1i/O3ZoK9c/CtLr8xvESiVCfc/PyXK1pUF9apM7WJKibbfsC8xeXq6RAvS5tK3SyJkCdWqVKbTf268BTJ9PCvkKlSrsVnXq3dZK6vK7g1J2r9PC6XlmuhU0d185SuxWa+qq97TVbr1uvhkxdGW57Pa3A1Kez8dRufWu5Hi511PU1tVlhqfc+UqWKqfGKqNRHP+nBalwuKNU8njpYJ/prYlJvWoc2m7XQWyGptqHNar3TXRWReuUwyrRbS50VkGofTx2s8wSoE5fx1MuKRr0rOtzgt1kXO3Dq3H1os1nzphWLerynGFzdeIgAirr0vUXStzi1IlE7D2226iUodd1tEHepOrbiUN/jSw+v6ysgVb+nGNxsD0e9l5Eefoa/rSBU7/HUwbqCogaMp+5WCGrQeOpgXcNQA8dTe7M1CPVKWnp4XZ8gqG8xhjZb1fvwVMc9xeCq26GpscZTe9XI5avkpLuyL+nB6vJFYtJx3p/ULSnpsvv+k3RC0ujjaYRkpOePvAIkIr2VGmWCkpB67ilKJyA1PfI6dPGlokNbSNGlwkNbQLGl7Y+8DlpkaQ9Dm3dxpRH2FOWKKo2ypyhWROjX+xRRiyeNt6coVDRp1D1FkWJJl6g3Dj9Fku4hb/BPiyMV2FOMXxSp7n2KeMWQCu0pxi6CFHVoaxYuhR3amgVLcYe2ZqFS4KGtWaA0+EHQHguTQg9tzYKk2ENbswDoBHxoa+Yvnfe2pxgpb+kOfmhr5isdp/NH5itP6Svi/pMlP2nzGJ0k8pKmMbQ1W9phZ2HuKVo7fqjWMdA9RXtVV6vgg6DS/TxU61Qy46mu74dqXUpnPNX2/0FTlxIaT/U5W5H3FB3796CpvaTGU1NO1rTGU2MfD9W219+DoNJVlpNq5z0+CCpd++mt+HuKXapbrAnsKXbKfHprCnuK3TJZk9hT7Jj+pFqR9ykOnu6k2kT2FDt3fqJpKnuK3WtaEx5PreXPx9LnX/ZX5rTjE02TH9os/VjF36c4eF8nmqa0e+rb9uVSpJ9WxLcFSVSvsseLeFGVKm4uh7rJ1r/6T+pP5eHGv6c3FQ9dtcuyuaq35pL6B0xhbvb5H4n9vbmHt1R+wPN8+mbs5VU/o5+2SuOuMXffvDC3T+F1reJ8QNkG//e1jPRxRyP8caA+OwjQr1t86sJw9iyppJKKFamkkkoqWKSSSiqpYJFKKqmkgkUqqaSSChappJJKKlikkkoqqWCRSiqppIJFKqmkkgoWqaSSSipYpJJKKqlgkUoqqaSCRSqppJIKFqmkkkoqWKSSSiqpYJFKKqmkgkUqqaSSChappJL6QcU/dTQWNYFDR8s40iyDp27PPvPDt32FfcDqdhpLmmXjTZG3HA09cErzmTWX3V/etxxj46OriAAAAABJRU5ErkJggg==",
    kl =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOoAAADYBAMAAAAXCGLbAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAA9QTFRFAAAAswAAswAAswAAswAAZtGxUwAAAAV0Uk5TAP8gcNCNz+2CAAACfklEQVR4nO3di1HDQAyEYQwUEAUKgA5IB9B/U+QJse8hXbx7B5lVAfrmzxjM+Aw8PPyzmcz6o49mtumu7vZq99jnA9o91k7TF53Oat9Ys2qsJYNAp59t+ViO6q2jqNPVumwsRXX3MdRpti8Xy1D9hQR1WizMxBLUwEa8ukzNxeLVdGO6Eq6+Z9QkFq0+ZdB0J1rNokksWE0vpexSsFpAl7FYtZS63IpVi+giFqqWUxdroWoFncci1VrqfC9SraK25aj1VLM3iuqg9sJQvVSzD4LqovaKV3N3uOV8otX8Ha60G6V+hdTLtwqQ6l9Ks+UgNYheYjFqNPWyHaOG0XMsRI2nntdD1Ab0FItQW1JP+xFqE3qMBahtqUcAoDaih9j1amvqQVivNqP72NVqe+qeWKs+3oDaZq26u0XNTBN6y+e7XkWhTSostUmFoS0qLrVFxaENKjC1QQWicRWZGleRaFiFpoZVKBpVsalRFYsG1d0I9RmMxlQ0GlLBl1JQhaMRFZ8aUfFoQCWkBlQC6quMVF9loK5KSXVVCuqpnFRP5aCOGnkgC1fhd7iQykKrKulSclQaWlN5qTWVh1ZehCKmVmKZaDGWmlqM5aKFWHJq+K0v8ORi6anBF6Hgk8Z2SE1jY0eOa2cZGztyXD0DPl/z3yAhzYjUeWw39Dq2X+p1bEf0N7Znau3AnzojUstn4OQZkVo6FqbPiNT8SWmHkUpXR1xNxnskUJnNkC+d5AfUQQ8RGZdX4FeHxjwHvxd166NSpUqVKlWqVKlSpUqVKlWqVKlSpUqVKlWqVKlSpUqVKlWqVKlSpUqVKlWqVKl/UA39hfo7USMo/CPu/88dCvMNgwpEBhudalAAAAAASUVORK5CYII=",
    ah = "./assets/rails-b5a8f288.png",
    uh = "./assets/elects-0ca4f3b8.png",
    ch = "./assets/water-7bf83b59.png";
function Ii(e) {
    try {
        switch (e.toLowerCase()) {
            case "red":
                return "#ED1B24";
            case "darkgreen":
                return "#1FB25A";
            case "darkblue":
                return "#0072BB";
            case "yellow":
                return "#FEF200";
            case "purple":
                return "#955436";
            case "lightgreen":
                return "#AAE0FA";
            case "orange":
                return "#F7941D";
            case "violet":
                return "#D93A96";
            default:
                return e.toLowerCase();
        }
    } catch {
        return e;
    }
}
function En({ street: e, utility: t, railroad: n }) {
    return e !== void 0
        ? l.jsx(dh, { args: e })
        : t !== void 0
        ? l.jsx(ph, { args: t })
        : n !== void 0
        ? l.jsx(fh, { args: n })
        : l.jsx(l.Fragment, {});
}
function dh({ args: e }) {
    const t = Ii(e.group);
    return l.jsxs("div", {
        className: "street-card",
        children: [
            l.jsxs("div", {
                style: { backgroundColor: t },
                children: [
                    l.jsx("p", { children: "title dreed" }),
                    l.jsx("h3", { children: e.title }),
                ],
            }),
            l.jsxs("div", {
                children: [
                    l.jsxs("ol", {
                        children: [
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", { children: "Rent" }),
                                    l.jsxs("p", { children: [e.rent, "M"] }),
                                ],
                            }),
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", {
                                        children: "Rent with color set",
                                    }),
                                    l.jsxs("p", {
                                        children: [e.rentWithColorSet, "M"],
                                    }),
                                ],
                            }),
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", {
                                        children: "Rent with 1 house",
                                    }),
                                    l.jsxs("p", {
                                        children: [e.multpliedrent[0], "M"],
                                    }),
                                ],
                            }),
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", {
                                        children: "Rent with 2 houses",
                                    }),
                                    l.jsxs("p", {
                                        children: [e.multpliedrent[1], "M"],
                                    }),
                                ],
                            }),
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", {
                                        children: "Rent with 3 houses",
                                    }),
                                    l.jsxs("p", {
                                        children: [e.multpliedrent[2], "M"],
                                    }),
                                ],
                            }),
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", {
                                        children: "Rent with 4 houses",
                                    }),
                                    l.jsxs("p", {
                                        children: [e.multpliedrent[3], "M"],
                                    }),
                                ],
                            }),
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", { children: "Rent with hotel" }),
                                    l.jsxs("p", {
                                        children: [e.multpliedrent[4], "M"],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    l.jsx("hr", {}),
                    l.jsxs("ol", {
                        children: [
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", { children: "House cost" }),
                                    l.jsxs("p", {
                                        children: [e.housesCost, "M each"],
                                    }),
                                ],
                            }),
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", { children: "Hotels cost" }),
                                    l.jsxs("label", {
                                        children: [
                                            e.hotelsCost,
                                            "M each",
                                            l.jsx("br", {}),
                                            l.jsx("p", {
                                                style: { fontSize: 12 },
                                                children: "(plus 4 houses)",
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    l.jsx("br", {}),
                    l.jsx("hr", {}),
                    l.jsxs("h4", { children: [e.cardCost, "M"] }),
                ],
            }),
        ],
    });
}
function fh({ args: e }) {
    return l.jsxs("div", {
        className: "street-card",
        children: [
            l.jsxs("div", {
                "data-clear": !0,
                children: [
                    l.jsx("img", {
                        "data-type": "rail",
                        src: ah.replace("/public", ""),
                        alt: "",
                    }),
                    l.jsx("h3", { children: e.title }),
                ],
            }),
            l.jsxs("div", {
                children: [
                    l.jsxs("ol", {
                        children: [
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", { children: "Rent" }),
                                    l.jsxs("p", { children: [25, "M"] }),
                                ],
                            }),
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", {
                                        children: "If 2 stations are owned",
                                    }),
                                    l.jsxs("p", { children: [50, "M"] }),
                                ],
                            }),
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", {
                                        children: "If 3 stations are owned",
                                    }),
                                    l.jsxs("p", { children: [100, "M"] }),
                                ],
                            }),
                            l.jsxs("li", {
                                children: [
                                    l.jsx("p", {
                                        children: "If 4 stations are owned",
                                    }),
                                    l.jsxs("p", { children: [200, "M"] }),
                                ],
                            }),
                        ],
                    }),
                    l.jsx("h4", { children: "mortgage Value 100M" }),
                    l.jsx("hr", {}),
                    l.jsx("br", {}),
                    l.jsxs("h4", { children: [e.cardCost, "M"] }),
                ],
            }),
        ],
    });
}
function ph({ args: e }) {
    return l.jsxs("div", {
        className: "street-card",
        children: [
            l.jsxs("div", {
                "data-clear": !0,
                children: [
                    l.jsx("center", {
                        children: l.jsx("img", {
                            "data-type": e.type,
                            src:
                                e.type === "electricity"
                                    ? uh.replace("/public", "")
                                    : ch.replace("/public", ""),
                            alt: "",
                        }),
                    }),
                    l.jsx("h3", { children: e.title }),
                ],
            }),
            l.jsxs("div", {
                children: [
                    l.jsxs("p", {
                        style: { lineHeight: 1, paddingInline: 10 },
                        children: [
                            "If one Utility is owned, rent is 4 times amount shown on dice.",
                            l.jsx("br", {}),
                            l.jsx("br", {}),
                            "If both Utilities are owned, rent is 10 times amount shown on dice",
                        ],
                    }),
                    l.jsx("hr", {}),
                    l.jsx("br", {}),
                    l.jsxs("h4", { children: [e.cardCost, "M"] }),
                ],
            }),
        ],
    });
}
const hh = [
        {
            name: "Mediterranean Avenue",
            id: "mediterraneanave",
            posistion: 1,
            price: 60,
            rent: 2,
            multpliedrent: [10, 30, 90, 160, 250],
            housecost: 50,
            group: "Purple",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            probability: 2.1314,
            rel: {
                Square: "Mediterranean Avenue",
                "Probability % (Jail Short)": 2.1314,
                Rank: 36,
                "Probability % (Jail Long)": 2.0073,
            },
            ohousecost: 50,
            oprice: 60,
            averageProbability: 2.06935,
        },
        {
            name: "Baltic Avenue",
            id: "balticave",
            posistion: 3,
            price: 60,
            rent: 4,
            multpliedrent: [20, 60, 180, 320, 450],
            housecost: 50,
            group: "Purple",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            probability: 2.1624,
            rel: {
                Square: "Baltic Avenue",
                "Probability % (Jail Short)": 2.1624,
                Rank: 35,
                "Probability % (Jail Long)": 2.0369,
            },
            ohousecost: 50,
            oprice: 60,
            averageProbability: 2.09965,
        },
        {
            name: "Oriental Avenue",
            id: "orientalave",
            posistion: 6,
            price: 100,
            rent: 6,
            multpliedrent: [30, 90, 270, 400, 550],
            housecost: 50,
            group: "lightgreen",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Oriental Avenue",
                "Probability % (Jail Short)": 2.2621,
                Rank: 32,
                "Probability % (Jail Long)": 2.1317,
            },
            ohousecost: 50,
            oprice: 100,
            averageProbability: 2.1969000000000003,
        },
        {
            name: "Vermont Avenue",
            id: "vermontave",
            posistion: 8,
            price: 100,
            rent: 6,
            multpliedrent: [30, 90, 270, 400, 550],
            housecost: 50,
            group: "lightgreen",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Vermont Avenue",
                "Probability % (Jail Short)": 2.321,
                Rank: 28,
                "Probability % (Jail Long)": 2.1874,
            },
            ohousecost: 50,
            oprice: 100,
            averageProbability: 2.2542,
        },
        {
            name: "Connecticut Avenue",
            id: "connecticutave",
            posistion: 9,
            price: 120,
            rent: 8,
            multpliedrent: [40, 100, 300, 450, 600],
            housecost: 50,
            group: "lightgreen",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Connecticut Avenue",
                "Probability % (Jail Short)": 2.3003,
                Rank: 30,
                "Probability % (Jail Long)": 2.168,
            },
            ohousecost: 50,
            oprice: 120,
            averageProbability: 2.23415,
        },
        {
            name: "St. Charles Place",
            id: "stcharlesplace",
            posistion: 11,
            price: 140,
            rent: 10,
            multpliedrent: [50, 150, 450, 625, 750],
            housecost: 100,
            group: "Violet",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "St. Charles Place",
                "Probability % (Jail Short)": 2.7017,
                Rank: 15,
                "Probability % (Jail Long)": 2.556,
            },
            ohousecost: 100,
            oprice: 140,
            averageProbability: 2.62885,
        },
        {
            name: "States Avenue",
            id: "statesave",
            posistion: 13,
            price: 140,
            rent: 10,
            multpliedrent: [50, 150, 450, 625, 750],
            housecost: 100,
            group: "Violet",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "States Avenue",
                "Probability % (Jail Short)": 2.3721,
                Rank: 29,
                "Probability % (Jail Long)": 2.1741,
            },
            ohousecost: 100,
            oprice: 140,
            averageProbability: 2.2731000000000003,
        },
        {
            name: "Virginia Avenue",
            id: "virginiaave",
            posistion: 14,
            price: 160,
            rent: 12,
            multpliedrent: [60, 180, 500, 700, 900],
            housecost: 100,
            group: "Violet",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Virginia Avenue",
                "Probability % (Jail Short)": 2.4649,
                Rank: 22,
                "Probability % (Jail Long)": 2.4255,
            },
            ohousecost: 100,
            oprice: 160,
            averageProbability: 2.4452,
        },
        {
            name: "St. James Place",
            id: "stjamesplace",
            posistion: 16,
            price: 180,
            rent: 14,
            multpliedrent: [70, 200, 550, 750, 950],
            housecost: 100,
            group: "Orange",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "St. James Place",
                "Probability % (Jail Short)": 2.7924,
                Rank: 9,
                "Probability % (Jail Long)": 2.6802,
            },
            ohousecost: 100,
            oprice: 180,
            averageProbability: 2.7363,
        },
        {
            name: "Tennessee Avenue",
            id: "tennesseeave",
            posistion: 18,
            price: 180,
            rent: 14,
            multpliedrent: [70, 200, 550, 750, 950],
            housecost: 100,
            group: "Orange",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Tennessee Avenue",
                "Probability % (Jail Short)": 2.9356,
                Rank: 6,
                "Probability % (Jail Long)": 2.821,
            },
            ohousecost: 100,
            oprice: 180,
            averageProbability: 2.8783000000000003,
        },
        {
            name: "New York Avenue",
            id: "newyorkave",
            posistion: 19,
            price: 200,
            rent: 16,
            multpliedrent: [80, 220, 600, 800, 1e3],
            housecost: 100,
            group: "Orange",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "New York Avenue",
                "Probability % (Jail Short)": 3.0852,
                Rank: 7,
                "Probability % (Jail Long)": 2.8118,
            },
            ohousecost: 100,
            oprice: 200,
            averageProbability: 2.9485,
        },
        {
            name: "Kentucky Avenue",
            id: "kentuckyave",
            posistion: 21,
            price: 220,
            rent: 18,
            multpliedrent: [90, 250, 700, 875, 1050],
            housecost: 150,
            group: "Red",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Kentucky Avenue",
                "Probability % (Jail Short)": 2.8358,
                Rank: 12,
                "Probability % (Jail Long)": 2.6143,
            },
            ohousecost: 150,
            oprice: 220,
            averageProbability: 2.72505,
        },
        {
            name: "Indiana Avenue",
            id: "indianaave",
            posistion: 23,
            price: 220,
            rent: 18,
            multpliedrent: [90, 250, 700, 875, 1050],
            housecost: 150,
            group: "Red",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Indiana Avenue",
                "Probability % (Jail Short)": 2.7357,
                Rank: 14,
                "Probability % (Jail Long)": 2.5671,
            },
            ohousecost: 150,
            oprice: 220,
            averageProbability: 2.6513999999999998,
        },
        {
            name: "Illinois Avenue",
            id: "illinoisave",
            posistion: 24,
            price: 240,
            rent: 20,
            multpliedrent: [100, 300, 750, 925, 1100],
            housecost: 150,
            group: "Red",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Illinois Avenue",
                "Probability % (Jail Short)": 3.1858,
                Rank: 2,
                "Probability % (Jail Long)": 2.9929,
            },
            ohousecost: 150,
            oprice: 240,
            averageProbability: 3.08935,
        },
        {
            name: "Atlantic Avenue",
            id: "atlanticave",
            posistion: 26,
            price: 260,
            rent: 22,
            multpliedrent: [110, 330, 800, 975, 1150],
            housecost: 150,
            group: "Yellow",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Atlantic Avenue",
                "Probability % (Jail Short)": 2.7072,
                Rank: 16,
                "Probability % (Jail Long)": 2.537,
            },
            ohousecost: 150,
            oprice: 260,
            averageProbability: 2.6220999999999997,
        },
        {
            name: "Ventnor Avenue",
            id: "ventnorave",
            posistion: 27,
            price: 260,
            rent: 22,
            multpliedrent: [110, 330, 800, 975, 1150],
            housecost: 150,
            group: "Yellow",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Ventnor Avenue",
                "Probability % (Jail Short)": 2.6789,
                Rank: 18,
                "Probability % (Jail Long)": 2.5191,
            },
            ohousecost: 150,
            oprice: 260,
            averageProbability: 2.599,
        },
        {
            name: "Marvin Gardens",
            id: "marvingardens",
            posistion: 29,
            price: 280,
            rent: 22,
            multpliedrent: [120, 360, 850, 1025, 1200],
            housecost: 150,
            group: "Yellow",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Marvin Gardens",
                "Probability % (Jail Short)": 2.5861,
                Rank: 21,
                "Probability % (Jail Long)": 2.4381,
            },
            ohousecost: 150,
            oprice: 280,
            averageProbability: 2.5121,
        },
        {
            name: "Pacific Avenue",
            id: "pacificave",
            posistion: 31,
            price: 300,
            rent: 26,
            multpliedrent: [130, 390, 900, 1100, 1275],
            housecost: 200,
            group: "darkgreen",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Pacific Avenue",
                "Probability % (Jail Short)": 2.6774,
                Rank: 17,
                "Probability % (Jail Long)": 2.5236,
            },
            ohousecost: 200,
            oprice: 300,
            averageProbability: 2.6005000000000003,
        },
        {
            name: "North Carolina Avenue",
            id: "northcarolinaave",
            posistion: 32,
            price: 300,
            rent: 26,
            multpliedrent: [130, 390, 900, 1100, 1275],
            housecost: 200,
            group: "darkgreen",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "North Carolina Avenue",
                "Probability % (Jail Short)": 2.6252,
                Rank: 20,
                "Probability % (Jail Long)": 2.4721,
            },
            ohousecost: 200,
            oprice: 300,
            averageProbability: 2.5486500000000003,
        },
        {
            name: "Pennsylvania Avenue",
            id: "pennsylvaniaave",
            posistion: 34,
            price: 320,
            rent: 28,
            multpliedrent: [150, 450, 1e3, 1200, 1400],
            housecost: 200,
            group: "darkgreen",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Pennsylvania Avenue",
                "Probability % (Jail Short)": 2.5006,
                Rank: 23,
                "Probability % (Jail Long)": 2.3531,
            },
            ohousecost: 200,
            oprice: 320,
            averageProbability: 2.42685,
        },
        {
            name: "Park Place",
            id: "parkplace",
            posistion: 37,
            price: 350,
            rent: 35,
            multpliedrent: [175, 500, 1100, 1300, 1500],
            housecost: 200,
            group: "darkblue",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Park Place",
                "Probability % (Jail Short)": 2.1864,
                Rank: 33,
                "Probability % (Jail Long)": 2.0595,
            },
            ohousecost: 200,
            oprice: 350,
            averageProbability: 2.12295,
        },
        {
            name: "Boardwalk",
            id: "boardwalk",
            posistion: 39,
            price: 400,
            rent: 50,
            multpliedrent: [200, 600, 1400, 1700, 2e3],
            housecost: 200,
            group: "darkblue",
            ownedby: -1,
            buildings: 0,
            mortgaged: !1,
            rel: {
                Square: "Boardwalk",
                "Probability % (Jail Short)": 2.626,
                Rank: 19,
                "Probability % (Jail Long)": 2.4832,
            },
            ohousecost: 200,
            oprice: 400,
            averageProbability: 2.5545999999999998,
        },
        {
            name: "Electric Company",
            id: "electriccompany",
            posistion: 12,
            price: 150,
            group: "Utilities",
            ownedby: -1,
            mortgaged: !1,
            rel: {
                Square: "Electric Company",
                "Probability % (Jail Short)": 2.604,
                Rank: 13,
                "Probability % (Jail Long)": 2.614,
            },
            oprice: 150,
            averageProbability: 2.609,
        },
        {
            name: "Water Works",
            id: "waterworks",
            posistion: 28,
            price: 150,
            group: "Utilities",
            ownedby: -1,
            mortgaged: !1,
            rel: {
                Square: "Water Works",
                "Probability % (Jail Short)": 2.8074,
                Rank: 10,
                "Probability % (Jail Long)": 2.6507,
            },
            oprice: 150,
            averageProbability: 2.72905,
        },
        {
            name: "Reading Railroad",
            id: "readingrailroad",
            posistion: 5,
            price: 200,
            group: "Railroad",
            ownedby: -1,
            mortgaged: !1,
            probability: 2.1314,
            rel: {
                Square: "Reading Railroad",
                "Probability % (Jail Short)": 2.9631,
                Rank: 8,
                "Probability % (Jail Long)": 2.801,
            },
            oprice: 200,
            averageProbability: 2.88205,
        },
        {
            name: "Pennsylvania Railroad",
            id: "pennsylvaniarailroad",
            posistion: 15,
            price: 200,
            group: "Railroad",
            ownedby: -1,
            mortgaged: !1,
            rel: {
                Square: "Pennsylvania Railroad",
                "Probability % (Jail Short)": 2.92,
                Rank: 11,
                "Probability % (Jail Long)": 2.6354,
            },
            oprice: 200,
            averageProbability: 2.7777000000000003,
        },
        {
            name: "B. & O. Railroad",
            id: "borailroad",
            posistion: 25,
            price: 200,
            group: "Railroad",
            ownedby: -1,
            mortgaged: !1,
            oprice: 200,
            averageProbability: 2.975,
        },
        {
            name: "Short Line Railroad",
            id: "shortlinerailroad",
            posistion: 35,
            price: 200,
            group: "Railroad",
            ownedby: -1,
            mortgaged: !1,
            oprice: 200,
            averageProbability: 2.3609500000000003,
        },
        {
            name: "Go",
            id: "go",
            posistion: 0,
            group: "Special",
            rel: {
                Square: "Go",
                "Probability % (Jail Short)": 3.0961,
                Rank: 3,
                "Probability % (Jail Long)": 2.9143,
            },
            averageProbability: 3.0052,
        },
        {
            name: "Income Tax",
            id: "incometax",
            group: "Special",
            posistion: 4,
            rel: {
                Square: "Income Tax",
                "Probability % (Jail Short)": 2.3285,
                Rank: 27,
                "Probability % (Jail Long)": 2.1934,
            },
            averageProbability: 2.2609500000000002,
        },
        {
            name: "Jail / Just Visiting",
            id: "jail",
            posistion: 10,
            group: "Special",
            averageProbability: 8.897,
        },
        {
            name: "Chance",
            id: "chance",
            group: "Special",
            posistion: 36,
            rel: {
                Square: "Chance",
                "Probability % (Jail Short)": 0.865,
                Rank: 40,
                "Probability % (Jail Long)": 0.8152,
            },
            averageProbability: 0.8401000000000001,
        },
        {
            name: "Chance",
            id: "chance",
            group: "Special",
            posistion: 7,
            rel: {
                Square: "Chance",
                "Probability % (Jail Short)": 0.865,
                Rank: 40,
                "Probability % (Jail Long)": 0.8152,
            },
            averageProbability: 0.8401000000000001,
        },
        {
            name: "Chance",
            id: "chance",
            group: "Special",
            posistion: 22,
            rel: {
                Square: "Chance",
                "Probability % (Jail Short)": 0.865,
                Rank: 40,
                "Probability % (Jail Long)": 0.8152,
            },
            averageProbability: 0.8401000000000001,
        },
        {
            name: "Free Parking",
            id: "freeparking",
            group: "Special",
            posistion: 20,
            rel: {
                Square: "Free Parking",
                "Probability % (Jail Short)": 2.8836,
                Rank: 5,
                "Probability % (Jail Long)": 2.8253,
            },
            averageProbability: 2.85445,
        },
        {
            name: "Community Chest",
            id: "communitychest",
            group: "Special",
            posistion: 2,
            rel: {
                Square: "Community Chest",
                "Probability % (Jail Short)": 1.8849,
                Rank: 37,
                "Probability % (Jail Long)": 1.775,
            },
            averageProbability: 1.82995,
        },
        {
            name: "Community Chest",
            id: "communitychest",
            group: "Special",
            posistion: 33,
            rel: {
                Square: "Community Chest",
                "Probability % (Jail Short)": 1.8849,
                Rank: 37,
                "Probability % (Jail Long)": 1.775,
            },
            averageProbability: 1.82995,
        },
        {
            name: "Community Chest",
            id: "communitychest",
            group: "Special",
            posistion: 17,
            rel: {
                Square: "Community Chest",
                "Probability % (Jail Short)": 1.8849,
                Rank: 37,
                "Probability % (Jail Long)": 1.775,
            },
            averageProbability: 1.82995,
        },
        {
            name: "Go To Jail",
            id: "gotojail",
            group: "Special",
            posistion: 30,
            rel: {
                Square: "Go To Jail",
                "Probability % (Jail Short)": 0,
                Rank: 41,
                "Probability % (Jail Long)": 0,
            },
            averageProbability: 0,
        },
        {
            name: "Luxury Tax",
            id: "luxerytax",
            group: "Special",
            posistion: 38,
            averageProbability: 2.116,
        },
    ],
    mh = [
        { id: "go" },
        { id: "mediterraneanave" },
        { id: "communitychest" },
        { id: "balticave" },
        { id: "incometax" },
        { id: "readingrailroad" },
        { id: "orientalave" },
        { id: "chance" },
        { id: "vermontave" },
        { id: "connecticutave" },
        { id: "jail" },
        { id: "stcharlesplace" },
        { id: "electriccompany" },
        { id: "statesave" },
        { id: "virginiaave" },
        { id: "pennsylvaniarailroad" },
        { id: "stjamesplace" },
        { id: "communitychest" },
        { id: "tennesseeave" },
        { id: "newyorkave" },
        { id: "freeparking" },
        { id: "kentuckyave" },
        { id: "chance" },
        { id: "indianaave" },
        { id: "illinoisave" },
        { id: "borailroad" },
        { id: "atlanticave" },
        { id: "ventnorave" },
        { id: "waterworks" },
        { id: "marvingardens" },
        { id: "gotojail" },
        { id: "pacificave" },
        { id: "northcarolinaave" },
        { id: "communitychest" },
        { id: "pennsylvaniaave" },
        { id: "shortlinerailroad" },
        { id: "chance" },
        { id: "parkplace" },
        { id: "luxerytax" },
        { id: "boardwalk" },
    ],
    yh = [
        { title: "Advance to Go (Collect $200)", action: "move", tileid: "go" },
        {
            title: "Advance to Illinois Avenue - If you pass Go, collect $200",
            action: "move",
            tileid: "illinoisave",
        },
        {
            title: "Advance to St. Charles Place - If you pass Go, collect $200",
            action: "move",
            tileid: "stcharlesplace",
        },
        {
            title: "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.",
            action: "movenearest",
            groupid: "utility",
            rentmultiplier: 10,
        },
        {
            title: "Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.",
            action: "movenearest",
            groupid: "railroad",
            rentmultiplier: 2,
        },
        {
            title: "Bank pays you dividend of $50",
            action: "addfunds",
            amount: 50,
        },
        {
            title: "Get out of Jail Free - This card may be kept until needed, or traded/sold",
            action: "jail",
            subaction: "getout",
        },
        { title: "Go Back 3 Spaces", action: "move", count: -3 },
        {
            title: "Go to Jail - Go directly to Jail - Do not pass Go, do not collect $200",
            action: "jail",
            subaction: "goto",
        },
        {
            title: "Make general repairs on all your property - For each house pay $25 - For each hotel $100",
            action: "propertycharges",
            buildings: 25,
            hotels: 100,
        },
        { title: "Pay poor tax of $15", action: "removefunds", amount: 15 },
        {
            title: "Take a trip to Reading Railroad - If you pass Go, collect $200",
            action: "move",
            tileid: "readingrailroad",
        },
        {
            title: "Take a walk on the Boardwalk - Advance token to Boardwalk",
            action: "move",
            tileid: "boardwalk",
        },
        {
            title: "You have been elected Chairman of the Board - Pay each player $50",
            action: "removefundstoplayers",
            amount: 50,
        },
        {
            title: "Your building loan matures - Collect $150",
            action: "addfunds",
            amount: 50,
        },
    ],
    gh = [
        { title: "Advance to Go (Collect $200)", action: "move", tileid: "go" },
        {
            title: "Bank error in your favor - Collect $200 ",
            action: "addfunds",
            amount: 200,
        },
        { title: "Doctor fee - Pay $50", action: "removefunds", amount: 50 },
        {
            title: "From sale of stock you get $50",
            action: "addfunds",
            amount: 50,
        },
        { title: "Get Out of Jail Free", action: "jail", subaction: "getout" },
        {
            title: "Go to Jail - Go directly to jail - Do not pass Go - Do not collect $200",
            action: "jail",
            subaction: "goto",
        },
        {
            title: "Grand Opera Night - Collect $50 from every player for opening night seats",
            action: "addfundsfromplayers",
            amount: 50,
        },
        {
            title: "Holiday Fund matures - Receive $100",
            action: "addfunds",
            amount: 100,
        },
        {
            title: "Income tax refund - Collect $20",
            action: "addfunds",
            amount: 20,
        },
        {
            title: "Life insurance matures - Collect $100",
            action: "addfunds",
            amount: 100,
        },
        {
            title: "Pay hospital fees of $100",
            action: "removefunds",
            amount: 100,
        },
        {
            title: "Pay school fees of $150",
            action: "removefunds",
            amount: 150,
        },
        {
            title: "Receive $25 consultancy fee",
            action: "addfunds",
            amount: 25,
        },
        {
            title: "You are assessed for street repairs - $40 per house - $115 per hotel",
            action: "propertycharges",
            buildings: 40,
            hotels: 115,
        },
        {
            title: "You have won second prize in a beauty contest - Collect $10",
            action: "addfunds",
            amount: 10,
        },
        { title: "You inherit $100", action: "addfunds", amount: 100 },
    ],
    Gt = { properties: hh, tiles: mh, chance: yh, communitychest: gh };
function Ua(e) {
    const t = new Map(Gt.properties.map((o) => [o.posistion ?? 0, o]));
    let n = {},
        r = "Utilities";
    const i = t.get(e.posistion);
    if (i)
        return i.group === "Special"
            ? l.jsx(l.Fragment, {})
            : (i.group === "Utilities"
                  ? ((r = "Utilities"),
                    (n = {
                        cardCost: i.price ?? -1,
                        title: i.name ?? "error",
                        type: i.id.includes("water") ? "water" : "electricity",
                    }))
                  : i.group === "Railroad"
                  ? ((r = "Railroad"),
                    (n = { cardCost: i.price ?? -1, title: i.name ?? "error" }))
                  : ((r = "Street"),
                    (n = {
                        cardCost: i.price ?? -1,
                        hotelsCost: i.ohousecost ?? -1,
                        housesCost: i.housecost ?? -1,
                        rent: i.rent ?? -1,
                        multpliedrent: i.multpliedrent
                            ? [
                                  i.multpliedrent[0] ?? -1,
                                  i.multpliedrent[1] ?? -1,
                                  i.multpliedrent[2] ?? -1,
                                  i.multpliedrent[3] ?? -1,
                                  i.multpliedrent[4] ?? -1,
                              ]
                            : [-1, -1, -1, -1, -1],
                        rentWithColorSet: i.rent ? i.rent * 2 : -1,
                        title: i.name ?? "error",
                        group: i.group,
                    })),
              l.jsx("div", {
                  style: e.style,
                  onClick: e.OnClick,
                  children:
                      r === "Railroad"
                          ? l.jsx(En, { railroad: n })
                          : r === "Utilities"
                          ? l.jsx(En, { utility: n })
                          : l.jsx(En, { street: n }),
              }));
}
const vh = M.forwardRef((e, t) => {
        const n = new Map(Gt.properties.map((y) => [y.posistion ?? 0, y])),
            r = e.players.filter((y) => y.id === e.socket.id)[0];
        if (r === void 0)
            return l.jsx(l.Fragment, {
                children: "Could not read local player!",
            });
        M.useImperativeHandle(t, () => ({
            clickedOnBoard(y) {
                h(-1), a(""), f([]), o(y);
            },
        }));
        const [i, o] = M.useState(-1),
            [s, a] = M.useState(""),
            [u, f] = M.useState([]),
            [g, h] = M.useState(-1);
        function m() {
            h(-1), o(-1);
            const y = Array.from(n.values()).filter(
                    (d) => d.group != "Special"
                ),
                A = y.map((d) => [d.name, d.posistion]),
                P = y.map((d) => d.posistion.toString()),
                B = [];
            for (const d of P) d.includes(s) && B.push(parseInt(d));
            for (const d of A)
                d[0].toLowerCase().includes(s.toLowerCase()) && B.push(d[1]);
            f(B);
        }
        return (
            M.useEffect(m, [s]),
            l.jsxs(l.Fragment, {
                children: [
                    l.jsx("h3", {
                        style: { textAlign: "center" },
                        children: "Propreties",
                    }),
                    l.jsx("input", {
                        type: "text",
                        onChange: (y) => a(y.currentTarget.value),
                        placeholder: "Search for global cards...",
                    }),
                    l.jsx("div", {
                        className: "propertyList",
                        style: {
                            overflowY: "auto",
                            position: "relative",
                            flexGrow: 1,
                            cursor: "pointer",
                        },
                        children:
                            s.length > 0
                                ? u.map((y, A) => {
                                      var P, B;
                                      return l.jsx(l.Fragment, {
                                          children:
                                              g === y
                                                  ? l.jsx("center", {
                                                        children: l.jsx(
                                                            Ua,
                                                            {
                                                                style: {
                                                                    cursor: "pointer",
                                                                    marginBottom: 25,
                                                                    marginTop: 10,
                                                                },
                                                                posistion: y,
                                                                OnClick: () => {
                                                                    h(-1);
                                                                },
                                                            },
                                                            A
                                                        ),
                                                    })
                                                  : l.jsxs(
                                                        "div",
                                                        {
                                                            onClick: () => h(y),
                                                            className:
                                                                "proprety-nav",
                                                            children: [
                                                                l.jsx("i", {
                                                                    className:
                                                                        "box",
                                                                    style: {
                                                                        backgroundColor:
                                                                            Ii(
                                                                                ((P =
                                                                                    n.get(
                                                                                        y
                                                                                    )) ==
                                                                                null
                                                                                    ? void 0
                                                                                    : P.group) ??
                                                                                    ""
                                                                            ),
                                                                    },
                                                                }),
                                                                l.jsx("h3", {
                                                                    children:
                                                                        ((B =
                                                                            n.get(
                                                                                y
                                                                            )) ==
                                                                        null
                                                                            ? void 0
                                                                            : B.name) ??
                                                                        "",
                                                                }),
                                                            ],
                                                        },
                                                        A
                                                    ),
                                      });
                                  })
                                : i === -1
                                ? r.properties.map((y, A) => {
                                      var P;
                                      return l.jsxs(
                                          "div",
                                          {
                                              onClick: () => o(y.posistion),
                                              className: "proprety-nav",
                                              children: [
                                                  l.jsx("i", {
                                                      className: "box",
                                                      style: {
                                                          backgroundColor: Ii(
                                                              y.group
                                                          ),
                                                      },
                                                  }),
                                                  l.jsx("h3", {
                                                      children:
                                                          ((P = n.get(
                                                              y.posistion
                                                          )) == null
                                                              ? void 0
                                                              : P.name) ?? "",
                                                  }),
                                                  l.jsx("div", {
                                                      children:
                                                          y.count == "h"
                                                              ? l.jsx("img", {
                                                                    src: kl.replace(
                                                                        "public/",
                                                                        ""
                                                                    ),
                                                                    alt: "",
                                                                })
                                                              : typeof y.count ==
                                                                    "number" &&
                                                                y.count > 0
                                                              ? l.jsxs(
                                                                    l.Fragment,
                                                                    {
                                                                        children:
                                                                            [
                                                                                l.jsx(
                                                                                    "p",
                                                                                    {
                                                                                        children:
                                                                                            y.count,
                                                                                    }
                                                                                ),
                                                                                l.jsx(
                                                                                    "img",
                                                                                    {
                                                                                        src: Sl.replace(
                                                                                            "public/",
                                                                                            ""
                                                                                        ),
                                                                                        alt: "",
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                )
                                                              : l.jsx(
                                                                    l.Fragment,
                                                                    {}
                                                                ),
                                                  }),
                                              ],
                                          },
                                          A
                                      );
                                  })
                                : l.jsx("div", {
                                      children: l.jsx("center", {
                                          style: {
                                              transform:
                                                  "scale(1) translateY(-50%) translateX(-50%)",
                                              position: "absolute",
                                              top: "50%",
                                              left: "50%",
                                          },
                                          children: l.jsx(Ua, {
                                              style: {
                                                  transform: "scale(1.2)",
                                                  filter: "drop-shadow(5px 5px 0px rgba(255,255,255,20%))",
                                              },
                                              posistion: i,
                                              OnClick: () => {
                                                  o(-1);
                                              },
                                          }),
                                      }),
                                  }),
                    }),
                ],
            })
        );
    }),
    Ss = "./assets/roll-893dc331.png",
    wh = M.forwardRef((e, t) => {
        const n = e.players.filter((s) => s.id === e.socket.id)[0],
            r = new Map(Gt.properties.map((s) => [s.posistion ?? 0, s])),
            [i, o] = M.useState();
        return (
            M.useImperativeHandle(t, () => ({
                clickdOnPlayer(s) {
                    for (const a of e.players) a.id === s && o(a);
                },
            })),
            l.jsxs(l.Fragment, {
                children: [
                    l.jsxs("div", {
                        className: n !== void 0 ? "container-top" : "",
                        style: n === void 0 ? { height: "100%" } : {},
                        children: [
                            l.jsx("h3", {
                                "data-clickable": i !== void 0,
                                style: { textAlign: "center" },
                                onClick: () => {
                                    i !== void 0 && o(void 0);
                                },
                                children: "Players",
                            }),
                            i != null
                                ? l.jsxs(l.Fragment, {
                                      children: [
                                          l.jsx("h4", { children: "Cards" }),
                                          l.jsx("h4", {
                                              children: "Propreties",
                                          }),
                                          i.properties.length === 0
                                              ? l.jsx("p", { children: "none" })
                                              : i.properties.map((s, a) => {
                                                    var u;
                                                    return l.jsxs(
                                                        "div",
                                                        {
                                                            onClick: () => {
                                                                o(void 0),
                                                                    e.clickedOnPlayer(
                                                                        s.posistion
                                                                    );
                                                            },
                                                            className:
                                                                "proprety-nav",
                                                            children: [
                                                                l.jsx("i", {
                                                                    className:
                                                                        "box",
                                                                    style: {
                                                                        backgroundColor:
                                                                            Ii(
                                                                                s.group
                                                                            ),
                                                                    },
                                                                }),
                                                                l.jsx("h3", {
                                                                    children:
                                                                        ((u =
                                                                            r.get(
                                                                                s.posistion
                                                                            )) ==
                                                                        null
                                                                            ? void 0
                                                                            : u.name) ??
                                                                        "",
                                                                }),
                                                                l.jsx("div", {
                                                                    children:
                                                                        s.count ==
                                                                        "h"
                                                                            ? l.jsx(
                                                                                  "img",
                                                                                  {
                                                                                      src: kl.replace(
                                                                                          "public/",
                                                                                          ""
                                                                                      ),
                                                                                      alt: "",
                                                                                  }
                                                                              )
                                                                            : typeof s.count ==
                                                                                  "number" &&
                                                                              s.count >
                                                                                  0
                                                                            ? l.jsxs(
                                                                                  l.Fragment,
                                                                                  {
                                                                                      children:
                                                                                          [
                                                                                              l.jsx(
                                                                                                  "p",
                                                                                                  {
                                                                                                      children:
                                                                                                          s.count,
                                                                                                  }
                                                                                              ),
                                                                                              l.jsx(
                                                                                                  "img",
                                                                                                  {
                                                                                                      src: Sl.replace(
                                                                                                          "public/",
                                                                                                          ""
                                                                                                      ),
                                                                                                      alt: "",
                                                                                                  }
                                                                                              ),
                                                                                          ],
                                                                                  }
                                                                              )
                                                                            : l.jsx(
                                                                                  l.Fragment,
                                                                                  {}
                                                                              ),
                                                                }),
                                                            ],
                                                        },
                                                        a
                                                    );
                                                }),
                                      ],
                                  })
                                : l.jsx("div", {
                                      className: "playersInfos",
                                      children: e.players.map((s, a) =>
                                          l.jsx(l.Fragment, {
                                              children: l.jsxs(
                                                  "div",
                                                  {
                                                      className: "playerInfo",
                                                      onClick: () => {
                                                          const u =
                                                              document.querySelector(
                                                                  `div.player[player-id="${s.id}"]`
                                                              );
                                                          (u.style.animation =
                                                              "spin2 1s cubic-bezier(.21, 1.57, .55, 1) infinite"),
                                                              setTimeout(() => {
                                                                  u.style.animation =
                                                                      "";
                                                              }, 1 * 1e3);
                                                      },
                                                      onDoubleClick: () => {
                                                          o(s);
                                                      },
                                                      children: [
                                                          l.jsx("p", {
                                                              children:
                                                                  s.username,
                                                          }),
                                                          s.id === e.currentTurn
                                                              ? l.jsx("img", {
                                                                    src: Ss.replace(
                                                                        "public/",
                                                                        ""
                                                                    ),
                                                                })
                                                              : l.jsx(
                                                                    l.Fragment,
                                                                    {}
                                                                ),
                                                          s.getoutCards > 0
                                                              ? l.jsx("p", {
                                                                    className:
                                                                        "orange",
                                                                    children:
                                                                        s.getoutCards,
                                                                })
                                                              : l.jsx(
                                                                    l.Fragment,
                                                                    {}
                                                                ),
                                                          l.jsx("p", {
                                                              children:
                                                                  s.balance,
                                                          }),
                                                          l.jsx("p", {
                                                              children:
                                                                  s.properties
                                                                      .length,
                                                          }),
                                                      ],
                                                  },
                                                  a
                                              ),
                                          })
                                      ),
                                  }),
                        ],
                    }),
                    n !== void 0
                        ? l.jsx(l.Fragment, {
                              children: l.jsx("div", {
                                  className: "container-bottom",
                                  style: {},
                                  children: l.jsxs("p", {
                                      style: { margin: 0, marginTop: 5 },
                                      children: [" ", n.balance, " M"],
                                  }),
                              }),
                          })
                        : l.jsx(l.Fragment, {}),
                ],
            })
        );
    }),
    Sh = M.forwardRef((e, t) => {
        const [n, r] = M.useState(0),
            [i, o] = M.useState([]);
        function s() {
            u(e.players);
        }
        const [a, u] = M.useState(e.players);
        M.useImperativeHandle(t, () => ({
            addMessage(h) {
                if ((o((m) => [...m, h]), n !== 2)) {
                    const m = document.getElementById("chatIconChange"),
                        y = m.querySelector("img");
                    (y.style.animation =
                        "spin3 2s cubic-bezier(.68,.05,.49,.95) infinite"),
                        (y.src = rh.replace("/public", "")),
                        (m.onclick = () => {
                            (y.src = ba.replace("/public", "")),
                                (y.style.animation = ""),
                                r(2),
                                (m.onclick = () => {
                                    r(2);
                                });
                        });
                }
            },
            reRenderPlayerList: s,
            clickedOnBoard: (h) => {
                r(1),
                    requestAnimationFrame(() => {
                        var m;
                        (m = f.current) == null || m.clickedOnBoard(h);
                    });
            },
        }));
        const f = M.useRef(null),
            g = M.useRef(null);
        return (
            M.useEffect(s, [
                e.players.map((h) => h.properties),
                e.players.map((h) => h.balance),
            ]),
            M.useEffect(() => {
                const h = (m) => {
                    const y = parseInt(m.key);
                    if (!isNaN(y)) {
                        const A = document.activeElement;
                        (A === null || A.tagName !== "INPUT") && r(y - 1);
                    }
                };
                return (
                    document.addEventListener("keydown", h),
                    () => {
                        document.removeEventListener("keydown", h);
                    }
                );
            }, []),
            l.jsxs("nav", {
                className: "main",
                children: [
                    l.jsxs("nav", {
                        className: "header",
                        children: [
                            l.jsx("img", {
                                style: { marginTop: 75 },
                                className: "header",
                                src: lh.replace("public/", ""),
                            }),
                            l.jsxs("div", {
                                className: "upper",
                                children: [
                                    l.jsx("div", {
                                        "data-selected": n == 0,
                                        onClick: () => r(0),
                                        "data-tooltip-hover": "players",
                                        className: "button",
                                        children: l.jsx("img", {
                                            src: nh.replace("public/", ""),
                                            alt: "",
                                        }),
                                    }),
                                    l.jsx("div", {
                                        "data-selected": n == 1,
                                        onClick: () => r(1),
                                        "data-tooltip-hover": "propreties",
                                        className: "button",
                                        children: l.jsx("img", {
                                            src: oh.replace("public/", ""),
                                            alt: "",
                                        }),
                                    }),
                                    l.jsx("div", {
                                        "data-selected": n == 2,
                                        onClick: () => r(2),
                                        "data-tooltip-hover": "chat",
                                        className: "button",
                                        id: "chatIconChange",
                                        children: l.jsx("img", {
                                            src: ba.replace("public/", ""),
                                            alt: "",
                                        }),
                                    }),
                                ],
                            }),
                            l.jsxs("div", {
                                className: "lower",
                                children: [
                                    l.jsx("div", {
                                        "data-selected": n == 3,
                                        onClick: () => r(3),
                                        "data-tooltip-hover": "settings",
                                        className: "button",
                                        children: l.jsx("img", {
                                            src: sh.replace("public/", ""),
                                            alt: "",
                                        }),
                                    }),
                                    l.jsx("div", {
                                        "data-tooltip": "leave",
                                        className: "button color",
                                        "data-tooltip-hover": "leave",
                                        children: l.jsx("img", {
                                            src: ih.replace("public/", ""),
                                            alt: "",
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    l.jsx("nav", {
                        className: "content",
                        "data-index": n > 3 || n < 0 ? 0 : n,
                        children:
                            n == 1
                                ? l.jsx(vh, {
                                      ref: f,
                                      players: a,
                                      socket: e.socket,
                                  })
                                : n == 2
                                ? l.jsxs(l.Fragment, {
                                      children: [
                                          l.jsx("h3", {
                                              style: { textAlign: "center" },
                                              children: "Chat",
                                          }),
                                          l.jsxs("div", {
                                              className: "main-chat",
                                              children: [
                                                  l.jsx("div", {
                                                      className: "messages",
                                                      children: i.map((h, m) =>
                                                          l.jsxs(
                                                              "div",
                                                              {
                                                                  className:
                                                                      "message",
                                                                  children: [
                                                                      l.jsxs(
                                                                          "p",
                                                                          {
                                                                              children:
                                                                                  [
                                                                                      h.from,
                                                                                      ":",
                                                                                  ],
                                                                          }
                                                                      ),
                                                                      l.jsx(
                                                                          "p",
                                                                          {
                                                                              children:
                                                                                  h.message,
                                                                          }
                                                                      ),
                                                                  ],
                                                              },
                                                              m
                                                          )
                                                      ),
                                                  }),
                                                  l.jsx("input", {
                                                      placeholder:
                                                          "Type Message Here...",
                                                      type: "text",
                                                      onKeyDown: (h) => {
                                                          if (
                                                              h.which === 13 &&
                                                              h.currentTarget
                                                                  .value
                                                                  .length > 0
                                                          ) {
                                                              const m =
                                                                  h
                                                                      .currentTarget
                                                                      .value;
                                                              e.socket.emit(
                                                                  "message",
                                                                  m
                                                              ),
                                                                  (h.currentTarget.value =
                                                                      "");
                                                          }
                                                      },
                                                  }),
                                              ],
                                          }),
                                      ],
                                  })
                                : n == 3
                                ? l.jsxs(l.Fragment, {
                                      children: [
                                          l.jsx("h3", {
                                              style: { textAlign: "center" },
                                              children: "Settings",
                                          }),
                                          l.jsxs("p", {
                                              children: [
                                                  "Game Engine",
                                                  " ",
                                                  l.jsxs("select", {
                                                      name: "",
                                                      id: "",
                                                      children: [
                                                          l.jsx("option", {
                                                              children: "2D",
                                                          }),
                                                          l.jsx("option", {
                                                              children: "3D",
                                                          }),
                                                      ],
                                                  }),
                                              ],
                                          }),
                                      ],
                                  })
                                : l.jsx(wh, {
                                      ref: g,
                                      clickedOnPlayer: (h) => {
                                          r(1),
                                              requestAnimationFrame(() => {
                                                  var m;
                                                  (m = f.current) == null ||
                                                      m.clickedOnBoard(h);
                                              });
                                      },
                                      players: a,
                                      socket: e.socket,
                                      currentTurn: e.currentTurn,
                                  }),
                    }),
                ],
            })
        );
    });
function qa({ chance: e, chest: t }) {
    return e !== void 0
        ? l.jsx(kh, { args: e })
        : t !== void 0
        ? l.jsx(xh, { args: t })
        : l.jsx(l.Fragment, {});
}
function kh({ args: e }) {
    return l.jsxs("div", {
        "data-b-image": "chance",
        className: "chance-card",
        children: [
            l.jsx("div", {}),
            l.jsx("div", { children: l.jsx("h3", { children: e.title }) }),
            l.jsx("div", {}),
        ],
    });
}
function xh({ args: e }) {
    return l.jsxs("div", {
        "data-b-image": "chest",
        className: "chance-card",
        children: [
            l.jsx("div", {}),
            l.jsx("div", { children: l.jsx("h3", { children: e.title }) }),
            l.jsx("div", {}),
        ],
    });
}
const Ph = M.forwardRef((e, t) => {
        const n = new Map(Gt.properties.map((v) => [v.posistion ?? 0, v])),
            [r, i] = M.useState(!1),
            [o, s] = M.useState(!1),
            [a, u] = M.useState(!1),
            [f, g] = M.useState(!1),
            [h, m] = M.useState(0),
            [y, A] = M.useState(1),
            [P, B] = M.useState({
                cardCost: -1,
                hotelsCost: -1,
                housesCost: -1,
                multpliedrent: [-1, -1, -1, -1, -1],
                rent: -1,
                rentWithColorSet: -1,
                title: "deafult",
                type: "electricity",
            }),
            [d, c] = M.useState("Street");
        function p(v, C) {
            const w = document.getElementById("dice-panel");
            var T = !0;
            function U() {
                var $ = "./c";
                const q = Math.floor(Math.random() * 6) + 1,
                    j = Math.floor(Math.random() * 6) + 1;
                w.innerHTML = `
                <img src="${$}${q}.png" />
                <img src="${$}${j}.png" />
                
                `;
            }
            function F() {
                if (T) U(), requestAnimationFrame(F);
                else {
                    var $ = "./c";
                    w.innerHTML = `
                <img src="${$}${v}.png" />
                <img src="${$}${C}.png" />
                `;
                }
            }
            setTimeout(() => {
                T = !1;
            }, 1e3),
                requestAnimationFrame(F);
        }
        function k(v) {
            const C = document.querySelector("img#moneyAnimations");
            if (C === null) return;
            const w = C;
            w.setAttribute("data-anim", "0"),
                requestAnimationFrame(() => {
                    w.setAttribute("data-anim", v.toString()),
                        setTimeout(() => {
                            w.setAttribute("data-anim", "0");
                        }, 1e3);
                });
        }
        return (
            M.useImperativeHandle(t, () => ({
                diceResults: (v) => {
                    p(...v.l),
                        i(!0),
                        setTimeout(() => {
                            i(!1), v.onDone();
                        }, v.time);
                },
                freeDice: () => {
                    const v = document.getElementById("dice-panel");
                    (v.innerHTML = ""), s(!1);
                },
                setStreet: (v) => {
                    const C = e.players.filter(($) => $.id === e.socket.id)[0],
                        w = n.get(v.location);
                    if (
                        w &&
                        v.location !== -1 &&
                        v.location < 40 &&
                        v.location >= 0
                    ) {
                        let $ = function (q, j, N) {
                            function z() {
                                if (q) {
                                    const R = document.querySelector(
                                        "div#advanced-responses"
                                    );
                                    if (R) {
                                        let O = function (b) {
                                            switch (b) {
                                                case "h":
                                                    return 5;
                                                default:
                                                    return b;
                                            }
                                        };
                                        const x = n.get(j);
                                        if (!x) return;
                                        const S = R;
                                        for (; S.firstChild; )
                                            S.removeChild(S.firstChild);
                                        const L = Array.from(
                                                new Map(
                                                    C.properties.map((b, W) => [
                                                        W,
                                                        b,
                                                    ])
                                                ).entries()
                                            ).filter(
                                                (b) =>
                                                    b[1].posistion ===
                                                    v.location
                                            )[0][0],
                                            I = O(C.properties[L].count);
                                        for (let b = I + 1; b < 6; b++) {
                                            const W =
                                                document.createElement(
                                                    "button"
                                                );
                                            b === 5
                                                ? ((W.innerHTML = "buy hotel"),
                                                  (W.disabled =
                                                      b !== I + 1 ||
                                                      (x.ohousecost ?? 0) >
                                                          (e.players.filter(
                                                              (K) =>
                                                                  K.id ===
                                                                  e.socket.id
                                                          )[0].balance ?? 0)),
                                                  (W.onclick = () => {
                                                      v.onResponse(
                                                          "advance-buy",
                                                          { state: b, money: 1 }
                                                      ),
                                                          u(!1);
                                                  }))
                                                : ((W.innerHTML = `buy ${b} house${
                                                      b > 1 ? "s" : ""
                                                  }`),
                                                  (W.onclick = () => {
                                                      v.onResponse(
                                                          "advance-buy",
                                                          {
                                                              state: b,
                                                              money: b - I,
                                                          }
                                                      ),
                                                          u(!1);
                                                  }),
                                                  (W.disabled =
                                                      (b - I) *
                                                          (x.housecost ?? 0) >
                                                      (e.players.filter(
                                                          (K) =>
                                                              K.id ===
                                                              e.socket.id
                                                      )[0].balance ?? 0))),
                                                S.appendChild(W);
                                        }
                                        const D =
                                            document.createElement("button");
                                        (D.innerHTML = "CONTINUE"),
                                            (D.onclick = () => {
                                                v.onResponse("nothing", {}),
                                                    u(!1);
                                            }),
                                            S.appendChild(D);
                                    } else requestAnimationFrame(z);
                                } else {
                                    const R = document.querySelector(
                                        "button#card-response-yes"
                                    );
                                    R
                                        ? ((R.onclick = () => {
                                              N !== void 0
                                                  ? v.onResponse(
                                                        "special_action",
                                                        { rolls: N.rolls }
                                                    )
                                                  : v.onResponse("buy", {}),
                                                  u(!1);
                                          }),
                                          (document.querySelector(
                                              "button#card-response-no"
                                          ).onclick = () => {
                                              v.onResponse("nothing", {}),
                                                  u(!1);
                                          }))
                                        : requestAnimationFrame(z);
                                }
                            }
                            return z;
                        };
                        var T = !1,
                            U = !1,
                            F = 0;
                        for (const q of C.properties)
                            !T &&
                                q.posistion === v.location &&
                                ((T = !0), (F = q.count));
                        for (const q of e.players)
                            for (const j of q.properties)
                                j.posistion === v.location &&
                                    q.id != C.id &&
                                    (U = !0);
                        if (w.group === "Special")
                            v.onResponse("nothing", {}), u(!1);
                        else if (w.group === "Utilities")
                            if (T) v.onResponse("nothing", {});
                            else if (U) {
                                v.onResponse("someones", {}), u(!1);
                                return;
                            } else {
                                c("Utilities");
                                const q = {
                                    cardCost: w.price ?? -1,
                                    title: w.name ?? "error",
                                    type: w.id.includes("water")
                                        ? "water"
                                        : "electricity",
                                };
                                B(q),
                                    g(!1),
                                    u(!0),
                                    requestAnimationFrame(
                                        $(!1, v.location, { rolls: v.rolls })
                                    );
                            }
                        else if (w.group === "Railroad")
                            if (T) v.onResponse("nothing", {});
                            else if (U) {
                                v.onResponse("someones", {}), u(!1);
                                return;
                            } else {
                                c("Railroad");
                                const q = {
                                    cardCost: w.price ?? -1,
                                    title: w.name ?? "error",
                                };
                                B(q),
                                    u(!0),
                                    requestAnimationFrame($(!1, v.location));
                            }
                        else {
                            if (
                                !T &&
                                C.balance -
                                    ((w == null ? void 0 : w.price) ?? 0) <
                                    0
                            ) {
                                u(!1), v.onResponse("nothing", {});
                                return;
                            }
                            if (!T) {
                                if (U) {
                                    v.onResponse("someones", {}), u(!1);
                                    return;
                                }
                            }
                            if (T && F === "h") {
                                u(!1), v.onResponse("nothing", {});
                                return;
                            }
                            c("Street");
                            const q = {
                                cardCost: w.price ?? -1,
                                hotelsCost: w.ohousecost ?? -1,
                                housesCost: w.housecost ?? -1,
                                rent: w.rent ?? -1,
                                multpliedrent: w.multpliedrent
                                    ? [
                                          w.multpliedrent[0] ?? -1,
                                          w.multpliedrent[1] ?? -1,
                                          w.multpliedrent[2] ?? -1,
                                          w.multpliedrent[3] ?? -1,
                                          w.multpliedrent[4] ?? -1,
                                      ]
                                    : [-1, -1, -1, -1, -1],
                                rentWithColorSet: w.rent ? w.rent * 2 : -1,
                                title: w.name ?? "error",
                                group: w.group,
                            };
                            B(q),
                                g(!!T),
                                u(!0),
                                requestAnimationFrame($(T, v.location));
                        }
                    } else v.onResponse("nothing", {}), u(!1);
                },
                chorch(v, C, w) {
                    c(C ? "Chance" : "CommunityChest"),
                        B({ title: v.title }),
                        u(!0),
                        setTimeout(() => {
                            u(!1);
                        }, w);
                },
                applyAnimation(v) {
                    k(v);
                },
                showJailsButtons: (v) => {
                    const C = document.querySelector(
                            'button.roll-button[data-button-type="pay"]'
                        ),
                        w = document.querySelector(
                            'button.roll-button[data-button-type="card"]'
                        ),
                        T = document.querySelector(
                            'button.roll-button[data-button-type="roll"]'
                        );
                    function U() {
                        (T.onclick = () => {
                            s(!0),
                                requestAnimationFrame(() => {
                                    e.socket.emit("roll_dice");
                                });
                        }),
                            s(!0),
                            (w.onclick = () => {}),
                            (w.style.translate = "0px 0px"),
                            w.setAttribute("aria-disabled", "true"),
                            setTimeout(() => {
                                w.setAttribute("aria-disabled", "true");
                            }, 300),
                            (C.style.translate = "0px 0px"),
                            (C.onclick = () => {}),
                            C.setAttribute("aria-disabled", "true"),
                            setTimeout(() => {
                                C.setAttribute("aria-disabled", "true");
                            }, 300);
                    }
                    if (
                        (C.setAttribute("aria-disabled", "false"),
                        (C.style.translate = "0px -80px"),
                        (C.onclick = () => {
                            k(1),
                                e.socket.emit("unjail", "pay"),
                                e.socket.emit("roll_dice"),
                                U();
                        }),
                        v)
                    ) {
                        const F = w;
                        F.setAttribute("aria-disabled", "false"),
                            (F.style.translate = "0px -160px"),
                            (F.style.backgroundColor = "gold"),
                            (F.onclick = () => {
                                e.socket.emit("unjail", "card"),
                                    e.socket.emit("roll_dice"),
                                    U();
                            });
                    }
                    T.onclick = () => {
                        e.socket.emit("roll_dice"), U(), s(!0);
                    };
                },
            })),
            M.useEffect(() => {
                document.getElementById("locations").onwheel = (C) => {
                    C.shiftKey
                        ? A((w) => w + C.deltaY / 1e3)
                        : m((w) => w + (C.deltaY * 22.5) / 100);
                };
                const v = Array.from(n.values()).filter(
                    (C) => C.group != "Special"
                );
                for (const C of v) {
                    const w = document
                        .getElementById("locations")
                        .querySelector(
                            `div.street[data-position="${C.posistion}"]`
                        );
                    (w.onclick = () => {
                        e.clickedOnBoard(C.posistion);
                    }),
                        (w.onmousemove = () => {
                            (w.style.cursor = "pointer"),
                                (w.style.backgroundColor = "rgba(0,0,0,15%)");
                        }),
                        (w.onmouseleave = () => {
                            (w.style.cursor = "unset"),
                                (w.style.scale = "1"),
                                (w.style.backgroundColor = "rgba(0,0,0,0%)");
                        });
                }
            }, []),
            M.useEffect(() => {
                var v = !0,
                    C = () => {
                        var T, U, F, $;
                        for (const q of e.players.filter(
                            (j) => j.balance >= 0
                        )) {
                            const j = q.position,
                                N = q.icon + 1,
                                z = q.isInJail,
                                R = document.querySelector(
                                    `div.player[player-id="${q.id}"]`
                                );
                            if (R !== null) {
                                const O =
                                    (T = R.parentElement) == null
                                        ? void 0
                                        : T.getAttribute("data-position");
                                if (
                                    (parseInt(O) !== q.position &&
                                        ((U = R.parentElement) == null ||
                                            U.removeChild(R),
                                        (F = document.querySelector(
                                            `div.street[data-position="${j}"]`
                                        )) == null || F.appendChild(R)),
                                    !z &&
                                        R.querySelector("img.jailIcon") != null)
                                ) {
                                    const x = R.querySelector("img.jailIcon");
                                    R.removeChild(x);
                                }
                                if (
                                    z &&
                                    R.querySelector("img.jailIcon") == null
                                ) {
                                    for (; R.firstChild; )
                                        R.removeChild(R.firstChild);
                                    const x = document.createElement("img");
                                    (x.src = `./p${N}.png`), R.appendChild(x);
                                    const S = document.createElement("img");
                                    (S.src = "./jail.png"),
                                        (S.className = "jailIcon"),
                                        R.appendChild(S);
                                }
                            } else {
                                const O = document.createElement("div");
                                (O.className = "player"),
                                    O.setAttribute("player-id", q.id),
                                    O.setAttribute(
                                        "player-position",
                                        q.position.toString()
                                    ),
                                    O.setAttribute(
                                        "data-tooltip-hover",
                                        q.username
                                    );
                                const x = document.createElement("img");
                                if (
                                    ((x.src = `./p${N}.png`),
                                    O.appendChild(x),
                                    z)
                                ) {
                                    const S = document.createElement("img");
                                    (S.src = "./jail.png"),
                                        (S.className = "jailIcon"),
                                        O.appendChild(S);
                                }
                                ($ = document.querySelector(
                                    `div.street[data-position="${j}"]`
                                )) == null || $.appendChild(O);
                            }
                        }
                        function w() {
                            const q = document.getElementById("display-houses"),
                                j = Array.from(
                                    q.querySelectorAll("div.street-houses")
                                );
                            for (const z of j) {
                                const R = z;
                                for (; R.firstChild; )
                                    R.removeChild(R.firstChild);
                                (R.onclick = () => {}),
                                    (R.style.cursor = "unset"),
                                    (R.style.backgroundColor =
                                        "rgba(0,0,0,0%)"),
                                    (R.style.padding = "0px"),
                                    (R.innerHTML = ""),
                                    R.setAttribute("data-tooltip-hover", ""),
                                    (R.style.zIndex = "unset");
                            }
                            for (const z of e.players)
                                for (const R of z.properties) {
                                    const O = R.posistion,
                                        x = R.count,
                                        S = q.querySelector(
                                            `div.street-houses[data-position="${O}"`
                                        );
                                    if (S != null) {
                                        const L = S;
                                        switch (
                                            (L.setAttribute(
                                                "data-tooltip-hover",
                                                z.username
                                            ),
                                            (L.onclick = () => {
                                                const I =
                                                    document.querySelector(
                                                        `div.player[player-id="${z.id}"]`
                                                    );
                                                (I.style.animation =
                                                    "spin2 1s cubic-bezier(.21, 1.57, .55, 1) infinite"),
                                                    setTimeout(() => {
                                                        I.style.animation = "";
                                                    }, 1 * 1e3);
                                            }),
                                            (L.style.cursor = "pointer"),
                                            (L.style.zIndex = "5"),
                                            x)
                                        ) {
                                            case 0:
                                                L.style.backgroundColor =
                                                    "rgba(0,0,0,25%)";
                                                var N = 0;
                                                if (R.group === "Railroad") {
                                                    const D =
                                                        z.properties.filter(
                                                            (K) =>
                                                                K.group ===
                                                                "Railroad"
                                                        ).length;
                                                    var N = [25, 50, 100, 200][
                                                        D
                                                    ];
                                                } else if (
                                                    R.group === "Utilities" &&
                                                    R.rent
                                                ) {
                                                    const D =
                                                        z.properties.filter(
                                                            (b) =>
                                                                b.group ===
                                                                "Utilities"
                                                        ).length === 2
                                                            ? 10
                                                            : 4;
                                                    N = R.rent * D;
                                                }
                                                N !== 0 &&
                                                    ((L.innerHTML = `<p>${N}M</p>`),
                                                    (L.style.backgroundColor =
                                                        "rgba(0,0,0,75%)"));
                                                break;
                                            case 1:
                                            case 2:
                                            case 3:
                                            case 4:
                                                for (let D = 0; D < x; D++) {
                                                    const b =
                                                        document.createElement(
                                                            "img"
                                                        );
                                                    (b.src = Sl.replace(
                                                        "public/",
                                                        ""
                                                    )),
                                                        L.appendChild(b);
                                                }
                                                break;
                                            case "h":
                                                const I =
                                                    document.createElement(
                                                        "img"
                                                    );
                                                (I.src = kl.replace(
                                                    "public/",
                                                    ""
                                                )),
                                                    L.appendChild(I);
                                                break;
                                        }
                                    }
                                }
                        }
                        w(), v && requestAnimationFrame(C);
                    };
                return (
                    requestAnimationFrame(C),
                    () => {
                        v = !1;
                    }
                );
            }, [e.players]),
            M.useEffect(() => {
                const v = document.querySelector(
                    'button.roll-button[data-button-type="roll"]'
                );
                v.onclick = () => {
                    s(!0),
                        requestAnimationFrame(() => {
                            e.socket.emit("roll_dice");
                        });
                };
            }, []),
            l.jsx(l.Fragment, {
                children: l.jsxs("div", {
                    className: "game",
                    children: [
                        l.jsx("div", { id: "dice-panel", "data-show": r }),
                        l.jsxs("div", {
                            className: "board",
                            style: {
                                transform: `translateX(-50%) translateY(-50%) rotate(${h}deg) scale(${y})`,
                            },
                            id: "locations",
                            children: [
                                l.jsxs("div", {
                                    id: "display-houses",
                                    children: [
                                        l.jsx("div", {
                                            "data-position": "39",
                                            "data-rotate": "4",
                                            className: "street-houses",
                                            style: {
                                                top: "83%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "37",
                                            "data-rotate": "4",
                                            className: "street-houses",
                                            style: {
                                                top: "66.5%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "35",
                                            "data-rotate": "4",
                                            className: "street-houses",
                                            style: {
                                                top: "50%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "34",
                                            "data-rotate": "4",
                                            className: "street-houses",
                                            style: {
                                                top: "41.75%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "32",
                                            "data-rotate": "4",
                                            className: "street-houses",
                                            style: {
                                                top: "25.5%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "31",
                                            "data-rotate": "4",
                                            className: "street-houses",
                                            style: {
                                                top: "17.25%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "29",
                                            "data-rotate": "3",
                                            className: "street-houses",
                                            style: { top: "6.5%", left: "83%" },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "28",
                                            "data-rotate": "3",
                                            className: "street-houses",
                                            style: {
                                                top: "6.5%",
                                                left: "74.75%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "27",
                                            "data-rotate": "3",
                                            className: "street-houses",
                                            style: {
                                                top: "6.5%",
                                                left: "66.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "26",
                                            "data-rotate": "3",
                                            className: "street-houses",
                                            style: {
                                                top: "6.5%",
                                                left: "58.25%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "25",
                                            "data-rotate": "3",
                                            className: "street-houses",
                                            style: { top: "6.5%", left: "50%" },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "24",
                                            "data-rotate": "3",
                                            className: "street-houses",
                                            style: {
                                                top: "6.5%",
                                                left: "41.75%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "23",
                                            "data-rotate": "3",
                                            className: "street-houses",
                                            style: {
                                                top: "6.5%",
                                                left: "33.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "21",
                                            "data-rotate": "3",
                                            className: "street-houses",
                                            style: {
                                                top: "6.5%",
                                                left: "17.25%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "19",
                                            "data-rotate": "2",
                                            className: "street-houses",
                                            style: {
                                                top: "17.25%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "18",
                                            "data-rotate": "2",
                                            className: "street-houses",
                                            style: {
                                                top: "25.5%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "16",
                                            "data-rotate": "2",
                                            className: "street-houses",
                                            style: {
                                                top: "41.75%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "15",
                                            "data-rotate": "2",
                                            className: "street-houses",
                                            style: { top: "50%", left: "6.5%" },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "14",
                                            "data-rotate": "2",
                                            className: "street-houses",
                                            style: {
                                                top: "58.25%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "13",
                                            "data-rotate": "2",
                                            className: "street-houses",
                                            style: {
                                                top: "66.5%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "12",
                                            "data-rotate": "2",
                                            className: "street-houses",
                                            style: {
                                                top: "74.75%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "11",
                                            "data-rotate": "2",
                                            className: "street-houses",
                                            style: { top: "83%", left: "6.5%" },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "9",
                                            "data-rotate": "1",
                                            className: "street-houses",
                                            style: {
                                                top: "93.5%",
                                                left: "17.25%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "8",
                                            "data-rotate": "1",
                                            className: "street-houses",
                                            style: {
                                                top: "93.5%",
                                                left: "25.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "6",
                                            "data-rotate": "1",
                                            className: "street-houses",
                                            style: {
                                                top: "93.5%",
                                                left: "41.75%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "5",
                                            "data-rotate": "1",
                                            className: "street-houses",
                                            style: {
                                                top: "93.5%",
                                                left: "50%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "3",
                                            "data-rotate": "1",
                                            className: "street-houses",
                                            style: {
                                                top: "93.5%",
                                                left: "66.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "1",
                                            "data-rotate": "1",
                                            className: "street-houses",
                                            style: {
                                                top: "93.5%",
                                                left: "83%",
                                            },
                                        }),
                                    ],
                                }),
                                l.jsxs("div", {
                                    id: "display-streets",
                                    children: [
                                        l.jsx("div", {
                                            "data-position": "39",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "83%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "38",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "74.25%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "37",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "66.5%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "36",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "58.25%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "35",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "50%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "34",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "41.75%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "33",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "33.5%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "32",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "25.5%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "31",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "17.25%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "30",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 120,
                                                top: "6.5%",
                                                left: "93.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "29",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "6.5%",
                                                left: "83%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "28",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "6.5%",
                                                left: "74.75%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "27",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "6.5%",
                                                left: "66.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "26",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "6.5%",
                                                left: "58.25%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "25",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "6.5%",
                                                left: "50%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "24",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "6.5%",
                                                left: "41.75%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "23",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "6.5%",
                                                left: "33.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "22",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "6.5%",
                                                left: "25.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "21",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "6.5%",
                                                left: "17.25%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "20",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 120,
                                                top: "6.5%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "19",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "17.25%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "18",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "25.5%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "17",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "33.5%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "16",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "41.75%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "15",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "50%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "14",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "58.25%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "13",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "66.5%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "12",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "74.75%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "11",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 75,
                                                top: "83%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            className: "street",
                                            "data-position": "10",
                                            style: {
                                                width: 120,
                                                height: 120,
                                                top: "93.5%",
                                                left: "6.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "9",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "93.5%",
                                                left: "17.25%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "8",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "93.5%",
                                                left: "25.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "7",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "93.5%",
                                                left: "33.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "6",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "93.5%",
                                                left: "41.75%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "5",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "93.5%",
                                                left: "50%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "4",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "93.5%",
                                                left: "58.25%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "3",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "93.5%",
                                                left: "66.5%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "2",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "93.5%",
                                                left: "74.75%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "1",
                                            className: "street",
                                            style: {
                                                width: 75,
                                                height: 120,
                                                top: "93.5%",
                                                left: "83%",
                                            },
                                        }),
                                        l.jsx("div", {
                                            "data-position": "0",
                                            className: "street",
                                            style: {
                                                width: 120,
                                                height: 120,
                                                top: "93.5%",
                                                left: "93.5%",
                                            },
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        l.jsxs("div", {
                            className: "roll-panel",
                            children: [
                                l.jsx("button", {
                                    className: "roll-button",
                                    "data-button-type": "card",
                                    "aria-disabled": !0,
                                    style:
                                        e.myTurn && !o
                                            ? {}
                                            : { translate: "0px 250px" },
                                    children: l.jsx("p", { children: "CARD" }),
                                }),
                                l.jsx("button", {
                                    className: "roll-button",
                                    "data-button-type": "pay",
                                    "aria-disabled": !0,
                                    style:
                                        e.myTurn && !o
                                            ? {}
                                            : { translate: "0px 250px" },
                                    children: l.jsx("p", { children: "PAY" }),
                                }),
                                l.jsxs("button", {
                                    className: "roll-button",
                                    "data-button-type": "roll",
                                    "aria-disabled": !1,
                                    style:
                                        e.myTurn && !o
                                            ? {}
                                            : { translate: "0px 250px" },
                                    children: [
                                        l.jsx("img", {
                                            src: Ss.replace("public/", ""),
                                        }),
                                        l.jsx("p", {
                                            children: "ROLL THE DICE",
                                        }),
                                        " ",
                                        l.jsx("img", {
                                            src: Ss.replace("public/", ""),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        l.jsx("div", {
                            className:
                                d === "Chance" || d === "CommunityChest"
                                    ? "chance-display-actions"
                                    : "card-display-actions",
                            style: a
                                ? {}
                                : {
                                      transform:
                                          "translateY(-50%) translateX(-500%)",
                                  },
                            children:
                                d === "Chance" || d === "CommunityChest"
                                    ? l.jsx(l.Fragment, {
                                          children:
                                              d === "Chance"
                                                  ? l.jsx(qa, { chance: P })
                                                  : d === "CommunityChest"
                                                  ? l.jsx(qa, { chance: P })
                                                  : l.jsx(l.Fragment, {}),
                                      })
                                    : l.jsxs(l.Fragment, {
                                          children: [
                                              l.jsx("h3", {
                                                  children: f
                                                      ? "would you like to buy this card?"
                                                      : "you can buy houses and hotels",
                                              }),
                                              d === "Railroad"
                                                  ? l.jsx(En, { railroad: P })
                                                  : d === "Utilities"
                                                  ? l.jsx(En, { utility: P })
                                                  : l.jsx(En, { street: P }),
                                              l.jsx("div", {
                                                  children: l.jsx("center", {
                                                      children: f
                                                          ? l.jsx("div", {
                                                                id: "advanced-responses",
                                                            })
                                                          : l.jsxs(l.Fragment, {
                                                                children: [
                                                                    l.jsx(
                                                                        "button",
                                                                        {
                                                                            id: "card-response-yes",
                                                                            children:
                                                                                "YES",
                                                                        }
                                                                    ),
                                                                    l.jsx(
                                                                        "button",
                                                                        {
                                                                            id: "card-response-no",
                                                                            children:
                                                                                "NO",
                                                                        }
                                                                    ),
                                                                ],
                                                            }),
                                                  }),
                                              }),
                                          ],
                                      }),
                        }),
                        l.jsx("img", {
                            "data-anim": "0",
                            id: "moneyAnimations",
                            alt: "",
                        }),
                    ],
                }),
            })
        );
    }),
    fd = M.forwardRef(
        (e, t) => (
            M.useImperativeHandle(t, () => ({
                message(n, r, i, o) {
                    const s = document.querySelector("div.notify"),
                        a = document.createElement("div");
                    (a.className = "notification"),
                        (a.innerHTML = n),
                        a.setAttribute("data-notif-type", r ?? "info"),
                        s.appendChild(a);
                    var u = !1,
                        f = "popoff .7s cubic-bezier(.62,.25,1,-0.73)";
                    (a.onclick = () => {
                        (u = !0),
                            (a.style.animation = f),
                            setTimeout(() => {
                                s.removeChild(a), a.remove(), o && o();
                            }, 700);
                    }),
                        setTimeout(() => {
                            u ||
                                ((a.style.animation = f),
                                setTimeout(() => {
                                    s.removeChild(a), a.remove(), o && o();
                                }, 700));
                        }, (i ?? 2) * 1e3);
                },
                dialog(n) {
                    const r = document.querySelector("div.dialog-screen"),
                        i = document.querySelector("div.dialog-box"),
                        o = i.querySelector("div.texts"),
                        s = i.querySelector("div.buttons"),
                        a = n(
                            () => {
                                r.setAttribute("data-show", "false"),
                                    i.setAttribute("data-show", "false"),
                                    (i.style.animation =
                                        "dialogout 1s cubic-bezier(.5,0,1,.5)"),
                                    setTimeout(() => {
                                        (i.style.animation = ""),
                                            (o.innerHTML = ""),
                                            (s.innerHTML = "");
                                    }, 1e3);
                            },
                            (u, f) => {
                                const g = document.createElement("button");
                                return (g.onclick = f), (g.innerHTML = u), g;
                            }
                        );
                    i.setAttribute("data-show", "true"),
                        r.setAttribute("data-show", "true"),
                        (o.innerHTML = a.innerHTML);
                    for (const u of a.buttons) s.appendChild(u);
                },
            })),
            l.jsxs(l.Fragment, {
                children: [
                    " ",
                    l.jsx("div", { className: "notify" }),
                    l.jsx("div", {
                        className: "dialog-screen",
                        "data-show": !1,
                    }),
                    l.jsxs("div", {
                        className: "dialog-box",
                        "data-show": !1,
                        children: [
                            l.jsx("div", { className: "texts" }),
                            l.jsx("div", { className: "buttons" }),
                        ],
                    }),
                ],
            })
        )
    );
function Ch({ socket: e, name: t }) {
    const [n, r] = M.useState(new Map()),
        i = Array.from(n.values()),
        [o, s] = M.useState(""),
        [a, u] = M.useState(!1),
        [f, g] = M.useState(!1),
        h = M.useRef(null),
        m = M.useRef(null),
        y = M.useRef(null),
        A = new Map(Gt.properties.map((P) => [P.posistion ?? 0, P]));
    return (
        M.useEffect(() => {
            function P(j) {
                function N() {
                    n.delete(j),
                        r(new Map(n)),
                        requestAnimationFrame(() => {
                            n.has(j) && requestAnimationFrame(N);
                        });
                }
                N();
                function z() {
                    const R = document.querySelector(
                        `div.player[player-id="${j}"]`
                    );
                    R !== null &&
                        (R.parentElement && R.parentElement.removeChild(R),
                        R.remove(),
                        requestAnimationFrame(() => {
                            document.querySelector(
                                `div.player[player-id="${j}"]`
                            ) !== null && requestAnimationFrame(z);
                        }));
                }
                z();
            }
            function B(j, N, z = !0, R, O = !0) {
                var x = (j - N.position) % 40;
                (j < N.position || x < 0) && O && (x = 40 - N.position + j),
                    O || ((x = N.position - j), x < 0 && (x += 40));
                const S = 0.35 * 1e3 * x;
                console.log(
                    `generator target ${j} time ${S} current ${N.position}`
                );
                const L = Math.random();
                function I() {
                    var D = 0,
                        b = !1,
                        W = 0;
                    const K = document.querySelector(
                        `div.player[player-id="${N.id}"]`
                    );
                    (D = N.position),
                        (N.position += 1),
                        (K.style.animation =
                            "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)");
                    const ye = () => {
                        var fe, tt;
                        W < x &&
                            ((W += 1),
                            console.log(`${L} adding one to ${N.position}`),
                            (N.position = (N.position + (O ? 1 : -1)) % 40),
                            console.log(
                                `${L}  result of adding one to ${N.position}`
                            ),
                            N.position == 0 &&
                                z &&
                                ((N.balance += 200),
                                N.id === e.id &&
                                    ((fe = h.current) == null ||
                                        fe.applyAnimation(2)),
                                (b = !0),
                                r(new Map(n.set(N.id, N)))),
                            W == x - 1
                                ? ((N.position = j),
                                  (K.style.animation =
                                      "part 0.9s cubic-bezier(0,.7,.57,1)"),
                                  setTimeout(() => {
                                      K.style.animation = "";
                                  }, 900),
                                  !b &&
                                      D > N.position &&
                                      z &&
                                      ((N.balance += 200),
                                      N.id === e.id &&
                                          ((tt = h.current) == null ||
                                              tt.applyAnimation(2)),
                                      (b = !0),
                                      r(new Map(n.set(N.id, N)))),
                                  R && R())
                                : ((K.style.animation =
                                      "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)"),
                                  setTimeout(ye, 0.35 * 1e3)));
                    };
                    setTimeout(ye, 0.35 * 1e3);
                }
                return { func: I, time: S };
            }
            const d = (j) => {
                    s(j.turn_id.toString());
                    for (const N of j.other_players)
                        r(n.set(N.id, new Da(N.id, N.username).recieveJson(N)));
                },
                c = (j) => {
                    r(
                        new Map(
                            n.set(j.id, new Da(j.id, j.username).recieveJson(j))
                        )
                    );
                },
                p = (j) => {
                    const N = n.get(j.id);
                    N !== void 0 &&
                        ((N.ready = j.state), r(new Map(n.set(N.id, N))));
                },
                k = () => {
                    u(!0);
                },
                v = (j) => {
                    var N, z, R;
                    if ((P(j.id), s(j.turn), n.size > 2)) {
                        const O =
                            ((N = n.get(j.id)) == null ? void 0 : N.username) ??
                            "player";
                        (z = y.current) == null ||
                            z.message(`${O} disconected`, "error");
                    } else
                        (R = y.current) == null ||
                            R.dialog((O, x) => {
                                var S;
                                return {
                                    innerHTML: `<h3> YOU WON! </h3> <p> your the only left player with the balance of ${
                                        ((S = n.get(e.id)) == null
                                            ? void 0
                                            : S.balance) ?? 0
                                    } </p>`,
                                    buttons: [
                                        x("PLAY ANOTHER GAME", () => {
                                            O(), document.location.reload();
                                        }),
                                    ],
                                };
                            });
                },
                C = (j) => {
                    var z, R, O, x, S, L;
                    const N = n.get(j.from);
                    if (
                        (j.from !== e.id &&
                            N &&
                            (N.recieveJson(j.pJson),
                            r(new Map(n.set(j.from, N)))),
                        j.pJson.balance < 0)
                    ) {
                        if (j.pJson.id !== e.id)
                            if (n.size > 2) {
                                const I = j.pJson.username;
                                (z = y.current) == null ||
                                    z.message(`${I} lost`, "info");
                            } else if (n.has(e.id))
                                (R = y.current) == null ||
                                    R.dialog((I, D) => {
                                        var b;
                                        return {
                                            innerHTML: `<h3> YOU WON! </h3> <p> your the only left player with the balance of ${
                                                ((b = n.get(e.id)) == null
                                                    ? void 0
                                                    : b.balance) ?? 0
                                            } </p>`,
                                            buttons: [
                                                D("PLAY ANOTHER GAME", () => {
                                                    I(),
                                                        document.location.reload();
                                                }),
                                            ],
                                        };
                                    });
                            else {
                                const D =
                                    Array.from(n.values()).filter(
                                        (b) => b.id !== j.pJson.id
                                    )[0].username ?? 0;
                                (O = y.current) == null ||
                                    O.dialog((b, W) => {
                                        var K;
                                        return {
                                            innerHTML: `<h3> ${D} WON! </h3> <p> ${D} won with the balance of ${
                                                ((K = n.get(e.id)) == null
                                                    ? void 0
                                                    : K.balance) ?? 0
                                            } </p>`,
                                            buttons: [
                                                W("PLAY ANOTHER GAME", () => {
                                                    b(),
                                                        document.location.reload();
                                                }),
                                            ],
                                        };
                                    });
                            }
                        else
                            (x = y.current) == null ||
                                x.dialog((I, D) => {
                                    var b;
                                    return {
                                        innerHTML: `<h3> YOU LOST! </h3> <p> you lost your money and lost the monopol with a wanted balance of ${-(
                                            ((b = n.get(e.id)) == null
                                                ? void 0
                                                : b.balance) ?? 0
                                        )} </p>`,
                                        buttons: [
                                            D("CONTINUE WATCHING", () => {
                                                I();
                                            }),
                                            D("PLAY ANOTHER GAME", () => {
                                                I(), document.location.reload();
                                            }),
                                        ],
                                    };
                                });
                        P(j.pJson.id);
                    }
                    if ((s(j.turnId), j.turnId === e.id)) {
                        const I = n.get(j.turnId);
                        I &&
                            I.isInJail &&
                            ((S = h.current) == null ||
                                S.showJailsButtons(
                                    ((I == null ? void 0 : I.getoutCards) ??
                                        -1) > 0
                                ));
                    }
                    (L = m.current) == null || L.reRenderPlayerList();
                },
                w = (j) => {
                    var N;
                    (N = m.current) == null || N.addMessage(j);
                },
                T = (j) => {
                    var O;
                    const N = n.get(e.id),
                        z = n.get(j.turnId),
                        R = B(j.listOfNums[2], z, !0, () => {
                            j.turnId != e.id &&
                                j.listOfNums[2] === 30 &&
                                setTimeout(() => {
                                    B(10, z, !1, () => {
                                        (z.position = 10),
                                            (z.isInJail = !0),
                                            (z.jailTurnsRemaining = 3);
                                    }).func();
                                }, 800);
                        });
                    (O = h.current) == null ||
                        O.diceResults({
                            l: [j.listOfNums[0], j.listOfNums[1]],
                            time: N.isInJail ? 2e3 : R.time + 2e3 + 800,
                            onDone: () => {
                                var L, I;
                                if (e.id !== j.turnId) return;
                                const x =
                                        ((L = n.get(e.id)) == null
                                            ? void 0
                                            : L.position) ?? -1,
                                    S = A.get(x);
                                S != null &&
                                    (S.id === "communitychest" ||
                                    S.id === "chance"
                                        ? e.emit(
                                              "chorch_roll",
                                              S.id === "chance"
                                          )
                                        : (I = h.current) == null ||
                                          I.setStreet({
                                              location: x,
                                              rolls:
                                                  j.listOfNums[1] +
                                                  j.listOfNums[0],
                                              onResponse: (D, b) => {
                                                  var ye,
                                                      fe,
                                                      tt,
                                                      nt,
                                                      zn,
                                                      ie,
                                                      qt,
                                                      Be,
                                                      ct,
                                                      jl;
                                                  var W = 0;
                                                  if (D === "buy")
                                                      (N.balance -=
                                                          ((S == null
                                                              ? void 0
                                                              : S.price) ?? 0) *
                                                          1),
                                                          (ye = h.current) ==
                                                              null ||
                                                              ye.applyAnimation(
                                                                  1
                                                              ),
                                                          N.properties.push({
                                                              posistion:
                                                                  N.position,
                                                              count: 0,
                                                              group:
                                                                  ((fe = A.get(
                                                                      N.position
                                                                  )) == null
                                                                      ? void 0
                                                                      : fe.group) ??
                                                                  "",
                                                          });
                                                  else if (
                                                      D === "advance-buy"
                                                  ) {
                                                      const dt = Array.from(
                                                              new Map(
                                                                  N.properties.map(
                                                                      (
                                                                          _e,
                                                                          Bn
                                                                      ) => [
                                                                          Bn,
                                                                          _e,
                                                                      ]
                                                                  )
                                                              ).entries()
                                                          ).filter(
                                                              (_e) =>
                                                                  _e[1]
                                                                      .posistion ===
                                                                  x
                                                          )[0][0],
                                                          Ee = b;
                                                      (N.properties[dt].count =
                                                          Ee.state === 5
                                                              ? "h"
                                                              : Ee.state),
                                                          Ee.state === 5
                                                              ? ((N.balance -=
                                                                    S.ohousecost ??
                                                                    0),
                                                                (tt =
                                                                    h.current) ==
                                                                    null ||
                                                                    tt.applyAnimation(
                                                                        1
                                                                    ))
                                                              : (S.housecost,
                                                                (N.balance -=
                                                                    (S.housecost ??
                                                                        0) *
                                                                    Ee.money),
                                                                (nt =
                                                                    h.current) ==
                                                                    null ||
                                                                    nt.applyAnimation(
                                                                        1
                                                                    ));
                                                  } else if (D === "someones") {
                                                      const dt = Array.from(
                                                          n.values()
                                                      );
                                                      for (const Ee of dt)
                                                          for (const _e of Ee.properties)
                                                              if (
                                                                  _e.posistion ===
                                                                  x
                                                              ) {
                                                                  var K = 0;
                                                                  if (
                                                                      S.group ===
                                                                          "Utilities" &&
                                                                      _e.rent
                                                                  ) {
                                                                      const Bn =
                                                                          Ee.properties.filter(
                                                                              (
                                                                                  Rl
                                                                              ) =>
                                                                                  Rl.group ===
                                                                                  "Utilities"
                                                                          )
                                                                              .length ===
                                                                          2
                                                                              ? 10
                                                                              : 4;
                                                                      (K =
                                                                          _e.rent *
                                                                          Bn),
                                                                          console.warn(
                                                                              `payment_ammount ${K} && rent was ${_e.rent}`
                                                                          );
                                                                  } else if (
                                                                      S.group ===
                                                                      "Railroad"
                                                                  ) {
                                                                      const Bn =
                                                                          Ee.properties.filter(
                                                                              (
                                                                                  Nd
                                                                              ) =>
                                                                                  Nd.group ===
                                                                                  "Railroad"
                                                                          ).length;
                                                                      K = [
                                                                          25,
                                                                          50,
                                                                          100,
                                                                          200,
                                                                      ][Bn];
                                                                  } else
                                                                      _e.count ===
                                                                      0
                                                                          ? (K =
                                                                                (S ==
                                                                                null
                                                                                    ? void 0
                                                                                    : S.rent) ??
                                                                                0)
                                                                          : typeof _e.count ==
                                                                                "number" &&
                                                                            _e.count >
                                                                                0
                                                                          ? (K =
                                                                                ((S ==
                                                                                null
                                                                                    ? void 0
                                                                                    : S.multpliedrent) ?? [
                                                                                    0,
                                                                                    0,
                                                                                    0,
                                                                                    0,
                                                                                ])[
                                                                                    _e.count -
                                                                                        1
                                                                                ] ??
                                                                                0)
                                                                          : _e.count ===
                                                                                "h" &&
                                                                            (K =
                                                                                ((S ==
                                                                                null
                                                                                    ? void 0
                                                                                    : S.multpliedrent) ?? [
                                                                                    0,
                                                                                    0,
                                                                                    0,
                                                                                    0,
                                                                                    0,
                                                                                ])[4] ??
                                                                                0);
                                                                  (N.balance -=
                                                                      K),
                                                                      (zn =
                                                                          h.current) ==
                                                                          null ||
                                                                          zn.applyAnimation(
                                                                              1
                                                                          ),
                                                                      e.emit(
                                                                          "pay",
                                                                          {
                                                                              balance:
                                                                                  K,
                                                                              from: e.id,
                                                                              to: Ee.id,
                                                                          }
                                                                      ),
                                                                      (ie =
                                                                          h.current) ==
                                                                          null ||
                                                                          ie.applyAnimation(
                                                                              1
                                                                          );
                                                              }
                                                  } else if (D === "nothing") {
                                                      if (
                                                          ((S == null
                                                              ? void 0
                                                              : S.id) ?? "") ==
                                                          "gotojail"
                                                      ) {
                                                          const dt = B(
                                                              10,
                                                              z,
                                                              !1,
                                                              () => {
                                                                  (z.position = 10),
                                                                      (z.isInJail =
                                                                          !0),
                                                                      (z.jailTurnsRemaining = 3);
                                                              }
                                                          );
                                                          (W = dt.time),
                                                              dt.func();
                                                      }
                                                      (S == null
                                                          ? void 0
                                                          : S.id) ===
                                                          "incometax" &&
                                                          ((N.balance -= 200),
                                                          (qt = h.current) ==
                                                              null ||
                                                              qt.applyAnimation(
                                                                  1
                                                              )),
                                                          (S == null
                                                              ? void 0
                                                              : S.id) ===
                                                              "luxerytax" &&
                                                              ((N.balance -= 100),
                                                              (Be =
                                                                  h.current) ==
                                                                  null ||
                                                                  Be.applyAnimation(
                                                                      1
                                                                  ));
                                                  } else if (
                                                      D === "special_action"
                                                  ) {
                                                      (N.balance -=
                                                          ((S == null
                                                              ? void 0
                                                              : S.price) ?? 0) *
                                                          1),
                                                          (ct = h.current) ==
                                                              null ||
                                                              ct.applyAnimation(
                                                                  1
                                                              );
                                                      const Ee = b.rolls;
                                                      N.properties.push({
                                                          posistion: N.position,
                                                          count: 0,
                                                          rent: Ee,
                                                          group:
                                                              ((jl = A.get(
                                                                  N.position
                                                              )) == null
                                                                  ? void 0
                                                                  : jl.group) ??
                                                              "",
                                                      });
                                                  }
                                                  setTimeout(() => {
                                                      var Ee;
                                                      r(
                                                          new Map(
                                                              n.set(e.id, N)
                                                          )
                                                      ),
                                                          (Ee = h.current) ==
                                                              null ||
                                                              Ee.freeDice();
                                                      const dt = n
                                                          .get(e.id)
                                                          .toJson();
                                                      e.emit("finish-turn", dt);
                                                  }, W);
                                              },
                                          }));
                            },
                        }),
                        z.isInJail
                            ? setTimeout(() => {
                                  j.listOfNums[0] == j.listOfNums[1]
                                      ? ((z.isInJail = !1),
                                        setTimeout(() => {
                                            R.func();
                                        }, 2e3))
                                      : z.jailTurnsRemaining > 0 &&
                                        ((z.jailTurnsRemaining -= 1),
                                        z.jailTurnsRemaining === 0 &&
                                            (z.isInJail = !1)),
                                      r(new Map(n.set(j.turnId, z)));
                              }, 1500)
                            : setTimeout(() => {
                                  R.func();
                              }, 2e3);
                },
                U = (j) => {
                    const N = n.get(j.to);
                    N &&
                        (j.option === "card"
                            ? (N.getoutCards -= 1)
                            : (N.balance -= 50),
                        (N.isInJail = !1),
                        (N.jailTurnsRemaining = 0),
                        r(new Map(n.set(j.to, N))));
                },
                F = (j) => {
                    var N;
                    for (const z of j.pJson) {
                        const R = n.get(z.id);
                        R == null || R.recieveJson(z);
                    }
                    e.id === j.playerId &&
                        ((N = h.current) == null || N.applyAnimation(2));
                },
                $ = (j) => {
                    var z;
                    (z = h.current) == null ||
                        z.chorch(j.element, j.is_chance, 3e3),
                        setTimeout(() => {
                            var D, b, W, K, ye;
                            const R = j.element,
                                O = n.get(j.turnId);
                            if (O === void 0) return;
                            function x(fe) {
                                if (O === void 0) return 0;
                                O.id === e.id && e.emit("pay");
                                const tt = Array.from(n.values()).filter(
                                    (nt) => nt.id !== O.id
                                );
                                for (const nt of tt)
                                    (nt.balance += fe),
                                        r(new Map(n.set(nt.id, nt)));
                                return tt.length;
                            }
                            var S = 0;
                            switch (R.action) {
                                case "move":
                                    if (R.tileid) {
                                        const ie = new Map(
                                                Gt.properties.map((ct) => [
                                                    ct.id,
                                                    ct,
                                                ])
                                            ),
                                            qt =
                                                (D = ie.get(R.tileid)) == null
                                                    ? void 0
                                                    : D.posistion;
                                        if (qt === void 0) {
                                            const ct = Array.from(ie.keys());
                                            console.log(ct);
                                            break;
                                        }
                                        const Be = B(qt, O);
                                        (S = Be.time), Be.func();
                                    } else if (R.count) {
                                        const ie = B(
                                            (O.position + R.count) % 40,
                                            O,
                                            !0,
                                            () => {},
                                            R.count >= 0
                                        );
                                        (S = ie.time), ie.func();
                                    }
                                    break;
                                case "addfunds":
                                    (O.balance += R.amount ?? 0),
                                        O.id === e.id &&
                                            ((b = h.current) == null ||
                                                b.applyAnimation(2));
                                    break;
                                case "jail":
                                    if (R.subaction !== void 0) {
                                        switch (R.subaction) {
                                            case "getout":
                                                O.getoutCards += 1;
                                                break;
                                            case "goto":
                                                const ie = B(10, O, !1, () => {
                                                    (O.position = 10),
                                                        (O.isInJail = !0),
                                                        (O.jailTurnsRemaining = 3);
                                                });
                                                (S = ie.time), ie.func();
                                                break;
                                        }
                                        r(new Map(n.set(O.id, O)));
                                    }
                                    break;
                                case "removefunds":
                                    (O.balance -= R.amount ?? 0),
                                        O.id === e.id &&
                                            ((W = h.current) == null ||
                                                W.applyAnimation(1));
                                    break;
                                case "removefundstoplayers":
                                    var L = x(R.amount ?? 0);
                                    (O.balance -= (R.amount ?? 0) * L),
                                        O.id === e.id &&
                                            ((K = h.current) == null ||
                                                K.applyAnimation(1));
                                    break;
                                case "addfundsfromplayers":
                                    var L = x(-(R.amount ?? 0));
                                    (O.balance += (R.amount ?? 0) * L),
                                        O.id === e.id &&
                                            ((ye = h.current) == null ||
                                                ye.applyAnimation(2));
                                    break;
                                case "movenearest":
                                    let fe = function (ie, qt) {
                                        ie.sort((Be, ct) => Be - ct);
                                        for (let Be = 0; Be < ie.length; Be++)
                                            if (ie[Be] > qt) return ie[Be];
                                        return ie[0];
                                    };
                                    if (!R.groupid) return;
                                    var I = "";
                                    R.groupid === "utility"
                                        ? (I = "Utilities")
                                        : (I = "Railroad");
                                    const tt = Gt.properties
                                            .filter((ie) => ie.group === I)
                                            .map((ie) => ie.posistion),
                                        nt = fe(tt, O.position),
                                        zn = B(nt, O);
                                    (S = zn.time), zn.func();
                                    break;
                            }
                            setTimeout(() => {
                                var fe;
                                r(new Map(n.set(O.id, O))),
                                    O.id === e.id &&
                                        ((fe = h.current) == null ||
                                            fe.freeDice(),
                                        e.emit(
                                            "finish-turn",
                                            n.get(e.id).toJson()
                                        ));
                            }, S);
                        }, 3e3);
                };
            e.on("initials", d),
                e.on("new-player", c),
                e.on("ready", p),
                e.on("start-game", k),
                e.on("disconnected-player", v),
                e.on("turn-finished", C),
                e.on("message", w),
                e.on("dice_roll_result", T),
                e.on("unjail", U),
                e.on("member_updating", F),
                e.on("chorch_result", $);
            var q = !0;
            return (
                q && e.emit("name", t),
                () => {
                    (q = !1),
                        e.off("initials", d),
                        e.off("new-player", c),
                        e.off("ready", p),
                        e.off("start-game", k),
                        e.off("disconnected-player", v),
                        e.off("turn-finished", C),
                        e.off("message", w),
                        e.off("dice_roll_result", T),
                        e.off("unjail", U),
                        e.off("member_updating", F),
                        e.off("chorch_result", $);
                }
            );
        }, [e]),
        M.useEffect(() => {
            var P;
            (P = m.current) == null || P.reRenderPlayerList();
        }, [n]),
        a
            ? l.jsxs(l.Fragment, {
                  children: [
                      l.jsxs("main", {
                          children: [
                              l.jsx(Sh, {
                                  currentTurn: o,
                                  ref: m,
                                  name: t,
                                  socket: e,
                                  players: i,
                              }),
                              l.jsx(Ph, {
                                  clickedOnBoard: (P) => {
                                      var B;
                                      (B = m.current) == null ||
                                          B.clickedOnBoard(P);
                                  },
                                  ref: h,
                                  socket: e,
                                  players: Array.from(n.values()),
                                  myTurn: o === e.id,
                              }),
                          ],
                      }),
                      l.jsx(fd, { ref: y }),
                  ],
              })
            : l.jsxs("div", {
                  className: "lobby",
                  children: [
                      l.jsxs("h3", { children: ["Hello there ", t] }),
                      "the players that are currently in the lobby are",
                      l.jsx("div", {
                          children: Array.from(n.values()).map((P, B) =>
                              l.jsx(
                                  "p",
                                  {
                                      style: P.ready
                                          ? { backgroundColor: "#32a852" }
                                          : {},
                                      className: "lobby-players",
                                      children: P.username,
                                  },
                                  B
                              )
                          ),
                      }),
                      l.jsx("center", {
                          children: l.jsx("button", {
                              onClick: () => {
                                  e.emit("ready", !f), g(!f);
                              },
                              children: f ? "Not Ready" : "Ready",
                          }),
                      }),
                  ],
              })
    );
}
const ut = Object.create(null);
ut.open = "0";
ut.close = "1";
ut.ping = "2";
ut.pong = "3";
ut.message = "4";
ut.upgrade = "5";
ut.noop = "6";
const li = Object.create(null);
Object.keys(ut).forEach((e) => {
    li[ut[e]] = e;
});
const Eh = { type: "error", data: "parser error" },
    pd =
        typeof Blob == "function" ||
        (typeof Blob < "u" &&
            Object.prototype.toString.call(Blob) ===
                "[object BlobConstructor]"),
    hd = typeof ArrayBuffer == "function",
    md = (e) =>
        typeof ArrayBuffer.isView == "function"
            ? ArrayBuffer.isView(e)
            : e && e.buffer instanceof ArrayBuffer,
    xl = ({ type: e, data: t }, n, r) =>
        pd && t instanceof Blob
            ? n
                ? r(t)
                : Va(t, r)
            : hd && (t instanceof ArrayBuffer || md(t))
            ? n
                ? r(t)
                : Va(new Blob([t]), r)
            : r(ut[e] + (t || "")),
    Va = (e, t) => {
        const n = new FileReader();
        return (
            (n.onload = function () {
                const r = n.result.split(",")[1];
                t("b" + (r || ""));
            }),
            n.readAsDataURL(e)
        );
    };
function Ja(e) {
    return e instanceof Uint8Array
        ? e
        : e instanceof ArrayBuffer
        ? new Uint8Array(e)
        : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let Eo;
function Ah(e, t) {
    if (pd && e.data instanceof Blob)
        return e.data.arrayBuffer().then(Ja).then(t);
    if (hd && (e.data instanceof ArrayBuffer || md(e.data)))
        return t(Ja(e.data));
    xl(e, !1, (n) => {
        Eo || (Eo = new TextEncoder()), t(Eo.encode(n));
    });
}
const Ha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    Xn = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < Ha.length; e++) Xn[Ha.charCodeAt(e)] = e;
const Nh = (e) => {
        let t = e.length * 0.75,
            n = e.length,
            r,
            i = 0,
            o,
            s,
            a,
            u;
        e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
        const f = new ArrayBuffer(t),
            g = new Uint8Array(f);
        for (r = 0; r < n; r += 4)
            (o = Xn[e.charCodeAt(r)]),
                (s = Xn[e.charCodeAt(r + 1)]),
                (a = Xn[e.charCodeAt(r + 2)]),
                (u = Xn[e.charCodeAt(r + 3)]),
                (g[i++] = (o << 2) | (s >> 4)),
                (g[i++] = ((s & 15) << 4) | (a >> 2)),
                (g[i++] = ((a & 3) << 6) | (u & 63));
        return f;
    },
    jh = typeof ArrayBuffer == "function",
    Pl = (e, t) => {
        if (typeof e != "string") return { type: "message", data: yd(e, t) };
        const n = e.charAt(0);
        return n === "b"
            ? { type: "message", data: Rh(e.substring(1), t) }
            : li[n]
            ? e.length > 1
                ? { type: li[n], data: e.substring(1) }
                : { type: li[n] }
            : Eh;
    },
    Rh = (e, t) => {
        if (jh) {
            const n = Nh(e);
            return yd(n, t);
        } else return { base64: !0, data: e };
    },
    yd = (e, t) => {
        switch (t) {
            case "blob":
                return e instanceof Blob ? e : new Blob([e]);
            case "arraybuffer":
            default:
                return e instanceof ArrayBuffer ? e : e.buffer;
        }
    },
    gd = String.fromCharCode(30),
    Th = (e, t) => {
        const n = e.length,
            r = new Array(n);
        let i = 0;
        e.forEach((o, s) => {
            xl(o, !1, (a) => {
                (r[s] = a), ++i === n && t(r.join(gd));
            });
        });
    },
    _h = (e, t) => {
        const n = e.split(gd),
            r = [];
        for (let i = 0; i < n.length; i++) {
            const o = Pl(n[i], t);
            if ((r.push(o), o.type === "error")) break;
        }
        return r;
    };
let Ao;
function Lh(e, t, n) {
    Ao || (Ao = new TextDecoder());
    const r = t || e[0] < 48 || e[0] > 54;
    return Pl(r ? e : Ao.decode(e), n);
}
const vd = 4;
function le(e) {
    if (e) return Oh(e);
}
function Oh(e) {
    for (var t in le.prototype) e[t] = le.prototype[t];
    return e;
}
le.prototype.on = le.prototype.addEventListener = function (e, t) {
    return (
        (this._callbacks = this._callbacks || {}),
        (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
        this
    );
};
le.prototype.once = function (e, t) {
    function n() {
        this.off(e, n), t.apply(this, arguments);
    }
    return (n.fn = t), this.on(e, n), this;
};
le.prototype.off =
    le.prototype.removeListener =
    le.prototype.removeAllListeners =
    le.prototype.removeEventListener =
        function (e, t) {
            if (
                ((this._callbacks = this._callbacks || {}),
                arguments.length == 0)
            )
                return (this._callbacks = {}), this;
            var n = this._callbacks["$" + e];
            if (!n) return this;
            if (arguments.length == 1)
                return delete this._callbacks["$" + e], this;
            for (var r, i = 0; i < n.length; i++)
                if (((r = n[i]), r === t || r.fn === t)) {
                    n.splice(i, 1);
                    break;
                }
            return n.length === 0 && delete this._callbacks["$" + e], this;
        };
le.prototype.emit = function (e) {
    this._callbacks = this._callbacks || {};
    for (
        var t = new Array(arguments.length - 1),
            n = this._callbacks["$" + e],
            r = 1;
        r < arguments.length;
        r++
    )
        t[r - 1] = arguments[r];
    if (n) {
        n = n.slice(0);
        for (var r = 0, i = n.length; r < i; ++r) n[r].apply(this, t);
    }
    return this;
};
le.prototype.emitReserved = le.prototype.emit;
le.prototype.listeners = function (e) {
    return (
        (this._callbacks = this._callbacks || {}),
        this._callbacks["$" + e] || []
    );
};
le.prototype.hasListeners = function (e) {
    return !!this.listeners(e).length;
};
const Ue = (() =>
    typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : Function("return this")())();
function wd(e, ...t) {
    return t.reduce((n, r) => (e.hasOwnProperty(r) && (n[r] = e[r]), n), {});
}
const Ih = Ue.setTimeout,
    Mh = Ue.clearTimeout;
function Yi(e, t) {
    t.useNativeTimers
        ? ((e.setTimeoutFn = Ih.bind(Ue)), (e.clearTimeoutFn = Mh.bind(Ue)))
        : ((e.setTimeoutFn = Ue.setTimeout.bind(Ue)),
          (e.clearTimeoutFn = Ue.clearTimeout.bind(Ue)));
}
const Fh = 1.33;
function zh(e) {
    return typeof e == "string"
        ? Bh(e)
        : Math.ceil((e.byteLength || e.size) * Fh);
}
function Bh(e) {
    let t = 0,
        n = 0;
    for (let r = 0, i = e.length; r < i; r++)
        (t = e.charCodeAt(r)),
            t < 128
                ? (n += 1)
                : t < 2048
                ? (n += 2)
                : t < 55296 || t >= 57344
                ? (n += 3)
                : (r++, (n += 4));
    return n;
}
function Dh(e) {
    let t = "";
    for (let n in e)
        e.hasOwnProperty(n) &&
            (t.length && (t += "&"),
            (t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])));
    return t;
}
function bh(e) {
    let t = {},
        n = e.split("&");
    for (let r = 0, i = n.length; r < i; r++) {
        let o = n[r].split("=");
        t[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
    }
    return t;
}
class Uh extends Error {
    constructor(t, n, r) {
        super(t),
            (this.description = n),
            (this.context = r),
            (this.type = "TransportError");
    }
}
class Cl extends le {
    constructor(t) {
        super(),
            (this.writable = !1),
            Yi(this, t),
            (this.opts = t),
            (this.query = t.query),
            (this.socket = t.socket);
    }
    onError(t, n, r) {
        return super.emitReserved("error", new Uh(t, n, r)), this;
    }
    open() {
        return (this.readyState = "opening"), this.doOpen(), this;
    }
    close() {
        return (
            (this.readyState === "opening" || this.readyState === "open") &&
                (this.doClose(), this.onClose()),
            this
        );
    }
    send(t) {
        this.readyState === "open" && this.write(t);
    }
    onOpen() {
        (this.readyState = "open"),
            (this.writable = !0),
            super.emitReserved("open");
    }
    onData(t) {
        const n = Pl(t, this.socket.binaryType);
        this.onPacket(n);
    }
    onPacket(t) {
        super.emitReserved("packet", t);
    }
    onClose(t) {
        (this.readyState = "closed"), super.emitReserved("close", t);
    }
    pause(t) {}
    createUri(t, n = {}) {
        return (
            t +
            "://" +
            this._hostname() +
            this._port() +
            this.opts.path +
            this._query(n)
        );
    }
    _hostname() {
        const t = this.opts.hostname;
        return t.indexOf(":") === -1 ? t : "[" + t + "]";
    }
    _port() {
        return this.opts.port &&
            ((this.opts.secure && +(this.opts.port !== 443)) ||
                (!this.opts.secure && Number(this.opts.port) !== 80))
            ? ":" + this.opts.port
            : "";
    }
    _query(t) {
        const n = Dh(t);
        return n.length ? "?" + n : "";
    }
}
const Sd =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
            ""
        ),
    ks = 64,
    qh = {};
let $a = 0,
    Wr = 0,
    Wa;
function Ka(e) {
    let t = "";
    do (t = Sd[e % ks] + t), (e = Math.floor(e / ks));
    while (e > 0);
    return t;
}
function kd() {
    const e = Ka(+new Date());
    return e !== Wa ? (($a = 0), (Wa = e)) : e + "." + Ka($a++);
}
for (; Wr < ks; Wr++) qh[Sd[Wr]] = Wr;
let xd = !1;
try {
    xd =
        typeof XMLHttpRequest < "u" &&
        "withCredentials" in new XMLHttpRequest();
} catch {}
const Vh = xd;
function Pd(e) {
    const t = e.xdomain;
    try {
        if (typeof XMLHttpRequest < "u" && (!t || Vh))
            return new XMLHttpRequest();
    } catch {}
    if (!t)
        try {
            return new Ue[["Active"].concat("Object").join("X")](
                "Microsoft.XMLHTTP"
            );
        } catch {}
}
function Jh() {}
const Hh = (function () {
    return new Pd({ xdomain: !1 }).responseType != null;
})();
class $h extends Cl {
    constructor(t) {
        if ((super(t), (this.polling = !1), typeof location < "u")) {
            const r = location.protocol === "https:";
            let i = location.port;
            i || (i = r ? "443" : "80"),
                (this.xd =
                    (typeof location < "u" &&
                        t.hostname !== location.hostname) ||
                    i !== t.port);
        }
        const n = t && t.forceBase64;
        (this.supportsBinary = Hh && !n),
            this.opts.withCredentials && (this.cookieJar = void 0);
    }
    get name() {
        return "polling";
    }
    doOpen() {
        this.poll();
    }
    pause(t) {
        this.readyState = "pausing";
        const n = () => {
            (this.readyState = "paused"), t();
        };
        if (this.polling || !this.writable) {
            let r = 0;
            this.polling &&
                (r++,
                this.once("pollComplete", function () {
                    --r || n();
                })),
                this.writable ||
                    (r++,
                    this.once("drain", function () {
                        --r || n();
                    }));
        } else n();
    }
    poll() {
        (this.polling = !0), this.doPoll(), this.emitReserved("poll");
    }
    onData(t) {
        const n = (r) => {
            if (
                (this.readyState === "opening" &&
                    r.type === "open" &&
                    this.onOpen(),
                r.type === "close")
            )
                return (
                    this.onClose({
                        description: "transport closed by the server",
                    }),
                    !1
                );
            this.onPacket(r);
        };
        _h(t, this.socket.binaryType).forEach(n),
            this.readyState !== "closed" &&
                ((this.polling = !1),
                this.emitReserved("pollComplete"),
                this.readyState === "open" && this.poll());
    }
    doClose() {
        const t = () => {
            this.write([{ type: "close" }]);
        };
        this.readyState === "open" ? t() : this.once("open", t);
    }
    write(t) {
        (this.writable = !1),
            Th(t, (n) => {
                this.doWrite(n, () => {
                    (this.writable = !0), this.emitReserved("drain");
                });
            });
    }
    uri() {
        const t = this.opts.secure ? "https" : "http",
            n = this.query || {};
        return (
            this.opts.timestampRequests !== !1 &&
                (n[this.opts.timestampParam] = kd()),
            !this.supportsBinary && !n.sid && (n.b64 = 1),
            this.createUri(t, n)
        );
    }
    request(t = {}) {
        return (
            Object.assign(
                t,
                { xd: this.xd, cookieJar: this.cookieJar },
                this.opts
            ),
            new at(this.uri(), t)
        );
    }
    doWrite(t, n) {
        const r = this.request({ method: "POST", data: t });
        r.on("success", n),
            r.on("error", (i, o) => {
                this.onError("xhr post error", i, o);
            });
    }
    doPoll() {
        const t = this.request();
        t.on("data", this.onData.bind(this)),
            t.on("error", (n, r) => {
                this.onError("xhr poll error", n, r);
            }),
            (this.pollXhr = t);
    }
}
class at extends le {
    constructor(t, n) {
        super(),
            Yi(this, n),
            (this.opts = n),
            (this.method = n.method || "GET"),
            (this.uri = t),
            (this.data = n.data !== void 0 ? n.data : null),
            this.create();
    }
    create() {
        var t;
        const n = wd(
            this.opts,
            "agent",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "autoUnref"
        );
        n.xdomain = !!this.opts.xd;
        const r = (this.xhr = new Pd(n));
        try {
            r.open(this.method, this.uri, !0);
            try {
                if (this.opts.extraHeaders) {
                    r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
                    for (let i in this.opts.extraHeaders)
                        this.opts.extraHeaders.hasOwnProperty(i) &&
                            r.setRequestHeader(i, this.opts.extraHeaders[i]);
                }
            } catch {}
            if (this.method === "POST")
                try {
                    r.setRequestHeader(
                        "Content-type",
                        "text/plain;charset=UTF-8"
                    );
                } catch {}
            try {
                r.setRequestHeader("Accept", "*/*");
            } catch {}
            (t = this.opts.cookieJar) === null ||
                t === void 0 ||
                t.addCookies(r),
                "withCredentials" in r &&
                    (r.withCredentials = this.opts.withCredentials),
                this.opts.requestTimeout &&
                    (r.timeout = this.opts.requestTimeout),
                (r.onreadystatechange = () => {
                    var i;
                    r.readyState === 3 &&
                        ((i = this.opts.cookieJar) === null ||
                            i === void 0 ||
                            i.parseCookies(r)),
                        r.readyState === 4 &&
                            (r.status === 200 || r.status === 1223
                                ? this.onLoad()
                                : this.setTimeoutFn(() => {
                                      this.onError(
                                          typeof r.status == "number"
                                              ? r.status
                                              : 0
                                      );
                                  }, 0));
                }),
                r.send(this.data);
        } catch (i) {
            this.setTimeoutFn(() => {
                this.onError(i);
            }, 0);
            return;
        }
        typeof document < "u" &&
            ((this.index = at.requestsCount++),
            (at.requests[this.index] = this));
    }
    onError(t) {
        this.emitReserved("error", t, this.xhr), this.cleanup(!0);
    }
    cleanup(t) {
        if (!(typeof this.xhr > "u" || this.xhr === null)) {
            if (((this.xhr.onreadystatechange = Jh), t))
                try {
                    this.xhr.abort();
                } catch {}
            typeof document < "u" && delete at.requests[this.index],
                (this.xhr = null);
        }
    }
    onLoad() {
        const t = this.xhr.responseText;
        t !== null &&
            (this.emitReserved("data", t),
            this.emitReserved("success"),
            this.cleanup());
    }
    abort() {
        this.cleanup();
    }
}
at.requestsCount = 0;
at.requests = {};
if (typeof document < "u") {
    if (typeof attachEvent == "function") attachEvent("onunload", Qa);
    else if (typeof addEventListener == "function") {
        const e = "onpagehide" in Ue ? "pagehide" : "unload";
        addEventListener(e, Qa, !1);
    }
}
function Qa() {
    for (let e in at.requests)
        at.requests.hasOwnProperty(e) && at.requests[e].abort();
}
const El = (() =>
        typeof Promise == "function" && typeof Promise.resolve == "function"
            ? (t) => Promise.resolve().then(t)
            : (t, n) => n(t, 0))(),
    Kr = Ue.WebSocket || Ue.MozWebSocket,
    Ga = !0,
    Wh = "arraybuffer",
    Ya =
        typeof navigator < "u" &&
        typeof navigator.product == "string" &&
        navigator.product.toLowerCase() === "reactnative";
class Kh extends Cl {
    constructor(t) {
        super(t), (this.supportsBinary = !t.forceBase64);
    }
    get name() {
        return "websocket";
    }
    doOpen() {
        if (!this.check()) return;
        const t = this.uri(),
            n = this.opts.protocols,
            r = Ya
                ? {}
                : wd(
                      this.opts,
                      "agent",
                      "perMessageDeflate",
                      "pfx",
                      "key",
                      "passphrase",
                      "cert",
                      "ca",
                      "ciphers",
                      "rejectUnauthorized",
                      "localAddress",
                      "protocolVersion",
                      "origin",
                      "maxPayload",
                      "family",
                      "checkServerIdentity"
                  );
        this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
        try {
            this.ws =
                Ga && !Ya ? (n ? new Kr(t, n) : new Kr(t)) : new Kr(t, n, r);
        } catch (i) {
            return this.emitReserved("error", i);
        }
        (this.ws.binaryType = this.socket.binaryType || Wh),
            this.addEventListeners();
    }
    addEventListeners() {
        (this.ws.onopen = () => {
            this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
        }),
            (this.ws.onclose = (t) =>
                this.onClose({
                    description: "websocket connection closed",
                    context: t,
                })),
            (this.ws.onmessage = (t) => this.onData(t.data)),
            (this.ws.onerror = (t) => this.onError("websocket error", t));
    }
    write(t) {
        this.writable = !1;
        for (let n = 0; n < t.length; n++) {
            const r = t[n],
                i = n === t.length - 1;
            xl(r, this.supportsBinary, (o) => {
                const s = {};
                try {
                    Ga && this.ws.send(o);
                } catch {}
                i &&
                    El(() => {
                        (this.writable = !0), this.emitReserved("drain");
                    }, this.setTimeoutFn);
            });
        }
    }
    doClose() {
        typeof this.ws < "u" && (this.ws.close(), (this.ws = null));
    }
    uri() {
        const t = this.opts.secure ? "wss" : "ws",
            n = this.query || {};
        return (
            this.opts.timestampRequests && (n[this.opts.timestampParam] = kd()),
            this.supportsBinary || (n.b64 = 1),
            this.createUri(t, n)
        );
    }
    check() {
        return !!Kr;
    }
}
function Qh(e, t) {
    return (
        e.type === "message" &&
        typeof e.data != "string" &&
        t[0] >= 48 &&
        t[0] <= 54
    );
}
class Gh extends Cl {
    get name() {
        return "webtransport";
    }
    doOpen() {
        typeof WebTransport == "function" &&
            ((this.transport = new WebTransport(
                this.createUri("https"),
                this.opts.transportOptions[this.name]
            )),
            this.transport.closed
                .then(() => {
                    this.onClose();
                })
                .catch((t) => {
                    this.onError("webtransport error", t);
                }),
            this.transport.ready.then(() => {
                this.transport.createBidirectionalStream().then((t) => {
                    const n = t.readable.getReader();
                    this.writer = t.writable.getWriter();
                    let r;
                    const i = () => {
                        n.read()
                            .then(({ done: s, value: a }) => {
                                s ||
                                    (!r && a.byteLength === 1 && a[0] === 54
                                        ? (r = !0)
                                        : (this.onPacket(
                                              Lh(a, r, "arraybuffer")
                                          ),
                                          (r = !1)),
                                    i());
                            })
                            .catch((s) => {});
                    };
                    i();
                    const o = this.query.sid
                        ? `0{"sid":"${this.query.sid}"}`
                        : "0";
                    this.writer
                        .write(new TextEncoder().encode(o))
                        .then(() => this.onOpen());
                });
            }));
    }
    write(t) {
        this.writable = !1;
        for (let n = 0; n < t.length; n++) {
            const r = t[n],
                i = n === t.length - 1;
            Ah(r, (o) => {
                Qh(r, o) && this.writer.write(Uint8Array.of(54)),
                    this.writer.write(o).then(() => {
                        i &&
                            El(() => {
                                (this.writable = !0),
                                    this.emitReserved("drain");
                            }, this.setTimeoutFn);
                    });
            });
        }
    }
    doClose() {
        var t;
        (t = this.transport) === null || t === void 0 || t.close();
    }
}
const Yh = { websocket: Kh, webtransport: Gh, polling: $h },
    Xh =
        /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
    Zh = [
        "source",
        "protocol",
        "authority",
        "userInfo",
        "user",
        "password",
        "host",
        "port",
        "relative",
        "path",
        "directory",
        "file",
        "query",
        "anchor",
    ];
function xs(e) {
    const t = e,
        n = e.indexOf("["),
        r = e.indexOf("]");
    n != -1 &&
        r != -1 &&
        (e =
            e.substring(0, n) +
            e.substring(n, r).replace(/:/g, ";") +
            e.substring(r, e.length));
    let i = Xh.exec(e || ""),
        o = {},
        s = 14;
    for (; s--; ) o[Zh[s]] = i[s] || "";
    return (
        n != -1 &&
            r != -1 &&
            ((o.source = t),
            (o.host = o.host
                .substring(1, o.host.length - 1)
                .replace(/;/g, ":")),
            (o.authority = o.authority
                .replace("[", "")
                .replace("]", "")
                .replace(/;/g, ":")),
            (o.ipv6uri = !0)),
        (o.pathNames = em(o, o.path)),
        (o.queryKey = tm(o, o.query)),
        o
    );
}
function em(e, t) {
    const n = /\/{2,9}/g,
        r = t.replace(n, "/").split("/");
    return (
        (t.slice(0, 1) == "/" || t.length === 0) && r.splice(0, 1),
        t.slice(-1) == "/" && r.splice(r.length - 1, 1),
        r
    );
}
function tm(e, t) {
    const n = {};
    return (
        t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (r, i, o) {
            i && (n[i] = o);
        }),
        n
    );
}
let Cd = class sn extends le {
    constructor(t, n = {}) {
        super(),
            (this.writeBuffer = []),
            t && typeof t == "object" && ((n = t), (t = null)),
            t
                ? ((t = xs(t)),
                  (n.hostname = t.host),
                  (n.secure = t.protocol === "https" || t.protocol === "wss"),
                  (n.port = t.port),
                  t.query && (n.query = t.query))
                : n.host && (n.hostname = xs(n.host).host),
            Yi(this, n),
            (this.secure =
                n.secure != null
                    ? n.secure
                    : typeof location < "u" && location.protocol === "https:"),
            n.hostname && !n.port && (n.port = this.secure ? "443" : "80"),
            (this.hostname =
                n.hostname ||
                (typeof location < "u" ? location.hostname : "localhost")),
            (this.port =
                n.port ||
                (typeof location < "u" && location.port
                    ? location.port
                    : this.secure
                    ? "443"
                    : "80")),
            (this.transports = n.transports || [
                "polling",
                "websocket",
                "webtransport",
            ]),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0),
            (this.opts = Object.assign(
                {
                    path: "/engine.io",
                    agent: !1,
                    withCredentials: !1,
                    upgrade: !0,
                    timestampParam: "t",
                    rememberUpgrade: !1,
                    addTrailingSlash: !0,
                    rejectUnauthorized: !0,
                    perMessageDeflate: { threshold: 1024 },
                    transportOptions: {},
                    closeOnBeforeunload: !1,
                },
                n
            )),
            (this.opts.path =
                this.opts.path.replace(/\/$/, "") +
                (this.opts.addTrailingSlash ? "/" : "")),
            typeof this.opts.query == "string" &&
                (this.opts.query = bh(this.opts.query)),
            (this.id = null),
            (this.upgrades = null),
            (this.pingInterval = null),
            (this.pingTimeout = null),
            (this.pingTimeoutTimer = null),
            typeof addEventListener == "function" &&
                (this.opts.closeOnBeforeunload &&
                    ((this.beforeunloadEventListener = () => {
                        this.transport &&
                            (this.transport.removeAllListeners(),
                            this.transport.close());
                    }),
                    addEventListener(
                        "beforeunload",
                        this.beforeunloadEventListener,
                        !1
                    )),
                this.hostname !== "localhost" &&
                    ((this.offlineEventListener = () => {
                        this.onClose("transport close", {
                            description: "network connection lost",
                        });
                    }),
                    addEventListener(
                        "offline",
                        this.offlineEventListener,
                        !1
                    ))),
            this.open();
    }
    createTransport(t) {
        const n = Object.assign({}, this.opts.query);
        (n.EIO = vd), (n.transport = t), this.id && (n.sid = this.id);
        const r = Object.assign(
            {},
            this.opts,
            {
                query: n,
                socket: this,
                hostname: this.hostname,
                secure: this.secure,
                port: this.port,
            },
            this.opts.transportOptions[t]
        );
        return new Yh[t](r);
    }
    open() {
        let t;
        if (
            this.opts.rememberUpgrade &&
            sn.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1
        )
            t = "websocket";
        else if (this.transports.length === 0) {
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        } else t = this.transports[0];
        this.readyState = "opening";
        try {
            t = this.createTransport(t);
        } catch {
            this.transports.shift(), this.open();
            return;
        }
        t.open(), this.setTransport(t);
    }
    setTransport(t) {
        this.transport && this.transport.removeAllListeners(),
            (this.transport = t),
            t
                .on("drain", this.onDrain.bind(this))
                .on("packet", this.onPacket.bind(this))
                .on("error", this.onError.bind(this))
                .on("close", (n) => this.onClose("transport close", n));
    }
    probe(t) {
        let n = this.createTransport(t),
            r = !1;
        sn.priorWebsocketSuccess = !1;
        const i = () => {
            r ||
                (n.send([{ type: "ping", data: "probe" }]),
                n.once("packet", (h) => {
                    if (!r)
                        if (h.type === "pong" && h.data === "probe") {
                            if (
                                ((this.upgrading = !0),
                                this.emitReserved("upgrading", n),
                                !n)
                            )
                                return;
                            (sn.priorWebsocketSuccess = n.name === "websocket"),
                                this.transport.pause(() => {
                                    r ||
                                        (this.readyState !== "closed" &&
                                            (g(),
                                            this.setTransport(n),
                                            n.send([{ type: "upgrade" }]),
                                            this.emitReserved("upgrade", n),
                                            (n = null),
                                            (this.upgrading = !1),
                                            this.flush()));
                                });
                        } else {
                            const m = new Error("probe error");
                            (m.transport = n.name),
                                this.emitReserved("upgradeError", m);
                        }
                }));
        };
        function o() {
            r || ((r = !0), g(), n.close(), (n = null));
        }
        const s = (h) => {
            const m = new Error("probe error: " + h);
            (m.transport = n.name), o(), this.emitReserved("upgradeError", m);
        };
        function a() {
            s("transport closed");
        }
        function u() {
            s("socket closed");
        }
        function f(h) {
            n && h.name !== n.name && o();
        }
        const g = () => {
            n.removeListener("open", i),
                n.removeListener("error", s),
                n.removeListener("close", a),
                this.off("close", u),
                this.off("upgrading", f);
        };
        n.once("open", i),
            n.once("error", s),
            n.once("close", a),
            this.once("close", u),
            this.once("upgrading", f),
            this.upgrades.indexOf("webtransport") !== -1 && t !== "webtransport"
                ? this.setTimeoutFn(() => {
                      r || n.open();
                  }, 200)
                : n.open();
    }
    onOpen() {
        if (
            ((this.readyState = "open"),
            (sn.priorWebsocketSuccess = this.transport.name === "websocket"),
            this.emitReserved("open"),
            this.flush(),
            this.readyState === "open" && this.opts.upgrade)
        ) {
            let t = 0;
            const n = this.upgrades.length;
            for (; t < n; t++) this.probe(this.upgrades[t]);
        }
    }
    onPacket(t) {
        if (
            this.readyState === "opening" ||
            this.readyState === "open" ||
            this.readyState === "closing"
        )
            switch (
                (this.emitReserved("packet", t),
                this.emitReserved("heartbeat"),
                t.type)
            ) {
                case "open":
                    this.onHandshake(JSON.parse(t.data));
                    break;
                case "ping":
                    this.resetPingTimeout(),
                        this.sendPacket("pong"),
                        this.emitReserved("ping"),
                        this.emitReserved("pong");
                    break;
                case "error":
                    const n = new Error("server error");
                    (n.code = t.data), this.onError(n);
                    break;
                case "message":
                    this.emitReserved("data", t.data),
                        this.emitReserved("message", t.data);
                    break;
            }
    }
    onHandshake(t) {
        this.emitReserved("handshake", t),
            (this.id = t.sid),
            (this.transport.query.sid = t.sid),
            (this.upgrades = this.filterUpgrades(t.upgrades)),
            (this.pingInterval = t.pingInterval),
            (this.pingTimeout = t.pingTimeout),
            (this.maxPayload = t.maxPayload),
            this.onOpen(),
            this.readyState !== "closed" && this.resetPingTimeout();
    }
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer),
            (this.pingTimeoutTimer = this.setTimeoutFn(() => {
                this.onClose("ping timeout");
            }, this.pingInterval + this.pingTimeout)),
            this.opts.autoUnref && this.pingTimeoutTimer.unref();
    }
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen),
            (this.prevBufferLen = 0),
            this.writeBuffer.length === 0
                ? this.emitReserved("drain")
                : this.flush();
    }
    flush() {
        if (
            this.readyState !== "closed" &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length
        ) {
            const t = this.getWritablePackets();
            this.transport.send(t),
                (this.prevBufferLen = t.length),
                this.emitReserved("flush");
        }
    }
    getWritablePackets() {
        if (
            !(
                this.maxPayload &&
                this.transport.name === "polling" &&
                this.writeBuffer.length > 1
            )
        )
            return this.writeBuffer;
        let n = 1;
        for (let r = 0; r < this.writeBuffer.length; r++) {
            const i = this.writeBuffer[r].data;
            if ((i && (n += zh(i)), r > 0 && n > this.maxPayload))
                return this.writeBuffer.slice(0, r);
            n += 2;
        }
        return this.writeBuffer;
    }
    write(t, n, r) {
        return this.sendPacket("message", t, n, r), this;
    }
    send(t, n, r) {
        return this.sendPacket("message", t, n, r), this;
    }
    sendPacket(t, n, r, i) {
        if (
            (typeof n == "function" && ((i = n), (n = void 0)),
            typeof r == "function" && ((i = r), (r = null)),
            this.readyState === "closing" || this.readyState === "closed")
        )
            return;
        (r = r || {}), (r.compress = r.compress !== !1);
        const o = { type: t, data: n, options: r };
        this.emitReserved("packetCreate", o),
            this.writeBuffer.push(o),
            i && this.once("flush", i),
            this.flush();
    }
    close() {
        const t = () => {
                this.onClose("forced close"), this.transport.close();
            },
            n = () => {
                this.off("upgrade", n), this.off("upgradeError", n), t();
            },
            r = () => {
                this.once("upgrade", n), this.once("upgradeError", n);
            };
        return (
            (this.readyState === "opening" || this.readyState === "open") &&
                ((this.readyState = "closing"),
                this.writeBuffer.length
                    ? this.once("drain", () => {
                          this.upgrading ? r() : t();
                      })
                    : this.upgrading
                    ? r()
                    : t()),
            this
        );
    }
    onError(t) {
        (sn.priorWebsocketSuccess = !1),
            this.emitReserved("error", t),
            this.onClose("transport error", t);
    }
    onClose(t, n) {
        (this.readyState === "opening" ||
            this.readyState === "open" ||
            this.readyState === "closing") &&
            (this.clearTimeoutFn(this.pingTimeoutTimer),
            this.transport.removeAllListeners("close"),
            this.transport.close(),
            this.transport.removeAllListeners(),
            typeof removeEventListener == "function" &&
                (removeEventListener(
                    "beforeunload",
                    this.beforeunloadEventListener,
                    !1
                ),
                removeEventListener("offline", this.offlineEventListener, !1)),
            (this.readyState = "closed"),
            (this.id = null),
            this.emitReserved("close", t, n),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0));
    }
    filterUpgrades(t) {
        const n = [];
        let r = 0;
        const i = t.length;
        for (; r < i; r++) ~this.transports.indexOf(t[r]) && n.push(t[r]);
        return n;
    }
};
Cd.protocol = vd;
function nm(e, t = "", n) {
    let r = e;
    (n = n || (typeof location < "u" && location)),
        e == null && (e = n.protocol + "//" + n.host),
        typeof e == "string" &&
            (e.charAt(0) === "/" &&
                (e.charAt(1) === "/" ? (e = n.protocol + e) : (e = n.host + e)),
            /^(https?|wss?):\/\//.test(e) ||
                (typeof n < "u"
                    ? (e = n.protocol + "//" + e)
                    : (e = "https://" + e)),
            (r = xs(e))),
        r.port ||
            (/^(http|ws)$/.test(r.protocol)
                ? (r.port = "80")
                : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")),
        (r.path = r.path || "/");
    const o = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
    return (
        (r.id = r.protocol + "://" + o + ":" + r.port + t),
        (r.href =
            r.protocol +
            "://" +
            o +
            (n && n.port === r.port ? "" : ":" + r.port)),
        r
    );
}
const rm = typeof ArrayBuffer == "function",
    im = (e) =>
        typeof ArrayBuffer.isView == "function"
            ? ArrayBuffer.isView(e)
            : e.buffer instanceof ArrayBuffer,
    Ed = Object.prototype.toString,
    om =
        typeof Blob == "function" ||
        (typeof Blob < "u" && Ed.call(Blob) === "[object BlobConstructor]"),
    sm =
        typeof File == "function" ||
        (typeof File < "u" && Ed.call(File) === "[object FileConstructor]");
function Al(e) {
    return (
        (rm && (e instanceof ArrayBuffer || im(e))) ||
        (om && e instanceof Blob) ||
        (sm && e instanceof File)
    );
}
function ai(e, t) {
    if (!e || typeof e != "object") return !1;
    if (Array.isArray(e)) {
        for (let n = 0, r = e.length; n < r; n++) if (ai(e[n])) return !0;
        return !1;
    }
    if (Al(e)) return !0;
    if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
        return ai(e.toJSON(), !0);
    for (const n in e)
        if (Object.prototype.hasOwnProperty.call(e, n) && ai(e[n])) return !0;
    return !1;
}
function lm(e) {
    const t = [],
        n = e.data,
        r = e;
    return (
        (r.data = Ps(n, t)),
        (r.attachments = t.length),
        { packet: r, buffers: t }
    );
}
function Ps(e, t) {
    if (!e) return e;
    if (Al(e)) {
        const n = { _placeholder: !0, num: t.length };
        return t.push(e), n;
    } else if (Array.isArray(e)) {
        const n = new Array(e.length);
        for (let r = 0; r < e.length; r++) n[r] = Ps(e[r], t);
        return n;
    } else if (typeof e == "object" && !(e instanceof Date)) {
        const n = {};
        for (const r in e)
            Object.prototype.hasOwnProperty.call(e, r) && (n[r] = Ps(e[r], t));
        return n;
    }
    return e;
}
function am(e, t) {
    return (e.data = Cs(e.data, t)), delete e.attachments, e;
}
function Cs(e, t) {
    if (!e) return e;
    if (e && e._placeholder === !0) {
        if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
            return t[e.num];
        throw new Error("illegal attachments");
    } else if (Array.isArray(e))
        for (let n = 0; n < e.length; n++) e[n] = Cs(e[n], t);
    else if (typeof e == "object")
        for (const n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (e[n] = Cs(e[n], t));
    return e;
}
const um = [
        "connect",
        "connect_error",
        "disconnect",
        "disconnecting",
        "newListener",
        "removeListener",
    ],
    cm = 5;
var J;
(function (e) {
    (e[(e.CONNECT = 0)] = "CONNECT"),
        (e[(e.DISCONNECT = 1)] = "DISCONNECT"),
        (e[(e.EVENT = 2)] = "EVENT"),
        (e[(e.ACK = 3)] = "ACK"),
        (e[(e.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
        (e[(e.BINARY_EVENT = 5)] = "BINARY_EVENT"),
        (e[(e.BINARY_ACK = 6)] = "BINARY_ACK");
})(J || (J = {}));
class dm {
    constructor(t) {
        this.replacer = t;
    }
    encode(t) {
        return (t.type === J.EVENT || t.type === J.ACK) && ai(t)
            ? this.encodeAsBinary({
                  type: t.type === J.EVENT ? J.BINARY_EVENT : J.BINARY_ACK,
                  nsp: t.nsp,
                  data: t.data,
                  id: t.id,
              })
            : [this.encodeAsString(t)];
    }
    encodeAsString(t) {
        let n = "" + t.type;
        return (
            (t.type === J.BINARY_EVENT || t.type === J.BINARY_ACK) &&
                (n += t.attachments + "-"),
            t.nsp && t.nsp !== "/" && (n += t.nsp + ","),
            t.id != null && (n += t.id),
            t.data != null && (n += JSON.stringify(t.data, this.replacer)),
            n
        );
    }
    encodeAsBinary(t) {
        const n = lm(t),
            r = this.encodeAsString(n.packet),
            i = n.buffers;
        return i.unshift(r), i;
    }
}
function Xa(e) {
    return Object.prototype.toString.call(e) === "[object Object]";
}
class Nl extends le {
    constructor(t) {
        super(), (this.reviver = t);
    }
    add(t) {
        let n;
        if (typeof t == "string") {
            if (this.reconstructor)
                throw new Error(
                    "got plaintext data when reconstructing a packet"
                );
            n = this.decodeString(t);
            const r = n.type === J.BINARY_EVENT;
            r || n.type === J.BINARY_ACK
                ? ((n.type = r ? J.EVENT : J.ACK),
                  (this.reconstructor = new fm(n)),
                  n.attachments === 0 && super.emitReserved("decoded", n))
                : super.emitReserved("decoded", n);
        } else if (Al(t) || t.base64)
            if (this.reconstructor)
                (n = this.reconstructor.takeBinaryData(t)),
                    n &&
                        ((this.reconstructor = null),
                        super.emitReserved("decoded", n));
            else
                throw new Error(
                    "got binary data when not reconstructing a packet"
                );
        else throw new Error("Unknown type: " + t);
    }
    decodeString(t) {
        let n = 0;
        const r = { type: Number(t.charAt(0)) };
        if (J[r.type] === void 0)
            throw new Error("unknown packet type " + r.type);
        if (r.type === J.BINARY_EVENT || r.type === J.BINARY_ACK) {
            const o = n + 1;
            for (; t.charAt(++n) !== "-" && n != t.length; );
            const s = t.substring(o, n);
            if (s != Number(s) || t.charAt(n) !== "-")
                throw new Error("Illegal attachments");
            r.attachments = Number(s);
        }
        if (t.charAt(n + 1) === "/") {
            const o = n + 1;
            for (; ++n && !(t.charAt(n) === "," || n === t.length); );
            r.nsp = t.substring(o, n);
        } else r.nsp = "/";
        const i = t.charAt(n + 1);
        if (i !== "" && Number(i) == i) {
            const o = n + 1;
            for (; ++n; ) {
                const s = t.charAt(n);
                if (s == null || Number(s) != s) {
                    --n;
                    break;
                }
                if (n === t.length) break;
            }
            r.id = Number(t.substring(o, n + 1));
        }
        if (t.charAt(++n)) {
            const o = this.tryParse(t.substr(n));
            if (Nl.isPayloadValid(r.type, o)) r.data = o;
            else throw new Error("invalid payload");
        }
        return r;
    }
    tryParse(t) {
        try {
            return JSON.parse(t, this.reviver);
        } catch {
            return !1;
        }
    }
    static isPayloadValid(t, n) {
        switch (t) {
            case J.CONNECT:
                return Xa(n);
            case J.DISCONNECT:
                return n === void 0;
            case J.CONNECT_ERROR:
                return typeof n == "string" || Xa(n);
            case J.EVENT:
            case J.BINARY_EVENT:
                return (
                    Array.isArray(n) &&
                    (typeof n[0] == "number" ||
                        (typeof n[0] == "string" && um.indexOf(n[0]) === -1))
                );
            case J.ACK:
            case J.BINARY_ACK:
                return Array.isArray(n);
        }
    }
    destroy() {
        this.reconstructor &&
            (this.reconstructor.finishedReconstruction(),
            (this.reconstructor = null));
    }
}
class fm {
    constructor(t) {
        (this.packet = t), (this.buffers = []), (this.reconPack = t);
    }
    takeBinaryData(t) {
        if (
            (this.buffers.push(t),
            this.buffers.length === this.reconPack.attachments)
        ) {
            const n = am(this.reconPack, this.buffers);
            return this.finishedReconstruction(), n;
        }
        return null;
    }
    finishedReconstruction() {
        (this.reconPack = null), (this.buffers = []);
    }
}
const pm = Object.freeze(
    Object.defineProperty(
        {
            __proto__: null,
            Decoder: Nl,
            Encoder: dm,
            get PacketType() {
                return J;
            },
            protocol: cm,
        },
        Symbol.toStringTag,
        { value: "Module" }
    )
);
function Ge(e, t, n) {
    return (
        e.on(t, n),
        function () {
            e.off(t, n);
        }
    );
}
const hm = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1,
});
class Ad extends le {
    constructor(t, n, r) {
        super(),
            (this.connected = !1),
            (this.recovered = !1),
            (this.receiveBuffer = []),
            (this.sendBuffer = []),
            (this._queue = []),
            (this._queueSeq = 0),
            (this.ids = 0),
            (this.acks = {}),
            (this.flags = {}),
            (this.io = t),
            (this.nsp = n),
            r && r.auth && (this.auth = r.auth),
            (this._opts = Object.assign({}, r)),
            this.io._autoConnect && this.open();
    }
    get disconnected() {
        return !this.connected;
    }
    subEvents() {
        if (this.subs) return;
        const t = this.io;
        this.subs = [
            Ge(t, "open", this.onopen.bind(this)),
            Ge(t, "packet", this.onpacket.bind(this)),
            Ge(t, "error", this.onerror.bind(this)),
            Ge(t, "close", this.onclose.bind(this)),
        ];
    }
    get active() {
        return !!this.subs;
    }
    connect() {
        return this.connected
            ? this
            : (this.subEvents(),
              this.io._reconnecting || this.io.open(),
              this.io._readyState === "open" && this.onopen(),
              this);
    }
    open() {
        return this.connect();
    }
    send(...t) {
        return t.unshift("message"), this.emit.apply(this, t), this;
    }
    emit(t, ...n) {
        if (hm.hasOwnProperty(t))
            throw new Error('"' + t.toString() + '" is a reserved event name');
        if (
            (n.unshift(t),
            this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
        )
            return this._addToQueue(n), this;
        const r = { type: J.EVENT, data: n };
        if (
            ((r.options = {}),
            (r.options.compress = this.flags.compress !== !1),
            typeof n[n.length - 1] == "function")
        ) {
            const s = this.ids++,
                a = n.pop();
            this._registerAckCallback(s, a), (r.id = s);
        }
        const i =
            this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        return (
            (this.flags.volatile && (!i || !this.connected)) ||
                (this.connected
                    ? (this.notifyOutgoingListeners(r), this.packet(r))
                    : this.sendBuffer.push(r)),
            (this.flags = {}),
            this
        );
    }
    _registerAckCallback(t, n) {
        var r;
        const i =
            (r = this.flags.timeout) !== null && r !== void 0
                ? r
                : this._opts.ackTimeout;
        if (i === void 0) {
            this.acks[t] = n;
            return;
        }
        const o = this.io.setTimeoutFn(() => {
            delete this.acks[t];
            for (let s = 0; s < this.sendBuffer.length; s++)
                this.sendBuffer[s].id === t && this.sendBuffer.splice(s, 1);
            n.call(this, new Error("operation has timed out"));
        }, i);
        this.acks[t] = (...s) => {
            this.io.clearTimeoutFn(o), n.apply(this, [null, ...s]);
        };
    }
    emitWithAck(t, ...n) {
        const r =
            this.flags.timeout !== void 0 || this._opts.ackTimeout !== void 0;
        return new Promise((i, o) => {
            n.push((s, a) => (r ? (s ? o(s) : i(a)) : i(s))),
                this.emit(t, ...n);
        });
    }
    _addToQueue(t) {
        let n;
        typeof t[t.length - 1] == "function" && (n = t.pop());
        const r = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: !1,
            args: t,
            flags: Object.assign({ fromQueue: !0 }, this.flags),
        };
        t.push((i, ...o) =>
            r !== this._queue[0]
                ? void 0
                : (i !== null
                      ? r.tryCount > this._opts.retries &&
                        (this._queue.shift(), n && n(i))
                      : (this._queue.shift(), n && n(null, ...o)),
                  (r.pending = !1),
                  this._drainQueue())
        ),
            this._queue.push(r),
            this._drainQueue();
    }
    _drainQueue(t = !1) {
        if (!this.connected || this._queue.length === 0) return;
        const n = this._queue[0];
        (n.pending && !t) ||
            ((n.pending = !0),
            n.tryCount++,
            (this.flags = n.flags),
            this.emit.apply(this, n.args));
    }
    packet(t) {
        (t.nsp = this.nsp), this.io._packet(t);
    }
    onopen() {
        typeof this.auth == "function"
            ? this.auth((t) => {
                  this._sendConnectPacket(t);
              })
            : this._sendConnectPacket(this.auth);
    }
    _sendConnectPacket(t) {
        this.packet({
            type: J.CONNECT,
            data: this._pid
                ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
                : t,
        });
    }
    onerror(t) {
        this.connected || this.emitReserved("connect_error", t);
    }
    onclose(t, n) {
        (this.connected = !1),
            delete this.id,
            this.emitReserved("disconnect", t, n);
    }
    onpacket(t) {
        if (t.nsp === this.nsp)
            switch (t.type) {
                case J.CONNECT:
                    t.data && t.data.sid
                        ? this.onconnect(t.data.sid, t.data.pid)
                        : this.emitReserved(
                              "connect_error",
                              new Error(
                                  "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                              )
                          );
                    break;
                case J.EVENT:
                case J.BINARY_EVENT:
                    this.onevent(t);
                    break;
                case J.ACK:
                case J.BINARY_ACK:
                    this.onack(t);
                    break;
                case J.DISCONNECT:
                    this.ondisconnect();
                    break;
                case J.CONNECT_ERROR:
                    this.destroy();
                    const r = new Error(t.data.message);
                    (r.data = t.data.data),
                        this.emitReserved("connect_error", r);
                    break;
            }
    }
    onevent(t) {
        const n = t.data || [];
        t.id != null && n.push(this.ack(t.id)),
            this.connected
                ? this.emitEvent(n)
                : this.receiveBuffer.push(Object.freeze(n));
    }
    emitEvent(t) {
        if (this._anyListeners && this._anyListeners.length) {
            const n = this._anyListeners.slice();
            for (const r of n) r.apply(this, t);
        }
        super.emit.apply(this, t),
            this._pid &&
                t.length &&
                typeof t[t.length - 1] == "string" &&
                (this._lastOffset = t[t.length - 1]);
    }
    ack(t) {
        const n = this;
        let r = !1;
        return function (...i) {
            r || ((r = !0), n.packet({ type: J.ACK, id: t, data: i }));
        };
    }
    onack(t) {
        const n = this.acks[t.id];
        typeof n == "function" &&
            (n.apply(this, t.data), delete this.acks[t.id]);
    }
    onconnect(t, n) {
        (this.id = t),
            (this.recovered = n && this._pid === n),
            (this._pid = n),
            (this.connected = !0),
            this.emitBuffered(),
            this.emitReserved("connect"),
            this._drainQueue(!0);
    }
    emitBuffered() {
        this.receiveBuffer.forEach((t) => this.emitEvent(t)),
            (this.receiveBuffer = []),
            this.sendBuffer.forEach((t) => {
                this.notifyOutgoingListeners(t), this.packet(t);
            }),
            (this.sendBuffer = []);
    }
    ondisconnect() {
        this.destroy(), this.onclose("io server disconnect");
    }
    destroy() {
        this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
            this.io._destroy(this);
    }
    disconnect() {
        return (
            this.connected && this.packet({ type: J.DISCONNECT }),
            this.destroy(),
            this.connected && this.onclose("io client disconnect"),
            this
        );
    }
    close() {
        return this.disconnect();
    }
    compress(t) {
        return (this.flags.compress = t), this;
    }
    get volatile() {
        return (this.flags.volatile = !0), this;
    }
    timeout(t) {
        return (this.flags.timeout = t), this;
    }
    onAny(t) {
        return (
            (this._anyListeners = this._anyListeners || []),
            this._anyListeners.push(t),
            this
        );
    }
    prependAny(t) {
        return (
            (this._anyListeners = this._anyListeners || []),
            this._anyListeners.unshift(t),
            this
        );
    }
    offAny(t) {
        if (!this._anyListeners) return this;
        if (t) {
            const n = this._anyListeners;
            for (let r = 0; r < n.length; r++)
                if (t === n[r]) return n.splice(r, 1), this;
        } else this._anyListeners = [];
        return this;
    }
    listenersAny() {
        return this._anyListeners || [];
    }
    onAnyOutgoing(t) {
        return (
            (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
            this._anyOutgoingListeners.push(t),
            this
        );
    }
    prependAnyOutgoing(t) {
        return (
            (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
            this._anyOutgoingListeners.unshift(t),
            this
        );
    }
    offAnyOutgoing(t) {
        if (!this._anyOutgoingListeners) return this;
        if (t) {
            const n = this._anyOutgoingListeners;
            for (let r = 0; r < n.length; r++)
                if (t === n[r]) return n.splice(r, 1), this;
        } else this._anyOutgoingListeners = [];
        return this;
    }
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    notifyOutgoingListeners(t) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const n = this._anyOutgoingListeners.slice();
            for (const r of n) r.apply(this, t.data);
        }
    }
}
function Fn(e) {
    (e = e || {}),
        (this.ms = e.min || 100),
        (this.max = e.max || 1e4),
        (this.factor = e.factor || 2),
        (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
        (this.attempts = 0);
}
Fn.prototype.duration = function () {
    var e = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var t = Math.random(),
            n = Math.floor(t * this.jitter * e);
        e = Math.floor(t * 10) & 1 ? e + n : e - n;
    }
    return Math.min(e, this.max) | 0;
};
Fn.prototype.reset = function () {
    this.attempts = 0;
};
Fn.prototype.setMin = function (e) {
    this.ms = e;
};
Fn.prototype.setMax = function (e) {
    this.max = e;
};
Fn.prototype.setJitter = function (e) {
    this.jitter = e;
};
class Es extends le {
    constructor(t, n) {
        var r;
        super(),
            (this.nsps = {}),
            (this.subs = []),
            t && typeof t == "object" && ((n = t), (t = void 0)),
            (n = n || {}),
            (n.path = n.path || "/socket.io"),
            (this.opts = n),
            Yi(this, n),
            this.reconnection(n.reconnection !== !1),
            this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
            this.reconnectionDelay(n.reconnectionDelay || 1e3),
            this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
            this.randomizationFactor(
                (r = n.randomizationFactor) !== null && r !== void 0 ? r : 0.5
            ),
            (this.backoff = new Fn({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor(),
            })),
            this.timeout(n.timeout == null ? 2e4 : n.timeout),
            (this._readyState = "closed"),
            (this.uri = t);
        const i = n.parser || pm;
        (this.encoder = new i.Encoder()),
            (this.decoder = new i.Decoder()),
            (this._autoConnect = n.autoConnect !== !1),
            this._autoConnect && this.open();
    }
    reconnection(t) {
        return arguments.length
            ? ((this._reconnection = !!t), this)
            : this._reconnection;
    }
    reconnectionAttempts(t) {
        return t === void 0
            ? this._reconnectionAttempts
            : ((this._reconnectionAttempts = t), this);
    }
    reconnectionDelay(t) {
        var n;
        return t === void 0
            ? this._reconnectionDelay
            : ((this._reconnectionDelay = t),
              (n = this.backoff) === null || n === void 0 || n.setMin(t),
              this);
    }
    randomizationFactor(t) {
        var n;
        return t === void 0
            ? this._randomizationFactor
            : ((this._randomizationFactor = t),
              (n = this.backoff) === null || n === void 0 || n.setJitter(t),
              this);
    }
    reconnectionDelayMax(t) {
        var n;
        return t === void 0
            ? this._reconnectionDelayMax
            : ((this._reconnectionDelayMax = t),
              (n = this.backoff) === null || n === void 0 || n.setMax(t),
              this);
    }
    timeout(t) {
        return arguments.length ? ((this._timeout = t), this) : this._timeout;
    }
    maybeReconnectOnOpen() {
        !this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0 &&
            this.reconnect();
    }
    open(t) {
        if (~this._readyState.indexOf("open")) return this;
        this.engine = new Cd(this.uri, this.opts);
        const n = this.engine,
            r = this;
        (this._readyState = "opening"), (this.skipReconnect = !1);
        const i = Ge(n, "open", function () {
                r.onopen(), t && t();
            }),
            o = (a) => {
                this.cleanup(),
                    (this._readyState = "closed"),
                    this.emitReserved("error", a),
                    t ? t(a) : this.maybeReconnectOnOpen();
            },
            s = Ge(n, "error", o);
        if (this._timeout !== !1) {
            const a = this._timeout,
                u = this.setTimeoutFn(() => {
                    i(), o(new Error("timeout")), n.close();
                }, a);
            this.opts.autoUnref && u.unref(),
                this.subs.push(() => {
                    this.clearTimeoutFn(u);
                });
        }
        return this.subs.push(i), this.subs.push(s), this;
    }
    connect(t) {
        return this.open(t);
    }
    onopen() {
        this.cleanup(), (this._readyState = "open"), this.emitReserved("open");
        const t = this.engine;
        this.subs.push(
            Ge(t, "ping", this.onping.bind(this)),
            Ge(t, "data", this.ondata.bind(this)),
            Ge(t, "error", this.onerror.bind(this)),
            Ge(t, "close", this.onclose.bind(this)),
            Ge(this.decoder, "decoded", this.ondecoded.bind(this))
        );
    }
    onping() {
        this.emitReserved("ping");
    }
    ondata(t) {
        try {
            this.decoder.add(t);
        } catch (n) {
            this.onclose("parse error", n);
        }
    }
    ondecoded(t) {
        El(() => {
            this.emitReserved("packet", t);
        }, this.setTimeoutFn);
    }
    onerror(t) {
        this.emitReserved("error", t);
    }
    socket(t, n) {
        let r = this.nsps[t];
        return (
            r
                ? this._autoConnect && !r.active && r.connect()
                : ((r = new Ad(this, t, n)), (this.nsps[t] = r)),
            r
        );
    }
    _destroy(t) {
        const n = Object.keys(this.nsps);
        for (const r of n) if (this.nsps[r].active) return;
        this._close();
    }
    _packet(t) {
        const n = this.encoder.encode(t);
        for (let r = 0; r < n.length; r++) this.engine.write(n[r], t.options);
    }
    cleanup() {
        this.subs.forEach((t) => t()),
            (this.subs.length = 0),
            this.decoder.destroy();
    }
    _close() {
        (this.skipReconnect = !0),
            (this._reconnecting = !1),
            this.onclose("forced close"),
            this.engine && this.engine.close();
    }
    disconnect() {
        return this._close();
    }
    onclose(t, n) {
        this.cleanup(),
            this.backoff.reset(),
            (this._readyState = "closed"),
            this.emitReserved("close", t, n),
            this._reconnection && !this.skipReconnect && this.reconnect();
    }
    reconnect() {
        if (this._reconnecting || this.skipReconnect) return this;
        const t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts)
            this.backoff.reset(),
                this.emitReserved("reconnect_failed"),
                (this._reconnecting = !1);
        else {
            const n = this.backoff.duration();
            this._reconnecting = !0;
            const r = this.setTimeoutFn(() => {
                t.skipReconnect ||
                    (this.emitReserved("reconnect_attempt", t.backoff.attempts),
                    !t.skipReconnect &&
                        t.open((i) => {
                            i
                                ? ((t._reconnecting = !1),
                                  t.reconnect(),
                                  this.emitReserved("reconnect_error", i))
                                : t.onreconnect();
                        }));
            }, n);
            this.opts.autoUnref && r.unref(),
                this.subs.push(() => {
                    this.clearTimeoutFn(r);
                });
        }
    }
    onreconnect() {
        const t = this.backoff.attempts;
        (this._reconnecting = !1),
            this.backoff.reset(),
            this.emitReserved("reconnect", t);
    }
}
const Wn = {};
function ui(e, t) {
    typeof e == "object" && ((t = e), (e = void 0)), (t = t || {});
    const n = nm(e, t.path || "/socket.io"),
        r = n.source,
        i = n.id,
        o = n.path,
        s = Wn[i] && o in Wn[i].nsps,
        a = t.forceNew || t["force new connection"] || t.multiplex === !1 || s;
    let u;
    return (
        a ? (u = new Es(r, t)) : (Wn[i] || (Wn[i] = new Es(r, t)), (u = Wn[i])),
        n.query && !t.query && (t.query = n.queryKey),
        u.socket(n.path, t)
    );
}
Object.assign(ui, { Manager: Es, Socket: Ad, io: ui, connect: ui });
function mm() {
    var e;
    try {
        e = JSON.parse(document.cookie);
    } catch {
        e = { rememberHost: !1, rememberName: !1, host: "", name: "" };
    }
    const t = M.useRef(null),
        [n, r] = M.useState(),
        [i, o] = M.useState(e.rememberName ? e.name : ""),
        [s, a] = M.useState(e.rememberHost ? e.host : ""),
        [u, f] = M.useState(e.rememberName),
        [g, h] = M.useState(e.rememberHost),
        [m, y] = M.useState(!1),
        [A, P] = M.useState(!1),
        B = (d) => {
            document.cookie = JSON.stringify({
                host: s,
                name: i,
                rememberHost: g,
                rememberName: u,
            });
            const c = ui(s, { rejectUnauthorized: !1 });
            y(!0),
                c.on("state", (p) => {
                    var k, v, C;
                    switch (p) {
                        case 0:
                            r(c), P(!0), y(!1);
                            break;
                        case 1:
                            (k = t.current) == null ||
                                k.message(
                                    "the game has already begun",
                                    "error",
                                    2,
                                    () => {
                                        y(!1);
                                    }
                                ),
                                c.disconnect();
                            break;
                        case 2:
                            (v = t.current) == null ||
                                v.message(
                                    "too many players on the server",
                                    "error",
                                    2,
                                    () => {
                                        y(!1);
                                    }
                                ),
                                c.disconnect();
                            break;
                        default:
                            (C = t.current) == null ||
                                C.message("unkown error", "error", 2),
                                c.disconnect(),
                                y(!1);
                            break;
                    }
                }),
                c.on("connect_error", () => {
                    var p;
                    (p = t.current) == null ||
                        p.message(
                            "the server does not exist or is unreachable",
                            "error",
                            2,
                            () => {
                                y(!1);
                            }
                        ),
                        c.disconnect();
                }),
                c.on("connect_timeout", () => {
                    var p;
                    (p = t.current) == null ||
                        p.message(
                            "the server took too long to respond",
                            "error",
                            2,
                            () => {
                                y(!1);
                            }
                        ),
                        c.disconnect();
                });
        };
    return n !== void 0 && A === !0
        ? l.jsx(Ch, { socket: n, name: i })
        : l.jsxs(l.Fragment, {
              children: [
                  l.jsx(fd, { ref: t }),
                  l.jsxs("div", {
                      className: "entry",
                      children: [
                          l.jsxs("header", {
                              children: [
                                  l.jsx("p", {
                                      style: { fontSize: 9 },
                                      children: "27.7.23",
                                  }),
                                  "Welcome to the ",
                                  l.jsx("h3", { children: "MONOPOLY" }),
                                  " Game",
                              ],
                          }),
                          l.jsx("br", {}),
                          l.jsx("p", {
                              children: "please enter your ip and port:",
                          }),
                          l.jsx("input", {
                              type: "text",
                              id: "name",
                              onChange: (d) => a(d.currentTarget.value),
                              defaultValue: s,
                              placeholder: "enter ip",
                          }),
                          l.jsx("p", { children: "please enter your name:" }),
                          l.jsx("input", {
                              type: "text",
                              id: "name",
                              onChange: (d) => o(d.currentTarget.value),
                              defaultValue: i,
                              placeholder: "enter name",
                          }),
                          l.jsxs("h5", {
                              children: [
                                  "do you want your name to be remembered?",
                                  " ",
                                  l.jsx("input", {
                                      id: "rememberedName",
                                      checked: u,
                                      onChange: (d) =>
                                          f(d.currentTarget.checked),
                                      type: "checkbox",
                                  }),
                              ],
                          }),
                          l.jsxs("h5", {
                              children: [
                                  "do you want your host to be remembered?",
                                  " ",
                                  l.jsx("input", {
                                      id: "rememberedHost",
                                      checked: g,
                                      onChange: (d) =>
                                          h(d.currentTarget.checked),
                                      type: "checkbox",
                                  }),
                              ],
                          }),
                          l.jsx("center", {
                              children: l.jsx("button", {
                                  onClick: B,
                                  disabled: m,
                                  children: "join",
                              }),
                          }),
                      ],
                  }),
              ],
          });
}
document.title = "Monopoly";
No.createRoot(document.getElementById("root")).render(l.jsx(mm, {}));
