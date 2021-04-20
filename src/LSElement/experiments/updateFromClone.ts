
// function updateFromClone(self: LSCustomElement | DocumentFragment, parent: HTMLElement, movedElements: DocumentFragment, jsxArrayElement: JSX.Element, elementsCounter: number, templates: Node[], pendingInsertions: (Node | string)[], rootElement: DocumentFragment): number {
//   const [type, jsxElementTyped] = getJSXElementType(jsxArrayElement);
//   switch (type) {
//     case JSXElementType.FUNCTION: {
//       const { tag, attrs, children } = jsxElementTyped<FunctionJSXElement>();
//       const result = tag(attrs, children, self);
//       return updateFromClone(self, parent, movedElements, result, elementsCounter, templates, pendingInsertions, rootElement)
//     }
//     case JSXElementType.ARRAY: {
//       jsxElementTyped<ArrayJSXElement>().forEach(jsxArrayElement => {
//         elementsCounter = updateFromClone(self, parent, movedElements, jsxArrayElement, elementsCounter, templates, pendingInsertions, rootElement);
//       })
//       return elementsCounter;
//     }
//     case JSXElementType.FRAGMENT: {
//       jsxElementTyped<FragmentJSXElement>().children.forEach(fragmentChild => {
//         elementsCounter = updateFromClone(self, parent, movedElements, fragmentChild, elementsCounter, templates, pendingInsertions, rootElement);
//       })
//       return elementsCounter;
//     }
//     case JSXElementType.OBJECT: {
//       const ObjectJSXElement = jsxElementTyped<ObjectJSXElement>();
//       const oldChild = updateFromObjectJSXElement(self, parent, movedElements, ObjectJSXElement, elementsCounter, rootElement)//Go through the elements, if you find it, update him
//       if (!oldChild) {//If you find a clone and clones set is != 0 insert them
//         const clone = cloneNode(self, ObjectJSXElement, templates, false)
//         pendingInsertions.push(clone);
//         return elementsCounter;
//       } else {
//         const pendingInsertionsLength = pendingInsertions.length;
//         if (pendingInsertionsLength > 0) {
//           insertChildrenAt(parent, elementsCounter, pendingInsertions);
//           pendingInsertions.splice(0, pendingInsertions.length);
//         }
//         return elementsCounter + 1 + pendingInsertionsLength;
//       }
//     }
//     default: {
//       updateFromPrimitiveJSXElement(self, parent, jsxElementTyped<PrimitiveType>(), elementsCounter)
//       return elementsCounter + 1;
//     }
//   }
// }