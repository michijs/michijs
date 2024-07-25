import { getBrowser } from "../utils/getBrowser";

const isSafari = ["safari", "iphone"].includes(getBrowser());
if (isSafari) await import("./safariBuiltInElements");
