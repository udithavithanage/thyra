type SidebarProps = {
  files: string[];
  active: string;
  onSelect: (file: string) => void;
};

export default function Sidebar({ files, active, onSelect }: SidebarProps) {
  const grouped: Record<string, string[]> = {};

  files.forEach((file) => {
    const parts = file.replace("./docs/", "").split("/");
    const section = parts[0];

    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(file);
  });

  // Helper function to get display name for a file
  const getDisplayName = (file: string): string => {
    const fileName = file.split("/").pop()!.replace(".md", "");

    // Better formatting for display names
    if (fileName === "README") {
      return "Overview";
    }

    return fileName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <aside className="sidebar">
      {Object.keys(grouped).map((section) => (
        <div key={section}>
          <h4>
            {section
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </h4>

          {grouped[section].map((file) => {
            const displayName = getDisplayName(file);

            return (
              <div
                key={file}
                className={`item ${active === file ? "active" : ""}`}
                onClick={() => onSelect(file)}
              >
                {displayName}
              </div>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
