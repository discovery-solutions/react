export const components = {};
export const current = {
    component: null,
    refIndex: null,
};
const effects = new Map();
const cleanupFunctions = new Map();
const store = {};
const refs = new Map();
export function useEffect(effect, deps) {
    console.log("useEffect", current);
    if (current.component === null || current.refIndex === null)
        throw new Error("useEffect cannot be used out of context");
    const effectId = `${current.component}_${current.refIndex}`;
    const oldDeps = effects.get(effectId);
    current.refIndex++;
    if (!oldDeps || deps.some((dep, i) => !Object.is(dep, oldDeps[i]))) {
        const cleanupFunction = cleanupFunctions.get(effectId);
        if (cleanupFunction)
            cleanupFunction();
        const newCleanupFunction = effect();
        if (newCleanupFunction)
            cleanupFunctions.set(effectId, newCleanupFunction);
        effects.set(effectId, deps);
    }
}
export function useState(initialValue) {
    console.log("useEffect", current);
    if (current.component === null)
        throw new Error("useState cannot be used out of context");
    const componentData = components[current.component];
    const stateId = `${current.component}_${componentData.index}`;
    const isInitialRender = !store[stateId];
    if (isInitialRender)
        store[stateId] = initialValue;
    const setState = (newValue) => {
        store[stateId] = newValue;
        componentData.instance.render();
    };
    if (isInitialRender)
        componentData.index++;
    return [store[stateId], setState];
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
class Ref {
    constructor(current) {
        this.current = current;
    }
}
