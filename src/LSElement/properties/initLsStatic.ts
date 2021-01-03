import type { LsStaticAttributesType } from '../types';

export function initLsStatic(lsStatic: LsStaticAttributesType): LsStaticAttributesType {
  return lsStatic ?? {
    stores: [],
    reflectedAttributes: [],
    attributes: [],
    observers: [],
    storedAttributes: [],
    tag: undefined,
    extends: undefined
  };
}