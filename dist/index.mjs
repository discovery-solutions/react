const p = {}, f = /* @__PURE__ */ new Map();
let d = null;
const v = (r, t) => {
  class e extends HTMLElement {
    constructor() {
      super(...arguments), this.props = {};
    }
    static get observedAttributes() {
      return ["*"];
    }
    connectedCallback() {
      this.props = this.parseAttributes(), p[r] = this;
      const n = f.get(this);
      n && (n.stateIndex = 0, n.effectIndex = 0);
      try {
        d = this;
        const s = t.call(this, this.props);
        s.setAttribute("data-reactive", r), this.innerHTML = "", this.appendChild(s);
      } catch (s) {
        console.error(s), this.innerHTML = "";
      } finally {
        d = null;
      }
    }
    attributeChangedCallback() {
      this.props = this.parseAttributes(), this.connectedCallback();
    }
    parseAttributes() {
      const n = {};
      for (const { name: s, value: a } of Array.from(this.attributes))
        if (s.startsWith("data-")) {
          const c = s.replace(/^data-/, "");
          try {
            n[c] = JSON.parse(a.replace(/'/g, '"'));
          } catch {
            n[c] = a;
          }
        }
      return n;
    }
  }
  customElements.define(r, e);
};
window.React = {
  functions: {}
};
const g = (r, ...t) => {
  var s, a;
  const e = r.reduce((c, l, m) => {
    let o = t[m];
    if (typeof o == "function") {
      const u = `fn_${Math.random().toString(36).substring(2, 15)}`;
      window.React.functions[u] = o, o = `window.React.functions.${u}()`;
    }
    if (Array.isArray(o) && (o = o.reduce((u, h) => (u += h.outerHTML, u), "")), typeof o == "object" && o !== null)
      try {
        o = JSON.stringify(o, (u, h) => u === "exclude" ? void 0 : h), o = o.replace(/"/g, "'");
      } catch {
        return console.warn("Circular reference detected in:", o), c + l;
      }
    return c + l + (o || "");
  }, ""), i = document.createElement("template");
  i.innerHTML = e.trim();
  const n = i.content.firstChild;
  for (let c = 0; c < t.length; c++)
    ((a = (s = t[c]) == null ? void 0 : s.constructor) == null ? void 0 : a.name) === "Ref" && (t[c].current = n);
  return n;
}, E = (r) => {
  const t = /* @__PURE__ */ new Set();
  let e = r;
  return { get: () => e, set: (a) => {
    a !== e && (e = a, t.forEach((c) => c(a)));
  }, subscribe: (a) => (t.add(a), () => t.delete(a)) };
}, x = (r, t) => {
  if (!d)
    throw new Error("useEffect must be used within a component.");
  f.has(d) || f.set(d, { states: [], effects: [], stateIndex: 0, effectIndex: 0 });
  const e = f.get(d), i = e.effectIndex;
  e.effects[i] === void 0 && (e.effects[i] = {
    deps: void 0,
    cleanup: void 0
  });
  const n = e.effects[i];
  e.effectIndex++, (!n.deps || t.length !== n.deps.length ? !0 : t.some((c, l) => c !== n.deps[l])) && (n.cleanup && n.cleanup(), n.cleanup = void 0, Promise.resolve().then(() => {
    n.cleanup = r() || void 0, n.deps = t;
  }), e.effects[i] = n);
}, I = (r) => {
  if (!d)
    throw new Error("useState must be used within a component.");
  f.has(d) || f.set(d, { states: [], effects: [], effectIndex: 0, stateIndex: 0 });
  const t = f.get(d), e = t.stateIndex;
  t.stateIndex++, t.states[e] === void 0 && (t.states[e] = r);
  const i = Object.keys(p).find((s) => p[s] === d), n = (s) => {
    t.states[e] = s, p[i].connectedCallback();
  };
  return [t.states[e], n];
}, y = (r) => ({ current: r });
class b extends HTMLElement {
  connectedCallback() {
    window.onpopstate = () => this.updateRoute(), this.updateRoute();
  }
  updateRoute() {
    var e;
    const t = window.location.pathname;
    this.innerHTML = ((e = this.querySelector(`[data-route="${t}"]`)) == null ? void 0 : e.innerHTML) || "404 Not Found";
  }
}
customElements.define("reactive-router", b);
class w extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", (t) => {
      t.preventDefault();
      const e = this.getAttribute("href");
      e && (window.history.pushState({}, "", e), window.dispatchEvent(new Event("popstate")));
    });
  }
}
customElements.define("reactive-link", w);
export {
  p as Components,
  w as ReactiveLink,
  b as ReactiveRouter,
  f as componentStates,
  E as createReactiveState,
  d as currentComponentInstance,
  v as register,
  g as render,
  x as useEffect,
  y as useRef,
  I as useState
};
