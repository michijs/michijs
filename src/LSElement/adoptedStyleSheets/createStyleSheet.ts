
export function createStyleSheet(css: string) {
  const sheet = new CSSStyleSheet();
  //@ts-ignore
  sheet.replaceSync(css);

  return sheet;
}