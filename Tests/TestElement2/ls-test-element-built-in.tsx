import { CustomizedBuiltInElement, Attribute, h, LSCustomElement, HTMLAttributesWithMandatoryId, CustomElementWrapper } from '../../src';
import style from './style.css';

@CustomizedBuiltInElement({ extends: 'button' })
export class LsTestElementBuiltIn extends HTMLButtonElement implements LSCustomElement {
	@Attribute({ onChange: 'onChangeXD2', reflect: true }) xd2: number = 1;

	onChangeXd(_newValue, _oldValue) {
		// this.xdElement.textContent = newValue;
		// const event = new CustomEvent('allanimationsfinished', {
		//   detail: 'hola',
		//   bubbles: true,
		//   cancelable: false,
		// });
		// this.dispatchEvent(event);
		// this.allAnimationsFinished.dispatch('holaxd');

	}

	onChangeXD2(_newValue) {
		// this.xd2Element.textContent = newValue;
	}

	render() {
		return (
			<>
				<style id="style">{style}</style>
				<h1 id="xd2" onclick={() => this.xd2++}>{this.xd2}</h1>
				<slot id="test"></slot>
			</>
		);
	}
}

type TestElementAttributes = {
	xd2?: number;
	onallanimationsfinished?: (event: CustomEvent<string>) => void;
} & HTMLAttributesWithMandatoryId;

export default CustomElementWrapper<TestElementAttributes>(LsTestElementBuiltIn);