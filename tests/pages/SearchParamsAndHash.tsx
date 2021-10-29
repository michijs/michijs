import { h } from 'src';
import { SimpleCounter } from 'tests/SimpleCounterTest';
import { components } from '../routes';

export const SearchParamsAndHash = components.searchParamsAndHash(({ searchParams, hash }) => {
  return (
    <>
      <button id="hash-test" onclick={() => { hash['#hashTest'] = !hash['#hashTest']; }}>{`hash test is ${hash['#hashTest']}`}</button>
      <SimpleCounter id="counter-test" count={searchParams.counterParam} oncountchanged={(newValue) => { searchParams.counterParam = newValue.detail; }} />
      <div id="text-test">{searchParams.textParam}</div>
    </>
  );
});
