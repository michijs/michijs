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
    case 'TESTING': {
      defaultConfig.public.path = './src/jest/ls-element/public';
      defaultConfig.esbuildOptions = {
        ...defaultConfig.esbuildOptions,
        entryPoints: ['./src/jest/ls-element/src/index.tsx'],
        splitting: false,
        format: undefined,
        target: undefined
      };
      break;
    }
    case 'TESTING_VANILLA': {
      defaultConfig.public.path = './src/jest/vanillajs/public';
      defaultConfig.esbuildOptions = {
        ...defaultConfig.esbuildOptions,
        entryPoints: ['./src/jest/vanillajs/src/index.js'],
        splitting: false,
        format: undefined,
        target: undefined
      };
      break;
    }
  }
  return defaultConfig;
};

export default config;