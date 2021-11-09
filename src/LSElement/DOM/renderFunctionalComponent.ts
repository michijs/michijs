import { LSNode } from '../experiments/LSNode/LSNode';

export function renderFunctionalComponent(jsxElement: JSX.Element) {
  const fragment = document.createDocumentFragment();
  if (jsxElement) {
    fragment.append(LSNode(jsxElement).el);
  }
  return fragment;
}