import { PrimitiveValue } from "../../domain/reactive/PrimitiveValue";
import { container } from "../../shared/di/container";

export function useObserve<T>(initialValue: T): PrimitiveValue<T> {
  return new PrimitiveValue<T>(initialValue);
}

export function useStorage<T>(key: string, initialValue: T): PrimitiveValue<T> {
  const browserAdapter = container.get("browser");
  const storedValue = browserAdapter.localStorage.get(key);

  const observable = new PrimitiveValue<T>(storedValue ?? initialValue);

  // Subscribe to changes and persist to storage
  observable.subscribe((value) => {
    browserAdapter.localStorage.set(key, value);
  });

  return observable;
}

export function useTitle(): PrimitiveValue<string> {
  const browserAdapter = container.get("browser");
  const title = new PrimitiveValue<string>(browserAdapter.document.title);

  title.subscribe((newTitle) => {
    browserAdapter.document.title = newTitle;
  });

  return title;
}
