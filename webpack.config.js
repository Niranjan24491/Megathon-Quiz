const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.jsx"
  },
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "www"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: ["babel-loader"],
        include: [path.resolve(__dirname, "src")]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ],
        include: [path.resolve(__dirname, "src")]
      },
      {
        test: /\.(gif|png|jpg|svg)$/i,
        use: [
          "url-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 50
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "60-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 50
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "www"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"]
  },
  plugins: [
    new CleanWebpackPlugin(["www"]),
    new HtmlWebpackPlugin({
      title: "Megathon Quiz",
      template: "./src/index.ejs"
    }),
    new webpack.DefinePlugin({
      // <-- key to reducing React's size
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.jsx$|\.css$|\.html$|\.jpg$|\.png$|\.js$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
