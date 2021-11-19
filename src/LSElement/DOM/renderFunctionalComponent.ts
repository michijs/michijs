import { LSNode } from '../LSNode/LSNode';

export function renderFunctionalComponent(jsxElement: JSX.Element) {
  return LSNode(jsxElement).valueOf();
}