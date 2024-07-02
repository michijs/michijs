import { HistoryManager } from "../classes";
import { unproxify, wait } from "../utils";
import { GenericElement } from "./GenericElement";

/**
 * @typedef {import('../types').FC} FC
 * @typedef {import('../types').ObservableOrConst} ObservableOrConst
 */





/**
 * @typedef {object} RedirectProps
 * @property {ObservableOrConst<URL | string | (() => URL | string)>} to The target URL or location.
 */

/**
 * Redirect component for navigating to a different URL or location.
 * @returns {*}
 */
export const Redirect = ({ to }) => (<GenericElement onelementconnected={async () => {
        const toValue = unproxify(to);
        await wait(0);
        HistoryManager.push(typeof toValue === "function" ? toValue() : toValue);
    }}/>);
