import { uuid } from "./utils.js";
const refs = new Map();
const store = {};
const effects = new Map();
const cleanupFunctions = new Map();
const id = Math.random().toString(36).substring(2, 15);
export const components = {};
export const current = { component: null, refIndex: null };
export function useEffect(effectFn, deps) {
    effectFn.effectId = effectFn.effectId || uuid();
    const oldDeps = effects.get(effectFn.effectId);
    if (!oldDeps || deps.some((dep, i) => !Object.is(dep, oldDeps[i]))) {
        const cleanupFunction = cleanupFunctions.get(effectFn.effectId);
        if (cleanupFunction)
            cleanupFunction();
        const newCleanupFunction = effectFn();
        if (newCleanupFunction)
            cleanupFunctions.set(effectFn.effectId, newCleanupFunction);
        effects.set(effectFn.effectId, deps);
    }
}
export function useState(initialValue) {
    if (!store[id])
        store[id] = initialValue;
    return [
        store[id],
        (newValue) => {
            store[id] = newValue;
            Object.values(components).forEach(component => component.render());
        }
    ];
}
class Ref {
    constructor(current) {
        this.current = current;
    }
}
export function useRef(initialValue) {
    if (current.component === null || current.refIndex === null) {
        throw new Error("useRef cannot be used out of context");
    }
    const refId = `${current.component}_${current.refIndex}`;
    let ref = refs.has(refId) ? refs.get(refId) : new Ref(initialValue);
    if (!window.React.inRender)
        current.refIndex++;
    return ref;
}
