export function isCustomBuiltInElement(self: Element){
	return window.customElements.get(self.getAttribute('is')) !== undefined;
}