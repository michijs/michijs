export function isCustomElement(tag: string, is?: string) {
  return is || tag.indexOf('-') !== -1;
}
