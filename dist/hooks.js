"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.current = exports.components = void 0;
exports.useEffect = useEffect;
exports.useState = useState;
exports.useRef = useRef;
const utils_1 = require("./utils");
const refs = new Map();
const store = {};
const effects = new Map();
const cleanupFunctions = new Map();
const id = Math.random().toString(36).substring(2, 15);
exports.components = {};
exports.current = { component: null, refIndex: null };
function useEffect(effect, deps) {
    const effectId = (0, utils_1.uuid)();
    const oldDeps = effects.get(effectId);
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
function useState(initialValue) {
    if (!store[id])
        store[id] = initialValue;
    return [
        store[id],
        (newValue) => {
            store[id] = newValue;
            Object.values(exports.components).forEach(component => component.render());
        }
    ];
}
class Ref {
    constructor(current) {
        this.current = current;
    }
}
function useRef(initialValue) {
    if (exports.current.component === null || exports.current.refIndex === null) {
        throw new Error("useRef cannot be used out of context");
    }
    const refId = `${exports.current.component}_${exports.current.refIndex}`;
    let ref = refs.has(refId) ? refs.get(refId) : new Ref(initialValue);
    if (!window.React.inRender)
        exports.current.refIndex++;
    return ref;
}
