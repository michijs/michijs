export * from './TestElement/TestElement';

import { AutonomousCustomElement, h, LSCustomElement, HTMLAttributes } from '..';
import { Property } from '../LSElement/decorators/PropertyDecorators';

@AutonomousCustomElement()
export class LsRootTestElement extends HTMLElement implements LSCustomElement {

	// @Child('test') element: HTMLElement;

    @Property() xd2 = 35;

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
    			
    			<ls-test-element id="test" xd2={this.xd2} onAllAnimationsFinished={(ev) => console.log(ev.detail)}></ls-test-element>
    			<ls-test-element id="test2" xd2={this.xd2} onAllAnimationsFinished={(ev) => console.log(ev.detail)}></ls-test-element>
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