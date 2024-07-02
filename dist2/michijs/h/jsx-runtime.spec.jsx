import { createCustomElement } from "../customElements/createCustomElement";
import { Fragment } from "../components/Fragment";
import { jsx } from "./";

/**
 * @typedef {import('../types').FragmentJSXElement} FragmentJSXElement
 * @typedef {import('../types').FunctionJSXElement} FunctionJSXElement
 * @typedef {import('../types').ObjectJSXElement} ObjectJSXElement
 */



const testChild = "child";
const testAttrs = {
    id: "testID",
    _: { className: "textClassName" },
    children: testChild,
};
/**
 * @type {FragmentJSXElement}
 */
const fragmentResult = {
    jsxTag: null,
    attrs: {
        children: [],
    },
};
/**
 * @type {ObjectJSXElement}
 */
const objectJSXResult = {
    jsxTag: "div",
    attrs: testAttrs,
};
/**
 * @type {ObjectJSXElement}
 */
const objectJSXResultWithTwoChildren = {
    jsxTag: "div",
    attrs: { ...testAttrs, children: [testChild, testChild] },
};

/**
 * @param {JSX.IntrinsicElements["div"]} attrs
 * @returns {*}
 */
const DivProxy = (attrs) => <div {...attrs}/>;
/**
 * @type {FunctionJSXElement}
 */
const FunctionJSXResult = {
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
        expect(jsx(objectJSXResult.jsxTag, { ...testAttrs, children: testChild })).toEqual(objectJSXResult);
    });
    it("Function JSX result", () => {
        expect(jsx(DivProxy, { ...testAttrs, children: testChild })).toEqual(FunctionJSXResult);
    });
    it("Class JSX result", () => {
        expect(jsx(TestCustomElement, { ...testAttrs, children: testChild })).toEqual(ClassJSXResult);
    });
    it("Multiple children JSX result", () => {
        expect(jsx(objectJSXResult.jsxTag, {
            ...testAttrs,
            children: [testChild, testChild],
        })).toEqual(objectJSXResultWithTwoChildren);
    });
});
