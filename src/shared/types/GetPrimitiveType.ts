// For some reason if you use false it takes the boolean as a const

export type GetPrimitiveType<T> = T extends boolean ? boolean :
  //     ? number
  //     : T extends string
  //       ? string
  //       : T extends bigint
  //         ? bigint
  //         : T extends symbol
  //           ? symbol
  T;
