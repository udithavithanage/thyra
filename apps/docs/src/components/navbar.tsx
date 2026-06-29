import { useState } from "react";

import { HiMenu, HiX } from "react-icons/hi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { FaGithub, FaNpm } from "react-icons/fa";

import { version } from "package";

import thyra from "@public/thyra.png";
import { getDocsPageLabel, getDocsSectionLabel } from "@/utils";

type NavProps = {
  files: string[];
  active: string;
  isMobile: boolean;
  onSelect: (file: string) => void;
};

export default function Navbar({
  files,
  active,
  isMobile,
  onSelect,
}: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Group files by section
  const grouped: Record<string, string[]> = {};
  files.forEach((file) => {
    const parts = file.replace("./docs/", "").split("/");
    const section = parts[0];
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(file);
  });

  const getActiveInfo = () => ({ section: getDocsSectionLabel(active), pageTitle: getDocsPageLabel(active) });

  const { section: activeSection, pageTitle: activePageTitle } =
    getActiveInfo();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleFileSelect = (file: string) => {
    onSelect(file);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <img src={thyra} alt="Thyra" width={35} />
          <span className="brand-text">Thyra Docs</span>
        </div>

        {/* Desktop: Active page breadcrumb */}
        <div className="nav-breadcrumb desktop">
          <span className="breadcrumb-section">{activeSection}</span>
          <MdNavigateNext className="breadcrumb-separator" />
          <span className="breadcrumb-page">{activePageTitle}</span>
        </div>

        {/* Links and Version */}
        <div className="nav-actions">
          <div className="nav-links">
            <a
              href="https://www.npmjs.com/package/thyra"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="NPM Package"
            >
              <FaNpm />
            </a>
            <a
              href="https://github.com/udithavithanage/thyra"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="GitHub Repository"
            >
              <FaGithub />
            </a>
          </div>
          <div className="nav-version desktop">
            <span className="version-badge">v{version}</span>
          </div>

          {/* Mobile: Hamburger menu */}
          {isMobile && (
            <button
              className="nav-hamburger mobile"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && isOpen && (
        <div className="nav-dropdown mobile">
          <div className="dropdown-content">
            {Object.keys(grouped).map((section) => (
              <div key={section} className="dropdown-section">
                <button
                  className="section-header"
                  onClick={() => toggleSection(section)}
                >
                  <span className="section-title">
                    {getDocsSectionLabel(`./docs/${section}/README.md`)}
                  </span>
                  <span
                    className={`section-arrow ${
                      expandedSection === section ? "expanded" : ""
                    }`}
                  >
                    {expandedSection === section ? (
                      <IoChevronUp />
                    ) : (
                      <IoChevronDown />
                    )}
                  </span>
                </button>

                {expandedSection === section && (
                  <div className="section-items">
                    {grouped[section].map((file) => (
                      <div
                        key={file}
                        className={`dropdown-item ${
                          active === file ? "active" : ""
                        }`}
                        onClick={() => handleFileSelect(file)}
                      >
                        {getDocsPageLabel(file)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
