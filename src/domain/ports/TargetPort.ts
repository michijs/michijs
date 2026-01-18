import type { NonProxiedArrayTargetPort } from "./NonProxiedArrayTargetPort";

export interface TargetPort<V,E> extends NonProxiedArrayTargetPort<V, E> {
  pop(): void

  shift(): void

  insertItemsAt(i: number, items: V[]): void

  prependItems(items: V[]): void

  reverse(): void

  insertChildNodesAt(i: number, ...childNodes: Node[]): void
  splice(start: number, deleteCount: number, items: V[]): void
  fill(value: V, start?: number, end?: number): void
}
