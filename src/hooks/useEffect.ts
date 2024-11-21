export const useEffect = (callback: () => void | (() => void), deps: any[]) => {
  let cleanup: void | (() => void);
  const effect = () => {
    if (cleanup) cleanup();
    cleanup = callback();
  };
  effect(); // Execute on mount
};
