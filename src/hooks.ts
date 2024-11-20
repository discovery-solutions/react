const refs = new Map<string, Ref>();
const store: Record<string, any> = {};
const effects = new Map<string, any[]>();
const cleanupFunctions = new Map<string, () => void>();
const id = Math.random().toString(36).substring(2, 15);

export const components: Record<string, any> = {};

export const current = { component: null as string | null, refIndex: null as number | null };

export function useEffect(effect: () => (() => void) | void, deps: any[]) {
  const effectId = [current.component, effect.name].join('_');
  const oldDeps = effects.get(effectId);

  console.log(oldDeps, deps)
  console.log(!oldDeps, deps.some((dep, i) => !Object.is(dep, oldDeps[i])))
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
