import type { Properties } from "csstype";
export type CSSProperties = Properties & {
    [k in `--${string}`]?: string | number;
};
