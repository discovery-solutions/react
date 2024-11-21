const f = {}, u = /* @__PURE__ */ new Map();
let a = null;
const w = (n, t) => {
  class e extends HTMLElement {
    connectedCallback() {
      f[n] = this;
      const i = u.get(this);
      i && (i.index = 0), a = this;
      const s = t.call(this);
      a = null, s.setAttribute("data-reactive", n), this.innerHTML = "", this.appendChild(s);
    }
  }
  customElements.define(n, e);
};
window.React = {
  functions: {}
};
const E = (n, ...t) => {
  const e = n.reduce((s, o, l) => {
    let r = t[l];
    if (typeof r == "function") {
      const d = `fn_${Math.random().toString(36).substring(2, 15)}`;
      window.React.functions[d] = r, r = `window.React.functions.${d}()`;
    }
    return Array.isArray(r) && (r = r.reduce((d, h) => (d += h.outerHTML, d), "")), typeof r == "object" ? s + o : s + o + r;
  }, ""), c = document.createElement("template");
  c.innerHTML = e.trim();
  const i = c.content.firstChild;
  for (let s = 0; s < t.length; s++)
    t[s].constructor.name === "Ref" && (t[s].current = i);
  return i;
}, b = (n) => {
  const t = /* @__PURE__ */ new Set();
  let e = n;
  return { get: () => e, set: (o) => {
    o !== e && (e = o, t.forEach((l) => l(o)));
  }, subscribe: (o) => (t.add(o), () => t.delete(o)) };
}, R = (n, t) => {
  let e;
  (() => {
    e && e(), e = n();
  })();
}, v = (n) => {
  if (!a)
    throw new Error("useState must be used within a component.");
  u.has(a) || u.set(a, { states: [], index: 0 });
  const t = u.get(a), e = t.index;
  t.index++, t.states[e] === void 0 && (t.states[e] = n);
  const c = () => Object.values(f).forEach((s) => s.connectedCallback()), i = (s) => {
    t.states[e] = s, console.log(c), c();
  };
  return [t.states[e], i];
}, L = (n) => ({ current: n });
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
