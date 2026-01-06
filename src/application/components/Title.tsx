import { useTitle } from "../hooks/useTitle";
import { useWatch } from "../hooks/useWatch";
import type { FC, ObservableOrConst } from "../../shared/types/types";
import { unproxify } from "../../shared/utils/unproxify";
import { GenericElement } from "./GenericElement";

export interface TitleProps {
  children: ObservableOrConst<string | undefined>;
}

const title = useTitle();
/**
 * Title component for dynamically updating the document's title.
 */
export const Title: FC<TitleProps> = ({ children }) => {
  let el: HTMLElement | undefined;

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
