import { IterableAttrs } from '../h/tags/LSAttributes';
import { FC } from '../types';

export const Fragment: FC<IterableAttrs> = (attrs) => {
  return { tag: undefined, attrs };
};