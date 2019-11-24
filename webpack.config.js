const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (_, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./client/src/index.js",
    output: {
      path: path.resolve(__dirname, "client", "build"),
      filename: "static/js/[name].[chunkhash].js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.module\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[path][name]__[local]__[hash:base64:5]"
                }
              }
            },
            "postcss-loader"
          ]
        },
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader"
          ],
          exclude: /\.module\.css$/
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: ["file-loader"]
        },
        {
          test: /\.html$/,
          use: {
            loader: "html-loader"
          }
        }
      ]
    },
    plugins: [
      isProd ? new CleanWebpackPlugin() : null,
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[chunkhash].css",
        chunkFilename: "static/css/[id].[hash].css"
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "client", "public", "index.html"),
        favicon: "./client/public/favicon.ico"
      }),
      isProd
        ? new CopyPlugin([
            {
              from: path.resolve(__dirname, "client", "public"),
              to: path.resolve(__dirname, "client", "build"),
              ignore: ["index.html", "favicon.ico"]
            }
          ])
        : null
    ].filter(Boolean),
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    devServer: {
      port: 3000,
      proxy: {
        context: ["/images", "/api"],
        target: "http://localhost:3001"
      },
      historyApiFallback: true
    },
    stats: "minimal"
  };
};
