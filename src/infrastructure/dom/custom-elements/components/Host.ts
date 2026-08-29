import type { WithChildren } from "../../../platform/types/WithChildren";
import type { HTMLElements } from "../../jsx-runtime/generated/htmlType";
import type { AnyObject } from "#shared";

type HostProps = HTMLElements["div"] & AnyObject;

/**Allows to set attributes and event listeners to the host element itself. */
export const Host = (
  { children, ...attrs }: WithChildren<HostProps>,
  factory,
) => {
  if (attrs && factory.contextElement)
    factory.setProperties(factory.contextElement, attrs);
  return children;
};
