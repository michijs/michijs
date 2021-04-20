import type { commonElement } from '@lsegurado/htmltype/HTMLElements';
import { AttributeManager } from '../classes/AttributeManager';
import type { FC, LSCustomElement } from '../types';
import { h } from '../h';

type HostProps = commonElement & { [attribute: string]: any };

export const Host: FC<HostProps> = (attrs, children, self: LSCustomElement | null) => {
  if (self) {
    AttributeManager.setAttributes(self, self, attrs, self.ls.alreadyRendered);
  }
  return <>{...children}</>;
};