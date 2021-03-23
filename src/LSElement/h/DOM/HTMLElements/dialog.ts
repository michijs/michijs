import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type dialog = Partial<
    GlobalAttributes
    & GetAttributes<'open'>
    & GetRoles<'alertdialog'>
>