export * from './TestElement/TestElement';

import { AutonomousCustomElement, h, LSCustomElement, HTMLAttributes, Child } from '..';

@AutonomousCustomElement()
export class LsRootTestElement extends HTMLElement implements LSCustomElement {

    @Child('test') element: HTMLElement;

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
                <ls-test-element id="test" onAllAnimationsFinished={(ev) => console.log(ev.detail)}></ls-test-element>
            </>
        );
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "ls-root-test-element": {
                xd2?: string;
            } & HTMLAttributes;
        }
    }
}