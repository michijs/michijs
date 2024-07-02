import { useTitle } from "../hooks";
import { bindObservableToRef } from "../utils";
import { GenericElement } from "./GenericElement";

/**
 * @typedef {import('../types').FC} FC
 * @typedef {import('../types').ObservableOrConst} ObservableOrConst
 */





/**
 * @typedef {object} TitleProps
 * @property {ObservableOrConst<string | undefined>} children
 */

const title = useTitle();
/**
 * Title component for dynamically updating the document's title.
 * @returns {*}
 */
export const Title = ({ children }) => {
    let el = undefined;

    // bindObservable(children, updateTitleCallback)
    return (<GenericElement onelementconnected={async (elEvent) => {
            el = elEvent.detail;

            bindObservableToRef(children, new WeakRef(el), (newValue) => {
                if (el?.isConnected && newValue)
                    title(newValue);
            });
        }}/>);
};
