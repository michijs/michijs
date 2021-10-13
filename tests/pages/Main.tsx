import { h, Link } from 'src';
import { urls } from '../routes';

export const Main = () => (
  <>
    <Link url={urls.counterTests()} id="counter-tests">Counter tests</Link>
    <Link url={urls.asyncTests()} id="async-tests">Async tests</Link>
    <Link url={urls.performanceTests()} id="performance-tests">Performance tests</Link>
    <Link url={urls.searchParamsAndHash({searchParams: { counterParam: 0, textParam: 'initial text', complexObjectParam: { simpleObject: { test: 1234 } } }, hash: '#hashTest'})} id="search-params-and-hash-tests">Search params and hash tests</Link>
  </>
);