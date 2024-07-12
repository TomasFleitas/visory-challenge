module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['jsx', 'js', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^routers': '<rootDir>/src/routers/$1',
    '^pages': '<rootDir>/src/pages/$1',
    '^components': '<rootDir>/src/components/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^provider/(.*)$': '<rootDir>/src/provider/$1',
    '^test/(.*)$': '<rootDir>/src/test/$1',
    '^api': '<rootDir>/src/api/$1',
    '^utilities': '<rootDir>/src/utilities/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
