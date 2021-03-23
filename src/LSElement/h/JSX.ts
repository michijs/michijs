import { HTMLElements } from './tags/HTMLElements';
import { SVGElements } from './tags/SVGElements';

type AllElements = HTMLElements & SVGElements;
declare global {
    namespace JSX {

        interface IntrinsicElements extends AllElements {

        }
    }
}
