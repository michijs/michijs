// @ts-ignore
const env = process.env.NODE_ENV.trimEnd();
let command;

if (env === "TESTING") command = "npm run start-benchmark-michijs";
else command = "npm run start-benchmark-vanilla";

console.log(command);

module.exports = {
  launch: {
    dumpio: true,
    headless: true,
    product: "chrome",
  },
  server: {
    command,
    port: 3000,
  },
};
