module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"], //Folders to ignore
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: { // Tests in typescript needs to be converted
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  }
}