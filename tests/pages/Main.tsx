import { Link, Title } from "../../src";
import { urls } from "../routes";

export const Main = () => (
  <>
    <Title>Main Page</Title>
    <Link url={urls.counterTests()}>Counter tests</Link>
    <Link url={urls.asyncTests()}>Async tests</Link>
    <Link url={urls.performanceTests()}>Performance tests</Link>
    <Link url={urls.i18nTests()}>I18n tests</Link>
    <Link url={urls.a11yTests()}>A11Y tests</Link>
    <Link
      url={urls.searchParamsAndHash({
        searchParams: {
          counterParam: 0,
          textParam: "initial text",
          complexObjectParam: { simpleObject: { test: 1234 } },
        },
        hash: "#hashTest",
      })}
    >
      Search params and hash tests
    </Link>
    <Link url={"https://www.google.com"}>External link</Link>
  </>
);
