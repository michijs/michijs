type StringKeyOf<T extends object> = Extract<keyof T, string>;
type DomInterface<E extends object> = { [K in StringKeyOf<E> as `_${K}`]: E[K] }
type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;
type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];
type NonUndefined<A> = A extends undefined ? never : A;
type NonFunctionKeys<T extends object> = {
    [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K;
}[keyof T];
type PickWritable<E> = Pick<E, WritableKeys<E>>;
type PickNonFunction<E extends object> = Pick<E, NonFunctionKeys<E>>;

export type LSAttributes<E extends Element = HTMLElement> = {
    /**
     * An array with the names of the attributes that can change
     */
    _dynamicAttributes?: string[];
    /**
     * It indicates that children never change. If you use static Children, there is no need to use staticChildren or dynamicAttributes on your children.
     */
    _staticChildren?: boolean;
} & Partial<DomInterface<PickNonFunction<PickWritable<E>>>>;
