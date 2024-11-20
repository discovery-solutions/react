/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 615:
/***/ (() => {

const context = {
    getBaseURL: null,
};
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
            if (["#", "/"].includes(templateRoute))
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
if (!customElements.get("reactive-router"))
    customElements.define("reactive-router", ReactiveRouter);
if (!customElements.get("reactive-link"))
    customElements.define("reactive-link", ReactiveLink);


/***/ }),

/***/ 987:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.current = exports.components = void 0;
exports.useEffect = useEffect;
exports.useState = useState;
exports.useRef = useRef;
const utils_1 = __nccwpck_require__(798);
const refs = new Map();
const store = {};
const effects = new Map();
const cleanupFunctions = new Map();
const id = Math.random().toString(36).substring(2, 15);
exports.components = {};
exports.current = { component: null, refIndex: null };
function useEffect(effect, deps) {
    const effectId = (0, utils_1.uuid)();
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
            Object.values(exports.components).forEach(component => component.render());
        }
    ];
}
class Ref {
    constructor(current) {
        this.current = current;
    }
}
function useRef(initialValue) {
    if (exports.current.component === null || exports.current.refIndex === null) {
        throw new Error("useRef cannot be used out of context");
    }
    const refId = `${exports.current.component}_${exports.current.refIndex}`;
    let ref = refs.has(refId) ? refs.get(refId) : new Ref(initialValue);
    if (!window.React.inRender)
        exports.current.refIndex++;
    return ref;
}


/***/ }),

/***/ 407:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.register = register;
exports.render = render;
const hooks_1 = __nccwpck_require__(987);
__nccwpck_require__(615);
window.React = {
    functions: {},
    inRender: false,
};
__exportStar(__nccwpck_require__(987), exports);
function register(component, alias = null) {
    let name = (alias || component.name.toLowerCase());
    if (name.includes("-") === false)
        name = "x-" + name;
    class CustomElement extends HTMLElement {
        constructor() {
            super();
            hooks_1.components[name] = this;
            hooks_1.current.refIndex = 0;
            hooks_1.current.component = name;
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


/***/ }),

/***/ 798:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uuid = void 0;
const uuid = () => {
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(1000 + Math.random() * 9000);
    return timestamp + random;
};
exports.uuid = uuid;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(407);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;