import { insertNewChildren } from './insertNewChildren';

export function renderFunctionalComponent(jsxElement: JSX.Element) {
  const mountPoint = document.createDocumentFragment();
  if (jsxElement) {
    insertNewChildren(null, mountPoint, [jsxElement]);
  }
  return mountPoint;
}