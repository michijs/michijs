module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "\\.(js|jsx|ts|tsx)$": "ts-jest",
    "\\.(css)$": "./cssTransform.js"
  },
};