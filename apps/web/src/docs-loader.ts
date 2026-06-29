export const docs = import.meta.glob<string>("../docs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
