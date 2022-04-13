export function isAnObject(param): param is object {
  return param && typeof param === 'object';
}