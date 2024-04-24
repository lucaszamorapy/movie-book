import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnPageChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Este componente não renderiza nada no DOM
};

export default ScrollToTopOnPageChange;
