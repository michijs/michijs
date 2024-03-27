import { Link, Title } from "@michijs/michijs";
import { AsyncTestsRouter, asyncTestsUrls, urls } from "../routes";

const AsyncTests = () => (
  <>
    <Title>Async tests Page</Title>
    <Link url={urls["/"]()}>Go back</Link>
    <Link url={asyncTestsUrls.test1()}>Link to test</Link>
    <Link url={asyncTestsUrls.test2()}>Link to test 2</Link>
    <Link url={asyncTestsUrls.test3()}>Link to test 3</Link>
    <AsyncTestsRouter />
  </>
);

export default AsyncTests;
