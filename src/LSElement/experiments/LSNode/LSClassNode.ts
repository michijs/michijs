import { ClassJSXElement, LSCustomElement, ObjectJSXElement } from '../../..';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { LSNode } from './LSNode';

const toObjectJSXElement = ({ tag, attrs, key }: ClassJSXElement): ObjectJSXElement => {
  if (tag.extends)
    return {
      tag: tag.extends,
      attrs: {
        ...attrs,
        is: tag.tag
      },
      key
    };
  return {
    tag: tag.tag,
    attrs,
    key
  };
};

export const LSClassNode = (jsxElement: ClassJSXElement, isSVGParam: boolean, self: LSCustomElement) => {
  const objectResult = toObjectJSXElement(jsxElement);

  const node = LSNode(objectResult, isSVGParam, self);

  const originalNodeUpdateElementFn = node.updateElement.bind(node);

  node.updateElement = (newJSXElement: JSX.Element) => {
    const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
    if (type === JSXElementType.CLASS && typedNewJSXElement<ClassJSXElement>().tag.tag === jsxElement.tag.tag && typedNewJSXElement<ClassJSXElement>().tag.extends === jsxElement.tag.extends)
      return originalNodeUpdateElementFn(toObjectJSXElement(typedNewJSXElement<ClassJSXElement>()));
    // intentional isSVGParam
    return node.replaceWith(newJSXElement);
  };

  return node;
};