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
export declare function register(name: string, component: Function): any;
export declare function render(strings: TemplateStringsArray, ...values: any[]): Node;
