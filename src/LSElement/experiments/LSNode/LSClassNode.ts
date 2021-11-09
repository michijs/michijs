import { ClassJSXElement, h, LSCustomElement, ObjectJSXElement } from '../../..';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { LSNodeType } from './LSNode';
import { LSObjectNode } from './LSObjectNode';
import { replaceNodeWith } from './replaceNodeWith';

const toObjectJSXElement = ({tag, attrs}: ClassJSXElement): ObjectJSXElement => {
  if (tag.extends)
    return {
      tag: tag.extends,
      attrs: {
        ...attrs,
        is: tag.tag
      },
    };
  return {
    tag: tag.tag,
    attrs
  };
};

export const LSClassNode = (jsxElement: ClassJSXElement, isSVGParam: boolean, self: LSCustomElement) => {
  const objectJSXElement = toObjectJSXElement(jsxElement);
  const lsNodeResult = LSObjectNode(objectJSXElement, isSVGParam, self);
    
  const node: LSNodeType = {
    el: lsNodeResult.el,
    children: lsNodeResult.children,
    updateElement: (newJSXElement: JSX.Element) => {
      const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
      if (type === JSXElementType.CLASS && typedNewJSXElement<ClassJSXElement>().tag.tag === jsxElement.tag.tag && typedNewJSXElement<ClassJSXElement>().tag.extends === jsxElement.tag.extends) {
        const objectJSXElementResult = toObjectJSXElement(typedNewJSXElement<ClassJSXElement>());
        jsxElement.attrs = typedNewJSXElement<ClassJSXElement>().attrs;
        const result = lsNodeResult.updateElement(objectJSXElementResult);
        node.el = result.el;
        node.children = result.children;
        node.replaceWith = (...nodes) => result.replaceWith(...nodes);
        node.remove = (...nodes) => result.remove(...nodes);
        return node;
      }
      // intentional isSVGParam
      return replaceNodeWith(node, newJSXElement, isSVGParam, self);
    },
    replaceWith: (...nodes) => lsNodeResult.replaceWith(...nodes),
    remove: () => lsNodeResult.remove(),
  };
  return node;
};