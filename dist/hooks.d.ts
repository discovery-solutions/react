export declare const components: Record<string, {
    instance: any;
    index: number;
}>;
export declare const current: {
    component: string | null;
    refIndex: number | null;
};
export declare function useEffect(effect: () => (() => void) | void, deps: any[]): void;
export declare function useState<T>(initialValue: T): [T, (newValue: T) => void];
export declare function useRef<T>(initialValue: T): Ref<T>;
declare class Ref<T = any> {
    current: T;
    constructor(current: T);
}
export {};
