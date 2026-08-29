export type MutableArrayNewItemsProperties =
  | "push"
  | "unshift"
  | "fill"
  | "splice";
export type MutableMapNewItemsProperties = "set";
export type MutableSetNewDeleteItemsProperties = "add" | "delete";
export type MutableArrayProperties =
  | MutableArrayNewItemsProperties
  | "shift"
  | "reverse"
  | "sort"
  | "pop";

export interface ReadWriteArray<RV, SV>
  extends Pick<Array<RV | SV>, MutableArrayNewItemsProperties>,
    Omit<Array<SV>, MutableArrayNewItemsProperties> {}
export interface ReadWriteMap<K, RV, SV>
  extends Pick<Map<K, RV | SV>, MutableMapNewItemsProperties>,
    Omit<Map<K, SV>, MutableMapNewItemsProperties> {}
export interface ReadWriteSet<RV, SV>
  extends Pick<Set<RV | SV>, MutableSetNewDeleteItemsProperties>,
    Omit<Set<SV>, MutableSetNewDeleteItemsProperties> {}
