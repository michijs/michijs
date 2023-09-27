import { getFormData, h, useSearchParams, Title } from "../../src";
import { A11YCounter } from "../A11YCounter";

interface CustomForm {
  counter: number;
}

const A11yTests = () => {
  const searchParams = useSearchParams<{ disableFieldset: boolean }>();

  return (
    <>
      <Title>A11Y tests Page</Title>
      <form
        onsubmit={(e) => {
          e.preventDefault();
          const formData = getFormData<CustomForm>(e);
          console.log(`Value sent is ${formData.counter}`);
        }}
      >
        <fieldset disabled={searchParams.disableFieldset}>
          <A11YCounter name="counter" />
        </fieldset>
        <button
          type="button"
          onpointerup={() => {
            searchParams.disableFieldset = !searchParams.disableFieldset.valueOf();
          }}
        >
          Toggle fieldset
        </button>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </>
  );
}
export default A11yTests
