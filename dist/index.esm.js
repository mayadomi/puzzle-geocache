import Re, { createContext as Ce, useState as L, useContext as Ee, useRef as X, useEffect as D, useCallback as A, useMemo as ae } from "react";
var le = { exports: {} }, re = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ue;
function ke() {
  if (ue) return re;
  ue = 1;
  var t = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function n(s, r, a) {
    var c = null;
    if (a !== void 0 && (c = "" + a), r.key !== void 0 && (c = "" + r.key), "key" in r) {
      a = {};
      for (var i in r)
        i !== "key" && (a[i] = r[i]);
    } else a = r;
    return r = a.ref, {
      $$typeof: t,
      type: s,
      key: c,
      ref: r !== void 0 ? r : null,
      props: a
    };
  }
  return re.Fragment = e, re.jsx = n, re.jsxs = n, re;
}
var oe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var de;
function $e() {
  return de || (de = 1, process.env.NODE_ENV !== "production" && function() {
    function t(o) {
      if (o == null) return null;
      if (typeof o == "function")
        return o.$$typeof === K ? null : o.displayName || o.name || null;
      if (typeof o == "string") return o;
      switch (o) {
        case S:
          return "Fragment";
        case b:
          return "Profiler";
        case m:
          return "StrictMode";
        case y:
          return "Suspense";
        case $:
          return "SuspenseList";
        case Q:
          return "Activity";
      }
      if (typeof o == "object")
        switch (typeof o.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), o.$$typeof) {
          case f:
            return "Portal";
          case M:
            return (o.displayName || "Context") + ".Provider";
          case v:
            return (o._context.displayName || "Context") + ".Consumer";
          case I:
            var g = o.render;
            return o = o.displayName, o || (o = g.displayName || g.name || "", o = o !== "" ? "ForwardRef(" + o + ")" : "ForwardRef"), o;
          case O:
            return g = o.displayName || null, g !== null ? g : t(o.type) || "Memo";
          case B:
            g = o._payload, o = o._init;
            try {
              return t(o(g));
            } catch {
            }
        }
      return null;
    }
    function e(o) {
      return "" + o;
    }
    function n(o) {
      try {
        e(o);
        var g = !1;
      } catch {
        g = !0;
      }
      if (g) {
        g = console;
        var R = g.error, N = typeof Symbol == "function" && Symbol.toStringTag && o[Symbol.toStringTag] || o.constructor.name || "Object";
        return R.call(
          g,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          N
        ), e(o);
      }
    }
    function s(o) {
      if (o === S) return "<>";
      if (typeof o == "object" && o !== null && o.$$typeof === B)
        return "<...>";
      try {
        var g = t(o);
        return g ? "<" + g + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function r() {
      var o = J.A;
      return o === null ? null : o.getOwner();
    }
    function a() {
      return Error("react-stack-top-frame");
    }
    function c(o) {
      if (G.call(o, "key")) {
        var g = Object.getOwnPropertyDescriptor(o, "key").get;
        if (g && g.isReactWarning) return !1;
      }
      return o.key !== void 0;
    }
    function i(o, g) {
      function R() {
        _ || (_ = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          g
        ));
      }
      R.isReactWarning = !0, Object.defineProperty(o, "key", {
        get: R,
        configurable: !0
      });
    }
    function l() {
      var o = t(this.type);
      return x[o] || (x[o] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), o = this.props.ref, o !== void 0 ? o : null;
    }
    function d(o, g, R, N, F, W, te, ne) {
      return R = W.ref, o = {
        $$typeof: h,
        type: o,
        key: g,
        props: W,
        _owner: F
      }, (R !== void 0 ? R : null) !== null ? Object.defineProperty(o, "ref", {
        enumerable: !1,
        get: l
      }) : Object.defineProperty(o, "ref", { enumerable: !1, value: null }), o._store = {}, Object.defineProperty(o._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(o, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(o, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: te
      }), Object.defineProperty(o, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ne
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    }
    function E(o, g, R, N, F, W, te, ne) {
      var j = g.children;
      if (j !== void 0)
        if (N)
          if (u(j)) {
            for (N = 0; N < j.length; N++)
              k(j[N]);
            Object.freeze && Object.freeze(j);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else k(j);
      if (G.call(g, "key")) {
        j = t(o);
        var z = Object.keys(g).filter(function(U) {
          return U !== "key";
        });
        N = 0 < z.length ? "{key: someKey, " + z.join(": ..., ") + ": ...}" : "{key: someKey}", ee[j + N] || (z = 0 < z.length ? "{" + z.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          N,
          j,
          z,
          j
        ), ee[j + N] = !0);
      }
      if (j = null, R !== void 0 && (n(R), j = "" + R), c(g) && (n(g.key), j = "" + g.key), "key" in g) {
        R = {};
        for (var C in g)
          C !== "key" && (R[C] = g[C]);
      } else R = g;
      return j && i(
        R,
        typeof o == "function" ? o.displayName || o.name || "Unknown" : o
      ), d(
        o,
        j,
        W,
        F,
        r(),
        R,
        te,
        ne
      );
    }
    function k(o) {
      typeof o == "object" && o !== null && o.$$typeof === h && o._store && (o._store.validated = 1);
    }
    var w = Re, h = Symbol.for("react.transitional.element"), f = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), v = Symbol.for("react.consumer"), M = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), $ = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), Q = Symbol.for("react.activity"), K = Symbol.for("react.client.reference"), J = w.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = Object.prototype.hasOwnProperty, u = Array.isArray, P = console.createTask ? console.createTask : function() {
      return null;
    };
    w = {
      "react-stack-bottom-frame": function(o) {
        return o();
      }
    };
    var _, x = {}, T = w["react-stack-bottom-frame"].bind(
      w,
      a
    )(), Y = P(s(a)), ee = {};
    oe.Fragment = S, oe.jsx = function(o, g, R, N, F) {
      var W = 1e4 > J.recentlyCreatedOwnerStacks++;
      return E(
        o,
        g,
        R,
        !1,
        N,
        F,
        W ? Error("react-stack-top-frame") : T,
        W ? P(s(o)) : Y
      );
    }, oe.jsxs = function(o, g, R, N, F) {
      var W = 1e4 > J.recentlyCreatedOwnerStacks++;
      return E(
        o,
        g,
        R,
        !0,
        N,
        F,
        W ? Error("react-stack-top-frame") : T,
        W ? P(s(o)) : Y
      );
    };
  }()), oe;
}
var me;
function Te() {
  return me || (me = 1, process.env.NODE_ENV === "production" ? le.exports = ke() : le.exports = $e()), le.exports;
}
var p = Te();
const Ae = {
  board: {
    className: "",
    columns: 3,
    height: 500,
    outlineStrokeColor: "#000",
    rows: 4,
    scatterArea: 0,
    showBoardSlotOutlines: !0,
    snapThreshold: 20,
    width: 400
  },
  checkLocalStorage: !0,
  completionAnimation: {
    type: "confetti",
    className: "",
    duration: 3e3,
    message: "Puzzle Complete! 🎉"
  },
  enableQRUnlock: !1,
  onComplete: () => {
  },
  onPieceUnlock: () => {
  },
  onRefresh: () => {
  },
  puzzle: {
    className: "",
    responsive: !0,
    timer: {
      className: "",
      enabled: !0
    },
    refreshButton: {
      className: "",
      enabled: !0
    },
    rowsAndColumns: {
      className: "",
      enabled: !1
    }
  },
  puzzlePiece: {
    strokeColor: "gold",
    strokeEnabled: !0
  }
}, q = {
  BOARD_CONFIG: "puzzle-geocache-board-config",
  PUZZLE_STATE: "puzzle-geocache-puzzle-state",
  TIMER_STATE: "puzzle-geocache-timer-state"
}, ie = 720 * 60 * 60 * 1e3, ve = 2, Se = Ce(void 0), xe = (t) => {
  if (typeof window < "u" && t) {
    const e = localStorage.getItem(q.BOARD_CONFIG);
    if (e) {
      const n = JSON.parse(e);
      if (typeof n.rows == "number" && typeof n.columns == "number")
        return { rows: n.rows, columns: n.columns };
    }
  }
  return {};
}, Ne = (t) => {
  const { rows: e, columns: n } = xe(
    t.checkLocalStorage
  ), [s, r] = L(n ?? t.columns), [a, c] = L(e ?? t.rows), [i, l] = L(!0), [d, E] = L(0), k = a * s, f = {
    columns: s,
    numPieces: k,
    refreshCount: d,
    rows: a,
    timerIsRunning: i,
    setBoardGrid: (S, m) => {
      c(S), r(m), l(!1), setTimeout(() => l(!0), 10);
    },
    refreshBoard: () => {
      l(!1), E((S) => S + 1), setTimeout(() => l(!0), 10);
    },
    setTimerIsRunning: l
  };
  return /* @__PURE__ */ p.jsx(Se.Provider, { value: f, children: t.children });
}, Ie = () => {
  const t = Ee(Se);
  if (!t)
    throw new Error("usePuzzleContext must be used within a PuzzleProvider");
  return t;
}, je = (t, e) => e ? {
  board: {
    className: e.board?.className ?? t.board.className,
    columns: e.board?.columns ?? t.board.columns,
    height: e.board?.height ?? t.board.height,
    outlineStrokeColor: e.board?.outlineStrokeColor ?? t.board.outlineStrokeColor,
    rows: e.board?.rows ?? t.board.rows,
    scatterArea: e.board?.scatterArea ?? t.board.scatterArea,
    showBoardSlotOutlines: e.board?.showBoardSlotOutlines ?? t.board.showBoardSlotOutlines,
    snapThreshold: e.board?.snapThreshold ?? t.board.snapThreshold,
    width: e.board?.width ?? t.board.width
  },
  checkLocalStorage: e.checkLocalStorage ?? t.checkLocalStorage,
  completionAnimation: {
    type: e.completionAnimation?.type ?? t.completionAnimation.type,
    className: e.completionAnimation?.className ?? t.completionAnimation.className,
    duration: e.completionAnimation?.duration ?? t.completionAnimation.duration,
    message: e.completionAnimation?.message ?? t.completionAnimation.message,
    customComponent: e.completionAnimation?.customComponent
  },
  enableQRUnlock: e.enableQRUnlock ?? t.enableQRUnlock,
  onComplete: e.onComplete ?? t.onComplete,
  onPieceUnlock: e.onPieceUnlock ?? t.onPieceUnlock,
  onRefresh: e.onRefresh ?? t.onRefresh,
  puzzlePiece: {
    strokeColor: e.puzzlePiece?.strokeColor ?? t.puzzlePiece.strokeColor,
    strokeEnabled: e.puzzlePiece?.strokeEnabled ?? t.puzzlePiece.strokeEnabled
  },
  puzzle: {
    className: e.puzzle?.className ?? t.puzzle.className,
    responsive: e.puzzle?.responsive ?? t.puzzle.responsive,
    timer: {
      className: e.puzzle?.timer?.className ?? t.puzzle.timer.className,
      enabled: e.puzzle?.timer?.enabled ?? t.puzzle.timer.enabled
    },
    refreshButton: {
      className: e.puzzle?.refreshButton?.className ?? t.puzzle.refreshButton.className,
      enabled: e.puzzle?.refreshButton?.enabled ?? t.puzzle.refreshButton.enabled
    },
    rowsAndColumns: {
      className: e.puzzle?.rowsAndColumns?.className ?? t.puzzle.rowsAndColumns.className,
      enabled: e.puzzle?.rowsAndColumns?.enabled ?? t.puzzle.rowsAndColumns.enabled
    }
  }
} : t;
function Oe({
  initialX: t,
  initialY: e,
  initialIsSnapped: n = !1,
  boardRef: s,
  targetX: r,
  targetY: a,
  snapThreshold: c,
  onSnap: i,
  onPositionChange: l,
  onDragStart: d,
  onDragEnd: E
}) {
  const k = X(null), [w, h] = L({
    isDragging: !1,
    x: t,
    y: e
  }), [f, S] = L(n);
  D(() => {
    n !== void 0 && n !== f && S(n);
  }, [n, f]), D(() => {
    h((u) => u.isDragging || u.x === t && u.y === e ? u : { ...u, x: t, y: e });
  }, [t, e]);
  const m = X(null), b = X(null), v = A(
    (u, P) => {
      const _ = s.current;
      if (!_) return { x: u, y: P };
      const x = _.createSVGPoint();
      x.x = u, x.y = P;
      const T = x.matrixTransform(_.getScreenCTM()?.inverse());
      return { x: T.x, y: T.y };
    },
    [s]
  ), M = A(
    (u, P) => Math.hypot(u - r, P - a) <= c ? (S(!0), h((x) => ({ ...x, x: r, y: a, isDragging: !1 })), i?.(), !0) : !1,
    [r, a, c, i]
  ), I = A(
    (u) => {
      const P = m.current;
      if (!P || !P.isDragging || u.pointerId !== P.pointerId) return;
      const _ = v(u.clientX, u.clientY), x = _.x - P.offsetX, T = _.y - P.offsetY;
      h((Y) => ({ ...Y, x, y: T })), u.preventDefault();
    },
    [v]
  );
  b.current = I;
  const y = A(
    (u) => {
      const P = m.current;
      if (!P || !P.isDragging || u.pointerId !== P.pointerId) return;
      P.isDragging = !1, b.current && window.removeEventListener("pointermove", b.current), window.removeEventListener("pointerup", y), window.removeEventListener("pointercancel", y);
      const _ = k.current;
      _ && _.hasPointerCapture(u.pointerId) && _.releasePointerCapture(u.pointerId);
      const x = v(u.clientX, u.clientY), T = x.x - P.offsetX, Y = x.y - P.offsetY;
      m.current = null, M(T, Y) || (h((o) => ({ ...o, isDragging: !1 })), l && l(T, Y)), E(), u.preventDefault();
    },
    [v, M, E, l]
  ), $ = A(
    (u) => {
      if (f || !u.isPrimary) return;
      const P = k.current;
      if (!P) return;
      const _ = v(u.clientX, u.clientY), x = _.x - w.x, T = _.y - w.y;
      m.current = {
        offsetX: x,
        offsetY: T,
        pointerId: u.pointerId,
        isDragging: !0
      }, P.setPointerCapture(u.pointerId), b.current && window.addEventListener("pointermove", b.current, { passive: !1 }), window.addEventListener("pointerup", y, { passive: !1 }), window.addEventListener("pointercancel", y, { passive: !1 }), h((Y) => ({ ...Y, isDragging: !0 })), d(), u.preventDefault();
    },
    [f, w.x, w.y, v, y, d]
  ), O = A((u) => {
    u.preventDefault();
  }, []), B = A((u) => {
    u.preventDefault();
  }, []), Q = A(
    (u) => {
      y(u.nativeEvent);
    },
    [y]
  ), K = A(
    (u, P) => {
      f || h((_) => ({ ..._, x: u, y: P }));
    },
    [f]
  ), J = A(
    (u, P) => {
      f || h((_) => {
        const x = _.x + u, T = _.y + P;
        return l && setTimeout(() => l(x, T), 0), { ..._, x, y: T };
      });
    },
    [f, l]
  ), G = A(() => f ? !1 : M(w.x, w.y), [f, w.x, w.y, M]);
  return {
    ref: k,
    dragState: w,
    isSnapped: f,
    moveTo: K,
    moveBy: J,
    trySnap: G,
    handlers: {
      onPointerDown: $,
      onPointerMove: O,
      onPointerUp: B,
      onPointerCancel: Q,
      style: {
        touchAction: "none",
        cursor: f ? "default" : w.isDragging ? "grabbing" : "grab"
      }
    }
  };
}
const De = "_puzzlePiece_i83y2_11", Le = "_unlockAnimation_i83y2_37", fe = {
  puzzlePiece: De,
  unlockAnimation: Le
}, Me = 10, Be = ({
  boardHeight: t,
  boardWidth: e,
  image: n,
  pieceIndex: s,
  initialX: r,
  initialY: a,
  initialIsSnapped: c,
  isNewlyUnlocked: i,
  path: l,
  snapThreshold: d,
  boardRef: E,
  targetX: k,
  targetY: w,
  puzzlePieceOptions: h,
  onSnap: f,
  onSnapWithKeyboard: S,
  onPositionChange: m,
  registerPieceRef: b,
  boardSlotKey: v,
  onDragStart: M,
  onDragEnd: I
}) => {
  const { ref: y, dragState: $, isSnapped: O, moveBy: B, trySnap: Q, handlers: K } = Oe({
    initialX: r,
    initialY: a,
    initialIsSnapped: c,
    snapThreshold: d,
    boardRef: E,
    targetX: k,
    targetY: w,
    onSnap: f,
    onPositionChange: m,
    onDragStart: M,
    onDragEnd: I
  });
  D(() => (b && b(v, y.current), () => {
    b && b(v, null);
  }), [y, b, v]);
  const J = (u) => {
    if (O) return;
    const P = Me;
    switch (u.key) {
      case "ArrowUp":
        u.preventDefault(), B(0, -P);
        break;
      case "ArrowDown":
        u.preventDefault(), B(0, P);
        break;
      case "ArrowLeft":
        u.preventDefault(), B(-P, 0);
        break;
      case "ArrowRight":
        u.preventDefault(), B(P, 0);
        break;
      case "Enter":
      case " ": {
        u.preventDefault(), Q() && S && S();
        break;
      }
    }
  };
  D(() => {
    $.isDragging && y.current && y.current.parentNode && !O && y.current.parentNode.appendChild(y.current);
  }, [y, $.isDragging, O]), D(() => {
    if (!$.isDragging && O && y.current && y.current.parentNode) {
      const u = y.current.parentNode;
      u.firstChild !== y.current && u.insertBefore(y.current, u.firstChild);
    }
  }, [y, $.isDragging, O]);
  const G = [
    fe.puzzlePiece,
    i ? fe.unlockAnimation : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p.jsxs(
    "g",
    {
      ref: y,
      transform: O ? "" : `translate(${$.x},${$.y})`,
      ...K,
      className: G,
      tabIndex: O ? -1 : 0,
      onKeyDown: J,
      children: [
        /* @__PURE__ */ p.jsx("defs", { children: /* @__PURE__ */ p.jsx("clipPath", { id: `piece-clip-${s}`, children: /* @__PURE__ */ p.jsx("path", { d: l }) }) }),
        /* @__PURE__ */ p.jsx(
          "image",
          {
            href: n,
            x: 0,
            y: 0,
            width: e,
            height: t,
            clipPath: `url(#piece-clip-${s})`,
            preserveAspectRatio: "xMidYMid slice"
          }
        ),
        /* @__PURE__ */ p.jsx(
          "path",
          {
            d: l,
            fill: "none",
            stroke: O || !h.strokeEnabled ? "" : h.strokeColor,
            strokeWidth: h.strokeEnabled ? ve : 0
          }
        )
      ]
    }
  );
}, Ue = "_completionOverlay_1qv9y_1", Fe = "_message_1qv9y_14", Ye = "_confetti_1qv9y_41", We = "_confettiContainer_1qv9y_45", Ze = "_confettiPiece_1qv9y_55", qe = "_fade_1qv9y_79", Je = "_zoom_1qv9y_102", H = {
  completionOverlay: Ue,
  message: Fe,
  confetti: Ye,
  confettiContainer: We,
  confettiPiece: Ze,
  fade: qe,
  zoom: Je
}, Ve = ({
  animationType: t,
  className: e = "",
  duration: n = 3e3,
  onAnimationComplete: s,
  message: r = "Puzzle Complete! 🎉"
}) => {
  const [a, c] = L(!0);
  if (D(() => {
    if (n > 0) {
      const l = setTimeout(() => {
        c(!1), s?.();
      }, n);
      return () => clearTimeout(l);
    }
  }, [n, s]), !a || t === "none") return null;
  const i = {
    confetti: H.confetti,
    fade: H.fade,
    zoom: H.zoom,
    none: ""
  }[t];
  return /* @__PURE__ */ p.jsxs("div", { className: `${H.completionOverlay} ${i} ${e}`, children: [
    t === "confetti" && /* @__PURE__ */ p.jsx("div", { className: H.confettiContainer, children: Array.from({ length: 50 }).map((l, d) => /* @__PURE__ */ p.jsx(
      "div",
      {
        className: H.confettiPiece,
        style: {
          "--delay": `${Math.random() * 0.5}s`,
          "--x": `${Math.random() * 100}vw`,
          "--rotation": `${Math.random() * 360}deg`,
          "--color": ["#ff0", "#f0f", "#0ff", "#f00", "#0f0", "#00f"][Math.floor(Math.random() * 6)]
        }
      },
      d
    )) }),
    /* @__PURE__ */ p.jsx("div", { className: H.message, children: r })
  ] });
}, Ge = ({
  columns: t,
  rows: e
}) => {
  const n = [];
  for (let s = 0; s < e; s++) {
    n[s] = [];
    for (let r = 0; r < t; r++) {
      const a = r === t - 1 ? 0 : (s + r) % 2 === 0 ? 1 : -1, c = s === e - 1 ? 0 : (s + r) % 2 === 0 ? 1 : -1, i = r === 0 ? 0 : -n[s][r - 1][1], l = s === 0 ? 0 : -n[s - 1][r][2];
      n[s][r] = [l, a, c, i];
    }
  }
  return n;
}, be = ({
  col: t,
  row: e,
  options: n
}) => {
  const { boardWidth: s, boardHeight: r, rows: a, columns: c, edgeMap: i } = n, l = s / c, d = r / a, E = t * l, k = e * d, [w, h, f, S] = i[e][t], m = Math.min(l, d) / 3, b = m / 2;
  let v = `M${E},${k}`;
  return w === 0 ? v += ` h${l}` : (v += ` h${(l - m) / 2}`, v += ` a${b},${b} 0 0 ${w === 1 ? 1 : 0} ${m},0`, v += ` h${(l - m) / 2}`), h === 0 ? v += ` v${d}` : (v += ` v${(d - m) / 2}`, v += ` a${b},${b} 0 0 ${h === 1 ? 1 : 0} 0,${m}`, v += ` v${(d - m) / 2}`), f === 0 ? v += ` h-${l}` : (v += ` h-${(l - m) / 2}`, v += ` a${b},${b} 0 0 ${f === 1 ? 1 : 0} -${m},0`, v += ` h-${(l - m) / 2}`), S === 0 ? v += ` v-${d}` : (v += ` v-${(d - m) / 2}`, v += ` a${b},${b} 0 0 ${S === 1 ? 1 : 0} 0,-${m}`, v += ` v-${(d - m) / 2}`), v += " Z", v;
}, Qe = () => {
  const t = A((c) => {
    try {
      const i = `${q.PUZZLE_STATE}-${c.imageId}`;
      localStorage.setItem(i, JSON.stringify(c));
    } catch (i) {
      console.warn("Failed to save puzzle state:", i), we();
      try {
        const l = `${q.PUZZLE_STATE}-${c.imageId}`;
        localStorage.setItem(l, JSON.stringify(c));
      } catch (l) {
        console.error("Failed to save puzzle state after cleanup:", l);
      }
    }
  }, []), e = A((c) => {
    try {
      const i = `${q.PUZZLE_STATE}-${c}`, l = localStorage.getItem(i);
      if (!l)
        return null;
      const d = JSON.parse(l);
      return !d.imageId || !Array.isArray(d.pieces) || !Array.isArray(d.snappedPieceIds) || typeof d.timestamp != "number" ? (console.warn("Invalid puzzle state found, ignoring"), null) : (d.unlockedPieceIds || (d.unlockedPieceIds = []), d.imageId === c && Date.now() - d.timestamp < ie ? d : (Date.now() - d.timestamp >= ie && localStorage.removeItem(i), null));
    } catch (i) {
      return console.warn("Failed to load puzzle state:", i), null;
    }
  }, []), n = A((c) => {
    try {
      const i = `${q.PUZZLE_STATE}-${c}`;
      localStorage.removeItem(i);
    } catch (i) {
      console.warn("Failed to clear puzzle state:", i);
    }
  }, []), s = A((c, i) => {
    try {
      const l = `${q.TIMER_STATE}-${c}`;
      localStorage.setItem(l, JSON.stringify(i));
    } catch (l) {
      console.warn("Failed to save timer state:", l);
    }
  }, []), r = A((c) => {
    try {
      const i = `${q.TIMER_STATE}-${c}`, l = localStorage.getItem(i);
      if (!l) return null;
      const d = JSON.parse(l);
      return typeof d.elapsedTime != "number" || typeof d.timestamp != "number" ? null : Date.now() - d.timestamp < ie ? d : null;
    } catch (i) {
      return console.warn("Failed to load timer state:", i), null;
    }
  }, []), a = A((c) => {
    try {
      const i = `${q.TIMER_STATE}-${c}`;
      localStorage.removeItem(i);
    } catch (i) {
      console.warn("Failed to clear timer state:", i);
    }
  }, []);
  return {
    savePuzzleState: t,
    loadPuzzleState: e,
    clearPuzzleState: n,
    saveTimerState: s,
    loadTimerState: r,
    clearTimerState: a
  };
}, we = () => {
  try {
    const t = Object.keys(localStorage), e = Date.now();
    t.forEach((n) => {
      if (n.startsWith(q.PUZZLE_STATE) || n.startsWith(q.TIMER_STATE))
        try {
          const s = localStorage.getItem(n);
          if (s) {
            const r = JSON.parse(s);
            r.timestamp && e - r.timestamp >= ie && localStorage.removeItem(n);
          }
        } catch {
          localStorage.removeItem(n);
        }
    });
  } catch (t) {
    console.warn("Failed to cleanup old puzzles:", t);
  }
}, Ke = (t, e, n, s) => {
  const [r, a] = L(/* @__PURE__ */ new Set()), [c, i] = L(null), l = X(!1), d = A((f) => {
    a((S) => {
      if (S.has(f))
        return S;
      const m = /* @__PURE__ */ new Set([...S, f]);
      return i(f), setTimeout(() => i(null), 1e3), m;
    });
  }, []);
  D(() => {
    if (!l.current) {
      if (l.current = !0, !s) {
        const f = /* @__PURE__ */ new Set();
        for (let S = 0; S < e; S++)
          for (let m = 0; m < n; m++)
            f.add(`${S}-${m}`);
        a(f);
        return;
      }
      try {
        const f = `${q.PUZZLE_STATE}-${t}`, S = localStorage.getItem(f);
        if (S) {
          const m = JSON.parse(S);
          if (m.unlockedPieceIds && Array.isArray(m.unlockedPieceIds)) {
            a(new Set(m.unlockedPieceIds));
            return;
          }
        }
        a(/* @__PURE__ */ new Set());
      } catch (f) {
        console.warn("Failed to load unlocked pieces:", f), a(/* @__PURE__ */ new Set());
      }
    }
  }, [t, s, e, n]), D(() => {
    if (!s)
      return;
    const S = new URLSearchParams(window.location.search).get("unlock");
    S && (d(S), window.history.replaceState({}, "", window.location.pathname));
  }, [s, d]);
  const E = A(
    (f) => s ? r.has(f) : !0,
    [r, s]
  ), k = A(() => c, [c]), w = A((f) => {
    a(new Set(f));
  }, []), h = A(() => {
    a(/* @__PURE__ */ new Set());
  }, []);
  return {
    unlockedPieceIds: Array.from(r),
    unlockPiece: d,
    isPieceUnlocked: E,
    getNewlyUnlockedPieceId: k,
    unlockAllPieces: w,
    resetUnlockedPieces: h,
    unlockedCount: r.size
  };
}, Xe = (t) => {
  try {
    if (t.startsWith("data:")) {
      const e = t.substring(0, Math.min(200, t.length));
      return btoa(e).substring(0, 32).replace(/[/+=]/g, "_");
    }
    return btoa(t).substring(0, 32).replace(/[/+=]/g, "_");
  } catch {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t.charCodeAt(s);
      n = (n << 5) - n + r, n = n & n;
    }
    return Math.abs(n).toString(36);
  }
}, He = "_boardSlotOutline_mbtg0_1", et = "_snapped_mbtg0_6", pe = {
  boardSlotOutline: He,
  snapped: et
}, tt = (t) => {
  const { boardPathOptions: e, boardSlots: n, showBoardSlotOutlines: s, snappedPieceIds: r } = t;
  return s ? /* @__PURE__ */ p.jsx("g", { "data-testid": "board-outlines", children: n.map(({ pieceRow: a, pieceCol: c }) => {
    const i = `${a}-${c}`, l = r.has(i);
    return /* @__PURE__ */ p.jsx(
      "path",
      {
        "data-testid": `outline-${a}-${c}`,
        className: `${pe.boardSlotOutline} ${l ? pe.snapped : ""}`,
        d: be({ row: a, col: c, options: e }),
        stroke: e.outlineStrokeColor
      },
      `outline-${a}-${c}`
    );
  }) }) : null;
}, nt = (t, e) => Array.from({ length: t * e }, (n, s) => ({
  // Math.floor(i / columns) gives us the row number (0, 1, 2, ...)
  // i % columns gives us the column number (0, 1, 2, ..., columns-1)
  pieceRow: Math.floor(s / e),
  pieceCol: s % e
})), rt = (t) => {
  const e = [...t];
  for (let n = e.length - 1; n > 0; n--) {
    const s = Math.floor(Math.random() * (n + 1));
    [e[n], e[s]] = [e[s], e[n]];
  }
  return e;
}, he = ({
  boardWidth: t,
  boardHeight: e,
  boardSlots: n,
  pieceHeight: s,
  pieceWidth: r,
  scatterArea: a
}) => {
  const c = rt(n), i = t + a * 2, l = e + a * 2, d = -a, E = -a;
  return c.map(({ pieceRow: k, pieceCol: w }) => {
    const h = d + Math.random() * (i - r), f = E + Math.random() * (l - s), S = w * r, m = k * s, b = h - S, v = f - m;
    return { pieceRow: k, pieceCol: w, x: b, y: v };
  });
}, ot = "_board_13b9q_1", st = {
  board: ot
}, at = (t) => {
  const {
    boardHeight: e,
    boardWidth: n,
    checkLocalStorage: s,
    className: r,
    columns: a,
    completionAnimation: c,
    enableQRUnlock: i,
    image: l,
    onPieceUnlock: d,
    onPuzzleComplete: E,
    outlineStrokeColor: k,
    puzzlePieceOptions: w,
    rows: h,
    showBoardSlotOutlines: f,
    snapThreshold: S,
    scatterArea: m,
    onAnyPieceActiveChange: b
  } = t, v = e / h, M = n / a, [I, y] = L([]), [$, O] = L(/* @__PURE__ */ new Set()), [B, Q] = L(!1), [K, J] = L(!1), G = X(null), u = X(/* @__PURE__ */ new Map()), { savePuzzleState: P, loadPuzzleState: _, clearPuzzleState: x } = Qe(), T = ae(() => Xe(l), [l]), {
    unlockedPieceIds: Y,
    isPieceUnlocked: ee,
    getNewlyUnlockedPieceId: o
  } = Ke(T, h, a, i), g = ae(() => Ge({ rows: h, columns: a }), [h, a]), R = ae(
    () => ({
      boardHeight: e,
      boardWidth: n,
      columns: a,
      edgeMap: g,
      outlineStrokeColor: k,
      rows: h
    }),
    [e, n, a, g, k, h]
  ), N = ae(() => nt(h, a), [h, a]);
  D(() => {
    s && we();
  }, [s]), D(() => {
    let z = null;
    if (s && (z = _(T)), z && z.rows === h && z.columns === a && z.pieces.length === h * a)
      y(z.pieces), O(new Set(z.snappedPieceIds)), Q(!0);
    else {
      const C = he({
        boardHeight: e,
        boardWidth: n,
        boardSlots: N,
        pieceHeight: v,
        pieceWidth: M,
        scatterArea: m
      });
      y(C), O(/* @__PURE__ */ new Set()), Q(!0);
    }
    u.current.clear();
  }, [T, h, a, s]);
  const F = X({ boardHeight: e, boardWidth: n, scatterArea: m });
  D(() => {
    if (!B) return;
    if (F.current.boardHeight !== e || F.current.boardWidth !== n || F.current.scatterArea !== m) {
      F.current = { boardHeight: e, boardWidth: n, scatterArea: m };
      const C = he({
        boardHeight: e,
        boardWidth: n,
        boardSlots: N,
        pieceHeight: v,
        pieceWidth: M,
        scatterArea: m
      });
      y(C), O(/* @__PURE__ */ new Set()), u.current.clear();
    }
  }, [e, n, m, B]), D(() => {
    if (!s || !B || I.length === 0)
      return;
    const z = setTimeout(() => {
      P({
        imageId: T,
        pieces: I,
        snappedPieceIds: Array.from($),
        unlockedPieceIds: Y,
        timestamp: Date.now(),
        rows: h,
        columns: a
      });
    }, 500);
    return () => clearTimeout(z);
  }, [
    I,
    $,
    Y,
    T,
    h,
    a,
    s,
    B,
    P
  ]), D(() => {
    const z = h * a;
    $.size === z && $.size > 0 && (J(!0), s && x(T), E?.());
  }, [$.size, h, a, E, x, T, s]);
  const W = A((z, C, U) => {
    y((V) => {
      const Z = [...V];
      return Z[z] = { ...Z[z], x: C, y: U }, Z;
    });
  }, []), te = (z) => {
    const { pieceRow: C, pieceCol: U } = I[z], V = `${C}-${U}`;
    O((Z) => /* @__PURE__ */ new Set([...Z, V]));
  }, ne = (z) => {
    const C = I.find((U, V) => {
      const Z = `${U.pieceRow}-${U.pieceCol}`;
      return V !== z && !$.has(Z);
    });
    if (C) {
      const U = `${C.pieceRow}-${C.pieceCol}`, V = u.current.get(U);
      V && V.focus();
    }
  }, j = (z, C) => {
    C ? u.current.set(z, C) : u.current.delete(z);
  };
  return /* @__PURE__ */ p.jsxs("div", { style: { position: "relative", width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ p.jsxs(
      "svg",
      {
        ref: G,
        className: `${st.board} ${r}`,
        "data-testid": "board",
        height: e,
        width: n,
        viewBox: `0 0 ${n} ${e}`,
        children: [
          /* @__PURE__ */ p.jsx(
            tt,
            {
              boardPathOptions: R,
              boardSlots: N,
              showBoardSlotOutlines: f,
              snappedPieceIds: $
            }
          ),
          I.map((z, C) => ({ ...z, originalIndex: C })).filter(({ pieceRow: z, pieceCol: C }) => {
            const U = `${z}-${C}`;
            return i ? ee(U) : !0;
          }).map(({ pieceRow: z, pieceCol: C, x: U, y: V, originalIndex: Z }, Pt) => {
            const ce = `${z}-${C}`, ze = $.has(ce), Pe = o() === ce;
            return /* @__PURE__ */ p.jsx(
              Be,
              {
                boardHeight: e,
                boardWidth: n,
                boardSlotKey: ce,
                image: l,
                pieceIndex: Z,
                initialX: U,
                initialY: V,
                initialIsSnapped: ze,
                isNewlyUnlocked: Pe,
                onSnap: () => te(Z),
                onSnapWithKeyboard: () => ne(Z),
                onPositionChange: (ye, _e) => W(Z, ye, _e),
                path: be({ col: C, row: z, options: R }),
                puzzlePieceOptions: w,
                registerPieceRef: j,
                snapThreshold: S,
                boardRef: G,
                targetX: C * M / 100,
                targetY: z * v / 100,
                onDragStart: () => b?.(!0),
                onDragEnd: () => b?.(!1)
              },
              ce
            );
          })
        ]
      }
    ),
    K && c.customComponent ? /* @__PURE__ */ p.jsx(c.customComponent, {}) : K && c.type !== "none" ? /* @__PURE__ */ p.jsx(
      Ve,
      {
        animationType: c.type,
        className: c.className,
        duration: c.duration,
        message: c.message,
        onAnimationComplete: c.duration > 0 ? () => J(!1) : void 0
      }
    ) : null
  ] });
}, ct = "_editRowsColumns_1gi2i_1", lt = "_inlineNote_1gi2i_51", ge = {
  editRowsColumns: ct,
  inlineNote: lt
}, it = (t) => {
  const { className: e, currentColumns: n, currentRows: s, onBoardSlotChange: r } = t, [a, c] = L(s.toString()), [i, l] = L(n.toString()), d = parseInt(a) !== s || parseInt(i) !== n, E = parseInt(a) >= 2 && parseInt(a) <= 10, k = parseInt(i) >= 2 && parseInt(i) <= 10, w = E && k && d;
  D(() => {
    c(s.toString()), l(n.toString());
  }, [s, n]);
  const h = (m) => {
    const b = m.target.value;
    (b === "" || /^\d+$/.test(b)) && c(b);
  }, f = (m) => {
    const b = m.target.value;
    (b === "" || /^\d+$/.test(b)) && l(b);
  }, S = (m) => {
    m.preventDefault(), w && (localStorage.setItem(
      "puzzle-geocache",
      JSON.stringify({
        rows: parseFloat(a),
        columns: parseFloat(i)
      })
    ), r(parseInt(a), parseInt(i)));
  };
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxs(
      "form",
      {
        "data-testid": "edit-rows-columns",
        className: `${ge.editRowsColumns} ${e}`,
        onSubmit: S,
        children: [
          /* @__PURE__ */ p.jsxs("label", { children: [
            "Rows:",
            /* @__PURE__ */ p.jsx("input", { type: "text", value: a, onChange: h, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ p.jsxs("label", { children: [
            "Cols:",
            /* @__PURE__ */ p.jsx("input", { type: "text", value: i, onChange: f, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ p.jsx("input", { type: "submit", value: "Ok", disabled: !w })
        ]
      }
    ),
    /* @__PURE__ */ p.jsx("span", { className: ge.inlineNote, children: "(Valid numbers: 2-10)" })
  ] });
}, ut = "_refreshButton_17b0p_1", dt = {
  refreshButton: ut
}, mt = (t) => {
  const { className: e, onRefresh: n } = t;
  return /* @__PURE__ */ p.jsx(
    "button",
    {
      "data-testid": "refresh-button",
      className: `${dt.refreshButton} ${e}`,
      onClick: n,
      title: "Refresh puzzle",
      children: /* @__PURE__ */ p.jsxs(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "#000000",
          strokeWidth: ve,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            /* @__PURE__ */ p.jsx("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
            /* @__PURE__ */ p.jsx("path", { d: "M21 3v5h-5" }),
            /* @__PURE__ */ p.jsx("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
            /* @__PURE__ */ p.jsx("path", { d: "M3 21v-5h5" })
          ]
        }
      )
    }
  );
}, ft = "_timer_1vcjo_1", pt = {
  timer: ft
}, ht = (t) => {
  const { className: e, isRunning: n, onTimeUpdate: s } = t, [r, a] = L(0), c = X(null);
  D(() => (n ? c.current = setInterval(() => {
    a((l) => {
      const d = l + 1;
      return s?.(d), d;
    });
  }, 1e3) : c.current && (clearInterval(c.current), c.current = null), () => {
    c.current && clearInterval(c.current);
  }), [n, s]), D(() => {
    n && a(0);
  }, [n]);
  const i = (l) => {
    const d = Math.floor(l / 60), E = l % 60;
    return `${d.toString().padStart(2, "0")}:${E.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ p.jsx("div", { "data-testid": "timer", className: `${pt.timer} ${e}`, children: i(r) });
}, gt = "_puzzle_c9hl6_1", vt = "_responsive_c9hl6_5", St = "_settingsContainer_c9hl6_13", se = {
  puzzle: gt,
  responsive: vt,
  settingsContainer: St
}, bt = (t) => {
  const { image: e, onComplete: n, onRefresh: s, options: r } = t, {
    columns: a,
    refreshBoard: c,
    refreshCount: i,
    rows: l,
    setBoardGrid: d,
    setTimerIsRunning: E,
    timerIsRunning: k
  } = Ie(), [w, h] = L(!1);
  D(() => {
    if (!w) return;
    const I = ($) => {
      $.preventDefault();
    }, y = ($) => {
      $.preventDefault();
    };
    return window.addEventListener("touchmove", I, { passive: !1 }), window.addEventListener("gesturestart", y, { passive: !1 }), () => {
      window.removeEventListener("touchmove", I), window.removeEventListener("gesturestart", y);
    };
  }, [w]);
  const f = (I, y) => {
    d(I, y);
  }, S = () => {
    s?.(), c();
  }, m = () => {
    E(!1), n?.();
  }, b = r.board.width / r.board.height, v = r.puzzle.responsive ? `${se.puzzle} ${se.responsive}` : se.puzzle, M = ae(() => ({
    ...r.puzzle.responsive ? { "--puzzle-aspect-ratio": b.toString() } : {},
    touchAction: w ? "none" : void 0,
    overscrollBehavior: w ? "none" : void 0
  }), [r.puzzle.responsive, b, w]);
  return /* @__PURE__ */ p.jsxs("div", { "data-testid": "puzzle-content", className: v, style: M, children: [
    r.puzzle.timer.enabled || r.puzzle.refreshButton.enabled ? /* @__PURE__ */ p.jsxs("div", { className: se.settingsContainer, children: [
      r.puzzle.timer.enabled && /* @__PURE__ */ p.jsx(ht, { className: r.puzzle.timer.className, isRunning: k }),
      r.puzzle.refreshButton.enabled && /* @__PURE__ */ p.jsx(
        mt,
        {
          className: r.puzzle.refreshButton.className,
          onRefresh: S
        }
      )
    ] }) : null,
    /* @__PURE__ */ p.jsx(
      at,
      {
        boardHeight: r.board.height,
        boardWidth: r.board.width,
        checkLocalStorage: r.checkLocalStorage,
        className: r.board.className,
        columns: a,
        completionAnimation: r.completionAnimation,
        enableQRUnlock: r.enableQRUnlock,
        image: e,
        onPieceUnlock: r.onPieceUnlock,
        onPuzzleComplete: m,
        outlineStrokeColor: r.board.outlineStrokeColor,
        puzzlePieceOptions: r.puzzlePiece,
        rows: l,
        scatterArea: r.board.scatterArea,
        showBoardSlotOutlines: r.board.showBoardSlotOutlines,
        snapThreshold: r.board.snapThreshold,
        onAnyPieceActiveChange: h
      },
      `${l}-${a}-${i}`
    ),
    r.puzzle.rowsAndColumns.enabled && /* @__PURE__ */ p.jsx("div", { className: se.settingsContainer, children: /* @__PURE__ */ p.jsx(
      it,
      {
        className: r.puzzle.rowsAndColumns.className,
        currentRows: l,
        currentColumns: a,
        onBoardSlotChange: f
      }
    ) })
  ] });
}, _t = (t) => {
  const { options: e } = t, n = je(Ae, e);
  return /* @__PURE__ */ p.jsx(
    Ne,
    {
      checkLocalStorage: n.checkLocalStorage,
      columns: n.board.columns,
      rows: n.board.rows,
      children: /* @__PURE__ */ p.jsx(bt, { ...t, options: n })
    }
  );
}, wt = (t, e, n) => {
  const s = [];
  let r = 1;
  for (let a = 0; a < e; a++)
    for (let c = 0; c < n; c++) {
      const i = `${a}-${c}`, l = `${t}?unlock=${i}`;
      s.push({
        pieceId: i,
        row: a,
        col: c,
        url: l,
        displayName: `Piece ${r}`
      }), r++;
    }
  return s;
}, Rt = (t, e, n) => {
  const s = `${e}-${n}`;
  return `${t}?unlock=${s}`;
}, zt = (t) => {
  const e = ["Piece ID", "Display Name", "Row", "Column", "QR Code URL"], n = t.map((r) => [
    r.pieceId,
    r.displayName,
    r.row.toString(),
    r.col.toString(),
    r.url
  ]);
  return [e, ...n].map((r) => r.join(",")).join(`
`);
}, Ct = () => {
  const s = wt("https://yoursite.com/puzzle", 4, 3);
  console.log("=== QR Code URLs for Printing ==="), console.log(`Generate QR codes from these URLs and print them on cards:
`), s.forEach((r) => {
    console.log(`${r.displayName} (${r.pieceId}):`), console.log(`  URL: ${r.url}`), console.log("");
  }), console.log(`
=== CSV Export ===`), console.log("Copy this CSV data and paste into a spreadsheet:"), console.log(zt(s));
};
export {
  Ve as CompletionAnimation,
  Ae as DEFAULT_PUZZLE_OPTIONS,
  _t as Puzzle,
  zt as exportQRCodesAsCSV,
  wt as generatePuzzleQRCodes,
  Rt as generateSinglePieceQRCode,
  Ct as printQRCodeExample
};
