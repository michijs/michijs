// type StringKeyOf<T extends object> = Extract<keyof T, string>;
// type DomInterface<E extends Element = HTMLElement> = { [K in StringKeyOf<E> as `_${K}`]: E[K] }
export type LSAttributes<E extends Element = HTMLElement> = {
    /**
     *
     */
    _?: {
        /**
         * An array with the names of the attributes that can change
         */
        dynamicAttributes?: string[];
        /**
         * It indicates that children never change. If you use static Children, there is no need to use staticChildren or dynamicAttributes on your children.
         */
        staticChildren?: boolean;
    } & Partial<E>;
};
