const context = {
  getBaseURL: null as string | null,
}

function clearURL(url: string): string {
  if (url.endsWith("/"))
    url = url.slice(0, -1);

  return url.toLowerCase();
}

class ReactiveRouter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    window.addEventListener("popstate", () => this.updateRoute());
  }

  connectedCallback(): void {
    this.updateRoute();
  }

  updateRoute(): void {
    const route = clearURL(window.location.pathname);
    this.shadowRoot!.innerHTML = "";

    const template = Array.from(this.querySelectorAll("template")).find((template) => {
      const templateRoute = clearURL(template.getAttribute("data-route") || "");

      if (["#", "/", ""].includes(templateRoute))
        return template;
      
      return templateRoute.includes(route);
    });

    if (template) {
      this.shadowRoot!.innerHTML = "";
      this.shadowRoot!.appendChild(template.content.cloneNode(true));
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

  connectedCallback(): void {
    this.style.color = "blue";
    this.style.textDecoration = "underline";
    this.style.cursor = "pointer";
  }
}

customElements.define("reactive-router", ReactiveRouter);
customElements.define("reactive-link", ReactiveLink);