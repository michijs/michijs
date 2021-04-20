export function copy(object: any) {//TODO: Candidate to be removed
  if (object === undefined) {
    return undefined;
  }
  else if (object === null) {
    return null;
  } else if (typeof object === 'object') {
    return JSON.parse(JSON.stringify(object));
  } 
  return object;
    
}