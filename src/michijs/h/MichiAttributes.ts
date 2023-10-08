import { PickWritable } from "../types";

// export type ElementInterfaceAttributes<E extends object> = {
//   [K in StringKeyOf<PickWritable<E>> as `_${K}`]?: E[K];
// };

export interface MichiAttributes<E> {
  children?: JSX.Element;
  _?: Partial<PickWritable<E>>;
}
