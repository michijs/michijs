
export type GetPrimitiveTypeClass<T> = T extends boolean ? Boolean : T extends number ? Number : T extends string ? String : T extends bigint ? BigInt : T extends symbol ? Symbol : {};
