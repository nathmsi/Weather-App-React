const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require('dotenv');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = () => {

  const env = dotenv.config().parsed,
    envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});


  return {
    devtool : 'inline-source-map',
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
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.(jpe?g|gif|ico|png|svg|jpg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        favicon: './src/assets/weather.ico'
      }),
      new webpack.DefinePlugin(envKeys)
    ],
    resolve: {
      extensions: [".js", ".jsx"],
      mainFields: ['module', 'jsnext:main', 'browser', 'main']
    },
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          uglifyOptions: {
            compress: {
              pure_funcs: ['console.log'],
            },
            mangle: {
              reserved: ['console.log']
            }
          }
        })
      ]
    }
  }
};
