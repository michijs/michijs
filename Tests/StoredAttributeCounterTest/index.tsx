import { AutonomousCustomElement, h, AdoptedStyle, EventDispatcher, CustomEventDispatcher, LSCustomElement, CustomElementWrapper, Observer, StoredAttribute } from '../../src';
import css from '../Shared/Counter.css'
import { MyCounterAttributes } from '../Types';

@AutonomousCustomElement()
export class StoredAttributeCounter extends HTMLElement implements LSCustomElement {
    @StoredAttribute({ reflect: true, key: 'count', method: 'localStorage' }) count = 0;
    @EventDispatcher() countChanged: CustomEventDispatcher<number>;

    @Observer('count')
    onChangeCount(newValue: number, _oldValue: number) {
        this.countChanged.dispatch(newValue);
    }

    render() {
        return (
            <>
                <AdoptedStyle parentRef={this} id="style">{css}</AdoptedStyle>
                <button id="decrement-count" onpointerup={() => this.count--}>-</button>
                <span id='count'>{this.count}</span>
                <button id="increment-count" onpointerup={() => this.count++}>+</button>
            </>
        );
    }
}

export default CustomElementWrapper<MyCounterAttributes>(StoredAttributeCounter);