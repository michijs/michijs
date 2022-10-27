import { ClassJSXElement, ElementFactory, Fragment, h, SingleJSXElement } from '../..';
import { ObjectFactory } from './ObjectFactory';
import { PrimitiveFactory } from './PrimitiveFactory';
import { CommentFactory } from './CommentFactory';
import { ListFactory } from './ListFactory';
import { isClassJSXElement } from '../typeWards/isClassJSXElement';
import { classJSXToObjectJSXElement } from '../utils/classJSXToObjectJSXElement';
import { DOMElementFactory } from './DOMElementFactory';

export function getElementFactory(jsx: SingleJSXElement, self: Element): { jsx: SingleJSXElement; factory: ElementFactory; } {
  if (jsx) {
    if (Array.isArray(jsx))
      return { jsx, factory: ListFactory };
    else if (typeof jsx === 'object' && 'tag' in jsx) { //Fix for non-jsx objects
      // Solves undefined Fragment caused by some compilers
      if (jsx.tag === undefined)
        return { jsx: classJSXToObjectJSXElement(h.createElement(Fragment, jsx.attrs) as ClassJSXElement), factory: ObjectFactory };
      else if (typeof jsx.tag === 'function') {
        if (isClassJSXElement(jsx))
          return { jsx: classJSXToObjectJSXElement(jsx), factory: ObjectFactory };
        return getElementFactory(jsx.tag(jsx.attrs, self), self);
      } else if (typeof jsx.tag === 'object') {
        return { jsx, factory: DOMElementFactory };
      }
      return { jsx, factory: ObjectFactory };
    }
    return { jsx, factory: PrimitiveFactory };
  }
  if (jsx === 0)
    return { jsx, factory: PrimitiveFactory };
  return { jsx, factory: CommentFactory };
}
