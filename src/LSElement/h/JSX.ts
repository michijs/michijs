import { ArrayJSXElement, SingleJSXElement } from '../types';
import { HTMLElements } from './tags/HTMLElements';
import { SVGElements } from './tags/SVGElements';

type AllElements = HTMLElements & SVGElements;

declare global {
    namespace JSX {
        // interface ElementClass {
        //     render: () => JSX.Element;
        // }
        interface ElementAttributesProperty {
            props; // specify the property name to use
        }
        type Element = SingleJSXElement | ArrayJSXElement;
        interface ElementChildrenAttribute {
            children: JSX.Element; // specify children name to use
        }
        interface IntrinsicElements extends AllElements {

        }
    }
}
