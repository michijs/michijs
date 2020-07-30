import { DOMAttributesWithoutMandatoryId, DOMAttributesWithMandatoryId } from "./DOMAttributes";
import { DOMEvents } from "./DOMEvents";

export interface HTMLAttributes extends DOMAttributesWithoutMandatoryId, DOMEvents { };
export interface HTMLAttributesWithMandatoryId extends DOMAttributesWithMandatoryId, DOMEvents { };