import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type meta = Partial<GlobalAttributes & GetAttributes<'charset'
| 'content'
| 'http-equiv'
| 'name'
>>
//TODO: content changes based on http-equiv value