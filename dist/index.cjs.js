'use strict';

const refs = new Map();
const store = {};
const effects = new Map();
const cleanupFunctions = new Map();
const id = Math.random().toString(36).substring(2, 15);
const components = {};
const current = { component: null, refIndex: null };
function useEffect(effect, deps) {
    const effectId = effect.name || effect.toString();
    const oldDeps = effects.get(effectId);
    if (!oldDeps || deps.some((dep, i) => !Object.is(dep, oldDeps[i]))) {
        const cleanupFunction = cleanupFunctions.get(effectId);
        if (cleanupFunction)
            cleanupFunction();
        const newCleanupFunction = effect();
        if (newCleanupFunction)
            cleanupFunctions.set(effectId, newCleanupFunction);
        effects.set(effectId, deps);
    }
}
function useState(initialValue) {
    if (!store[id])
        store[id] = initialValue;
    return [
        store[id],
        (newValue) => {
            store[id] = newValue;
            Object.values(components).forEach(component => component.render());
        }
    ];
}
class Ref {
    constructor(current) {
        this.current = current;
    }
}
function useRef(initialValue) {
    if (current.component === null || current.refIndex === null) {
        throw new Error("useRef cannot be used out of context");
    }
    const refId = `${current.component}_${current.refIndex}`;
    let ref = refs.has(refId) ? refs.get(refId) : new Ref(initialValue);
    if (!window.React.inRender)
        current.refIndex++;
    return ref;
}

function clearURL(url) {
    if (url.endsWith("/"))
        url = url.slice(0, -1);
    return url.toLowerCase();
}
class ReactiveRouter extends HTMLElement {
    constructor() {
        super();
        this.templates = [];
        window.addEventListener("popstate", () => this.updateRoute());
    }
    connectedCallback() {
        this.templates = Array.from(this.querySelectorAll("template"));
        this.updateRoute();
    }
    updateRoute() {
        var _a;
        const route = clearURL(window.location.pathname);
        this.innerHTML = "";
        const template = (_a = this === null || this === void 0 ? void 0 : this.templates) === null || _a === void 0 ? void 0 : _a.find((template) => {
            const templateRoute = clearURL(template.getAttribute("data-route") || "");
            if (["#", "/", ""].includes(templateRoute))
                return template;
            return templateRoute.includes(route);
        });
        if (template) {
            this.innerHTML = "";
            this.appendChild(template.content.cloneNode(true));
        }
    }
}
class ReactiveLink extends HTMLElement {
    constructor() {
        super();
        this.addEventListener("click", (event) => {
            event.preventDefault();
            window.history.pushState(null, "", this.getAttribute("href") || "");
            window.dispatchEvent(new Event("popstate"));
        });
    }
    connectedCallback() {
        this.style.color = "blue";
        this.style.textDecoration = "underline";
        this.style.cursor = "pointer";
    }
}
customElements.define("reactive-router", ReactiveRouter);
customElements.define("reactive-link", ReactiveLink);

window.React = {
    functions: {},
    inRender: false,
};
function register(component, alias = null) {
    let name = (alias || component.name.toLowerCase());
    if (name.includes("-") === false)
        name = "x-" + name;
    class CustomElement extends HTMLElement {
        constructor() {
            super();
            components[name] = this;
            current.refIndex = 0;
            current.component = name;
            this.reactive = name;
            this.render();
        }
        render() {
            window.React.inRender = true;
            const node = component();
            window.React.inRender = false;
            node.setAttribute("data-reactive", name);
            this.innerHTML = "";
            this.appendChild(node);
        }
    }
    customElements.define(name, CustomElement);
    return { reactive: name };
}
function render(strings, ...values) {
    const htmlString = strings.reduce((result, string, i) => {
        let value = values[i];
        if (typeof value === "function") {
            const fnId = `fn_${Math.random().toString(36).substring(2, 15)}`;
            window.React.functions[fnId] = value;
            value = `window.React.functions.${fnId}()`;
        }
        if (Array.isArray(value)) {
            value = value.reduce((str, item) => {
                str += item.outerHTML;
                return str;
            }, "");
        }
        if (typeof value === "object")
            return result + string;
        return result + string + value;
    }, "");
    const template = document.createElement("template");
    template.innerHTML = htmlString.trim();
    const node = template.content.firstChild;
    for (let i = 0; i < values.length; i++)
        if (values[i].constructor.name === "Ref")
            values[i].current = node;
    return node;
}

exports.components = components;
exports.current = current;
exports.register = register;
exports.render = render;
exports.useEffect = useEffect;
exports.useRef = useRef;
exports.useState = useState;
