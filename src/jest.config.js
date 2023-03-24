

module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  
    'pages/(.*)': '<rootDir>/src/pages/$1',
    'components/(.*)': '<rootDir>/src/components/$1',
    'styles/(.*)': '<rootDir>/src/styles/$1',
    'utils/(.*)': '<rootDir>/src/utils/$1',
    'hooks/(.*)': '<rootDir>/src/hooks/$1',
    'context/(.*)': '<rootDir>/src/context/$1',
    'data/(.*)': '<rootDir>/src/data/$1',
    'public/(.*)': '<rootDir>/public/$1',
    'images/(.*)': '<rootDir>/public/images/$1',
    'assets/(.*)': '<rootDir>/public/assets/$1',
    'fonts/(.*)': '<rootDir>/public/fonts/$1',

    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  "modulePaths": [
    "<rootDir>"
  ],
  testEnvironment: 'jsdom',
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
   customJestConfig : {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}