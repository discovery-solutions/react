export const Components: Record<string, CustomElementInterface> = {};
export const componentStates = new Map<HTMLElement, { states: any[]; index: number }>();
export let currentComponentInstance: CustomElementInterface | null = null;

export interface CustomElementInterface extends HTMLElement {
  connectedCallback(): void;
}

export const register = (tagName: string, Component: () => any) => {
  class CustomElement extends HTMLElement implements CustomElementInterface {
    connectedCallback() {
      Components[tagName] = this;
      const stateInfo = componentStates.get(this);

      if (stateInfo) stateInfo.index = 0;

      currentComponentInstance = this;
      const node = Component.call(this);
      currentComponentInstance = null; 

      node.setAttribute("data-reactive", tagName);

      this.innerHTML = "";
      this.appendChild(node);
    }
  }

  customElements.define(tagName, CustomElement);
};
