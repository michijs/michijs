// import { AnyObject, ArrayJSXElement, ClassJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement } from '../../..';
// import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
// import { LSChildNode } from './LSChildNode';
// import { LSNode } from './LSNode';
// import { LSVirtualFragmentNode } from './LSVirtualFragmentNode';
// export class LSArrayNode extends LSVirtualFragmentNode<ArrayJSXElement> {
//   constructor(jsxElement: ArrayJSXElement, isSVGParam: boolean, self: LSCustomElement) {
//     super(jsxElement, isSVGParam, self);
//     this.createAndAppend(jsxElement);
//   }
//   createAndAppend(children: JSX.Element[]) {
//     this.childrenNodes = children.map(x => LSNode(x, this.isSVG, this.self));
//   }
//   insertItems(i: number, node: LSChildNode<JSX.Element>[]) {
//     if (this.childrenNodes.length > i) {
//       if (i !== 0) {
//         this.childrenNodes[i - 1].afterNodes(node);
//         this.childrenNodes.splice(i, 0, ...node);
//       } else {
//         this.pivotNode.afterNodes(node);
//         this.childrenNodes.unshift(...node);
//       }
//     } else {
//       this.childrenNodes.push(...this.afterNodes(node));
//     }
//     return node;
//   }
//   findNode(jsxElement: JSX.Element, indexToLookAt: number, movedNodes: Array<LSChildNode<AnyObject | ObjectJSXElement | FunctionJSXElement | ClassJSXElement>>): { childNodeFound?: LSChildNode<JSX.Element>, foundAtMovedElements: boolean, saveToMovedNodes: boolean, indexWhereFound: number } {
//     debugger;
//     const oldChild = this.childrenNodes.length > indexToLookAt ? this.childrenNodes[indexToLookAt] : undefined;
//     if (typeof jsxElement === 'object' && 'key' in jsxElement) {
//       if (oldChild && typeof oldChild.jsxElement === 'object' && 'key' in oldChild.jsxElement && oldChild.jsxElement.key === jsxElement.key)//Looking in the same index
//         return {
//           childNodeFound: oldChild,
//           foundAtMovedElements: false,
//           saveToMovedNodes: true,
//           indexWhereFound: indexToLookAt
//         }
//       //Looking in moved nodes
//       const movedNode = movedNodes.find(x => x.jsxElement.key === jsxElement.key);
//       if (movedNode)
//         return {
//           childNodeFound: movedNode,
//           foundAtMovedElements: true,
//           saveToMovedNodes: true,
//           indexWhereFound: undefined
//         }
//       else {//Looking in the rest of the childrenNodes
//         const oldChildNodeIndex = this.childrenNodes.findIndex(x => typeof x.jsxElement === 'object' && 'key' in x.jsxElement && x.jsxElement.key === jsxElement.key)

//         if (oldChildNodeIndex !== -1)
//           return {
//             childNodeFound: this.childrenNodes[oldChildNodeIndex],
//             indexWhereFound: oldChildNodeIndex,
//             foundAtMovedElements: false,
//             saveToMovedNodes: true
//           }
//         else
//           return {
//             childNodeFound: undefined,
//             indexWhereFound: undefined,
//             foundAtMovedElements: false,
//             saveToMovedNodes: false
//           }
//       }
//     } else {
//       if (typeof oldChild === 'object' && 'key' in oldChild) {
//         return {
//           childNodeFound: undefined,
//           indexWhereFound: undefined,
//           foundAtMovedElements: false,
//           saveToMovedNodes: true
//         }
//       } else {
//         return {
//           childNodeFound: oldChild,
//           indexWhereFound: indexToLookAt,
//           foundAtMovedElements: false,
//           saveToMovedNodes: false
//         }
//       }
//     }
//   }
//   updateElement(newJSXElement: JSX.Element) {
//     const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
//     if (type === JSXElementType.ARRAY) {
//       const jsxElements = typedNewJSXElement<ArrayJSXElement>();
//       // const pendingInsertions = new Array<LSChildNode<JSX.Element>>();
//       const movedNodes = new Array<LSChildNode<AnyObject | ObjectJSXElement | FunctionJSXElement | ClassJSXElement>>();
//       // let lastChildrenNotFoundAtIndex = 0;
//       if (this.childrenNodes.length !== 0) {
//         debugger;
//         jsxElements.forEach((jsxElement, i) => {
//           const { childNodeFound, indexWhereFound, foundAtMovedElements, saveToMovedNodes } = this.findNode(jsxElement, i, movedNodes);
//           if (childNodeFound) {
//             childNodeFound.updateElement(jsxElement)
//             if (indexWhereFound === i) {//is in the position
//               // Insert pending insertions
//               // this.insertItems(lastChildrenNotFoundAtIndex, pendingInsertions);
//               // lastChildrenNotFoundAtIndex = i;
//             } else {
//               if (!foundAtMovedElements) {//Was not found in moved elements -> needs to remove and insert the node at index into moved nodes
//                 if (saveToMovedNodes)//Only save keyed elements
//                   movedNodes.push(this.childrenNodes[i] as LSChildNode<ObjectJSXElement>);
//                 this.removeItem(i);
//               }
//               this.childrenNodes.splice(indexWhereFound, 1)
//               this.insertItems(i, [childNodeFound])
//             }
//           } else {
//             this.insertItems(i, [LSNode(jsxElement, this.isSVG, this.self)])
//           }
//         })
//         // Insert pending insertions
//         // this.childrenNodes.push(...this.afterNodes(pendingInsertions));
//         // Removing leftover nodes
//         this.childrenNodes.splice(jsxElements.length).forEach(x => x.remove());

//       }
//       this.jsxElement = jsxElements;
//       return this;
//     }
//     return this.replaceWith(newJSXElement);
//   }
// }