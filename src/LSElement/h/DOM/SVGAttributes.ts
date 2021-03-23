import { SVGDOMAttributesWithoutMandatoryId, SVGDOMAttributesWithMandatoryId } from './SVGDOMAttributes';
import { SVGEvents } from './DOMEvents/SVGEvents';

export interface SVGAttributes extends SVGDOMAttributesWithoutMandatoryId, SVGEvents { }
export interface SVGAttributesWithMandatoryId extends SVGDOMAttributesWithMandatoryId, SVGEvents { }