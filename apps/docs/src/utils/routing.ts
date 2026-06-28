export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getCurrentRoute(): string {
  const path = window.location.pathname;
  return path === "/" || path === "" ? "" : path.slice(1);
}

export function navigateTo(route: string, heading?: string): void {
  const path = route.startsWith("/") ? route : `/${route}`;
  const url = heading ? `${path}#${heading}` : path;
  window.history.pushState(null, "", url);

  // Dispatch custom event for route change
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function parseCurrentUrl(): { route: string; heading?: string } {
  const path = window.location.pathname;
  const route = path === "/" || path === "" ? "" : path.slice(1);
  const hash = window.location.hash.slice(1);

  return {
    route,
    heading: hash || undefined,
  };
}

export function buildShareableUrl(route: string, heading?: string): string {
  const baseUrl = window.location.origin;
  const path = route.startsWith("/") ? route : `/${route}`;
  const url = heading ? `${path}#${heading}` : path;
  return `${baseUrl}${url}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    return false;
  }
}
