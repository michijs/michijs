import { h, Link } from '../../src';
import { urls } from '../routes';

export const Main = () => (
  <>
    <Link url={urls.counterTests()}>Counter tests</Link>
    <Link url={urls.asyncTests()}>Async tests</Link>
    <Link url={urls.performanceTests()}>Performance tests</Link>
    <Link url={urls.searchParamsAndHash({searchParams: { counterParam: 0, textParam: 'initial text', complexObjectParam: { simpleObject: { test: 1234 } } }, hash: '#hashTest'})}>Search params and hash tests</Link>
  </>
);