import type { commonElement } from '@lsegurado/htmltype/HTMLElements';
import { AttributeManager } from '../classes/AttributeManager';
import type { FC } from '../types';
import { h } from '../h';

type HostProps = commonElement & { [propertyName: string]: any };

export const Host: FC<HostProps> = (attrs, children, self) => {
  if (attrs && self) {
    AttributeManager.setAttributes(self, self, attrs, self.ls.alreadyRendered);
  }
  return <>{children}</>;
};