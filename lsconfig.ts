import { LsServerConfig, UserConfig } from '@lsegurado/ls-server';

export const config: LsServerConfig = (environment) => {
  const defaultConfig: UserConfig = {
    public: {
      path: './tests/public'
    },
    esbuildOptions: {
      entryPoints: ['./tests/index.tsx'],
      tsconfig: environment === 'DISTRIBUTION' ? 'dist.tsconfig.json': 'tsconfig.json',
      splitting: true,
    }
  };
  switch (environment) {
    case 'TESTING':
    case 'TESTING_VANILLA':{
      defaultConfig.openBrowser = false;
      defaultConfig.public.path = './tests/benchmark/ls-element/public';
      defaultConfig.esbuildOptions = {
        ...defaultConfig.esbuildOptions,
        entryPoints: ['./tests/benchmark/ls-element/src/index.tsx'],
        splitting: false,
        format: undefined,
        target: undefined
      };
    }
    case 'TESTING': {
      defaultConfig.esbuildOptions.entryPoints = ['./tests/benchmark/ls-element/src/index.tsx'];
      break;
    }
    case 'TESTING_VANILLA': {
      defaultConfig.esbuildOptions.entryPoints = ['./tests/benchmark/vanillajs/src/index.js'];
      break;
    }
  }
  return defaultConfig;
};

export default config;