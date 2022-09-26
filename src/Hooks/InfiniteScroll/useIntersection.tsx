import { useCallback } from "react";

const useIntersection = (firstNovIntersectionHandler: any) => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      firstNovIntersectionHandler();
    }
  });
  return useCallback((node: any) => {
    if (node !== null) {
      observer.observe(node);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useIntersection;
