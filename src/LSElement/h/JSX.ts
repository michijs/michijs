import { ArrayJSXElement, SingleJSXElement } from '../types';
import { HTMLElements } from './tags/HTMLElements';
import { SVGElements } from './tags/SVGElements';

type AllElements = HTMLElements & SVGElements;

declare global {
    namespace JSX {
        type Element = SingleJSXElement | ArrayJSXElement;
        interface IntrinsicElements extends AllElements {

        }
    }
}
