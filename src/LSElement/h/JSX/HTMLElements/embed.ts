import { GetAttributes, GetRoles } from "../DOMAttributes/utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { MIMEType } from "../DOMAttributes/types";

export type embed = Partial<GlobalAttributes & GetAttributes<'height'
    | 'src'
    | 'width'
> & {
    type: MIMEType
} & GetRoles<'application' | 'document' | 'img' | 'none' | 'presentation'>>