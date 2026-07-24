import { useEffect, useState } from "react";

function readIsDesktop(minWidth: number): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(min-width: ${minWidth}px)`).matches;
}

/** Desktop a partir de 768px — handoff de mini telas só nesse breakpoint. */
export function useIsDesktop(minWidth = 768): boolean {
  const [isDesktop, setIsDesktop] = useState(() => readIsDesktop(minWidth));

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [minWidth]);

  return isDesktop;
}
