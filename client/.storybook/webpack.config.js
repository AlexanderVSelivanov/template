// todo: absolute path (cra v3) doesn't work with storybook
module.exports = ({config}) => {
  config.module.rules.push({
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", {flow: false, typescript: true}]],
    },
    test: /\.(ts|tsx)$/,
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
