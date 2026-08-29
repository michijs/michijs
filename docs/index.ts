import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
  },
});
// @ts-ignore
window.mermaid = mermaid;
