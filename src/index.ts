import { components, current } from "./hooks.js";

export * from "./hooks.js";

declare global {
  interface Window {
    React: {
      functions: Record<string, Function>;
      inRender: boolean;
    };
  }
}

window.React = {
  functions: {},
  inRender: false,
};

export function register(name: string, component: Function): any {
  if (!name) throw new Error(`Component name is required`);
  if (!component) throw new Error(`Component function is required`);

  if (!name.includes("-")) name = "x-" + name;

  class CustomElement extends HTMLElement {
    reactive: string;

    constructor() {
      super();

      components[name] = { instance: this, index: 0 };

      current.refIndex = 0;
      current.component = name;

      this.reactive = name;
      this.render();
    }

    render() {
      try {
        window.React.inRender = true;
        const node = component();
        window.React.inRender = false;

        node.setAttribute("data-reactive", this.reactive);

        this.innerHTML = "";
        this.appendChild(node);
      } catch (error) {
        console.error(error);
      }
    }
  }

  customElements.define(name, CustomElement);

  return { reactive: name };
}

export function render(strings: TemplateStringsArray, ...values: any[]): Node {
  const htmlString = strings.reduce((result, string, i) => {
    let value = values[i];

    if (typeof value === "function") {
      const fnId = `fn_${Math.random().toString(36).substring(2, 15)}`;
      window.React.functions[fnId] = value;
      value = `window.React.functions.${fnId}()`;
    }

    if (Array.isArray(value)) {
      value = value.reduce((str, item) => {
        str += (item as Element).outerHTML;
        return str;
      }, "");
    }

    if (typeof value === "object") return result + string;

    return result + string + value;
  }, "");

  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const node = template.content.firstChild!;

  for (let i = 0; i < values.length; i++) {
    if (values[i].constructor.name === "Ref") values[i].current = node;
  }

  return node;
}
