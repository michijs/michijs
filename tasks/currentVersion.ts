import packageJson from "../package.json";

export const currentVersion = `${packageJson.version}-playwright@${packageJson.devDependencies["playwright-core"]}`