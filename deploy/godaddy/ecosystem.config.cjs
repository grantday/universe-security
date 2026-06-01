/** PM2 config for GoDaddy VPS (optional). Run: pm2 start ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: "universe-security",
      script: "start.cjs",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
