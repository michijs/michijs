/**
 * @typedef {import('../components/Router').Router} Router
 */

/**
 * @typedef {import('../types').CreateFCResult} CreateFCResult
 * @typedef {import('../types').GetElementProps} GetElementProps
 */

/**
 * @typedef {Record<string, unknown> | undefined} SearchParams
 */

/**
 * @typedef {`#${string}` | "" | undefined} Hash
 */

/**
 * @template {SearchParams} [S = SearchParams]
 * @template {Hash} [H = Hash]
 * @typedef {(searchParamsAndHash?: { searchParams?: S; hash?: H; }) => URL} UrlFunction
 */

/**
 * @template {Record<string, JSX.Element>} R
 * @typedef {[ { [k in keyof R]: UrlFunction; }, CreateFCResult< Omit<GetElementProps<typeof Router>, "routes" | "parentRoute"> >, ]} CreateRouterResult
 */
