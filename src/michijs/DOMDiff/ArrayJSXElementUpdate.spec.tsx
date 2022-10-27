import { h } from '../h';
import { update } from './update';

describe('Array JSX Element Update', () => {

  const items = ['0', '1', '2', '3'];
  const testResultElement = document.createElement('div');
  const testResultElementContent = document.createTextNode('0');
  testResultElement.append(testResultElementContent);
  const testResultElement1 = testResultElement.cloneNode(true);
  testResultElement1.childNodes[0].textContent = '1';
  const testResultElement2 = testResultElement.cloneNode(true);
  testResultElement2.childNodes[0].textContent = '2';
  const testResultElement3 = testResultElement.cloneNode(true);
  testResultElement3.childNodes[0].textContent = '3';
  const testResult = document.createElement('michi-list');
  testResult.append(testResultElement, testResultElement1, testResultElement2, testResultElement3);
  const testElement = document.createElement('michi-list');
  //   let testElementChild;
  //   const util = {
  //     onCreatedCallback: (el) => {
  //       testElementChild = el;
  //     }
  //   };
  const spyRemoveNode = jest.spyOn(Element.prototype, 'remove');
  const spyCloneNode = jest.spyOn(Node.prototype, 'cloneNode');
  const spyCreateElement = jest.spyOn(Document.prototype, 'createElement');
  //   const spyRemoveAttribute = jest.spyOn(testElement, 'removeAttribute');
  //   const spyId = jest.spyOn(testElement, 'id', 'set');
  //   const spyOnCreated = jest.spyOn(util, 'onCreatedCallback');

  describe('Updating with an array', () => {
    beforeAll(() => {
      update(testElement, (
        items.map(x => <div key={x}>{x}</div>)
      ));
    });
    it('must create element 1 time', () => {
      expect(spyCreateElement).toBeCalledTimes(1);
    });
    it('must clone 4 times', () => {
      expect(spyCloneNode).toBeCalledTimes(4);
    });
    it('must remove 0 nodes', () => {
      expect(spyRemoveNode).toBeCalledTimes(0);
    });
    it('must match jsx', () => {
      expect(testElement).toEqual(testResult);
    });
  });
  describe('Reverting the array', () => {
    beforeAll(() => {
      testResult.append(...Array.from(testResult.childNodes).reverse());
      spyRemoveNode.mockClear();
      spyCreateElement.mockClear();
      spyCloneNode.mockClear();
      update(testElement, (
        items.reverse().map(x => <div key={x}>{x}</div>)
      ));
    });
    it('must create element 0 times', () => {
      expect(spyCreateElement).toBeCalledTimes(0);
    });
    it('must clone 0 times', () => {
      expect(spyCloneNode).toBeCalledTimes(0);
    });
    it('must remove 0 nodes', () => {
      expect(spyRemoveNode).toBeCalledTimes(0);
    });
    it('must match jsx', () => {
      expect(testElement).toEqual(testResult);
    });
  });
  describe('Swapping two elements on the array', () => {
    beforeAll(() => {
      [items[0], items[3]] = [items[3], items[0]];
      testResult.append(testResult.childNodes.item(3), testResult.childNodes.item(1), testResult.childNodes.item(2), testResult.childNodes.item(0));
      spyRemoveNode.mockClear();
      spyCreateElement.mockClear();
      spyCloneNode.mockClear();
      update(testElement, (
        items.map(x => <div key={x}>{x}</div>)
      ));
    });
    it('must create element 0 times', () => {
      expect(spyCreateElement).toBeCalledTimes(0);
    });
    it('must clone 0 times', () => {
      expect(spyCloneNode).toBeCalledTimes(0);
    });
    it('must remove 0 nodes', () => {
      expect(spyRemoveNode).toBeCalledTimes(0);
    });
    it('must match jsx', () => {
      expect(testElement).toEqual(testResult);
    });
  });
  describe('Removing two elements on the array', () => {
    beforeAll(() => {
      items.pop();
      items.shift();
      testResult.childNodes.item(3).remove();
      testResult.childNodes.item(0).remove();
      spyRemoveNode.mockClear();
      spyCreateElement.mockClear();
      spyCloneNode.mockClear();
      update(testElement, (
        items.map(x => <div key={x}>{x}</div>)
      ));
    });
    it('must create element 0 times', () => {
      expect(spyCreateElement).toBeCalledTimes(0);
    });
    it('must clone 0 times', () => {
      expect(spyCloneNode).toBeCalledTimes(0);
    });
    it('must remove 2 nodes', () => {
      expect(spyRemoveNode).toBeCalledTimes(2);
    });
    it('must match jsx', () => {
      expect(testElement).toEqual(testResult);
    });
  });
});