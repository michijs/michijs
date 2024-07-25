import { createCustomElement } from "../customElements/createCustomElement";
import { Fragment } from "../components/Fragment";
import type {
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../types";
import { jsx } from "./";
import {describe, it, expect} from 'bun:test'

const testChild = "child";
const testAttrs = {
  id: "testID",
  _: { className: "textClassName" },
  children: testChild,
};
const fragmentResult: FragmentJSXElement = {
  jsxTag: null,
  attrs: {
    children: [],
  },
};
const objectJSXResult: ObjectJSXElement = {
  jsxTag: "div",
  attrs: testAttrs,
};
const objectJSXResultWithTwoChildren: ObjectJSXElement = {
  jsxTag: "div",
  attrs: { ...testAttrs, children: [testChild, testChild] },
};

const DivProxy = (attrs: JSX.IntrinsicElements["div"]) => <div {...attrs} />;
const FunctionJSXResult: FunctionJSXElement = {
  jsxTag: DivProxy,
  attrs: testAttrs,
};

const TestCustomElement = createCustomElement("michi-test");

// ClassJSXElement
const ClassJSXResult = {
  jsxTag: TestCustomElement,
  attrs: testAttrs,
};

describe("jsx-runtime tests", () => {
  it("Fragment result", () => {
    const fragment = jsx(Fragment, { children: undefined });
    expect(fragment.jsxTag).toEqual(fragmentResult.jsxTag);
  });
  it("Object JSX result", () => {
    expect(
      jsx(objectJSXResult.jsxTag, { ...testAttrs, children: testChild }),
    ).toEqual(objectJSXResult);
  });
  it("Function JSX result", () => {
    expect(jsx(DivProxy, { ...testAttrs, children: testChild })).toEqual(
      FunctionJSXResult,
    );
  });
  it("Class JSX result", () => {
    expect(
      jsx(TestCustomElement, { ...testAttrs, children: testChild }),
    ).toEqual(ClassJSXResult);
  });
  it("Multiple children JSX result", () => {
    expect(
      jsx(objectJSXResult.jsxTag, {
        ...testAttrs,
        children: [testChild, testChild],
      }),
    ).toEqual(objectJSXResultWithTwoChildren);
  });
});
