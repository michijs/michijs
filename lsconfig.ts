import { LsServerConfig } from '@lsegurado/ls-server';

export const config: LsServerConfig = (environment) => ({
    public: {
        path: './tests/public'
    },
    esbuildOptions: {
        entryPoints: ['./tests/index.tsx'],
        tsconfig: environment === 'DISTRIBUTION' ? 'tsconfig.src.json' : 'tsconfig.json'
    }
})

export default config