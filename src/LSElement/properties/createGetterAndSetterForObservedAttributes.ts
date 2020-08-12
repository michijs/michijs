import { LsStaticAttributesType } from '../types';
import { standardizePropertyName } from './standardizePropertyName';

export function getObservedAttributes(lsStatic: LsStaticAttributesType) {
	return lsStatic.observedAttributes.map(attribute => standardizePropertyName(attribute.propertyName));
}