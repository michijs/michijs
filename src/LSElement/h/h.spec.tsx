import { createCustomElement } from '../..';
import { h } from '.';
import { ClassJSXElement, FC, FragmentJSXElement, FunctionJSXElement, ObjectJSXElement } from '../types';
import { HTMLElements } from './tags/HTMLElements';

const testAttrs = {
  id: 'testID',
  _className: 'textClassName'
};
const testChild = 'child';
const fragmentResult: FragmentJSXElement = {
  tag: undefined,
  attrs: null,
  children: []
};
const objectJSXResult: ObjectJSXElement = {
  tag: 'div',
  attrs: testAttrs,
  children: [testChild],
};

const DivProxy: FC<HTMLElements['div']> = (attrs, children) => <div {...attrs}>{children}</div>;
const FunctionJSXResult: FunctionJSXElement = {
  tag: DivProxy,
  attrs: testAttrs,
  children: [testChild],
};

const TestCustomElement = createCustomElement('ls-test');

const ClassJSXResult: ClassJSXElement = {
  tag: TestCustomElement,
  attrs: testAttrs,
  children: [testChild],
};

describe('h tests', () => {
  it('Fragment result', () => {
    expect(<></>).toEqual(fragmentResult);
  });
  it('Object JSX result', () => {
    expect(<div {...testAttrs}>{testChild}</div>).toEqual(objectJSXResult);
  });
  it('Function JSX result', () => {
    expect(<DivProxy {...testAttrs}>{testChild}</DivProxy>).toEqual(FunctionJSXResult);
  });
  it('Class JSX result', () => {
    expect(<TestCustomElement {...testAttrs}>{testChild}</TestCustomElement>).toEqual(ClassJSXResult);
  });
});