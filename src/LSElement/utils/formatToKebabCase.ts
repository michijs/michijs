export function formatToKebabCase(variable: string): string {
  let formattedVariable = variable.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
  if (formattedVariable.startsWith('-')) {
    formattedVariable = formattedVariable.substr(1, formattedVariable.length);
  }
  return formattedVariable;
}