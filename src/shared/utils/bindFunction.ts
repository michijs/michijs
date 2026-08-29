export const bindFunction = <T extends Function | undefined>(
  self: Element | null | undefined,
  event: T,
): T => {
  removeBindFunction: {
    return (
      event &&
      (self && !event.toString().startsWith("(") ? event.bind(self) : event)
    );
  }
  // @ts-ignore
  return event;
};
