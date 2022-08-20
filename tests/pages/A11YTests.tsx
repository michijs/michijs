import { getFormData, h } from '../../src';
import { A11YCounterTest } from '../A11YCounterTest';
import { components } from '../routes';

interface CustomForm {
  counter: number
}

export const A11yTests = components.a11yTests(({ searchParams }) => (
  <form onsubmit={(e) => {
    e.preventDefault();
    const formData = getFormData<CustomForm>(e);
    console.log(`Value sent is ${formData.counter}`);
  }}>
    <fieldset disabled={searchParams.disableFieldset}>
      <A11YCounterTest name="counter" />
    </fieldset>
    <button type="button" onpointerup={() => { searchParams.disableFieldset = !searchParams.disableFieldset; }}>Toggle fieldset</button>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>
)); 
