import { Router } from "../components/Router";
import { jsx } from "../h";
import { formatToKebabCase } from "../utils/formatToKebabCase";
import { setSearchParam } from "./utils/setSearchParam";

/**
 * @typedef {import('./types').CreateRouterResult} CreateRouterResult
 * @typedef {import('./types').UrlFunction} UrlFunction
 */



/**
 * @param {string} property
 * @param {UrlFunction} [parentRoute]
 * @returns {UrlFunction}
 */
export const urlFn = (property, parentRoute) => {
    return ({ searchParams, hash } = {}) => {
        const parentRouteURL = parentRoute?.();
        const baseURL = parentRouteURL
            ? `${parentRouteURL.origin}${parentRouteURL.pathname}`
            : location.origin;
        const propertyName = formatToKebabCase(property.startsWith("/") ? property : `/${property}`);
        const url = new URL(`${baseURL}${propertyName}`);
        if (searchParams)
            Object.entries(searchParams).forEach(([name, value]) => setSearchParam(url, name, value));
        if (hash?.valueOf())
            url.hash = hash.valueOf();

        return url;
    };
};

/**
 * @template {Record<string, JSX.Element>} R
 * @param {R} routes
 * @param {UrlFunction} [parentRoute]
 * @returns {CreateRouterResult<R>}
 */
export function createRouter(routes, parentRoute) {
    const urls = new Proxy({}, {
        get(_, property) {
            return urlFn(property, parentRoute);
        },
    });

    const RouterProxy = (props) => jsx(Router, {
        ...props,
        routes,
        parentRoute,
    });

    return [urls, RouterProxy];
}
