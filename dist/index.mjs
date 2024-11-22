const f = {}, l = /* @__PURE__ */ new Map();
let u = null;
const g = (r, t) => {
  class e extends HTMLElement {
    constructor() {
      super(...arguments), this.props = {};
    }
    static get observedAttributes() {
      return ["*"];
    }
    connectedCallback() {
      this.props = this.parseAttributes(), f[r] = this;
      const n = l.get(this);
      n && (n.index = 0);
      try {
        u = this;
        const s = t.call(this, this.props);
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
            n[c] = JSON.parse(o.replace(/'/g, '"'));
          } catch {
            n[c] = o;
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
const v = (r, ...t) => {
  var s, o;
  const e = r.reduce((c, p, m) => {
    let i = t[m];
    if (typeof i == "function") {
      const d = `fn_${Math.random().toString(36).substring(2, 15)}`;
      window.React.functions[d] = i, i = `window.React.functions.${d}()`;
    }
    if (Array.isArray(i) && (i = i.reduce((d, h) => (d += h.outerHTML, d), "")), typeof i == "object" && i !== null)
      try {
        i = JSON.stringify(i, (d, h) => d === "exclude" ? void 0 : h), i = i.replace(/"/g, "'");
      } catch {
        return console.warn("Circular reference detected in:", i), c + p;
      }
    return c + p + (i || "");
  }, ""), a = document.createElement("template");
  a.innerHTML = e.trim();
  const n = a.content.firstChild;
  for (let c = 0; c < t.length; c++)
    ((o = (s = t[c]) == null ? void 0 : s.constructor) == null ? void 0 : o.name) === "Ref" && (t[c].current = n);
  return n;
}, E = (r) => {
  const t = /* @__PURE__ */ new Set();
  let e = r;
  return { get: () => e, set: (o) => {
    o !== e && (e = o, t.forEach((c) => c(o)));
  }, subscribe: (o) => (t.add(o), () => t.delete(o)) };
}, C = (r, t) => {
  if (!u)
    throw new Error("useEffect must be used within a component.");
  l.has(u) || l.set(u, { states: [], index: 0 });
  const e = l.get(u), a = e.index;
  e.states[a] === void 0 && (e.states[a] = {
    deps: void 0,
    cleanup: void 0
  });
  const n = e.states[a];
  e.index++, (!n.deps || t.length !== n.deps.length ? !0 : t.some((o, c) => o !== n.deps[c])) && (n.cleanup && n.cleanup(), n.cleanup = r() || void 0, n.deps = t);
}, x = (r) => {
  if (!u)
    throw new Error("useState must be used within a component.");
  l.has(u) || l.set(u, { states: [], index: 0 });
  const t = l.get(u), e = t.index;
  t.index++, t.states[e] === void 0 && (t.states[e] = r);
  const a = () => Object.values(f).forEach((s) => s.connectedCallback()), n = (s) => {
    t.states[e] = s, a();
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
  f as Components,
  w as ReactiveLink,
  b as ReactiveRouter,
  l as componentStates,
  E as createReactiveState,
  u as currentComponentInstance,
  g as register,
  v as render,
  C as useEffect,
  y as useRef,
  x as useState
};
