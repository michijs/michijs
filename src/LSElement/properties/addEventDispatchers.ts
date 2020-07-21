import { LSCustomElement } from '../types';
import { CustomEventDispatcher } from '../classes/CustomEventDispatcher';

export function addEventDispatchers(self: LSCustomElement) {
	self.lsStatic.eventsDispatchers.forEach(eventDispatcher => {
		self[eventDispatcher.propertyName] = new CustomEventDispatcher(
			eventDispatcher.propertyName,
			self,
            eventDispatcher.eventInit?.bubbles,
            eventDispatcher.eventInit?.cancelable,
            eventDispatcher.eventInit?.composed
		);
	});
}