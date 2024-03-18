import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx', 'nestjs', 'node'],
  preset: 'ts-jest',
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    // ...
    '^@/*/(.*)$': '<rootDir>/*/$1',
  },
}

export default createJestConfig(config)

// module.exports = {
//   moduleFileExtensions: ['js', 'json', 'ts'],
//   preset: 'ts-jest',
//   rootDir: 'src',
//   testRegex: '.*\\.spec\\.ts$',
//   transform: {
//     '^.+\\.(t|j)s$': 'ts-jest',
//   },
//   collectCoverageFrom: ['**/*.(t|j)s'],
//   coverageDirectory: '../coverage',
//   testEnvironment: 'node',
//   moduleNameMapper: {
//     '^@app/(.*)$': '<rootDir>/$1',
//   },
// };
