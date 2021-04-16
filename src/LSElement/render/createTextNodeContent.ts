export function createTextNodeContent(content: any) : string{
  return content === undefined || content === null ? '' : (typeof content === 'object' ? JSON.stringify(content) : content.toString());
}