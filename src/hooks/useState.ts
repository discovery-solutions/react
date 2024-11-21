import { Components, componentStates, currentComponentInstance } from "../core/component";

export const useState = <T>(initialValue: T): [T, (newValue: T) => void] => {
  if (!currentComponentInstance)
    throw new Error("useState must be used within a component.");

  if (!componentStates.has(currentComponentInstance))
    componentStates.set(currentComponentInstance, { states: [], index: 0 });

  const stateInfo = componentStates.get(currentComponentInstance)!;
  const currentIndex = stateInfo.index;

  stateInfo.index++;

  if (stateInfo.states[currentIndex] === undefined)
    stateInfo.states[currentIndex] = initialValue;

  const reRender = () => Object.values(Components).forEach((component) => component.connectedCallback());

  const setState = (newValue: T) => {
    stateInfo.states[currentIndex] = newValue;
    console.log(reRender)
    reRender();
  };

  return [stateInfo.states[currentIndex], setState];
};
