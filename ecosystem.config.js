module.exports = {
  apps: [
    {
      name: "Frontend",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "source ./.env.production && node ./.output/server/index.mjs",
    },
  ],
};
