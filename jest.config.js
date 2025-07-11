module.exports = {
  /// ////////////
  // TESTS SETUP
  /// ////////////
  setupFilesAfterEnv: ["./jest.setup.js"],
  cacheDirectory: "./.cache",
  maxWorkers: "80%",
  transform: { 
    "\\.(js|jsx)$": "babel-jest" 
  },
  moduleDirectories: ["node_modules"],
  notify: true,
  roots: ["src", "core", "configurations"],
  slowTestThreshold: 5,
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  testEnvironment: "jsdom",
  verbose: true,
  moduleFileExtensions: ["js", "jsx"],

  // Usuń extensionsToTreatAsEsm - powoduje problemy
  // extensionsToTreatAsEsm: ['.jsx'],
  
  // Poprawiona konfiguracja transformIgnorePatterns
  transformIgnorePatterns: [
    "node_modules/(?!(@testing-library/preact|@testing-library/jest-dom|@testing-library/user-event|preact)/)"
  ],

  // Mapowanie modułów dla preact
  moduleNameMapper: {
    "^@testing-library/preact$": "<rootDir>/node_modules/@testing-library/preact/dist/cjs/index.js",
    "^preact$": "<rootDir>/node_modules/preact/dist/preact.js",
    "^preact/(.*)$": "<rootDir>/node_modules/preact/$1"
  },

  /// ////////////
  // COVERAGE SETUP
  /// ////////////
  collectCoverageFrom: ["core/**/*.{js,jsx}", "src/**/*.{js,jsx}", "!**/node_modules/**", "!**/vendor/**"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 60,
      lines: 70,
      statements: -10,
    },
  },
  displayName: {
    name: "EOSC Portal Commons",
    color: "blue",
  },
};