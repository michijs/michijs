import type { TypedUIEvent } from "./TypedUIEvent";
export interface TypedMouseEvent<T> extends TypedUIEvent<T> {
  readonly altKey: boolean;
  readonly button: number;
  readonly buttons: number;
  readonly clientX: number;
  readonly clientY: number;
  readonly ctrlKey: boolean;
  readonly metaKey: boolean;
  readonly movementX: number;
  readonly movementY: number;
  readonly offsetX: number;
  readonly offsetY: number;
  readonly pageX: number;
  readonly pageY: number;
  readonly relatedTarget: EventTarget | null;
  readonly screenX: number;
  readonly screenY: number;
  readonly shiftKey: boolean;
  readonly x: number;
  readonly y: number;
  getModifierState(keyArg: string): boolean;
  /** @deprecated */
  initMouseEvent(
    typeArg: string,
    canBubbleArg: boolean,
    cancelableArg: boolean,
    viewArg: Window,
    detailArg: number,
    screenXArg: number,
    screenYArg: number,
    clientXArg: number,
    clientYArg: number,
    ctrlKeyArg: boolean,
    altKeyArg: boolean,
    shiftKeyArg: boolean,
    metaKeyArg: boolean,
    buttonArg: number,
    relatedTargetArg: EventTarget | null,
  ): void;
}
