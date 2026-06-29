import { useEffect, type Dispatch, type SetStateAction } from "react";

import { MdNavigateNext } from "react-icons/md";

import { useIntersectionObserver } from "@/hooks";

type MobileBreadcrumbProps = {
  section: string;
  page: string;
};

export default function MobileBreadcrumb({
  section,
  page,
}: MobileBreadcrumbProps) {
  const [activeHeading, setActiveHeading] = useIntersectionObserver({
    selector: ".content h2",
    rootMargin: "-80px 0px -80% 0px",
    threshold: 0,
  }) as [string, Dispatch<SetStateAction<string>>];

  useEffect(() => {
    setActiveHeading("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, page]);

  return (
    <div className="mobile-breadcrumb">
      <span className="mobile-breadcrumb-section">{section}</span>
      <MdNavigateNext className="mobile-breadcrumb-separator" />
      <span className="mobile-breadcrumb-page">{page}</span>
      {activeHeading && (
        <>
          <MdNavigateNext className="mobile-breadcrumb-separator" />
          <span className="mobile-breadcrumb-heading">{activeHeading}</span>
        </>
      )}
    </div>
  );
}
