const context = {
  getBaseURL: null,
}

function clearURL(url) {
  if (url.endsWith("/"))
    url = url.slice(0, -1);

  return url.toLowerCase();
}

class ReactiveRouter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.originalLocation = clearURL(window.location.pathname);
    window.addEventListener("popstate", () => this.updateRoute());
  }

  connectedCallback() {
    this.updateRoute();
  }

  updateRoute() {
    const route = clearURL(window.location.hash.slice(1));
    this.shadowRoot.innerHTML = "";

    const template = Array.from(this.querySelectorAll("template")).find((template) => {
      const templateRoute = clearURL(template.getAttribute("data-route"));

      if (templateRoute !== "#")
        return templateRoute.includes(route);
      
      return route === "";
    });

    if (template) {
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}

class ReactiveLink extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("click", (event) => {
      event.preventDefault();
      window.history.pushState(null, "", this.getAttribute("href"));
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
