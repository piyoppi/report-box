const path = require('path');

module.exports = {
  mode: 'none',
  entry: {
    main: './src/main.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    /* For jsonwebtoken(jws, jwa)*/
    fallback: {
      "crypto": false,
      "stream": false
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};
