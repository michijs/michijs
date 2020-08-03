import { AutonomousCustomElement, h, EventDispatcher, CustomEventDispatcher, LSCustomElement, HTMLAttributesWithMandatoryId, Attribute } from '../../src';
import style from './Counter.css';

@AutonomousCustomElement()
export class MyCounter extends HTMLElement implements LSCustomElement {
    @Attribute({ onChange: 'onChangeCount' }) count = 0;
    @EventDispatcher() countChanged: CustomEventDispatcher<number>;

    onChangeCount(newValue: number, _oldValue: number) {
        this.countChanged.dispatch(newValue);
    }

    render() {
        return (
            <>
                <style id="style">{style}</style>
                <button id="decrement-count" onpointerup={() => this.count--}>-</button>
                <span id='count'>{this.count.toString()}</span>
                <button style={{backgroundColor: 'red', color: 'green'}} id="increment-count" onpointerup={() => this.count++}>+</button>
            </>
        );
    }
}

declare global {
    export namespace JSX {
        interface IntrinsicElements {
            'my-counter': {
                oncountchanged?: (event: CustomEvent<number>) => void;
            } & HTMLAttributesWithMandatoryId;
        }
    }
}