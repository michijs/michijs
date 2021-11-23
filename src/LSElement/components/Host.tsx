import type { HTMLElements } from '@lsegurado/htmltype';
import type { AnyObject, FC } from '../types';
import { h } from '../h';
import { Fragment } from '.';
import { setAttributes } from '../DOM/attributes/setAttributes';

type HostProps = HTMLElements.commonElement & AnyObject;

/**Allows to set attributes and event listeners to the host element itself. */
export const Host: FC<HostProps> = ({children, ...attrs}, self) => {
  if (attrs && self) {
    setAttributes({
      target: self,
      newAttributes: attrs,
      oldAttributes: self.ls.hostAttrs,
      self,
      events: self.ls.events
    });
    self.ls.hostAttrs = attrs;
  }
  return <Fragment children={children} />;
};