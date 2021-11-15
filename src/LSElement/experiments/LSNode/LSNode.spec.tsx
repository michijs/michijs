// import { h, ObjectJSXElement, PrimitiveType } from '../../..';
// import { createText } from '../../DOM/createText';
// import { LSNode } from './LSNode';

// describe('LSNode', () => {
//   describe('Replace node with', () => {
//     it('Should return the expected node', () => {
//       const node = LSNode(<>
//         <span>{0}</span>
//       </>);
//       const div = document.createElement('div');
//       div.append(node.el);
//       node.updateElement(<>
//         <span>{1}</span>
//       </>);
//       node.updateElement(<>
//         <span>{0}</span>
//       </>);
//       node.updateElement(<>
//         <span>{3}</span>
//       </>);

//       const res = document.createElement('div');
//       const span = document.createElement('span');
//       span.textContent = '3';
//       res.append(span);

//       expect(div).toEqual(res);
//     });

//   });

//   describe('When is a primitive type', () => {
//     let target: PrimitiveType;
//     beforeEach(() => {
//       target = 'test';
//     });
//     it('Should return the expected node', () => {
//       const result = document.createTextNode(createText(target));
//       expect(LSNode(target).el).toEqual(result);
//     });
//     it('When updating with a primitive type should return an updatedNode', () => {
//       const newText = 'test2';
//       const result = document.createTextNode(createText(newText));
//       const node = LSNode(target);
//       node.updateElement(newText);

//       expect(node.el).toEqual(result);
//     });
//     it('When updating with a object type should return an updatedNode', () => {
//       const result = document.createElement('div');
//       const node = LSNode(target);
//       node.updateElement(<div />);

//       expect(node.el).toEqual(result);
//     });
//     it('When removing the object should be removed from parent', () => {
//       const result = document.createElement('div');
//       const node = LSNode(target);
//       result.append(node.el);
//       node.remove();
//       expect(result.hasChildNodes()).toBeFalsy();
//     });

//   });
//   describe('When is a object type', () => {
//     let target: (shouldHaveContent: boolean, attributes?: {}) => ObjectJSXElement;
//     beforeEach(() => {
//       target = (shouldHaveContent, attributes = { id: 'testid' }) => <div {...attributes}>{shouldHaveContent ? <>test1<span>test</span></> : null}</div> as ObjectJSXElement;
//     });
//     it('Should return the expected node', () => {
//       const result = document.createElement('div');
//       result.append('test1');
//       result.setAttribute('id', 'testid');
//       const span = document.createElement('span');
//       span.append('test');
//       result.append(span);

//       expect(LSNode(target(true)).el).toEqual(result);
//     });
//     it('When updating with a primitive type should return an updatedNode', () => {
//       const newText = 'test2';
//       const result = document.createTextNode(createText(newText));
//       const node = LSNode(target(true));
//       node.updateElement(newText);

//       expect(node.el).toEqual(result);
//     });
//     it('When changing attributes', () => {
//       const result = document.createElement('div');
//       result.append('test1');
//       result.setAttribute('name', 'xd');
//       const span = document.createElement('span');
//       span.append('test');
//       result.append(span);

//       const node = LSNode(target(true));

//       node.updateElement(target(true, { name: 'xd' }));

//       expect(node.el).toEqual(result);
//     });
//     it('When removing the object should be removed from parent', () => {
//       const result = document.createElement('div');
//       const node = LSNode(target(true));
//       result.append(node.el);
//       node.remove();
//       expect(result.hasChildNodes()).toBeFalsy();
//     });
//   });
//   // it('Fragment result', () => {
//   //   expect(<></>).toEqual(fragmentResult);
//   // });
//   // it('Object JSX result', () => {
//   //   expect(<div {...testAttrs}>{testChild}</div>).toEqual(objectJSXResult);
//   // });
//   // it('Function JSX result', () => {
//   //   expect(<DivProxy {...testAttrs}>{testChild}</DivProxy>).toEqual(FunctionJSXResult);
//   // });
//   // it('Class JSX result', () => {
//   //   expect(<TestCustomElement {...testAttrs}>{testChild}</TestCustomElement>).toEqual(ClassJSXResult);
//   // });
// });