import { ClassJSXElement, ElementFactory, ObjectJSXElement, SingleJSXElement } from '../..';
import { ObjectFactory } from './ObjectFactory';
import { PrimitiveFactory } from './PrimitiveFactory';
import { CommentFactory } from './CommentFactory';
import { ListFactory } from './ListFactory';

export const classJSXToObjectJSXElement = ({ tag, attrs, key }: ClassJSXElement): ObjectJSXElement => {
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

export function isClassJSXElement(param): param is ClassJSXElement {
  return param.tag.tag;
}

export function getElementFactory(jsx: SingleJSXElement, self?: Element): ElementFactory {
  if (jsx) {
    if (Array.isArray(jsx)) {
      return new ListFactory(jsx);
    } else if (typeof jsx === 'object' && 'tag' in jsx) {//Fix for non-jsx objects
      // if (jsx.tag === undefined)
      //     return [JSXElementType.FRAGMENT, getValue(value)];
      // else 
      if (typeof jsx.tag === 'function') {
        if (isClassJSXElement(jsx))
          return new ObjectFactory(classJSXToObjectJSXElement(jsx));
        return getElementFactory(jsx.tag(jsx.attrs, self), self);
      }
      return new ObjectFactory(jsx as ObjectJSXElement);
    }
    return new PrimitiveFactory(jsx);
  }
  if (jsx === 0)
    return new PrimitiveFactory(jsx);
  return new CommentFactory();
}

export const update = (element: ChildNode, jsx: SingleJSXElement, isSVG?: boolean, contextElement?: Element) => {
  const factory = getElementFactory(jsx, contextElement);
  // if they are the same node
  if (factory.compare(element)) {
    // Update it 
    factory.update?.(element, isSVG, contextElement);
  } else {
    // replace it
    element.replaceWith(factory.create(isSVG, contextElement));
  }
};