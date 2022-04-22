import { LsServerConfig, UserConfig } from '@lsegurado/ls-server';

export const config: LsServerConfig = (environment) => {
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
      defaultConfig.public.path = './tests/benchmark/ls-element/public';
      defaultConfig.esbuildOptions.entryPoints = ['./tests/benchmark/ls-element/src/index.tsx'];
    } else if (environment === 'TESTING_MAP') {
      defaultConfig.public.path = './tests/benchmark/ls-element-map/public';
      defaultConfig.esbuildOptions.entryPoints = ['./tests/benchmark/ls-element-map/src/index.tsx'];
    } else {
      defaultConfig.public.path = './tests/benchmark/vanillajs/public';
      defaultConfig.esbuildOptions.entryPoints = ['./tests/benchmark/vanillajs/src/index.js'];
    }
  }
  return defaultConfig;
};

export default config;