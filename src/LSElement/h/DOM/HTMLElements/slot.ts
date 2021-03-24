import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetAttributes } from "../DOMAttributes/Utils";

export interface slot extends Partial<GlobalAttributes & GetAttributes<'name'>>{}