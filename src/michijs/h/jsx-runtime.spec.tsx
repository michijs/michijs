import { createCustomElement } from "../customElements/createCustomElement";
import { Fragment } from "../components/Fragment";
import {
  ClassJSXElement,
  FC,
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../types";
import { jsx } from "./";
jest.mock("../customElements/createCustomElement", () => ({
  createCustomElement: (tag: string) => ({ tag }),
}));

const testChild = "child";
const testAttrs = {
  id: "testID",
  _: { className: "textClassName" },
  children: [testChild],
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

const DivProxy: FC<JSX.IntrinsicElements["div"]> = (attrs) => (
  <div {...attrs} />
);
const FunctionJSXResult: FunctionJSXElement = {
  jsxTag: DivProxy,
  attrs: testAttrs,
};

const TestCustomElement = createCustomElement("michi-test");

// ClassJSXElement
const ClassJSXResult = {
  tag: TestCustomElement,
  attrs: testAttrs,
};

describe("jsx-runtime tests", () => {
  it("Fragment result", () => {
    const fragment = jsx(
      Fragment,
      { children: undefined },
      undefined,
    ) as ClassJSXElement;
    expect(fragment.jsxTag.tag).toEqual(fragmentResult.jsxTag);
  });
  it("Object JSX result", () => {
    expect(
      jsx(
        objectJSXResult.jsxTag,
        { ...testAttrs, children: testChild },
        undefined,
      ),
    ).toEqual(objectJSXResult);
  });
  it("Function JSX result", () => {
    expect(
      jsx(DivProxy, { ...testAttrs, children: testChild }, undefined),
    ).toEqual(FunctionJSXResult);
  });
  it("Class JSX result", () => {
    expect(
      jsx(TestCustomElement, { ...testAttrs, children: testChild }, undefined),
    ).toEqual(ClassJSXResult);
  });
  it("Multiple children JSX result", () => {
    expect(
      jsx(
        objectJSXResult.jsxTag,
        { ...testAttrs, children: [testChild, testChild] },
        undefined,
      ),
    ).toEqual(objectJSXResultWithTwoChildren);
  });
});
