import { insertNewChildren } from './insertNewChildren';

export function renderFunctionalComponent(jsxElement: JSX.Element) {
  const fragment = document.createDocumentFragment();
  const mountPoint = () => fragment;
  if (jsxElement) {
    insertNewChildren(null, mountPoint, [jsxElement]);
  }
  return fragment;
}