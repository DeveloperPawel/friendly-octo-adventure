const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const dotenv = require("dotenv-webpack");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/admin/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "admin",
      filename: "remoteEntry.js",
      exposes: {
        "./Admin": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new dotenv({
      systemvars: true,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
