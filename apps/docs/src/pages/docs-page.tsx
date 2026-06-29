import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "@/components";
import { docs } from "@/docs-loader";
import { resolveDocsFile, getDocsTitle } from "@/utils";

export default function DocsPage() {
  const { pathname, hash } = useLocation();
  const files = useMemo(() => Object.keys(docs), []);

  const activeFile = resolveDocsFile(pathname, files);
  const content = docs[activeFile];

  useEffect(() => {
    document.title = getDocsTitle(activeFile);
  }, [activeFile]);

  useEffect(() => {
    if (!hash) {
      document.getElementById("content")?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    });
  }, [activeFile, hash]);

  return (
    <main id="content" className="content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 id={slug(children)}>{children}</h1>,
          h2: ({ children }) => <h2 id={slug(children)}>{children}</h2>,
          h3: ({ children }) => <h3 id={slug(children)}>{children}</h3>,
          h4: ({ children }) => <h4 id={slug(children)}>{children}</h4>,
          pre({ children }: any) {
            return <CodeBlock className={children.props.className}>{children.props.children}</CodeBlock>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </main>
  );
}

function slug(children: React.ReactNode) {
  return String(children).toLowerCase().replace(/\s+/g, "-");
}