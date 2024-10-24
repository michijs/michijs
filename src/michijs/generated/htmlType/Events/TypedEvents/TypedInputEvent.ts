import type { TypedUIEvent } from "./TypedUIEvent";
export interface TypedInputEvent<T> extends TypedUIEvent<T> {
  readonly data: string | null;
  readonly dataTransfer: DataTransfer | null;
  readonly inputType: string;
  readonly isComposing: boolean;
  getTargetRanges(): StaticRange[];
}
