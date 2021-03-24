import { GetAttributes, GetRoles } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

type mod = Partial<
    GlobalAttributes
    & GetAttributes<'cite' | 'datetime'>
    & GetRoles
>
export interface ins extends mod{}
export interface del extends mod{}