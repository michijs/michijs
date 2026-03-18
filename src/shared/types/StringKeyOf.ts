export type StringKeyOf<T extends object> = Extract<keyof T, string>;
