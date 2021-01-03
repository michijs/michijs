import { LsStaticAttributesType } from '../types';
import { formatToKebabCase } from '../utils/formatToKebabCase';

export function initObservedAttributes(lsStatic: LsStaticAttributesType) {
  return lsStatic.reflectedAttributes.map(propertyKey => formatToKebabCase(propertyKey));
}