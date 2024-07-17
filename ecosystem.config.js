module.exports = {
  apps: [
    {
      name: "my-api",
      script: "src/infrastructure/index.ts",
      interpreter: "ts-node",
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
