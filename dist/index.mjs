const l = {}, d = /* @__PURE__ */ new Map();
let r = null;
const w = (o, t) => {
  class e extends HTMLElement {
    connectedCallback() {
      l[o] = this;
      const n = d.get(this);
      n && (n.index = 0), r = this;
      const s = t.call(this);
      r = null, s.setAttribute("data-reactive", o), this.innerHTML = "", this.appendChild(s);
    }
  }
  customElements.define(o, e);
};
window.React = {
  functions: {}
};
const E = (o, ...t) => {
  const e = o.reduce((s, c, u) => {
    let a = t[u];
    if (typeof a == "function") {
      const f = `fn_${Math.random().toString(36).substring(2, 15)}`;
      window.React.functions[f] = a, a = `window.React.functions.${f}()`;
    }
    return Array.isArray(a) && (a = a.reduce((f, h) => (f += h.outerHTML, f), "")), typeof a == "object" ? s + c : s + c + a;
  }, ""), i = document.createElement("template");
  i.innerHTML = e.trim();
  const n = i.content.firstChild;
  for (let s = 0; s < t.length; s++)
    t[s].constructor.name === "Ref" && (t[s].current = n);
  return n;
}, b = (o) => {
  const t = /* @__PURE__ */ new Set();
  let e = o;
  return { get: () => e, set: (c) => {
    c !== e && (e = c, t.forEach((u) => u(c)));
  }, subscribe: (c) => (t.add(c), () => t.delete(c)) };
}, v = (o, t) => {
  if (!r)
    throw new Error("useEffect must be used within a component.");
  d.has(r) || d.set(r, { states: [], index: 0 });
  const e = d.get(r), i = e.index;
  e.states[i] === void 0 && (e.states[i] = {
    deps: void 0,
    cleanup: void 0
  });
  const n = e.states[i];
  e.index++, (!n.deps || t.length !== n.deps.length ? !0 : t.some((c, u) => c !== n.deps[u])) && (n.cleanup && n.cleanup(), n.cleanup = o() || void 0, n.deps = t);
}, x = (o) => {
  if (!r)
    throw new Error("useState must be used within a component.");
  d.has(r) || d.set(r, { states: [], index: 0 });
  const t = d.get(r), e = t.index;
  t.index++, t.states[e] === void 0 && (t.states[e] = o);
  const i = () => Object.values(l).forEach((s) => s.connectedCallback()), n = (s) => {
    t.states[e] = s, i();
  };
  return [t.states[e], n];
}, R = (o) => ({ current: o });
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
  l as Components,
  m as ReactiveLink,
  p as ReactiveRouter,
  d as componentStates,
  b as createReactiveState,
  r as currentComponentInstance,
  w as register,
  E as render,
  v as useEffect,
  R as useRef,
  x as useState
};
