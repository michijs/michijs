import { LsStaticAttributesType } from "../types";
import { standardizePropertyName } from "./standardizePropertyName";

export function createGetterAndSetterForObservedAttributes(lsStatic: LsStaticAttributesType) {
	return {
		get() {
			return lsStatic.observedAttributes.map(attribute => standardizePropertyName(attribute.propertyName));
		},
	};
}