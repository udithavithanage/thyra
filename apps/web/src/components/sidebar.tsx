import { useState } from "react";

type SidebarProps = {
  files: string[];
  active: string;
  onSelect: (file: string) => void;
};

const SECTION_LABELS: Record<string, string> = {
  readme: "Overview",
};

export default function Sidebar({ files, active, onSelect }: SidebarProps) {
  const grouped: Record<string, string[]> = {};

  files.forEach((file) => {
    const parts = file.replace("./docs/", "").split("/");
    const section = parts[0];
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(file);
  });

  const getSectionLabel = (section: string): string => {
    const lower = section.toLowerCase();
    if (SECTION_LABELS[lower]) return SECTION_LABELS[lower];
    return section
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getDisplayName = (file: string): string => {
    const fileName = file.split("/").pop()!.replace(/\.md$/i, "");
    if (fileName.toUpperCase() === "README") return "Overview";
    return fileName
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(Object.keys(grouped).map((s) => [s, true])),
  );

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="sidebar">
      {Object.keys(grouped).map((section) => {
        const isOpen = openSections[section] ?? true;
        const itemCount = grouped[section].length;

        return (
          <div key={section} className="sb-section">
            <button
              className="sb-header"
              onClick={() => toggleSection(section)}
              aria-expanded={isOpen}
            >
              <span className="sb-title">{getSectionLabel(section)}</span>
              <span
                className="sb-chevron"
                style={{
                  transform: isOpen ? "rotate(0deg)" : "rotate(-180deg)",
                }}
              >
                <i className="ti ti-chevron-up" aria-hidden="true" />
              </span>
            </button>

            <div
              className="sb-items"
              style={{
                maxHeight: isOpen ? `${itemCount * 44 + 8}px` : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="sb-items-inner">
                {grouped[section].map((file) => (
                  <div
                    key={file}
                    className={`sb-item ${active === file ? "active" : ""}`}
                    onClick={() => onSelect(file)}
                  >
                    {getDisplayName(file)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
