module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.ts"], // Indica dónde buscar archivos de prueba
    moduleFileExtensions: ["ts", "js"],
    transform: {
    "^.+\\.ts$": "ts-jest",
},
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
};
