import { createCustomElement } from "../customElements/createCustomElement";
import { h } from "../h";
import { Fragment } from "../components/FragmentAndList";
import type {
  ClassJSXElement,
  FC,
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../types";
import { jsx } from "./jsx-runtime";
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
  tag: Fragment.tag,
  attrs: {
    children: [],
  },
};
const objectJSXResult: ObjectJSXElement = {
  tag: "div",
  attrs: testAttrs,
};
const objectJSXResultWithTwoChildren: ObjectJSXElement = {
  tag: "div",
  attrs: { ...testAttrs, children: [testChild, testChild] },
};

const DivProxy: FC<JSX.IntrinsicElements["div"]> = (attrs) => (
  <div {...attrs} />
);
const FunctionJSXResult: FunctionJSXElement = {
  tag: DivProxy,
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
    expect(fragment.tag.tag).toEqual(fragmentResult.tag);
  });
  it("Object JSX result", () => {
    expect(
      jsx(
        objectJSXResult.tag,
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
        objectJSXResult.tag,
        { ...testAttrs, children: [testChild, testChild] },
        undefined,
      ),
    ).toEqual(objectJSXResultWithTwoChildren);
  });
});
