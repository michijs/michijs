export interface ReactiveArrayPort<V> {
  /**
   * Removes all the list elements
   */
  $clear(): void;
  /**
   * Replace all the list elements
   */
  $replace(...items: V[]): number;
  /**
   * Removes an item
   */
  $remove(index: number): void;
  /**
   * Swaps two items
   */
  $swap(indexA: number, indexB: number): void;
}
