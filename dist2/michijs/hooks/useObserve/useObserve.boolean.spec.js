import { useObserve } from "..";

const TRUE_VALUE = useObserve(true);
const FALSE_VALUE = useObserve(false);

describe("Boolean expressions and operators", () => {
    it("should return true for true", () => {
        expect(TRUE_VALUE).toStrictEqual(true);
    });
    it("should return false for false", () => {
        expect(FALSE_VALUE).toStrictEqual(false);
    });
    it("should return true for not false", () => {
        expect(FALSE_VALUE.not?.()).toStrictEqual(true);
    });
    it("should return false for not true", () => {
        expect(TRUE_VALUE.not?.()).toStrictEqual(false);
    });
    it("should return proper type", () => {
        expect(TRUE_VALUE.typeof?.()).toStrictEqual("boolean");
    });
});
