import { LsStaticAttributesType } from '../types';
import { standardizePropertyName } from './standardizePropertyName';

export function getObservedAttributes(lsStatic: LsStaticAttributesType) {
  return lsStatic.observedAttributes.filter(attribute => attribute.options?.reflect).map(attribute => standardizePropertyName(attribute.propertyName));
}