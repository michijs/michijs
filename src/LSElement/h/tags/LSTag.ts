import { GlobalAttributes } from '../DOM/DOMAttributes/GlobalAttributes';
import { LSAttributes } from './LSAttributes';

export type LSTag<T extends { id?: string } = GlobalAttributes, E extends Element = HTMLElement> = Exclude<T, 'id'> &
    LSAttributes<E> &
    Required<Pick<T, 'id'>>;
