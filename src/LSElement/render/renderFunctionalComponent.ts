import { insertNewChildren } from './insertNewChildren';

export function renderFunctionalComponent(jsxElement: JSX.Element) {
  const mountPoint = document.createDocumentFragment();
  if (jsxElement) {
    insertNewChildren(mountPoint, mountPoint, [jsxElement]);
  }
  return mountPoint;
}