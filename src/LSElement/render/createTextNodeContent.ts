export function createTextNodeContent(content: any){
    return content === undefined || content === null ? '': (typeof content === 'object' ? JSON.stringify(content): content.toString());
}