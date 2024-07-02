import { isNil } from "../../utils";

/**
 * @param {URL} url
 * @param {string} name
 * @param {?} value
 */
export const setSearchParam = (url, name, value) => {
    const valueOf = value?.valueOf();
    if (isNil(valueOf))
        url.searchParams.delete(name);
    else
        url.searchParams.set(name, typeof valueOf === "object"
            ? JSON.stringify(valueOf)
            : valueOf);
};
