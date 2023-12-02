import { useSearchParams, useHash, useComputedObserve, Title } from "@michijs/michijs";
import { SimpleCounter } from "../SimpleCounter";

const SearchParamsAndHash = () => {
  const searchParams = useSearchParams<{
    counterParam: number;
    textParam: string;
  }>();
  const hash = useHash<"#hashTest">();
  const hashTestText = useComputedObserve(() => {
    return `hash test is ${hash["#hashTest"].toBoolean()}`;
  }, [hash]);

  return (
    <>
      <Title>Search params and hash tests</Title>
      <button
        onclick={() => {
          hash["#hashTest"](hash["#hashTest"].not());
          console.log(hash);
        }}
      >
        {hashTestText}
      </button>
      <SimpleCounter
        count={searchParams.counterParam}
        oncountchanged={(newValue) => {
          searchParams.counterParam(newValue.detail);
        }}
      />
      <div>{searchParams.textParam}</div>
    </>
  );
};

export default SearchParamsAndHash;
