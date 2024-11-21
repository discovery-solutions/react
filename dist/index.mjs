const f = {}, u = /* @__PURE__ */ new Map();
let a = null;
const w = (s, t) => {
  class e extends HTMLElement {
    connectedCallback() {
      f[t] = this;
      const i = u.get(this);
      i && (i.index = 0), a = this;
      const n = s.call(this);
      a = null, n.setAttribute("data-reactive", t), this.innerHTML = "", this.appendChild(n);
    }
  }
  customElements.define(t, e);
};
window.React = {
  functions: {}
};
const E = (s, ...t) => {
  const e = s.reduce((n, o, l) => {
    let r = t[l];
    if (typeof r == "function") {
      const d = `fn_${Math.random().toString(36).substring(2, 15)}`;
      window.React.functions[d] = r, r = `window.React.functions.${d}()`;
    }
    return Array.isArray(r) && (r = r.reduce((d, h) => (d += h.outerHTML, d), "")), typeof r == "object" ? n + o : n + o + r;
  }, ""), c = document.createElement("template");
  c.innerHTML = e.trim();
  const i = c.content.firstChild;
  for (let n = 0; n < t.length; n++)
    t[n].constructor.name === "Ref" && (t[n].current = i);
  return i;
}, b = (s) => {
  const t = /* @__PURE__ */ new Set();
  let e = s;
  return { get: () => e, set: (o) => {
    o !== e && (e = o, t.forEach((l) => l(o)));
  }, subscribe: (o) => (t.add(o), () => t.delete(o)) };
}, R = (s, t) => {
  let e;
  (() => {
    e && e(), e = s();
  })();
}, v = (s) => {
  if (!a)
    throw new Error("useState must be used within a component.");
  u.has(a) || u.set(a, { states: [], index: 0 });
  const t = u.get(a), e = t.index;
  t.index++, t.states[e] === void 0 && (t.states[e] = s);
  const c = () => Object.values(f).forEach((n) => n.connectedCallback()), i = (n) => {
    t.states[e] = n, console.log(c), c();
  };
  return [t.states[e], i];
}, L = (s) => ({ current: s });
class p extends HTMLElement {
  connectedCallback() {
    window.onpopstate = () => this.updateRoute(), this.updateRoute();
  }
  updateRoute() {
    var e;
    const t = window.location.pathname;
    this.innerHTML = ((e = this.querySelector(`[data-route="${t}"]`)) == null ? void 0 : e.innerHTML) || "404 Not Found";
  }
}
customElements.define("reactive-router", p);
class m extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", (t) => {
      t.preventDefault();
      const e = this.getAttribute("href");
      e && (window.history.pushState({}, "", e), window.dispatchEvent(new Event("popstate")));
    });
  }
}
customElements.define("reactive-link", m);
export {
  f as Components,
  m as ReactiveLink,
  p as ReactiveRouter,
  u as componentStates,
  b as createReactiveState,
  a as currentComponentInstance,
  w as register,
  E as render,
  R as useEffect,
  L as useRef,
  v as useState
};
