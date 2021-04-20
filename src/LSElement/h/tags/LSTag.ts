import type { GlobalAttributes } from '@lsegurado/htmltype/Attributes';
import type { LSAttributes } from './LSAttributes';

export type LSTag<T extends { id?: string } = GlobalAttributes, E extends Element = HTMLElement> = Exclude<T, 'id'> &
    LSAttributes<E> &
    Required<Pick<T, 'id'>>;
