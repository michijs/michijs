import { unproxify } from "../utils";
import { Observable } from "./Observable";

/**
 * @typedef {import('../types').ObservableOrConst} ObservableOrConst
 * @typedef {import('../types').Subscription} Subscription
 */

class HistoryManagerSingleton extends Observable {
    /**
     * @readonly
     * @type {(string | URL)[]}
     */
    history = [location.pathname];

    /**
     * @param {Subscription<string | URL>[]} [initialObservers]
     */
    constructor(initialObservers) {
        super(initialObservers);
        window.addEventListener("popstate", () => this.notify(location.href));
    }

    /**
     * @param {ObservableOrConst<string | URL>} fallbackUrl
     */
    back(fallbackUrl) {
        if (this.history.length > 0) {
            history.back();
            const url = this.history.pop();
            this.notify(url);
            return url;
        }
        return this.replaceCurrentUrl(fallbackUrl);
    }

    /**
     * @param {ObservableOrConst<string | URL>} url
     */
    replaceCurrentUrl(url) {
        const urlValue = unproxify(url);
        try {
            // This will trigger an exception if its an external link string
            history.replaceState(undefined, "", urlValue);
            this.history.splice(this.history.length, 1, urlValue);
        }
        catch (ex) {
            console.error(ex);
            const href = typeof urlValue === "object" && "href" in urlValue
                ? urlValue.href
                : urlValue;
            window.location.href = href;
        }
        this.notify(urlValue);
    }

    /**
     * @param {ObservableOrConst<string | URL>} url
     */
    push(url) {
        const urlValue = unproxify(url);
        try {
            // This will trigger an exception if its an string
            history.pushState(undefined, "", urlValue);
            this.history.push(urlValue);
        }
        catch (ex) {
            console.error(ex);
            const href = typeof urlValue === "object" && "href" in urlValue
                ? urlValue.href
                : urlValue;
            window.location.href = href;
        }
        this.notify(urlValue);
    }

    /**
     * @param {ObservableOrConst<string>} url
     */
    matches(url, flexible = false) {
        const urlValue = unproxify(url);
        if (window.URLPattern) {
            const p = new window.URLPattern({
                pathname: `${urlValue.endsWith("/") ? urlValue.slice(-1, 1) : urlValue}*`,
                baseURL: location.origin,
                search: "*",
                hash: "*",
            });
            return p.test(location.href);
        }
        const urlPaths = urlValue.split("/").filter((x) => x !== "");
        let locationPaths = location.pathname.split("/").filter((x) => x !== "");
        if (flexible) {
            locationPaths = locationPaths.slice(0, urlPaths.length);
        }
        return (locationPaths.length === urlPaths.length &&
            !locationPaths.find((locationPath, index) => !urlPaths[index].startsWith(":") && locationPath !== urlPaths[index]));
    }
}

/**
 * @type {HistoryManagerSingleton}
 */
export const HistoryManager = new HistoryManagerSingleton();
