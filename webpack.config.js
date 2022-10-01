var path = require('path');

module.exports = {
  entry: './src/main.ts',
  mode: 'development', 
  devtool: 'source-map', 
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'), 
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: 'ts-loader'
      }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}