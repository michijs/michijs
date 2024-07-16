import { useTitle, useWatch } from "../hooks";
import type { FC, ObservableOrConst } from "../types";
import { unproxify } from "../utils";
import { GenericElement } from "./GenericElement";

export interface TitleProps {
  children: ObservableOrConst<string | undefined>;
}

const title = useTitle();
/**
 * Title component for dynamically updating the document's title.
 */
export const Title: FC<TitleProps> = ({ children }) => {
  let el: HTMLElement | undefined = undefined;

  const updateTitleCallback = () => {
    const newValue = unproxify(children);
    if (el?.isConnected && newValue) title(newValue);
  };

  return (
    <GenericElement
      onelementconnected={(elEvent) => {
        el = elEvent.detail;
        updateTitleCallback();
      }}
      onelementmounted={() => {
        useWatch(updateTitleCallback, [children]);
      }}
    />
  );
};
