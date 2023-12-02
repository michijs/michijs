import type { HTMLElements } from "../generated/htmlType";
import type { AnyObject } from "../types";
import { setProperties } from "../DOM/attributes/setProperties";

type HostProps = HTMLElements["div"] & AnyObject;

/**Allows to set attributes and event listeners to the host element itself. */
export const Host = ({ children, ...attrs }: HostProps, options) => {
  if (attrs && options?.contextElement)
    setProperties(options.contextElement, attrs, options);
  return children;
};
