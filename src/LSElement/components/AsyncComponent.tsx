import { createStyleSheet } from '../css/createStyleSheet';
import { AdoptedStyle } from './AdoptedStyle';
import { createCustomElement } from '../customElements/createCustomElement';
import { h } from '../h';

const AsyncComponentStyleSheet = createStyleSheet({
  ':host': {
    display: 'contents'
  }
});

export const AsyncComponent = createCustomElement('ls-async-component', {
  attributes: {
    currentComponent: undefined as Function,
    promise: undefined as () => Promise<{ [key: string]: JSX.Element }>,
    loadingComponent: undefined as JSX.Element,
    key: undefined as string,
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
  render() {
    return (
      <>
        <AdoptedStyle id="async-component-style">{AsyncComponentStyleSheet}</AdoptedStyle>
        {this.getCurrentComponent()}
      </>
    );
  }
});