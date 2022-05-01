const env = process.env.NODE_ENV.trimEnd();
let command;

if (env === 'TESTING')
    command = 'npm run start-benchmark-ls-element';
else if (env === 'TESTING_MAP')
    command = 'npm run start-benchmark-ls-element-map';
else if (env === 'TESTING_VANILLA')
    command = 'npm run start-benchmark-vanilla'
else
    command = 'npm run start-benchmark-vanilla'

module.exports = {
    server: {
        command,
        port: 3000
    },
}