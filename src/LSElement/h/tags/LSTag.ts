import type { LSAttributes } from './LSAttributes';

export type LSTag<T extends { id?: string }, E> = T &
    LSAttributes<E>
