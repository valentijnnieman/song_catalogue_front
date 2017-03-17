module.exports = {
  module: { 
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  entry: './src/main.js',
  output: {
    filename: 'song_catalogue.js',
    path: './'
  }
}
