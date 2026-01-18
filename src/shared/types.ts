export type StringKeyOf<T extends object> = Extract<keyof T, string>;

export type SplitIncludingDelimiters<
  Source extends string,
  Delimiter extends string,
> = Source extends ""
  ? []
  : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}`
  ? Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
  ? UsedDelimiter extends Delimiter
  ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}`
  ? [
    ...SplitIncludingDelimiters<FirstPart, Delimiter>,
    UsedDelimiter,
    ...SplitIncludingDelimiters<SecondPart, Delimiter>,
  ]
  : never
  : never
  : never
  : [Source];

type StringPartToDelimiterCase<
  StringPart extends string,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = StringPart extends UsedWordSeparators
  ? Delimiter
  : StringPart extends UsedUpperCaseCharacters
  ? `${Delimiter}${Lowercase<StringPart>}`
  : StringPart;

type StringArrayToDelimiterCase<
  Parts extends any[],
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? `${StringPartToDelimiterCase<
    FirstPart,
    UsedWordSeparators,
    UsedUpperCaseCharacters,
    Delimiter
  >}${StringArrayToDelimiterCase<
    RemainingParts,
    UsedWordSeparators,
    UsedUpperCaseCharacters,
    Delimiter
  >}`
  : "";

export type DelimiterCase<
  Value,
  Delimiter extends string,
> = Value extends string
  ? StringArrayToDelimiterCase<
    SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
    WordSeparators,
    UpperCaseCharacters,
    Delimiter
  >
  : Value;



export type KebabCase<Value> = DelimiterCase<Value, "-">;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

export type CSSVar<T extends string> = <
  V extends undefined | string | number = undefined,
>(
  defaultValue?: V,
) => `var(${KebabCase<T>}${V extends undefined ? "" : `,${V}`})`;
export type CssVariablesObject<
  T extends object | unknown,
  PK extends string = "-",
> = IsAny<T> extends true
  ? any
  : T extends object
  ? {
    [k in StringKeyOf<T>]: CssVariablesObject<T[k], `${PK}-${k}`>;
  }
  : CSSVar<PK> & string;
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? A
  : B;
export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    {
      [Q in P]: T[P];
    },
    {
      -readonly [Q in P]: T[P];
    },
    P
  >;
}[keyof T];
export type PickWritable<E> = Pick<E, WritableKeys<E>>;

export type Typeof =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";
// export type LowerCaseCharacters = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
export type UpperCaseCharacters =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type WordSeparators = "-" | "_" | " ";
export type ArrayWithOneOrMoreElements<T> = [T, ...T[]];



export interface CustomNavigateEvent
  extends Pick<
    NavigateEvent,
    "downloadRequest" | "canIntercept" | "navigationType"
  >,
  Partial<Pick<NavigateEvent, "formData">> { }


export type MutableArrayNewItemsProperties =
  | "push"
  | "unshift"
  | "fill"
  | "splice";
export type MutableMapNewItemsProperties = "set";
export type MutableSetNewDeleteItemsProperties = "add" | "delete";
export type MutableArrayProperties =
  | MutableArrayNewItemsProperties
  | "shift"
  | "reverse"
  | "sort"
  | "pop";

export interface ReadWriteArray<RV, SV>
  extends Pick<Array<RV | SV>, MutableArrayNewItemsProperties>,
  Omit<Array<SV>, MutableArrayNewItemsProperties> { }
export interface ReadWriteMap<K, RV, SV>
  extends Pick<Map<K, RV | SV>, MutableMapNewItemsProperties>,
  Omit<Map<K, SV>, MutableMapNewItemsProperties> { }
export interface ReadWriteSet<RV, SV>
  extends Pick<Set<RV | SV>, MutableSetNewDeleteItemsProperties>,
  Omit<Set<SV>, MutableSetNewDeleteItemsProperties> { }


type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

  export interface ObjectWithAddEventListener<T> {
    addEventListener(key: string, callback: (e: T) => any): any;
  }

  export type GetPrimitiveTypeClass<T> = T extends boolean
    ? Boolean
    : T extends number
    ? Number
    : T extends string
    ? String
    : T extends bigint
    ? BigInt
    : T extends symbol
    ? Symbol
    : {};
  
  // For some reason if you use false it takes the boolean as a const
 export type GetPrimitiveType<T> = T extends boolean
    ? boolean
    : //   : T extends number
    //     ? number
    //     : T extends string
    //       ? string
    //       : T extends bigint
    //         ? bigint
    //         : T extends symbol
    //           ? symbol
    T;
  
  // Doesnt work properly
  // type ExtendsObject<V extends object> = V extends { prototype: any }
  //   ? false
  //   : V extends new (
  //         ...args: any
  //       ) => any
  //     ? InstanceType<V> extends { prototype: any }
  //       ? false
  //       : true
  //     : V extends Element
  //       ? false
  //       : true;
  
  export type IsAny<T> = 0 extends 1 & T ? true : false;
  