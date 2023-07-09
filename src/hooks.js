const refs = new Map();
const store = {};
const effects = new Map();
const cleanupFunctions = new Map();
const id = Math.random().toString(36).substring(2, 15);

export const components = {};

export const current = { component: null, refIndex: null };

export function useEffect(effect, deps) {
  const effectId = effect.name || effect.toString();
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
  constructor(initialValue) {
    this.current = initialValue;
  }
}

export function useRef(initialValue) {
  const refId = `${current.component}_${current.refIndex}`;
  let ref = refs.has(refId) ? refs.get(refId) : new Ref(initialValue);

  if (!window.React.inRender)
    current.refIndex++;

  return ref;
}
