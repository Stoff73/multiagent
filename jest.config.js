/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      babelConfig: true,
      tsconfig: "tsconfig.json"
    }
  },
  testEnvironmentOptions: {
    resources: "usable"
  },
  testEnvironment: "jsdom",
  testRunner: "jest-circus/runner",
  testTimeout: 10000
};