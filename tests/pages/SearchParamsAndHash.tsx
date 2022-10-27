import { h } from '../../src';
import { SimpleCounter } from '../SimpleCounterTest';
import { components } from '../routes';

export const SearchParamsAndHash = components.searchParamsAndHash(({ searchParams, hash }) => (
  <>
    <button onclick={() => { hash['#hashTest'] = !hash['#hashTest']; }}>{`hash test is ${hash['#hashTest']}`}</button>
    <SimpleCounter count={searchParams.counterParam} oncountchanged={(newValue) => { searchParams.counterParam = newValue.detail; }} />
    <div>{searchParams.textParam}</div>
  </>
));
