export function formatToKebabCase(variable: string): string {
  return variable.replace(/[A-Z]/g, (m, index) =>
    index === 0 ? m.toLowerCase() : `-${m.toLowerCase()}`,
  );
}
