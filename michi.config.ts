import type {
  ServerConfig,
  ServerConfigFactory,
  DefaultEnvironment,
} from "@michijs/dev-server";
import { droppableFlags } from "./droppableFlags";
// import {michiJSXPlugin} from './src/infrastructure/plugin'

export const config: ServerConfigFactory<
  "TESTING" | "WEB" | DefaultEnvironment
> = ({ environment }) => {
  const defaultConfig: ServerConfig = {
    public: {
      path: "./examples/public",
    },
    esbuildOptions: {
      // plugins: [michiJSXPlugin()],
      // Forcing options so testing works like in production
      minify: true,
      entryPoints: ["./examples/index.tsx"],
      tsconfig:
        environment === "DISTRIBUTION"
          ? "lib.tsconfig.json"
          : "./examples.tsconfig.json",
      splitting: true,
    },
  };
  if (environment.startsWith("TESTING")) {
    defaultConfig.openBrowser = false;
    defaultConfig.esbuildOptions = {
      ...defaultConfig.esbuildOptions,
      legalComments: "none",
      define: undefined,
      // minify: false,
      dropLabels: Object.values(droppableFlags),
    };
    if (environment === "TESTING") {
      defaultConfig.port = 3000;
      defaultConfig.public!.path = "./examples/benchmark/michijs/public";
      defaultConfig.esbuildOptions.entryPoints = [
        "./examples/benchmark/michijs/src/index.tsx",
      ];
    } else {
      defaultConfig.port = 3001;
      defaultConfig.public!.path = "./examples/benchmark/vanillajs/public";
      defaultConfig.esbuildOptions.entryPoints = [
        "./examples/benchmark/vanillajs/src/index.js",
      ];
    }
  } else {
    if (environment === "WEB") {
      defaultConfig.esbuildOptions!.entryPoints = ["./docs/index.ts"];
      defaultConfig.public = undefined;
      defaultConfig.esbuildOptions!.outdir = "./docs/javascripts";
    }
  }
  return defaultConfig;
};

export default config;
