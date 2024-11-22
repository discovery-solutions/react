import { currentComponentInstance, componentStates } from "../core/component";

export const useEffect = (callback: () => void | (() => void), deps: any[]) => {
  if (!currentComponentInstance)
    throw new Error("useEffect must be used within a component.");

  if (!componentStates.has(currentComponentInstance))
    componentStates.set(currentComponentInstance, { states: [], index: 0 });

  const stateInfo = componentStates.get(currentComponentInstance)!;
  const currentIndex = stateInfo.index;

  if (stateInfo.states[currentIndex] === undefined) {
    stateInfo.states[currentIndex] = {
      deps: undefined,
      cleanup: undefined,
    };
  }

  const state = stateInfo.states[currentIndex] as {
    deps: any[] | undefined;
    cleanup: (() => void) | undefined;
  };

  stateInfo.index++;

  const hasChangedDeps = () => {
    if (!state.deps) return true;
    if (deps.length !== state.deps.length) return true;
    return deps.some((dep, i) => dep !== state.deps![i]);
  };

  if (hasChangedDeps()) {
    if (state.cleanup) state.cleanup();
    state.cleanup = callback() || undefined;
    state.deps = deps;
  }
};
