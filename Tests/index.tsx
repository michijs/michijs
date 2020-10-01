import './Counter/Counter';
export * from './TestElement2/ls-test-element-built-in';

import { AutonomousCustomElement, h, LSCustomElement, HTMLAttributes } from '../src';
import { Attribute } from '../src/LSElement/decorators/PropertyDecorators';
import Counter from './Counter/Counter';

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
    computedReflectedAttributes() {
        return {
            asdf: this.xd2a+'xd',
            tabIndexAasdf: 'asdf'
        }
    }

    render() {
        return (
            <>
                {/* <LsTestElementBuiltIn id="test-built-in"/> */}
                <div id="div">{this.xd2a}</div>
                <Counter count={this.xd2a} onpointerup={() => this.xd2a++} id="test" onallanimationsfinished={(ev) => console.log(ev.detail)}/>
                <svg id="svg" fill="currentColor" preserveAspectRatio="none" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	                <path id="path" d="M9 20C9 17.44 10.87 12.42 13.86 7.25C14.29 6.5 15.08 6 16 6C17.12 6 18 6.88 18 8V20H20V8C20 5.8 18.2 4 16 4C14.34 4 12.9 4.92 12.13 6.25C10.56 8.96 9.61 11.15 9 13.03V6.5C9 5.13 7.87 4 6.5 4C5.13 4 4 5.13 4 6.5C4 7.87 5.13 9 6.5 9C6.67 9 6.84 9 7 8.95V20M6.5 6C6.79 6 7 6.21 7 6.5C7 6.79 6.79 7 6.5 7C6.21 7 6 6.79 6 6.5C6 6.21 6.21 6 6.5 6Z" />
	            </svg>
                {/* <my-counter id="counter" oncountchanged={(ev) => console.log(`New count value: ${ev.detail}`)}></my-counter> */}
                {/* <button style={this.xd2a > 70 ? { backgroundColor: 'red' } : { color: 'blue' }} class={this.xd2a > 70 && this.xd2a < 75 ? 'asdf' : undefined} onclick={() => this.xd2a++} is="ls-test-element-built-in" id="button">
                    <div id="test">{this.xd2a}</div>
                    <div id="2test">{this.xd2a + 1}</div>
                </button>
                <svg id="svg" fill="currentColor" preserveAspectRatio="none" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path id="path" d={'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z'} />
                </svg> */}
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