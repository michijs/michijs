export interface LSAttributes {
    /**
     * An array with the names of the attributes that can change
     */
    dynamicAttributes?: string[];
    /**
     * It indicates that children never change. If you use static Children, there is no need to use staticChildren or dynamicAttributes on your children.
     */
    staticChildren?: boolean;
}