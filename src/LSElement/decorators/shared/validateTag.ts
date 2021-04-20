export const validateTag = (tag: string) => {
  if (tag.indexOf('-') <= 0) {
    throw new Error('You need at least 1 dash in the custom element name!');
  }
};
// TODO: ver si vale la pena