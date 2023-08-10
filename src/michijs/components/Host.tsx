import type { HTMLElements } from "@michijs/htmltype";
import type { AnyObject, FC } from "../types";
import { setAttributes } from "../DOM/attributes/setAttributes";

type HostProps = HTMLElements["div"] & AnyObject;

/**Allows to set attributes and event listeners to the host element itself. */
export const Host: FC<HostProps> = ({ children, ...attrs }, options) => {
  if (attrs && options?.contextElement)
    setAttributes(options.contextElement, attrs, options);
  return children;
};
