const context = {
    getBaseURL: null,
};
function clearURL(url) {
    if (url.endsWith("/"))
        url = url.slice(0, -1);
    return url.toLowerCase();
}
class ReactiveRouter extends HTMLElement {
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
        var _a;
        const route = clearURL(window.location.pathname);
        this.innerHTML = "";
        const template = (_a = this === null || this === void 0 ? void 0 : this.templates) === null || _a === void 0 ? void 0 : _a.find((template) => {
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
    connectedCallback() {
        this.style.color = "blue";
        this.style.textDecoration = "underline";
        this.style.cursor = "pointer";
    }
}
if (!customElements.get("reactive-router"))
    customElements.define("reactive-router", ReactiveRouter);
if (!customElements.get("reactive-link"))
    customElements.define("reactive-link", ReactiveLink);
