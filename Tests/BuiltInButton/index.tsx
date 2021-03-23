import { CustomizedBuiltInElement, Attribute, AdoptedStyle, h, LSCustomElement, CustomElementWrapper } from '../../src';
import style from './style.css';

@CustomizedBuiltInElement({ extends: 'button' })
export class BuiltInButton extends HTMLButtonElement implements LSCustomElement {
	@Attribute({reflect: true }) text: string;

	render() {
		return (
			<>
				<AdoptedStyle parentRef={this} id="style">{style}</AdoptedStyle>
				{this.text}
			</>
		);
	}
}

type BuiltInButtonAttributes = {
	text: string;
};

export default CustomElementWrapper<BuiltInButtonAttributes>()(BuiltInButton);