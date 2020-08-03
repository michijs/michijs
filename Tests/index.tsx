export * from './TestElement/TestElement';
import './Counter/Counter';
export * from './TestElement2/ls-test-element-built-in';

import { AutonomousCustomElement, h, LSCustomElement, HTMLAttributes } from '../src';
import { Attribute } from '../src/LSElement/decorators/PropertyDecorators';

@AutonomousCustomElement()
export class LsRootTestElement extends HTMLElement implements LSCustomElement {

    // @Child('test') element: HTMLElement;

    @Attribute({ reflect: true }) xd2a = 66;

    // componentDidMount() {
    //     // this.element.addEventListener('allanimationsfinished', function (e: CustomEvent) {
    //     //     // console.log(e.detail);
    //     // }, false);
    //     this.xd2a = 123123;
    // }

    // styles() {
    //     return [
    //     ]
    // }

    render() {
        return (
            <>
                <ls-test-element id="test" xd={this.xd2a} onallanimationsfinished={(ev) => console.log(ev.detail)}><div id="div">{this.xd2a}</div></ls-test-element>
                {/* <my-counter id="counter" oncountchanged={(ev) => console.log(`New count value: ${ev.detail}`)}></my-counter>
                <ls-test-element id="test2" xd2-a={this.xd2} onallanimationsfinished={(ev) => console.log(ev.detail)}></ls-test-element> */}
                <button style={this.xd2a > 70 ? { backgroundColor: 'red' } : { color: 'blue' }} className={this.xd2a > 70 && this.xd2a < 75 ? 'asdf' : undefined} onclick={() => this.xd2a++} is="ls-test-element-built-in" id="button">
                    <div id="test">{this.xd2a}</div>
                    <div id="2test">{this.xd2a + 1}</div>
                </button>
                <svg id="svg" fill="currentColor" preserveAspectRatio="none" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path id="path" d={'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z'} />
                </svg>
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