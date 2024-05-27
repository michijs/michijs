const trustedTypeObject = {
  createHTML: (x: string) => x,
  createScript: (x: string) => x,
  createScriptURL: (x: string) => x,
};

export const trustedTypePolicy: typeof trustedTypeObject =
  // @ts-ignore
  window.trustedTypes && trustedTypes.createPolicy ?
    // @ts-ignore
    trustedTypes.createPolicy("michijs", trustedTypeObject)
    : trustedTypeObject
