import { SVGAttributesWithMandatoryId } from './JSX/SVGAttributes';
import { HTMLAttributesWithMandatoryId } from './JSX/HTMLAttributes';

declare global {
    namespace JSX {
        type InternalSVGAttributesWithMandatoryId = { [K in keyof SVGElementTagNameMap]: SVGAttributesWithMandatoryId };
        type InternalHTMLElementAttributesWithMandatoryId = { [K in keyof HTMLElementTagNameMap]: HTMLAttributesWithMandatoryId };
        type InternalIntrinsicElements = InternalSVGAttributesWithMandatoryId & InternalHTMLElementAttributesWithMandatoryId;

        interface IntrinsicElements extends InternalIntrinsicElements {}
    }
}
