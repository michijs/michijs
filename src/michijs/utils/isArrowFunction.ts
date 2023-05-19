export function isArrowFunction(arrowFunction: Function) {
  return arrowFunction.toString().startsWith("(");
}
