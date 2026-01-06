const NamespacesPrefix = "http://www.w3.org";
const RootTags = {
  SVG: "svg",
  MATHML: "math",
};

export const Namespaces = {
  [RootTags.SVG]: `${NamespacesPrefix}/2000/${RootTags.SVG}`,
  [RootTags.MATHML]: `${NamespacesPrefix}/1998/Math/MathML`,
  // HTML: `${NamespacesPrefix}/1999/xhtml`,
};
