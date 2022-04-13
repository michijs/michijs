import { ObjectFactory } from '../DOMDiff/ObjectFactory';

export function renderFunctionalComponent(jsxElement: JSX.Element) {
  const el = document.createDocumentFragment();
  ObjectFactory.updateChildren(el, Array.isArray(jsxElement) ? jsxElement : [jsxElement]);
  return el;
}