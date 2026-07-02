import { useEffect, useState } from "react";

interface UseIntersectionObserverOptions {
  selector: string;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver({
  selector,
  rootMargin = "0px",
  threshold = 0.1,
}: UseIntersectionObserverOptions) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || entry.target.textContent || "";
            setActiveId(id);
          }
        });
      },
      {
        rootMargin,
        threshold,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, rootMargin, threshold]);

  return [activeId, setActiveId];
}
