import { useState } from "react";

import { IoCheckmarkSharp, IoCopyOutline } from "react-icons/io5";

type CodeBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    navigator.clipboard.writeText(children?.toLocaleString() || "").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Extract language from className (e.g., "language-javascript")
  const language = className?.replace("language-", "") || "";

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-language">{language}</span>
        <button
          className={`copy-code-button ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          aria-label={copied ? "Copied!" : "Copy code"}
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <IoCheckmarkSharp className="copy-icon" />
          ) : (
            <IoCopyOutline className="copy-icon" />
          )}
        </button>
      </div>

      <pre className={className}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
