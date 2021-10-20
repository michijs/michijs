import { LsServerConfig, UserConfig } from '@lsegurado/ls-server';

export const config: LsServerConfig = (environment) => {
  const defaultConfig: UserConfig = {
    public: {
      path: './tests/public'
    },
    esbuildOptions: {
      entryPoints: ['./tests/index.tsx'],
      tsconfig: environment === 'DISTRIBUTION' ? 'tsconfig.src.json' : 'tsconfig.json'
    }
  };
  switch (environment) {
    case 'TESTING':
    case 'TESTING_VANILLA':{
      defaultConfig.openBrowser = false;
      defaultConfig.public.path = './src/jest/ls-element/public';
      defaultConfig.esbuildOptions = {
        ...defaultConfig.esbuildOptions,
        entryPoints: ['./src/jest/ls-element/src/index.tsx'],
        splitting: false,
        format: undefined,
        target: undefined
      };
    }
    case 'TESTING': {
      defaultConfig.esbuildOptions.entryPoints = ['./src/jest/ls-element/src/index.tsx'];
      break;
    }
    case 'TESTING_VANILLA': {
      defaultConfig.esbuildOptions.entryPoints = ['./src/jest/vanillajs/src/index.js'];
      break;
    }
  }
  return defaultConfig;
};

export default config;