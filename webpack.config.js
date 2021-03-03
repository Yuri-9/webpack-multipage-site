const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, options) => {
  const isProduction = options.mode === "production";

  const config = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "none" : "eval-cheap-module-source-map",
    watch: !isProduction,
    entry: {
      main: ["./src/index.js", "./src/sass/style.scss"],
      second: ["./src/index2.js", "./src/sass/style2.scss"],
    },
    output: {
      path: path.join(__dirname, "/dist"),
      filename: `[name].js`,
    },
    optimization: {
      runtimeChunk: true,
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src/index.html"),
        filename: `index.html`,
        chunks: ["main"],
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src/index2.html"),
        filename: `index2.html`,
        chunks: ["second"],
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "chunk.css",
      }),
      new CleanWebpackPlugin(),
      // new webpack.SourceMapDevToolPlugin(options),
    ],
  };

  return config;
};
