import type { ObservableNonNullablePrimitiveType } from "../../types";
import { bindObservableToRef } from "../../utils";
import { updateTextCallback } from "../callbacks/updateTextCallback";

export const updateObservableTextElement = (
  clonedNode: Text,
  // This has a lot of performance improvement for some reason
  jsx: ObservableNonNullablePrimitiveType
): void => {
  // Updates text as soon as binded
  bindObservableToRef(
    jsx,
    clonedNode,
    updateTextCallback
  );
};
