import { Title } from "@michijs/michijs";
import { AsyncTestsRouter, asyncTestsUrls, urls } from "../routes";

const AsyncTests = () => (
  <>
    <Title>Async tests Page</Title>
    <a href={urls["/"]()}>Go back</a>
    <a href={asyncTestsUrls.test1()}>Link to test</a>
    <a href={asyncTestsUrls.test2()}>Link to test 2</a>
    <a href={asyncTestsUrls.test3()}>Link to test 3</a>
    <a href={asyncTestsUrls.test4()}>Link to test 4</a>
    <AsyncTestsRouter />
  </>
);

export default AsyncTests;
