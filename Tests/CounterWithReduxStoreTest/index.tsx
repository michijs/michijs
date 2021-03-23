import { AutonomousCustomElement, h, AdoptedStyle, EventDispatcher, CustomEventDispatcher, LSCustomElement, CustomElementWrapper, Observer, Store } from '../../src';
import css from '../Shared/Counter.css'
import { decrement, increment } from '../shared/redux/CounterSlice';
import { store, StoreType } from '../shared/redux/store';
import { MyCounterAttributes } from '../Types';

@AutonomousCustomElement()
export class CounterWithReduxStore extends HTMLElement implements LSCustomElement {
    @EventDispatcher() countChanged: CustomEventDispatcher<number>;
	@Store(store) reduxStore: StoreType;

    @Observer('reduxStore')
    onCountChanged(newValue: StoreType, _oldValue: StoreType) {
        this.countChanged.dispatch(newValue.counterStore.count);
    }

    computedReflectedAttributes() {
        return {
            count: this.reduxStore.counterStore.count
        }
    }

    decrementCount(){
        store.dispatch(decrement())
    }

    incrementCount(){
        store.dispatch(increment())
    }

    render() {
        return (
            <>
                <AdoptedStyle parentRef={this} id="style">{css}</AdoptedStyle>
                <button id="decrement-count" onpointerup={this.decrementCount}>-</button>
                <span id='count'>{this.reduxStore.counterStore.count}</span>
                <button id="increment-count" onpointerup={this.incrementCount}>+</button>
            </>
        );
    }
}

export default CustomElementWrapper<MyCounterAttributes>()(CounterWithReduxStore);