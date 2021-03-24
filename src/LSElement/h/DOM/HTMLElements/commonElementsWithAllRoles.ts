
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';
import { GetRoles } from '../DOMAttributes/Utils';

export type commonElement = Partial<GlobalAttributes & GetRoles>

export interface address extends commonElement{}
export interface abbr extends commonElement{}
export interface b extends commonElement{}
export interface bdi extends commonElement{}
export interface bdo extends commonElement{}
export interface cite extends commonElement{}
export interface code extends commonElement{}
export interface dfn extends commonElement{}
export interface div extends commonElement{}
export interface em extends commonElement{}
export interface figure extends commonElement{}
export interface i extends commonElement{}
export interface kbd extends commonElement{}
export interface mark extends commonElement{}
export interface p extends commonElement{}
export interface picture extends commonElement{}
export interface pre extends commonElement{}
export interface rp extends commonElement{}
export interface rt extends commonElement{}
export interface ruby extends commonElement{}
export interface s extends commonElement{}
export interface samp extends commonElement{}
export interface small extends commonElement{}
export interface span extends commonElement{}
export interface strong extends commonElement{}
export interface sub extends commonElement{}
export interface sup extends commonElement{}
export interface table extends commonElement{}
export interface tfoot extends commonElement{}
export interface thead extends commonElement{}
export interface tr extends commonElement{}
export interface u extends commonElement{}
export interface wbr extends commonElement{}