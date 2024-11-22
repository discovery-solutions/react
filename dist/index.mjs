const p = {}, f = /* @__PURE__ */ new Map();
let u = null;
const w = (r, e) => {
  class t extends HTMLElement {
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
        u = this;
        const s = e.call(this, this.props);
        s.setAttribute("data-reactive", r), this.innerHTML = "", this.appendChild(s);
      } catch (s) {
        console.error(s), this.innerHTML = "";
      } finally {
        u = null;
      }
    }
    attributeChangedCallback() {
      this.props = this.parseAttributes(), this.connectedCallback();
    }
    parseAttributes() {
      const n = {};
      for (const { name: s, value: o } of Array.from(this.attributes))
        if (s.startsWith("data-")) {
          const c = s.replace(/^data-/, "");
          try {
            n[c] = o.replace(/@'/g, '"').replace(/&quot;/g, '"').replace(/&#39;/g, "'"), n[c] = JSON.parse(n[c]);
          } catch {
            n[c] = o;
          }
        }
      return n;
    }
  }
  customElements.define(r, t);
};
window.React = {
  functions: {}
};
const v = (r, ...e) => {
  var s, o;
  const t = r.reduce((c, l, m) => {
    let a = e[m];
    if (typeof a == "function") {
      const d = `fn_${Math.random().toString(36).substring(2, 15)}`;
      window.React.functions[d] = a, a = `window.React.functions.${d}()`;
    }
    if (Array.isArray(a) && (a = a.reduce((d, h) => (d += h.outerHTML, d), "")), typeof a == "object" && a !== null)
      try {
        a = JSON.stringify(a, (d, h) => d === "exclude" ? void 0 : h), a = a.replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/"/g, "'");
      } catch (d) {
        return console.log(d), c + l;
      }
    return c + l + (a || "");
  }, ""), i = document.createElement("template");
  i.innerHTML = t.trim();
  const n = i.content.firstChild;
  for (let c = 0; c < e.length; c++)
    ((o = (s = e[c]) == null ? void 0 : s.constructor) == null ? void 0 : o.name) === "Ref" && (e[c].current = n);
  return n;
}, E = (r) => {
  const e = /* @__PURE__ */ new Set();
  let t = r;
  return { get: () => t, set: (o) => {
    o !== t && (t = o, e.forEach((c) => c(o)));
  }, subscribe: (o) => (e.add(o), () => e.delete(o)) };
}, x = (r, e) => {
  if (!u)
    throw new Error("useEffect must be used within a component.");
  f.has(u) || f.set(u, { states: [], effects: [], stateIndex: 0, effectIndex: 0 });
  const t = f.get(u), i = t.effectIndex;
  t.effects[i] === void 0 && (t.effects[i] = {
    deps: void 0,
    cleanup: void 0
  });
  const n = t.effects[i];
  t.effectIndex++, (!n.deps || e.length !== n.deps.length ? !0 : e.some((c, l) => c !== n.deps[l])) && (n.cleanup && n.cleanup(), n.cleanup = void 0, Promise.resolve().then(() => {
    n.cleanup = r() || void 0, n.deps = e;
  }), t.effects[i] = n);
}, I = (r) => {
  if (!u)
    throw new Error("useState must be used within a component.");
  f.has(u) || f.set(u, { states: [], effects: [], effectIndex: 0, stateIndex: 0 });
  const e = f.get(u), t = e.stateIndex;
  e.stateIndex++, e.states[t] === void 0 && (e.states[t] = r);
  const i = Object.keys(p).find((s) => p[s] === u), n = (s) => {
    e.states[t] = s, p[i].connectedCallback();
  };
  return [e.states[t], n];
}, y = (r) => ({ current: r });
class b extends HTMLElement {
  connectedCallback() {
    window.onpopstate = () => this.updateRoute(), this.updateRoute();
  }
  updateRoute() {
    var t;
    const e = window.location.pathname;
    this.innerHTML = ((t = this.querySelector(`[data-route="${e}"]`)) == null ? void 0 : t.innerHTML) || "404 Not Found";
  }
}
customElements.define("reactive-router", b);
class g extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", (e) => {
      e.preventDefault();
      const t = this.getAttribute("href");
      t && (window.history.pushState({}, "", t), window.dispatchEvent(new Event("popstate")));
    });
  }
}
customElements.define("reactive-link", g);
export {
  p as Components,
  g as ReactiveLink,
  b as ReactiveRouter,
  f as componentStates,
  E as createReactiveState,
  u as currentComponentInstance,
  w as register,
  v as render,
  x as useEffect,
  y as useRef,
  I as useState
};
