import { ServerConfig, UserConfig } from '@michijs/server';

// declare module '@michijs/server/bin/types'{
//   export type DefaultEnvironment = 'TESTING'
// }

export const config: ServerConfig = (environment) => {
  const defaultConfig: UserConfig = {
    public: {
      path: './tests/public'
    },
    esbuildOptions: {
      entryPoints: ['./tests/index.tsx'],
      tsconfig: environment === 'DISTRIBUTION' ? 'dist.tsconfig.json' : 'tsconfig.json',
      splitting: true,
    }
  };
  if (environment.startsWith('TESTING')) {
    defaultConfig.openBrowser = false;
    defaultConfig.esbuildOptions = {
      ...defaultConfig.esbuildOptions,
      splitting: false,
      format: undefined,
      target: undefined
    };
    if (environment === 'TESTING') {
      defaultConfig.public!.path = './tests/benchmark/michijs/public';
      defaultConfig.esbuildOptions.entryPoints = ['./tests/benchmark/michijs/src/index.tsx'];
    } else if (environment === 'TESTING_MAP') {
      defaultConfig.public!.path = './tests/benchmark/michijs-map/public';
      defaultConfig.esbuildOptions.entryPoints = ['./tests/benchmark/michijs-map/src/index.tsx'];
    } else {
      defaultConfig.public!.path = './tests/benchmark/vanillajs/public';
      defaultConfig.esbuildOptions.entryPoints = ['./tests/benchmark/vanillajs/src/index.js'];
    }
  }
  return defaultConfig;
};

export default config;