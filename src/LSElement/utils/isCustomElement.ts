export function isCustomElement(self: Element){
  return window.customElements.get(self.getAttribute('is') || self.tagName.toLowerCase()) !== undefined;
}