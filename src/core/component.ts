export const Components: Record<string, CustomElementInterface> = {};
export const componentStates = new Map<HTMLElement, { states: any[]; index: number }>();
export let currentComponentInstance: CustomElementInterface | null = null;

export interface CustomElementInterface extends HTMLElement {
  connectedCallback(): void;
  props: Record<string, any>;
}

export const register = (tagName: string, Component: () => any) => {
  class CustomElement extends HTMLElement implements CustomElementInterface {
    props: Record<string, any> = {};

    static get observedAttributes() {
      return ["*"];
    }

    connectedCallback() {
      this.props = this.parseAttributes();

      Components[tagName] = this;
      const stateInfo = componentStates.get(this);

      if (stateInfo) stateInfo.index = 0;

      currentComponentInstance = this;
      const node = Component.call(this, this.props);
      currentComponentInstance = null; 

      node.setAttribute("data-reactive", tagName);

      this.innerHTML = "";
      this.appendChild(node);
    }

    attributeChangedCallback() {
      this.props = this.parseAttributes();
      this.connectedCallback();
    }

    private parseAttributes() {
      const props: Record<string, any> = {};
      for (const { name, value } of Array.from(this.attributes)) {
        if (name.startsWith("data-")) {
          const key = name.replace(/^data-/, "");
          try {
            props[key] = JSON.parse(value.replace(/'/g, '"'));
          } catch {
            props[key] = value;
          }
        }
      }
      return props;
    }
  }

  customElements.define(tagName, CustomElement);
};