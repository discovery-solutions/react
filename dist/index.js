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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.render = render;
const hooks_1 = require("./hooks");
require("./components");
window.React = {
    functions: {},
    inRender: false,
};
__exportStar(require("./hooks"), exports);
function register(name, component) {
    if (!name)
        throw new Error(`Component name is required`);
    if (!component)
        throw new Error(`Component function is required`);
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
