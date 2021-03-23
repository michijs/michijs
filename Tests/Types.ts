export type MyCounterAttributes = {
    oncountchanged?: (event: CustomEvent<number>) => void;
};