import "./components";
declare global {
    interface Window {
        React: {
            functions: Record<string, Function>;
            inRender: boolean;
        };
    }
}
export * from "./hooks";
export declare function register(component: Function, alias?: string | null): any;
export declare function render(strings: TemplateStringsArray, ...values: any[]): Node;
