import type {
  ObservableProxiedSet,
  ObservableProxiedMapPort,
  ObservablePort,
  ObservableProxiedDatePort,
  ObservableProxiedArray,
  ObservableProxiedObject,
  ObservableProxiedPrimitivePort,
  ObservableProxiedComplexObjectPort,
} from "#ports";
import type {
  IsAny,
  GetPrimitiveType,
  GetPrimitiveTypeClass,
  DeepPartialNullable,
} from "#shared";

// Needs to be partial to allow asignation operation

export type ObservableProxyPortHelper<
  Y,
  T = NonNullable<Y>,
> = IsAny<T> extends true
  ? any
  : [Y] extends [ObservablePort<any>]
    ? Y
    : [T] extends [Array<infer V>]
      ? ObservableProxiedArray<V>
      : [T] extends [Promise<infer V>]
        ? ObservableProxiedComplexObjectPort<Promise<V>>
        : [T] extends [(...args: infer A) => infer R]
          ? (...args: A) => ObservableProxyPort<R>
          : [T] extends [Map<infer K, infer V>]
            ? ObservableProxiedMapPort<K, V>
            : [T] extends [Set<infer V>]
              ? ObservableProxiedSet<V>
              : [T] extends [Date]
                ? ObservableProxiedDatePort
                : [T] extends [object]
                  ? // When Y is nullable (T | undefined | null), every nested property is
                    // also potentially undefined, so propagate the nullability down the tree.
                    [Y] extends [T]
                    ? ObservableProxiedObject<Y>
                    : ObservableProxiedObject<DeepPartialNullable<Y>>
                  : ObservableProxiedPrimitivePort<GetPrimitiveType<Y>> &
                      GetPrimitiveTypeClass<T>;

export type ObservableProxyPort<Y> = ObservableProxyPortHelper<Y>;
