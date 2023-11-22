import type { FC, ObservableProps } from "../types";
import { HistoryManager } from "../classes";
import { jsx } from "../h";

type LinkProps = ObservableProps<{
  url: URL | string;
}> & JSX.IntrinsicElements["a"];

/**Provides the ability to move around the web page without reloading the page. It uses the same attributes as an anchor tag but also allows the use of URL objects. Uses the HistoryManager.push method. */
export const Link: FC<LinkProps> = ({ url, ...attrs }, options) => {
  const href = typeof url === "object" && "href" in url ? url.href : url;
  return jsx("a", {
    ...attrs,
    href,
    onclick: (e) => {
      e.preventDefault();
      HistoryManager.push(url);
      if (options?.contextElement)
        attrs.onclick?.apply(options.contextElement, [e]);
    },
  });
};
