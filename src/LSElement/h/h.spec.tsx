import { createCustomElement } from '../..';
import { h } from '.';
import { ClassJSXElement, FC, FragmentJSXElement, FunctionJSXElement, ObjectJSXElement } from '../types';
import { HTMLElements } from './tags/HTMLElements';
import { Fragment } from '../components/Fragment';
import { FragmentTag } from '../constants';

const testChild = 'child';
const testAttrs = {
  id: 'testID',
  _className: 'textClassName',
  children: [testChild]
};
const fragmentResult: FragmentJSXElement = {
  tag: FragmentTag,
  attrs: {
    children: [],
  }
};
const objectJSXResult: ObjectJSXElement = {
  tag: 'div',
  attrs: testAttrs
};

const DivProxy: FC<HTMLElements['div']> = (attrs) => <div {...attrs} />;
const FunctionJSXResult: FunctionJSXElement = {
  tag: DivProxy,
  attrs: testAttrs,
};

const TestCustomElement = createCustomElement('ls-test');

const ClassJSXResult: ClassJSXElement = {
  tag: TestCustomElement,
  attrs: testAttrs,
};

describe('h tests', () => {
  it('Fragment result', () => {
    const fragment = <Fragment /> as FunctionJSXElement;
    expect((fragment.tag(fragment.attrs) as FragmentJSXElement).tag).toEqual(fragmentResult.tag);
    expect((fragment.tag(fragment.attrs) as FragmentJSXElement).attrs.children).toEqual(fragmentResult.attrs.children);
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