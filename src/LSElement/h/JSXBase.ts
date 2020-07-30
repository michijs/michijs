import { SVGAttributesWithMandatoryId } from './JSX/SVGAttributes';
import { HTMLAttributesWithMandatoryId } from './JSX/HTMLAttributes';

declare global {
    namespace JSX {
        type InteralSVGAttributesWithMandatoryId = { [K in keyof SVGElementTagNameMap]: SVGAttributesWithMandatoryId };
        type InteralHTMLElementAttributesWithMandatoryId = { [K in keyof HTMLElementTagNameMap]: HTMLAttributesWithMandatoryId };
        type InternalIntrinsicElements = InteralSVGAttributesWithMandatoryId & InteralHTMLElementAttributesWithMandatoryId;

        interface IntrinsicElements extends InternalIntrinsicElements {}
    }
}
