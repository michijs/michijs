import { h } from '../../src';
import { A11YCounterTest } from '../A11YCounterTest';
import { components } from '../routes';

export const A11yTests = components.a11yTests(({ searchParams }) => {
  let counterValue = 5;
  return (
    <>
      <form onsubmit={(e) => { e.preventDefault(); console.log(`Value sent is ${counterValue}`); }}>
        <fieldset disabled={searchParams.disableFieldset}>
          <A11YCounterTest name="counter" count={counterValue} oncountchanged={(e) => counterValue = e.detail} />
        </fieldset>
        <button type="button" onpointerup={() => { searchParams.disableFieldset = !searchParams.disableFieldset; }}>Toggle fieldset</button>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </>
  );
});
