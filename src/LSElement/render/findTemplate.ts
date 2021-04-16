import { ObjectJSXElement } from '../types';
import { nodeIsHTMLElement } from '../typeWards/nodeIsHTMLElement';
import { tagsAreDifferent } from './rerender/tagsAreDifferent';

export function findTemplate(templates: Node[], objectJSXElement: ObjectJSXElement){
  return templates.find(template => nodeIsHTMLElement(template) && !tagsAreDifferent(objectJSXElement, template));
}