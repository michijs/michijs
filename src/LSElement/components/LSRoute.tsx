import { EventDispatcher } from '../classes';
import { createCustomElement } from '../customElements/createCustomElement';
import { ObservableLike } from '../types';
import { h } from '../h';

export const LSRoute = createCustomElement('ls-route', {
  attributes: {
    currentComponent: () => <></>,
    subscribedRoute: undefined as ObservableLike<JSX.Element>
  },
  events: {
    readyToRender: new EventDispatcher()
  },
  lifecycle: {
    willMount() {
      const subscribeFunction = (newComponent) => {
        this.currentComponent = () => newComponent;
        this.ls.rerenderCallback('currentComponent');
      };
      this.subscribedRoute.subscribe(subscribeFunction);
      this.ls.unSubscribeFromStore.push(() => this.subscribedRoute.unsubscribe(subscribeFunction));
      this.readyToRender(undefined);
    },
  },
  render() {
    return this.currentComponent();
  }
});