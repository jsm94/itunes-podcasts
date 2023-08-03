const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const src = path.resolve(__dirname, "src");

const ruleForTSX = {
  test: /\.(jsx?|tsx?)$/,
  include: src,
  loader: "babel-loader",
};

const ruleForCSS = {
  test: /\.css$/,
  include: src,
  use: ["style-loader", "css-loader"],
};

const rules = [ruleForTSX, ruleForCSS];

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(src, "index.html"),
      }),
    ],
    module: {
      rules,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devServer: {
      historyApiFallback: true,
      port: 3000,
    },
  };
};
