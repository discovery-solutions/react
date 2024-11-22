export const createReactiveState = <T>(initialValue: T) => {
  const listeners = new Set<(newValue: T) => void>();
  let value = initialValue;
  
  const get = () => value;
  const set = (newValue: T) => {
    if (newValue === value) return;

    value = newValue;
    listeners.forEach(listener => listener(newValue));
  };

  const subscribe = (listener: (newValue: T) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { get, set, subscribe };
};
