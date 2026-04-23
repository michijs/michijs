import type { ObservablePort } from "@ports";

const trackingStack: Set<ObservablePort<any>>[] = [];

export const startTracking = (): void => {
  trackingStack.push(new Set());
};

export const stopTracking = (): Set<ObservablePort<any>> => {
  return trackingStack.pop()!;
};

export const trackAccess = (observable: ObservablePort<any>): void => {
  const current = trackingStack[trackingStack.length - 1];
  if (current) current.add(observable);
};
