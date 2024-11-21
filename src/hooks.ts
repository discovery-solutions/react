export const components: Record<
  string,
  { instance: any; index: number }
> = {};

export const current = {
  component: null as string | null,
  refIndex: null as number | null,
};

const effects = new Map<string, any[]>();
const cleanupFunctions = new Map<string, () => void>();
const store: Record<string, any> = {};
const refs = new Map<string, Ref>();

export function useEffect(effect: () => (() => void) | void, deps: any[]) {
  if (current.component === null || current.refIndex === null) {
    throw new Error("useEffect cannot be used out of context");
  }

  const effectId = `${current.component}_${current.refIndex}`;
  const oldDeps = effects.get(effectId);
  current.refIndex++;

  if (!oldDeps || deps.some((dep, i) => !Object.is(dep, oldDeps[i]))) {
    const cleanupFunction = cleanupFunctions.get(effectId);
    if (cleanupFunction) cleanupFunction();

    const newCleanupFunction = effect();
    if (newCleanupFunction) cleanupFunctions.set(effectId, newCleanupFunction);

    effects.set(effectId, deps);
  }
}

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
  if (current.component === null) {
    throw new Error("useState cannot be used out of context");
  }

  const componentData = components[current.component];
  const stateId = `${current.component}_${componentData.index}`;
  if (!store[stateId]) store[stateId] = initialValue;

  const setState = (newValue: T) => {
    store[stateId] = newValue;
    Object.values(components).forEach(({ instance }) => instance.render());
  };

  componentData.index++;

  return [store[stateId], setState];
}

export function useRef<T>(initialValue: T): Ref<T> {
  if (current.component === null || current.refIndex === null) {
    throw new Error("useRef cannot be used out of context");
  }

  const refId = `${current.component}_${current.refIndex}`;
  let ref = refs.has(refId) ? refs.get(refId) as Ref<T> : new Ref(initialValue);

  if (!window.React.inRender) current.refIndex++;
  return ref;
}

class Ref<T = any> {
  constructor(public current: T) {}
}
