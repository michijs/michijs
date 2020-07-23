import { AutonomousCustomElement, h, Property, HTMLAttributes, EventDispatcher, CustomEventDispatcher, LSCustomElement, IdGenerator } from '../../src';
import style from './Counter.css';

@AutonomousCustomElement()
export class MyCounter extends HTMLElement implements LSCustomElement {
	@Property({ onChange: 'onChangeCount' }) count = 0;
	@EventDispatcher() countChanged: CustomEventDispatcher<number>;
	idGen = new IdGenerator();

	onChangeCount(newValue: number, _oldValue: number) {
		this.countChanged.dispatch(newValue);
	}

	render() {
		return (
			<>
				<style {...this.idGen.get('style')} scoped>{style}</style>
				<button {...this.idGen.get('decrement-count')} onPointerUp={() => this.count--}>-</button>
				<span id="count">{this.count.toString()}</span>
				<button id="increment-count" onPointerUp={() => this.count++}>+</button>
			</>
		);
	}
}

declare global {
	export namespace JSX {
		interface IntrinsicElements {
			'my-counter': {
				onCountChanged?: (event: CustomEvent<number>) => void;
			} & HTMLAttributes;
		}
	}
}