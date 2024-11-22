import { currentComponentInstance, componentStates } from "../core/component";

export const useEffect = (callback: () => void | (() => void), deps: any[]) => {
  if (!currentComponentInstance)
    throw new Error("useEffect must be used within a component.");

  if (!componentStates.has(currentComponentInstance))
    componentStates.set(currentComponentInstance, { states: [], effects: [], stateIndex: 0, effectIndex: 0 });

  const stateInfo = componentStates.get(currentComponentInstance)!;
  const currentIndex = stateInfo.effectIndex;

  if (stateInfo.effects[currentIndex] === undefined) {
    stateInfo.effects[currentIndex] = {
      deps: undefined,
      cleanup: undefined,
    };
  }

  const state = stateInfo.effects[currentIndex] as {
    deps: any[] | undefined;
    cleanup: (() => void) | undefined;
  };

  stateInfo.effectIndex++;

  const hasChangedDeps = () => {
    if (!state.deps) return true;
    if (deps.length !== state.deps.length) return true;
    return deps.some((dep, i) => dep !== state.deps![i]);
  };

  const shouldUpdateEffect = hasChangedDeps();

  if (shouldUpdateEffect) {
    if (state.cleanup) state.cleanup();
    state.cleanup = undefined;

    Promise.resolve().then(() => {
      state.cleanup = callback() || undefined;
      state.deps = deps;
    });

    stateInfo.effects[currentIndex] = state;
  }
};
