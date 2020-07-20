import { LsAttributesType } from 'LSElement/types';

export function initLs(ls: LsAttributesType): LsAttributesType {
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