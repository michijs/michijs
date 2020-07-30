import { SVGDOMAttributesWithoutMandatoryId, SVGDOMAttributesWithMandatoryId } from "./SVGDOMAttributes";
import { SVGDOMEvents } from "./SVGDOMEvents";

export interface SVGAttributes extends SVGDOMAttributesWithoutMandatoryId, SVGDOMEvents { };
export interface SVGAttributesWithMandatoryId extends SVGDOMAttributesWithMandatoryId, SVGDOMEvents { };