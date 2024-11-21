export class ReactiveLink extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (e) => {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href) {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new Event('popstate'));
      }
    });
  }
}

customElements.define('reactive-link', ReactiveLink);
