import { createStyleSheet } from '../css/createStyleSheet';
import { AdoptedStyle } from './AdoptedStyle';
import { createCustomElement } from '../customElements/createCustomElement';
import { h } from '../h';

const AsyncComponentStyleSheet = createStyleSheet({
  ':host': {
    display: 'contents'
  }
});

/**Create a component whose content will load after the promise ends. In the meantime you can choose to show a load component or not show anything. */
export const AsyncComponent = createCustomElement('ls-async-component', {
  attributes: {
    /** For internal use only - The component currently showing */
    currentComponent: undefined as Function,
    /** The promise to wait */
    promise: undefined as () => Promise<{ [key: string]: JSX.Element }>,
    /** The component key (by default is default)*/
    key: 'default',
    /**The component to display while the promise is loading */
    loadingComponent: undefined as JSX.Element,
  },
  lifecycle: {
    willMount() {
      this.promiseChangeCallback();
    }
  },
  methods: {
    async promiseChangeCallback() {
      const promiseResult = await this.promise();
      this.currentComponent = promiseResult[this.key] as unknown as Function;
    },
    getCurrentComponent() {
      if (this.loadingComponent && !this.currentComponent)
        return this.loadingComponent;

      const Component = this.currentComponent;
      return <Component />;

    }
  },
  observe: {
    promise() {
      this.promiseChangeCallback();
    }
  },
  render() {
    return (
      <>
        <AdoptedStyle id="async-component-style">{AsyncComponentStyleSheet}</AdoptedStyle>
        {this.getCurrentComponent()}
      </>
    );
  }
});