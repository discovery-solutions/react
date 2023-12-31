const context = {
  getBaseURL: null as string | null,
}

function clearURL(url: string): string {
  if (url.endsWith("/"))
    url = url.slice(0, -1);

  return url.toLowerCase();
}

class ReactiveRouter extends HTMLElement {
  templates?: HTMLTemplateElement[];

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
    const route = clearURL(window.location.pathname);
    this.innerHTML = "";

    const template = this?.templates?.find((template) => {
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

  connectedCallback(): void {
    this.style.color = "blue";
    this.style.textDecoration = "underline";
    this.style.cursor = "pointer";
  }
}

if (!customElements.get("reactive-router"))
  customElements.define("reactive-router", ReactiveRouter);

if (!customElements.get("reactive-link"))
  customElements.define("reactive-link", ReactiveLink);