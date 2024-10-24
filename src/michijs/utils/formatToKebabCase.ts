export function formatToKebabCase(variable: string): string {
  return variable.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
