export function isArrowFunction(arrowFunction: Function): boolean {
  return arrowFunction.toString().startsWith("(");
}
