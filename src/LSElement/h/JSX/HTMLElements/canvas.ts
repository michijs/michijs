import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type canvas = Partial<GlobalAttributes & GetAttributes<'width'
    | 'height'
> & GetRoles>