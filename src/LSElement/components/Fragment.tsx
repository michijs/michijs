import { FC, IterableAttrs } from '../types';

export const Fragment: FC<IterableAttrs> = (attrs) => {
  return { tag: undefined, attrs };
};