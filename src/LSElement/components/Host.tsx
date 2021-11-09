import type { commonElement } from '@lsegurado/htmltype/HTMLElements';
import { AttributeManager } from '../classes/AttributeManager';
import type { FC, ObjectJSXElement } from '../types';
import { h } from '../h';
import { Fragment } from '.';

type HostProps = commonElement & { [propertyName: string]: any };

/**Allows to set attributes and event listeners to the host element itself. */
export const Host: FC<HostProps> = ({children, ...attrs}, self) => {
  if (attrs && self) {
    AttributeManager.setAttributes(self, self, attrs as ObjectJSXElement['attrs'], self.ls.alreadyRendered);
  }
  return <Fragment children={children} />;
};