export interface SVGEvents extends Omit<Partial<SVGElementEventMap & DocumentAndElementEventHandlers>, 'addEventListener' | 'removeEventListener'> { }
