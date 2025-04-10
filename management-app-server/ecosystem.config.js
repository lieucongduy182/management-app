module.exports = {
  apps: [
    {
      name: 'management-app',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
