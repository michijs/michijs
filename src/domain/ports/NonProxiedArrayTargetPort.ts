
export interface NonProxiedArrayTargetPort<V, E> {
  create(item: V): E

  $clear(): void

  $replace(items: V[]): void

  $remove(index: number): void
  push(items: V[]): void
  $swap(indexA: number, indexB: number): void
}