import { useTitle } from "../hooks";
import type { FC, ObservableOrConst } from "../types";
import { bindObservableToRef } from "../utils";
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

  // bindObservable(children, updateTitleCallback)
  return (
    <GenericElement
      onelementconnected={async (elEvent) => {
        el = elEvent.detail;

        bindObservableToRef(children, new WeakRef(el), (newValue?: string) => {
          if (el?.isConnected && newValue) title(newValue);
        });
      }}
    />
  );
};
