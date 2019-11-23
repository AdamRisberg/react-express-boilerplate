const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
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
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]"
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /\.module\.css$/
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
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[chunkhash].css",
      chunkFilename: "static/css/[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "client", "public", "index.html"),
      favicon: "./client/public/favicon.ico"
    })
  ],
  devServer: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001"
    }
  }
};
