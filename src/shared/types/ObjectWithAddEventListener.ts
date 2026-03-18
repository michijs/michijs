
export interface ObjectWithAddEventListener<T> {
  addEventListener(key: string, callback: (e: T) => any): any;
}
