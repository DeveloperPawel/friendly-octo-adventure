const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const dotenv = require("dotenv-webpack");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        patient: `patient@${domain}/patient/latest/remoteEntry.js`,
        admin: `admin@${domain}/admin/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        provider: `provider@${domain}/provider/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
    new dotenv({
      systemvars: true,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
