import { AutonomousCustomElement, Attribute, Property, h, Child, HTMLAttributes, EventDispatcher, CustomEventDispatcher, LSCustomElement } from '../..';

@AutonomousCustomElement()
export class LsTestElement extends HTMLElement implements LSCustomElement {
  @Property({ reflect: true, onChange: 'onChangeXd' }) xd = 234;
  @Property() arrayExample = [1, 2];
  @Attribute({ onChange: 'onChangeXD2' }) xd2: number = 1;
  @Child('xd') xdElement: HTMLHeadingElement;
  @Child('xd2') xd2Element: HTMLHeadingElement;
  @EventDispatcher() allAnimationsFinished: CustomEventDispatcher<string>;

  onChangeXd(newValue) {
  	// this.xdElement.textContent = newValue;
  	// const event = new CustomEvent('allanimationsfinished', {
  	//   detail: 'hola',
  	//   bubbles: true,
  	//   cancelable: false,
  	// });
  	// console.log(this.allAnimationsFinished);
  	// this.dispatchEvent(event);
  	// this.allAnimationsFinished.dispatch('holaxd');
  }

  onChangeXD2(newValue) {
  	// this.xd2Element.textContent = newValue;
  }

  styles() {
  	return [
  		import('./style.css'),
  		import('./style2.css')
  	];
  }

  render() {
  	return (
  		<>
  			<div>
  				<h1 id="xd" value={this.xd < 240 ? this.xd2 + this.xd : undefined} onClick={(_ev) => { this.xd++; this.arrayExample.push(this.xd2); }}>{this.xd}</h1>
  				<h1>{this.xd2}</h1>
  			</div>
  			{this.xd > 256 ? <h1 id="xd2">{'>256'}</h1> : undefined}
  			{this.xd > 245 ? <h1>{'>245'}</h1> : undefined}
  			{this.xd < 236 ? <h1>{'<236'}</h1> : undefined}
  			{/* {this.arrayExample.map(x => <h2>{x}</h2>)} */}
  		</>
  	);
  }
}

declare global {
  export namespace JSX {
    interface IntrinsicElements {
      'ls-test-element': {
        xd2?: string;
        onAllAnimationsFinished?: (event: CustomEvent<string>) => void;
      } & HTMLAttributes;
    }
  }
}