import { createTextNodeContentCallback } from "./createTextNodeContentCallback";

export const updateTextCallback = (newValue: unknown, el: Text, newText: string = createTextNodeContentCallback(newValue)) => (el.nodeValue = newText);
