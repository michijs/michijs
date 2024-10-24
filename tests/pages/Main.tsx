import { Title } from "@michijs/michijs";
import { urls } from "../routes";

export const Main = () => (
  <>
    <Title>Main Page</Title>
    <a href={urls.counterTests()}>Counter tests</a>
    <a href={urls.asyncTests()}>Async tests</a>
    <a href={urls.performanceTests()}>Performance tests</a>
    <a href={urls.i18nTests()}>I18n tests</a>
    <a href={urls.a11yTests()}>A11Y tests</a>
    <a
      href={urls.searchParamsAndHash({
        searchParams: {
          counterParam: 0,
          textParam: "initial text",
          complexObjectParam: { simpleObject: { test: 1234 } },
        },
        hash: "#hashTest",
      })}
    >
      Search params and hash tests
    </a>
    <a href={"https://www.google.com"}>External link</a>
  </>
);
