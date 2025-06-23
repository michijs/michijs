import type { HTMLElements } from "../generated/htmlType";
import type { AnyObject, FC } from "../types";

type HostProps = HTMLElements["div"] & AnyObject;

/**Allows to set attributes and event listeners to the host element itself. */
export const Host: FC<HostProps> = ({ children, ...attrs }, factory) => {
  if (attrs && factory.contextElement)
    factory.setProperties(factory.contextElement, attrs);
  return children;
};
