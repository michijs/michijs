import { useCssVariables } from "../css/useCssVariables";
import { create } from "../DOM/create/create";
import { useObserve } from "../hooks/useObserve";
import { If } from "./If";
import { describe, it, expect, spyOn, beforeEach, type Mock } from "bun:test";

function jsIfTests(enableCache: boolean) {
  const observable = useObserve<boolean | undefined | 1>(true);
  let replaceChildren: Mock<any>;

  const nodeReturn = create(
    If(
      observable,
      [
        [true, () => "True"],
        [undefined, () => "Undefined"],
      ],
      () => "False",
      {
        as: "div",
        enableCache,
      },
    ),
  ) as ParentNode;
  const TrueNode = nodeReturn.childNodes[0];

  beforeEach(() => {
    replaceChildren?.mockRestore();
    replaceChildren = spyOn(nodeReturn, "replaceChildren");
  });

  it("should return the expected value", () => {
    expect(nodeReturn.textContent).toBe("True");
  });
  it("if the value mutates, the content should mutate too", () => {
    observable(undefined);
    expect(nodeReturn.textContent).toBe("Undefined");
    expect(replaceChildren).toBeCalledTimes(1);
  });
  it("if the value is not listed on the conditions it should return the else value", () => {
    observable(false);
    expect(nodeReturn.textContent).toBe("False");
    expect(replaceChildren).toBeCalledTimes(1);
  });
  it("if the value evaluates 'else' but the new value is not listed it should not rerender", () => {
    observable(1);
    expect(nodeReturn.textContent).toBe("False");
    expect(replaceChildren).toBeCalledTimes(0);
  });
  it("caché should work properly", () => {
    observable(true);
    expect(nodeReturn.childNodes[0] === TrueNode).toBe(enableCache);
  });
}

describe("If", () => {
  describe("When the condition is a css variable", () => {
    const cssVariables = useCssVariables<{ rotation: string }>();
    const cssIfReturn = If(
      cssVariables.rotation,
      [
        ["180deg", "red"],
        ["360deg", "green"],
      ],
      "blue",
    );

    it("should return the expected string", () => {
      expect(cssIfReturn).toBe(
        `if(style(--rotation:180deg):red;style(--rotation:360deg):green;else:blue)`,
      );
    });
  });
  describe("When the condition is an observable", () => {
    describe("When caché is enabled", () => {
      jsIfTests(true);
    });
    describe("When caché is disabled", () => {
      jsIfTests(false);
    });
  });
});
