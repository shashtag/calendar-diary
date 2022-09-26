import { useCallback } from "react";

const useScroll = () => {
  const scroll = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      window.scrollTo({
        top: node.offsetTop - (window.innerHeight - node.offsetHeight) / 2,
        behavior: "auto",
      });
    }
  }, []);
  return scroll;
};

export default useScroll;
