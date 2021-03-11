import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type data = Partial<GlobalAttributes & {
    /**
     * Specifies the machine-readable translation of the content of the element.
     */
    value: string;
} & GetRoles>