import React, { useCallback } from "react";

const useIntersection = (firstNovIntersectionHandler: any) => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      console.log(entry);
      firstNovIntersectionHandler();
    }
  });
  return useCallback((node: any) => {
    if (node !== null) {
      observer.observe(node);
    }
  }, []);
};

export default useIntersection;
