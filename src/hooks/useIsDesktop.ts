import { useEffect, useState } from "react";

/** Desktop a partir de 768px — handoff de mini telas só nesse breakpoint. */
export function useIsDesktop(minWidth = 768): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [minWidth]);

  return isDesktop;
}
