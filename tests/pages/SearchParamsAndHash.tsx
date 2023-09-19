import { h, useSearchParams, useHash, useComputedObserve } from "../../src";
import { SimpleCounter } from "../SimpleCounter";

const SearchParamsAndHash = () => {
  const searchParams = useSearchParams<{ counterParam: number, textParam: string }>();
  const hash = useHash<'#hashTest'>();
  const hashTestText = useComputedObserve(() => {
    return `hash test is ${!!hash["#hashTest"]?.valueOf()}`
  }, [hash]);

  return (
    <>
      <button
        onclick={() => {
          hash["#hashTest"] = !hash["#hashTest"]?.valueOf();
          console.log(hash)
        }}
      >{hashTestText}</button>
      <SimpleCounter
        count={searchParams.counterParam}
        oncountchanged={(newValue) => {
          searchParams.counterParam = newValue.detail;
        }}
      />
      <div>{searchParams.textParam}</div>
    </>
  )
}

export default SearchParamsAndHash;
