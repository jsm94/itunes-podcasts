const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const src = path.resolve(__dirname, "src");

const ruleForTSX = {
  test: /\.(jsx?|tsx?)$/,
  include: src,
  loader: "babel-loader",
  options: {
    presets: [
      "@babel/preset-env",
      "@babel/preset-typescript",
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
  },
};

const ruleForCSS = {
  test: /\.css$/,
  include: src,
  use: ["style-loader", "css-loader"],
};

const rules = [ruleForTSX, ruleForCSS];

module.exports = {
  output: {
    path: path.resolve(__dirname, "build"),
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
};
