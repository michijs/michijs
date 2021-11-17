import { h, ObjectJSXElement } from '../..';
import { LSNode } from './LSNode';

describe('LSNode', () => {
  describe('When is a primitive type', () => {
    let target: string;
    beforeEach(() => {
      target = 'test';
    });
    it('Should return the expected node', () => {
      const result = document.createTextNode(target);
      expect(LSNode(target).el).toEqual(result);
    });
    it('When updating with a primitive type should return an updatedNode', () => {
      const newText = 'test2';
      const result = document.createTextNode(newText);
      const node = LSNode(target);
      expect(node.updateElement(newText).valueOf()).toEqual(result);
    });
    it('When updating with a object type should return an updatedNode', () => {
      const result = document.createElement('div');
      const node = LSNode(target);
      

      expect(node.updateElement(<div />).valueOf()).toEqual(result);
    });
    it('When removing the object should be removed from parent', () => {
      const result = document.createElement('div');
      const node = LSNode(target);
      result.append(node.el);
      node.remove();
      expect(result.hasChildNodes()).toBeFalsy();
    });

  });
  describe('When is a object type', () => {
    let target: (shouldHaveContent: boolean, attributes?: {}) => ObjectJSXElement;
    beforeEach(() => {
      target = (shouldHaveContent, attributes = { id: 'testid' }) => <div {...attributes}>{shouldHaveContent ? <>test1<span>test</span></> : null}</div> as ObjectJSXElement;
    });
    it('Should return the expected node', () => {
      const result = document.createElement('div');
      result.append(document.createComment(''));
      result.append('test1');
      result.setAttribute('id', 'testid');
      const span = document.createElement('span');
      span.append('test');
      result.append(span);

      expect(LSNode(target(true)).valueOf()).toEqual(result);
    });
    it('When updating with a primitive type should return an updatedNode', () => {
      const newText = 'test2';
      const result = document.createTextNode(newText);
      const node = LSNode(target(true));
      

      expect(node.updateElement(newText).valueOf()).toEqual(result);
    });
    it('When changing attributes', () => {
      const result = document.createElement('div');
      result.append(document.createComment(''));
      result.append('test1');
      result.setAttribute('name', 'xd');
      const span = document.createElement('span');
      span.append('test');
      result.append(span);

      const node = LSNode(target(true));

      expect(node.updateElement(target(true, { name: 'xd' })).valueOf()).toEqual(result);
    });
    it('When removing the object should be removed from parent', () => {
      const result = document.createElement('div');
      const node = LSNode(target(true));
      result.append(node.el);
      node.remove();
      expect(result.hasChildNodes()).toBeFalsy();
    });
  });
  // it('Fragment result', () => {
  //   expect(<></>).toEqual(fragmentResult);
  // });
  // it('Object JSX result', () => {
  //   expect(<div {...testAttrs}>{testChild}</div>).toEqual(objectJSXResult);
  // });
  // it('Function JSX result', () => {
  //   expect(<DivProxy {...testAttrs}>{testChild}</DivProxy>).toEqual(FunctionJSXResult);
  // });
  // it('Class JSX result', () => {
  //   expect(<TestCustomElement {...testAttrs}>{testChild}</TestCustomElement>).toEqual(ClassJSXResult);
  // });
});