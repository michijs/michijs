import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { WindowEvents } from "../DOMEvents/WindowEvents";

export interface body extends Partial<
    GlobalAttributes
    & WindowEvents
>{}