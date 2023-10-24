import { useStringTemplate } from "../hooks";
import { useCssVariables } from "./useCssVariables";

const [cssVariables, defaultValues] = useCssVariables({ test: 'green' });
const stylesheet = useStringTemplate`div{${cssVariables.test}:${defaultValues.test};background:${cssVariables.test.var()}}`

const expectedResult = 'div{--test:green;background:var(--test)}';

describe("css", () => {
  it("should return the expected css variables text", () => {
    expect(stylesheet).toStrictEqual(expectedResult);
  });
});