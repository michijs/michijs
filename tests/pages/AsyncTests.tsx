import { h, Link } from '../../src';
import { AsyncTestsRouter, asyncTestsUrls } from '../routes';

export const AsyncTests = () => (
  <>
    <Link url={asyncTestsUrls.test1()} id="link-to-test">Link to test</Link>
    <Link url={asyncTestsUrls.test2()} id="link-to-test-2">Link to test 2</Link>
    <Link url={asyncTestsUrls.test3()} id="link-to-test-3">Link to test 3</Link>
    <AsyncTestsRouter id="async-router" />
  </>
);