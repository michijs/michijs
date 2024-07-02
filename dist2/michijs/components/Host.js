import { setProperties } from "../DOM/attributes/setProperties";

/**
 * @typedef {import('../generated/htmlType').HTMLElements} HTMLElements
 */

/**
 * @typedef {import('../types').AnyObject} AnyObject
 * @typedef {import('../types').FC} FC
 */

/**
 * @typedef {HTMLElements["div"] & AnyObject} HostProps
 */

/**
 * Allows to set attributes and event listeners to the host element itself.
 * @returns {*}
 */
export const Host = ({ children, ...attrs }, options) => {
  if (attrs && options?.contextElement)
    setProperties(options.contextElement, attrs, options);
  return children;
};
