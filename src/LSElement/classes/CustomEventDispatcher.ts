export class CustomEventDispatcher<T> {
    private eventInit: CustomEventInit<T>;
    private element: Element;
    private propertyName: string;

    constructor(propertyName: string, element: Element, bubbles = true, cancelable = false, composed = undefined) {
    	this.propertyName = propertyName.toLowerCase();
    	this.element = element;
    	this.eventInit = {
    		bubbles,
    		cancelable,
    		composed
    	};
    }

    dispatch(detail: T) {
    	this.eventInit.detail = detail;
    	const event = new CustomEvent(this.propertyName, this.eventInit);
    	return this.element.dispatchEvent(event);
    }
}