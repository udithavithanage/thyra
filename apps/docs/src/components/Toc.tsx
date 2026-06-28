import { useEffect } from "react";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";

type TocProps = {
  markdown: string;
};

export default function Toc({ markdown }: TocProps) {
  const headings =
    markdown.match(/^## .+/gm)?.map((h) => {
      const text = h.replace("## ", "");
      const id = text.toLowerCase().replace(/\s+/g, "-");
      return { text, id };
    }) || [];

  const [activeId] = useIntersectionObserver({
    selector: ".content h2",
    rootMargin: "-80px 0% -70% 0%",
  });

  // Scroll to heading if hash includes heading anchor
  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (hash) {
      // Wait for content to render, then scroll
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }, [markdown]);

  const handleHeadingClick = (headingId: string) => {
    // Get current path
    const currentPath = window.location.pathname;

    // Update URL with heading anchor (hash)
    const newUrl = `${currentPath}#${headingId}`;
    window.history.replaceState(null, "", newUrl);

    // Scroll to element smoothly
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="toc">
      <h4>On this page</h4>

      {headings.map((h) => (
        <div
          key={h.id}
          className={`toc-item ${activeId === h.id ? "active" : ""}`}
          onClick={() => handleHeadingClick(h.id)}
        >
          {h.text}
        </div>
      ))}
    </aside>
  );
}
