const env = process.env.NODE_ENV.trimEnd();

module.exports = {
    server: {
        command: env === 'TESTING' ? 'npm run start-benchmark-ls-element': 'npm run start-benchmark-vanilla',
        port: 3000
    },
}