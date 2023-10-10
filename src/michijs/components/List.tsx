import { ProxiedArray } from "../classes";
import { ExtendableComponentWithoutChildren, FC } from "../types";

export type ListProps<V, E = FC> = ExtendableComponentWithoutChildren<E> & {
  data: V[]
  renderItem: FC<V>;
}

/**
   * Is a proxy that allows you to avoid using dom diff algorithms to render lists.
   * This allows it to have a performance close to vanilla js.
   * An operation on the data implies an operation on the associated elements.
   */
export function List<V, const E = FC>({ data, ...props }: ListProps<V, E>): JSX.Element {
  if (data instanceof ProxiedArray) {
    const Component = (data as ProxiedArray<V>).List
    // @ts-ignore
    return <Component<E> {...props}/>
  } 
  throw 'Data must be instance of ProxiedArray'
}