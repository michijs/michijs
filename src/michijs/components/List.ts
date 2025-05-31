import type { ProxiedArray } from '../classes';
import type { FC, ObservableTypeOrConst } from '../types'
import { isObservable } from '../typeWards/isObservable';

interface ListComponentProps<T> {
  data: ObservableTypeOrConst<T[]>,
  renderItem: FC<T>;
}

export const List = <const T = unknown>
  (
    props: ListComponentProps<T>,
    contextElement?: Element,
    contextNamespace?: string,
  ) => {
  if (isObservable(props.data)) {
    const data = (props.data) as unknown as ProxiedArray<T>;
    return data.List({renderItem: props.renderItem}, contextElement, contextNamespace);
  }
  return (props.data as T[]).map(x => props.renderItem(x, contextElement, contextNamespace))
}