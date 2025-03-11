const returnParameter = (x: string): string => x;

const trustedTypeObject: TrustedTypePolicyOptions = {
  createHTML: returnParameter,
  createScript: returnParameter,
  createScriptURL: returnParameter,
};

export const trustedTypePolicy: TrustedTypePolicy =
  window.trustedTypes
    ?
    window.trustedTypes.createPolicy("michijs", trustedTypeObject)
    : (trustedTypeObject as unknown as TrustedTypePolicy);

export const makeMichijsTheDefaultTrustedPolicy = () => {
  if (window.trustedTypes)
    window.trustedTypes.createPolicy("default", trustedTypeObject)
}
