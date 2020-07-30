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
                <my-counter id="counter" oncountchanged={(ev) => console.log(`New count value: ${ev.detail}`)}></my-counter>
                <ls-test-element id="test" xd2-a={this.xd2} onallanimationsfinished={(ev) => console.log(ev.detail)}><div id="div">{this.xd2}</div></ls-test-element>
                <ls-test-element id="test2" xd2-a={this.xd2} onallanimationsfinished={(ev) => console.log(ev.detail)}></ls-test-element>
                <button is="ls-test-element-built-in" id="button" xd2={this.xd2}></button>
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