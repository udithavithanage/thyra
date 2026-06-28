import { useState, useEffect, useCallback, type JSX } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Toc from "@/components/toc";
import MobileBreadcrumb from "@/components/mobile-breadcrumb";
import CodeBlock from "@/components/code-block";

import { useDevice } from "@/hooks/use-device";

import { docs } from "./docs-loader";

export default function App(): JSX.Element {
  const files = Object.keys(docs);
  const isMobile = useDevice(768);

  // Convert file path to URL-friendly route
  const fileToRoute = (file: string): string => {
    const route = file.replace("./docs/", "").replace(".md", "");

    // Don't remove /README suffix for proper routing
    return route;
  };

  // Convert route back to file path
  const routeToFile = useCallback(
    (route: string): string => {
      if (!route || route === "") {
        return files[0]; // Default to first file
      }

      // Remove any heading anchor from route
      const cleanRoute = route.split("#")[0];

      // Try exact match first
      let filePath = `./docs/${cleanRoute}.md`;
      if (docs[filePath]) return filePath;

      // Try with /README
      filePath = `./docs/${cleanRoute}/README.md`;
      if (docs[filePath]) return filePath;

      // Try removing /README if it exists in route
      const withoutReadme = cleanRoute.replace(/\/README$/, "");
      filePath = `./docs/${withoutReadme}.md`;
      if (docs[filePath]) return filePath;

      // Find closest match
      const match = files.find((f) => {
        const fRoute = fileToRoute(f);
        return fRoute === cleanRoute || fRoute === withoutReadme;
      });

      return match || files[0];
    },
    [files]
  );

  // Get initial file from URL pathname
  const getFileFromPath = useCallback((): string => {
    const path = window.location.pathname;
    const route = path === "/" || path === "" ? "" : path.slice(1);
    return routeToFile(route);
  }, [routeToFile]);

  const [activeFile, setActiveFile] = useState(getFileFromPath());
  const content = docs[activeFile];

  // Initial load: handle URL hash and scroll
  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (hash) {
      // There's a heading anchor, scroll to it after content loads
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    }
  }, []); // Run only on mount

  // Handle path changes (browser back/forward buttons and manual navigation)
  useEffect(() => {
    const handlePopState = () => {
      const newFile = getFileFromPath();
      setActiveFile(newFile);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [getFileFromPath]);

  // Update document title based on current page
  useEffect(() => {
    // Scroll to top when changing pages
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.scrollTo({ top: 0, behavior: "smooth" });
    }

    const fileName = activeFile
      .split("/")
      .pop()!
      .replace(".md", "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    document.title = `${fileName} - Thyra Docs`;
  }, [activeFile]);

  const handleFileSelect = (file: string) => {
    const route = fileToRoute(file);
    const path = route.startsWith("/") ? route : `/${route}`;
    window.history.pushState(null, "", path);
    setActiveFile(file);

    // Dispatch popstate event to trigger listeners
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  // Get active section and page for mobile breadcrumb
  const getActiveInfo = () => {
    const parts = activeFile.replace("./docs/", "").split("/");
    const section = parts[0];
    const fileName = activeFile.split("/").pop()!.replace(".md", "");
    const pageTitle =
      fileName === "README"
        ? "Overview"
        : fileName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    return {
      section: section
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      pageTitle,
    };
  };

  const { section: activeSection, pageTitle: activePageTitle } =
    getActiveInfo();

  return (
    <div className="app-container">
      <Navbar
        files={files}
        active={activeFile}
        isMobile={isMobile}
        onSelect={handleFileSelect}
      />

      <div className="layout">
        {!isMobile && (
          <Sidebar
            files={files}
            active={activeFile}
            onSelect={handleFileSelect}
          />
        )}
        {isMobile && (
          <MobileBreadcrumb section={activeSection} page={activePageTitle} />
        )}
        <main className="content" id="content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => {
                const id = String(children).toLowerCase().replace(/\s+/g, "-");
                return <h1 id={id}>{children}</h1>;
              },
              h2: ({ children }) => {
                const id = String(children).toLowerCase().replace(/\s+/g, "-");
                return <h2 id={id}>{children}</h2>;
              },
              h3: ({ children }) => {
                const id = String(children).toLowerCase().replace(/\s+/g, "-");
                return <h3 id={id}>{children}</h3>;
              },
              h4: ({ children }) => {
                const id = String(children).toLowerCase().replace(/\s+/g, "-");
                return <h4 id={id}>{children}</h4>;
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              pre: ({ children }: any) => {
                const code = children?.props?.children || "";
                const className = children?.props?.className || "";
                return <CodeBlock className={className}>{code}</CodeBlock>;
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </main>

        {!isMobile && <Toc markdown={content} />}
      </div>
    </div>
  );
}
