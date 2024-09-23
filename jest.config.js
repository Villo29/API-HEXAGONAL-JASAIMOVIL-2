module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["src/__test__/**.ts"],
    moduleFileExtensions: ["ts", "js"],
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
  };
  

  