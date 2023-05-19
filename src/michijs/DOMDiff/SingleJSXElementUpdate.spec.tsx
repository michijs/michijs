import { h } from "../h";
import { update } from "./update";

const buttonLabel = "test button";
const buttonLabel2 = "test button 2";
const className = "test classname";
const id = "test id";

jest.mock("../components/Router", () => ({}));

describe("Single JSX Element Update", () => {
  const testElement = document.createElement("div");
  let testElementChild;
  const util = {
    onCreatedCallback: (el) => {
      testElementChild = el;
    },
  };
  const spySetAttribute = jest.spyOn(testElement, "setAttribute");
  const spyRemoveAttribute = jest.spyOn(testElement, "removeAttribute");
  const spyId = jest.spyOn(testElement, "id", "set");
  const spyOnCreated = jest.spyOn(util, "onCreatedCallback");

  const testResult = document.createElement("div");
  testResult.id = id;
  testResult.setAttribute("class", className);
  const testResultChild = document.createElement("button");
  testResultChild.setAttribute("hidden", "");
  testResultChild.textContent = buttonLabel;
  testResult.append(testResultChild);
  testResult.append(document.createElement("span"));

  describe("Updating with a jsx", () => {
    beforeAll(() => {
      update(
        testElement,
        <div _={{ id }} class={className}>
          <button hidden $oncreated={util.onCreatedCallback}>
            {buttonLabel}
          </button>
          <span />
        </div>,
      );
    });
    it("must call setAttribute a single time", () => {
      expect(spySetAttribute).toBeCalledTimes(1);
    });
    it("must set id a single time", () => {
      expect(spyId).toBeCalledTimes(1);
    });
    it("must match jsx", () => {
      expect(testElement).toEqual(testResult);
    });
    it("must call oncreated callback", () => {
      expect(spyOnCreated).toBeCalledTimes(1);
      expect(testElementChild).toBeDefined();
    });
  });
  describe("Updating again with same jsx", () => {
    beforeAll(() => {
      update(
        testElement,
        <div _={{ id }} class={className}>
          <button hidden $oncreated={util.onCreatedCallback}>
            {buttonLabel}
          </button>
          <span />
        </div>,
      );
    });
    it("must match jsx", () => {
      expect(testElement).toEqual(testResult);
    });
    it("must not call setAttribute again", () => {
      expect(spySetAttribute).toBeCalledTimes(1);
    });
    it("must not set id again", () => {
      expect(spyId).toBeCalledTimes(1);
    });
    it("must not call again oncreated callback", () => {
      expect(spyOnCreated).toBeCalledTimes(1);
    });
    it("must not create another button instance", () => {
      expect(testElementChild).toBe(testElement.childNodes.item(0));
    });
  });
  describe("Removing every attribute", () => {
    let spyRemoveAttributeChild;
    beforeAll(() => {
      spyRemoveAttributeChild = jest.spyOn(testElementChild, "removeAttribute");
      update(
        testElement,
        <div _={{ id }} class={undefined}>
          <button hidden={false}>{buttonLabel}</button>
          <span />
        </div>,
      );
      testResult.removeAttribute("class");
      // testResult.removeAttribute('id');
      testResultChild.removeAttribute("hidden");
    });
    it("must match jsx", () => {
      expect(testElement).toEqual(testResult);
    });
    it("must call removeAttribute a single time", () => {
      expect(spyRemoveAttribute).toBeCalledTimes(1);
    });
    it("must call removeAttribute a single time on child", () => {
      expect(spyRemoveAttributeChild).toBeCalledTimes(1);
    });
    // it('must set id again', () => {
    //   expect(spyId).toBeCalledTimes(2);
    // });
    it("must not set id again", () => {
      expect(spyId).toBeCalledTimes(1);
    });
    it("must not call again oncreated callback", () => {
      expect(spyOnCreated).toBeCalledTimes(1);
    });
    it("must not create another button instance", () => {
      expect(testElementChild).toBe(testElement.childNodes.item(0));
    });
  });
  describe("Updating a label", () => {
    beforeAll(() => {
      update(
        testElement,
        <div _={{ id }} class={undefined}>
          <button hidden={false}>{buttonLabel2}</button>
          <span />
        </div>,
      );
      testResultChild.textContent = buttonLabel2;
    });
    it("must match jsx", () => {
      expect(testElement).toEqual(testResult);
    });
  });
  describe("Removing a single child", () => {
    beforeAll(() => {
      update(
        testElement,
        <div _={{ id }} class={undefined}>
          {undefined}
          <span />
        </div>,
      );
      // undefined jsx must result on comments to keep the track of positions
      testResultChild.replaceWith(document.createComment(""));
    });
    it("must match jsx", () => {
      expect(testElement).toEqual(testResult);
    });
  });
  describe("Removing every child", () => {
    beforeAll(() => {
      update(testElement, <div _={{ id }} class={undefined} />);
      testResult.textContent = "";
    });
    it("must match jsx", () => {
      expect(testElement).toEqual(testResult);
    });
  });
});
