import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { MobileBreadcrumb, Navbar, Sidebar, Toc } from "@/components";

import { useDevice } from "@/hooks";
import { docs } from "@/docs-loader";

import {
  docsFileToPath,
  getDocsPageLabel,
  getDocsSectionLabel,
  resolveDocsFile,
} from "@/utils";

export default function DocsLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const files = Object.keys(docs);
  const isMobile = useDevice(768);

  const active = resolveDocsFile(location.pathname, files);

  const handleSelect = (file: string) => {
    navigate(docsFileToPath(file));
  };

  const section = getDocsSectionLabel(active);
  const page = getDocsPageLabel(active);

  return (
    <div className="app-container">
      <Navbar
        files={files}
        active={active}
        isMobile={isMobile}
        onSelect={handleSelect}
      />

      <div className="layout">
        {!isMobile && (
          <Sidebar files={files} active={active} onSelect={handleSelect} />
        )}

        {isMobile && <MobileBreadcrumb section={section} page={page} />}

        <Outlet />

        {!isMobile && <Toc markdown={docs[active]} />}
      </div>
    </div>
  );
}
