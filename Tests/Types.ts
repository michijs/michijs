import { HTMLAttributesWithMandatoryId } from "../src";

export type MyCounterAttributes = {
    oncountchanged?: (event: CustomEvent<number>) => void;
} & HTMLAttributesWithMandatoryId;