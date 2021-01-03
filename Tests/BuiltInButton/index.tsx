import { CustomizedBuiltInElement, Attribute, AdoptedStyle, h, LSCustomElement, HTMLAttributesWithMandatoryId, CustomElementWrapper } from '../../src';
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
} & HTMLAttributesWithMandatoryId;

export default CustomElementWrapper<BuiltInButtonAttributes>(BuiltInButton);