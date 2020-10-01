import { AutonomousCustomElement, h, AdoptedStyle, EventDispatcher, CustomEventDispatcher, LSCustomElement, HTMLAttributesWithMandatoryId, Attribute, CustomElementWrapper } from '../../src';
import style from './Counter.css';

@AutonomousCustomElement()
export class MyCounter extends HTMLElement implements LSCustomElement {
    @Attribute({ onChange: 'onChangeCount', reflect: true }) count = 0;
    @EventDispatcher() countChanged: CustomEventDispatcher<number>;

    onChangeCount(newValue: number, _oldValue: number) {
        this.countChanged.dispatch(newValue);
    }

    render() {
        return (
            <>
                <AdoptedStyle parentRef={this} id="style">{style}</AdoptedStyle>
                {this.count <= 0 ?<div id="test">test</div>: undefined}
                <button style={this.count > 0 ? {backgroundColor:'red'}: undefined} id="decrement-count" onpointerup={() => this.count--}>-</button>
                <span id='count'>{this.count}</span>
                <button style={{backgroundColor: 'red', color: 'green'}} id="increment-count" onpointerup={() => this.count++}>+</button>
                {this.count > 0 ?<div id="test">test</div>: undefined}
            </>
        );
    }
}

export type MyCounterAttributes = {
    oncountchanged?: (event: CustomEvent<number>) => void;
} & HTMLAttributesWithMandatoryId;

export default CustomElementWrapper<MyCounterAttributes>(MyCounter);