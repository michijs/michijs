declare module h {
    type Element = string;
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}