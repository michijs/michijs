const returnParameter = (x: string): string => x;

interface TrustedTypeObject {
  createHTML(x: string): string;
  createScript(x: string): string;
  createScriptURL(x: string): string;
}

const trustedTypeObject: TrustedTypeObject = {
  createHTML: returnParameter,
  createScript: returnParameter,
  createScriptURL: returnParameter,
};

export const trustedTypePolicy: TrustedTypeObject =
  // @ts-ignore
  window.trustedTypes && trustedTypes.createPolicy
    ? // @ts-ignore
      trustedTypes.createPolicy("michijs", trustedTypeObject)
    : trustedTypeObject;
