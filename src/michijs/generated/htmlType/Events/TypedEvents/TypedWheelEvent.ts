import type { TypedMouseEvent } from "./TypedMouseEvent";
export interface TypedWheelEvent<T> extends TypedMouseEvent<T> {
  readonly deltaMode: number;
  readonly deltaX: number;
  readonly deltaY: number;
  readonly deltaZ: number;
  readonly DOM_DELTA_LINE: number;
  readonly DOM_DELTA_PAGE: number;
  readonly DOM_DELTA_PIXEL: number;
}
