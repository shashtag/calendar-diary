import { useCallback } from "react";

const useScroll = () => {
  const scroll = useCallback((node: any) => {
    if (node !== null) {
      window.scrollTo({
        top: node.offsetTop - (window.innerHeight - node.offsetHeight) / 2,
        behavior: "smooth",
      });
    }
  }, []);
  return scroll;
};

export default useScroll;
