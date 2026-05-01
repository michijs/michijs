import { useTitle } from "../hooks/useTitle";
import { useWatch, type CallableReactiveOrConst, unproxify } from "#domain";
import { GenericElement } from "../../rendering/components/GenericElement";

export interface TitleProps {
  children: CallableReactiveOrConst<string | undefined>;
}

const title = useTitle();
/**
 * Title component for dynamically updating the document's title.
 */
export const Title = ({ children }: TitleProps) => {
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
