import { GetAttributes } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface textarea extends Partial<
    GlobalAttributes
    & GetAttributes<'autocapitalize'
        | 'autocomplete'
        | 'autofocus'
        | 'cols'
        | 'disabled'
        | 'form'
        | 'maxlength'
        | 'minlength'
        | 'name'
        | 'placeholder'
        | 'readonly'
        | 'required'
        | 'rows'
        | 'spellcheck'
        | 'wrap'
    >
>{}