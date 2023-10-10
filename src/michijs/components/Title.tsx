import { FC } from "../types";
import { GenericElement } from "./GenericElement";

export interface TitleProps {
  children: string
}
/**
 * Title component for dynamically updating the document's title.
 */
export const Title: FC<TitleProps> = ({ children }) => (
  <GenericElement
    onconnected={async () => {
      if (children) document.title = children;
    }}
  />
)