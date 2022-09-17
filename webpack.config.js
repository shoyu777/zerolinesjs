// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const path = require('path');

// eslint-disable-next-line no-undef
module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.ts',
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: {
      // eslint-disable-next-line no-undef
      directory: path.join(__dirname, 'dist'),
    },
  },
};
