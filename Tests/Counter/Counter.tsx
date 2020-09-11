import { AutonomousCustomElement, h, AdoptedStyle, EventDispatcher, CustomEventDispatcher, LSCustomElement, HTMLAttributesWithMandatoryId, Attribute, CustomElementWrapper } from '../../src';
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
                <AdoptedStyle parentRef={this} id="style">{style}</AdoptedStyle>
                <button id="decrement-count" onpointerup={() => this.count--}>-</button>
                <span id='count'>{this.count.toString()}</span>
                <button style={{backgroundColor: 'red', color: 'green'}} id="increment-count" onpointerup={() => this.count++}>+</button>
            </>
        );
    }
}

export type MyCounterAttributes = {
    oncountchanged?: (event: CustomEvent<number>) => void;
} & HTMLAttributesWithMandatoryId;

export default CustomElementWrapper<MyCounterAttributes>(MyCounter);