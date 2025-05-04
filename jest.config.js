export default {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|svg)$': '<rootDir>/mocks/fileMock.js'
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js']
  };