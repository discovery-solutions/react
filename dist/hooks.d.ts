export declare const components: Record<string, any>;
export declare const current: {
    component: string | null;
    refIndex: number | null;
};
export declare function useEffect(effectFn: any | void, deps: any[]): void;
export declare function useState<T>(initialValue: T): [T, (newValue: T) => void];
declare class Ref<T = any> {
    current: T;
    constructor(current: T);
}
export declare function useRef<T>(initialValue: T): Ref<T>;
export {};
