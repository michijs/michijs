import { LSNode } from '../experiments/LSNode/LSNode';

export function renderFunctionalComponent(jsxElement: JSX.Element) {
  return LSNode(jsxElement).valueOf();
}