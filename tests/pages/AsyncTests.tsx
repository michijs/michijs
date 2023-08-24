import { h, Link } from "../../src";
import { AsyncTestsRouter, asyncTestsUrls } from "../routes";

const AsyncTests = () => (
  <>
    <Link url={asyncTestsUrls.test1()}>Link to test</Link>
    <Link url={asyncTestsUrls.test2()}>Link to test 2</Link>
    <Link url={asyncTestsUrls.test3()}>Link to test 3</Link>
    <AsyncTestsRouter />
  </>
)

export default AsyncTests;
