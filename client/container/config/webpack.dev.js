const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8000/",
  },
  devServer: {
    port: 8000,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        patient: "patient@http://localhost:8081/remoteEntry.js",
        admin: "admin@http://localhost:8082/remoteEntry.js",
        auth: "auth@http://localhost:8083/remoteEntry.js",
        provider: "provider@http://localhost:8084/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
