import type { LsStaticAttributesType } from '../types';

export function initLsStatic(ls: LsStaticAttributesType): LsStaticAttributesType {
  if (ls) {
    return ls;
  } 
  return {
    stores: [],
    elements: [],
    observedAttributes: [],
    eventsDispatchers: [],
    tag: undefined,
    extends: undefined
  };
  
}