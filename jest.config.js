/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node', 
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true
    }]
  },
  moduleNameMapper: {
    '^@/utils$': '<rootDir>/src/shared/utils/index.ts',
    '^@/interfaces$': '<rootDir>/src/shared/interfaces/index.ts', 
    '^@/middlewares$': '<rootDir>/src/middlewares/index.ts',
    '^@/constants$': '<rootDir>/src/constants/index.ts',
    '^@/models/(.*)$': '<rootDir>/src/models/$1/index.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^bcrypt-ts$': '<rootDir>/__mocks__/bcrypt-ts.ts',
    '^mongoose$': '<rootDir>/__mocks__/mongoose.ts',
    '^jsonwebtoken$': '<rootDir>/__mocks__/jsonwebtoken.ts'
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts', 
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/app.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 10000,
  clearMocks: true,
  restoreMocks: true
};