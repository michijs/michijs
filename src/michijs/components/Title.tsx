import { createFunctionalComponent } from "../customElements";
import { GenericElement } from "./GenericElement";

export interface TitleProps {
  children: string | undefined;
}
/**
 * Title component for dynamically updating the document's title.
 */
export const Title = createFunctionalComponent<TitleProps>(({ children }) => {
  let el: HTMLElement | undefined = undefined;
  const updateTitleCallback = (newValue?: string) => {
    if (el?.isConnected && newValue) document.title = newValue;
  };

  // bindObservable(children, updateTitleCallback)
  return (
    <GenericElement
      onelementconnected={async (elEvent) => {
        el = elEvent.detail;
        updateTitleCallback(children);
      }}
    />
  );
});
