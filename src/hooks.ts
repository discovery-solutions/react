import { uuid } from "./utils.js";

const refs = new Map<string, Ref>();
const store: Record<string, any> = {};
const effects = new Map<string, any[]>();
const cleanupFunctions = new Map<string, () => void>();
const id = Math.random().toString(36).substring(2, 15);

export const components: Record<string, any> = {};

export const current = { component: null as string | null, refIndex: null as number | null };

export function useEffect(effectFn: any | void, deps: any[]) {
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

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
  if (!store[id])
    store[id] = initialValue;

  return [
    store[id],
    (newValue: T) => {
      store[id] = newValue;
      Object.values(components).forEach(component => component.render());
    }
  ];
}

class Ref<T = any> {
  constructor(public current: T) {}
}

export function useRef<T>(initialValue: T): Ref<T> {
  if (current.component === null || current.refIndex === null) {
    throw new Error("useRef cannot be used out of context");
  }

  const refId = `${current.component}_${current.refIndex}`;
  let ref = refs.has(refId) ? refs.get(refId) as Ref<T> : new Ref(initialValue);

  if (!window.React.inRender)
    current.refIndex++;

  return ref;
}
