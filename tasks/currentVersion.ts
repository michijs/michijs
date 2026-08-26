import packageJson from "../package.json";

export const currentVersion = `${packageJson.version}-${packageJson.packageManager}`;
