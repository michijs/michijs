import { LsServerConfig } from '@lsegurado/ls-server';

export const config: LsServerConfig = () => ({
    public: {
        path: './tests/public'
    },
    esbuildOptions: {
        entryPoints: ['./tests/index.tsx']
    }
})

export default config