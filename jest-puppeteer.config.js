// @ts-ignore
const env = process.env.NODE_ENV.trimEnd();
let command;

if (env === 'TESTING')
    command = 'npm run start-benchmark-michijs';
else if (env === 'TESTING_MAP')
    command = 'npm run start-benchmark-michijs-map';
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