const path = require('path');

module.exports = ({config}) => {
  config.module.rules.push({
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", {flow: false, typescript: true}]],
    },
    test: /\.(ts|tsx)$/,
  });
  config.resolve.extensions.push(".ts", ".tsx");
  config.resolve.modules.push(path.resolve(__dirname, "../src"));
  return config;
};
