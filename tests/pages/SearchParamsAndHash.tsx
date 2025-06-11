import {
  useSearchParams,
  useHash,
  Title,
} from "@michijs/michijs";
import { SimpleCounter } from "../SimpleCounter";

const SearchParamsAndHash = () => {
  const searchParams = useSearchParams<{
    counterParam: number;
    textParam: string;
  }>();
  const hash = useHash<"#hashTest">();
  const hashTestText = hash["#hashTest"].compute((v) => `hash test is ${Boolean(v)}`);

  return (
    <>
      <Title>Search params and hash tests</Title>
      <button
        onclick={() => {
          // Just to test '#'
          if (hash["#hashTest"]()) hash[""](true);
          else hash["#hashTest"](!hash["#hashTest"]());
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
