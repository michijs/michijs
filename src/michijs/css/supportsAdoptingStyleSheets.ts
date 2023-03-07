export const supportsAdoptingStyleSheets =
  window.ShadowRoot &&
  'adoptedStyleSheets' in Document.prototype &&
  'replace' in CSSStyleSheet.prototype;
