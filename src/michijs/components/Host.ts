import type { HTMLElements } from "../generated/htmlType";
import type { AnyObject, FC } from "../types";
import { setProperties } from "../DOM/attributes/setProperties";

type HostProps = HTMLElements["div"] & AnyObject;

/**Allows to set attributes and event listeners to the host element itself. */
export const Host: FC<HostProps> = ({ children, ...attrs }, contextElement) => {
  if (attrs && contextElement)
    setProperties(contextElement, attrs, contextElement);
  return children;
};
