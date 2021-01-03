export class CustomEventDispatcher<T> {
    private eventInit: CustomEventInit<T>;
    private element: Element;
    private propertyKey: string;

    constructor(propertyKey: string, element: Element, bubbles = true, cancelable = false, composed = undefined) {
    	this.propertyKey = propertyKey.toLowerCase();
    	this.element = element;
    	this.eventInit = {
    		bubbles,
    		cancelable,
    		composed
    	};
    }

    dispatch(detail: T) {
    	this.eventInit.detail = detail;
    	const event = new CustomEvent(this.propertyKey, this.eventInit);
    	return this.element.dispatchEvent(event);
    }
}