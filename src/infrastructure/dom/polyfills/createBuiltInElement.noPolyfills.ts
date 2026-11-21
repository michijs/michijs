/**
 * `#create-built-in-element` for builds with the `michijs-no-polyfills` condition: always
 * native, without the Safari emulation nor top-level await.
 */
export const createBuiltInElement: typeof window.customElements.define =
  window.customElements.define.bind(window.customElements);
