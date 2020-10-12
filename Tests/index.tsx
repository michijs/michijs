import './Counter/Counter';
export * from './TestElement2/ls-test-element-built-in';

import { AutonomousCustomElement, h, LSCustomElement, HTMLAttributes } from '../src';
import { Attribute } from '../src/LSElement/decorators/PropertyDecorators';
import Counter from './Counter/Counter';

const Hola = (props) => <div id="hola">functional {props?.test ? [{a: 1},{b: 2}] : <h1 id="newTest">hola</h1>} </div>;


// window.addEventListener("storage", (e) => {console.log('pase',e)}, false);
// localStorage.set

@AutonomousCustomElement()
export class LsRootTestElement extends HTMLElement implements LSCustomElement {

    // @Child('test') element: HTMLElement;

    @Attribute({ reflect: true }) xd2a = 66;
// @Observer()
    test = () => [() => { }, [this.xd2a]];
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
                <Hola test={this.xd2a > 66 ? 'test': undefined} />
                <div id="div" onpointerup={() => this.xd2a++}>{this.xd2a}</div>
                <Counter id="test"/>
                {/* <svg id="svg" fill="currentColor" preserveAspectRatio="none" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	                <path id="path" d={this.xd2a > 66 ? "M9 20C9 17.44 10.87 12.42 13.86 7.25C14.29 6.5 15.08 6 16 6C17.12 6 18 6.88 18 8V20H20V8C20 5.8 18.2 4 16 4C14.34 4 12.9 4.92 12.13 6.25C10.56 8.96 9.61 11.15 9 13.03V6.5C9 5.13 7.87 4 6.5 4C5.13 4 4 5.13 4 6.5C4 7.87 5.13 9 6.5 9C6.67 9 6.84 9 7 8.95V20M6.5 6C6.79 6 7 6.21 7 6.5C7 6.79 6.79 7 6.5 7C6.21 7 6 6.79 6 6.5C6 6.21 6.21 6 6.5 6Z": "M8 3V5H11C12.32 5 13.41 5.83 13.82 7H6V9H14V10H12C9.25 10 7 12.25 7 15C7 17.75 9.25 20 12 20C12.77 20 13.45 19.73 14 19.3V21H16V17H14C13.55 17.62 12.83 18 12 18C10.33 18 9 16.67 9 15C9 13.33 10.33 12 12 12H16V9H18V7H15.9C15.43 4.72 13.41 3 11 3H8Z"} />
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