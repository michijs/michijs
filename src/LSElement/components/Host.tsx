import { commonElement } from '@lsegurado/htmltype/HTMLElements';
import { setAttributes } from '../render/setAttributes';
import { FC, LSCustomElement } from '../types';
import { h } from '../h';

type HostProps = commonElement & { [attribute: string]: any };

export const Host: FC<HostProps> = (attrs, children, self: LSCustomElement) => {
  if (self) {
    setAttributes(self, self, attrs, self.ls.alreadyRendered);
  }
  return <>{...children}</>;
};