import type { HTMLElements } from '@lsegurado/htmltype';
import type { AnyObject, FC } from '../types';
import { h } from '../h';
import { Fragment } from '.';
import { setAttributes } from '../DOM/attributes/setAttributes';

type HostProps = HTMLElements.commonElement & AnyObject;

/**Allows to set attributes and event listeners to the host element itself. */
export const Host: FC<HostProps> = ({ children, ...attrs }, self) => {
  if (attrs && self)
    setAttributes(self, attrs, self);
  return <Fragment children={children} />;
};