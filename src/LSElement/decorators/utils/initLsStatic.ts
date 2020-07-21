import { LsStaticAttributesType } from 'LSElement/types';

export function initLsStatic(ls: LsStaticAttributesType): LsStaticAttributesType {
	if (ls) {
		return ls;
	} else {
		return {
			elements: [],
			observedAttributes: [],
			properties: [],
			eventsDispatchers: []
		};
	}
}