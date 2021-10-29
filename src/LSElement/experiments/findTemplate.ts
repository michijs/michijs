// import { PureObjectJSXElement } from '../types';
// import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
// import { nodeIsHTMLElement } from '../typeWards/nodeIsHTMLElement';
// import { tagsAreDifferent } from './rerender/tagsAreDifferent';

// export function findTemplate(templates: Node[], objectJSXElement: PureObjectJSXElement) {
//   return templates.find(template => compareChildren(template, objectJSXElement));
// }

// function compareChildren(template: Node, objectJSXElement: PureObjectJSXElement | string) {
//   const [type, jsxElementTyped] = getJSXElementType(objectJSXElement);
//   if (nodeIsHTMLElement(template)) {
//     if (type === JSXElementType.OBJECT) {
//       if (!tagsAreDifferent(jsxElementTyped<PureObjectJSXElement>(), template)) {
//         if (jsxElementTyped<PureObjectJSXElement>().children.length === template.childNodes.length) {
//           return !jsxElementTyped<PureObjectJSXElement>().children.find((child, i) => !compareChildren(template.childNodes.item(i), child));
//         }
//       }
//     }
//   }
//   else {
//     return type === JSXElementType.PRIMITIVE;
//   }
//   return false
// }