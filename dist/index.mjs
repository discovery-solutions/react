const p = {}, l = /* @__PURE__ */ new Map();
let a = null;
const g = (r, t) => {
  class e extends HTMLElement {
    constructor() {
      super(...arguments), this.props = {};
    }
    static get observedAttributes() {
      return ["*"];
    }
    connectedCallback() {
      this.props = this.parseAttributes(), p[r] = this;
      const n = l.get(this);
      n && (n.index = 0);
      try {
        a = this;
        const s = t.call(this, this.props);
        s.setAttribute("data-reactive", r), this.innerHTML = "", this.appendChild(s);
      } catch (s) {
        console.error(s), this.innerHTML = "";
      } finally {
        a = null;
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
  const e = r.reduce((c, h, m) => {
    let i = t[m];
    if (typeof i == "function") {
      const d = `fn_${Math.random().toString(36).substring(2, 15)}`;
      window.React.functions[d] = i, i = `window.React.functions.${d}()`;
    }
    if (Array.isArray(i) && (i = i.reduce((d, f) => (d += f.outerHTML, d), "")), typeof i == "object" && i !== null)
      try {
        i = JSON.stringify(i, (d, f) => d === "exclude" ? void 0 : f), i = i.replace(/"/g, "'");
      } catch {
        return console.warn("Circular reference detected in:", i), c + h;
      }
    return c + h + (i || "");
  }, ""), u = document.createElement("template");
  u.innerHTML = e.trim();
  const n = u.content.firstChild;
  for (let c = 0; c < t.length; c++)
    ((o = (s = t[c]) == null ? void 0 : s.constructor) == null ? void 0 : o.name) === "Ref" && (t[c].current = n);
  return n;
}, E = (r) => {
  const t = /* @__PURE__ */ new Set();
  let e = r;
  return { get: () => e, set: (o) => {
    o !== e && (e = o, t.forEach((c) => c(o)));
  }, subscribe: (o) => (t.add(o), () => t.delete(o)) };
}, y = (r, t) => {
  if (!a)
    throw new Error("useEffect must be used within a component.");
  l.has(a) || l.set(a, { states: [], index: 0 });
  const e = l.get(a), u = e.index;
  e.states[u] === void 0 && (e.states[u] = {
    deps: void 0,
    cleanup: void 0
  });
  const n = e.states[u];
  e.index++, (!n.deps || t.length !== n.deps.length ? !0 : t.some((o, c) => o !== n.deps[c])) && (n.cleanup && n.cleanup(), n.cleanup = r() || void 0, n.deps = t);
}, C = (r) => {
  if (!a)
    throw new Error("useState must be used within a component.");
  l.has(a) || l.set(a, { states: [], index: 0 });
  const t = l.get(a), e = t.index;
  t.index++, t.states[e] === void 0 && (t.states[e] = r);
  const u = Object.keys(p).find((s) => p[s] === a), n = (s) => {
    t.states[e] = s, p[u].connectedCallback();
  };
  return [t.states[e], n];
}, x = (r) => ({ current: r });
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
  l as componentStates,
  E as createReactiveState,
  a as currentComponentInstance,
  g as register,
  v as render,
  y as useEffect,
  x as useRef,
  C as useState
};
