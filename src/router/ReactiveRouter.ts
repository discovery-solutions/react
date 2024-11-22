export class ReactiveRouter extends HTMLElement {
  connectedCallback() {
    window.onpopstate = () => this.updateRoute();
    this.updateRoute();
  }

  updateRoute() {
    const path = window.location.pathname;
    this.innerHTML = this.querySelector(`[data-route="${path}"]`)?.innerHTML || '404 Not Found';
  }
}

customElements.define('reactive-router', ReactiveRouter);
