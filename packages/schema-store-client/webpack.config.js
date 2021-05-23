const path = require('path');

const config = {
  mode: 'none',
  entry: {
    main: './src/main.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
}

module.exports = [
  {
    ...config,
    target: 'node',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist', 'node'),
      libraryTarget: 'umd',
      globalObject: 'this'
    },
  },
  {
    ...config,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist', 'browser'),
      libraryTarget: 'umd'
    },
  }
];
