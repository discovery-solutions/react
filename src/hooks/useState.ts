import { Components, componentStates, currentComponentInstance } from "../core/component";

export const useState = <T>(initialValue: T): [T, (newValue: T) => void] => {
  if (!currentComponentInstance)
    throw new Error("useState must be used within a component.");

  if (!componentStates.has(currentComponentInstance))
    componentStates.set(currentComponentInstance, { states: [], effects: [], effectIndex: 0, stateIndex: 0 });

  const stateInfo = componentStates.get(currentComponentInstance)!;
  const currentIndex = stateInfo.stateIndex;

  stateInfo.stateIndex++;

  if (stateInfo.states[currentIndex] === undefined)
    stateInfo.states[currentIndex] = initialValue;

  const key = Object.keys(Components).find((key) => Components[key] === currentComponentInstance);

  const setState = (newValue: T) => {
    stateInfo.states[currentIndex] = newValue;
    Components[key].connectedCallback();
  };

  return [stateInfo.states[currentIndex], setState];
};
