export * from './TestElement/TestElement';
import './Counter/Counter';
export * from './TestElement2/ls-test-element-built-in';

import { AutonomousCustomElement, h, LSCustomElement, HTMLAttributes } from '../src';
import { Attribute } from '../src/LSElement/decorators/PropertyDecorators';

@AutonomousCustomElement()
export class LsRootTestElement extends HTMLElement implements LSCustomElement {

    // @Child('test') element: HTMLElement;

    @Attribute() xd2 = 35;

    componentWillMount() {
        // this.element.addEventListener('allanimationsfinished', function (e: CustomEvent) {
        //     // console.log(e.detail);
        // }, false);
    }

    // styles() {
    //     return [
    //     ]
    // }

    render() {
        return (
            <>
                <my-counter id="counter" onCountChanged={(ev) => console.log(`New count value: ${ev.detail}`)}></my-counter>
                <ls-test-element id="test" xd2={this.xd2} onAllAnimationsFinished={(ev) => console.log(ev.detail)}><div id="div">{this.xd2}</div></ls-test-element>
                <ls-test-element id="test2" xd2={this.xd2} onAllAnimationsFinished={(ev) => console.log(ev.detail)}></ls-test-element>

                <button id="button" xd2={this.xd2} is="ls-test-element-built-in"></button>
            </>
        );
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ls-root-test-element': {
                xd2?: string;
            } & HTMLAttributes;
        }
    }
}