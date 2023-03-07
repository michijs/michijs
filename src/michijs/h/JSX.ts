import { SingleJSXElement } from '../types';
import type {
  HTMLElements,
  SVGElements,
  MathMLElements,
} from '@michijs/htmltype';
import { Tag } from './Tag';

declare global {
  namespace JSX {
    // interface ElementClass {
    //     render: () => JSX.Element;
    // }
    // interface ElementAttributesProperty {
    //     props; // specify the property name to use
    // }
    // Will show an error because of dist folder
    type Element = SingleJSXElement;
    interface ElementChildrenAttribute {
      children: JSX.Element; // specify children name to use
    }
    type IntrinsicElements = HTMLElements & {
      [k in keyof HTMLElementTagNameMap]: Tag<HTMLElementTagNameMap[k]>;
    } & SVGElements & {
        [k in keyof SVGElementTagNameMap]: Tag<SVGElementTagNameMap[k]>;
      } & MathMLElements & {
        [k in keyof MathMLElements]: Tag<MathMLElement>;
      };
  }
}
