import { createCustomElement, h } from '../..';
import { renderFunctionalComponent } from './renderFunctionalComponent';

const testAttrs = {
  id: 'testID',
  _className: 'textClassName'
};
const testChild1 = 'child1';
const testChild2 = 'child2';

const exampleDiv = document.createElement('div');
exampleDiv.setAttribute('id', testAttrs.id);
exampleDiv.className = testAttrs._className;
const divResult = document.createDocumentFragment();
divResult.append(exampleDiv);
const exampleArray = [1, 2, 3, 4];
const exampleObject = { testProperty: 'test' };

const customElementName = 'ls-test';
const autonomousCustomElementResult = document.createDocumentFragment();
const autonomousCustomElementExample = document.createElement(customElementName);
autonomousCustomElementExample.setAttribute('id', testAttrs.id);
autonomousCustomElementExample.className = testAttrs._className;
autonomousCustomElementExample.append(testChild1);
autonomousCustomElementResult.append(autonomousCustomElementExample);
const customElementName2 = 'ls-test-2';
const elementToExtend = 'button';
const customBuiltInElementResult = document.createDocumentFragment();
const customBuiltInElementExample = document.createElement(elementToExtend, {is: customElementName2});
customBuiltInElementExample.setAttribute('id', testAttrs.id);
customBuiltInElementExample.setAttribute('is', customElementName2);
customBuiltInElementExample.className = testAttrs._className;
customBuiltInElementExample.append(testChild1);
customBuiltInElementResult.append(customBuiltInElementExample);

const AutonomousCustomElement = createCustomElement(customElementName);
const CustomBuiltInElement = createCustomElement({ tag: customElementName2, extends: elementToExtend, class: HTMLButtonElement });

const FunctionalComponent = (attrs, children) => (<div {...attrs}>{children}</div>);

describe('renderFunctionalComponent tests', () => {
  it('Using a fragment should return a document fragment', () => {
    expect(renderFunctionalComponent(<></>)).toEqual(document.createDocumentFragment());
  });
  describe('using any element', () => {
    beforeEach(() => {
      exampleDiv.textContent = '';
    });
    describe('with a primitive value as a child', () => {
      it('(string) should return a string', () => {
        exampleDiv.append(testChild1);
        expect(renderFunctionalComponent(<div {...testAttrs}>{testChild1}</div>)).toEqual(divResult);
      });
      it('(array) should return the values of the array as string', () => {
        exampleArray.forEach(x => exampleDiv.append(x.toString()));
        expect(renderFunctionalComponent(<div {...testAttrs}>{exampleArray}</div>)).toEqual(divResult);
      });
      it('(object) should return the object as string', () => {
        exampleDiv.append(JSON.stringify(exampleObject));
        expect(renderFunctionalComponent(<div {...testAttrs}>{exampleObject}</div>)).toEqual(divResult);
      });
    });
    it('with another element as a child should render the child element', () => {
      exampleDiv.append(exampleDiv.cloneNode());
      expect(renderFunctionalComponent(<div {...testAttrs}><div {...testAttrs} /></div>)).toEqual(divResult);
    });
    it('with another element as a child and a text behind and another in front should render the nodes in the correct order', () => {
      exampleDiv.append(testChild1);
      exampleDiv.append(exampleDiv.cloneNode());
      exampleDiv.append(testChild2);
      expect(renderFunctionalComponent(<div {...testAttrs}>{testChild1}<div {...testAttrs} />{testChild2}</div>)).toEqual(divResult);
    });
  });
  describe('using a autonomous custom element', () => {
    it('should render', () => {
      expect(renderFunctionalComponent(<AutonomousCustomElement {...testAttrs}>{testChild1}</AutonomousCustomElement>)).toEqual(autonomousCustomElementResult);
    });
  });
  describe('using a custom built-in element', () => {
    it('should render', () => {
      expect(renderFunctionalComponent(<CustomBuiltInElement {...testAttrs}>{testChild1}</CustomBuiltInElement>)).toEqual(customBuiltInElementResult);
    });
  });
  describe('using a functional component', () => {
    it('should render', () => {
      exampleDiv.textContent = '';
      exampleDiv.append(testChild1);
      expect(renderFunctionalComponent(<FunctionalComponent {...testAttrs}>{testChild1}</FunctionalComponent>)).toEqual(divResult);
    });
  });
});