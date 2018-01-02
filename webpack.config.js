const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].bundle.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = env => {
  return {
    module: { 
      rules: [ 
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react'],
            plugins: ['transform-object-rest-spread']
          }
        },
        {
          test: /\.scss$/,
          use: extractSass.extract({
            use: [{
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
          })
        }
      ]
    },
    plugins: [
      extractSass,
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(env.NODE_ENV)
      })
    ],
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: '/dist/',
      filename: "song_catalogue.js"
    }
  }
}
