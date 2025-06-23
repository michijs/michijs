import type {
  ServerConfig,
  ServerConfigFactory,
  DefaultEnvironment,
} from "@michijs/dev-server";
import { droppableFlags } from './droppableFlags'

export const config: ServerConfigFactory<"TESTING" | DefaultEnvironment> = ({
  environment,
}) => {
  const defaultConfig: ServerConfig = {
    public: {
      path: "./tests/public",
    },
    esbuildOptions: {
      // Forcing options so testing works like in production
      minify: true,
      entryPoints: ["./tests/index.tsx"],
      tsconfig:
        environment === "DISTRIBUTION" ? "dist.tsconfig.json" : "tsconfig.json",
      splitting: true,
    },
  };
  if (environment.startsWith("TESTING")) {
    defaultConfig.openBrowser = false;
    defaultConfig.esbuildOptions = {
      ...defaultConfig.esbuildOptions,
      legalComments: 'none',
      define: undefined,
      minify: false,
      dropLabels: Object.values(droppableFlags)
    };
    if (environment === "TESTING") {
      defaultConfig.port = 3000;
      defaultConfig.public!.path = "./tests/benchmark/michijs/public";
      defaultConfig.esbuildOptions.entryPoints = [
        "./tests/benchmark/michijs/src/index.tsx",
      ];
    } else {
      defaultConfig.port = 3001;
      defaultConfig.public!.path = "./tests/benchmark/vanillajs/public";
      defaultConfig.esbuildOptions.entryPoints = [
        "./tests/benchmark/vanillajs/src/index.js",
      ];
    }
  }
  return defaultConfig;
};

export default config;
