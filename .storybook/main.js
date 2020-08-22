module.exports = {
  stories: [
    '../src/**/*.stories.tsx',
  ],
  webpackFinal: async (config, { configType }) => {

    return config;
  },
};
