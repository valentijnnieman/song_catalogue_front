const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  module: { 
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  entry: './src/main.js',
  output: {
    filename: 'song_catalogue.js',
    path: '/home/vaal/dev/js/song_catalogue/'
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}
