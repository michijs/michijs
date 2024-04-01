// @ts-ignore
const env = process.env.NODE_ENV.trimEnd();
let command;

if (env === "TESTING") command = "bun run start-benchmark-michijs";
else command = "bun run start-benchmark-vanilla";

module.exports = {
  launch: {
    dumpio: true,
    headless: "new",
    product: "chrome",
  },
  server: {
    command,
    port: 3000,
  },
};
