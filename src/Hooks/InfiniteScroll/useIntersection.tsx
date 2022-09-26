import { useCallback } from "react";

const useIntersection = (extendHandler: () => void) => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      extendHandler();
    }
  });
  return useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      observer.observe(node);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useIntersection;
