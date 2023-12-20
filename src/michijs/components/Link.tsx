import type { FC } from "../types";
import { h } from "../h";
import { goTo } from "../routing";

type LinkProps = {
  state?: any;
  title?: string;
  url: URL | string | (() => URL | string);
} & JSX.IntrinsicElements["a"];

/**Provides the ability to move around the web page without reloading the page. It uses the same attributes as an anchor tag but also allows the use of URL objects. Uses the goTo method. */
export const Link: FC<LinkProps> = (
  { state = {}, title = document.title, url, ...attrs },
  self,
) => {
  const finalUrl = typeof url === "function" ? url() : url;
  const href = typeof finalUrl === "string" ? finalUrl : finalUrl.href;
  return (
    <a
      {...attrs}
      href={href}
      onclick={(e) => {
        try {
          e.preventDefault();
          goTo(finalUrl);
          attrs.onclick?.apply(self, [e]);
        } catch {
          window.location.href = href;
        }
      }}
    />
  );
};
