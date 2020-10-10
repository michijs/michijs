import './Counter/Counter';
export * from './TestElement2/ls-test-element-built-in';

import { AutonomousCustomElement, h, LSCustomElement, HTMLAttributes } from '../src';
import { Attribute } from '../src/LSElement/decorators/PropertyDecorators';
import Counter from './Counter/Counter';

const Hola = (props) => <div id="hola">functional {props?.test ? [{a: 1},{b: 2}] : <h1 id="newTest">hola</h1>} </div>;

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
                <Hola test={this.xd2a > 66 ? 'test': undefined} />
                <div id="div" onpointerup={() => this.xd2a++}>{this.xd2a}</div>
                <Counter id="test"/>
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