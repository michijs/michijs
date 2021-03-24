import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface dialog extends Partial<
    GlobalAttributes
    & GetAttributes<'open'>
    & GetRoles<'alertdialog'>
>{}