import type { PrimitiveType } from '../types';

export function createText(content?: unknown | null | PrimitiveType): string {
  return content === undefined || content === null ? '' : (typeof content === 'object' ? JSON.stringify(content) : content.toString());
}