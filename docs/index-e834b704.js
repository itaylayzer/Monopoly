var Gd = Object.defineProperty;
var Yd = (e, t, n) =>
    t in e
        ? Gd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (e[t] = n);
var Qe = (e, t, n) => (Yd(e, typeof t != "symbol" ? t + "" : t, n), n);
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
var xu = { exports: {} },
    Ki = {},
    ku = { exports: {} },
    q = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zr = Symbol.for("react.element"),
    Xd = Symbol.for("react.portal"),
    Zd = Symbol.for("react.fragment"),
    ef = Symbol.for("react.strict_mode"),
    tf = Symbol.for("react.profiler"),
    nf = Symbol.for("react.provider"),
    rf = Symbol.for("react.context"),
    of = Symbol.for("react.forward_ref"),
    sf = Symbol.for("react.suspense"),
    lf = Symbol.for("react.memo"),
    af = Symbol.for("react.lazy"),
    Xl = Symbol.iterator;
function uf(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (Xl && e[Xl]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var Pu = {
        isMounted: function () {
            return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
    },
    Cu = Object.assign,
    Eu = {};
function Hn(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = Eu),
        (this.updater = n || Pu);
}
Hn.prototype.isReactComponent = {};
Hn.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
            "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
    this.updater.enqueueSetState(this, e, t, "setState");
};
Hn.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Au() {}
Au.prototype = Hn.prototype;
function Ds(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = Eu),
        (this.updater = n || Pu);
}
var Us = (Ds.prototype = new Au());
Us.constructor = Ds;
Cu(Us, Hn.prototype);
Us.isPureReactComponent = !0;
var Zl = Array.isArray,
    Nu = Object.prototype.hasOwnProperty,
    qs = { current: null },
    ju = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ru(e, t, n) {
    var r,
        i = {},
        o = null,
        s = null;
    if (t != null)
        for (r in (t.ref !== void 0 && (s = t.ref),
        t.key !== void 0 && (o = "" + t.key),
        t))
            Nu.call(t, r) && !ju.hasOwnProperty(r) && (i[r] = t[r]);
    var u = arguments.length - 2;
    if (u === 1) i.children = n;
    else if (1 < u) {
        for (var a = Array(u), p = 0; p < u; p++) a[p] = arguments[p + 2];
        i.children = a;
    }
    if (e && e.defaultProps)
        for (r in ((u = e.defaultProps), u)) i[r] === void 0 && (i[r] = u[r]);
    return {
        $$typeof: zr,
        type: e,
        key: o,
        ref: s,
        props: i,
        _owner: qs.current,
    };
}
function cf(e, t) {
    return {
        $$typeof: zr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
    };
}
function Vs(e) {
    return typeof e == "object" && e !== null && e.$$typeof === zr;
}
function df(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
        "$" +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var ea = /\/+/g;
function po(e, t) {
    return typeof e == "object" && e !== null && e.key != null
        ? df("" + e.key)
        : t.toString(36);
}
function ai(e, t, n, r, i) {
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
                    case zr:
                    case Xd:
                        s = !0;
                }
        }
    if (s)
        return (
            (s = e),
            (i = i(s)),
            (e = r === "" ? "." + po(s, 0) : r),
            Zl(i)
                ? ((n = ""),
                  e != null && (n = e.replace(ea, "$&/") + "/"),
                  ai(i, t, n, "", function (p) {
                      return p;
                  }))
                : i != null &&
                  (Vs(i) &&
                      (i = cf(
                          i,
                          n +
                              (!i.key || (s && s.key === i.key)
                                  ? ""
                                  : ("" + i.key).replace(ea, "$&/") + "/") +
                              e
                      )),
                  t.push(i)),
            1
        );
    if (((s = 0), (r = r === "" ? "." : r + ":"), Zl(e)))
        for (var u = 0; u < e.length; u++) {
            o = e[u];
            var a = r + po(o, u);
            s += ai(o, t, n, a, i);
        }
    else if (((a = uf(e)), typeof a == "function"))
        for (e = a.call(e), u = 0; !(o = e.next()).done; )
            (o = o.value), (a = r + po(o, u++)), (s += ai(o, t, n, a, i));
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
function Vr(e, t, n) {
    if (e == null) return e;
    var r = [],
        i = 0;
    return (
        ai(e, r, "", "", function (o) {
            return t.call(n, o, i++);
        }),
        r
    );
}
function ff(e) {
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
var Ie = { current: null },
    ui = { transition: null },
    pf = {
        ReactCurrentDispatcher: Ie,
        ReactCurrentBatchConfig: ui,
        ReactCurrentOwner: qs,
    };
q.Children = {
    map: Vr,
    forEach: function (e, t, n) {
        Vr(
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
            Vr(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            Vr(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!Vs(e))
            throw Error(
                "React.Children.only expected to receive a single React element child."
            );
        return e;
    },
};
q.Component = Hn;
q.Fragment = Zd;
q.Profiler = tf;
q.PureComponent = Ds;
q.StrictMode = ef;
q.Suspense = sf;
q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = pf;
q.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error(
            "React.cloneElement(...): The argument must be a React element, but you passed " +
                e +
                "."
        );
    var r = Cu({}, e.props),
        i = e.key,
        o = e.ref,
        s = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((o = t.ref), (s = qs.current)),
            t.key !== void 0 && (i = "" + t.key),
            e.type && e.type.defaultProps)
        )
            var u = e.type.defaultProps;
        for (a in t)
            Nu.call(t, a) &&
                !ju.hasOwnProperty(a) &&
                (r[a] = t[a] === void 0 && u !== void 0 ? u[a] : t[a]);
    }
    var a = arguments.length - 2;
    if (a === 1) r.children = n;
    else if (1 < a) {
        u = Array(a);
        for (var p = 0; p < a; p++) u[p] = arguments[p + 2];
        r.children = u;
    }
    return { $$typeof: zr, type: e.type, key: i, ref: o, props: r, _owner: s };
};
q.createContext = function (e) {
    return (
        (e = {
            $$typeof: rf,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
        }),
        (e.Provider = { $$typeof: nf, _context: e }),
        (e.Consumer = e)
    );
};
q.createElement = Ru;
q.createFactory = function (e) {
    var t = Ru.bind(null, e);
    return (t.type = e), t;
};
q.createRef = function () {
    return { current: null };
};
q.forwardRef = function (e) {
    return { $$typeof: of, render: e };
};
q.isValidElement = Vs;
q.lazy = function (e) {
    return { $$typeof: af, _payload: { _status: -1, _result: e }, _init: ff };
};
q.memo = function (e, t) {
    return { $$typeof: lf, type: e, compare: t === void 0 ? null : t };
};
q.startTransition = function (e) {
    var t = ui.transition;
    ui.transition = {};
    try {
        e();
    } finally {
        ui.transition = t;
    }
};
q.unstable_act = function () {
    throw Error("act(...) is not supported in production builds of React.");
};
q.useCallback = function (e, t) {
    return Ie.current.useCallback(e, t);
};
q.useContext = function (e) {
    return Ie.current.useContext(e);
};
q.useDebugValue = function () {};
q.useDeferredValue = function (e) {
    return Ie.current.useDeferredValue(e);
};
q.useEffect = function (e, t) {
    return Ie.current.useEffect(e, t);
};
q.useId = function () {
    return Ie.current.useId();
};
q.useImperativeHandle = function (e, t, n) {
    return Ie.current.useImperativeHandle(e, t, n);
};
q.useInsertionEffect = function (e, t) {
    return Ie.current.useInsertionEffect(e, t);
};
q.useLayoutEffect = function (e, t) {
    return Ie.current.useLayoutEffect(e, t);
};
q.useMemo = function (e, t) {
    return Ie.current.useMemo(e, t);
};
q.useReducer = function (e, t, n) {
    return Ie.current.useReducer(e, t, n);
};
q.useRef = function (e) {
    return Ie.current.useRef(e);
};
q.useState = function (e) {
    return Ie.current.useState(e);
};
q.useSyncExternalStore = function (e, t, n) {
    return Ie.current.useSyncExternalStore(e, t, n);
};
q.useTransition = function () {
    return Ie.current.useTransition();
};
q.version = "18.2.0";
ku.exports = q;
var _ = ku.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hf = _,
    mf = Symbol.for("react.element"),
    yf = Symbol.for("react.fragment"),
    gf = Object.prototype.hasOwnProperty,
    vf =
        hf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    wf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Tu(e, t, n) {
    var r,
        i = {},
        o = null,
        s = null;
    n !== void 0 && (o = "" + n),
        t.key !== void 0 && (o = "" + t.key),
        t.ref !== void 0 && (s = t.ref);
    for (r in t) gf.call(t, r) && !wf.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: mf,
        type: e,
        key: o,
        ref: s,
        props: i,
        _owner: vf.current,
    };
}
Ki.Fragment = yf;
Ki.jsx = Tu;
Ki.jsxs = Tu;
xu.exports = Ki;
var l = xu.exports,
    Uo = {},
    _u = { exports: {} },
    $e = {},
    Lu = { exports: {} },
    Ou = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
    function t(N, j) {
        var L = N.length;
        N.push(j);
        e: for (; 0 < L; ) {
            var B = (L - 1) >>> 1,
                U = N[B];
            if (0 < i(U, j)) (N[B] = j), (N[L] = U), (L = B);
            else break e;
        }
    }
    function n(N) {
        return N.length === 0 ? null : N[0];
    }
    function r(N) {
        if (N.length === 0) return null;
        var j = N[0],
            L = N.pop();
        if (L !== j) {
            N[0] = L;
            e: for (var B = 0, U = N.length, V = U >>> 1; B < V; ) {
                var P = 2 * (B + 1) - 1,
                    A = N[P],
                    M = P + 1,
                    T = N[M];
                if (0 > i(A, L))
                    M < U && 0 > i(T, A)
                        ? ((N[B] = T), (N[M] = L), (B = M))
                        : ((N[B] = A), (N[P] = L), (B = P));
                else if (M < U && 0 > i(T, L)) (N[B] = T), (N[M] = L), (B = M);
                else break e;
            }
        }
        return j;
    }
    function i(N, j) {
        var L = N.sortIndex - j.sortIndex;
        return L !== 0 ? L : N.id - j.id;
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
            u = s.now();
        e.unstable_now = function () {
            return s.now() - u;
        };
    }
    var a = [],
        p = [],
        g = 1,
        m = null,
        y = 3,
        v = !1,
        E = !1,
        x = !1,
        D = typeof setTimeout == "function" ? setTimeout : null,
        d = typeof clearTimeout == "function" ? clearTimeout : null,
        f = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function h(N) {
        for (var j = n(p); j !== null; ) {
            if (j.callback === null) r(p);
            else if (j.startTime <= N)
                r(p), (j.sortIndex = j.expirationTime), t(a, j);
            else break;
            j = n(p);
        }
    }
    function S(N) {
        if (((x = !1), h(N), !E))
            if (n(a) !== null) (E = !0), ge(c);
            else {
                var j = n(p);
                j !== null && ke(S, j.startTime - N);
            }
    }
    function c(N, j) {
        (E = !1), x && ((x = !1), d(w), (w = -1)), (v = !0);
        var L = y;
        try {
            for (
                h(j), m = n(a);
                m !== null && (!(m.expirationTime > j) || (N && !$()));

            ) {
                var B = m.callback;
                if (typeof B == "function") {
                    (m.callback = null), (y = m.priorityLevel);
                    var U = B(m.expirationTime <= j);
                    (j = e.unstable_now()),
                        typeof U == "function"
                            ? (m.callback = U)
                            : m === n(a) && r(a),
                        h(j);
                } else r(a);
                m = n(a);
            }
            if (m !== null) var V = !0;
            else {
                var P = n(p);
                P !== null && ke(S, P.startTime - j), (V = !1);
            }
            return V;
        } finally {
            (m = null), (y = L), (v = !1);
        }
    }
    var R = !1,
        O = null,
        w = -1,
        I = 5,
        k = -1;
    function $() {
        return !(e.unstable_now() - k < I);
    }
    function le() {
        if (O !== null) {
            var N = e.unstable_now();
            k = N;
            var j = !0;
            try {
                j = O(!0, N);
            } finally {
                j ? ae() : ((R = !1), (O = null));
            }
        } else R = !1;
    }
    var ae;
    if (typeof f == "function")
        ae = function () {
            f(le);
        };
    else if (typeof MessageChannel < "u") {
        var de = new MessageChannel(),
            H = de.port2;
        (de.port1.onmessage = le),
            (ae = function () {
                H.postMessage(null);
            });
    } else
        ae = function () {
            D(le, 0);
        };
    function ge(N) {
        (O = N), R || ((R = !0), ae());
    }
    function ke(N, j) {
        w = D(function () {
            N(e.unstable_now());
        }, j);
    }
    (e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (N) {
            N.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            E || v || ((E = !0), ge(c));
        }),
        (e.unstable_forceFrameRate = function (N) {
            0 > N || 125 < N
                ? console.error(
                      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                  )
                : (I = 0 < N ? Math.floor(1e3 / N) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return y;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(a);
        }),
        (e.unstable_next = function (N) {
            switch (y) {
                case 1:
                case 2:
                case 3:
                    var j = 3;
                    break;
                default:
                    j = y;
            }
            var L = y;
            y = j;
            try {
                return N();
            } finally {
                y = L;
            }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (N, j) {
            switch (N) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    N = 3;
            }
            var L = y;
            y = N;
            try {
                return j();
            } finally {
                y = L;
            }
        }),
        (e.unstable_scheduleCallback = function (N, j, L) {
            var B = e.unstable_now();
            switch (
                (typeof L == "object" && L !== null
                    ? ((L = L.delay),
                      (L = typeof L == "number" && 0 < L ? B + L : B))
                    : (L = B),
                N)
            ) {
                case 1:
                    var U = -1;
                    break;
                case 2:
                    U = 250;
                    break;
                case 5:
                    U = 1073741823;
                    break;
                case 4:
                    U = 1e4;
                    break;
                default:
                    U = 5e3;
            }
            return (
                (U = L + U),
                (N = {
                    id: g++,
                    callback: j,
                    priorityLevel: N,
                    startTime: L,
                    expirationTime: U,
                    sortIndex: -1,
                }),
                L > B
                    ? ((N.sortIndex = L),
                      t(p, N),
                      n(a) === null &&
                          N === n(p) &&
                          (x ? (d(w), (w = -1)) : (x = !0), ke(S, L - B)))
                    : ((N.sortIndex = U), t(a, N), E || v || ((E = !0), ge(c))),
                N
            );
        }),
        (e.unstable_shouldYield = $),
        (e.unstable_wrapCallback = function (N) {
            var j = y;
            return function () {
                var L = y;
                y = j;
                try {
                    return N.apply(this, arguments);
                } finally {
                    y = L;
                }
            };
        });
})(Ou);
Lu.exports = Ou;
var Sf = Lu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Iu = _,
    Je = Sf;
function C(e) {
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
var Fu = new Set(),
    xr = {};
function mn(e, t) {
    Bn(e, t), Bn(e + "Capture", t);
}
function Bn(e, t) {
    for (xr[e] = t, e = 0; e < t.length; e++) Fu.add(t[e]);
}
var Rt = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
    ),
    qo = Object.prototype.hasOwnProperty,
    xf =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    ta = {},
    na = {};
function kf(e) {
    return qo.call(na, e)
        ? !0
        : qo.call(ta, e)
        ? !1
        : xf.test(e)
        ? (na[e] = !0)
        : ((ta[e] = !0), !1);
}
function Pf(e, t, n, r) {
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
function Cf(e, t, n, r) {
    if (t === null || typeof t > "u" || Pf(e, t, n, r)) return !0;
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
function Fe(e, t, n, r, i, o, s) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o),
        (this.removeEmptyString = s);
}
var Ee = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
        Ee[e] = new Fe(e, 0, !1, e, null, !1, !1);
    });
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
].forEach(function (e) {
    var t = e[0];
    Ee[t] = new Fe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    Ee[e] = new Fe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
].forEach(function (e) {
    Ee[e] = new Fe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
        Ee[e] = new Fe(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
    Ee[e] = new Fe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
    Ee[e] = new Fe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
    Ee[e] = new Fe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
    Ee[e] = new Fe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Js = /[\-:]([a-z])/g;
function $s(e) {
    return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(Js, $s);
        Ee[t] = new Fe(t, 1, !1, e, null, !1, !1);
    });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(Js, $s);
        Ee[t] = new Fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(Js, $s);
    Ee[t] = new Fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
    Ee[e] = new Fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ee.xlinkHref = new Fe(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
    Ee[e] = new Fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Hs(e, t, n, r) {
    var i = Ee.hasOwnProperty(t) ? Ee[t] : null;
    (i !== null
        ? i.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== "o" && t[0] !== "O") ||
          (t[1] !== "n" && t[1] !== "N")) &&
        (Cf(t, n, i, r) && (n = null),
        r || i === null
            ? kf(t) &&
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
var Ot = Iu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Jr = Symbol.for("react.element"),
    Sn = Symbol.for("react.portal"),
    xn = Symbol.for("react.fragment"),
    Ws = Symbol.for("react.strict_mode"),
    Vo = Symbol.for("react.profiler"),
    Mu = Symbol.for("react.provider"),
    bu = Symbol.for("react.context"),
    Ks = Symbol.for("react.forward_ref"),
    Jo = Symbol.for("react.suspense"),
    $o = Symbol.for("react.suspense_list"),
    Qs = Symbol.for("react.memo"),
    Ft = Symbol.for("react.lazy"),
    zu = Symbol.for("react.offscreen"),
    ra = Symbol.iterator;
function Yn(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (ra && e[ra]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var se = Object.assign,
    ho;
function lr(e) {
    if (ho === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            ho = (t && t[1]) || "";
        }
    return (
        `
` +
        ho +
        e
    );
}
var mo = !1;
function yo(e, t) {
    if (!e || mo) return "";
    mo = !0;
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
                } catch (p) {
                    var r = p;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (p) {
                    r = p;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (p) {
                r = p;
            }
            e();
        }
    } catch (p) {
        if (p && r && typeof p.stack == "string") {
            for (
                var i = p.stack.split(`
`),
                    o = r.stack.split(`
`),
                    s = i.length - 1,
                    u = o.length - 1;
                1 <= s && 0 <= u && i[s] !== o[u];

            )
                u--;
            for (; 1 <= s && 0 <= u; s--, u--)
                if (i[s] !== o[u]) {
                    if (s !== 1 || u !== 1)
                        do
                            if ((s--, u--, 0 > u || i[s] !== o[u])) {
                                var a =
                                    `
` + i[s].replace(" at new ", " at ");
                                return (
                                    e.displayName &&
                                        a.includes("<anonymous>") &&
                                        (a = a.replace(
                                            "<anonymous>",
                                            e.displayName
                                        )),
                                    a
                                );
                            }
                        while (1 <= s && 0 <= u);
                    break;
                }
        }
    } finally {
        (mo = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? lr(e) : "";
}
function Ef(e) {
    switch (e.tag) {
        case 5:
            return lr(e.type);
        case 16:
            return lr("Lazy");
        case 13:
            return lr("Suspense");
        case 19:
            return lr("SuspenseList");
        case 0:
        case 2:
        case 15:
            return (e = yo(e.type, !1)), e;
        case 11:
            return (e = yo(e.type.render, !1)), e;
        case 1:
            return (e = yo(e.type, !0)), e;
        default:
            return "";
    }
}
function Ho(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case xn:
            return "Fragment";
        case Sn:
            return "Portal";
        case Vo:
            return "Profiler";
        case Ws:
            return "StrictMode";
        case Jo:
            return "Suspense";
        case $o:
            return "SuspenseList";
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
            case bu:
                return (e.displayName || "Context") + ".Consumer";
            case Mu:
                return (e._context.displayName || "Context") + ".Provider";
            case Ks:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e ||
                        ((e = t.displayName || t.name || ""),
                        (e =
                            e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
                    e
                );
            case Qs:
                return (
                    (t = e.displayName || null),
                    t !== null ? t : Ho(e.type) || "Memo"
                );
            case Ft:
                (t = e._payload), (e = e._init);
                try {
                    return Ho(e(t));
                } catch {}
        }
    return null;
}
function Af(e) {
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
            return Ho(t);
        case 8:
            return t === Ws ? "StrictMode" : "Mode";
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
function Qt(e) {
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
function Bu(e) {
    var t = e.type;
    return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
    );
}
function Nf(e) {
    var t = Bu(e) ? "checked" : "value",
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
function $r(e) {
    e._valueTracker || (e._valueTracker = Nf(e));
}
function Du(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return (
        e && (r = Bu(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
    );
}
function Pi(e) {
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
function Wo(e, t) {
    var n = t.checked;
    return se({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
    });
}
function ia(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    (n = Qt(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
                t.type === "checkbox" || t.type === "radio"
                    ? t.checked != null
                    : t.value != null,
        });
}
function Uu(e, t) {
    (t = t.checked), t != null && Hs(e, "checked", t, !1);
}
function Ko(e, t) {
    Uu(e, t);
    var n = Qt(t.value),
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
        ? Qo(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && Qo(e, t.type, Qt(t.defaultValue)),
        t.checked == null &&
            t.defaultChecked != null &&
            (e.defaultChecked = !!t.defaultChecked);
}
function oa(e, t, n) {
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
function Qo(e, t, n) {
    (t !== "number" || Pi(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = "" + e._wrapperState.initialValue)
            : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var ar = Array.isArray;
function Ln(e, t, n, r) {
    if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
            (i = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== i && (e[n].selected = i),
                i && r && (e[n].defaultSelected = !0);
    } else {
        for (n = "" + Qt(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                (e[i].selected = !0), r && (e[i].defaultSelected = !0);
                return;
            }
            t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
    }
}
function Go(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(C(91));
    return se({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
    });
}
function sa(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(C(92));
            if (ar(n)) {
                if (1 < n.length) throw Error(C(93));
                n = n[0];
            }
            t = n;
        }
        t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: Qt(n) };
}
function qu(e, t) {
    var n = Qt(t.value),
        r = Qt(t.defaultValue);
    n != null &&
        ((n = "" + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = "" + r);
}
function la(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
        t !== "" &&
        t !== null &&
        (e.value = t);
}
function Vu(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml";
    }
}
function Yo(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
        ? Vu(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
}
var Hr,
    Ju = (function (e) {
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
                Hr = Hr || document.createElement("div"),
                    Hr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
                    t = Hr.firstChild;
                e.firstChild;

            )
                e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
    });
function kr(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var fr = {
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
    jf = ["Webkit", "ms", "Moz", "O"];
Object.keys(fr).forEach(function (e) {
    jf.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (fr[t] = fr[e]);
    });
});
function $u(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
        ? ""
        : n ||
          typeof t != "number" ||
          t === 0 ||
          (fr.hasOwnProperty(e) && fr[e])
        ? ("" + t).trim()
        : t + "px";
}
function Hu(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                i = $u(n, t[n], r);
            n === "float" && (n = "cssFloat"),
                r ? e.setProperty(n, i) : (e[n] = i);
        }
}
var Rf = se(
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
function Xo(e, t) {
    if (t) {
        if (Rf[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(C(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(C(60));
            if (
                typeof t.dangerouslySetInnerHTML != "object" ||
                !("__html" in t.dangerouslySetInnerHTML)
            )
                throw Error(C(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(C(62));
    }
}
function Zo(e, t) {
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
var es = null;
function Gs(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var ts = null,
    On = null,
    In = null;
function aa(e) {
    if ((e = Ur(e))) {
        if (typeof ts != "function") throw Error(C(280));
        var t = e.stateNode;
        t && ((t = Zi(t)), ts(e.stateNode, e.type, t));
    }
}
function Wu(e) {
    On ? (In ? In.push(e) : (In = [e])) : (On = e);
}
function Ku() {
    if (On) {
        var e = On,
            t = In;
        if (((In = On = null), aa(e), t))
            for (e = 0; e < t.length; e++) aa(t[e]);
    }
}
function Qu(e, t) {
    return e(t);
}
function Gu() {}
var go = !1;
function Yu(e, t, n) {
    if (go) return e(t, n);
    go = !0;
    try {
        return Qu(e, t, n);
    } finally {
        (go = !1), (On !== null || In !== null) && (Gu(), Ku());
    }
}
function Pr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Zi(n);
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
    if (n && typeof n != "function") throw Error(C(231, t, typeof n));
    return n;
}
var ns = !1;
if (Rt)
    try {
        var Xn = {};
        Object.defineProperty(Xn, "passive", {
            get: function () {
                ns = !0;
            },
        }),
            window.addEventListener("test", Xn, Xn),
            window.removeEventListener("test", Xn, Xn);
    } catch {
        ns = !1;
    }
function Tf(e, t, n, r, i, o, s, u, a) {
    var p = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, p);
    } catch (g) {
        this.onError(g);
    }
}
var pr = !1,
    Ci = null,
    Ei = !1,
    rs = null,
    _f = {
        onError: function (e) {
            (pr = !0), (Ci = e);
        },
    };
function Lf(e, t, n, r, i, o, s, u, a) {
    (pr = !1), (Ci = null), Tf.apply(_f, arguments);
}
function Of(e, t, n, r, i, o, s, u, a) {
    if ((Lf.apply(this, arguments), pr)) {
        if (pr) {
            var p = Ci;
            (pr = !1), (Ci = null);
        } else throw Error(C(198));
        Ei || ((Ei = !0), (rs = p));
    }
}
function yn(e) {
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
function Xu(e) {
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
function ua(e) {
    if (yn(e) !== e) throw Error(C(188));
}
function If(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = yn(e)), t === null)) throw Error(C(188));
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
                if (o === n) return ua(i), e;
                if (o === r) return ua(i), t;
                o = o.sibling;
            }
            throw Error(C(188));
        }
        if (n.return !== r.return) (n = i), (r = o);
        else {
            for (var s = !1, u = i.child; u; ) {
                if (u === n) {
                    (s = !0), (n = i), (r = o);
                    break;
                }
                if (u === r) {
                    (s = !0), (r = i), (n = o);
                    break;
                }
                u = u.sibling;
            }
            if (!s) {
                for (u = o.child; u; ) {
                    if (u === n) {
                        (s = !0), (n = o), (r = i);
                        break;
                    }
                    if (u === r) {
                        (s = !0), (r = o), (n = i);
                        break;
                    }
                    u = u.sibling;
                }
                if (!s) throw Error(C(189));
            }
        }
        if (n.alternate !== r) throw Error(C(190));
    }
    if (n.tag !== 3) throw Error(C(188));
    return n.stateNode.current === n ? e : t;
}
function Zu(e) {
    return (e = If(e)), e !== null ? ec(e) : null;
}
function ec(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
        var t = ec(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var tc = Je.unstable_scheduleCallback,
    ca = Je.unstable_cancelCallback,
    Ff = Je.unstable_shouldYield,
    Mf = Je.unstable_requestPaint,
    ce = Je.unstable_now,
    bf = Je.unstable_getCurrentPriorityLevel,
    Ys = Je.unstable_ImmediatePriority,
    nc = Je.unstable_UserBlockingPriority,
    Ai = Je.unstable_NormalPriority,
    zf = Je.unstable_LowPriority,
    rc = Je.unstable_IdlePriority,
    Qi = null,
    St = null;
function Bf(e) {
    if (St && typeof St.onCommitFiberRoot == "function")
        try {
            St.onCommitFiberRoot(
                Qi,
                e,
                void 0,
                (e.current.flags & 128) === 128
            );
        } catch {}
}
var ft = Math.clz32 ? Math.clz32 : qf,
    Df = Math.log,
    Uf = Math.LN2;
function qf(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Df(e) / Uf) | 0)) | 0;
}
var Wr = 64,
    Kr = 4194304;
function ur(e) {
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
function Ni(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        i = e.suspendedLanes,
        o = e.pingedLanes,
        s = n & 268435455;
    if (s !== 0) {
        var u = s & ~i;
        u !== 0 ? (r = ur(u)) : ((o &= s), o !== 0 && (r = ur(o)));
    } else (s = n & ~i), s !== 0 ? (r = ur(s)) : o !== 0 && (r = ur(o));
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
            (n = 31 - ft(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
    return r;
}
function Vf(e, t) {
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
function Jf(e, t) {
    for (
        var n = e.suspendedLanes,
            r = e.pingedLanes,
            i = e.expirationTimes,
            o = e.pendingLanes;
        0 < o;

    ) {
        var s = 31 - ft(o),
            u = 1 << s,
            a = i[s];
        a === -1
            ? (!(u & n) || u & r) && (i[s] = Vf(u, t))
            : a <= t && (e.expiredLanes |= u),
            (o &= ~u);
    }
}
function is(e) {
    return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
}
function ic() {
    var e = Wr;
    return (Wr <<= 1), !(Wr & 4194240) && (Wr = 64), e;
}
function vo(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function Br(e, t, n) {
    (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - ft(t)),
        (e[t] = n);
}
function $f(e, t) {
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
        var i = 31 - ft(n),
            o = 1 << i;
        (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
    }
}
function Xs(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
        var r = 31 - ft(n),
            i = 1 << r;
        (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
    }
}
var Q = 0;
function oc(e) {
    return (
        (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
}
var sc,
    Zs,
    lc,
    ac,
    uc,
    os = !1,
    Qr = [],
    Ut = null,
    qt = null,
    Vt = null,
    Cr = new Map(),
    Er = new Map(),
    bt = [],
    Hf =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
            " "
        );
function da(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            Ut = null;
            break;
        case "dragenter":
        case "dragleave":
            qt = null;
            break;
        case "mouseover":
        case "mouseout":
            Vt = null;
            break;
        case "pointerover":
        case "pointerout":
            Cr.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Er.delete(t.pointerId);
    }
}
function Zn(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o
        ? ((e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: o,
              targetContainers: [i],
          }),
          t !== null && ((t = Ur(t)), t !== null && Zs(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
}
function Wf(e, t, n, r, i) {
    switch (t) {
        case "focusin":
            return (Ut = Zn(Ut, e, t, n, r, i)), !0;
        case "dragenter":
            return (qt = Zn(qt, e, t, n, r, i)), !0;
        case "mouseover":
            return (Vt = Zn(Vt, e, t, n, r, i)), !0;
        case "pointerover":
            var o = i.pointerId;
            return Cr.set(o, Zn(Cr.get(o) || null, e, t, n, r, i)), !0;
        case "gotpointercapture":
            return (
                (o = i.pointerId),
                Er.set(o, Zn(Er.get(o) || null, e, t, n, r, i)),
                !0
            );
    }
    return !1;
}
function cc(e) {
    var t = rn(e.target);
    if (t !== null) {
        var n = yn(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = Xu(n)), t !== null)) {
                    (e.blockedOn = t),
                        uc(e.priority, function () {
                            lc(n);
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
function ci(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = ss(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            (es = r), n.target.dispatchEvent(r), (es = null);
        } else return (t = Ur(n)), t !== null && Zs(t), (e.blockedOn = n), !1;
        t.shift();
    }
    return !0;
}
function fa(e, t, n) {
    ci(e) && n.delete(t);
}
function Kf() {
    (os = !1),
        Ut !== null && ci(Ut) && (Ut = null),
        qt !== null && ci(qt) && (qt = null),
        Vt !== null && ci(Vt) && (Vt = null),
        Cr.forEach(fa),
        Er.forEach(fa);
}
function er(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null),
        os ||
            ((os = !0),
            Je.unstable_scheduleCallback(Je.unstable_NormalPriority, Kf)));
}
function Ar(e) {
    function t(i) {
        return er(i, e);
    }
    if (0 < Qr.length) {
        er(Qr[0], e);
        for (var n = 1; n < Qr.length; n++) {
            var r = Qr[n];
            r.blockedOn === e && (r.blockedOn = null);
        }
    }
    for (
        Ut !== null && er(Ut, e),
            qt !== null && er(qt, e),
            Vt !== null && er(Vt, e),
            Cr.forEach(t),
            Er.forEach(t),
            n = 0;
        n < bt.length;
        n++
    )
        (r = bt[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < bt.length && ((n = bt[0]), n.blockedOn === null); )
        cc(n), n.blockedOn === null && bt.shift();
}
var Fn = Ot.ReactCurrentBatchConfig,
    ji = !0;
function Qf(e, t, n, r) {
    var i = Q,
        o = Fn.transition;
    Fn.transition = null;
    try {
        (Q = 1), el(e, t, n, r);
    } finally {
        (Q = i), (Fn.transition = o);
    }
}
function Gf(e, t, n, r) {
    var i = Q,
        o = Fn.transition;
    Fn.transition = null;
    try {
        (Q = 4), el(e, t, n, r);
    } finally {
        (Q = i), (Fn.transition = o);
    }
}
function el(e, t, n, r) {
    if (ji) {
        var i = ss(e, t, n, r);
        if (i === null) jo(e, t, r, Ri, n), da(e, r);
        else if (Wf(i, e, t, n, r)) r.stopPropagation();
        else if ((da(e, r), t & 4 && -1 < Hf.indexOf(e))) {
            for (; i !== null; ) {
                var o = Ur(i);
                if (
                    (o !== null && sc(o),
                    (o = ss(e, t, n, r)),
                    o === null && jo(e, t, r, Ri, n),
                    o === i)
                )
                    break;
                i = o;
            }
            i !== null && r.stopPropagation();
        } else jo(e, t, r, null, n);
    }
}
var Ri = null;
function ss(e, t, n, r) {
    if (((Ri = null), (e = Gs(r)), (e = rn(e)), e !== null))
        if (((t = yn(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = Xu(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return (Ri = e), null;
}
function dc(e) {
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
            switch (bf()) {
                case Ys:
                    return 1;
                case nc:
                    return 4;
                case Ai:
                case zf:
                    return 16;
                case rc:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var Bt = null,
    tl = null,
    di = null;
function fc() {
    if (di) return di;
    var e,
        t = tl,
        n = t.length,
        r,
        i = "value" in Bt ? Bt.value : Bt.textContent,
        o = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var s = n - e;
    for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
    return (di = i.slice(e, 1 < r ? 1 - r : void 0));
}
function fi(e) {
    var t = e.keyCode;
    return (
        "charCode" in e
            ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
            : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function Gr() {
    return !0;
}
function pa() {
    return !1;
}
function He(e) {
    function t(n, r, i, o, s) {
        (this._reactName = n),
            (this._targetInst = i),
            (this.type = r),
            (this.nativeEvent = o),
            (this.target = s),
            (this.currentTarget = null);
        for (var u in e)
            e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(o) : o[u]));
        return (
            (this.isDefaultPrevented = (
                o.defaultPrevented != null
                    ? o.defaultPrevented
                    : o.returnValue === !1
            )
                ? Gr
                : pa),
            (this.isPropagationStopped = pa),
            this
        );
    }
    return (
        se(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault
                        ? n.preventDefault()
                        : typeof n.returnValue != "unknown" &&
                          (n.returnValue = !1),
                    (this.isDefaultPrevented = Gr));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != "unknown" &&
                          (n.cancelBubble = !0),
                    (this.isPropagationStopped = Gr));
            },
            persist: function () {},
            isPersistent: Gr,
        }),
        t
    );
}
var Wn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
    },
    nl = He(Wn),
    Dr = se({}, Wn, { view: 0, detail: 0 }),
    Yf = He(Dr),
    wo,
    So,
    tr,
    Gi = se({}, Dr, {
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
        getModifierState: rl,
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
                : (e !== tr &&
                      (tr && e.type === "mousemove"
                          ? ((wo = e.screenX - tr.screenX),
                            (So = e.screenY - tr.screenY))
                          : (So = wo = 0),
                      (tr = e)),
                  wo);
        },
        movementY: function (e) {
            return "movementY" in e ? e.movementY : So;
        },
    }),
    ha = He(Gi),
    Xf = se({}, Gi, { dataTransfer: 0 }),
    Zf = He(Xf),
    ep = se({}, Dr, { relatedTarget: 0 }),
    xo = He(ep),
    tp = se({}, Wn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    np = He(tp),
    rp = se({}, Wn, {
        clipboardData: function (e) {
            return "clipboardData" in e
                ? e.clipboardData
                : window.clipboardData;
        },
    }),
    ip = He(rp),
    op = se({}, Wn, { data: 0 }),
    ma = He(op),
    sp = {
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
    lp = {
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
    ap = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
    };
function up(e) {
    var t = this.nativeEvent;
    return t.getModifierState
        ? t.getModifierState(e)
        : (e = ap[e])
        ? !!t[e]
        : !1;
}
function rl() {
    return up;
}
var cp = se({}, Dr, {
        key: function (e) {
            if (e.key) {
                var t = sp[e.key] || e.key;
                if (t !== "Unidentified") return t;
            }
            return e.type === "keypress"
                ? ((e = fi(e)), e === 13 ? "Enter" : String.fromCharCode(e))
                : e.type === "keydown" || e.type === "keyup"
                ? lp[e.keyCode] || "Unidentified"
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
        getModifierState: rl,
        charCode: function (e) {
            return e.type === "keypress" ? fi(e) : 0;
        },
        keyCode: function (e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
            return e.type === "keypress"
                ? fi(e)
                : e.type === "keydown" || e.type === "keyup"
                ? e.keyCode
                : 0;
        },
    }),
    dp = He(cp),
    fp = se({}, Gi, {
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
    ya = He(fp),
    pp = se({}, Dr, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: rl,
    }),
    hp = He(pp),
    mp = se({}, Wn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    yp = He(mp),
    gp = se({}, Gi, {
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
    vp = He(gp),
    wp = [9, 13, 27, 32],
    il = Rt && "CompositionEvent" in window,
    hr = null;
Rt && "documentMode" in document && (hr = document.documentMode);
var Sp = Rt && "TextEvent" in window && !hr,
    pc = Rt && (!il || (hr && 8 < hr && 11 >= hr)),
    ga = String.fromCharCode(32),
    va = !1;
function hc(e, t) {
    switch (e) {
        case "keyup":
            return wp.indexOf(t.keyCode) !== -1;
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
function mc(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var kn = !1;
function xp(e, t) {
    switch (e) {
        case "compositionend":
            return mc(t);
        case "keypress":
            return t.which !== 32 ? null : ((va = !0), ga);
        case "textInput":
            return (e = t.data), e === ga && va ? null : e;
        default:
            return null;
    }
}
function kp(e, t) {
    if (kn)
        return e === "compositionend" || (!il && hc(e, t))
            ? ((e = fc()), (di = tl = Bt = null), (kn = !1), e)
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
            return pc && t.locale !== "ko" ? null : t.data;
        default:
            return null;
    }
}
var Pp = {
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
function wa(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Pp[e.type] : t === "textarea";
}
function yc(e, t, n, r) {
    Wu(r),
        (t = Ti(t, "onChange")),
        0 < t.length &&
            ((n = new nl("onChange", "change", null, n, r)),
            e.push({ event: n, listeners: t }));
}
var mr = null,
    Nr = null;
function Cp(e) {
    Nc(e, 0);
}
function Yi(e) {
    var t = En(e);
    if (Du(t)) return e;
}
function Ep(e, t) {
    if (e === "change") return t;
}
var gc = !1;
if (Rt) {
    var ko;
    if (Rt) {
        var Po = "oninput" in document;
        if (!Po) {
            var Sa = document.createElement("div");
            Sa.setAttribute("oninput", "return;"),
                (Po = typeof Sa.oninput == "function");
        }
        ko = Po;
    } else ko = !1;
    gc = ko && (!document.documentMode || 9 < document.documentMode);
}
function xa() {
    mr && (mr.detachEvent("onpropertychange", vc), (Nr = mr = null));
}
function vc(e) {
    if (e.propertyName === "value" && Yi(Nr)) {
        var t = [];
        yc(t, Nr, e, Gs(e)), Yu(Cp, t);
    }
}
function Ap(e, t, n) {
    e === "focusin"
        ? (xa(), (mr = t), (Nr = n), mr.attachEvent("onpropertychange", vc))
        : e === "focusout" && xa();
}
function Np(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Yi(Nr);
}
function jp(e, t) {
    if (e === "click") return Yi(t);
}
function Rp(e, t) {
    if (e === "input" || e === "change") return Yi(t);
}
function Tp(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var ht = typeof Object.is == "function" ? Object.is : Tp;
function jr(e, t) {
    if (ht(e, t)) return !0;
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
        if (!qo.call(t, i) || !ht(e[i], t[i])) return !1;
    }
    return !0;
}
function ka(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
}
function Pa(e, t) {
    var n = ka(e);
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
        n = ka(n);
    }
}
function wc(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
            ? wc(e, t.parentNode)
            : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
            ? !!(e.compareDocumentPosition(t) & 16)
            : !1
        : !1;
}
function Sc() {
    for (var e = window, t = Pi(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string";
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = Pi(e.document);
    }
    return t;
}
function ol(e) {
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
function _p(e) {
    var t = Sc(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (
        t !== n &&
        n &&
        n.ownerDocument &&
        wc(n.ownerDocument.documentElement, n)
    ) {
        if (r !== null && ol(n)) {
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
                    (i = Pa(n, o));
                var s = Pa(n, r);
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
var Lp = Rt && "documentMode" in document && 11 >= document.documentMode,
    Pn = null,
    ls = null,
    yr = null,
    as = !1;
function Ca(e, t, n) {
    var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    as ||
        Pn == null ||
        Pn !== Pi(r) ||
        ((r = Pn),
        "selectionStart" in r && ol(r)
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
        (yr && jr(yr, r)) ||
            ((yr = r),
            (r = Ti(ls, "onSelect")),
            0 < r.length &&
                ((t = new nl("onSelect", "select", null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = Pn))));
}
function Yr(e, t) {
    var n = {};
    return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
    );
}
var Cn = {
        animationend: Yr("Animation", "AnimationEnd"),
        animationiteration: Yr("Animation", "AnimationIteration"),
        animationstart: Yr("Animation", "AnimationStart"),
        transitionend: Yr("Transition", "TransitionEnd"),
    },
    Co = {},
    xc = {};
Rt &&
    ((xc = document.createElement("div").style),
    "AnimationEvent" in window ||
        (delete Cn.animationend.animation,
        delete Cn.animationiteration.animation,
        delete Cn.animationstart.animation),
    "TransitionEvent" in window || delete Cn.transitionend.transition);
function Xi(e) {
    if (Co[e]) return Co[e];
    if (!Cn[e]) return e;
    var t = Cn[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in xc) return (Co[e] = t[n]);
    return e;
}
var kc = Xi("animationend"),
    Pc = Xi("animationiteration"),
    Cc = Xi("animationstart"),
    Ec = Xi("transitionend"),
    Ac = new Map(),
    Ea =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
            " "
        );
function Yt(e, t) {
    Ac.set(e, t), mn(t, [e]);
}
for (var Eo = 0; Eo < Ea.length; Eo++) {
    var Ao = Ea[Eo],
        Op = Ao.toLowerCase(),
        Ip = Ao[0].toUpperCase() + Ao.slice(1);
    Yt(Op, "on" + Ip);
}
Yt(kc, "onAnimationEnd");
Yt(Pc, "onAnimationIteration");
Yt(Cc, "onAnimationStart");
Yt("dblclick", "onDoubleClick");
Yt("focusin", "onFocus");
Yt("focusout", "onBlur");
Yt(Ec, "onTransitionEnd");
Bn("onMouseEnter", ["mouseout", "mouseover"]);
Bn("onMouseLeave", ["mouseout", "mouseover"]);
Bn("onPointerEnter", ["pointerout", "pointerover"]);
Bn("onPointerLeave", ["pointerout", "pointerover"]);
mn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
        " "
    )
);
mn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
    )
);
mn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
mn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
mn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
mn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var cr =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
            " "
        ),
    Fp = new Set(
        "cancel close invalid load scroll toggle".split(" ").concat(cr)
    );
function Aa(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), Of(r, t, void 0, e), (e.currentTarget = null);
}
function Nc(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            i = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var s = r.length - 1; 0 <= s; s--) {
                    var u = r[s],
                        a = u.instance,
                        p = u.currentTarget;
                    if (((u = u.listener), a !== o && i.isPropagationStopped()))
                        break e;
                    Aa(i, u, p), (o = a);
                }
            else
                for (s = 0; s < r.length; s++) {
                    if (
                        ((u = r[s]),
                        (a = u.instance),
                        (p = u.currentTarget),
                        (u = u.listener),
                        a !== o && i.isPropagationStopped())
                    )
                        break e;
                    Aa(i, u, p), (o = a);
                }
        }
    }
    if (Ei) throw ((e = rs), (Ei = !1), (rs = null), e);
}
function X(e, t) {
    var n = t[ps];
    n === void 0 && (n = t[ps] = new Set());
    var r = e + "__bubble";
    n.has(r) || (jc(t, e, 2, !1), n.add(r));
}
function No(e, t, n) {
    var r = 0;
    t && (r |= 4), jc(n, e, r, t);
}
var Xr = "_reactListening" + Math.random().toString(36).slice(2);
function Rr(e) {
    if (!e[Xr]) {
        (e[Xr] = !0),
            Fu.forEach(function (n) {
                n !== "selectionchange" &&
                    (Fp.has(n) || No(n, !1, e), No(n, !0, e));
            });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Xr] || ((t[Xr] = !0), No("selectionchange", !1, t));
    }
}
function jc(e, t, n, r) {
    switch (dc(t)) {
        case 1:
            var i = Qf;
            break;
        case 4:
            i = Gf;
            break;
        default:
            i = el;
    }
    (n = i.bind(null, t, n, e)),
        (i = void 0),
        !ns ||
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
function jo(e, t, n, r, i) {
    var o = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (;;) {
            if (r === null) return;
            var s = r.tag;
            if (s === 3 || s === 4) {
                var u = r.stateNode.containerInfo;
                if (u === i || (u.nodeType === 8 && u.parentNode === i)) break;
                if (s === 4)
                    for (s = r.return; s !== null; ) {
                        var a = s.tag;
                        if (
                            (a === 3 || a === 4) &&
                            ((a = s.stateNode.containerInfo),
                            a === i || (a.nodeType === 8 && a.parentNode === i))
                        )
                            return;
                        s = s.return;
                    }
                for (; u !== null; ) {
                    if (((s = rn(u)), s === null)) return;
                    if (((a = s.tag), a === 5 || a === 6)) {
                        r = o = s;
                        continue e;
                    }
                    u = u.parentNode;
                }
            }
            r = r.return;
        }
    Yu(function () {
        var p = o,
            g = Gs(n),
            m = [];
        e: {
            var y = Ac.get(e);
            if (y !== void 0) {
                var v = nl,
                    E = e;
                switch (e) {
                    case "keypress":
                        if (fi(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        v = dp;
                        break;
                    case "focusin":
                        (E = "focus"), (v = xo);
                        break;
                    case "focusout":
                        (E = "blur"), (v = xo);
                        break;
                    case "beforeblur":
                    case "afterblur":
                        v = xo;
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
                        v = ha;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        v = Zf;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        v = hp;
                        break;
                    case kc:
                    case Pc:
                    case Cc:
                        v = np;
                        break;
                    case Ec:
                        v = yp;
                        break;
                    case "scroll":
                        v = Yf;
                        break;
                    case "wheel":
                        v = vp;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        v = ip;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        v = ya;
                }
                var x = (t & 4) !== 0,
                    D = !x && e === "scroll",
                    d = x ? (y !== null ? y + "Capture" : null) : y;
                x = [];
                for (var f = p, h; f !== null; ) {
                    h = f;
                    var S = h.stateNode;
                    if (
                        (h.tag === 5 &&
                            S !== null &&
                            ((h = S),
                            d !== null &&
                                ((S = Pr(f, d)),
                                S != null && x.push(Tr(f, S, h)))),
                        D)
                    )
                        break;
                    f = f.return;
                }
                0 < x.length &&
                    ((y = new v(y, E, null, n, g)),
                    m.push({ event: y, listeners: x }));
            }
        }
        if (!(t & 7)) {
            e: {
                if (
                    ((y = e === "mouseover" || e === "pointerover"),
                    (v = e === "mouseout" || e === "pointerout"),
                    y &&
                        n !== es &&
                        (E = n.relatedTarget || n.fromElement) &&
                        (rn(E) || E[Tt]))
                )
                    break e;
                if (
                    (v || y) &&
                    ((y =
                        g.window === g
                            ? g
                            : (y = g.ownerDocument)
                            ? y.defaultView || y.parentWindow
                            : window),
                    v
                        ? ((E = n.relatedTarget || n.toElement),
                          (v = p),
                          (E = E ? rn(E) : null),
                          E !== null &&
                              ((D = yn(E)),
                              E !== D || (E.tag !== 5 && E.tag !== 6)) &&
                              (E = null))
                        : ((v = null), (E = p)),
                    v !== E)
                ) {
                    if (
                        ((x = ha),
                        (S = "onMouseLeave"),
                        (d = "onMouseEnter"),
                        (f = "mouse"),
                        (e === "pointerout" || e === "pointerover") &&
                            ((x = ya),
                            (S = "onPointerLeave"),
                            (d = "onPointerEnter"),
                            (f = "pointer")),
                        (D = v == null ? y : En(v)),
                        (h = E == null ? y : En(E)),
                        (y = new x(S, f + "leave", v, n, g)),
                        (y.target = D),
                        (y.relatedTarget = h),
                        (S = null),
                        rn(g) === p &&
                            ((x = new x(d, f + "enter", E, n, g)),
                            (x.target = h),
                            (x.relatedTarget = D),
                            (S = x)),
                        (D = S),
                        v && E)
                    )
                        t: {
                            for (x = v, d = E, f = 0, h = x; h; h = vn(h)) f++;
                            for (h = 0, S = d; S; S = vn(S)) h++;
                            for (; 0 < f - h; ) (x = vn(x)), f--;
                            for (; 0 < h - f; ) (d = vn(d)), h--;
                            for (; f--; ) {
                                if (
                                    x === d ||
                                    (d !== null && x === d.alternate)
                                )
                                    break t;
                                (x = vn(x)), (d = vn(d));
                            }
                            x = null;
                        }
                    else x = null;
                    v !== null && Na(m, y, v, x, !1),
                        E !== null && D !== null && Na(m, D, E, x, !0);
                }
            }
            e: {
                if (
                    ((y = p ? En(p) : window),
                    (v = y.nodeName && y.nodeName.toLowerCase()),
                    v === "select" || (v === "input" && y.type === "file"))
                )
                    var c = Ep;
                else if (wa(y))
                    if (gc) c = Rp;
                    else {
                        c = Np;
                        var R = Ap;
                    }
                else
                    (v = y.nodeName) &&
                        v.toLowerCase() === "input" &&
                        (y.type === "checkbox" || y.type === "radio") &&
                        (c = jp);
                if (c && (c = c(e, p))) {
                    yc(m, c, n, g);
                    break e;
                }
                R && R(e, y, p),
                    e === "focusout" &&
                        (R = y._wrapperState) &&
                        R.controlled &&
                        y.type === "number" &&
                        Qo(y, "number", y.value);
            }
            switch (((R = p ? En(p) : window), e)) {
                case "focusin":
                    (wa(R) || R.contentEditable === "true") &&
                        ((Pn = R), (ls = p), (yr = null));
                    break;
                case "focusout":
                    yr = ls = Pn = null;
                    break;
                case "mousedown":
                    as = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    (as = !1), Ca(m, n, g);
                    break;
                case "selectionchange":
                    if (Lp) break;
                case "keydown":
                case "keyup":
                    Ca(m, n, g);
            }
            var O;
            if (il)
                e: {
                    switch (e) {
                        case "compositionstart":
                            var w = "onCompositionStart";
                            break e;
                        case "compositionend":
                            w = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            w = "onCompositionUpdate";
                            break e;
                    }
                    w = void 0;
                }
            else
                kn
                    ? hc(e, n) && (w = "onCompositionEnd")
                    : e === "keydown" &&
                      n.keyCode === 229 &&
                      (w = "onCompositionStart");
            w &&
                (pc &&
                    n.locale !== "ko" &&
                    (kn || w !== "onCompositionStart"
                        ? w === "onCompositionEnd" && kn && (O = fc())
                        : ((Bt = g),
                          (tl = "value" in Bt ? Bt.value : Bt.textContent),
                          (kn = !0))),
                (R = Ti(p, w)),
                0 < R.length &&
                    ((w = new ma(w, e, null, n, g)),
                    m.push({ event: w, listeners: R }),
                    O
                        ? (w.data = O)
                        : ((O = mc(n)), O !== null && (w.data = O)))),
                (O = Sp ? xp(e, n) : kp(e, n)) &&
                    ((p = Ti(p, "onBeforeInput")),
                    0 < p.length &&
                        ((g = new ma(
                            "onBeforeInput",
                            "beforeinput",
                            null,
                            n,
                            g
                        )),
                        m.push({ event: g, listeners: p }),
                        (g.data = O)));
        }
        Nc(m, t);
    });
}
function Tr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function Ti(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var i = e,
            o = i.stateNode;
        i.tag === 5 &&
            o !== null &&
            ((i = o),
            (o = Pr(e, n)),
            o != null && r.unshift(Tr(e, o, i)),
            (o = Pr(e, t)),
            o != null && r.push(Tr(e, o, i))),
            (e = e.return);
    }
    return r;
}
function vn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function Na(e, t, n, r, i) {
    for (var o = t._reactName, s = []; n !== null && n !== r; ) {
        var u = n,
            a = u.alternate,
            p = u.stateNode;
        if (a !== null && a === r) break;
        u.tag === 5 &&
            p !== null &&
            ((u = p),
            i
                ? ((a = Pr(n, o)), a != null && s.unshift(Tr(n, a, u)))
                : i || ((a = Pr(n, o)), a != null && s.push(Tr(n, a, u)))),
            (n = n.return);
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
}
var Mp = /\r\n?/g,
    bp = /\u0000|\uFFFD/g;
function ja(e) {
    return (typeof e == "string" ? e : "" + e)
        .replace(
            Mp,
            `
`
        )
        .replace(bp, "");
}
function Zr(e, t, n) {
    if (((t = ja(t)), ja(e) !== t && n)) throw Error(C(425));
}
function _i() {}
var us = null,
    cs = null;
function ds(e, t) {
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
var fs = typeof setTimeout == "function" ? setTimeout : void 0,
    zp = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Ra = typeof Promise == "function" ? Promise : void 0,
    Bp =
        typeof queueMicrotask == "function"
            ? queueMicrotask
            : typeof Ra < "u"
            ? function (e) {
                  return Ra.resolve(null).then(e).catch(Dp);
              }
            : fs;
function Dp(e) {
    setTimeout(function () {
        throw e;
    });
}
function Ro(e, t) {
    var n = t,
        r = 0;
    do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8))
            if (((n = i.data), n === "/$")) {
                if (r === 0) {
                    e.removeChild(i), Ar(t);
                    return;
                }
                r--;
            } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
        n = i;
    } while (n);
    Ar(t);
}
function Jt(e) {
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
function Ta(e) {
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
var Kn = Math.random().toString(36).slice(2),
    wt = "__reactFiber$" + Kn,
    _r = "__reactProps$" + Kn,
    Tt = "__reactContainer$" + Kn,
    ps = "__reactEvents$" + Kn,
    Up = "__reactListeners$" + Kn,
    qp = "__reactHandles$" + Kn;
function rn(e) {
    var t = e[wt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
        if ((t = n[Tt] || n[wt])) {
            if (
                ((n = t.alternate),
                t.child !== null || (n !== null && n.child !== null))
            )
                for (e = Ta(e); e !== null; ) {
                    if ((n = e[wt])) return n;
                    e = Ta(e);
                }
            return t;
        }
        (e = n), (n = e.parentNode);
    }
    return null;
}
function Ur(e) {
    return (
        (e = e[wt] || e[Tt]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
            ? null
            : e
    );
}
function En(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(C(33));
}
function Zi(e) {
    return e[_r] || null;
}
var hs = [],
    An = -1;
function Xt(e) {
    return { current: e };
}
function Z(e) {
    0 > An || ((e.current = hs[An]), (hs[An] = null), An--);
}
function Y(e, t) {
    An++, (hs[An] = e.current), (e.current = t);
}
var Gt = {},
    Te = Xt(Gt),
    ze = Xt(!1),
    cn = Gt;
function Dn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Gt;
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
function Be(e) {
    return (e = e.childContextTypes), e != null;
}
function Li() {
    Z(ze), Z(Te);
}
function _a(e, t, n) {
    if (Te.current !== Gt) throw Error(C(168));
    Y(Te, t), Y(ze, n);
}
function Rc(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
        return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(C(108, Af(e) || "Unknown", i));
    return se({}, n, r);
}
function Oi(e) {
    return (
        (e =
            ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
            Gt),
        (cn = Te.current),
        Y(Te, e),
        Y(ze, ze.current),
        !0
    );
}
function La(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(C(169));
    n
        ? ((e = Rc(e, t, cn)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          Z(ze),
          Z(Te),
          Y(Te, e))
        : Z(ze),
        Y(ze, n);
}
var Et = null,
    eo = !1,
    To = !1;
function Tc(e) {
    Et === null ? (Et = [e]) : Et.push(e);
}
function Vp(e) {
    (eo = !0), Tc(e);
}
function Zt() {
    if (!To && Et !== null) {
        To = !0;
        var e = 0,
            t = Q;
        try {
            var n = Et;
            for (Q = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null);
            }
            (Et = null), (eo = !1);
        } catch (i) {
            throw (Et !== null && (Et = Et.slice(e + 1)), tc(Ys, Zt), i);
        } finally {
            (Q = t), (To = !1);
        }
    }
    return null;
}
var Nn = [],
    jn = 0,
    Ii = null,
    Fi = 0,
    Ge = [],
    Ye = 0,
    dn = null,
    At = 1,
    Nt = "";
function tn(e, t) {
    (Nn[jn++] = Fi), (Nn[jn++] = Ii), (Ii = e), (Fi = t);
}
function _c(e, t, n) {
    (Ge[Ye++] = At), (Ge[Ye++] = Nt), (Ge[Ye++] = dn), (dn = e);
    var r = At;
    e = Nt;
    var i = 32 - ft(r) - 1;
    (r &= ~(1 << i)), (n += 1);
    var o = 32 - ft(t) + i;
    if (30 < o) {
        var s = i - (i % 5);
        (o = (r & ((1 << s) - 1)).toString(32)),
            (r >>= s),
            (i -= s),
            (At = (1 << (32 - ft(t) + i)) | (n << i) | r),
            (Nt = o + e);
    } else (At = (1 << o) | (n << i) | r), (Nt = e);
}
function sl(e) {
    e.return !== null && (tn(e, 1), _c(e, 1, 0));
}
function ll(e) {
    for (; e === Ii; )
        (Ii = Nn[--jn]), (Nn[jn] = null), (Fi = Nn[--jn]), (Nn[jn] = null);
    for (; e === dn; )
        (dn = Ge[--Ye]),
            (Ge[Ye] = null),
            (Nt = Ge[--Ye]),
            (Ge[Ye] = null),
            (At = Ge[--Ye]),
            (Ge[Ye] = null);
}
var Ve = null,
    qe = null,
    ee = !1,
    dt = null;
function Lc(e, t) {
    var n = Ze(5, null, null, 0);
    (n.elementType = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Oa(e, t) {
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
                    ? ((e.stateNode = t), (Ve = e), (qe = Jt(t.firstChild)), !0)
                    : !1
            );
        case 6:
            return (
                (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (Ve = e), (qe = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = dn !== null ? { id: At, overflow: Nt } : null),
                      (e.memoizedState = {
                          dehydrated: t,
                          treeContext: n,
                          retryLane: 1073741824,
                      }),
                      (n = Ze(18, null, null, 0)),
                      (n.stateNode = t),
                      (n.return = e),
                      (e.child = n),
                      (Ve = e),
                      (qe = null),
                      !0)
                    : !1
            );
        default:
            return !1;
    }
}
function ms(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ys(e) {
    if (ee) {
        var t = qe;
        if (t) {
            var n = t;
            if (!Oa(e, t)) {
                if (ms(e)) throw Error(C(418));
                t = Jt(n.nextSibling);
                var r = Ve;
                t && Oa(e, t)
                    ? Lc(r, n)
                    : ((e.flags = (e.flags & -4097) | 2), (ee = !1), (Ve = e));
            }
        } else {
            if (ms(e)) throw Error(C(418));
            (e.flags = (e.flags & -4097) | 2), (ee = !1), (Ve = e);
        }
    }
}
function Ia(e) {
    for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
        e = e.return;
    Ve = e;
}
function ei(e) {
    if (e !== Ve) return !1;
    if (!ee) return Ia(e), (ee = !0), !1;
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type),
            (t = t !== "head" && t !== "body" && !ds(e.type, e.memoizedProps))),
        t && (t = qe))
    ) {
        if (ms(e)) throw (Oc(), Error(C(418)));
        for (; t; ) Lc(e, t), (t = Jt(t.nextSibling));
    }
    if ((Ia(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
            throw Error(C(317));
        e: {
            for (e = e.nextSibling, t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            qe = Jt(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
                }
                e = e.nextSibling;
            }
            qe = null;
        }
    } else qe = Ve ? Jt(e.stateNode.nextSibling) : null;
    return !0;
}
function Oc() {
    for (var e = qe; e; ) e = Jt(e.nextSibling);
}
function Un() {
    (qe = Ve = null), (ee = !1);
}
function al(e) {
    dt === null ? (dt = [e]) : dt.push(e);
}
var Jp = Ot.ReactCurrentBatchConfig;
function at(e, t) {
    if (e && e.defaultProps) {
        (t = se({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
var Mi = Xt(null),
    bi = null,
    Rn = null,
    ul = null;
function cl() {
    ul = Rn = bi = null;
}
function dl(e) {
    var t = Mi.current;
    Z(Mi), (e._currentValue = t);
}
function gs(e, t, n) {
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
function Mn(e, t) {
    (bi = e),
        (ul = Rn = null),
        (e = e.dependencies),
        e !== null &&
            e.firstContext !== null &&
            (e.lanes & t && (be = !0), (e.firstContext = null));
}
function tt(e) {
    var t = e._currentValue;
    if (ul !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), Rn === null)) {
            if (bi === null) throw Error(C(308));
            (Rn = e), (bi.dependencies = { lanes: 0, firstContext: e });
        } else Rn = Rn.next = e;
    return t;
}
var on = null;
function fl(e) {
    on === null ? (on = [e]) : on.push(e);
}
function Ic(e, t, n, r) {
    var i = t.interleaved;
    return (
        i === null ? ((n.next = n), fl(t)) : ((n.next = i.next), (i.next = n)),
        (t.interleaved = n),
        _t(e, r)
    );
}
function _t(e, t) {
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
var Mt = !1;
function pl(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
    };
}
function Fc(e, t) {
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
function jt(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
    };
}
function $t(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), W & 2)) {
        var i = r.pending;
        return (
            i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
            (r.pending = t),
            _t(e, n)
        );
    }
    return (
        (i = r.interleaved),
        i === null ? ((t.next = t), fl(r)) : ((t.next = i.next), (i.next = t)),
        (r.interleaved = t),
        _t(e, n)
    );
}
function pi(e, t, n) {
    if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Xs(e, n);
    }
}
function Fa(e, t) {
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
function zi(e, t, n, r) {
    var i = e.updateQueue;
    Mt = !1;
    var o = i.firstBaseUpdate,
        s = i.lastBaseUpdate,
        u = i.shared.pending;
    if (u !== null) {
        i.shared.pending = null;
        var a = u,
            p = a.next;
        (a.next = null), s === null ? (o = p) : (s.next = p), (s = a);
        var g = e.alternate;
        g !== null &&
            ((g = g.updateQueue),
            (u = g.lastBaseUpdate),
            u !== s &&
                (u === null ? (g.firstBaseUpdate = p) : (u.next = p),
                (g.lastBaseUpdate = a)));
    }
    if (o !== null) {
        var m = i.baseState;
        (s = 0), (g = p = a = null), (u = o);
        do {
            var y = u.lane,
                v = u.eventTime;
            if ((r & y) === y) {
                g !== null &&
                    (g = g.next =
                        {
                            eventTime: v,
                            lane: 0,
                            tag: u.tag,
                            payload: u.payload,
                            callback: u.callback,
                            next: null,
                        });
                e: {
                    var E = e,
                        x = u;
                    switch (((y = t), (v = n), x.tag)) {
                        case 1:
                            if (((E = x.payload), typeof E == "function")) {
                                m = E.call(v, m, y);
                                break e;
                            }
                            m = E;
                            break e;
                        case 3:
                            E.flags = (E.flags & -65537) | 128;
                        case 0:
                            if (
                                ((E = x.payload),
                                (y =
                                    typeof E == "function"
                                        ? E.call(v, m, y)
                                        : E),
                                y == null)
                            )
                                break e;
                            m = se({}, m, y);
                            break e;
                        case 2:
                            Mt = !0;
                    }
                }
                u.callback !== null &&
                    u.lane !== 0 &&
                    ((e.flags |= 64),
                    (y = i.effects),
                    y === null ? (i.effects = [u]) : y.push(u));
            } else
                (v = {
                    eventTime: v,
                    lane: y,
                    tag: u.tag,
                    payload: u.payload,
                    callback: u.callback,
                    next: null,
                }),
                    g === null ? ((p = g = v), (a = m)) : (g = g.next = v),
                    (s |= y);
            if (((u = u.next), u === null)) {
                if (((u = i.shared.pending), u === null)) break;
                (y = u),
                    (u = y.next),
                    (y.next = null),
                    (i.lastBaseUpdate = y),
                    (i.shared.pending = null);
            }
        } while (1);
        if (
            (g === null && (a = m),
            (i.baseState = a),
            (i.firstBaseUpdate = p),
            (i.lastBaseUpdate = g),
            (t = i.shared.interleaved),
            t !== null)
        ) {
            i = t;
            do (s |= i.lane), (i = i.next);
            while (i !== t);
        } else o === null && (i.shared.lanes = 0);
        (pn |= s), (e.lanes = s), (e.memoizedState = m);
    }
}
function Ma(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                i = r.callback;
            if (i !== null) {
                if (((r.callback = null), (r = n), typeof i != "function"))
                    throw Error(C(191, i));
                i.call(r);
            }
        }
}
var Mc = new Iu.Component().refs;
function vs(e, t, n, r) {
    (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : se({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
}
var to = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? yn(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = Oe(),
            i = Wt(e),
            o = jt(r, i);
        (o.payload = t),
            n != null && (o.callback = n),
            (t = $t(e, o, i)),
            t !== null && (pt(t, e, i, r), pi(t, e, i));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = Oe(),
            i = Wt(e),
            o = jt(r, i);
        (o.tag = 1),
            (o.payload = t),
            n != null && (o.callback = n),
            (t = $t(e, o, i)),
            t !== null && (pt(t, e, i, r), pi(t, e, i));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = Oe(),
            r = Wt(e),
            i = jt(n, r);
        (i.tag = 2),
            t != null && (i.callback = t),
            (t = $t(e, i, r)),
            t !== null && (pt(t, e, r, n), pi(t, e, r));
    },
};
function ba(e, t, n, r, i, o, s) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
            ? e.shouldComponentUpdate(r, o, s)
            : t.prototype && t.prototype.isPureReactComponent
            ? !jr(n, r) || !jr(i, o)
            : !0
    );
}
function bc(e, t, n) {
    var r = !1,
        i = Gt,
        o = t.contextType;
    return (
        typeof o == "object" && o !== null
            ? (o = tt(o))
            : ((i = Be(t) ? cn : Te.current),
              (r = t.contextTypes),
              (o = (r = r != null) ? Dn(e, i) : Gt)),
        (t = new t(n, o)),
        (e.memoizedState =
            t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = to),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = i),
            (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
    );
}
function za(e, t, n, r) {
    (e = t.state),
        typeof t.componentWillReceiveProps == "function" &&
            t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
            t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && to.enqueueReplaceState(t, t.state, null);
}
function ws(e, t, n, r) {
    var i = e.stateNode;
    (i.props = n), (i.state = e.memoizedState), (i.refs = Mc), pl(e);
    var o = t.contextType;
    typeof o == "object" && o !== null
        ? (i.context = tt(o))
        : ((o = Be(t) ? cn : Te.current), (i.context = Dn(e, o))),
        (i.state = e.memoizedState),
        (o = t.getDerivedStateFromProps),
        typeof o == "function" && (vs(e, t, o, n), (i.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
            typeof i.getSnapshotBeforeUpdate == "function" ||
            (typeof i.UNSAFE_componentWillMount != "function" &&
                typeof i.componentWillMount != "function") ||
            ((t = i.state),
            typeof i.componentWillMount == "function" && i.componentWillMount(),
            typeof i.UNSAFE_componentWillMount == "function" &&
                i.UNSAFE_componentWillMount(),
            t !== i.state && to.enqueueReplaceState(i, i.state, null),
            zi(e, n, i, r),
            (i.state = e.memoizedState)),
        typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function nr(e, t, n) {
    if (
        ((e = n.ref),
        e !== null && typeof e != "function" && typeof e != "object")
    ) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(C(309));
                var r = n.stateNode;
            }
            if (!r) throw Error(C(147, e));
            var i = r,
                o = "" + e;
            return t !== null &&
                t.ref !== null &&
                typeof t.ref == "function" &&
                t.ref._stringRef === o
                ? t.ref
                : ((t = function (s) {
                      var u = i.refs;
                      u === Mc && (u = i.refs = {}),
                          s === null ? delete u[o] : (u[o] = s);
                  }),
                  (t._stringRef = o),
                  t);
        }
        if (typeof e != "string") throw Error(C(284));
        if (!n._owner) throw Error(C(290, e));
    }
    return e;
}
function ti(e, t) {
    throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
            C(
                31,
                e === "[object Object]"
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : e
            )
        ))
    );
}
function Ba(e) {
    var t = e._init;
    return t(e._payload);
}
function zc(e) {
    function t(d, f) {
        if (e) {
            var h = d.deletions;
            h === null ? ((d.deletions = [f]), (d.flags |= 16)) : h.push(f);
        }
    }
    function n(d, f) {
        if (!e) return null;
        for (; f !== null; ) t(d, f), (f = f.sibling);
        return null;
    }
    function r(d, f) {
        for (d = new Map(); f !== null; )
            f.key !== null ? d.set(f.key, f) : d.set(f.index, f),
                (f = f.sibling);
        return d;
    }
    function i(d, f) {
        return (d = Kt(d, f)), (d.index = 0), (d.sibling = null), d;
    }
    function o(d, f, h) {
        return (
            (d.index = h),
            e
                ? ((h = d.alternate),
                  h !== null
                      ? ((h = h.index), h < f ? ((d.flags |= 2), f) : h)
                      : ((d.flags |= 2), f))
                : ((d.flags |= 1048576), f)
        );
    }
    function s(d) {
        return e && d.alternate === null && (d.flags |= 2), d;
    }
    function u(d, f, h, S) {
        return f === null || f.tag !== 6
            ? ((f = bo(h, d.mode, S)), (f.return = d), f)
            : ((f = i(f, h)), (f.return = d), f);
    }
    function a(d, f, h, S) {
        var c = h.type;
        return c === xn
            ? g(d, f, h.props.children, S, h.key)
            : f !== null &&
              (f.elementType === c ||
                  (typeof c == "object" &&
                      c !== null &&
                      c.$$typeof === Ft &&
                      Ba(c) === f.type))
            ? ((S = i(f, h.props)), (S.ref = nr(d, f, h)), (S.return = d), S)
            : ((S = wi(h.type, h.key, h.props, null, d.mode, S)),
              (S.ref = nr(d, f, h)),
              (S.return = d),
              S);
    }
    function p(d, f, h, S) {
        return f === null ||
            f.tag !== 4 ||
            f.stateNode.containerInfo !== h.containerInfo ||
            f.stateNode.implementation !== h.implementation
            ? ((f = zo(h, d.mode, S)), (f.return = d), f)
            : ((f = i(f, h.children || [])), (f.return = d), f);
    }
    function g(d, f, h, S, c) {
        return f === null || f.tag !== 7
            ? ((f = an(h, d.mode, S, c)), (f.return = d), f)
            : ((f = i(f, h)), (f.return = d), f);
    }
    function m(d, f, h) {
        if ((typeof f == "string" && f !== "") || typeof f == "number")
            return (f = bo("" + f, d.mode, h)), (f.return = d), f;
        if (typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
                case Jr:
                    return (
                        (h = wi(f.type, f.key, f.props, null, d.mode, h)),
                        (h.ref = nr(d, null, f)),
                        (h.return = d),
                        h
                    );
                case Sn:
                    return (f = zo(f, d.mode, h)), (f.return = d), f;
                case Ft:
                    var S = f._init;
                    return m(d, S(f._payload), h);
            }
            if (ar(f) || Yn(f))
                return (f = an(f, d.mode, h, null)), (f.return = d), f;
            ti(d, f);
        }
        return null;
    }
    function y(d, f, h, S) {
        var c = f !== null ? f.key : null;
        if ((typeof h == "string" && h !== "") || typeof h == "number")
            return c !== null ? null : u(d, f, "" + h, S);
        if (typeof h == "object" && h !== null) {
            switch (h.$$typeof) {
                case Jr:
                    return h.key === c ? a(d, f, h, S) : null;
                case Sn:
                    return h.key === c ? p(d, f, h, S) : null;
                case Ft:
                    return (c = h._init), y(d, f, c(h._payload), S);
            }
            if (ar(h) || Yn(h)) return c !== null ? null : g(d, f, h, S, null);
            ti(d, h);
        }
        return null;
    }
    function v(d, f, h, S, c) {
        if ((typeof S == "string" && S !== "") || typeof S == "number")
            return (d = d.get(h) || null), u(f, d, "" + S, c);
        if (typeof S == "object" && S !== null) {
            switch (S.$$typeof) {
                case Jr:
                    return (
                        (d = d.get(S.key === null ? h : S.key) || null),
                        a(f, d, S, c)
                    );
                case Sn:
                    return (
                        (d = d.get(S.key === null ? h : S.key) || null),
                        p(f, d, S, c)
                    );
                case Ft:
                    var R = S._init;
                    return v(d, f, h, R(S._payload), c);
            }
            if (ar(S) || Yn(S))
                return (d = d.get(h) || null), g(f, d, S, c, null);
            ti(f, S);
        }
        return null;
    }
    function E(d, f, h, S) {
        for (
            var c = null, R = null, O = f, w = (f = 0), I = null;
            O !== null && w < h.length;
            w++
        ) {
            O.index > w ? ((I = O), (O = null)) : (I = O.sibling);
            var k = y(d, O, h[w], S);
            if (k === null) {
                O === null && (O = I);
                break;
            }
            e && O && k.alternate === null && t(d, O),
                (f = o(k, f, w)),
                R === null ? (c = k) : (R.sibling = k),
                (R = k),
                (O = I);
        }
        if (w === h.length) return n(d, O), ee && tn(d, w), c;
        if (O === null) {
            for (; w < h.length; w++)
                (O = m(d, h[w], S)),
                    O !== null &&
                        ((f = o(O, f, w)),
                        R === null ? (c = O) : (R.sibling = O),
                        (R = O));
            return ee && tn(d, w), c;
        }
        for (O = r(d, O); w < h.length; w++)
            (I = v(O, d, w, h[w], S)),
                I !== null &&
                    (e &&
                        I.alternate !== null &&
                        O.delete(I.key === null ? w : I.key),
                    (f = o(I, f, w)),
                    R === null ? (c = I) : (R.sibling = I),
                    (R = I));
        return (
            e &&
                O.forEach(function ($) {
                    return t(d, $);
                }),
            ee && tn(d, w),
            c
        );
    }
    function x(d, f, h, S) {
        var c = Yn(h);
        if (typeof c != "function") throw Error(C(150));
        if (((h = c.call(h)), h == null)) throw Error(C(151));
        for (
            var R = (c = null), O = f, w = (f = 0), I = null, k = h.next();
            O !== null && !k.done;
            w++, k = h.next()
        ) {
            O.index > w ? ((I = O), (O = null)) : (I = O.sibling);
            var $ = y(d, O, k.value, S);
            if ($ === null) {
                O === null && (O = I);
                break;
            }
            e && O && $.alternate === null && t(d, O),
                (f = o($, f, w)),
                R === null ? (c = $) : (R.sibling = $),
                (R = $),
                (O = I);
        }
        if (k.done) return n(d, O), ee && tn(d, w), c;
        if (O === null) {
            for (; !k.done; w++, k = h.next())
                (k = m(d, k.value, S)),
                    k !== null &&
                        ((f = o(k, f, w)),
                        R === null ? (c = k) : (R.sibling = k),
                        (R = k));
            return ee && tn(d, w), c;
        }
        for (O = r(d, O); !k.done; w++, k = h.next())
            (k = v(O, d, w, k.value, S)),
                k !== null &&
                    (e &&
                        k.alternate !== null &&
                        O.delete(k.key === null ? w : k.key),
                    (f = o(k, f, w)),
                    R === null ? (c = k) : (R.sibling = k),
                    (R = k));
        return (
            e &&
                O.forEach(function (le) {
                    return t(d, le);
                }),
            ee && tn(d, w),
            c
        );
    }
    function D(d, f, h, S) {
        if (
            (typeof h == "object" &&
                h !== null &&
                h.type === xn &&
                h.key === null &&
                (h = h.props.children),
            typeof h == "object" && h !== null)
        ) {
            switch (h.$$typeof) {
                case Jr:
                    e: {
                        for (var c = h.key, R = f; R !== null; ) {
                            if (R.key === c) {
                                if (((c = h.type), c === xn)) {
                                    if (R.tag === 7) {
                                        n(d, R.sibling),
                                            (f = i(R, h.props.children)),
                                            (f.return = d),
                                            (d = f);
                                        break e;
                                    }
                                } else if (
                                    R.elementType === c ||
                                    (typeof c == "object" &&
                                        c !== null &&
                                        c.$$typeof === Ft &&
                                        Ba(c) === R.type)
                                ) {
                                    n(d, R.sibling),
                                        (f = i(R, h.props)),
                                        (f.ref = nr(d, R, h)),
                                        (f.return = d),
                                        (d = f);
                                    break e;
                                }
                                n(d, R);
                                break;
                            } else t(d, R);
                            R = R.sibling;
                        }
                        h.type === xn
                            ? ((f = an(h.props.children, d.mode, S, h.key)),
                              (f.return = d),
                              (d = f))
                            : ((S = wi(
                                  h.type,
                                  h.key,
                                  h.props,
                                  null,
                                  d.mode,
                                  S
                              )),
                              (S.ref = nr(d, f, h)),
                              (S.return = d),
                              (d = S));
                    }
                    return s(d);
                case Sn:
                    e: {
                        for (R = h.key; f !== null; ) {
                            if (f.key === R)
                                if (
                                    f.tag === 4 &&
                                    f.stateNode.containerInfo ===
                                        h.containerInfo &&
                                    f.stateNode.implementation ===
                                        h.implementation
                                ) {
                                    n(d, f.sibling),
                                        (f = i(f, h.children || [])),
                                        (f.return = d),
                                        (d = f);
                                    break e;
                                } else {
                                    n(d, f);
                                    break;
                                }
                            else t(d, f);
                            f = f.sibling;
                        }
                        (f = zo(h, d.mode, S)), (f.return = d), (d = f);
                    }
                    return s(d);
                case Ft:
                    return (R = h._init), D(d, f, R(h._payload), S);
            }
            if (ar(h)) return E(d, f, h, S);
            if (Yn(h)) return x(d, f, h, S);
            ti(d, h);
        }
        return (typeof h == "string" && h !== "") || typeof h == "number"
            ? ((h = "" + h),
              f !== null && f.tag === 6
                  ? (n(d, f.sibling), (f = i(f, h)), (f.return = d), (d = f))
                  : (n(d, f), (f = bo(h, d.mode, S)), (f.return = d), (d = f)),
              s(d))
            : n(d, f);
    }
    return D;
}
var qn = zc(!0),
    Bc = zc(!1),
    qr = {},
    xt = Xt(qr),
    Lr = Xt(qr),
    Or = Xt(qr);
function sn(e) {
    if (e === qr) throw Error(C(174));
    return e;
}
function hl(e, t) {
    switch ((Y(Or, t), Y(Lr, e), Y(xt, qr), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Yo(null, "");
            break;
        default:
            (e = e === 8 ? t.parentNode : t),
                (t = e.namespaceURI || null),
                (e = e.tagName),
                (t = Yo(t, e));
    }
    Z(xt), Y(xt, t);
}
function Vn() {
    Z(xt), Z(Lr), Z(Or);
}
function Dc(e) {
    sn(Or.current);
    var t = sn(xt.current),
        n = Yo(t, e.type);
    t !== n && (Y(Lr, e), Y(xt, n));
}
function ml(e) {
    Lr.current === e && (Z(xt), Z(Lr));
}
var ie = Xt(0);
function Bi(e) {
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
var _o = [];
function yl() {
    for (var e = 0; e < _o.length; e++)
        _o[e]._workInProgressVersionPrimary = null;
    _o.length = 0;
}
var hi = Ot.ReactCurrentDispatcher,
    Lo = Ot.ReactCurrentBatchConfig,
    fn = 0,
    oe = null,
    ve = null,
    Se = null,
    Di = !1,
    gr = !1,
    Ir = 0,
    $p = 0;
function Ne() {
    throw Error(C(321));
}
function gl(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!ht(e[n], t[n])) return !1;
    return !0;
}
function vl(e, t, n, r, i, o) {
    if (
        ((fn = o),
        (oe = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (hi.current = e === null || e.memoizedState === null ? Qp : Gp),
        (e = n(r, i)),
        gr)
    ) {
        o = 0;
        do {
            if (((gr = !1), (Ir = 0), 25 <= o)) throw Error(C(301));
            (o += 1),
                (Se = ve = null),
                (t.updateQueue = null),
                (hi.current = Yp),
                (e = n(r, i));
        } while (gr);
    }
    if (
        ((hi.current = Ui),
        (t = ve !== null && ve.next !== null),
        (fn = 0),
        (Se = ve = oe = null),
        (Di = !1),
        t)
    )
        throw Error(C(300));
    return e;
}
function wl() {
    var e = Ir !== 0;
    return (Ir = 0), e;
}
function vt() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
    };
    return Se === null ? (oe.memoizedState = Se = e) : (Se = Se.next = e), Se;
}
function nt() {
    if (ve === null) {
        var e = oe.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = ve.next;
    var t = Se === null ? oe.memoizedState : Se.next;
    if (t !== null) (Se = t), (ve = e);
    else {
        if (e === null) throw Error(C(310));
        (ve = e),
            (e = {
                memoizedState: ve.memoizedState,
                baseState: ve.baseState,
                baseQueue: ve.baseQueue,
                queue: ve.queue,
                next: null,
            }),
            Se === null ? (oe.memoizedState = Se = e) : (Se = Se.next = e);
    }
    return Se;
}
function Fr(e, t) {
    return typeof t == "function" ? t(e) : t;
}
function Oo(e) {
    var t = nt(),
        n = t.queue;
    if (n === null) throw Error(C(311));
    n.lastRenderedReducer = e;
    var r = ve,
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
        var u = (s = null),
            a = null,
            p = o;
        do {
            var g = p.lane;
            if ((fn & g) === g)
                a !== null &&
                    (a = a.next =
                        {
                            lane: 0,
                            action: p.action,
                            hasEagerState: p.hasEagerState,
                            eagerState: p.eagerState,
                            next: null,
                        }),
                    (r = p.hasEagerState ? p.eagerState : e(r, p.action));
            else {
                var m = {
                    lane: g,
                    action: p.action,
                    hasEagerState: p.hasEagerState,
                    eagerState: p.eagerState,
                    next: null,
                };
                a === null ? ((u = a = m), (s = r)) : (a = a.next = m),
                    (oe.lanes |= g),
                    (pn |= g);
            }
            p = p.next;
        } while (p !== null && p !== o);
        a === null ? (s = r) : (a.next = u),
            ht(r, t.memoizedState) || (be = !0),
            (t.memoizedState = r),
            (t.baseState = s),
            (t.baseQueue = a),
            (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
        i = e;
        do (o = i.lane), (oe.lanes |= o), (pn |= o), (i = i.next);
        while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function Io(e) {
    var t = nt(),
        n = t.queue;
    if (n === null) throw Error(C(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        i = n.pending,
        o = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var s = (i = i.next);
        do (o = e(o, s.action)), (s = s.next);
        while (s !== i);
        ht(o, t.memoizedState) || (be = !0),
            (t.memoizedState = o),
            t.baseQueue === null && (t.baseState = o),
            (n.lastRenderedState = o);
    }
    return [o, r];
}
function Uc() {}
function qc(e, t) {
    var n = oe,
        r = nt(),
        i = t(),
        o = !ht(r.memoizedState, i);
    if (
        (o && ((r.memoizedState = i), (be = !0)),
        (r = r.queue),
        Sl($c.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || o || (Se !== null && Se.memoizedState.tag & 1))
    ) {
        if (
            ((n.flags |= 2048),
            Mr(9, Jc.bind(null, n, r, i, t), void 0, null),
            xe === null)
        )
            throw Error(C(349));
        fn & 30 || Vc(n, t, i);
    }
    return i;
}
function Vc(e, t, n) {
    (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = oe.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (oe.updateQueue = t),
              (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Jc(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), Hc(t) && Wc(e);
}
function $c(e, t, n) {
    return n(function () {
        Hc(t) && Wc(e);
    });
}
function Hc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !ht(e, n);
    } catch {
        return !0;
    }
}
function Wc(e) {
    var t = _t(e, 1);
    t !== null && pt(t, e, 1, -1);
}
function Da(e) {
    var t = vt();
    return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Fr,
            lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = Kp.bind(null, oe, e)),
        [t.memoizedState, e]
    );
}
function Mr(e, t, n, r) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = oe.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (oe.updateQueue = t),
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
function Kc() {
    return nt().memoizedState;
}
function mi(e, t, n, r) {
    var i = vt();
    (oe.flags |= e),
        (i.memoizedState = Mr(1 | t, n, void 0, r === void 0 ? null : r));
}
function no(e, t, n, r) {
    var i = nt();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (ve !== null) {
        var s = ve.memoizedState;
        if (((o = s.destroy), r !== null && gl(r, s.deps))) {
            i.memoizedState = Mr(t, n, o, r);
            return;
        }
    }
    (oe.flags |= e), (i.memoizedState = Mr(1 | t, n, o, r));
}
function Ua(e, t) {
    return mi(8390656, 8, e, t);
}
function Sl(e, t) {
    return no(2048, 8, e, t);
}
function Qc(e, t) {
    return no(4, 2, e, t);
}
function Gc(e, t) {
    return no(4, 4, e, t);
}
function Yc(e, t) {
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
function Xc(e, t, n) {
    return (
        (n = n != null ? n.concat([e]) : null), no(4, 4, Yc.bind(null, t, e), n)
    );
}
function xl() {}
function Zc(e, t) {
    var n = nt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && gl(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
}
function ed(e, t) {
    var n = nt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && gl(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
}
function td(e, t, n) {
    return fn & 21
        ? (ht(n, t) ||
              ((n = ic()), (oe.lanes |= n), (pn |= n), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (be = !0)),
          (e.memoizedState = n));
}
function Hp(e, t) {
    var n = Q;
    (Q = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = Lo.transition;
    Lo.transition = {};
    try {
        e(!1), t();
    } finally {
        (Q = n), (Lo.transition = r);
    }
}
function nd() {
    return nt().memoizedState;
}
function Wp(e, t, n) {
    var r = Wt(e);
    if (
        ((n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        }),
        rd(e))
    )
        id(t, n);
    else if (((n = Ic(e, t, n, r)), n !== null)) {
        var i = Oe();
        pt(n, e, r, i), od(n, t, r);
    }
}
function Kp(e, t, n) {
    var r = Wt(e),
        i = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        };
    if (rd(e)) id(t, i);
    else {
        var o = e.alternate;
        if (
            e.lanes === 0 &&
            (o === null || o.lanes === 0) &&
            ((o = t.lastRenderedReducer), o !== null)
        )
            try {
                var s = t.lastRenderedState,
                    u = o(s, n);
                if (((i.hasEagerState = !0), (i.eagerState = u), ht(u, s))) {
                    var a = t.interleaved;
                    a === null
                        ? ((i.next = i), fl(t))
                        : ((i.next = a.next), (a.next = i)),
                        (t.interleaved = i);
                    return;
                }
            } catch {
            } finally {
            }
        (n = Ic(e, t, i, r)),
            n !== null && ((i = Oe()), pt(n, e, r, i), od(n, t, r));
    }
}
function rd(e) {
    var t = e.alternate;
    return e === oe || (t !== null && t === oe);
}
function id(e, t) {
    gr = Di = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
}
function od(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Xs(e, n);
    }
}
var Ui = {
        readContext: tt,
        useCallback: Ne,
        useContext: Ne,
        useEffect: Ne,
        useImperativeHandle: Ne,
        useInsertionEffect: Ne,
        useLayoutEffect: Ne,
        useMemo: Ne,
        useReducer: Ne,
        useRef: Ne,
        useState: Ne,
        useDebugValue: Ne,
        useDeferredValue: Ne,
        useTransition: Ne,
        useMutableSource: Ne,
        useSyncExternalStore: Ne,
        useId: Ne,
        unstable_isNewReconciler: !1,
    },
    Qp = {
        readContext: tt,
        useCallback: function (e, t) {
            return (vt().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: tt,
        useEffect: Ua,
        useImperativeHandle: function (e, t, n) {
            return (
                (n = n != null ? n.concat([e]) : null),
                mi(4194308, 4, Yc.bind(null, t, e), n)
            );
        },
        useLayoutEffect: function (e, t) {
            return mi(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return mi(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = vt();
            return (
                (t = t === void 0 ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
            );
        },
        useReducer: function (e, t, n) {
            var r = vt();
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
                (e = e.dispatch = Wp.bind(null, oe, e)),
                [r.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = vt();
            return (e = { current: e }), (t.memoizedState = e);
        },
        useState: Da,
        useDebugValue: xl,
        useDeferredValue: function (e) {
            return (vt().memoizedState = e);
        },
        useTransition: function () {
            var e = Da(!1),
                t = e[0];
            return (e = Hp.bind(null, e[1])), (vt().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
            var r = oe,
                i = vt();
            if (ee) {
                if (n === void 0) throw Error(C(407));
                n = n();
            } else {
                if (((n = t()), xe === null)) throw Error(C(349));
                fn & 30 || Vc(r, t, n);
            }
            i.memoizedState = n;
            var o = { value: n, getSnapshot: t };
            return (
                (i.queue = o),
                Ua($c.bind(null, r, o, e), [e]),
                (r.flags |= 2048),
                Mr(9, Jc.bind(null, r, o, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = vt(),
                t = xe.identifierPrefix;
            if (ee) {
                var n = Nt,
                    r = At;
                (n = (r & ~(1 << (32 - ft(r) - 1))).toString(32) + n),
                    (t = ":" + t + "R" + n),
                    (n = Ir++),
                    0 < n && (t += "H" + n.toString(32)),
                    (t += ":");
            } else (n = $p++), (t = ":" + t + "r" + n.toString(32) + ":");
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
    },
    Gp = {
        readContext: tt,
        useCallback: Zc,
        useContext: tt,
        useEffect: Sl,
        useImperativeHandle: Xc,
        useInsertionEffect: Qc,
        useLayoutEffect: Gc,
        useMemo: ed,
        useReducer: Oo,
        useRef: Kc,
        useState: function () {
            return Oo(Fr);
        },
        useDebugValue: xl,
        useDeferredValue: function (e) {
            var t = nt();
            return td(t, ve.memoizedState, e);
        },
        useTransition: function () {
            var e = Oo(Fr)[0],
                t = nt().memoizedState;
            return [e, t];
        },
        useMutableSource: Uc,
        useSyncExternalStore: qc,
        useId: nd,
        unstable_isNewReconciler: !1,
    },
    Yp = {
        readContext: tt,
        useCallback: Zc,
        useContext: tt,
        useEffect: Sl,
        useImperativeHandle: Xc,
        useInsertionEffect: Qc,
        useLayoutEffect: Gc,
        useMemo: ed,
        useReducer: Io,
        useRef: Kc,
        useState: function () {
            return Io(Fr);
        },
        useDebugValue: xl,
        useDeferredValue: function (e) {
            var t = nt();
            return ve === null
                ? (t.memoizedState = e)
                : td(t, ve.memoizedState, e);
        },
        useTransition: function () {
            var e = Io(Fr)[0],
                t = nt().memoizedState;
            return [e, t];
        },
        useMutableSource: Uc,
        useSyncExternalStore: qc,
        useId: nd,
        unstable_isNewReconciler: !1,
    };
function Jn(e, t) {
    try {
        var n = "",
            r = t;
        do (n += Ef(r)), (r = r.return);
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
function Fo(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Ss(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var Xp = typeof WeakMap == "function" ? WeakMap : Map;
function sd(e, t, n) {
    (n = jt(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
        (n.callback = function () {
            Vi || ((Vi = !0), (Ts = r)), Ss(e, t);
        }),
        n
    );
}
function ld(e, t, n) {
    (n = jt(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var i = t.value;
        (n.payload = function () {
            return r(i);
        }),
            (n.callback = function () {
                Ss(e, t);
            });
    }
    var o = e.stateNode;
    return (
        o !== null &&
            typeof o.componentDidCatch == "function" &&
            (n.callback = function () {
                Ss(e, t),
                    typeof r != "function" &&
                        (Ht === null ? (Ht = new Set([this])) : Ht.add(this));
                var s = t.stack;
                this.componentDidCatch(t.value, {
                    componentStack: s !== null ? s : "",
                });
            }),
        n
    );
}
function qa(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new Xp();
        var i = new Set();
        r.set(t, i);
    } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
    i.has(n) || (i.add(n), (e = fh.bind(null, e, t, n)), t.then(e, e));
}
function Va(e) {
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
function Ja(e, t, n, r, i) {
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
                        : ((t = jt(-1, 1)), (t.tag = 2), $t(n, t, 1))),
                (n.lanes |= 1)),
          e);
}
var Zp = Ot.ReactCurrentOwner,
    be = !1;
function Le(e, t, n, r) {
    t.child = e === null ? Bc(t, null, n, r) : qn(t, e.child, n, r);
}
function $a(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return (
        Mn(t, i),
        (r = vl(e, t, n, r, o, i)),
        (n = wl()),
        e !== null && !be
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              Lt(e, t, i))
            : (ee && n && sl(t), (t.flags |= 1), Le(e, t, r, i), t.child)
    );
}
function Ha(e, t, n, r, i) {
    if (e === null) {
        var o = n.type;
        return typeof o == "function" &&
            !Rl(o) &&
            o.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = o), ad(e, t, o, r, i))
            : ((e = wi(n.type, null, r, t, t.mode, i)),
              (e.ref = t.ref),
              (e.return = t),
              (t.child = e));
    }
    if (((o = e.child), !(e.lanes & i))) {
        var s = o.memoizedProps;
        if (
            ((n = n.compare),
            (n = n !== null ? n : jr),
            n(s, r) && e.ref === t.ref)
        )
            return Lt(e, t, i);
    }
    return (
        (t.flags |= 1),
        (e = Kt(o, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
    );
}
function ad(e, t, n, r, i) {
    if (e !== null) {
        var o = e.memoizedProps;
        if (jr(o, r) && e.ref === t.ref)
            if (((be = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
                e.flags & 131072 && (be = !0);
            else return (t.lanes = e.lanes), Lt(e, t, i);
    }
    return xs(e, t, n, r, i);
}
function ud(e, t, n) {
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
                Y(_n, Ue),
                (Ue |= n);
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
                    Y(_n, Ue),
                    (Ue |= e),
                    null
                );
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
            }),
                (r = o !== null ? o.baseLanes : n),
                Y(_n, Ue),
                (Ue |= r);
        }
    else
        o !== null
            ? ((r = o.baseLanes | n), (t.memoizedState = null))
            : (r = n),
            Y(_n, Ue),
            (Ue |= r);
    return Le(e, t, i, n), t.child;
}
function cd(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
}
function xs(e, t, n, r, i) {
    var o = Be(n) ? cn : Te.current;
    return (
        (o = Dn(t, o)),
        Mn(t, i),
        (n = vl(e, t, n, r, o, i)),
        (r = wl()),
        e !== null && !be
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              Lt(e, t, i))
            : (ee && r && sl(t), (t.flags |= 1), Le(e, t, n, i), t.child)
    );
}
function Wa(e, t, n, r, i) {
    if (Be(n)) {
        var o = !0;
        Oi(t);
    } else o = !1;
    if ((Mn(t, i), t.stateNode === null))
        yi(e, t), bc(t, n, r), ws(t, n, r, i), (r = !0);
    else if (e === null) {
        var s = t.stateNode,
            u = t.memoizedProps;
        s.props = u;
        var a = s.context,
            p = n.contextType;
        typeof p == "object" && p !== null
            ? (p = tt(p))
            : ((p = Be(n) ? cn : Te.current), (p = Dn(t, p)));
        var g = n.getDerivedStateFromProps,
            m =
                typeof g == "function" ||
                typeof s.getSnapshotBeforeUpdate == "function";
        m ||
            (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
                typeof s.componentWillReceiveProps != "function") ||
            ((u !== r || a !== p) && za(t, s, r, p)),
            (Mt = !1);
        var y = t.memoizedState;
        (s.state = y),
            zi(t, r, s, i),
            (a = t.memoizedState),
            u !== r || y !== a || ze.current || Mt
                ? (typeof g == "function" &&
                      (vs(t, n, g, r), (a = t.memoizedState)),
                  (u = Mt || ba(t, n, u, r, y, a, p))
                      ? (m ||
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
                        (t.memoizedState = a)),
                  (s.props = r),
                  (s.state = a),
                  (s.context = p),
                  (r = u))
                : (typeof s.componentDidMount == "function" &&
                      (t.flags |= 4194308),
                  (r = !1));
    } else {
        (s = t.stateNode),
            Fc(e, t),
            (u = t.memoizedProps),
            (p = t.type === t.elementType ? u : at(t.type, u)),
            (s.props = p),
            (m = t.pendingProps),
            (y = s.context),
            (a = n.contextType),
            typeof a == "object" && a !== null
                ? (a = tt(a))
                : ((a = Be(n) ? cn : Te.current), (a = Dn(t, a)));
        var v = n.getDerivedStateFromProps;
        (g =
            typeof v == "function" ||
            typeof s.getSnapshotBeforeUpdate == "function") ||
            (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
                typeof s.componentWillReceiveProps != "function") ||
            ((u !== m || y !== a) && za(t, s, r, a)),
            (Mt = !1),
            (y = t.memoizedState),
            (s.state = y),
            zi(t, r, s, i);
        var E = t.memoizedState;
        u !== m || y !== E || ze.current || Mt
            ? (typeof v == "function" &&
                  (vs(t, n, v, r), (E = t.memoizedState)),
              (p = Mt || ba(t, n, p, r, y, E, a) || !1)
                  ? (g ||
                        (typeof s.UNSAFE_componentWillUpdate != "function" &&
                            typeof s.componentWillUpdate != "function") ||
                        (typeof s.componentWillUpdate == "function" &&
                            s.componentWillUpdate(r, E, a),
                        typeof s.UNSAFE_componentWillUpdate == "function" &&
                            s.UNSAFE_componentWillUpdate(r, E, a)),
                    typeof s.componentDidUpdate == "function" && (t.flags |= 4),
                    typeof s.getSnapshotBeforeUpdate == "function" &&
                        (t.flags |= 1024))
                  : (typeof s.componentDidUpdate != "function" ||
                        (u === e.memoizedProps && y === e.memoizedState) ||
                        (t.flags |= 4),
                    typeof s.getSnapshotBeforeUpdate != "function" ||
                        (u === e.memoizedProps && y === e.memoizedState) ||
                        (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = E)),
              (s.props = r),
              (s.state = E),
              (s.context = a),
              (r = p))
            : (typeof s.componentDidUpdate != "function" ||
                  (u === e.memoizedProps && y === e.memoizedState) ||
                  (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != "function" ||
                  (u === e.memoizedProps && y === e.memoizedState) ||
                  (t.flags |= 1024),
              (r = !1));
    }
    return ks(e, t, n, r, o, i);
}
function ks(e, t, n, r, i, o) {
    cd(e, t);
    var s = (t.flags & 128) !== 0;
    if (!r && !s) return i && La(t, n, !1), Lt(e, t, o);
    (r = t.stateNode), (Zp.current = t);
    var u =
        s && typeof n.getDerivedStateFromError != "function"
            ? null
            : r.render();
    return (
        (t.flags |= 1),
        e !== null && s
            ? ((t.child = qn(t, e.child, null, o)),
              (t.child = qn(t, null, u, o)))
            : Le(e, t, u, o),
        (t.memoizedState = r.state),
        i && La(t, n, !0),
        t.child
    );
}
function dd(e) {
    var t = e.stateNode;
    t.pendingContext
        ? _a(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && _a(e, t.context, !1),
        hl(e, t.containerInfo);
}
function Ka(e, t, n, r, i) {
    return Un(), al(i), (t.flags |= 256), Le(e, t, n, r), t.child;
}
var Ps = { dehydrated: null, treeContext: null, retryLane: 0 };
function Cs(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function fd(e, t, n) {
    var r = t.pendingProps,
        i = ie.current,
        o = !1,
        s = (t.flags & 128) !== 0,
        u;
    if (
        ((u = s) ||
            (u = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
        u
            ? ((o = !0), (t.flags &= -129))
            : (e === null || e.memoizedState !== null) && (i |= 1),
        Y(ie, i & 1),
        e === null)
    )
        return (
            ys(t),
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
                            : (o = oo(s, r, 0, null)),
                        (e = an(e, r, n, null)),
                        (o.return = t),
                        (e.return = t),
                        (o.sibling = e),
                        (t.child = o),
                        (t.child.memoizedState = Cs(n)),
                        (t.memoizedState = Ps),
                        e)
                      : kl(t, s))
        );
    if (((i = e.memoizedState), i !== null && ((u = i.dehydrated), u !== null)))
        return eh(e, t, s, r, u, i, n);
    if (o) {
        (o = r.fallback), (s = t.mode), (i = e.child), (u = i.sibling);
        var a = { mode: "hidden", children: r.children };
        return (
            !(s & 1) && t.child !== i
                ? ((r = t.child),
                  (r.childLanes = 0),
                  (r.pendingProps = a),
                  (t.deletions = null))
                : ((r = Kt(i, a)),
                  (r.subtreeFlags = i.subtreeFlags & 14680064)),
            u !== null
                ? (o = Kt(u, o))
                : ((o = an(o, s, n, null)), (o.flags |= 2)),
            (o.return = t),
            (r.return = t),
            (r.sibling = o),
            (t.child = r),
            (r = o),
            (o = t.child),
            (s = e.child.memoizedState),
            (s =
                s === null
                    ? Cs(n)
                    : {
                          baseLanes: s.baseLanes | n,
                          cachePool: null,
                          transitions: s.transitions,
                      }),
            (o.memoizedState = s),
            (o.childLanes = e.childLanes & ~n),
            (t.memoizedState = Ps),
            r
        );
    }
    return (
        (o = e.child),
        (e = o.sibling),
        (r = Kt(o, { mode: "visible", children: r.children })),
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
function kl(e, t) {
    return (
        (t = oo({ mode: "visible", children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
    );
}
function ni(e, t, n, r) {
    return (
        r !== null && al(r),
        qn(t, e.child, null, n),
        (e = kl(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function eh(e, t, n, r, i, o, s) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (r = Fo(Error(C(422)))), ni(e, t, s, r))
            : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((o = r.fallback),
              (i = t.mode),
              (r = oo({ mode: "visible", children: r.children }, i, 0, null)),
              (o = an(o, i, s, null)),
              (o.flags |= 2),
              (r.return = t),
              (o.return = t),
              (r.sibling = o),
              (t.child = r),
              t.mode & 1 && qn(t, e.child, null, s),
              (t.child.memoizedState = Cs(s)),
              (t.memoizedState = Ps),
              o);
    if (!(t.mode & 1)) return ni(e, t, s, null);
    if (i.data === "$!") {
        if (((r = i.nextSibling && i.nextSibling.dataset), r)) var u = r.dgst;
        return (
            (r = u), (o = Error(C(419))), (r = Fo(o, r, void 0)), ni(e, t, s, r)
        );
    }
    if (((u = (s & e.childLanes) !== 0), be || u)) {
        if (((r = xe), r !== null)) {
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
                    ((o.retryLane = i), _t(e, i), pt(r, e, i, -1));
        }
        return jl(), (r = Fo(Error(C(421)))), ni(e, t, s, r);
    }
    return i.data === "$?"
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = ph.bind(null, e)),
          (i._reactRetry = t),
          null)
        : ((e = o.treeContext),
          (qe = Jt(i.nextSibling)),
          (Ve = t),
          (ee = !0),
          (dt = null),
          e !== null &&
              ((Ge[Ye++] = At),
              (Ge[Ye++] = Nt),
              (Ge[Ye++] = dn),
              (At = e.id),
              (Nt = e.overflow),
              (dn = t)),
          (t = kl(t, r.children)),
          (t.flags |= 4096),
          t);
}
function Qa(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), gs(e.return, t, n);
}
function Mo(e, t, n, r, i) {
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
function pd(e, t, n) {
    var r = t.pendingProps,
        i = r.revealOrder,
        o = r.tail;
    if ((Le(e, t, r.children, n), (r = ie.current), r & 2))
        (r = (r & 1) | 2), (t.flags |= 128);
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13) e.memoizedState !== null && Qa(e, n, t);
                else if (e.tag === 19) Qa(e, n, t);
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
    if ((Y(ie, r), !(t.mode & 1))) t.memoizedState = null;
    else
        switch (i) {
            case "forwards":
                for (n = t.child, i = null; n !== null; )
                    (e = n.alternate),
                        e !== null && Bi(e) === null && (i = n),
                        (n = n.sibling);
                (n = i),
                    n === null
                        ? ((i = t.child), (t.child = null))
                        : ((i = n.sibling), (n.sibling = null)),
                    Mo(t, !1, i, n, o);
                break;
            case "backwards":
                for (n = null, i = t.child, t.child = null; i !== null; ) {
                    if (((e = i.alternate), e !== null && Bi(e) === null)) {
                        t.child = i;
                        break;
                    }
                    (e = i.sibling), (i.sibling = n), (n = i), (i = e);
                }
                Mo(t, !0, n, null, o);
                break;
            case "together":
                Mo(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function yi(e, t) {
    !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Lt(e, t, n) {
    if (
        (e !== null && (t.dependencies = e.dependencies),
        (pn |= t.lanes),
        !(n & t.childLanes))
    )
        return null;
    if (e !== null && t.child !== e.child) throw Error(C(153));
    if (t.child !== null) {
        for (
            e = t.child, n = Kt(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;

        )
            (e = e.sibling),
                (n = n.sibling = Kt(e, e.pendingProps)),
                (n.return = t);
        n.sibling = null;
    }
    return t.child;
}
function th(e, t, n) {
    switch (t.tag) {
        case 3:
            dd(t), Un();
            break;
        case 5:
            Dc(t);
            break;
        case 1:
            Be(t.type) && Oi(t);
            break;
        case 4:
            hl(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                i = t.memoizedProps.value;
            Y(Mi, r._currentValue), (r._currentValue = i);
            break;
        case 13:
            if (((r = t.memoizedState), r !== null))
                return r.dehydrated !== null
                    ? (Y(ie, ie.current & 1), (t.flags |= 128), null)
                    : n & t.child.childLanes
                    ? fd(e, t, n)
                    : (Y(ie, ie.current & 1),
                      (e = Lt(e, t, n)),
                      e !== null ? e.sibling : null);
            Y(ie, ie.current & 1);
            break;
        case 19:
            if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
                if (r) return pd(e, t, n);
                t.flags |= 128;
            }
            if (
                ((i = t.memoizedState),
                i !== null &&
                    ((i.rendering = null),
                    (i.tail = null),
                    (i.lastEffect = null)),
                Y(ie, ie.current),
                r)
            )
                break;
            return null;
        case 22:
        case 23:
            return (t.lanes = 0), ud(e, t, n);
    }
    return Lt(e, t, n);
}
var hd, Es, md, yd;
hd = function (e, t) {
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
Es = function () {};
md = function (e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        (e = t.stateNode), sn(xt.current);
        var o = null;
        switch (n) {
            case "input":
                (i = Wo(e, i)), (r = Wo(e, r)), (o = []);
                break;
            case "select":
                (i = se({}, i, { value: void 0 })),
                    (r = se({}, r, { value: void 0 })),
                    (o = []);
                break;
            case "textarea":
                (i = Go(e, i)), (r = Go(e, r)), (o = []);
                break;
            default:
                typeof i.onClick != "function" &&
                    typeof r.onClick == "function" &&
                    (e.onclick = _i);
        }
        Xo(n, r);
        var s;
        n = null;
        for (p in i)
            if (!r.hasOwnProperty(p) && i.hasOwnProperty(p) && i[p] != null)
                if (p === "style") {
                    var u = i[p];
                    for (s in u)
                        u.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
                } else
                    p !== "dangerouslySetInnerHTML" &&
                        p !== "children" &&
                        p !== "suppressContentEditableWarning" &&
                        p !== "suppressHydrationWarning" &&
                        p !== "autoFocus" &&
                        (xr.hasOwnProperty(p)
                            ? o || (o = [])
                            : (o = o || []).push(p, null));
        for (p in r) {
            var a = r[p];
            if (
                ((u = i != null ? i[p] : void 0),
                r.hasOwnProperty(p) && a !== u && (a != null || u != null))
            )
                if (p === "style")
                    if (u) {
                        for (s in u)
                            !u.hasOwnProperty(s) ||
                                (a && a.hasOwnProperty(s)) ||
                                (n || (n = {}), (n[s] = ""));
                        for (s in a)
                            a.hasOwnProperty(s) &&
                                u[s] !== a[s] &&
                                (n || (n = {}), (n[s] = a[s]));
                    } else n || (o || (o = []), o.push(p, n)), (n = a);
                else
                    p === "dangerouslySetInnerHTML"
                        ? ((a = a ? a.__html : void 0),
                          (u = u ? u.__html : void 0),
                          a != null && u !== a && (o = o || []).push(p, a))
                        : p === "children"
                        ? (typeof a != "string" && typeof a != "number") ||
                          (o = o || []).push(p, "" + a)
                        : p !== "suppressContentEditableWarning" &&
                          p !== "suppressHydrationWarning" &&
                          (xr.hasOwnProperty(p)
                              ? (a != null &&
                                    p === "onScroll" &&
                                    X("scroll", e),
                                o || u === a || (o = []))
                              : (o = o || []).push(p, a));
        }
        n && (o = o || []).push("style", n);
        var p = o;
        (t.updateQueue = p) && (t.flags |= 4);
    }
};
yd = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
};
function rr(e, t) {
    if (!ee)
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
function je(e) {
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
function nh(e, t, n) {
    var r = t.pendingProps;
    switch ((ll(t), t.tag)) {
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
            return je(t), null;
        case 1:
            return Be(t.type) && Li(), je(t), null;
        case 3:
            return (
                (r = t.stateNode),
                Vn(),
                Z(ze),
                Z(Te),
                yl(),
                r.pendingContext &&
                    ((r.context = r.pendingContext), (r.pendingContext = null)),
                (e === null || e.child === null) &&
                    (ei(t)
                        ? (t.flags |= 4)
                        : e === null ||
                          (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                          ((t.flags |= 1024),
                          dt !== null && (Os(dt), (dt = null)))),
                Es(e, t),
                je(t),
                null
            );
        case 5:
            ml(t);
            var i = sn(Or.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                md(e, t, n, r, i),
                    e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(C(166));
                    return je(t), null;
                }
                if (((e = sn(xt.current)), ei(t))) {
                    (r = t.stateNode), (n = t.type);
                    var o = t.memoizedProps;
                    switch (
                        ((r[wt] = t), (r[_r] = o), (e = (t.mode & 1) !== 0), n)
                    ) {
                        case "dialog":
                            X("cancel", r), X("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            X("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (i = 0; i < cr.length; i++) X(cr[i], r);
                            break;
                        case "source":
                            X("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            X("error", r), X("load", r);
                            break;
                        case "details":
                            X("toggle", r);
                            break;
                        case "input":
                            ia(r, o), X("invalid", r);
                            break;
                        case "select":
                            (r._wrapperState = { wasMultiple: !!o.multiple }),
                                X("invalid", r);
                            break;
                        case "textarea":
                            sa(r, o), X("invalid", r);
                    }
                    Xo(n, o), (i = null);
                    for (var s in o)
                        if (o.hasOwnProperty(s)) {
                            var u = o[s];
                            s === "children"
                                ? typeof u == "string"
                                    ? r.textContent !== u &&
                                      (o.suppressHydrationWarning !== !0 &&
                                          Zr(r.textContent, u, e),
                                      (i = ["children", u]))
                                    : typeof u == "number" &&
                                      r.textContent !== "" + u &&
                                      (o.suppressHydrationWarning !== !0 &&
                                          Zr(r.textContent, u, e),
                                      (i = ["children", "" + u]))
                                : xr.hasOwnProperty(s) &&
                                  u != null &&
                                  s === "onScroll" &&
                                  X("scroll", r);
                        }
                    switch (n) {
                        case "input":
                            $r(r), oa(r, o, !0);
                            break;
                        case "textarea":
                            $r(r), la(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof o.onClick == "function" && (r.onclick = _i);
                    }
                    (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
                } else {
                    (s = i.nodeType === 9 ? i : i.ownerDocument),
                        e === "http://www.w3.org/1999/xhtml" && (e = Vu(n)),
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
                        (e[wt] = t),
                        (e[_r] = r),
                        hd(e, t, !1, !1),
                        (t.stateNode = e);
                    e: {
                        switch (((s = Zo(n, r)), n)) {
                            case "dialog":
                                X("cancel", e), X("close", e), (i = r);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                X("load", e), (i = r);
                                break;
                            case "video":
                            case "audio":
                                for (i = 0; i < cr.length; i++) X(cr[i], e);
                                i = r;
                                break;
                            case "source":
                                X("error", e), (i = r);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                X("error", e), X("load", e), (i = r);
                                break;
                            case "details":
                                X("toggle", e), (i = r);
                                break;
                            case "input":
                                ia(e, r), (i = Wo(e, r)), X("invalid", e);
                                break;
                            case "option":
                                i = r;
                                break;
                            case "select":
                                (e._wrapperState = {
                                    wasMultiple: !!r.multiple,
                                }),
                                    (i = se({}, r, { value: void 0 })),
                                    X("invalid", e);
                                break;
                            case "textarea":
                                sa(e, r), (i = Go(e, r)), X("invalid", e);
                                break;
                            default:
                                i = r;
                        }
                        Xo(n, i), (u = i);
                        for (o in u)
                            if (u.hasOwnProperty(o)) {
                                var a = u[o];
                                o === "style"
                                    ? Hu(e, a)
                                    : o === "dangerouslySetInnerHTML"
                                    ? ((a = a ? a.__html : void 0),
                                      a != null && Ju(e, a))
                                    : o === "children"
                                    ? typeof a == "string"
                                        ? (n !== "textarea" || a !== "") &&
                                          kr(e, a)
                                        : typeof a == "number" && kr(e, "" + a)
                                    : o !== "suppressContentEditableWarning" &&
                                      o !== "suppressHydrationWarning" &&
                                      o !== "autoFocus" &&
                                      (xr.hasOwnProperty(o)
                                          ? a != null &&
                                            o === "onScroll" &&
                                            X("scroll", e)
                                          : a != null && Hs(e, o, a, s));
                            }
                        switch (n) {
                            case "input":
                                $r(e), oa(e, r, !1);
                                break;
                            case "textarea":
                                $r(e), la(e);
                                break;
                            case "option":
                                r.value != null &&
                                    e.setAttribute("value", "" + Qt(r.value));
                                break;
                            case "select":
                                (e.multiple = !!r.multiple),
                                    (o = r.value),
                                    o != null
                                        ? Ln(e, !!r.multiple, o, !1)
                                        : r.defaultValue != null &&
                                          Ln(
                                              e,
                                              !!r.multiple,
                                              r.defaultValue,
                                              !0
                                          );
                                break;
                            default:
                                typeof i.onClick == "function" &&
                                    (e.onclick = _i);
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
            return je(t), null;
        case 6:
            if (e && t.stateNode != null) yd(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null)
                    throw Error(C(166));
                if (((n = sn(Or.current)), sn(xt.current), ei(t))) {
                    if (
                        ((r = t.stateNode),
                        (n = t.memoizedProps),
                        (r[wt] = t),
                        (o = r.nodeValue !== n) && ((e = Ve), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                Zr(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !==
                                    !0 &&
                                    Zr(r.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    o && (t.flags |= 4);
                } else
                    (r = (
                        n.nodeType === 9 ? n : n.ownerDocument
                    ).createTextNode(r)),
                        (r[wt] = t),
                        (t.stateNode = r);
            }
            return je(t), null;
        case 13:
            if (
                (Z(ie),
                (r = t.memoizedState),
                e === null ||
                    (e.memoizedState !== null &&
                        e.memoizedState.dehydrated !== null))
            ) {
                if (ee && qe !== null && t.mode & 1 && !(t.flags & 128))
                    Oc(), Un(), (t.flags |= 98560), (o = !1);
                else if (((o = ei(t)), r !== null && r.dehydrated !== null)) {
                    if (e === null) {
                        if (!o) throw Error(C(318));
                        if (
                            ((o = t.memoizedState),
                            (o = o !== null ? o.dehydrated : null),
                            !o)
                        )
                            throw Error(C(317));
                        o[wt] = t;
                    } else
                        Un(),
                            !(t.flags & 128) && (t.memoizedState = null),
                            (t.flags |= 4);
                    je(t), (o = !1);
                } else dt !== null && (Os(dt), (dt = null)), (o = !0);
                if (!o) return t.flags & 65536 ? t : null;
            }
            return t.flags & 128
                ? ((t.lanes = n), t)
                : ((r = r !== null),
                  r !== (e !== null && e.memoizedState !== null) &&
                      r &&
                      ((t.child.flags |= 8192),
                      t.mode & 1 &&
                          (e === null || ie.current & 1
                              ? we === 0 && (we = 3)
                              : jl())),
                  t.updateQueue !== null && (t.flags |= 4),
                  je(t),
                  null);
        case 4:
            return (
                Vn(),
                Es(e, t),
                e === null && Rr(t.stateNode.containerInfo),
                je(t),
                null
            );
        case 10:
            return dl(t.type._context), je(t), null;
        case 17:
            return Be(t.type) && Li(), je(t), null;
        case 19:
            if ((Z(ie), (o = t.memoizedState), o === null)) return je(t), null;
            if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
                if (r) rr(o, !1);
                else {
                    if (we !== 0 || (e !== null && e.flags & 128))
                        for (e = t.child; e !== null; ) {
                            if (((s = Bi(e)), s !== null)) {
                                for (
                                    t.flags |= 128,
                                        rr(o, !1),
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
                                return Y(ie, (ie.current & 1) | 2), t.child;
                            }
                            e = e.sibling;
                        }
                    o.tail !== null &&
                        ce() > $n &&
                        ((t.flags |= 128),
                        (r = !0),
                        rr(o, !1),
                        (t.lanes = 4194304));
                }
            else {
                if (!r)
                    if (((e = Bi(s)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                            (r = !0),
                            (n = e.updateQueue),
                            n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                            rr(o, !0),
                            o.tail === null &&
                                o.tailMode === "hidden" &&
                                !s.alternate &&
                                !ee)
                        )
                            return je(t), null;
                    } else
                        2 * ce() - o.renderingStartTime > $n &&
                            n !== 1073741824 &&
                            ((t.flags |= 128),
                            (r = !0),
                            rr(o, !1),
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
                  (o.renderingStartTime = ce()),
                  (t.sibling = null),
                  (n = ie.current),
                  Y(ie, r ? (n & 1) | 2 : n & 1),
                  t)
                : (je(t), null);
        case 22:
        case 23:
            return (
                Nl(),
                (r = t.memoizedState !== null),
                e !== null &&
                    (e.memoizedState !== null) !== r &&
                    (t.flags |= 8192),
                r && t.mode & 1
                    ? Ue & 1073741824 &&
                      (je(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                    : je(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(C(156, t.tag));
}
function rh(e, t) {
    switch ((ll(t), t.tag)) {
        case 1:
            return (
                Be(t.type) && Li(),
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 3:
            return (
                Vn(),
                Z(ze),
                Z(Te),
                yl(),
                (e = t.flags),
                e & 65536 && !(e & 128)
                    ? ((t.flags = (e & -65537) | 128), t)
                    : null
            );
        case 5:
            return ml(t), null;
        case 13:
            if (
                (Z(ie),
                (e = t.memoizedState),
                e !== null && e.dehydrated !== null)
            ) {
                if (t.alternate === null) throw Error(C(340));
                Un();
            }
            return (
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 19:
            return Z(ie), null;
        case 4:
            return Vn(), null;
        case 10:
            return dl(t.type._context), null;
        case 22:
        case 23:
            return Nl(), null;
        case 24:
            return null;
        default:
            return null;
    }
}
var ri = !1,
    Re = !1,
    ih = typeof WeakSet == "function" ? WeakSet : Set,
    F = null;
function Tn(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null);
            } catch (r) {
                ue(e, t, r);
            }
        else n.current = null;
}
function As(e, t, n) {
    try {
        n();
    } catch (r) {
        ue(e, t, r);
    }
}
var Ga = !1;
function oh(e, t) {
    if (((us = ji), (e = Sc()), ol(e))) {
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
                        u = -1,
                        a = -1,
                        p = 0,
                        g = 0,
                        m = e,
                        y = null;
                    t: for (;;) {
                        for (
                            var v;
                            m !== n ||
                                (i !== 0 && m.nodeType !== 3) ||
                                (u = s + i),
                                m !== o ||
                                    (r !== 0 && m.nodeType !== 3) ||
                                    (a = s + r),
                                m.nodeType === 3 && (s += m.nodeValue.length),
                                (v = m.firstChild) !== null;

                        )
                            (y = m), (m = v);
                        for (;;) {
                            if (m === e) break t;
                            if (
                                (y === n && ++p === i && (u = s),
                                y === o && ++g === r && (a = s),
                                (v = m.nextSibling) !== null)
                            )
                                break;
                            (m = y), (y = m.parentNode);
                        }
                        m = v;
                    }
                    n = u === -1 || a === -1 ? null : { start: u, end: a };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (
        cs = { focusedElem: e, selectionRange: n }, ji = !1, F = t;
        F !== null;

    )
        if (
            ((t = F),
            (e = t.child),
            (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
            (e.return = t), (F = e);
        else
            for (; F !== null; ) {
                t = F;
                try {
                    var E = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (E !== null) {
                                    var x = E.memoizedProps,
                                        D = E.memoizedState,
                                        d = t.stateNode,
                                        f = d.getSnapshotBeforeUpdate(
                                            t.elementType === t.type
                                                ? x
                                                : at(t.type, x),
                                            D
                                        );
                                    d.__reactInternalSnapshotBeforeUpdate = f;
                                }
                                break;
                            case 3:
                                var h = t.stateNode.containerInfo;
                                h.nodeType === 1
                                    ? (h.textContent = "")
                                    : h.nodeType === 9 &&
                                      h.documentElement &&
                                      h.removeChild(h.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(C(163));
                        }
                } catch (S) {
                    ue(t, t.return, S);
                }
                if (((e = t.sibling), e !== null)) {
                    (e.return = t.return), (F = e);
                    break;
                }
                F = t.return;
            }
    return (E = Ga), (Ga = !1), E;
}
function vr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var i = (r = r.next);
        do {
            if ((i.tag & e) === e) {
                var o = i.destroy;
                (i.destroy = void 0), o !== void 0 && As(t, n, o);
            }
            i = i.next;
        } while (i !== r);
    }
}
function ro(e, t) {
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
function Ns(e) {
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
function gd(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), gd(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
            ((t = e.stateNode),
            t !== null &&
                (delete t[wt],
                delete t[_r],
                delete t[ps],
                delete t[Up],
                delete t[qp])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
}
function vd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ya(e) {
    e: for (;;) {
        for (; e.sibling === null; ) {
            if (e.return === null || vd(e.return)) return null;
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
function js(e, t, n) {
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
                  n != null || t.onclick !== null || (t.onclick = _i));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (js(e, t, n), e = e.sibling; e !== null; )
            js(e, t, n), (e = e.sibling);
}
function Rs(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
        for (Rs(e, t, n), e = e.sibling; e !== null; )
            Rs(e, t, n), (e = e.sibling);
}
var Pe = null,
    ut = !1;
function It(e, t, n) {
    for (n = n.child; n !== null; ) wd(e, t, n), (n = n.sibling);
}
function wd(e, t, n) {
    if (St && typeof St.onCommitFiberUnmount == "function")
        try {
            St.onCommitFiberUnmount(Qi, n);
        } catch {}
    switch (n.tag) {
        case 5:
            Re || Tn(n, t);
        case 6:
            var r = Pe,
                i = ut;
            (Pe = null),
                It(e, t, n),
                (Pe = r),
                (ut = i),
                Pe !== null &&
                    (ut
                        ? ((e = Pe),
                          (n = n.stateNode),
                          e.nodeType === 8
                              ? e.parentNode.removeChild(n)
                              : e.removeChild(n))
                        : Pe.removeChild(n.stateNode));
            break;
        case 18:
            Pe !== null &&
                (ut
                    ? ((e = Pe),
                      (n = n.stateNode),
                      e.nodeType === 8
                          ? Ro(e.parentNode, n)
                          : e.nodeType === 1 && Ro(e, n),
                      Ar(e))
                    : Ro(Pe, n.stateNode));
            break;
        case 4:
            (r = Pe),
                (i = ut),
                (Pe = n.stateNode.containerInfo),
                (ut = !0),
                It(e, t, n),
                (Pe = r),
                (ut = i);
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (
                !Re &&
                ((r = n.updateQueue),
                r !== null && ((r = r.lastEffect), r !== null))
            ) {
                i = r = r.next;
                do {
                    var o = i,
                        s = o.destroy;
                    (o = o.tag),
                        s !== void 0 && (o & 2 || o & 4) && As(n, t, s),
                        (i = i.next);
                } while (i !== r);
            }
            It(e, t, n);
            break;
        case 1:
            if (
                !Re &&
                (Tn(n, t),
                (r = n.stateNode),
                typeof r.componentWillUnmount == "function")
            )
                try {
                    (r.props = n.memoizedProps),
                        (r.state = n.memoizedState),
                        r.componentWillUnmount();
                } catch (u) {
                    ue(n, t, u);
                }
            It(e, t, n);
            break;
        case 21:
            It(e, t, n);
            break;
        case 22:
            n.mode & 1
                ? ((Re = (r = Re) || n.memoizedState !== null),
                  It(e, t, n),
                  (Re = r))
                : It(e, t, n);
            break;
        default:
            It(e, t, n);
    }
}
function Xa(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new ih()),
            t.forEach(function (r) {
                var i = hh.bind(null, e, r);
                n.has(r) || (n.add(r), r.then(i, i));
            });
    }
}
function lt(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var o = e,
                    s = t,
                    u = s;
                e: for (; u !== null; ) {
                    switch (u.tag) {
                        case 5:
                            (Pe = u.stateNode), (ut = !1);
                            break e;
                        case 3:
                            (Pe = u.stateNode.containerInfo), (ut = !0);
                            break e;
                        case 4:
                            (Pe = u.stateNode.containerInfo), (ut = !0);
                            break e;
                    }
                    u = u.return;
                }
                if (Pe === null) throw Error(C(160));
                wd(o, s, i), (Pe = null), (ut = !1);
                var a = i.alternate;
                a !== null && (a.return = null), (i.return = null);
            } catch (p) {
                ue(i, t, p);
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) Sd(t, e), (t = t.sibling);
}
function Sd(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if ((lt(t, e), gt(e), r & 4)) {
                try {
                    vr(3, e, e.return), ro(3, e);
                } catch (x) {
                    ue(e, e.return, x);
                }
                try {
                    vr(5, e, e.return);
                } catch (x) {
                    ue(e, e.return, x);
                }
            }
            break;
        case 1:
            lt(t, e), gt(e), r & 512 && n !== null && Tn(n, n.return);
            break;
        case 5:
            if (
                (lt(t, e),
                gt(e),
                r & 512 && n !== null && Tn(n, n.return),
                e.flags & 32)
            ) {
                var i = e.stateNode;
                try {
                    kr(i, "");
                } catch (x) {
                    ue(e, e.return, x);
                }
            }
            if (r & 4 && ((i = e.stateNode), i != null)) {
                var o = e.memoizedProps,
                    s = n !== null ? n.memoizedProps : o,
                    u = e.type,
                    a = e.updateQueue;
                if (((e.updateQueue = null), a !== null))
                    try {
                        u === "input" &&
                            o.type === "radio" &&
                            o.name != null &&
                            Uu(i, o),
                            Zo(u, s);
                        var p = Zo(u, o);
                        for (s = 0; s < a.length; s += 2) {
                            var g = a[s],
                                m = a[s + 1];
                            g === "style"
                                ? Hu(i, m)
                                : g === "dangerouslySetInnerHTML"
                                ? Ju(i, m)
                                : g === "children"
                                ? kr(i, m)
                                : Hs(i, g, m, p);
                        }
                        switch (u) {
                            case "input":
                                Ko(i, o);
                                break;
                            case "textarea":
                                qu(i, o);
                                break;
                            case "select":
                                var y = i._wrapperState.wasMultiple;
                                i._wrapperState.wasMultiple = !!o.multiple;
                                var v = o.value;
                                v != null
                                    ? Ln(i, !!o.multiple, v, !1)
                                    : y !== !!o.multiple &&
                                      (o.defaultValue != null
                                          ? Ln(
                                                i,
                                                !!o.multiple,
                                                o.defaultValue,
                                                !0
                                            )
                                          : Ln(
                                                i,
                                                !!o.multiple,
                                                o.multiple ? [] : "",
                                                !1
                                            ));
                        }
                        i[_r] = o;
                    } catch (x) {
                        ue(e, e.return, x);
                    }
            }
            break;
        case 6:
            if ((lt(t, e), gt(e), r & 4)) {
                if (e.stateNode === null) throw Error(C(162));
                (i = e.stateNode), (o = e.memoizedProps);
                try {
                    i.nodeValue = o;
                } catch (x) {
                    ue(e, e.return, x);
                }
            }
            break;
        case 3:
            if (
                (lt(t, e),
                gt(e),
                r & 4 && n !== null && n.memoizedState.isDehydrated)
            )
                try {
                    Ar(t.containerInfo);
                } catch (x) {
                    ue(e, e.return, x);
                }
            break;
        case 4:
            lt(t, e), gt(e);
            break;
        case 13:
            lt(t, e),
                gt(e),
                (i = e.child),
                i.flags & 8192 &&
                    ((o = i.memoizedState !== null),
                    (i.stateNode.isHidden = o),
                    !o ||
                        (i.alternate !== null &&
                            i.alternate.memoizedState !== null) ||
                        (El = ce())),
                r & 4 && Xa(e);
            break;
        case 22:
            if (
                ((g = n !== null && n.memoizedState !== null),
                e.mode & 1
                    ? ((Re = (p = Re) || g), lt(t, e), (Re = p))
                    : lt(t, e),
                gt(e),
                r & 8192)
            ) {
                if (
                    ((p = e.memoizedState !== null),
                    (e.stateNode.isHidden = p) && !g && e.mode & 1)
                )
                    for (F = e, g = e.child; g !== null; ) {
                        for (m = F = g; F !== null; ) {
                            switch (((y = F), (v = y.child), y.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    vr(4, y, y.return);
                                    break;
                                case 1:
                                    Tn(y, y.return);
                                    var E = y.stateNode;
                                    if (
                                        typeof E.componentWillUnmount ==
                                        "function"
                                    ) {
                                        (r = y), (n = y.return);
                                        try {
                                            (t = r),
                                                (E.props = t.memoizedProps),
                                                (E.state = t.memoizedState),
                                                E.componentWillUnmount();
                                        } catch (x) {
                                            ue(r, n, x);
                                        }
                                    }
                                    break;
                                case 5:
                                    Tn(y, y.return);
                                    break;
                                case 22:
                                    if (y.memoizedState !== null) {
                                        eu(m);
                                        continue;
                                    }
                            }
                            v !== null ? ((v.return = y), (F = v)) : eu(m);
                        }
                        g = g.sibling;
                    }
                e: for (g = null, m = e; ; ) {
                    if (m.tag === 5) {
                        if (g === null) {
                            g = m;
                            try {
                                (i = m.stateNode),
                                    p
                                        ? ((o = i.style),
                                          typeof o.setProperty == "function"
                                              ? o.setProperty(
                                                    "display",
                                                    "none",
                                                    "important"
                                                )
                                              : (o.display = "none"))
                                        : ((u = m.stateNode),
                                          (a = m.memoizedProps.style),
                                          (s =
                                              a != null &&
                                              a.hasOwnProperty("display")
                                                  ? a.display
                                                  : null),
                                          (u.style.display = $u("display", s)));
                            } catch (x) {
                                ue(e, e.return, x);
                            }
                        }
                    } else if (m.tag === 6) {
                        if (g === null)
                            try {
                                m.stateNode.nodeValue = p
                                    ? ""
                                    : m.memoizedProps;
                            } catch (x) {
                                ue(e, e.return, x);
                            }
                    } else if (
                        ((m.tag !== 22 && m.tag !== 23) ||
                            m.memoizedState === null ||
                            m === e) &&
                        m.child !== null
                    ) {
                        (m.child.return = m), (m = m.child);
                        continue;
                    }
                    if (m === e) break e;
                    for (; m.sibling === null; ) {
                        if (m.return === null || m.return === e) break e;
                        g === m && (g = null), (m = m.return);
                    }
                    g === m && (g = null),
                        (m.sibling.return = m.return),
                        (m = m.sibling);
                }
            }
            break;
        case 19:
            lt(t, e), gt(e), r & 4 && Xa(e);
            break;
        case 21:
            break;
        default:
            lt(t, e), gt(e);
    }
}
function gt(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (vd(n)) {
                        var r = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(C(160));
            }
            switch (r.tag) {
                case 5:
                    var i = r.stateNode;
                    r.flags & 32 && (kr(i, ""), (r.flags &= -33));
                    var o = Ya(e);
                    Rs(e, o, i);
                    break;
                case 3:
                case 4:
                    var s = r.stateNode.containerInfo,
                        u = Ya(e);
                    js(e, u, s);
                    break;
                default:
                    throw Error(C(161));
            }
        } catch (a) {
            ue(e, e.return, a);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function sh(e, t, n) {
    (F = e), xd(e);
}
function xd(e, t, n) {
    for (var r = (e.mode & 1) !== 0; F !== null; ) {
        var i = F,
            o = i.child;
        if (i.tag === 22 && r) {
            var s = i.memoizedState !== null || ri;
            if (!s) {
                var u = i.alternate,
                    a = (u !== null && u.memoizedState !== null) || Re;
                u = ri;
                var p = Re;
                if (((ri = s), (Re = a) && !p))
                    for (F = i; F !== null; )
                        (s = F),
                            (a = s.child),
                            s.tag === 22 && s.memoizedState !== null
                                ? tu(i)
                                : a !== null
                                ? ((a.return = s), (F = a))
                                : tu(i);
                for (; o !== null; ) (F = o), xd(o), (o = o.sibling);
                (F = i), (ri = u), (Re = p);
            }
            Za(e);
        } else
            i.subtreeFlags & 8772 && o !== null
                ? ((o.return = i), (F = o))
                : Za(e);
    }
}
function Za(e) {
    for (; F !== null; ) {
        var t = F;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            Re || ro(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !Re)
                                if (n === null) r.componentDidMount();
                                else {
                                    var i =
                                        t.elementType === t.type
                                            ? n.memoizedProps
                                            : at(t.type, n.memoizedProps);
                                    r.componentDidUpdate(
                                        i,
                                        n.memoizedState,
                                        r.__reactInternalSnapshotBeforeUpdate
                                    );
                                }
                            var o = t.updateQueue;
                            o !== null && Ma(t, o, r);
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
                                Ma(t, s, n);
                            }
                            break;
                        case 5:
                            var u = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = u;
                                var a = t.memoizedProps;
                                switch (t.type) {
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        a.autoFocus && n.focus();
                                        break;
                                    case "img":
                                        a.src && (n.src = a.src);
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
                                var p = t.alternate;
                                if (p !== null) {
                                    var g = p.memoizedState;
                                    if (g !== null) {
                                        var m = g.dehydrated;
                                        m !== null && Ar(m);
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
                            throw Error(C(163));
                    }
                Re || (t.flags & 512 && Ns(t));
            } catch (y) {
                ue(t, t.return, y);
            }
        }
        if (t === e) {
            F = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            (n.return = t.return), (F = n);
            break;
        }
        F = t.return;
    }
}
function eu(e) {
    for (; F !== null; ) {
        var t = F;
        if (t === e) {
            F = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            (n.return = t.return), (F = n);
            break;
        }
        F = t.return;
    }
}
function tu(e) {
    for (; F !== null; ) {
        var t = F;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        ro(4, t);
                    } catch (a) {
                        ue(t, n, a);
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var i = t.return;
                        try {
                            r.componentDidMount();
                        } catch (a) {
                            ue(t, i, a);
                        }
                    }
                    var o = t.return;
                    try {
                        Ns(t);
                    } catch (a) {
                        ue(t, o, a);
                    }
                    break;
                case 5:
                    var s = t.return;
                    try {
                        Ns(t);
                    } catch (a) {
                        ue(t, s, a);
                    }
            }
        } catch (a) {
            ue(t, t.return, a);
        }
        if (t === e) {
            F = null;
            break;
        }
        var u = t.sibling;
        if (u !== null) {
            (u.return = t.return), (F = u);
            break;
        }
        F = t.return;
    }
}
var lh = Math.ceil,
    qi = Ot.ReactCurrentDispatcher,
    Pl = Ot.ReactCurrentOwner,
    et = Ot.ReactCurrentBatchConfig,
    W = 0,
    xe = null,
    me = null,
    Ce = 0,
    Ue = 0,
    _n = Xt(0),
    we = 0,
    br = null,
    pn = 0,
    io = 0,
    Cl = 0,
    wr = null,
    Me = null,
    El = 0,
    $n = 1 / 0,
    Ct = null,
    Vi = !1,
    Ts = null,
    Ht = null,
    ii = !1,
    Dt = null,
    Ji = 0,
    Sr = 0,
    _s = null,
    gi = -1,
    vi = 0;
function Oe() {
    return W & 6 ? ce() : gi !== -1 ? gi : (gi = ce());
}
function Wt(e) {
    return e.mode & 1
        ? W & 2 && Ce !== 0
            ? Ce & -Ce
            : Jp.transition !== null
            ? (vi === 0 && (vi = ic()), vi)
            : ((e = Q),
              e !== 0 ||
                  ((e = window.event), (e = e === void 0 ? 16 : dc(e.type))),
              e)
        : 1;
}
function pt(e, t, n, r) {
    if (50 < Sr) throw ((Sr = 0), (_s = null), Error(C(185)));
    Br(e, n, r),
        (!(W & 2) || e !== xe) &&
            (e === xe && (!(W & 2) && (io |= n), we === 4 && zt(e, Ce)),
            De(e, r),
            n === 1 &&
                W === 0 &&
                !(t.mode & 1) &&
                (($n = ce() + 500), eo && Zt()));
}
function De(e, t) {
    var n = e.callbackNode;
    Jf(e, t);
    var r = Ni(e, e === xe ? Ce : 0);
    if (r === 0)
        n !== null && ca(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && ca(n), t === 1))
            e.tag === 0 ? Vp(nu.bind(null, e)) : Tc(nu.bind(null, e)),
                Bp(function () {
                    !(W & 6) && Zt();
                }),
                (n = null);
        else {
            switch (oc(r)) {
                case 1:
                    n = Ys;
                    break;
                case 4:
                    n = nc;
                    break;
                case 16:
                    n = Ai;
                    break;
                case 536870912:
                    n = rc;
                    break;
                default:
                    n = Ai;
            }
            n = Rd(n, kd.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
    }
}
function kd(e, t) {
    if (((gi = -1), (vi = 0), W & 6)) throw Error(C(327));
    var n = e.callbackNode;
    if (bn() && e.callbackNode !== n) return null;
    var r = Ni(e, e === xe ? Ce : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = $i(e, r);
    else {
        t = r;
        var i = W;
        W |= 2;
        var o = Cd();
        (xe !== e || Ce !== t) && ((Ct = null), ($n = ce() + 500), ln(e, t));
        do
            try {
                ch();
                break;
            } catch (u) {
                Pd(e, u);
            }
        while (1);
        cl(),
            (qi.current = o),
            (W = i),
            me !== null ? (t = 0) : ((xe = null), (Ce = 0), (t = we));
    }
    if (t !== 0) {
        if (
            (t === 2 && ((i = is(e)), i !== 0 && ((r = i), (t = Ls(e, i)))),
            t === 1)
        )
            throw ((n = br), ln(e, 0), zt(e, r), De(e, ce()), n);
        if (t === 6) zt(e, r);
        else {
            if (
                ((i = e.current.alternate),
                !(r & 30) &&
                    !ah(i) &&
                    ((t = $i(e, r)),
                    t === 2 &&
                        ((o = is(e)), o !== 0 && ((r = o), (t = Ls(e, o)))),
                    t === 1))
            )
                throw ((n = br), ln(e, 0), zt(e, r), De(e, ce()), n);
            switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                    throw Error(C(345));
                case 2:
                    nn(e, Me, Ct);
                    break;
                case 3:
                    if (
                        (zt(e, r),
                        (r & 130023424) === r &&
                            ((t = El + 500 - ce()), 10 < t))
                    ) {
                        if (Ni(e, 0) !== 0) break;
                        if (((i = e.suspendedLanes), (i & r) !== r)) {
                            Oe(), (e.pingedLanes |= e.suspendedLanes & i);
                            break;
                        }
                        e.timeoutHandle = fs(nn.bind(null, e, Me, Ct), t);
                        break;
                    }
                    nn(e, Me, Ct);
                    break;
                case 4:
                    if ((zt(e, r), (r & 4194240) === r)) break;
                    for (t = e.eventTimes, i = -1; 0 < r; ) {
                        var s = 31 - ft(r);
                        (o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o);
                    }
                    if (
                        ((r = i),
                        (r = ce() - r),
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
                                : 1960 * lh(r / 1960)) - r),
                        10 < r)
                    ) {
                        e.timeoutHandle = fs(nn.bind(null, e, Me, Ct), r);
                        break;
                    }
                    nn(e, Me, Ct);
                    break;
                case 5:
                    nn(e, Me, Ct);
                    break;
                default:
                    throw Error(C(329));
            }
        }
    }
    return De(e, ce()), e.callbackNode === n ? kd.bind(null, e) : null;
}
function Ls(e, t) {
    var n = wr;
    return (
        e.current.memoizedState.isDehydrated && (ln(e, t).flags |= 256),
        (e = $i(e, t)),
        e !== 2 && ((t = Me), (Me = n), t !== null && Os(t)),
        e
    );
}
function Os(e) {
    Me === null ? (Me = e) : Me.push.apply(Me, e);
}
function ah(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        o = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!ht(o(), i)) return !1;
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
function zt(e, t) {
    for (
        t &= ~Cl,
            t &= ~io,
            e.suspendedLanes |= t,
            e.pingedLanes &= ~t,
            e = e.expirationTimes;
        0 < t;

    ) {
        var n = 31 - ft(t),
            r = 1 << n;
        (e[n] = -1), (t &= ~r);
    }
}
function nu(e) {
    if (W & 6) throw Error(C(327));
    bn();
    var t = Ni(e, 0);
    if (!(t & 1)) return De(e, ce()), null;
    var n = $i(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = is(e);
        r !== 0 && ((t = r), (n = Ls(e, r)));
    }
    if (n === 1) throw ((n = br), ln(e, 0), zt(e, t), De(e, ce()), n);
    if (n === 6) throw Error(C(345));
    return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        nn(e, Me, Ct),
        De(e, ce()),
        null
    );
}
function Al(e, t) {
    var n = W;
    W |= 1;
    try {
        return e(t);
    } finally {
        (W = n), W === 0 && (($n = ce() + 500), eo && Zt());
    }
}
function hn(e) {
    Dt !== null && Dt.tag === 0 && !(W & 6) && bn();
    var t = W;
    W |= 1;
    var n = et.transition,
        r = Q;
    try {
        if (((et.transition = null), (Q = 1), e)) return e();
    } finally {
        (Q = r), (et.transition = n), (W = t), !(W & 6) && Zt();
    }
}
function Nl() {
    (Ue = _n.current), Z(_n);
}
function ln(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), zp(n)), me !== null))
        for (n = me.return; n !== null; ) {
            var r = n;
            switch ((ll(r), r.tag)) {
                case 1:
                    (r = r.type.childContextTypes), r != null && Li();
                    break;
                case 3:
                    Vn(), Z(ze), Z(Te), yl();
                    break;
                case 5:
                    ml(r);
                    break;
                case 4:
                    Vn();
                    break;
                case 13:
                    Z(ie);
                    break;
                case 19:
                    Z(ie);
                    break;
                case 10:
                    dl(r.type._context);
                    break;
                case 22:
                case 23:
                    Nl();
            }
            n = n.return;
        }
    if (
        ((xe = e),
        (me = e = Kt(e.current, null)),
        (Ce = Ue = t),
        (we = 0),
        (br = null),
        (Cl = io = pn = 0),
        (Me = wr = null),
        on !== null)
    ) {
        for (t = 0; t < on.length; t++)
            if (((n = on[t]), (r = n.interleaved), r !== null)) {
                n.interleaved = null;
                var i = r.next,
                    o = n.pending;
                if (o !== null) {
                    var s = o.next;
                    (o.next = i), (r.next = s);
                }
                n.pending = r;
            }
        on = null;
    }
    return e;
}
function Pd(e, t) {
    do {
        var n = me;
        try {
            if ((cl(), (hi.current = Ui), Di)) {
                for (var r = oe.memoizedState; r !== null; ) {
                    var i = r.queue;
                    i !== null && (i.pending = null), (r = r.next);
                }
                Di = !1;
            }
            if (
                ((fn = 0),
                (Se = ve = oe = null),
                (gr = !1),
                (Ir = 0),
                (Pl.current = null),
                n === null || n.return === null)
            ) {
                (we = 1), (br = t), (me = null);
                break;
            }
            e: {
                var o = e,
                    s = n.return,
                    u = n,
                    a = t;
                if (
                    ((t = Ce),
                    (u.flags |= 32768),
                    a !== null &&
                        typeof a == "object" &&
                        typeof a.then == "function")
                ) {
                    var p = a,
                        g = u,
                        m = g.tag;
                    if (!(g.mode & 1) && (m === 0 || m === 11 || m === 15)) {
                        var y = g.alternate;
                        y
                            ? ((g.updateQueue = y.updateQueue),
                              (g.memoizedState = y.memoizedState),
                              (g.lanes = y.lanes))
                            : ((g.updateQueue = null),
                              (g.memoizedState = null));
                    }
                    var v = Va(s);
                    if (v !== null) {
                        (v.flags &= -257),
                            Ja(v, s, u, o, t),
                            v.mode & 1 && qa(o, p, t),
                            (t = v),
                            (a = p);
                        var E = t.updateQueue;
                        if (E === null) {
                            var x = new Set();
                            x.add(a), (t.updateQueue = x);
                        } else E.add(a);
                        break e;
                    } else {
                        if (!(t & 1)) {
                            qa(o, p, t), jl();
                            break e;
                        }
                        a = Error(C(426));
                    }
                } else if (ee && u.mode & 1) {
                    var D = Va(s);
                    if (D !== null) {
                        !(D.flags & 65536) && (D.flags |= 256),
                            Ja(D, s, u, o, t),
                            al(Jn(a, u));
                        break e;
                    }
                }
                (o = a = Jn(a, u)),
                    we !== 4 && (we = 2),
                    wr === null ? (wr = [o]) : wr.push(o),
                    (o = s);
                do {
                    switch (o.tag) {
                        case 3:
                            (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                            var d = sd(o, a, t);
                            Fa(o, d);
                            break e;
                        case 1:
                            u = a;
                            var f = o.type,
                                h = o.stateNode;
                            if (
                                !(o.flags & 128) &&
                                (typeof f.getDerivedStateFromError ==
                                    "function" ||
                                    (h !== null &&
                                        typeof h.componentDidCatch ==
                                            "function" &&
                                        (Ht === null || !Ht.has(h))))
                            ) {
                                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                                var S = ld(o, u, t);
                                Fa(o, S);
                                break e;
                            }
                    }
                    o = o.return;
                } while (o !== null);
            }
            Ad(n);
        } catch (c) {
            (t = c), me === n && n !== null && (me = n = n.return);
            continue;
        }
        break;
    } while (1);
}
function Cd() {
    var e = qi.current;
    return (qi.current = Ui), e === null ? Ui : e;
}
function jl() {
    (we === 0 || we === 3 || we === 2) && (we = 4),
        xe === null || (!(pn & 268435455) && !(io & 268435455)) || zt(xe, Ce);
}
function $i(e, t) {
    var n = W;
    W |= 2;
    var r = Cd();
    (xe !== e || Ce !== t) && ((Ct = null), ln(e, t));
    do
        try {
            uh();
            break;
        } catch (i) {
            Pd(e, i);
        }
    while (1);
    if ((cl(), (W = n), (qi.current = r), me !== null)) throw Error(C(261));
    return (xe = null), (Ce = 0), we;
}
function uh() {
    for (; me !== null; ) Ed(me);
}
function ch() {
    for (; me !== null && !Ff(); ) Ed(me);
}
function Ed(e) {
    var t = jd(e.alternate, e, Ue);
    (e.memoizedProps = e.pendingProps),
        t === null ? Ad(e) : (me = t),
        (Pl.current = null);
}
function Ad(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
            if (((n = rh(n, t)), n !== null)) {
                (n.flags &= 32767), (me = n);
                return;
            }
            if (e !== null)
                (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            else {
                (we = 6), (me = null);
                return;
            }
        } else if (((n = nh(n, t, Ue)), n !== null)) {
            me = n;
            return;
        }
        if (((t = t.sibling), t !== null)) {
            me = t;
            return;
        }
        me = t = e;
    } while (t !== null);
    we === 0 && (we = 5);
}
function nn(e, t, n) {
    var r = Q,
        i = et.transition;
    try {
        (et.transition = null), (Q = 1), dh(e, t, n, r);
    } finally {
        (et.transition = i), (Q = r);
    }
    return null;
}
function dh(e, t, n, r) {
    do bn();
    while (Dt !== null);
    if (W & 6) throw Error(C(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(C(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var o = n.lanes | n.childLanes;
    if (
        ($f(e, o),
        e === xe && ((me = xe = null), (Ce = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
            ii ||
            ((ii = !0),
            Rd(Ai, function () {
                return bn(), null;
            })),
        (o = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || o)
    ) {
        (o = et.transition), (et.transition = null);
        var s = Q;
        Q = 1;
        var u = W;
        (W |= 4),
            (Pl.current = null),
            oh(e, n),
            Sd(n, e),
            _p(cs),
            (ji = !!us),
            (cs = us = null),
            (e.current = n),
            sh(n),
            Mf(),
            (W = u),
            (Q = s),
            (et.transition = o);
    } else e.current = n;
    if (
        (ii && ((ii = !1), (Dt = e), (Ji = i)),
        (o = e.pendingLanes),
        o === 0 && (Ht = null),
        Bf(n.stateNode),
        De(e, ce()),
        t !== null)
    )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            (i = t[n]),
                r(i.value, { componentStack: i.stack, digest: i.digest });
    if (Vi) throw ((Vi = !1), (e = Ts), (Ts = null), e);
    return (
        Ji & 1 && e.tag !== 0 && bn(),
        (o = e.pendingLanes),
        o & 1 ? (e === _s ? Sr++ : ((Sr = 0), (_s = e))) : (Sr = 0),
        Zt(),
        null
    );
}
function bn() {
    if (Dt !== null) {
        var e = oc(Ji),
            t = et.transition,
            n = Q;
        try {
            if (((et.transition = null), (Q = 16 > e ? 16 : e), Dt === null))
                var r = !1;
            else {
                if (((e = Dt), (Dt = null), (Ji = 0), W & 6))
                    throw Error(C(331));
                var i = W;
                for (W |= 4, F = e.current; F !== null; ) {
                    var o = F,
                        s = o.child;
                    if (F.flags & 16) {
                        var u = o.deletions;
                        if (u !== null) {
                            for (var a = 0; a < u.length; a++) {
                                var p = u[a];
                                for (F = p; F !== null; ) {
                                    var g = F;
                                    switch (g.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            vr(8, g, o);
                                    }
                                    var m = g.child;
                                    if (m !== null) (m.return = g), (F = m);
                                    else
                                        for (; F !== null; ) {
                                            g = F;
                                            var y = g.sibling,
                                                v = g.return;
                                            if ((gd(g), g === p)) {
                                                F = null;
                                                break;
                                            }
                                            if (y !== null) {
                                                (y.return = v), (F = y);
                                                break;
                                            }
                                            F = v;
                                        }
                                }
                            }
                            var E = o.alternate;
                            if (E !== null) {
                                var x = E.child;
                                if (x !== null) {
                                    E.child = null;
                                    do {
                                        var D = x.sibling;
                                        (x.sibling = null), (x = D);
                                    } while (x !== null);
                                }
                            }
                            F = o;
                        }
                    }
                    if (o.subtreeFlags & 2064 && s !== null)
                        (s.return = o), (F = s);
                    else
                        e: for (; F !== null; ) {
                            if (((o = F), o.flags & 2048))
                                switch (o.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        vr(9, o, o.return);
                                }
                            var d = o.sibling;
                            if (d !== null) {
                                (d.return = o.return), (F = d);
                                break e;
                            }
                            F = o.return;
                        }
                }
                var f = e.current;
                for (F = f; F !== null; ) {
                    s = F;
                    var h = s.child;
                    if (s.subtreeFlags & 2064 && h !== null)
                        (h.return = s), (F = h);
                    else
                        e: for (s = f; F !== null; ) {
                            if (((u = F), u.flags & 2048))
                                try {
                                    switch (u.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            ro(9, u);
                                    }
                                } catch (c) {
                                    ue(u, u.return, c);
                                }
                            if (u === s) {
                                F = null;
                                break e;
                            }
                            var S = u.sibling;
                            if (S !== null) {
                                (S.return = u.return), (F = S);
                                break e;
                            }
                            F = u.return;
                        }
                }
                if (
                    ((W = i),
                    Zt(),
                    St && typeof St.onPostCommitFiberRoot == "function")
                )
                    try {
                        St.onPostCommitFiberRoot(Qi, e);
                    } catch {}
                r = !0;
            }
            return r;
        } finally {
            (Q = n), (et.transition = t);
        }
    }
    return !1;
}
function ru(e, t, n) {
    (t = Jn(n, t)),
        (t = sd(e, t, 1)),
        (e = $t(e, t, 1)),
        (t = Oe()),
        e !== null && (Br(e, 1, t), De(e, t));
}
function ue(e, t, n) {
    if (e.tag === 3) ru(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                ru(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == "function" ||
                    (typeof r.componentDidCatch == "function" &&
                        (Ht === null || !Ht.has(r)))
                ) {
                    (e = Jn(n, e)),
                        (e = ld(t, e, 1)),
                        (t = $t(t, e, 1)),
                        (e = Oe()),
                        t !== null && (Br(t, 1, e), De(t, e));
                    break;
                }
            }
            t = t.return;
        }
}
function fh(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
        (t = Oe()),
        (e.pingedLanes |= e.suspendedLanes & n),
        xe === e &&
            (Ce & n) === n &&
            (we === 4 ||
            (we === 3 && (Ce & 130023424) === Ce && 500 > ce() - El)
                ? ln(e, 0)
                : (Cl |= n)),
        De(e, t);
}
function Nd(e, t) {
    t === 0 &&
        (e.mode & 1
            ? ((t = Kr), (Kr <<= 1), !(Kr & 130023424) && (Kr = 4194304))
            : (t = 1));
    var n = Oe();
    (e = _t(e, t)), e !== null && (Br(e, t, n), De(e, n));
}
function ph(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), Nd(e, n);
}
function hh(e, t) {
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
            throw Error(C(314));
    }
    r !== null && r.delete(t), Nd(e, n);
}
var jd;
jd = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || ze.current) be = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return (be = !1), th(e, t, n);
            be = !!(e.flags & 131072);
        }
    else (be = !1), ee && t.flags & 1048576 && _c(t, Fi, t.index);
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var r = t.type;
            yi(e, t), (e = t.pendingProps);
            var i = Dn(t, Te.current);
            Mn(t, n), (i = vl(null, t, r, e, i, n));
            var o = wl();
            return (
                (t.flags |= 1),
                typeof i == "object" &&
                i !== null &&
                typeof i.render == "function" &&
                i.$$typeof === void 0
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      Be(r) ? ((o = !0), Oi(t)) : (o = !1),
                      (t.memoizedState =
                          i.state !== null && i.state !== void 0
                              ? i.state
                              : null),
                      pl(t),
                      (i.updater = to),
                      (t.stateNode = i),
                      (i._reactInternals = t),
                      ws(t, r, e, n),
                      (t = ks(null, t, r, !0, o, n)))
                    : ((t.tag = 0),
                      ee && o && sl(t),
                      Le(null, t, i, n),
                      (t = t.child)),
                t
            );
        case 16:
            r = t.elementType;
            e: {
                switch (
                    (yi(e, t),
                    (e = t.pendingProps),
                    (i = r._init),
                    (r = i(r._payload)),
                    (t.type = r),
                    (i = t.tag = yh(r)),
                    (e = at(r, e)),
                    i)
                ) {
                    case 0:
                        t = xs(null, t, r, e, n);
                        break e;
                    case 1:
                        t = Wa(null, t, r, e, n);
                        break e;
                    case 11:
                        t = $a(null, t, r, e, n);
                        break e;
                    case 14:
                        t = Ha(null, t, r, at(r.type, e), n);
                        break e;
                }
                throw Error(C(306, r, ""));
            }
            return t;
        case 0:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : at(r, i)),
                xs(e, t, r, i, n)
            );
        case 1:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : at(r, i)),
                Wa(e, t, r, i, n)
            );
        case 3:
            e: {
                if ((dd(t), e === null)) throw Error(C(387));
                (r = t.pendingProps),
                    (o = t.memoizedState),
                    (i = o.element),
                    Fc(e, t),
                    zi(t, r, null, n);
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
                        (i = Jn(Error(C(423)), t)), (t = Ka(e, t, r, n, i));
                        break e;
                    } else if (r !== i) {
                        (i = Jn(Error(C(424)), t)), (t = Ka(e, t, r, n, i));
                        break e;
                    } else
                        for (
                            qe = Jt(t.stateNode.containerInfo.firstChild),
                                Ve = t,
                                ee = !0,
                                dt = null,
                                n = Bc(t, null, r, n),
                                t.child = n;
                            n;

                        )
                            (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
                else {
                    if ((Un(), r === i)) {
                        t = Lt(e, t, n);
                        break e;
                    }
                    Le(e, t, r, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                Dc(t),
                e === null && ys(t),
                (r = t.type),
                (i = t.pendingProps),
                (o = e !== null ? e.memoizedProps : null),
                (s = i.children),
                ds(r, i)
                    ? (s = null)
                    : o !== null && ds(r, o) && (t.flags |= 32),
                cd(e, t),
                Le(e, t, s, n),
                t.child
            );
        case 6:
            return e === null && ys(t), null;
        case 13:
            return fd(e, t, n);
        case 4:
            return (
                hl(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                e === null ? (t.child = qn(t, null, r, n)) : Le(e, t, r, n),
                t.child
            );
        case 11:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : at(r, i)),
                $a(e, t, r, i, n)
            );
        case 7:
            return Le(e, t, t.pendingProps, n), t.child;
        case 8:
            return Le(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return Le(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (
                    ((r = t.type._context),
                    (i = t.pendingProps),
                    (o = t.memoizedProps),
                    (s = i.value),
                    Y(Mi, r._currentValue),
                    (r._currentValue = s),
                    o !== null)
                )
                    if (ht(o.value, s)) {
                        if (o.children === i.children && !ze.current) {
                            t = Lt(e, t, n);
                            break e;
                        }
                    } else
                        for (
                            o = t.child, o !== null && (o.return = t);
                            o !== null;

                        ) {
                            var u = o.dependencies;
                            if (u !== null) {
                                s = o.child;
                                for (var a = u.firstContext; a !== null; ) {
                                    if (a.context === r) {
                                        if (o.tag === 1) {
                                            (a = jt(-1, n & -n)), (a.tag = 2);
                                            var p = o.updateQueue;
                                            if (p !== null) {
                                                p = p.shared;
                                                var g = p.pending;
                                                g === null
                                                    ? (a.next = a)
                                                    : ((a.next = g.next),
                                                      (g.next = a)),
                                                    (p.pending = a);
                                            }
                                        }
                                        (o.lanes |= n),
                                            (a = o.alternate),
                                            a !== null && (a.lanes |= n),
                                            gs(o.return, n, t),
                                            (u.lanes |= n);
                                        break;
                                    }
                                    a = a.next;
                                }
                            } else if (o.tag === 10)
                                s = o.type === t.type ? null : o.child;
                            else if (o.tag === 18) {
                                if (((s = o.return), s === null))
                                    throw Error(C(341));
                                (s.lanes |= n),
                                    (u = s.alternate),
                                    u !== null && (u.lanes |= n),
                                    gs(s, n, t),
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
                Le(e, t, i.children, n), (t = t.child);
            }
            return t;
        case 9:
            return (
                (i = t.type),
                (r = t.pendingProps.children),
                Mn(t, n),
                (i = tt(i)),
                (r = r(i)),
                (t.flags |= 1),
                Le(e, t, r, n),
                t.child
            );
        case 14:
            return (
                (r = t.type),
                (i = at(r, t.pendingProps)),
                (i = at(r.type, i)),
                Ha(e, t, r, i, n)
            );
        case 15:
            return ad(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : at(r, i)),
                yi(e, t),
                (t.tag = 1),
                Be(r) ? ((e = !0), Oi(t)) : (e = !1),
                Mn(t, n),
                bc(t, r, i),
                ws(t, r, i, n),
                ks(null, t, r, !0, e, n)
            );
        case 19:
            return pd(e, t, n);
        case 22:
            return ud(e, t, n);
    }
    throw Error(C(156, t.tag));
};
function Rd(e, t) {
    return tc(e, t);
}
function mh(e, t, n, r) {
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
function Ze(e, t, n, r) {
    return new mh(e, t, n, r);
}
function Rl(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
}
function yh(e) {
    if (typeof e == "function") return Rl(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === Ks)) return 11;
        if (e === Qs) return 14;
    }
    return 2;
}
function Kt(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = Ze(e.tag, t, e.key, e.mode)),
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
function wi(e, t, n, r, i, o) {
    var s = 2;
    if (((r = e), typeof e == "function")) Rl(e) && (s = 1);
    else if (typeof e == "string") s = 5;
    else
        e: switch (e) {
            case xn:
                return an(n.children, i, o, t);
            case Ws:
                (s = 8), (i |= 8);
                break;
            case Vo:
                return (
                    (e = Ze(12, n, t, i | 2)),
                    (e.elementType = Vo),
                    (e.lanes = o),
                    e
                );
            case Jo:
                return (
                    (e = Ze(13, n, t, i)),
                    (e.elementType = Jo),
                    (e.lanes = o),
                    e
                );
            case $o:
                return (
                    (e = Ze(19, n, t, i)),
                    (e.elementType = $o),
                    (e.lanes = o),
                    e
                );
            case zu:
                return oo(n, i, o, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                        case Mu:
                            s = 10;
                            break e;
                        case bu:
                            s = 9;
                            break e;
                        case Ks:
                            s = 11;
                            break e;
                        case Qs:
                            s = 14;
                            break e;
                        case Ft:
                            (s = 16), (r = null);
                            break e;
                    }
                throw Error(C(130, e == null ? e : typeof e, ""));
        }
    return (
        (t = Ze(s, n, t, i)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = o),
        t
    );
}
function an(e, t, n, r) {
    return (e = Ze(7, e, r, t)), (e.lanes = n), e;
}
function oo(e, t, n, r) {
    return (
        (e = Ze(22, e, r, t)),
        (e.elementType = zu),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
    );
}
function bo(e, t, n) {
    return (e = Ze(6, e, null, t)), (e.lanes = n), e;
}
function zo(e, t, n) {
    return (
        (t = Ze(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
        }),
        t
    );
}
function gh(e, t, n, r, i) {
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
        (this.eventTimes = vo(0)),
        (this.expirationTimes = vo(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
                0),
        (this.entanglements = vo(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = i),
        (this.mutableSourceEagerHydrationData = null);
}
function Tl(e, t, n, r, i, o, s, u, a) {
    return (
        (e = new gh(e, t, n, u, a)),
        t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
        (o = Ze(3, null, null, t)),
        (e.current = o),
        (o.stateNode = e),
        (o.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
        }),
        pl(o),
        e
    );
}
function vh(e, t, n) {
    var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Sn,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n,
    };
}
function Td(e) {
    if (!e) return Gt;
    e = e._reactInternals;
    e: {
        if (yn(e) !== e || e.tag !== 1) throw Error(C(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (Be(t.type)) {
                        t =
                            t.stateNode
                                .__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(C(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if (Be(n)) return Rc(e, n, t);
    }
    return t;
}
function _d(e, t, n, r, i, o, s, u, a) {
    return (
        (e = Tl(n, r, !0, e, i, o, s, u, a)),
        (e.context = Td(null)),
        (n = e.current),
        (r = Oe()),
        (i = Wt(n)),
        (o = jt(r, i)),
        (o.callback = t ?? null),
        $t(n, o, i),
        (e.current.lanes = i),
        Br(e, i, r),
        De(e, r),
        e
    );
}
function so(e, t, n, r) {
    var i = t.current,
        o = Oe(),
        s = Wt(i);
    return (
        (n = Td(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = jt(o, s)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = $t(i, t, s)),
        e !== null && (pt(e, i, s, o), pi(e, i, s)),
        s
    );
}
function Hi(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function iu(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function _l(e, t) {
    iu(e, t), (e = e.alternate) && iu(e, t);
}
function wh() {
    return null;
}
var Ld =
    typeof reportError == "function"
        ? reportError
        : function (e) {
              console.error(e);
          };
function Ll(e) {
    this._internalRoot = e;
}
lo.prototype.render = Ll.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(C(409));
    so(e, t, null, null);
};
lo.prototype.unmount = Ll.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        hn(function () {
            so(null, e, null, null);
        }),
            (t[Tt] = null);
    }
};
function lo(e) {
    this._internalRoot = e;
}
lo.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = ac();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < bt.length && t !== 0 && t < bt[n].priority; n++);
        bt.splice(n, 0, e), n === 0 && cc(e);
    }
};
function Ol(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ao(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 ||
                e.nodeValue !== " react-mount-point-unstable "))
    );
}
function ou() {}
function Sh(e, t, n, r, i) {
    if (i) {
        if (typeof r == "function") {
            var o = r;
            r = function () {
                var p = Hi(s);
                o.call(p);
            };
        }
        var s = _d(t, r, e, 0, null, !1, !1, "", ou);
        return (
            (e._reactRootContainer = s),
            (e[Tt] = s.current),
            Rr(e.nodeType === 8 ? e.parentNode : e),
            hn(),
            s
        );
    }
    for (; (i = e.lastChild); ) e.removeChild(i);
    if (typeof r == "function") {
        var u = r;
        r = function () {
            var p = Hi(a);
            u.call(p);
        };
    }
    var a = Tl(e, 0, !1, null, null, !1, !1, "", ou);
    return (
        (e._reactRootContainer = a),
        (e[Tt] = a.current),
        Rr(e.nodeType === 8 ? e.parentNode : e),
        hn(function () {
            so(t, a, n, r);
        }),
        a
    );
}
function uo(e, t, n, r, i) {
    var o = n._reactRootContainer;
    if (o) {
        var s = o;
        if (typeof i == "function") {
            var u = i;
            i = function () {
                var a = Hi(s);
                u.call(a);
            };
        }
        so(t, s, e, i);
    } else s = Sh(n, t, e, i, r);
    return Hi(s);
}
sc = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = ur(t.pendingLanes);
                n !== 0 &&
                    (Xs(t, n | 1),
                    De(t, ce()),
                    !(W & 6) && (($n = ce() + 500), Zt()));
            }
            break;
        case 13:
            hn(function () {
                var r = _t(e, 1);
                if (r !== null) {
                    var i = Oe();
                    pt(r, e, 1, i);
                }
            }),
                _l(e, 1);
    }
};
Zs = function (e) {
    if (e.tag === 13) {
        var t = _t(e, 134217728);
        if (t !== null) {
            var n = Oe();
            pt(t, e, 134217728, n);
        }
        _l(e, 134217728);
    }
};
lc = function (e) {
    if (e.tag === 13) {
        var t = Wt(e),
            n = _t(e, t);
        if (n !== null) {
            var r = Oe();
            pt(n, e, t, r);
        }
        _l(e, t);
    }
};
ac = function () {
    return Q;
};
uc = function (e, t) {
    var n = Q;
    try {
        return (Q = e), t();
    } finally {
        Q = n;
    }
};
ts = function (e, t, n) {
    switch (t) {
        case "input":
            if ((Ko(e, n), (t = n.name), n.type === "radio" && t != null)) {
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
                        var i = Zi(r);
                        if (!i) throw Error(C(90));
                        Du(r), Ko(r, i);
                    }
                }
            }
            break;
        case "textarea":
            qu(e, n);
            break;
        case "select":
            (t = n.value), t != null && Ln(e, !!n.multiple, t, !1);
    }
};
Qu = Al;
Gu = hn;
var xh = { usingClientEntryPoint: !1, Events: [Ur, En, Zi, Wu, Ku, Al] },
    ir = {
        findFiberByHostInstance: rn,
        bundleType: 0,
        version: "18.2.0",
        rendererPackageName: "react-dom",
    },
    kh = {
        bundleType: ir.bundleType,
        version: ir.version,
        rendererPackageName: ir.rendererPackageName,
        rendererConfig: ir.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Ot.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return (e = Zu(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: ir.findFiberByHostInstance || wh,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var oi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!oi.isDisabled && oi.supportsFiber)
        try {
            (Qi = oi.inject(kh)), (St = oi);
        } catch {}
}
$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xh;
$e.createPortal = function (e, t) {
    var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Ol(t)) throw Error(C(200));
    return vh(e, t, null, n);
};
$e.createRoot = function (e, t) {
    if (!Ol(e)) throw Error(C(299));
    var n = !1,
        r = "",
        i = Ld;
    return (
        t != null &&
            (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = Tl(e, 1, !1, null, null, n, !1, r, i)),
        (e[Tt] = t.current),
        Rr(e.nodeType === 8 ? e.parentNode : e),
        new Ll(t)
    );
};
$e.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function"
            ? Error(C(188))
            : ((e = Object.keys(e).join(",")), Error(C(268, e)));
    return (e = Zu(t)), (e = e === null ? null : e.stateNode), e;
};
$e.flushSync = function (e) {
    return hn(e);
};
$e.hydrate = function (e, t, n) {
    if (!ao(t)) throw Error(C(200));
    return uo(null, e, t, !0, n);
};
$e.hydrateRoot = function (e, t, n) {
    if (!Ol(e)) throw Error(C(405));
    var r = (n != null && n.hydratedSources) || null,
        i = !1,
        o = "",
        s = Ld;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (i = !0),
            n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
        (t = _d(t, null, e, 1, n ?? null, i, !1, o, s)),
        (e[Tt] = t.current),
        Rr(e),
        r)
    )
        for (e = 0; e < r.length; e++)
            (n = r[e]),
                (i = n._getVersion),
                (i = i(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, i])
                    : t.mutableSourceEagerHydrationData.push(n, i);
    return new lo(t);
};
$e.render = function (e, t, n) {
    if (!ao(t)) throw Error(C(200));
    return uo(null, e, t, !1, n);
};
$e.unmountComponentAtNode = function (e) {
    if (!ao(e)) throw Error(C(40));
    return e._reactRootContainer
        ? (hn(function () {
              uo(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[Tt] = null);
              });
          }),
          !0)
        : !1;
};
$e.unstable_batchedUpdates = Al;
$e.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!ao(n)) throw Error(C(200));
    if (e == null || e._reactInternals === void 0) throw Error(C(38));
    return uo(e, t, n, !1, r);
};
$e.version = "18.2.0-next-9e3b772b8-20220608";
function Od() {
    if (
        !(
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
    )
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Od);
        } catch (e) {
            console.error(e);
        }
}
Od(), (_u.exports = $e);
var Ph = _u.exports,
    su = Ph;
(Uo.createRoot = su.createRoot), (Uo.hydrateRoot = su.hydrateRoot);
class lu {
    constructor(t, n) {
        Qe(this, "id");
        Qe(this, "username");
        Qe(this, "icon");
        Qe(this, "position");
        Qe(this, "balance");
        Qe(this, "properties");
        Qe(this, "isInJail");
        Qe(this, "jailTurnsRemaining");
        Qe(this, "getoutCards");
        Qe(this, "ready");
        Qe(this, "positions");
        (this.id = t),
            (this.username = n),
            (this.icon = -1),
            (this.position = 0),
            (this.balance = 1500),
            (this.properties = []),
            (this.isInJail = !1),
            (this.jailTurnsRemaining = 0),
            (this.getoutCards = 0),
            (this.ready = !1),
            (this.positions = { x: 0, y: 0 });
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
    get color() {
        switch (this.icon) {
            case 0:
                return "#E0115F";
            case 1:
                return "#4169e1";
            case 2:
                return "#50C878";
            case 3:
                return "#FFC000";
            case 5:
                return "#FF7F50";
            case 4:
            default:
                return "";
        }
    }
}
const Ch = "./assets/players-69e481c3.png",
    au = "./assets/chat-98a8e3f3.png",
    Eh = "./assets/chat_new-733d0bcc.png",
    Ah =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAjpQTFRFAAAA509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P509P/m/HAgAAAL50Uk5TABmAwNbYyZApXvX//H8BhTam5vvli0I8oud1DYTvgxQd+p4n/qwzukHITwLUXATfagnoeA/whhb3lB+hKq+9RMpRXwXhbQrqexDyiRj4liGkLLI5R81VA9liBuPrsdAONO0Hcodh/flD9OQg2xfDtZVxUPM1JKXs2s/CtIFvQKgM1x5GVxxokbniKEVWaX6Tp7gLEziInWQVVBIjIt6CWL96dO5OSUtmu7yrbhE9t5cajXfp0U0uJZySfGdSzLBMfx0AAATRSURBVHic7d35fxNFGAbwFxoK9AloFQtigUYDWCqI9aBYMAKCWiwoVpCzgEoFTzwIh1qqiOCJijfgfVRRvG//N7eNNWn2SrKTnbzv531+ntl5v712dnYmJdJoNKVkzNi6xDh7qR8/wYxjYgMsJzlpsgmHbcZQzovuGGP9+zGc8yNDxtom5NIYGVJnm5DLBZEhCduEXC6MDBlnm5BLUiEKqU4UEgCZclHT1FgyrcoQ4OLpl0S+bglprjoEmDFzloFKQxIHBGgY3xK91ODEAwFSl15moNqAxAUB0rPnGKjXN/FBnMy93MQzj3dihQCt89oMFO2VmCHAFfMXGCjbndghwJULrzJQeHEsQID2q68xUProWIEA1163yEDxhbEEAToWX2+g/HysQZwH0s4lBgAjsQhxsjT6ws1I7EKAGzKG7pG2IcCNy4zcI+1DgMTyFTIgwE0rV8mAADffcqsMCNC1+jYZEKB7zVoZEKeC2++QAXGy7k4hEKCup5J7ZA1CgLvWb5ABAe7euEkGBNgsBQKFKEQhCvHK9IKuWzhDphZ03coZ0rYt37XHp01vyXMfixDa3jHSs9OvSaaZA4QyO/5z7PRtgXs4QGjRvYnuLVv9fq6GIbiPAyQ0DmTXMiEQ9N0vBILdpSzTcoBgRwlr5ywg2POAEAgefEgIBNvCljW5QPBwyFozGwgeCX4BwAeCxsC3MowgeDRoKswJgplSINgrBYLlUiDJx4RA0NckBILHn7ALebK5ouxzj5L1PpIVF8T9pa04ezz39jCEYL/XVJgjBAc8dsGxhOCgeyrME4JDrqkwUwj2FU+FuUKwuGgqzBaCp6RA8LQUCCZKgSTnCYGg+xkhEHRtFwLBaiGQ/vyeJNaQuQUbkjhD6g8XDMAYMjDqrCRfyOZnRw3AFlL86M4V4nqvyBSSeq54AJ6Q9BHXADwhC90DsIRM8hiAI6T4KZcrpN/zFVxckOePVpQX3KMc897xzW41ftQEizFkwO/DKJhBjrf4teQFyb7o25IVJGjjFidI6qWAlowg6ZeDWjKCvBLYkg/k1eCWbCCvhWwu5wI5EXbynAnk9dAjdTwgrW+EtmQBSbwZ3pIDxH+CxQsSMMFiBdntsx2otiAn3+p/+53eIEgqU9qVrELePTTcL/uePyS9vsRr2YS8PzDS0/fUTiZ4glUjkPyusu4PfJr4Hr6qJcipgq5ryuxbU5CjBV1Pc4acKeia4gwRc+hYIQpRiEIUohCFKEQhClGIQhSiEIUoRCEKUYhCFKIQhZSdD8vL0pqFRIhCFFKlKOT/DIQPEkc6IkM+sk3IpT4y5GPbhFw+iQyZ9altw1DaA3Y6lZrPdtlWOL/qAZ/4W3o+b7ftyH5hwkF0+MvGrwbzOTCj0oIGK8rX35w143Dn2+8qg1SrngiZMzstA0K0ZFpSBoTo1Lk+GRCi739okAFxbpdnyvkTZrvawPT++JMMCNGqlcdlQIg2bdwvA0K04cjPMiBEk39plQFxKE2DMiBOTq4TAiH69UTA44vt4srLb7+nZECIWv7okAEZ+o80XTIgRGf/zMqAOA/Ie6fIgBDt/Ou0DAjRgvkJGRCitr//kQFxZi49B2VAKL98ZLsOA8ktH9muwkgmdCZlQIjWnrNdgUaj8c6/sjbbOODJyXwAAAAASUVORK5CYII=",
    Nh = "./assets/proprety-ed9394e1.png",
    jh = "./assets/settings-ec1fd821.png",
    Rh = "./assets/icon-96ad3b33.png",
    Il =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOoAAADYCAMAAADS+I/aAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGxQTFRFAAAAoM6mW7BnVK1hdLp+1enX7fbuRqdUL6BCOKJJNKFGHpw1qdOu6PPqPaRNI5054vDkKp8/KJ48mMqf0OfTvt3CkMeXuNq9isSSrdSyf7+IeryDbbd3YbJtMaFE3+/iyePNSapYrdWyxuHJWHk5egAAACR0Uk5TAP//////IP///////3D//9D/////////////////////////OqkGVgAABKFJREFUeJzt3dFW4jAUheGiAm3RFCqIjgIq7/+Og+OoUJImTXLaHdn/tXblW+iyx5SQZUy00dX1zXjoRfTRZJoXRTm7HXod8t2pQn1UjYZeiXTz8lP6+63jxZdUqfp+6NVItqzVUb/ZuqrUSfVDl+9WDkmtvGvrWXNl9WOHb0+I+lSdL23RwZoOdaSRHqx/nC+QDPWh1i/O3ZoK9c/CtLr8xvESiVCfc/PyXK1pUF9apM7WJKibbfsC8xeXq6RAvS5tK3SyJkCdWqVKbTf268BTJ9PCvkKlSrsVnXq3dZK6vK7g1J2r9PC6XlmuhU0d185SuxWa+qq97TVbr1uvhkxdGW57Pa3A1Kez8dRufWu5Hi511PU1tVlhqfc+UqWKqfGKqNRHP+nBalwuKNU8njpYJ/prYlJvWoc2m7XQWyGptqHNar3TXRWReuUwyrRbS50VkGofTx2s8wSoE5fx1MuKRr0rOtzgt1kXO3Dq3H1os1nzphWLerynGFzdeIgAirr0vUXStzi1IlE7D2226iUodd1tEHepOrbiUN/jSw+v6ysgVb+nGNxsD0e9l5Eefoa/rSBU7/HUwbqCogaMp+5WCGrQeOpgXcNQA8dTe7M1CPVKWnp4XZ8gqG8xhjZb1fvwVMc9xeCq26GpscZTe9XI5avkpLuyL+nB6vJFYtJx3p/ULSnpsvv+k3RC0ujjaYRkpOePvAIkIr2VGmWCkpB67ilKJyA1PfI6dPGlokNbSNGlwkNbQLGl7Y+8DlpkaQ9Dm3dxpRH2FOWKKo2ypyhWROjX+xRRiyeNt6coVDRp1D1FkWJJl6g3Dj9Fku4hb/BPiyMV2FOMXxSp7n2KeMWQCu0pxi6CFHVoaxYuhR3amgVLcYe2ZqFS4KGtWaA0+EHQHguTQg9tzYKk2ENbswDoBHxoa+Yvnfe2pxgpb+kOfmhr5isdp/NH5itP6Svi/pMlP2nzGJ0k8pKmMbQ1W9phZ2HuKVo7fqjWMdA9RXtVV6vgg6DS/TxU61Qy46mu74dqXUpnPNX2/0FTlxIaT/U5W5H3FB3796CpvaTGU1NO1rTGU2MfD9W219+DoNJVlpNq5z0+CCpd++mt+HuKXapbrAnsKXbKfHprCnuK3TJZk9hT7Jj+pFqR9ykOnu6k2kT2FDt3fqJpKnuK3WtaEx5PreXPx9LnX/ZX5rTjE02TH9os/VjF36c4eF8nmqa0e+rb9uVSpJ9WxLcFSVSvsseLeFGVKm4uh7rJ1r/6T+pP5eHGv6c3FQ9dtcuyuaq35pL6B0xhbvb5H4n9vbmHt1R+wPN8+mbs5VU/o5+2SuOuMXffvDC3T+F1reJ8QNkG//e1jPRxRyP8caA+OwjQr1t86sJw9iyppJKKFamkkkoqWKSSSiqpYJFKKqmkgkUqqaSSChappJJKKlikkkoqqWCRSiqppIJFKqmkkgoWqaSSSipYpJJKKqlgkUoqqaSCRSqppJIKFqmkkkoqWKSSSiqpYJFKKqmkgkUqqaSSChappJL6QcU/dTQWNYFDR8s40iyDp27PPvPDt32FfcDqdhpLmmXjTZG3HA09cErzmTWX3V/etxxj46OriAAAAABJRU5ErkJggg==",
    Fl =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOoAAADYBAMAAAAXCGLbAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAA9QTFRFAAAAswAAswAAswAAswAAZtGxUwAAAAV0Uk5TAP8gcNCNz+2CAAACfklEQVR4nO3di1HDQAyEYQwUEAUKgA5IB9B/U+QJse8hXbx7B5lVAfrmzxjM+Aw8PPyzmcz6o49mtumu7vZq99jnA9o91k7TF53Oat9Ys2qsJYNAp59t+ViO6q2jqNPVumwsRXX3MdRpti8Xy1D9hQR1WizMxBLUwEa8ukzNxeLVdGO6Eq6+Z9QkFq0+ZdB0J1rNokksWE0vpexSsFpAl7FYtZS63IpVi+giFqqWUxdroWoFncci1VrqfC9SraK25aj1VLM3iuqg9sJQvVSzD4LqovaKV3N3uOV8otX8Ha60G6V+hdTLtwqQ6l9Ks+UgNYheYjFqNPWyHaOG0XMsRI2nntdD1Ab0FItQW1JP+xFqE3qMBahtqUcAoDaih9j1amvqQVivNqP72NVqe+qeWKs+3oDaZq26u0XNTBN6y+e7XkWhTSostUmFoS0qLrVFxaENKjC1QQWicRWZGleRaFiFpoZVKBpVsalRFYsG1d0I9RmMxlQ0GlLBl1JQhaMRFZ8aUfFoQCWkBlQC6quMVF9loK5KSXVVCuqpnFRP5aCOGnkgC1fhd7iQykKrKulSclQaWlN5qTWVh1ZehCKmVmKZaDGWmlqM5aKFWHJq+K0v8ORi6anBF6Hgk8Z2SE1jY0eOa2cZGztyXD0DPl/z3yAhzYjUeWw39Dq2X+p1bEf0N7Znau3AnzojUstn4OQZkVo6FqbPiNT8SWmHkUpXR1xNxnskUJnNkC+d5AfUQQ8RGZdX4FeHxjwHvxd166NSpUqVKlWqVKlSpUqVKlWqVKlSpUqVKlWqVKlSpUqVKlWqVKlSpUqVKlWqVKl/UA39hfo7USMo/CPu/88dCvMNgwpEBhudalAAAAAASUVORK5CYII=",
    Th = "./assets/rails-b5a8f288.png",
    _h = "./assets/elects-0ca4f3b8.png",
    Lh = "./assets/water-7bf83b59.png";
function Wi(e) {
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
function zn({ street: e, utility: t, railroad: n }) {
    return e !== void 0
        ? l.jsx(Oh, { args: e })
        : t !== void 0
        ? l.jsx(Fh, { args: t })
        : n !== void 0
        ? l.jsx(Ih, { args: n })
        : l.jsx(l.Fragment, {});
}
function Oh({ args: e }) {
    const t = Wi(e.group);
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
function Ih({ args: e }) {
    return l.jsxs("div", {
        className: "street-card",
        children: [
            l.jsxs("div", {
                "data-clear": !0,
                children: [
                    l.jsx("img", {
                        "data-type": "rail",
                        src: Th.replace("/public", ""),
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
function Fh({ args: e }) {
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
                                    ? _h.replace("/public", "")
                                    : Lh.replace("/public", ""),
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
const Mh = [
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
    bh = [
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
    zh = [
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
    Bh = [
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
    un = { properties: Mh, tiles: bh, chance: zh, communitychest: Bh };
function uu(e) {
    const t = new Map(un.properties.map((o) => [o.posistion ?? 0, o]));
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
                          ? l.jsx(zn, { railroad: n })
                          : r === "Utilities"
                          ? l.jsx(zn, { utility: n })
                          : l.jsx(zn, { street: n }),
              }));
}
const Dh = _.forwardRef((e, t) => {
        const n = new Map(un.properties.map((v) => [v.posistion ?? 0, v])),
            r = e.players.filter((v) => v.id === e.socket.id)[0];
        if (r === void 0)
            return l.jsx(l.Fragment, {
                children: "Could not read local player!",
            });
        _.useImperativeHandle(t, () => ({
            clickedOnBoard(v) {
                m(-1), u(""), p([]), o(v);
            },
        }));
        const [i, o] = _.useState(-1),
            [s, u] = _.useState(""),
            [a, p] = _.useState([]),
            [g, m] = _.useState(-1);
        function y() {
            m(-1), o(-1);
            const v = Array.from(n.values()).filter(
                    (d) => d.group != "Special"
                ),
                E = v.map((d) => [d.name, d.posistion]),
                x = v.map((d) => d.posistion.toString()),
                D = [];
            for (const d of x) d.includes(s) && D.push(parseInt(d));
            for (const d of E)
                d[0].toLowerCase().includes(s.toLowerCase()) && D.push(d[1]);
            p(D);
        }
        return (
            _.useEffect(y, [s]),
            l.jsxs(l.Fragment, {
                children: [
                    l.jsx("h3", {
                        style: { textAlign: "center" },
                        children: "Propreties",
                    }),
                    l.jsx("input", {
                        type: "text",
                        onChange: (v) => u(v.currentTarget.value),
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
                                ? a.map((v, E) => {
                                      var x, D;
                                      return l.jsx(l.Fragment, {
                                          children:
                                              g === v
                                                  ? l.jsx("center", {
                                                        children: l.jsx(
                                                            uu,
                                                            {
                                                                style: {
                                                                    cursor: "pointer",
                                                                    marginBottom: 25,
                                                                    marginTop: 10,
                                                                },
                                                                posistion: v,
                                                                OnClick: () => {
                                                                    m(-1);
                                                                },
                                                            },
                                                            E
                                                        ),
                                                    })
                                                  : l.jsxs(
                                                        "div",
                                                        {
                                                            onClick: () => m(v),
                                                            className:
                                                                "proprety-nav",
                                                            children: [
                                                                l.jsx("i", {
                                                                    className:
                                                                        "box",
                                                                    style: {
                                                                        backgroundColor:
                                                                            Wi(
                                                                                ((x =
                                                                                    n.get(
                                                                                        v
                                                                                    )) ==
                                                                                null
                                                                                    ? void 0
                                                                                    : x.group) ??
                                                                                    ""
                                                                            ),
                                                                    },
                                                                }),
                                                                l.jsx("h3", {
                                                                    children:
                                                                        ((D =
                                                                            n.get(
                                                                                v
                                                                            )) ==
                                                                        null
                                                                            ? void 0
                                                                            : D.name) ??
                                                                        "",
                                                                }),
                                                            ],
                                                        },
                                                        E
                                                    ),
                                      });
                                  })
                                : i === -1
                                ? r.properties.map((v, E) => {
                                      var x;
                                      return l.jsxs(
                                          "div",
                                          {
                                              onClick: () => o(v.posistion),
                                              className: "proprety-nav",
                                              children: [
                                                  l.jsx("i", {
                                                      className: "box",
                                                      style: {
                                                          backgroundColor: Wi(
                                                              v.group
                                                          ),
                                                      },
                                                  }),
                                                  l.jsx("h3", {
                                                      children:
                                                          ((x = n.get(
                                                              v.posistion
                                                          )) == null
                                                              ? void 0
                                                              : x.name) ?? "",
                                                  }),
                                                  l.jsx("div", {
                                                      children:
                                                          v.count == "h"
                                                              ? l.jsx("img", {
                                                                    src: Fl.replace(
                                                                        "public/",
                                                                        ""
                                                                    ),
                                                                    alt: "",
                                                                })
                                                              : typeof v.count ==
                                                                    "number" &&
                                                                v.count > 0
                                                              ? l.jsxs(
                                                                    l.Fragment,
                                                                    {
                                                                        children:
                                                                            [
                                                                                l.jsx(
                                                                                    "p",
                                                                                    {
                                                                                        children:
                                                                                            v.count,
                                                                                    }
                                                                                ),
                                                                                l.jsx(
                                                                                    "img",
                                                                                    {
                                                                                        src: Il.replace(
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
                                          E
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
                                          children: l.jsx(uu, {
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
    Is = "./assets/roll-893dc331.png",
    Uh = _.forwardRef((e, t) => {
        const n = e.players.filter((a) => a.id === e.socket.id)[0],
            r = new Map(un.properties.map((a) => [a.posistion ?? 0, a])),
            [i, o] = _.useState(),
            [s, u] = _.useState();
        return (
            _.useEffect(() => {
                u(JSON.parse(document.cookie).settings);
            }, [document.cookie]),
            _.useImperativeHandle(t, () => ({
                clickdOnPlayer(a) {
                    for (const p of e.players) p.id === a && o(p);
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
                                              : i.properties.map((a, p) => {
                                                    var g;
                                                    return l.jsxs(
                                                        "div",
                                                        {
                                                            onClick: () => {
                                                                o(void 0),
                                                                    e.clickedOnPlayer(
                                                                        a.posistion
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
                                                                            Wi(
                                                                                a.group
                                                                            ),
                                                                    },
                                                                }),
                                                                l.jsx("h3", {
                                                                    children:
                                                                        ((g =
                                                                            r.get(
                                                                                a.posistion
                                                                            )) ==
                                                                        null
                                                                            ? void 0
                                                                            : g.name) ??
                                                                        "",
                                                                }),
                                                                l.jsx("div", {
                                                                    children:
                                                                        a.count ==
                                                                        "h"
                                                                            ? l.jsx(
                                                                                  "img",
                                                                                  {
                                                                                      src: Fl.replace(
                                                                                          "public/",
                                                                                          ""
                                                                                      ),
                                                                                      alt: "",
                                                                                  }
                                                                              )
                                                                            : typeof a.count ==
                                                                                  "number" &&
                                                                              a.count >
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
                                                                                                          a.count,
                                                                                                  }
                                                                                              ),
                                                                                              l.jsx(
                                                                                                  "img",
                                                                                                  {
                                                                                                      src: Il.replace(
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
                                                        p
                                                    );
                                                }),
                                      ],
                                  })
                                : l.jsx("div", {
                                      className: "playersInfos",
                                      children: e.players.map((a, p) =>
                                          l.jsx(l.Fragment, {
                                              children: l.jsxs(
                                                  "div",
                                                  {
                                                      className: "playerInfo",
                                                      style:
                                                          s !== void 0 &&
                                                          s.accessibility[4] ===
                                                              !0
                                                              ? {
                                                                    backgroundColor:
                                                                        a.color,
                                                                }
                                                              : {},
                                                      onClick: () => {
                                                          const g =
                                                              document.querySelector(
                                                                  `div.player[player-id="${a.id}"]`
                                                              );
                                                          (g.style.animation =
                                                              "spin2 1s cubic-bezier(.21, 1.57, .55, 1) infinite"),
                                                              setTimeout(() => {
                                                                  g.style.animation =
                                                                      "";
                                                              }, 1 * 1e3);
                                                      },
                                                      onDoubleClick: () => {
                                                          o(a);
                                                      },
                                                      children: [
                                                          l.jsxs("p", {
                                                              children: [
                                                                  s != null &&
                                                                  s
                                                                      .accessibility[2]
                                                                      ? `[${a.id}]`
                                                                      : "",
                                                                  " ",
                                                                  a.username,
                                                              ],
                                                          }),
                                                          a.id === e.currentTurn
                                                              ? l.jsx("img", {
                                                                    src: Is.replace(
                                                                        "public/",
                                                                        ""
                                                                    ),
                                                                })
                                                              : l.jsx(
                                                                    l.Fragment,
                                                                    {}
                                                                ),
                                                          a.getoutCards > 0
                                                              ? l.jsx("p", {
                                                                    className:
                                                                        "orange",
                                                                    children:
                                                                        a.getoutCards,
                                                                })
                                                              : l.jsx(
                                                                    l.Fragment,
                                                                    {}
                                                                ),
                                                          l.jsx("p", {
                                                              children:
                                                                  a.balance,
                                                          }),
                                                          l.jsx("p", {
                                                              children:
                                                                  a.properties
                                                                      .length,
                                                          }),
                                                      ],
                                                  },
                                                  p
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
    });
function or(e) {
    const [t, n] = _.useState(e.defaultValue ?? 0);
    return l.jsxs("div", {
        className: "slider-component",
        children: [
            l.jsx("input", {
                type: "range",
                onChange: (r) => {
                    var i;
                    (i = e.onChange) == null || i.call(e, r),
                        n(parseFloat(r.currentTarget.value));
                },
                defaultValue: e.defaultValue ?? 50,
                step: e.step ?? 1,
                max: e.max ?? 100,
                min: e.min ?? 0,
            }),
            t.toFixed(e.fixedNum ?? 0),
            e.suffix,
        ],
    });
}
function qh() {
    var n, r, i, o, s, u, a, p, g;
    const e = JSON.parse(document.cookie),
        t = {
            gameEngine: _.useState("2d"),
            numbers: [
                _.useState(
                    ((n = e.settings) == null ? void 0 : n.accessibility[0]) ??
                        45
                ),
                _.useState(
                    ((r = e.settings) == null ? void 0 : r.accessibility[1]) ??
                        5
                ),
                _.useState(
                    ((i = e.settings) == null ? void 0 : i.audio[0]) ?? 100
                ),
                _.useState(
                    ((o = e.settings) == null ? void 0 : o.audio[1]) ?? 100
                ),
                _.useState(
                    ((s = e.settings) == null ? void 0 : s.audio[2]) ?? 25
                ),
            ],
            booleans: [
                _.useState(
                    ((u = e.settings) == null ? void 0 : u.accessibility[2]) ??
                        !1
                ),
                _.useState(
                    ((a = e.settings) == null ? void 0 : a.accessibility[3]) ??
                        !1
                ),
                _.useState(
                    ((p = e.settings) == null ? void 0 : p.accessibility[4]) ??
                        !1
                ),
                _.useState(
                    ((g = e.settings) == null ? void 0 : g.notifications) ?? !1
                ),
            ],
        };
    return (
        _.useEffect(() => {
            const m = JSON.parse(document.cookie),
                y = {
                    gameEngine: t.gameEngine[0],
                    accessibility: [
                        t.numbers[0][0],
                        t.numbers[1][0],
                        t.booleans[0][0],
                        t.booleans[1][0],
                        t.booleans[2][0],
                    ],
                    audio: [t.numbers[2][0], t.numbers[3][0], t.numbers[4][0]],
                    notifications: t.booleans[3][0],
                };
            document.cookie = JSON.stringify({ login: m.login, settings: y });
        }, [
            t.gameEngine[0],
            ...t.numbers.map((m) => m[0]),
            ,
            ...t.booleans.map((m) => m[0]),
        ]),
        l.jsxs(l.Fragment, {
            children: [
                l.jsx("h3", {
                    style: { textAlign: "center" },
                    children: "Settings",
                }),
                l.jsxs("div", {
                    className: "scroll",
                    children: [
                        l.jsxs("div", {
                            className: "settingsItem",
                            children: [
                                l.jsx("p", { children: "Game Engine " }),
                                l.jsx("div", {
                                    children: l.jsxs("select", {
                                        name: "",
                                        id: "",
                                        children: [
                                            l.jsx("option", { children: "2D" }),
                                            l.jsx("option", { children: "3D" }),
                                        ],
                                    }),
                                }),
                            ],
                        }),
                        l.jsxs("p", {
                            style: {
                                marginBlock: 0,
                                marginInline: 10,
                                fontSize: 12,
                                opacity: 0.5,
                            },
                            children: ["3d isnt developed yet", " "],
                        }),
                        l.jsx("br", {}),
                        l.jsx("hr", {}),
                        l.jsx("h2", { children: "Accessibility" }),
                        l.jsxs("div", {
                            children: [
                                l.jsxs("div", {
                                    className: "settingsItem",
                                    children: [
                                        l.jsx("p", {
                                            children: "Rotation Speed ",
                                        }),
                                        l.jsx(or, {
                                            step: 90 / 8,
                                            min: 0,
                                            max: 180,
                                            defaultValue: t.numbers[0][0],
                                            onChange: (m) => {
                                                t.numbers[0][1](
                                                    parseFloat(
                                                        m.currentTarget.value
                                                    )
                                                );
                                            },
                                            fixedNum: 2,
                                            suffix: " deg",
                                        }),
                                    ],
                                }),
                                l.jsxs("div", {
                                    className: "settingsItem",
                                    children: [
                                        l.jsx("p", {
                                            children: "Scale Speed ",
                                        }),
                                        l.jsx(or, {
                                            step: 1,
                                            min: 1,
                                            max: 10,
                                            defaultValue: t.numbers[1][0],
                                            onChange: (m) => {
                                                t.numbers[1][1](
                                                    parseFloat(
                                                        m.currentTarget.value
                                                    )
                                                );
                                            },
                                            fixedNum: 0,
                                        }),
                                    ],
                                }),
                                l.jsxs("div", {
                                    className: "settingsItem",
                                    children: [
                                        l.jsx("p", {
                                            children: "Show Users Id ",
                                        }),
                                        l.jsx("div", {
                                            children: l.jsx("input", {
                                                defaultChecked:
                                                    t.booleans[0][0],
                                                type: "checkbox",
                                                onChange: (m) => {
                                                    t.booleans[0][1](
                                                        m.currentTarget.checked
                                                    );
                                                },
                                            }),
                                        }),
                                    ],
                                }),
                                l.jsxs("div", {
                                    className: "settingsItem",
                                    children: [
                                        l.jsx("p", {
                                            children: "Show Users Mouse ",
                                        }),
                                        l.jsx("div", {
                                            children: l.jsx("input", {
                                                defaultChecked:
                                                    t.booleans[1][0],
                                                type: "checkbox",
                                                onChange: (m) => {
                                                    t.booleans[1][1](
                                                        m.currentTarget.checked
                                                    );
                                                },
                                            }),
                                        }),
                                    ],
                                }),
                                l.jsxs("div", {
                                    className: "settingsItem",
                                    children: [
                                        l.jsx("p", {
                                            children: "Add Colors to Users ",
                                        }),
                                        l.jsx("div", {
                                            children: l.jsx("input", {
                                                defaultChecked:
                                                    t.booleans[2][0],
                                                type: "checkbox",
                                                onChange: (m) => {
                                                    t.booleans[2][1](
                                                        m.currentTarget.checked
                                                    );
                                                },
                                            }),
                                        }),
                                    ],
                                }),
                                l.jsx("br", {}),
                                l.jsx("hr", {}),
                            ],
                        }),
                        l.jsx("h2", { children: "Audio" }),
                        l.jsxs("div", {
                            children: [
                                l.jsxs("div", {
                                    className: "settingsItem",
                                    children: [
                                        l.jsx("p", {
                                            children: "Master Audio ",
                                        }),
                                        l.jsx(or, {
                                            step: 1,
                                            min: 0,
                                            max: 100,
                                            defaultValue: t.numbers[2][0],
                                            fixedNum: 0,
                                            suffix: "%",
                                            onChange: (m) => {
                                                t.numbers[2][1](
                                                    parseFloat(
                                                        m.currentTarget.value
                                                    )
                                                );
                                            },
                                        }),
                                    ],
                                }),
                                l.jsxs("div", {
                                    className: "settingsItem",
                                    children: [
                                        l.jsx("p", { children: "SFX Audio " }),
                                        l.jsx(or, {
                                            step: 1,
                                            min: 0,
                                            max: 100,
                                            defaultValue: t.numbers[3][0],
                                            fixedNum: 0,
                                            suffix: "%",
                                            onChange: (m) => {
                                                t.numbers[3][1](
                                                    parseFloat(
                                                        m.currentTarget.value
                                                    )
                                                );
                                            },
                                        }),
                                    ],
                                }),
                                l.jsxs("div", {
                                    className: "settingsItem",
                                    children: [
                                        l.jsx("p", {
                                            children: "Music Audio ",
                                        }),
                                        l.jsx(or, {
                                            step: 1,
                                            min: 0,
                                            max: 100,
                                            defaultValue: t.numbers[4][0],
                                            fixedNum: 0,
                                            suffix: "%",
                                            onChange: (m) => {
                                                t.numbers[4][1](
                                                    parseFloat(
                                                        m.currentTarget.value
                                                    )
                                                );
                                            },
                                        }),
                                    ],
                                }),
                                l.jsx("br", {}),
                                l.jsx("hr", {}),
                            ],
                        }),
                        l.jsx("h2", { children: "Notifications" }),
                        l.jsx("div", {
                            children: l.jsxs("div", {
                                className: "settingsItem",
                                children: [
                                    l.jsx("p", {
                                        children: "Notify Balance Movements ",
                                    }),
                                    l.jsx("div", {
                                        children: l.jsx("input", {
                                            defaultChecked: t.booleans[3][0],
                                            type: "checkbox",
                                            onChange: (m) => {
                                                t.booleans[3][1](
                                                    m.currentTarget.checked
                                                );
                                            },
                                        }),
                                    }),
                                ],
                            }),
                        }),
                    ],
                }),
            ],
        })
    );
}
const Vh = _.forwardRef((e, t) => {
    const [n, r] = _.useState(0),
        [i, o] = _.useState([]);
    function s() {
        a(e.players);
    }
    const [u, a] = _.useState(e.players);
    _.useImperativeHandle(t, () => ({
        addMessage(m) {
            if ((o((y) => [...y, m]), n !== 2)) {
                const y = document.getElementById("chatIconChange"),
                    v = y.querySelector("img");
                (v.style.animation =
                    "spin3 2s cubic-bezier(.68,.05,.49,.95) infinite"),
                    (v.src = Eh.replace("/public", "")),
                    (y.onclick = () => {
                        (v.src = au.replace("/public", "")),
                            (v.style.animation = ""),
                            r(2),
                            (y.onclick = () => {
                                r(2);
                            });
                    });
            }
        },
        reRenderPlayerList: s,
        clickedOnBoard: (m) => {
            r(1),
                requestAnimationFrame(() => {
                    var y;
                    (y = p.current) == null || y.clickedOnBoard(m);
                });
        },
    }));
    const p = _.useRef(null),
        g = _.useRef(null);
    return (
        _.useEffect(s, [
            e.players.map((m) => m.properties),
            e.players.map((m) => m.balance),
        ]),
        _.useEffect(() => {
            const m = (y) => {
                const v = parseInt(y.key);
                if (!isNaN(v)) {
                    const E = document.activeElement;
                    (E === null || E.tagName !== "INPUT") && r(v - 1);
                }
            };
            return (
                document.addEventListener("keydown", m),
                () => {
                    document.removeEventListener("keydown", m);
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
                            src: Rh.replace("public/", ""),
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
                                        src: Ch.replace("public/", ""),
                                        alt: "",
                                    }),
                                }),
                                l.jsx("div", {
                                    "data-selected": n == 1,
                                    onClick: () => r(1),
                                    "data-tooltip-hover": "propreties",
                                    className: "button",
                                    children: l.jsx("img", {
                                        src: Nh.replace("public/", ""),
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
                                        src: au.replace("public/", ""),
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
                                        src: jh.replace("public/", ""),
                                        alt: "",
                                    }),
                                }),
                                l.jsx("div", {
                                    "data-tooltip": "leave",
                                    className: "button color",
                                    "data-tooltip-hover": "leave",
                                    onClick: () => {
                                        document.location.reload();
                                    },
                                    children: l.jsx("img", {
                                        src: Ah.replace("public/", ""),
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
                            ? l.jsx(Dh, {
                                  ref: p,
                                  players: u,
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
                                                  children: i.map((m, y) =>
                                                      l.jsxs(
                                                          "div",
                                                          {
                                                              className:
                                                                  "message",
                                                              children: [
                                                                  l.jsxs("p", {
                                                                      children:
                                                                          [
                                                                              m.from,
                                                                              ":",
                                                                          ],
                                                                  }),
                                                                  l.jsx("p", {
                                                                      children:
                                                                          m.message,
                                                                  }),
                                                              ],
                                                          },
                                                          y
                                                      )
                                                  ),
                                              }),
                                              l.jsx("input", {
                                                  placeholder:
                                                      "Type Message Here...",
                                                  type: "text",
                                                  onKeyDown: (m) => {
                                                      if (
                                                          m.which === 13 &&
                                                          m.currentTarget.value
                                                              .length > 0
                                                      ) {
                                                          const y =
                                                              m.currentTarget
                                                                  .value;
                                                          e.socket.emit(
                                                              "message",
                                                              y
                                                          ),
                                                              (m.currentTarget.value =
                                                                  "");
                                                      }
                                                  },
                                              }),
                                          ],
                                      }),
                                  ],
                              })
                            : n == 3
                            ? l.jsx(qh, {})
                            : l.jsx(Uh, {
                                  ref: g,
                                  clickedOnPlayer: (m) => {
                                      r(1),
                                          requestAnimationFrame(() => {
                                              var y;
                                              (y = p.current) == null ||
                                                  y.clickedOnBoard(m);
                                          });
                                  },
                                  players: u,
                                  socket: e.socket,
                                  currentTurn: e.currentTurn,
                              }),
                }),
            ],
        })
    );
});
function cu({ chance: e, chest: t }) {
    return e !== void 0
        ? l.jsx(Jh, { args: e })
        : t !== void 0
        ? l.jsx($h, { args: t })
        : l.jsx(l.Fragment, {});
}
function Jh({ args: e }) {
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
function $h({ args: e }) {
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
const Hh = _.forwardRef((e, t) => {
        const n = new Map(un.properties.map((w) => [w.posistion ?? 0, w])),
            [r, i] = _.useState(!1),
            [o, s] = _.useState(!1),
            [u, a] = _.useState(!1),
            [p, g] = _.useState(!1),
            [m, y] = _.useState(0),
            [v, E] = _.useState(1),
            [x, D] = _.useState();
        _.useEffect(() => {
            const w = setInterval(() => {
                D(JSON.parse(document.cookie).settings);
            }, 200);
            return () => {
                clearInterval(w);
            };
        }, [document.cookie]);
        const [d, f] = _.useState({
                cardCost: -1,
                hotelsCost: -1,
                housesCost: -1,
                multpliedrent: [-1, -1, -1, -1, -1],
                rent: -1,
                rentWithColorSet: -1,
                title: "deafult",
                type: "electricity",
            }),
            [h, S] = _.useState("Street");
        function c(w, I) {
            const k = document.getElementById("dice-panel");
            var $ = !0;
            function le() {
                var de = "./c";
                const H = Math.floor(Math.random() * 6) + 1,
                    ge = Math.floor(Math.random() * 6) + 1;
                k.innerHTML = `
                <img src="${de}${H}.png" />
                <img src="${de}${ge}.png" />
                
                `;
            }
            function ae() {
                if ($) le(), requestAnimationFrame(ae);
                else {
                    var de = "./c";
                    k.innerHTML = `
                <img src="${de}${w}.png" />
                <img src="${de}${I}.png" />
                `;
                }
            }
            setTimeout(() => {
                $ = !1;
            }, 1e3),
                requestAnimationFrame(ae);
        }
        function R(w) {
            const I = document.querySelector("img#moneyAnimations");
            if (I === null) return;
            const k = I;
            k.setAttribute("data-anim", "0"),
                requestAnimationFrame(() => {
                    k.setAttribute("data-anim", w.toString()),
                        setTimeout(() => {
                            k.setAttribute("data-anim", "0");
                        }, 1e3);
                });
        }
        function O() {
            const w = JSON.parse(document.cookie).settings;
            let I = new Audio("./card.mp3");
            (I.volume =
                (((w == null ? void 0 : w.audio[1]) ?? 100) / 100) *
                (((w == null ? void 0 : w.audio[0]) ?? 100) / 100)),
                (I.loop = !1),
                I.play();
        }
        return (
            _.useImperativeHandle(t, () => ({
                diceResults: (w) => {
                    c(...w.l),
                        i(!0),
                        setTimeout(() => {
                            i(!1), w.onDone();
                        }, w.time);
                },
                freeDice: () => {
                    const w = document.getElementById("dice-panel");
                    (w.innerHTML = ""), s(!1);
                },
                setStreet: (w) => {
                    const I = e.players.filter(
                            (de) => de.id === e.socket.id
                        )[0],
                        k = n.get(w.location);
                    if (
                        k &&
                        w.location !== -1 &&
                        w.location < 40 &&
                        w.location >= 0
                    ) {
                        let de = function (H, ge, ke) {
                            function N() {
                                const L = JSON.parse(document.cookie).settings;
                                let B = new Audio("./click.mp3");
                                (B.volume =
                                    (((L == null ? void 0 : L.audio[1]) ??
                                        100) /
                                        100) *
                                    (((L == null ? void 0 : L.audio[0]) ??
                                        100) /
                                        100)),
                                    (B.loop = !1),
                                    B.play();
                            }
                            function j() {
                                if (H) {
                                    const L = document.querySelector(
                                        "div#advanced-responses"
                                    );
                                    if (L) {
                                        let B = function (T) {
                                            switch (T) {
                                                case "h":
                                                    return 5;
                                                default:
                                                    return T;
                                            }
                                        };
                                        const U = n.get(ge);
                                        if (!U) return;
                                        const V = L;
                                        for (; V.firstChild; )
                                            V.removeChild(V.firstChild);
                                        const P = Array.from(
                                                new Map(
                                                    I.properties.map((T, z) => [
                                                        z,
                                                        T,
                                                    ])
                                                ).entries()
                                            ).filter(
                                                (T) =>
                                                    T[1].posistion ===
                                                    w.location
                                            )[0][0],
                                            A = B(I.properties[P].count);
                                        for (let T = A + 1; T < 6; T++) {
                                            const z =
                                                document.createElement(
                                                    "button"
                                                );
                                            T === 5
                                                ? ((z.innerHTML = "buy hotel"),
                                                  (z.disabled =
                                                      T !== A + 1 ||
                                                      (U.ohousecost ?? 0) >
                                                          (e.players.filter(
                                                              (te) =>
                                                                  te.id ===
                                                                  e.socket.id
                                                          )[0].balance ?? 0)),
                                                  (z.onclick = () => {
                                                      w.onResponse(
                                                          "advance-buy",
                                                          { state: T, money: 1 }
                                                      ),
                                                          a(!1);
                                                  }))
                                                : ((z.innerHTML = `buy ${T} house${
                                                      T > 1 ? "s" : ""
                                                  }`),
                                                  (z.onclick = () => {
                                                      w.onResponse(
                                                          "advance-buy",
                                                          {
                                                              state: T,
                                                              money: T - A,
                                                          }
                                                      ),
                                                          a(!1);
                                                  }),
                                                  (z.disabled =
                                                      (T - A) *
                                                          (U.housecost ?? 0) >
                                                      (e.players.filter(
                                                          (te) =>
                                                              te.id ===
                                                              e.socket.id
                                                      )[0].balance ?? 0))),
                                                V.appendChild(z);
                                        }
                                        const M =
                                            document.createElement("button");
                                        (M.innerHTML = "CONTINUE"),
                                            (M.onclick = () => {
                                                N(),
                                                    w.onResponse("nothing", {}),
                                                    a(!1);
                                            }),
                                            V.appendChild(M);
                                    } else requestAnimationFrame(j);
                                } else {
                                    const L = document.querySelector(
                                        "button#card-response-yes"
                                    );
                                    L
                                        ? ((L.onclick = () => {
                                              ke !== void 0
                                                  ? w.onResponse(
                                                        "special_action",
                                                        { rolls: ke.rolls }
                                                    )
                                                  : w.onResponse("buy", {}),
                                                  a(!1);
                                          }),
                                          (document.querySelector(
                                              "button#card-response-no"
                                          ).onclick = () => {
                                              N(),
                                                  w.onResponse("nothing", {}),
                                                  a(!1);
                                          }))
                                        : requestAnimationFrame(j);
                                }
                            }
                            return j;
                        };
                        var $ = !1,
                            le = !1,
                            ae = 0;
                        for (const H of I.properties)
                            !$ &&
                                H.posistion === w.location &&
                                (($ = !0), (ae = H.count));
                        for (const H of e.players)
                            for (const ge of H.properties)
                                ge.posistion === w.location &&
                                    H.id != I.id &&
                                    (le = !0);
                        if (k.group === "Special")
                            w.onResponse("nothing", {}), a(!1);
                        else if (k.group === "Utilities")
                            if ($) w.onResponse("nothing", {});
                            else if (le) {
                                w.onResponse("someones", {}), a(!1);
                                return;
                            } else {
                                S("Utilities");
                                const H = {
                                    cardCost: k.price ?? -1,
                                    title: k.name ?? "error",
                                    type: k.id.includes("water")
                                        ? "water"
                                        : "electricity",
                                };
                                f(H),
                                    g(!1),
                                    O(),
                                    a(!0),
                                    requestAnimationFrame(
                                        de(!1, w.location, { rolls: w.rolls })
                                    );
                            }
                        else if (k.group === "Railroad")
                            if ($) w.onResponse("nothing", {});
                            else if (le) {
                                w.onResponse("someones", {}), a(!1);
                                return;
                            } else {
                                S("Railroad");
                                const H = {
                                    cardCost: k.price ?? -1,
                                    title: k.name ?? "error",
                                };
                                f(H),
                                    O(),
                                    a(!0),
                                    requestAnimationFrame(de(!1, w.location));
                            }
                        else {
                            if (
                                !$ &&
                                I.balance -
                                    ((k == null ? void 0 : k.price) ?? 0) <
                                    0
                            ) {
                                a(!1), w.onResponse("nothing", {});
                                return;
                            }
                            if (!$) {
                                if (le) {
                                    w.onResponse("someones", {}), a(!1);
                                    return;
                                }
                            }
                            if ($ && ae === "h") {
                                a(!1), w.onResponse("nothing", {});
                                return;
                            }
                            S("Street");
                            const H = {
                                cardCost: k.price ?? -1,
                                hotelsCost: k.ohousecost ?? -1,
                                housesCost: k.housecost ?? -1,
                                rent: k.rent ?? -1,
                                multpliedrent: k.multpliedrent
                                    ? [
                                          k.multpliedrent[0] ?? -1,
                                          k.multpliedrent[1] ?? -1,
                                          k.multpliedrent[2] ?? -1,
                                          k.multpliedrent[3] ?? -1,
                                          k.multpliedrent[4] ?? -1,
                                      ]
                                    : [-1, -1, -1, -1, -1],
                                rentWithColorSet: k.rent ? k.rent * 2 : -1,
                                title: k.name ?? "error",
                                group: k.group,
                            };
                            f(H),
                                g(!!$),
                                O(),
                                a(!0),
                                requestAnimationFrame(de($, w.location));
                        }
                    } else w.onResponse("nothing", {}), a(!1);
                },
                chorch(w, I, k) {
                    S(I ? "Chance" : "CommunityChest"),
                        f({ title: w.title }),
                        O(),
                        a(!0),
                        setTimeout(() => {
                            a(!1);
                        }, k);
                },
                applyAnimation(w) {
                    R(w);
                },
                showJailsButtons: (w) => {
                    const I = document.querySelector(
                            'button.roll-button[data-button-type="pay"]'
                        ),
                        k = document.querySelector(
                            'button.roll-button[data-button-type="card"]'
                        ),
                        $ = document.querySelector(
                            'button.roll-button[data-button-type="roll"]'
                        );
                    function le() {
                        ($.onclick = () => {
                            s(!0),
                                requestAnimationFrame(() => {
                                    e.socket.emit("roll_dice");
                                });
                        }),
                            s(!0),
                            (k.onclick = () => {}),
                            (k.style.translate = "0px 0px"),
                            k.setAttribute("aria-disabled", "true"),
                            setTimeout(() => {
                                k.setAttribute("aria-disabled", "true");
                            }, 300),
                            (I.style.translate = "0px 0px"),
                            (I.onclick = () => {}),
                            I.setAttribute("aria-disabled", "true"),
                            setTimeout(() => {
                                I.setAttribute("aria-disabled", "true");
                            }, 300);
                    }
                    if (
                        (I.setAttribute("aria-disabled", "false"),
                        (I.style.translate = "0px -80px"),
                        (I.onclick = () => {
                            R(1),
                                e.socket.emit("unjail", "pay"),
                                e.socket.emit("roll_dice"),
                                le();
                        }),
                        w)
                    ) {
                        const ae = k;
                        ae.setAttribute("aria-disabled", "false"),
                            (ae.style.translate = "0px -160px"),
                            (ae.style.backgroundColor = "gold"),
                            (ae.onclick = () => {
                                e.socket.emit("unjail", "card"),
                                    e.socket.emit("roll_dice"),
                                    le();
                            });
                    }
                    $.onclick = () => {
                        e.socket.emit("roll_dice"), le(), s(!0);
                    };
                },
            })),
            _.useEffect(() => {
                document.getElementById("locations").onwheel = (I) => {
                    I.shiftKey
                        ? E(
                              (k) =>
                                  k +
                                  (I.deltaY *
                                      (x !== void 0 ? x.accessibility[1] : 5)) /
                                      5e3
                          )
                        : y(
                              (k) =>
                                  k +
                                  (I.deltaY *
                                      (x !== void 0
                                          ? x.accessibility[0]
                                          : 45)) /
                                      100
                          );
                };
                const w = Array.from(n.values()).filter(
                    (I) => I.group != "Special"
                );
                for (const I of w) {
                    const k = document
                        .getElementById("locations")
                        .querySelector(
                            `div.street[data-position="${I.posistion}"]`
                        );
                    (k.onclick = () => {
                        e.clickedOnBoard(I.posistion);
                    }),
                        (k.onmousemove = () => {
                            (k.style.cursor = "pointer"),
                                (k.style.backgroundColor = "rgba(0,0,0,15%)");
                        }),
                        (k.onmouseleave = () => {
                            (k.style.cursor = "unset"),
                                (k.style.scale = "1"),
                                (k.style.backgroundColor = "rgba(0,0,0,0%)");
                        });
                }
            }, [x]),
            _.useEffect(() => {
                var w = !0,
                    I = () => {
                        var $, le, ae, de;
                        for (const H of e.players.filter(
                            (ge) => ge.balance >= 0
                        )) {
                            const ge = H.position,
                                ke = H.icon + 1,
                                N = H.isInJail,
                                j = document.querySelector(
                                    `div.player[player-id="${H.id}"]`
                                );
                            if (j !== null) {
                                const L = j.querySelector("div");
                                (L.style.rotate = `${-m}deg`),
                                    (L.style.aspectRatio = "1"),
                                    x !== void 0 && x.accessibility[4] === !0
                                        ? L.setAttribute(
                                              "data-tooltip-color",
                                              H.color
                                          )
                                        : L.hasAttribute(
                                              "data-tooltip-color"
                                          ) &&
                                          ((L.querySelector(
                                              "img"
                                          ).style.filter = ""),
                                          L.removeAttribute(
                                              "data-tooltip-color"
                                          ));
                                const B =
                                    ($ = j.parentElement) == null
                                        ? void 0
                                        : $.getAttribute("data-position");
                                if (
                                    (parseInt(B) !== H.position &&
                                        ((le = j.parentElement) == null ||
                                            le.removeChild(j),
                                        (ae = document.querySelector(
                                            `div.street[data-position="${ge}"]`
                                        )) == null || ae.appendChild(j)),
                                    !N &&
                                        j.querySelector("img.jailIcon") != null)
                                ) {
                                    const U = j.querySelector("img.jailIcon");
                                    j.removeChild(U);
                                }
                                if (
                                    N &&
                                    j.querySelector("img.jailIcon") == null
                                ) {
                                    for (; j.firstChild; )
                                        j.removeChild(j.firstChild);
                                    const U = document.createElement("img");
                                    (U.src = `./p${ke}.png`), j.appendChild(U);
                                    const V = document.createElement("img");
                                    (V.src = "./jail.png"),
                                        (V.className = "jailIcon"),
                                        j.appendChild(V);
                                }
                            } else {
                                const L = document.createElement("div");
                                (L.className = "player"),
                                    L.setAttribute("player-id", H.id),
                                    L.setAttribute(
                                        "player-position",
                                        H.position.toString()
                                    );
                                const B = document.createElement("div");
                                B.setAttribute(
                                    "data-tooltip-hover",
                                    H.username
                                );
                                const U = document.createElement("img");
                                if (
                                    ((U.src = `./p${ke}.png`),
                                    B.appendChild(U),
                                    L.appendChild(B),
                                    N)
                                ) {
                                    const V = document.createElement("img");
                                    (V.src = "./jail.png"),
                                        (V.className = "jailIcon"),
                                        L.appendChild(V);
                                }
                                (de = document.querySelector(
                                    `div.street[data-position="${ge}"]`
                                )) == null || de.appendChild(L);
                            }
                        }
                        function k() {
                            const H = document.getElementById("display-houses"),
                                ge = Array.from(
                                    H.querySelectorAll("div.street-houses")
                                );
                            for (const N of ge) {
                                const j = N;
                                for (; j.firstChild; )
                                    j.removeChild(j.firstChild);
                                (j.onclick = () => {}),
                                    (j.style.cursor = "unset"),
                                    (j.style.backgroundColor =
                                        "rgba(0,0,0,0%)"),
                                    (j.style.padding = "0px"),
                                    (j.innerHTML = ""),
                                    j.setAttribute("data-tooltip-hover", ""),
                                    (j.style.zIndex = "unset"),
                                    (j.style.boxShadow = "");
                            }
                            for (const N of e.players)
                                for (const j of N.properties) {
                                    const L = j.posistion,
                                        B = j.count,
                                        U = H.querySelector(
                                            `div.street-houses[data-position="${L}"`
                                        );
                                    if (U != null) {
                                        const V = U;
                                        switch (
                                            (V.setAttribute(
                                                "data-tooltip-hover",
                                                N.username
                                            ),
                                            (V.onclick = () => {
                                                const P =
                                                    document.querySelector(
                                                        `div.player[player-id="${N.id}"]`
                                                    );
                                                (P.style.animation =
                                                    "spin2 1s cubic-bezier(.21, 1.57, .55, 1) infinite"),
                                                    setTimeout(() => {
                                                        P.style.animation = "";
                                                    }, 1 * 1e3);
                                            }),
                                            (V.style.cursor = "pointer"),
                                            (V.style.zIndex = "5"),
                                            B)
                                        ) {
                                            case 0:
                                                (V.style.backgroundColor =
                                                    "rgba(0,0,0,25%)"),
                                                    x !== void 0 &&
                                                        x != null &&
                                                        x.accessibility[4] &&
                                                        ((V.style.backgroundColor =
                                                            N.color),
                                                        (V.style.boxShadow =
                                                            "0px 0px 5px black"));
                                                var ke = 0;
                                                if (j.group === "Railroad") {
                                                    const A =
                                                        N.properties.filter(
                                                            (z) =>
                                                                z.group ===
                                                                "Railroad"
                                                        ).length;
                                                    var ke = [25, 50, 100, 200][
                                                        A
                                                    ];
                                                } else if (
                                                    j.group === "Utilities" &&
                                                    j.rent
                                                ) {
                                                    const A =
                                                        N.properties.filter(
                                                            (M) =>
                                                                M.group ===
                                                                "Utilities"
                                                        ).length === 2
                                                            ? 10
                                                            : 4;
                                                    ke = j.rent * A;
                                                }
                                                ke !== 0 &&
                                                    ((V.innerHTML = `<p>${ke}M</p>`),
                                                    (V.style.backgroundColor =
                                                        "rgba(0,0,0,75%)"),
                                                    x !== void 0 &&
                                                        x != null &&
                                                        x.accessibility[4] &&
                                                        ((V.style.backgroundColor = `${N.color}`),
                                                        (V.style.boxShadow =
                                                            "0px 0px 5px black")));
                                                break;
                                            case 1:
                                            case 2:
                                            case 3:
                                            case 4:
                                                for (let A = 0; A < B; A++) {
                                                    const M =
                                                        document.createElement(
                                                            "img"
                                                        );
                                                    (M.src = Il.replace(
                                                        "public/",
                                                        ""
                                                    )),
                                                        V.appendChild(M);
                                                }
                                                break;
                                            case "h":
                                                const P =
                                                    document.createElement(
                                                        "img"
                                                    );
                                                (P.src = Fl.replace(
                                                    "public/",
                                                    ""
                                                )),
                                                    V.appendChild(P);
                                                break;
                                        }
                                    }
                                }
                        }
                        k(), w && requestAnimationFrame(I);
                    };
                return (
                    requestAnimationFrame(I),
                    () => {
                        w = !1;
                    }
                );
            }, [e.players, m]),
            _.useEffect(() => {
                const w = document.querySelector(
                    'button.roll-button[data-button-type="roll"]'
                );
                w.onclick = () => {
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
                                transform: `translateX(-50%) translateY(-50%) rotate(${m}deg) scale(${v})`,
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
                                            : { translate: "0px 20vh" },
                                    children: l.jsx("p", { children: "CARD" }),
                                }),
                                l.jsx("button", {
                                    className: "roll-button",
                                    "data-button-type": "pay",
                                    "aria-disabled": !0,
                                    style:
                                        e.myTurn && !o
                                            ? {}
                                            : { translate: "0px 20vh" },
                                    children: l.jsx("p", { children: "PAY" }),
                                }),
                                l.jsxs("button", {
                                    className: "roll-button",
                                    "data-button-type": "roll",
                                    "aria-disabled": !1,
                                    style:
                                        e.myTurn && !o
                                            ? {}
                                            : { translate: "0px 20vh" },
                                    children: [
                                        l.jsx("img", {
                                            src: Is.replace("public/", ""),
                                        }),
                                        l.jsx("p", {
                                            children: "ROLL THE DICE",
                                        }),
                                        " ",
                                        l.jsx("img", {
                                            src: Is.replace("public/", ""),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        l.jsx("div", {
                            className:
                                h === "Chance" || h === "CommunityChest"
                                    ? "chance-display-actions"
                                    : "card-display-actions",
                            style: u
                                ? {}
                                : {
                                      transform:
                                          "translateY(-50%) translateX(-60vw)",
                                  },
                            children:
                                h === "Chance" || h === "CommunityChest"
                                    ? l.jsx(l.Fragment, {
                                          children:
                                              h === "Chance"
                                                  ? l.jsx(cu, { chance: d })
                                                  : h === "CommunityChest"
                                                  ? l.jsx(cu, { chance: d })
                                                  : l.jsx(l.Fragment, {}),
                                      })
                                    : l.jsxs(l.Fragment, {
                                          children: [
                                              l.jsx("h3", {
                                                  children: p
                                                      ? "would you like to buy this card?"
                                                      : "you can buy houses and hotels",
                                              }),
                                              h === "Railroad"
                                                  ? l.jsx(zn, { railroad: d })
                                                  : h === "Utilities"
                                                  ? l.jsx(zn, { utility: d })
                                                  : l.jsx(zn, { street: d }),
                                              l.jsx("div", {
                                                  children: l.jsx("center", {
                                                      children: p
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
    Id = _.forwardRef(
        (e, t) => (
            _.useImperativeHandle(t, () => ({
                message(n, r, i, o, s) {
                    const u = document.querySelector("div.notify");
                    console.warn(n);
                    const a = document.createElement("div");
                    (a.className = "notification"),
                        (a.innerHTML = n),
                        a.setAttribute("data-notif-type", r ?? "info"),
                        u.appendChild(a);
                    var p = !1,
                        g = "popoff .7s cubic-bezier(.62,.25,1,-0.73)";
                    if (
                        ((a.onclick = () => {
                            (p = !0),
                                (a.style.animation = g),
                                setTimeout(() => {
                                    u.removeChild(a), a.remove(), o && o();
                                }, 700);
                        }),
                        setTimeout(() => {
                            p ||
                                ((a.style.animation = g),
                                setTimeout(() => {
                                    u.removeChild(a), a.remove(), o && o();
                                }, 700));
                        }, (i ?? 2) * 1e3),
                        s === void 0 || (s !== void 0 && s === !0))
                    ) {
                        const m = JSON.parse(document.cookie).settings;
                        let y = new Audio("./notifications.mp3");
                        (y.volume =
                            (((m == null ? void 0 : m.audio[1]) ?? 100) / 100) *
                            (((m == null ? void 0 : m.audio[0]) ?? 100) / 100)),
                            y.play();
                    }
                },
                dialog(n, r) {
                    const i = document.querySelector("div.dialog-screen"),
                        o = document.querySelector("div.dialog-box"),
                        s = o.querySelector("div.texts"),
                        u = o.querySelector("div.buttons"),
                        a = n(
                            () => {
                                i.setAttribute("data-show", "false"),
                                    o.setAttribute("data-show", "false"),
                                    (o.style.animation =
                                        "dialogout 1s cubic-bezier(.5,0,1,.5)"),
                                    setTimeout(() => {
                                        (o.style.animation = ""),
                                            (s.innerHTML = ""),
                                            (u.innerHTML = "");
                                    }, 1e3);
                            },
                            (m, y) => {
                                const v = document.createElement("button");
                                return (v.onclick = y), (v.innerHTML = m), v;
                            }
                        );
                    o.setAttribute("data-show", "true"),
                        i.setAttribute("data-show", "true"),
                        (s.innerHTML = a.innerHTML);
                    for (const m of a.buttons) u.appendChild(m);
                    const p = JSON.parse(document.cookie).settings;
                    switch (r) {
                        case "loosing":
                            var g = new Audio("./dying.mp3");
                            (g.volume =
                                0.16 *
                                (((p == null ? void 0 : p.audio[1]) ?? 100) /
                                    100) *
                                (((p == null ? void 0 : p.audio[0]) ?? 100) /
                                    100)),
                                (g.loop = !1),
                                g.play();
                            break;
                        case "winning":
                            var g = new Audio("./winning.mp3");
                            (g.volume =
                                (((p == null ? void 0 : p.audio[1]) ?? 100) /
                                    100) *
                                (((p == null ? void 0 : p.audio[0]) ?? 100) /
                                    100)),
                                (g.loop = !1),
                                g.play();
                            break;
                    }
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
function Wh({ socket: e, name: t }) {
    const [n, r] = _.useState(new Map()),
        i = Array.from(n.values()),
        [o, s] = _.useState(""),
        [u, a] = _.useState(!1),
        [p, g] = _.useState(!1),
        [m, y] = _.useState(0),
        [v, E] = _.useState(),
        [x, D] = _.useState(new Audio("./main-theme.mp3"));
    _.useEffect(() => {
        u &&
            ((x.loop = !0),
            x.play(),
            (x.volume = 0.25),
            v !== void 0 &&
                (x.volume = (v.audio[0] / 100) * (v.audio[2] / 100)),
            D(x));
    }, [u]),
        _.useEffect(() => {
            const c = setInterval(() => {
                const R = JSON.parse(document.cookie).settings;
                E(R);
            }, 1e3);
            return () => {
                clearInterval(c);
            };
        }, [document.cookie]),
        _.useEffect(() => {
            v !== void 0 &&
                (x.volume = (v.audio[0] / 100) * (v.audio[2] / 100));
        }, [v]);
    const d = _.useRef(null),
        f = _.useRef(null),
        h = _.useRef(null),
        S = new Map(un.properties.map((c) => [c.posistion ?? 0, c]));
    return (
        _.useEffect(() => {
            let c;
            const R = setInterval(() => {
                c = JSON.parse(document.cookie).settings;
            }, 1e3);
            function O(P) {
                const A = { x: P.clientX, y: P.clientY },
                    M = n.get(e.id);
                e.emit("mouse", A), M && (M.positions = A);
            }
            function w(P) {
                function A() {
                    n.delete(P),
                        r(new Map(n)),
                        requestAnimationFrame(() => {
                            n.has(P) && requestAnimationFrame(A);
                        });
                }
                A();
                function M() {
                    const T = document.querySelector(
                        `div.player[player-id="${P}"]`
                    );
                    T !== null &&
                        (T.parentElement && T.parentElement.removeChild(T),
                        T.remove(),
                        requestAnimationFrame(() => {
                            document.querySelector(
                                `div.player[player-id="${P}"]`
                            ) !== null && requestAnimationFrame(M);
                        }));
                }
                M();
            }
            function I(P, A, M = !0, T, z = !0) {
                var te = (P - A.position) % 40;
                (P < A.position || te < 0) && z && (te = 40 - A.position + P),
                    z || ((te = A.position - P), te < 0 && (te += 40));
                const fe = 0.35 * 1e3 * te;
                console.log(
                    `${new Date().toTimeString()} generator ${Math.random()} target ${P} time ${fe} current ${
                        A.position
                    }`
                );
                function b() {
                    var We = 0,
                        ne = !1,
                        pe = 0;
                    const he = document.querySelector(
                        `div.player[player-id="${A.id}"]`
                    );
                    (We = A.position), (A.position += 1);
                    var rt = new Audio("./step2.mp3");
                    (rt.volume =
                        0.1 *
                        (((c == null ? void 0 : c.audio[1]) ?? 100) / 100) *
                        (((c == null ? void 0 : c.audio[0]) ?? 100) / 100)),
                        (rt.loop = !1),
                        rt.play(),
                        (he.style.animation =
                            "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)");
                    const K = () => {
                        var Ae, mt, it, ot;
                        if (pe < te) {
                            pe += 1;
                            var re = new Audio("./step2.mp3");
                            if (
                                ((re.volume =
                                    1 *
                                    (((c == null ? void 0 : c.audio[1]) ??
                                        100) /
                                        100) *
                                    (((c == null ? void 0 : c.audio[0]) ??
                                        100) /
                                        100)),
                                (re.loop = !1),
                                re.play(),
                                (A.position = (A.position + (z ? 1 : -1)) % 40),
                                A.position == 0 && M)
                            ) {
                                A.balance += 200;
                                var re = new Audio("./moneyplus.mp3");
                                (re.volume =
                                    1 *
                                    (((c == null ? void 0 : c.audio[1]) ??
                                        100) /
                                        100) *
                                    (((c == null ? void 0 : c.audio[0]) ??
                                        100) /
                                        100)),
                                    (re.loop = !1),
                                    re.play(),
                                    A.id === e.id &&
                                        (c !== void 0 &&
                                            c.notifications === !0 &&
                                            ((Ae = h.current) == null ||
                                                Ae.message(
                                                    "200 of money is added to the account",
                                                    "info",
                                                    2,
                                                    () => {},
                                                    !1
                                                )),
                                        (mt = d.current) == null ||
                                            mt.applyAnimation(2)),
                                    (ne = !0),
                                    r(new Map(n.set(A.id, A)));
                            }
                            if (pe == te - 1) {
                                if (
                                    ((A.position = P),
                                    (he.style.animation =
                                        "part 0.9s cubic-bezier(0,.7,.57,1)"),
                                    setTimeout(() => {
                                        he.style.animation = "";
                                    }, 900),
                                    !ne && We > A.position && M)
                                ) {
                                    var re = new Audio("./moneyplus.mp3");
                                    (re.volume =
                                        1 *
                                        (((c == null ? void 0 : c.audio[1]) ??
                                            100) /
                                            100) *
                                        (((c == null ? void 0 : c.audio[0]) ??
                                            100) /
                                            100)),
                                        (re.loop = !1),
                                        re.play(),
                                        (A.balance += 200),
                                        A.id === e.id &&
                                            (c !== void 0 &&
                                                c.notifications === !0 &&
                                                ((it = h.current) == null ||
                                                    it.message(
                                                        "200 of money is added to the account",
                                                        "info",
                                                        2,
                                                        () => {},
                                                        !1
                                                    )),
                                            (ot = d.current) == null ||
                                                ot.applyAnimation(2)),
                                        (ne = !0),
                                        r(new Map(n.set(A.id, A)));
                                }
                                T && T();
                            } else
                                (he.style.animation =
                                    "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)"),
                                    setTimeout(K, 0.35 * 1e3);
                        }
                    };
                    setTimeout(K, 0.35 * 1e3);
                }
                return { func: b, time: fe };
            }
            const k = (P) => {
                    s(P.turn_id.toString());
                    for (const A of P.other_players)
                        r(n.set(A.id, new lu(A.id, A.username).recieveJson(A)));
                },
                $ = (P) => {
                    r(
                        new Map(
                            n.set(P.id, new lu(P.id, P.username).recieveJson(P))
                        )
                    );
                },
                le = (P) => {
                    const A = n.get(P.id);
                    A !== void 0 &&
                        ((A.ready = P.state),
                        r(new Map(n.set(A.id, A))),
                        y(P.selectedMode));
                },
                ae = () => {
                    a(!0);
                },
                de = (P) => {
                    var A, M, T;
                    if ((s(P.turn), n.size > 2)) {
                        const z =
                            ((A = n.get(P.id)) == null ? void 0 : A.username) ??
                            "player";
                        (M = h.current) == null ||
                            M.message(`${z} disconected`, "error");
                    } else
                        x.pause(),
                            (T = h.current) == null ||
                                T.dialog((z, te) => {
                                    var fe;
                                    return {
                                        innerHTML: `<h3> YOU WON! </h3> <p> your the only left player with the balance of ${
                                            ((fe = n.get(e.id)) == null
                                                ? void 0
                                                : fe.balance) ?? 0
                                        } </p>`,
                                        buttons: [
                                            te("PLAY ANOTHER GAME", () => {
                                                z(), document.location.reload();
                                            }),
                                        ],
                                    };
                                }, "winning");
                    w(P.id);
                },
                H = (P) => {
                    var T, z, te, fe, b, We;
                    const A = n.get(P.from);
                    if (
                        A !== void 0 &&
                        JSON.stringify(A.properties) !=
                            JSON.stringify(P.pJson.properties)
                    ) {
                        var M = new Audio("./buying1.mp3");
                        (M.volume =
                            0.5 *
                            (((c == null ? void 0 : c.audio[1]) ?? 100) / 100) *
                            (((c == null ? void 0 : c.audio[0]) ?? 100) / 100)),
                            (M.loop = !1),
                            M.play();
                    }
                    if (
                        (P.from !== e.id &&
                            A &&
                            (A.recieveJson(P.pJson),
                            r(new Map(n.set(P.from, A)))),
                        P.pJson.balance < 0)
                    ) {
                        if (P.pJson.id !== e.id)
                            if (n.size > 2) {
                                const ne = P.pJson.username;
                                (T = h.current) == null ||
                                    T.message(`${ne} lost`, "info");
                            } else if (n.has(e.id))
                                x.pause(),
                                    (z = h.current) == null ||
                                        z.dialog((ne, pe) => {
                                            var he;
                                            return {
                                                innerHTML: `<h3> YOU WON! </h3> <p> your the only left player with the balance of ${
                                                    ((he = n.get(e.id)) == null
                                                        ? void 0
                                                        : he.balance) ?? 0
                                                } </p>`,
                                                buttons: [
                                                    pe(
                                                        "PLAY ANOTHER GAME",
                                                        () => {
                                                            ne(),
                                                                document.location.reload();
                                                        }
                                                    ),
                                                ],
                                            };
                                        }, "winning");
                            else {
                                const pe =
                                    Array.from(n.values()).filter(
                                        (he) => he.id !== P.pJson.id
                                    )[0].username ?? 0;
                                x.pause(),
                                    (te = h.current) == null ||
                                        te.dialog((he, rt) => {
                                            var K;
                                            return {
                                                innerHTML: `<h3> ${pe} WON! </h3> <p> ${pe} won with the balance of ${
                                                    ((K = n.get(e.id)) == null
                                                        ? void 0
                                                        : K.balance) ?? 0
                                                } </p>`,
                                                buttons: [
                                                    rt(
                                                        "PLAY ANOTHER GAME",
                                                        () => {
                                                            he(),
                                                                document.location.reload();
                                                        }
                                                    ),
                                                ],
                                            };
                                        }, "winning");
                            }
                        else
                            x.pause(),
                                (fe = h.current) == null ||
                                    fe.dialog((ne, pe) => {
                                        var he;
                                        return {
                                            innerHTML: `<h3> YOU LOST! </h3> <p> you lost your money and lost the monopol with a wanted balance of ${-(
                                                ((he = n.get(e.id)) == null
                                                    ? void 0
                                                    : he.balance) ?? 0
                                            )} </p>`,
                                            buttons: [
                                                pe("CONTINUE WATCHING", () => {
                                                    ne();
                                                }),
                                                pe("PLAY ANOTHER GAME", () => {
                                                    ne(),
                                                        document.location.reload();
                                                }),
                                            ],
                                        };
                                    }, "loosing");
                        w(P.pJson.id);
                    }
                    if ((s(P.turnId), P.turnId === e.id)) {
                        const ne = n.get(P.turnId);
                        ne &&
                            ne.isInJail &&
                            ((b = d.current) == null ||
                                b.showJailsButtons(
                                    ((ne == null ? void 0 : ne.getoutCards) ??
                                        -1) > 0
                                ));
                    }
                    (We = f.current) == null || We.reRenderPlayerList();
                },
                ge = (P) => {
                    var A;
                    (A = f.current) == null || A.addMessage(P);
                },
                ke = (P) => {
                    var te;
                    var A = new Audio("./rolling.mp3");
                    (A.volume =
                        (((c == null ? void 0 : c.audio[1]) ?? 100) / 100) *
                        (((c == null ? void 0 : c.audio[0]) ?? 100) / 100)),
                        (A.loop = !1),
                        A.play();
                    const M = n.get(e.id),
                        T = n.get(P.turnId),
                        z = I(P.listOfNums[2], T, !0, () => {
                            P.turnId != e.id &&
                                P.listOfNums[2] === 30 &&
                                setTimeout(() => {
                                    I(10, T, !1, () => {
                                        (T.position = 10), (T.isInJail = !0);
                                        var b = new Audio("./jail.mp3");
                                        (b.volume =
                                            0.5 *
                                            (((c == null
                                                ? void 0
                                                : c.audio[1]) ?? 100) /
                                                100) *
                                            (((c == null
                                                ? void 0
                                                : c.audio[0]) ?? 100) /
                                                100)),
                                            (b.loop = !1),
                                            b.play(),
                                            (T.jailTurnsRemaining = 3);
                                    }).func();
                                }, 800);
                        });
                    (te = d.current) == null ||
                        te.diceResults({
                            l: [P.listOfNums[0], P.listOfNums[1]],
                            time: M.isInJail ? 2e3 : z.time + 2e3 + 800,
                            onDone: () => {
                                var We, ne;
                                if (e.id !== P.turnId) return;
                                const fe =
                                        ((We = n.get(e.id)) == null
                                            ? void 0
                                            : We.position) ?? -1,
                                    b = S.get(fe);
                                b != null &&
                                    (b.id === "communitychest" ||
                                    b.id === "chance"
                                        ? e.emit(
                                              "chorch_roll",
                                              b.id === "chance"
                                          )
                                        : (ne = d.current) == null ||
                                          ne.setStreet({
                                              location: fe,
                                              rolls:
                                                  P.listOfNums[1] +
                                                  P.listOfNums[0],
                                              onResponse: (pe, he) => {
                                                  var Ae,
                                                      mt,
                                                      it,
                                                      ot,
                                                      G,
                                                      st,
                                                      Ke,
                                                      en,
                                                      ql,
                                                      Vl,
                                                      Jl,
                                                      $l,
                                                      Hl,
                                                      Wl,
                                                      Kl,
                                                      Ql,
                                                      Gl;
                                                  var rt = 0;
                                                  if (pe === "buy") {
                                                      c !== void 0 &&
                                                          c.notifications ===
                                                              !0 &&
                                                          ((Ae = h.current) ==
                                                              null ||
                                                              Ae.message(
                                                                  `${
                                                                      ((b ==
                                                                      null
                                                                          ? void 0
                                                                          : b.price) ??
                                                                          0) * 1
                                                                  } of money is deducted from the account`,
                                                                  "info",
                                                                  2,
                                                                  () => {},
                                                                  !1
                                                              )),
                                                          (M.balance -=
                                                              ((b == null
                                                                  ? void 0
                                                                  : b.price) ??
                                                                  0) * 1),
                                                          (mt = d.current) ==
                                                              null ||
                                                              mt.applyAnimation(
                                                                  1
                                                              ),
                                                          M.properties.push({
                                                              posistion:
                                                                  M.position,
                                                              count: 0,
                                                              group:
                                                                  ((it = S.get(
                                                                      M.position
                                                                  )) == null
                                                                      ? void 0
                                                                      : it.group) ??
                                                                  "",
                                                          });
                                                      var K = new Audio(
                                                          "./buying1.mp3"
                                                      );
                                                      (K.volume =
                                                          0.5 *
                                                          (((c == null
                                                              ? void 0
                                                              : c.audio[1]) ??
                                                              100) /
                                                              100) *
                                                          (((c == null
                                                              ? void 0
                                                              : c.audio[0]) ??
                                                              100) /
                                                              100)),
                                                          (K.loop = !1),
                                                          K.play();
                                                  } else if (
                                                      pe === "advance-buy"
                                                  ) {
                                                      var K = new Audio(
                                                          "./buying1.mp3"
                                                      );
                                                      (K.volume =
                                                          0.5 *
                                                          (((c == null
                                                              ? void 0
                                                              : c.audio[1]) ??
                                                              100) /
                                                              100) *
                                                          (((c == null
                                                              ? void 0
                                                              : c.audio[0]) ??
                                                              100) /
                                                              100)),
                                                          (K.loop = !1),
                                                          K.play();
                                                      const yt = Array.from(
                                                              new Map(
                                                                  M.properties.map(
                                                                      (
                                                                          fo,
                                                                          Gn
                                                                      ) => [
                                                                          Gn,
                                                                          fo,
                                                                      ]
                                                                  )
                                                              ).entries()
                                                          ).filter(
                                                              (fo) =>
                                                                  fo[1]
                                                                      .posistion ===
                                                                  fe
                                                          )[0][0],
                                                          _e = he;
                                                      (M.properties[yt].count =
                                                          _e.state === 5
                                                              ? "h"
                                                              : _e.state),
                                                          _e.state === 5
                                                              ? (c !== void 0 &&
                                                                    c.notifications ===
                                                                        !0 &&
                                                                    ((ot =
                                                                        h.current) ==
                                                                        null ||
                                                                        ot.message(
                                                                            `${
                                                                                b.ohousecost ??
                                                                                0
                                                                            } of money is deducted from the account`,
                                                                            "info",
                                                                            2,
                                                                            () => {},
                                                                            !1
                                                                        )),
                                                                (M.balance -=
                                                                    b.ohousecost ??
                                                                    0),
                                                                (G =
                                                                    d.current) ==
                                                                    null ||
                                                                    G.applyAnimation(
                                                                        1
                                                                    ))
                                                              : (c !== void 0 &&
                                                                    c.notifications ===
                                                                        !0 &&
                                                                    ((st =
                                                                        h.current) ==
                                                                        null ||
                                                                        st.message(
                                                                            `${
                                                                                b.housecost ??
                                                                                0
                                                                            } of money is deducted from the account`,
                                                                            "info",
                                                                            2,
                                                                            () => {},
                                                                            !1
                                                                        )),
                                                                (M.balance -=
                                                                    (b.housecost ??
                                                                        0) *
                                                                    _e.money),
                                                                (Ke =
                                                                    d.current) ==
                                                                    null ||
                                                                    Ke.applyAnimation(
                                                                        1
                                                                    ));
                                                  } else if (
                                                      pe === "someones"
                                                  ) {
                                                      const gn = Array.from(
                                                          n.values()
                                                      );
                                                      for (const yt of gn)
                                                          for (const _e of yt.properties)
                                                              if (
                                                                  _e.posistion ===
                                                                  fe
                                                              ) {
                                                                  var re = 0;
                                                                  if (
                                                                      b.group ===
                                                                          "Utilities" &&
                                                                      _e.rent
                                                                  ) {
                                                                      const Gn =
                                                                          yt.properties.filter(
                                                                              (
                                                                                  Yl
                                                                              ) =>
                                                                                  Yl.group ===
                                                                                  "Utilities"
                                                                          )
                                                                              .length ===
                                                                          2
                                                                              ? 10
                                                                              : 4;
                                                                      re =
                                                                          _e.rent *
                                                                          Gn;
                                                                  } else if (
                                                                      b.group ===
                                                                      "Railroad"
                                                                  ) {
                                                                      const Gn =
                                                                          yt.properties.filter(
                                                                              (
                                                                                  Qd
                                                                              ) =>
                                                                                  Qd.group ===
                                                                                  "Railroad"
                                                                          ).length;
                                                                      re = [
                                                                          25,
                                                                          50,
                                                                          100,
                                                                          200,
                                                                      ][Gn];
                                                                  } else
                                                                      _e.count ===
                                                                      0
                                                                          ? (re =
                                                                                (b ==
                                                                                null
                                                                                    ? void 0
                                                                                    : b.rent) ??
                                                                                0)
                                                                          : typeof _e.count ==
                                                                                "number" &&
                                                                            _e.count >
                                                                                0
                                                                          ? (re =
                                                                                ((b ==
                                                                                null
                                                                                    ? void 0
                                                                                    : b.multpliedrent) ?? [
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
                                                                            (re =
                                                                                ((b ==
                                                                                null
                                                                                    ? void 0
                                                                                    : b.multpliedrent) ?? [
                                                                                    0,
                                                                                    0,
                                                                                    0,
                                                                                    0,
                                                                                    0,
                                                                                ])[4] ??
                                                                                0);
                                                                  c !==
                                                                      void 0 &&
                                                                      c.notifications ===
                                                                          !0 &&
                                                                      ((en =
                                                                          h.current) ==
                                                                          null ||
                                                                          en.message(
                                                                              `${re} of money is deducted from the account`,
                                                                              "info",
                                                                              2,
                                                                              () => {},
                                                                              !1
                                                                          ));
                                                                  var K =
                                                                      new Audio(
                                                                          "./moneyminus.mp3"
                                                                      );
                                                                  (K.volume =
                                                                      (((c ==
                                                                      null
                                                                          ? void 0
                                                                          : c
                                                                                .audio[1]) ??
                                                                          100) /
                                                                          100) *
                                                                      (((c ==
                                                                      null
                                                                          ? void 0
                                                                          : c
                                                                                .audio[0]) ??
                                                                          100) /
                                                                          100)),
                                                                      (K.loop =
                                                                          !1),
                                                                      K.play(),
                                                                      (M.balance -=
                                                                          re),
                                                                      (ql =
                                                                          d.current) ==
                                                                          null ||
                                                                          ql.applyAnimation(
                                                                              1
                                                                          ),
                                                                      e.emit(
                                                                          "pay",
                                                                          {
                                                                              balance:
                                                                                  re,
                                                                              from: e.id,
                                                                              to: yt.id,
                                                                          }
                                                                      ),
                                                                      (Vl =
                                                                          d.current) ==
                                                                          null ||
                                                                          Vl.applyAnimation(
                                                                              1
                                                                          );
                                                              }
                                                  } else if (pe === "nothing") {
                                                      if (
                                                          ((b == null
                                                              ? void 0
                                                              : b.id) ?? "") ==
                                                          "gotojail"
                                                      ) {
                                                          const gn = I(
                                                              10,
                                                              T,
                                                              !1,
                                                              () => {
                                                                  (T.position = 10),
                                                                      (T.isInJail =
                                                                          !0),
                                                                      (T.jailTurnsRemaining = 3);
                                                              }
                                                          );
                                                          (rt = gn.time),
                                                              gn.func();
                                                      }
                                                      if (
                                                          (b == null
                                                              ? void 0
                                                              : b.id) ===
                                                          "incometax"
                                                      ) {
                                                          (M.balance -= 200),
                                                              c !== void 0 &&
                                                                  c.notifications ===
                                                                      !0 &&
                                                                  ((Jl =
                                                                      h.current) ==
                                                                      null ||
                                                                      Jl.message(
                                                                          "200 of money is deducted from the account",
                                                                          "info",
                                                                          2,
                                                                          () => {},
                                                                          !1
                                                                      ));
                                                          var K = new Audio(
                                                              "./moneyminus.mp3"
                                                          );
                                                          (K.volume =
                                                              (((c == null
                                                                  ? void 0
                                                                  : c
                                                                        .audio[1]) ??
                                                                  100) /
                                                                  100) *
                                                              (((c == null
                                                                  ? void 0
                                                                  : c
                                                                        .audio[0]) ??
                                                                  100) /
                                                                  100)),
                                                              (K.loop = !1),
                                                              K.play(),
                                                              ($l =
                                                                  d.current) ==
                                                                  null ||
                                                                  $l.applyAnimation(
                                                                      1
                                                                  );
                                                      }
                                                      if (
                                                          (b == null
                                                              ? void 0
                                                              : b.id) ===
                                                          "luxerytax"
                                                      ) {
                                                          (M.balance -= 100),
                                                              c !== void 0 &&
                                                                  c.notifications ===
                                                                      !0 &&
                                                                  ((Hl =
                                                                      h.current) ==
                                                                      null ||
                                                                      Hl.message(
                                                                          "100 of money is deducted from the account",
                                                                          "info",
                                                                          2,
                                                                          () => {},
                                                                          !1
                                                                      ));
                                                          var K = new Audio(
                                                              "./moneyminus.mp3"
                                                          );
                                                          (K.volume =
                                                              (((c == null
                                                                  ? void 0
                                                                  : c
                                                                        .audio[1]) ??
                                                                  100) /
                                                                  100) *
                                                              (((c == null
                                                                  ? void 0
                                                                  : c
                                                                        .audio[0]) ??
                                                                  100) /
                                                                  100)),
                                                              (K.loop = !1),
                                                              K.play(),
                                                              (Wl =
                                                                  d.current) ==
                                                                  null ||
                                                                  Wl.applyAnimation(
                                                                      1
                                                                  );
                                                      }
                                                  } else if (
                                                      pe === "special_action"
                                                  ) {
                                                      c !== void 0 &&
                                                          c.notifications ===
                                                              !0 &&
                                                          ((Kl = h.current) ==
                                                              null ||
                                                              Kl.message(
                                                                  `${
                                                                      ((b ==
                                                                      null
                                                                          ? void 0
                                                                          : b.price) ??
                                                                          0) * 1
                                                                  } of money is deducted from the account`,
                                                                  "info",
                                                                  2,
                                                                  () => {},
                                                                  !1
                                                              ));
                                                      var K = new Audio(
                                                          "./buying1.mp3"
                                                      );
                                                      (K.volume =
                                                          0.5 *
                                                          (((c == null
                                                              ? void 0
                                                              : c.audio[1]) ??
                                                              100) /
                                                              100) *
                                                          (((c == null
                                                              ? void 0
                                                              : c.audio[0]) ??
                                                              100) /
                                                              100)),
                                                          (K.loop = !1),
                                                          K.play(),
                                                          (M.balance -=
                                                              ((b == null
                                                                  ? void 0
                                                                  : b.price) ??
                                                                  0) * 1),
                                                          (Ql = d.current) ==
                                                              null ||
                                                              Ql.applyAnimation(
                                                                  1
                                                              );
                                                      const _e = he.rolls;
                                                      M.properties.push({
                                                          posistion: M.position,
                                                          count: 0,
                                                          rent: _e,
                                                          group:
                                                              ((Gl = S.get(
                                                                  M.position
                                                              )) == null
                                                                  ? void 0
                                                                  : Gl.group) ??
                                                              "",
                                                      });
                                                  }
                                                  setTimeout(() => {
                                                      var yt;
                                                      r(
                                                          new Map(
                                                              n.set(e.id, M)
                                                          )
                                                      ),
                                                          (yt = d.current) ==
                                                              null ||
                                                              yt.freeDice();
                                                      const gn = n
                                                          .get(e.id)
                                                          .toJson();
                                                      e.emit("finish-turn", gn);
                                                  }, rt);
                                              },
                                          }));
                            },
                        }),
                        T.isInJail
                            ? setTimeout(() => {
                                  P.listOfNums[0] == P.listOfNums[1]
                                      ? ((T.isInJail = !1),
                                        setTimeout(() => {
                                            z.func();
                                        }, 2e3))
                                      : T.jailTurnsRemaining > 0 &&
                                        ((T.jailTurnsRemaining -= 1),
                                        T.jailTurnsRemaining === 0 &&
                                            (T.isInJail = !1)),
                                      r(new Map(n.set(P.turnId, T)));
                              }, 1500)
                            : setTimeout(() => {
                                  z.func();
                              }, 2e3);
                },
                N = (P) => {
                    var T;
                    const A = n.get(P.to);
                    if (A) {
                        if (P.option === "card") A.getoutCards -= 1;
                        else {
                            (A.balance -= 50),
                                A.id === e.id &&
                                    c !== void 0 &&
                                    c.notifications === !0 &&
                                    ((T = h.current) == null ||
                                        T.message(
                                            "50 of money is deducted from the account",
                                            "info",
                                            2,
                                            () => {},
                                            !1
                                        ));
                            var M = new Audio("./moneyminus.mp3");
                            (M.volume =
                                (((c == null ? void 0 : c.audio[1]) ?? 100) /
                                    100) *
                                (((c == null ? void 0 : c.audio[0]) ?? 100) /
                                    100)),
                                (M.loop = !1),
                                M.play();
                        }
                        (A.isInJail = !1),
                            (A.jailTurnsRemaining = 0),
                            r(new Map(n.set(P.to, A)));
                    }
                },
                j = (P) => {
                    var A;
                    for (const M of P.pJson) {
                        const T = n.get(M.id);
                        T == null || T.recieveJson(M);
                    }
                    e.id === P.playerId &&
                        ((A = d.current) == null || A.applyAnimation(2));
                },
                L = (P) => {
                    var M;
                    (M = d.current) == null ||
                        M.chorch(P.element, P.is_chance, 3e3),
                        setTimeout(() => {
                            var ne, pe, he, rt, K, re;
                            const T = P.element,
                                z = n.get(P.turnId);
                            if (z === void 0) return;
                            function te(Ae) {
                                var ot;
                                if (z === void 0) return 0;
                                const mt = Array.from(n.values()).filter(
                                    (G) => G.id !== z.id
                                );
                                for (const G of mt) {
                                    if (
                                        ((G.balance += Ae),
                                        G.id === e.id &&
                                            c !== void 0 &&
                                            c.notifications === !0)
                                    ) {
                                        (ot = h.current) == null ||
                                            ot.message(
                                                `${Ae} of money is added to the account`,
                                                "info",
                                                2,
                                                () => {},
                                                !1
                                            );
                                        var it = new Audio("./moneyplus.mp3");
                                        (it.volume =
                                            (((c == null
                                                ? void 0
                                                : c.audio[1]) ?? 100) /
                                                100) *
                                            (((c == null
                                                ? void 0
                                                : c.audio[0]) ?? 100) /
                                                100)),
                                            (it.loop = !1),
                                            it.play();
                                    }
                                    r(new Map(n.set(G.id, G))),
                                        z.id === e.id &&
                                            (Ae > 0
                                                ? e.emit("pay", {
                                                      balance: Ae,
                                                      from: e.id,
                                                      to: z.id,
                                                  })
                                                : e.emit("pay", {
                                                      balance: Ae,
                                                      from: z.id,
                                                      to: e.id,
                                                  }));
                                }
                                return mt.length;
                            }
                            var fe = 0;
                            switch (T.action) {
                                case "move":
                                    if (T.tileid) {
                                        const st =
                                            (ne = new Map(
                                                un.properties.map((en) => [
                                                    en.id,
                                                    en,
                                                ])
                                            ).get(T.tileid)) == null
                                                ? void 0
                                                : ne.posistion;
                                        if (st === void 0) break;
                                        const Ke = I(st, z);
                                        (fe = Ke.time), Ke.func();
                                    } else if (T.count) {
                                        const G = I(
                                            (z.position + T.count) % 40,
                                            z,
                                            !0,
                                            () => {},
                                            T.count >= 0
                                        );
                                        (fe = G.time), G.func();
                                    }
                                    break;
                                case "addfunds":
                                    if (
                                        ((z.balance += T.amount ?? 0),
                                        z.id === e.id)
                                    ) {
                                        c !== void 0 &&
                                            c.notifications === !0 &&
                                            ((pe = h.current) == null ||
                                                pe.message(
                                                    `${
                                                        T.amount ?? 0
                                                    } of money is added to the account`,
                                                    "info",
                                                    2,
                                                    () => {},
                                                    !1
                                                ));
                                        var b = new Audio("./moneyplus.mp3");
                                        (b.volume =
                                            (((c == null
                                                ? void 0
                                                : c.audio[1]) ?? 100) /
                                                100) *
                                            (((c == null
                                                ? void 0
                                                : c.audio[0]) ?? 100) /
                                                100)),
                                            (b.loop = !1),
                                            b.play(),
                                            (he = d.current) == null ||
                                                he.applyAnimation(2);
                                    }
                                    break;
                                case "jail":
                                    if (T.subaction !== void 0) {
                                        switch (T.subaction) {
                                            case "getout":
                                                z.getoutCards += 1;
                                                break;
                                            case "goto":
                                                const G = I(10, z, !1, () => {
                                                    (z.position = 10),
                                                        (z.isInJail = !0);
                                                    var st = new Audio(
                                                        "./jail.mp3"
                                                    );
                                                    (st.volume =
                                                        0.5 *
                                                        (((c == null
                                                            ? void 0
                                                            : c.audio[1]) ??
                                                            100) /
                                                            100) *
                                                        (((c == null
                                                            ? void 0
                                                            : c.audio[0]) ??
                                                            100) /
                                                            100)),
                                                        (st.loop = !1),
                                                        st.play(),
                                                        (z.jailTurnsRemaining = 3);
                                                });
                                                (fe = G.time), G.func();
                                                break;
                                        }
                                        r(new Map(n.set(z.id, z)));
                                    }
                                    break;
                                case "removefunds":
                                    if (
                                        ((z.balance -= T.amount ?? 0),
                                        z.id === e.id)
                                    ) {
                                        (rt = d.current) == null ||
                                            rt.applyAnimation(1),
                                            c !== void 0 &&
                                                c.notifications === !0 &&
                                                ((K = h.current) == null ||
                                                    K.message(
                                                        `${
                                                            T.amount ?? 0
                                                        } of money is deducted from the account`,
                                                        "info",
                                                        2,
                                                        () => {},
                                                        !1
                                                    ));
                                        var b = new Audio("./moneyminus.mp3");
                                        (b.volume =
                                            (((c == null
                                                ? void 0
                                                : c.audio[1]) ?? 100) /
                                                100) *
                                            (((c == null
                                                ? void 0
                                                : c.audio[0]) ?? 100) /
                                                100)),
                                            (b.loop = !1),
                                            b.play();
                                    }
                                    break;
                                case "removefundstoplayers":
                                    te(T.amount ?? 0),
                                        z.id === e.id &&
                                            ((re = d.current) == null ||
                                                re.applyAnimation(1));
                                    break;
                                case "addfundsfromplayers":
                                    te(-(T.amount ?? 0));
                                    break;
                                case "movenearest":
                                    let Ae = function (G, st) {
                                        G.sort((Ke, en) => Ke - en);
                                        for (let Ke = 0; Ke < G.length; Ke++)
                                            if (G[Ke] > st) return G[Ke];
                                        return G[0];
                                    };
                                    if (!T.groupid) return;
                                    var We = "";
                                    T.groupid === "utility"
                                        ? (We = "Utilities")
                                        : (We = "Railroad");
                                    const mt = un.properties
                                            .filter((G) => G.group === We)
                                            .map((G) => G.posistion),
                                        it = Ae(mt, z.position),
                                        ot = I(it, z);
                                    (fe = ot.time), ot.func();
                                    break;
                            }
                            setTimeout(() => {
                                var Ae;
                                r(new Map(n.set(z.id, z))),
                                    z.id === e.id &&
                                        ((Ae = d.current) == null ||
                                            Ae.freeDice(),
                                        e.emit(
                                            "finish-turn",
                                            n.get(e.id).toJson()
                                        ));
                            }, fe);
                        }, 3e3);
                };
            function B(P) {
                const A = n.get(P.id);
                A !== void 0 &&
                    ((A.positions = { x: P.x, y: P.y }), n.set(P.id, A));
            }
            function U() {
                var P;
                x.pause(),
                    (P = h.current) == null ||
                        P.dialog(
                            (A, M) => ({
                                innerHTML:
                                    "<h3> LOST CONNECTION </h3> <p> you were disconnected from the game </p>",
                                buttons: [
                                    M("PLAY ANOTHER GAME", () => {
                                        A(), document.location.reload();
                                    }),
                                ],
                            }),
                            "loosing"
                        );
            }
            document.addEventListener("mousemove", O),
                e.on("initials", k),
                e.on("new-player", $),
                e.on("ready", le),
                e.on("start-game", ae),
                e.on("disconnected-player", de),
                e.on("turn-finished", H),
                e.on("message", ge),
                e.on("dice_roll_result", ke),
                e.on("unjail", N),
                e.on("member_updating", j),
                e.on("chorch_result", L),
                e.on("mouse", B),
                e.on("disconnect", U);
            var V = !0;
            return (
                V && e.emit("name", t),
                () => {
                    (V = !1),
                        clearInterval(R),
                        document.removeEventListener("mousemove", O),
                        e.off("initials", k),
                        e.off("new-player", $),
                        e.off("ready", le),
                        e.off("start-game", ae),
                        e.off("disconnected-player", de),
                        e.off("turn-finished", H),
                        e.off("message", ge),
                        e.off("dice_roll_result", ke),
                        e.off("unjail", N),
                        e.off("member_updating", j),
                        e.off("chorch_result", L),
                        e.off("mouse", B),
                        e.off("disconnect", U);
                }
            );
        }, [e]),
        _.useEffect(() => {
            var c;
            (c = f.current) == null || c.reRenderPlayerList();
        }, [n]),
        u
            ? l.jsxs(l.Fragment, {
                  children: [
                      v !== void 0 && v.accessibility[3]
                          ? l.jsx("div", {
                                className: "cursors",
                                children: Array.from(n.values())
                                    .filter((c) => c.id !== e.id)
                                    .map((c, R) =>
                                        l.jsx(
                                            "img",
                                            {
                                                src: "./cursor.png",
                                                style: {
                                                    translate: `${c.positions.x}px ${c.positions.y}px`,
                                                },
                                                className: "cursor",
                                            },
                                            R
                                        )
                                    ),
                            })
                          : l.jsx(l.Fragment, {}),
                      l.jsxs("main", {
                          children: [
                              l.jsx(Vh, {
                                  currentTurn: o,
                                  ref: f,
                                  name: t,
                                  socket: e,
                                  players: i,
                              }),
                              l.jsx(Hh, {
                                  clickedOnBoard: (c) => {
                                      var R;
                                      (R = f.current) == null ||
                                          R.clickedOnBoard(c);
                                  },
                                  ref: d,
                                  socket: e,
                                  players: Array.from(n.values()),
                                  myTurn: o === e.id,
                              }),
                          ],
                      }),
                      l.jsx(Id, { ref: h }),
                  ],
              })
            : l.jsxs("div", {
                  className: "lobby",
                  children: [
                      l.jsxs("h3", { children: ["Hello there ", t] }),
                      "the players that are currently in the lobby are",
                      l.jsx("div", {
                          children: Array.from(n.values()).map((c, R) =>
                              l.jsx(
                                  "p",
                                  {
                                      style: c.ready
                                          ? { backgroundColor: "#32a852" }
                                          : {},
                                      className: "lobby-players",
                                      children: c.username,
                                  },
                                  R
                              )
                          ),
                      }),
                      l.jsx("br", {}),
                      "choose the game mode that you desire",
                      l.jsx("div", {
                          className: "modes",
                          children: ["Monopoly", "Ronopoly"].map((c, R) =>
                              l.jsx(
                                  "p",
                                  {
                                      "data-select": R === m,
                                      onClick: () => {
                                          e.emit("ready", { mode: R });
                                      },
                                      children: c,
                                  },
                                  R
                              )
                          ),
                      }),
                      l.jsx("center", {
                          children: l.jsx("button", {
                              onClick: () => {
                                  e.emit("ready", { ready: !p }), g(!p);
                              },
                              children: p ? "Not Ready" : "Ready",
                          }),
                      }),
                  ],
              })
    );
}
const Pt = Object.create(null);
Pt.open = "0";
Pt.close = "1";
Pt.ping = "2";
Pt.pong = "3";
Pt.message = "4";
Pt.upgrade = "5";
Pt.noop = "6";
const Si = Object.create(null);
Object.keys(Pt).forEach((e) => {
    Si[Pt[e]] = e;
});
const Kh = { type: "error", data: "parser error" },
    Fd =
        typeof Blob == "function" ||
        (typeof Blob < "u" &&
            Object.prototype.toString.call(Blob) ===
                "[object BlobConstructor]"),
    Md = typeof ArrayBuffer == "function",
    bd = (e) =>
        typeof ArrayBuffer.isView == "function"
            ? ArrayBuffer.isView(e)
            : e && e.buffer instanceof ArrayBuffer,
    Ml = ({ type: e, data: t }, n, r) =>
        Fd && t instanceof Blob
            ? n
                ? r(t)
                : du(t, r)
            : Md && (t instanceof ArrayBuffer || bd(t))
            ? n
                ? r(t)
                : du(new Blob([t]), r)
            : r(Pt[e] + (t || "")),
    du = (e, t) => {
        const n = new FileReader();
        return (
            (n.onload = function () {
                const r = n.result.split(",")[1];
                t("b" + (r || ""));
            }),
            n.readAsDataURL(e)
        );
    };
function fu(e) {
    return e instanceof Uint8Array
        ? e
        : e instanceof ArrayBuffer
        ? new Uint8Array(e)
        : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let Bo;
function Qh(e, t) {
    if (Fd && e.data instanceof Blob)
        return e.data.arrayBuffer().then(fu).then(t);
    if (Md && (e.data instanceof ArrayBuffer || bd(e.data)))
        return t(fu(e.data));
    Ml(e, !1, (n) => {
        Bo || (Bo = new TextEncoder()), t(Bo.encode(n));
    });
}
const pu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    dr = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < pu.length; e++) dr[pu.charCodeAt(e)] = e;
const Gh = (e) => {
        let t = e.length * 0.75,
            n = e.length,
            r,
            i = 0,
            o,
            s,
            u,
            a;
        e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
        const p = new ArrayBuffer(t),
            g = new Uint8Array(p);
        for (r = 0; r < n; r += 4)
            (o = dr[e.charCodeAt(r)]),
                (s = dr[e.charCodeAt(r + 1)]),
                (u = dr[e.charCodeAt(r + 2)]),
                (a = dr[e.charCodeAt(r + 3)]),
                (g[i++] = (o << 2) | (s >> 4)),
                (g[i++] = ((s & 15) << 4) | (u >> 2)),
                (g[i++] = ((u & 3) << 6) | (a & 63));
        return p;
    },
    Yh = typeof ArrayBuffer == "function",
    bl = (e, t) => {
        if (typeof e != "string") return { type: "message", data: zd(e, t) };
        const n = e.charAt(0);
        return n === "b"
            ? { type: "message", data: Xh(e.substring(1), t) }
            : Si[n]
            ? e.length > 1
                ? { type: Si[n], data: e.substring(1) }
                : { type: Si[n] }
            : Kh;
    },
    Xh = (e, t) => {
        if (Yh) {
            const n = Gh(e);
            return zd(n, t);
        } else return { base64: !0, data: e };
    },
    zd = (e, t) => {
        switch (t) {
            case "blob":
                return e instanceof Blob ? e : new Blob([e]);
            case "arraybuffer":
            default:
                return e instanceof ArrayBuffer ? e : e.buffer;
        }
    },
    Bd = String.fromCharCode(30),
    Zh = (e, t) => {
        const n = e.length,
            r = new Array(n);
        let i = 0;
        e.forEach((o, s) => {
            Ml(o, !1, (u) => {
                (r[s] = u), ++i === n && t(r.join(Bd));
            });
        });
    },
    e0 = (e, t) => {
        const n = e.split(Bd),
            r = [];
        for (let i = 0; i < n.length; i++) {
            const o = bl(n[i], t);
            if ((r.push(o), o.type === "error")) break;
        }
        return r;
    };
let Do;
function t0(e, t, n) {
    Do || (Do = new TextDecoder());
    const r = t || e[0] < 48 || e[0] > 54;
    return bl(r ? e : Do.decode(e), n);
}
const Dd = 4;
function ye(e) {
    if (e) return n0(e);
}
function n0(e) {
    for (var t in ye.prototype) e[t] = ye.prototype[t];
    return e;
}
ye.prototype.on = ye.prototype.addEventListener = function (e, t) {
    return (
        (this._callbacks = this._callbacks || {}),
        (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
        this
    );
};
ye.prototype.once = function (e, t) {
    function n() {
        this.off(e, n), t.apply(this, arguments);
    }
    return (n.fn = t), this.on(e, n), this;
};
ye.prototype.off =
    ye.prototype.removeListener =
    ye.prototype.removeAllListeners =
    ye.prototype.removeEventListener =
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
ye.prototype.emit = function (e) {
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
ye.prototype.emitReserved = ye.prototype.emit;
ye.prototype.listeners = function (e) {
    return (
        (this._callbacks = this._callbacks || {}),
        this._callbacks["$" + e] || []
    );
};
ye.prototype.hasListeners = function (e) {
    return !!this.listeners(e).length;
};
const Xe = (() =>
    typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : Function("return this")())();
function Ud(e, ...t) {
    return t.reduce((n, r) => (e.hasOwnProperty(r) && (n[r] = e[r]), n), {});
}
const r0 = Xe.setTimeout,
    i0 = Xe.clearTimeout;
function co(e, t) {
    t.useNativeTimers
        ? ((e.setTimeoutFn = r0.bind(Xe)), (e.clearTimeoutFn = i0.bind(Xe)))
        : ((e.setTimeoutFn = Xe.setTimeout.bind(Xe)),
          (e.clearTimeoutFn = Xe.clearTimeout.bind(Xe)));
}
const o0 = 1.33;
function s0(e) {
    return typeof e == "string"
        ? l0(e)
        : Math.ceil((e.byteLength || e.size) * o0);
}
function l0(e) {
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
function a0(e) {
    let t = "";
    for (let n in e)
        e.hasOwnProperty(n) &&
            (t.length && (t += "&"),
            (t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])));
    return t;
}
function u0(e) {
    let t = {},
        n = e.split("&");
    for (let r = 0, i = n.length; r < i; r++) {
        let o = n[r].split("=");
        t[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
    }
    return t;
}
class c0 extends Error {
    constructor(t, n, r) {
        super(t),
            (this.description = n),
            (this.context = r),
            (this.type = "TransportError");
    }
}
class zl extends ye {
    constructor(t) {
        super(),
            (this.writable = !1),
            co(this, t),
            (this.opts = t),
            (this.query = t.query),
            (this.socket = t.socket);
    }
    onError(t, n, r) {
        return super.emitReserved("error", new c0(t, n, r)), this;
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
        const n = bl(t, this.socket.binaryType);
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
        const n = a0(t);
        return n.length ? "?" + n : "";
    }
}
const qd =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
            ""
        ),
    Fs = 64,
    d0 = {};
let hu = 0,
    si = 0,
    mu;
function yu(e) {
    let t = "";
    do (t = qd[e % Fs] + t), (e = Math.floor(e / Fs));
    while (e > 0);
    return t;
}
function Vd() {
    const e = yu(+new Date());
    return e !== mu ? ((hu = 0), (mu = e)) : e + "." + yu(hu++);
}
for (; si < Fs; si++) d0[qd[si]] = si;
let Jd = !1;
try {
    Jd =
        typeof XMLHttpRequest < "u" &&
        "withCredentials" in new XMLHttpRequest();
} catch {}
const f0 = Jd;
function $d(e) {
    const t = e.xdomain;
    try {
        if (typeof XMLHttpRequest < "u" && (!t || f0))
            return new XMLHttpRequest();
    } catch {}
    if (!t)
        try {
            return new Xe[["Active"].concat("Object").join("X")](
                "Microsoft.XMLHTTP"
            );
        } catch {}
}
function p0() {}
const h0 = (function () {
    return new $d({ xdomain: !1 }).responseType != null;
})();
class m0 extends zl {
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
        (this.supportsBinary = h0 && !n),
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
        e0(t, this.socket.binaryType).forEach(n),
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
            Zh(t, (n) => {
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
                (n[this.opts.timestampParam] = Vd()),
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
            new kt(this.uri(), t)
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
class kt extends ye {
    constructor(t, n) {
        super(),
            co(this, n),
            (this.opts = n),
            (this.method = n.method || "GET"),
            (this.uri = t),
            (this.data = n.data !== void 0 ? n.data : null),
            this.create();
    }
    create() {
        var t;
        const n = Ud(
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
        const r = (this.xhr = new $d(n));
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
            ((this.index = kt.requestsCount++),
            (kt.requests[this.index] = this));
    }
    onError(t) {
        this.emitReserved("error", t, this.xhr), this.cleanup(!0);
    }
    cleanup(t) {
        if (!(typeof this.xhr > "u" || this.xhr === null)) {
            if (((this.xhr.onreadystatechange = p0), t))
                try {
                    this.xhr.abort();
                } catch {}
            typeof document < "u" && delete kt.requests[this.index],
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
kt.requestsCount = 0;
kt.requests = {};
if (typeof document < "u") {
    if (typeof attachEvent == "function") attachEvent("onunload", gu);
    else if (typeof addEventListener == "function") {
        const e = "onpagehide" in Xe ? "pagehide" : "unload";
        addEventListener(e, gu, !1);
    }
}
function gu() {
    for (let e in kt.requests)
        kt.requests.hasOwnProperty(e) && kt.requests[e].abort();
}
const Bl = (() =>
        typeof Promise == "function" && typeof Promise.resolve == "function"
            ? (t) => Promise.resolve().then(t)
            : (t, n) => n(t, 0))(),
    li = Xe.WebSocket || Xe.MozWebSocket,
    vu = !0,
    y0 = "arraybuffer",
    wu =
        typeof navigator < "u" &&
        typeof navigator.product == "string" &&
        navigator.product.toLowerCase() === "reactnative";
class g0 extends zl {
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
            r = wu
                ? {}
                : Ud(
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
                vu && !wu ? (n ? new li(t, n) : new li(t)) : new li(t, n, r);
        } catch (i) {
            return this.emitReserved("error", i);
        }
        (this.ws.binaryType = this.socket.binaryType || y0),
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
            Ml(r, this.supportsBinary, (o) => {
                const s = {};
                try {
                    vu && this.ws.send(o);
                } catch {}
                i &&
                    Bl(() => {
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
            this.opts.timestampRequests && (n[this.opts.timestampParam] = Vd()),
            this.supportsBinary || (n.b64 = 1),
            this.createUri(t, n)
        );
    }
    check() {
        return !!li;
    }
}
function v0(e, t) {
    return (
        e.type === "message" &&
        typeof e.data != "string" &&
        t[0] >= 48 &&
        t[0] <= 54
    );
}
class w0 extends zl {
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
                            .then(({ done: s, value: u }) => {
                                s ||
                                    (!r && u.byteLength === 1 && u[0] === 54
                                        ? (r = !0)
                                        : (this.onPacket(
                                              t0(u, r, "arraybuffer")
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
            Qh(r, (o) => {
                v0(r, o) && this.writer.write(Uint8Array.of(54)),
                    this.writer.write(o).then(() => {
                        i &&
                            Bl(() => {
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
const S0 = { websocket: g0, webtransport: w0, polling: m0 },
    x0 =
        /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
    k0 = [
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
function Ms(e) {
    const t = e,
        n = e.indexOf("["),
        r = e.indexOf("]");
    n != -1 &&
        r != -1 &&
        (e =
            e.substring(0, n) +
            e.substring(n, r).replace(/:/g, ";") +
            e.substring(r, e.length));
    let i = x0.exec(e || ""),
        o = {},
        s = 14;
    for (; s--; ) o[k0[s]] = i[s] || "";
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
        (o.pathNames = P0(o, o.path)),
        (o.queryKey = C0(o, o.query)),
        o
    );
}
function P0(e, t) {
    const n = /\/{2,9}/g,
        r = t.replace(n, "/").split("/");
    return (
        (t.slice(0, 1) == "/" || t.length === 0) && r.splice(0, 1),
        t.slice(-1) == "/" && r.splice(r.length - 1, 1),
        r
    );
}
function C0(e, t) {
    const n = {};
    return (
        t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (r, i, o) {
            i && (n[i] = o);
        }),
        n
    );
}
let Hd = class wn extends ye {
    constructor(t, n = {}) {
        super(),
            (this.writeBuffer = []),
            t && typeof t == "object" && ((n = t), (t = null)),
            t
                ? ((t = Ms(t)),
                  (n.hostname = t.host),
                  (n.secure = t.protocol === "https" || t.protocol === "wss"),
                  (n.port = t.port),
                  t.query && (n.query = t.query))
                : n.host && (n.hostname = Ms(n.host).host),
            co(this, n),
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
                (this.opts.query = u0(this.opts.query)),
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
        (n.EIO = Dd), (n.transport = t), this.id && (n.sid = this.id);
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
        return new S0[t](r);
    }
    open() {
        let t;
        if (
            this.opts.rememberUpgrade &&
            wn.priorWebsocketSuccess &&
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
        wn.priorWebsocketSuccess = !1;
        const i = () => {
            r ||
                (n.send([{ type: "ping", data: "probe" }]),
                n.once("packet", (m) => {
                    if (!r)
                        if (m.type === "pong" && m.data === "probe") {
                            if (
                                ((this.upgrading = !0),
                                this.emitReserved("upgrading", n),
                                !n)
                            )
                                return;
                            (wn.priorWebsocketSuccess = n.name === "websocket"),
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
                            const y = new Error("probe error");
                            (y.transport = n.name),
                                this.emitReserved("upgradeError", y);
                        }
                }));
        };
        function o() {
            r || ((r = !0), g(), n.close(), (n = null));
        }
        const s = (m) => {
            const y = new Error("probe error: " + m);
            (y.transport = n.name), o(), this.emitReserved("upgradeError", y);
        };
        function u() {
            s("transport closed");
        }
        function a() {
            s("socket closed");
        }
        function p(m) {
            n && m.name !== n.name && o();
        }
        const g = () => {
            n.removeListener("open", i),
                n.removeListener("error", s),
                n.removeListener("close", u),
                this.off("close", a),
                this.off("upgrading", p);
        };
        n.once("open", i),
            n.once("error", s),
            n.once("close", u),
            this.once("close", a),
            this.once("upgrading", p),
            this.upgrades.indexOf("webtransport") !== -1 && t !== "webtransport"
                ? this.setTimeoutFn(() => {
                      r || n.open();
                  }, 200)
                : n.open();
    }
    onOpen() {
        if (
            ((this.readyState = "open"),
            (wn.priorWebsocketSuccess = this.transport.name === "websocket"),
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
            if ((i && (n += s0(i)), r > 0 && n > this.maxPayload))
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
        (wn.priorWebsocketSuccess = !1),
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
Hd.protocol = Dd;
function E0(e, t = "", n) {
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
            (r = Ms(e))),
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
const A0 = typeof ArrayBuffer == "function",
    N0 = (e) =>
        typeof ArrayBuffer.isView == "function"
            ? ArrayBuffer.isView(e)
            : e.buffer instanceof ArrayBuffer,
    Wd = Object.prototype.toString,
    j0 =
        typeof Blob == "function" ||
        (typeof Blob < "u" && Wd.call(Blob) === "[object BlobConstructor]"),
    R0 =
        typeof File == "function" ||
        (typeof File < "u" && Wd.call(File) === "[object FileConstructor]");
function Dl(e) {
    return (
        (A0 && (e instanceof ArrayBuffer || N0(e))) ||
        (j0 && e instanceof Blob) ||
        (R0 && e instanceof File)
    );
}
function xi(e, t) {
    if (!e || typeof e != "object") return !1;
    if (Array.isArray(e)) {
        for (let n = 0, r = e.length; n < r; n++) if (xi(e[n])) return !0;
        return !1;
    }
    if (Dl(e)) return !0;
    if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
        return xi(e.toJSON(), !0);
    for (const n in e)
        if (Object.prototype.hasOwnProperty.call(e, n) && xi(e[n])) return !0;
    return !1;
}
function T0(e) {
    const t = [],
        n = e.data,
        r = e;
    return (
        (r.data = bs(n, t)),
        (r.attachments = t.length),
        { packet: r, buffers: t }
    );
}
function bs(e, t) {
    if (!e) return e;
    if (Dl(e)) {
        const n = { _placeholder: !0, num: t.length };
        return t.push(e), n;
    } else if (Array.isArray(e)) {
        const n = new Array(e.length);
        for (let r = 0; r < e.length; r++) n[r] = bs(e[r], t);
        return n;
    } else if (typeof e == "object" && !(e instanceof Date)) {
        const n = {};
        for (const r in e)
            Object.prototype.hasOwnProperty.call(e, r) && (n[r] = bs(e[r], t));
        return n;
    }
    return e;
}
function _0(e, t) {
    return (e.data = zs(e.data, t)), delete e.attachments, e;
}
function zs(e, t) {
    if (!e) return e;
    if (e && e._placeholder === !0) {
        if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
            return t[e.num];
        throw new Error("illegal attachments");
    } else if (Array.isArray(e))
        for (let n = 0; n < e.length; n++) e[n] = zs(e[n], t);
    else if (typeof e == "object")
        for (const n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (e[n] = zs(e[n], t));
    return e;
}
const L0 = [
        "connect",
        "connect_error",
        "disconnect",
        "disconnecting",
        "newListener",
        "removeListener",
    ],
    O0 = 5;
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
class I0 {
    constructor(t) {
        this.replacer = t;
    }
    encode(t) {
        return (t.type === J.EVENT || t.type === J.ACK) && xi(t)
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
        const n = T0(t),
            r = this.encodeAsString(n.packet),
            i = n.buffers;
        return i.unshift(r), i;
    }
}
function Su(e) {
    return Object.prototype.toString.call(e) === "[object Object]";
}
class Ul extends ye {
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
                  (this.reconstructor = new F0(n)),
                  n.attachments === 0 && super.emitReserved("decoded", n))
                : super.emitReserved("decoded", n);
        } else if (Dl(t) || t.base64)
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
            if (Ul.isPayloadValid(r.type, o)) r.data = o;
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
                return Su(n);
            case J.DISCONNECT:
                return n === void 0;
            case J.CONNECT_ERROR:
                return typeof n == "string" || Su(n);
            case J.EVENT:
            case J.BINARY_EVENT:
                return (
                    Array.isArray(n) &&
                    (typeof n[0] == "number" ||
                        (typeof n[0] == "string" && L0.indexOf(n[0]) === -1))
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
class F0 {
    constructor(t) {
        (this.packet = t), (this.buffers = []), (this.reconPack = t);
    }
    takeBinaryData(t) {
        if (
            (this.buffers.push(t),
            this.buffers.length === this.reconPack.attachments)
        ) {
            const n = _0(this.reconPack, this.buffers);
            return this.finishedReconstruction(), n;
        }
        return null;
    }
    finishedReconstruction() {
        (this.reconPack = null), (this.buffers = []);
    }
}
const M0 = Object.freeze(
    Object.defineProperty(
        {
            __proto__: null,
            Decoder: Ul,
            Encoder: I0,
            get PacketType() {
                return J;
            },
            protocol: O0,
        },
        Symbol.toStringTag,
        { value: "Module" }
    )
);
function ct(e, t, n) {
    return (
        e.on(t, n),
        function () {
            e.off(t, n);
        }
    );
}
const b0 = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1,
});
class Kd extends ye {
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
            ct(t, "open", this.onopen.bind(this)),
            ct(t, "packet", this.onpacket.bind(this)),
            ct(t, "error", this.onerror.bind(this)),
            ct(t, "close", this.onclose.bind(this)),
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
        if (b0.hasOwnProperty(t))
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
                u = n.pop();
            this._registerAckCallback(s, u), (r.id = s);
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
            n.push((s, u) => (r ? (s ? o(s) : i(u)) : i(s))),
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
function Qn(e) {
    (e = e || {}),
        (this.ms = e.min || 100),
        (this.max = e.max || 1e4),
        (this.factor = e.factor || 2),
        (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
        (this.attempts = 0);
}
Qn.prototype.duration = function () {
    var e = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var t = Math.random(),
            n = Math.floor(t * this.jitter * e);
        e = Math.floor(t * 10) & 1 ? e + n : e - n;
    }
    return Math.min(e, this.max) | 0;
};
Qn.prototype.reset = function () {
    this.attempts = 0;
};
Qn.prototype.setMin = function (e) {
    this.ms = e;
};
Qn.prototype.setMax = function (e) {
    this.max = e;
};
Qn.prototype.setJitter = function (e) {
    this.jitter = e;
};
class Bs extends ye {
    constructor(t, n) {
        var r;
        super(),
            (this.nsps = {}),
            (this.subs = []),
            t && typeof t == "object" && ((n = t), (t = void 0)),
            (n = n || {}),
            (n.path = n.path || "/socket.io"),
            (this.opts = n),
            co(this, n),
            this.reconnection(n.reconnection !== !1),
            this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
            this.reconnectionDelay(n.reconnectionDelay || 1e3),
            this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
            this.randomizationFactor(
                (r = n.randomizationFactor) !== null && r !== void 0 ? r : 0.5
            ),
            (this.backoff = new Qn({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor(),
            })),
            this.timeout(n.timeout == null ? 2e4 : n.timeout),
            (this._readyState = "closed"),
            (this.uri = t);
        const i = n.parser || M0;
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
        this.engine = new Hd(this.uri, this.opts);
        const n = this.engine,
            r = this;
        (this._readyState = "opening"), (this.skipReconnect = !1);
        const i = ct(n, "open", function () {
                r.onopen(), t && t();
            }),
            o = (u) => {
                this.cleanup(),
                    (this._readyState = "closed"),
                    this.emitReserved("error", u),
                    t ? t(u) : this.maybeReconnectOnOpen();
            },
            s = ct(n, "error", o);
        if (this._timeout !== !1) {
            const u = this._timeout,
                a = this.setTimeoutFn(() => {
                    i(), o(new Error("timeout")), n.close();
                }, u);
            this.opts.autoUnref && a.unref(),
                this.subs.push(() => {
                    this.clearTimeoutFn(a);
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
            ct(t, "ping", this.onping.bind(this)),
            ct(t, "data", this.ondata.bind(this)),
            ct(t, "error", this.onerror.bind(this)),
            ct(t, "close", this.onclose.bind(this)),
            ct(this.decoder, "decoded", this.ondecoded.bind(this))
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
        Bl(() => {
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
                : ((r = new Kd(this, t, n)), (this.nsps[t] = r)),
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
const sr = {};
function ki(e, t) {
    typeof e == "object" && ((t = e), (e = void 0)), (t = t || {});
    const n = E0(e, t.path || "/socket.io"),
        r = n.source,
        i = n.id,
        o = n.path,
        s = sr[i] && o in sr[i].nsps,
        u = t.forceNew || t["force new connection"] || t.multiplex === !1 || s;
    let a;
    return (
        u ? (a = new Bs(r, t)) : (sr[i] || (sr[i] = new Bs(r, t)), (a = sr[i])),
        n.query && !t.query && (t.query = n.queryKey),
        a.socket(n.path, t)
    );
}
Object.assign(ki, { Manager: Bs, Socket: Kd, io: ki, connect: ki });
function z0() {
    var e;
    try {
        e = JSON.parse(document.cookie);
    } catch {
        e = {
            login: { rememberHost: !1, rememberName: !1, host: "", name: "" },
        };
    }
    const t = _.useRef(null),
        [n, r] = _.useState(),
        [i, o] = _.useState(e.login.rememberName ? e.login.name : ""),
        [s, u] = _.useState(e.login.rememberHost ? e.login.host : ""),
        [a, p] = _.useState(e.login.rememberName),
        [g, m] = _.useState(e.login.rememberHost),
        [y, v] = _.useState(!1),
        [E, x] = _.useState(!1),
        D = (d) => {
            var h;
            if (i.replace(" ", "").length === 0) {
                (h = t.current) == null ||
                    h.message("please add your name before joining", "info", 2);
                return;
            }
            try {
                const S = JSON.parse(document.cookie);
                (S.login = {
                    host: s,
                    name: i,
                    rememberHost: g,
                    rememberName: a,
                }),
                    (document.cookie = JSON.stringify(S));
            } catch {
                const S = {
                    login: {
                        host: s,
                        name: i,
                        rememberHost: g,
                        rememberName: a,
                    },
                };
                document.cookie = JSON.stringify(S);
            }
            const f = ki(s, { rejectUnauthorized: !1 });
            v(!0),
                f.on("state", (S) => {
                    var c, R, O;
                    switch (S) {
                        case 0:
                            r(f), x(!0), v(!1);
                            break;
                        case 1:
                            (c = t.current) == null ||
                                c.message(
                                    "the game has already begun",
                                    "error",
                                    2,
                                    () => {
                                        v(!1);
                                    }
                                ),
                                f.disconnect();
                            break;
                        case 2:
                            (R = t.current) == null ||
                                R.message(
                                    "too many players on the server",
                                    "error",
                                    2,
                                    () => {
                                        v(!1);
                                    }
                                ),
                                f.disconnect();
                            break;
                        default:
                            (O = t.current) == null ||
                                O.message("unkown error", "error", 2),
                                f.disconnect(),
                                v(!1);
                            break;
                    }
                }),
                f.on("connect_error", () => {
                    var S;
                    (S = t.current) == null ||
                        S.message(
                            "the server does not exist or is unreachable",
                            "error",
                            2,
                            () => {
                                v(!1);
                            }
                        ),
                        f.disconnect();
                }),
                f.on("connect_timeout", () => {
                    var S;
                    (S = t.current) == null ||
                        S.message(
                            "the server took too long to respond",
                            "error",
                            2,
                            () => {
                                v(!1);
                            }
                        ),
                        f.disconnect();
                });
        };
    return (
        _.useEffect(() => {
            const d = new URLSearchParams(document.location.search);
            d.has("ip") && u("https://" + d.get("ip"));
        }, []),
        n !== void 0 && E === !0
            ? l.jsx(Wh, { socket: n, name: i })
            : l.jsxs(l.Fragment, {
                  children: [
                      l.jsx(Id, { ref: t }),
                      l.jsxs("div", {
                          className: "entry",
                          children: [
                              l.jsxs("header", {
                                  children: [
                                      l.jsx("p", {
                                          style: { fontSize: 9 },
                                          children:
                                              "29.7.23 - Settings & Sound Effects Update",
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
                                  onChange: (d) => u(d.currentTarget.value),
                                  defaultValue: s,
                                  placeholder: "enter ip",
                              }),
                              l.jsx("p", {
                                  children: "please enter your name:",
                              }),
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
                                          checked: a,
                                          onChange: (d) =>
                                              p(d.currentTarget.checked),
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
                                              m(d.currentTarget.checked),
                                          type: "checkbox",
                                      }),
                                  ],
                              }),
                              l.jsx("center", {
                                  children: l.jsx("button", {
                                      onClick: D,
                                      disabled: y,
                                      children: "join",
                                  }),
                              }),
                          ],
                      }),
                  ],
              })
    );
}
document.title = "Monopoly";
Uo.createRoot(document.getElementById("root")).render(l.jsx(z0, {}));
