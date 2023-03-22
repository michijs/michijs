import { createCustomElement } from '../customElements/createCustomElement';
import { h } from '.';
import {
  ClassJSXElement,
  FC,
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from '../types';
import { Fragment } from '../components/FragmentAndList';

jest.mock('../customElements/createCustomElement', () => ({
  createCustomElement: (tag: string) => ({ tag }),
}));

const testChild = 'child';
const testAttrs = {
  id: 'testID',
  _: { className: 'textClassName' },
  children: [testChild],
};
const fragmentResult: FragmentJSXElement = {
  tag: Fragment.tag,
  attrs: {
    children: [],
  },
};
const objectJSXResult: ObjectJSXElement = {
  tag: 'div',
  attrs: testAttrs,
};

const DivProxy: FC<JSX.IntrinsicElements['div']> = (attrs) => (
  <div {...attrs} />
);
const FunctionJSXResult: FunctionJSXElement = {
  tag: DivProxy,
  attrs: testAttrs,
};

const TestCustomElement = createCustomElement('michi-test', {
  // dumb attribute to avoid ts issues
  render() {},
});
// : ClassJSXElement
const ClassJSXResult = {
  tag: TestCustomElement,
  attrs: testAttrs,
};

describe('h tests', () => {
  it('Fragment result', () => {
    const fragment = (<Fragment />) as ClassJSXElement;
    expect(fragment.tag.tag).toEqual(fragmentResult.tag);
  });
  it('Object JSX result', () => {
    expect(<div {...testAttrs}>{testChild}</div>).toEqual(objectJSXResult);
  });
  it('Function JSX result', () => {
    expect(<DivProxy {...testAttrs}>{testChild}</DivProxy>).toEqual(
      FunctionJSXResult,
    );
  });
  it('Class JSX result', () => {
    // TODO:
    expect(
      <TestCustomElement {...testAttrs}>{testChild}</TestCustomElement>,
    ).toEqual(ClassJSXResult);
  });
});
