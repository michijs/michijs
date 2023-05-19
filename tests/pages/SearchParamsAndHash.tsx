import { h } from "../../src";
import { SimpleCounter } from "../SimpleCounter";
import { pages } from "../routes";

export const SearchParamsAndHash = pages.searchParamsAndHash(
  ({ searchParams, hash }) => (
    <>
      <button
        onclick={() => {
          hash["#hashTest"] = !hash["#hashTest"];
        }}
      >{`hash test is ${hash["#hashTest"]}`}</button>
      <SimpleCounter
        count={searchParams.counterParam}
        oncountchanged={(newValue) => {
          searchParams.counterParam = newValue.detail;
        }}
      />
      <div>{searchParams.textParam}</div>
    </>
  ),
);
