import { HistoryManager } from "../classes";
import { jsx } from "../h";
import { useComputedObserve } from "../hooks";
import { unproxify } from "../utils";

/**
 * @typedef {import('../types').FC} FC
 * @typedef {import('../types').ObservableOrConst} ObservableOrConst
 */

/**
 * @typedef {object} LinkProps
 * @property {ObservableOrConst<URL | string | (() => URL | string)>} url
 */

/**
 * @typedef {JSX.IntrinsicElements["a"]} A
 */

/**
 * Provides the ability to move around the web page without reloading the page. It uses the same attributes as an anchor tag but also allows the use of URL objects. Uses the HistoryManager.push method.
 * @returns {*}
 */
export const Link = ({ url, ...attrs }, options) => {
  const finalUrl = useComputedObserve(() => {
    const unproxifiedUrl = unproxify(url);
    const finalUnproxifiedUrl =
      typeof unproxifiedUrl === "function" ? unproxifiedUrl() : unproxifiedUrl;
    return finalUnproxifiedUrl;
  }, [url]);
  const href = useComputedObserve(() => {
    const unproxifiedUrl = finalUrl();
    return typeof unproxifiedUrl === "object" && "href" in unproxifiedUrl
      ? unproxifiedUrl.href
      : unproxifiedUrl;
  }, [finalUrl]);
  return jsx("a", {
    ...attrs,
    href,
    onclick: (e) => {
      e.preventDefault();
      HistoryManager.push(finalUrl);
      if (options?.contextElement)
        // @ts-ignore
        attrs.onclick?.apply(options.contextElement, [e]);
    },
  });
};
