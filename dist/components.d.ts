declare const context: {
    getBaseURL: string | null;
};
declare function clearURL(url: string): string;
declare class ReactiveRouter extends HTMLElement {
    templates?: HTMLTemplateElement[];
    constructor();
    connectedCallback(): void;
    updateRoute(): void;
}
declare class ReactiveLink extends HTMLElement {
    constructor();
    connectedCallback(): void;
}
