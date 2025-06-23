import type { SingleJSXElement } from '../../types'
import { ElementFactory } from './ElementFactory'

export function create<T = Node>(
  jsx: SingleJSXElement,
  contextElement?: Element
): T {
  return new ElementFactory(contextElement).create(jsx)
}
