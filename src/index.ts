import { components, current } from "./hooks";
import "./components";

declare global {
  interface Window {
    React: {
      functions: Record<string, Function>,
      inRender: boolean;
    };
  }
}

window.React = {
  functions: {},
  inRender: false,
}

export * from "./hooks";

export function register(component: Function, alias: string | null = null): void {
  const name = "x-" + (alias || component.name.toLowerCase());

  class CustomElement extends HTMLElement {
    constructor() {
      super();

      components[name] = this;

      current.refIndex = 0;
      current.component = name;

      this.attachShadow({ mode: "open" });

      this.render();
    }

    render() {
      window.React.inRender = true;
      const node = component();
      window.React.inRender = false;
      node.setAttribute("data-reactive", name);

      this.shadowRoot!.innerHTML = "";
      this.shadowRoot!.append(node);
    }
  }

  customElements.define(name, CustomElement);
}

export function render(strings: TemplateStringsArray, ...values: any[]): Node {
  const htmlString = strings.reduce((result, string, i) => {
    let value = values[i];

    if (typeof value === "function") {
      const fnId = `fn_${Math.random().toString(36).substring(2, 15)}`;
      window.React.functions[fnId] = value;
      value = `window.React.functions.${fnId}()`;
    }

    if (typeof values[i] === "object")
      return result + string;

    return result + string + value;
  }, "");

  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const node = template.content.firstChild!;

  for (let i = 0; i < values.length; i++)
    if (values[i].constructor.name === "Ref")
      values[i].current = node;

  return node;
}