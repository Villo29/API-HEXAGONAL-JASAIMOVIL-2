module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["<rootDir>/src/__test__/**/*.ts"],  // Ajusta la ruta a la carpeta de pruebas
    moduleFileExtensions: ["ts", "js"],
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
  };
  