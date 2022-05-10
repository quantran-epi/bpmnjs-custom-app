const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  devServer: {
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  module: {
    rules: [
      {
        test: /\.bpmn$/,
        use: 'raw-loader'
      },
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
        ],
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
      { from: 'node_modules/bpmn-js-properties-panel/dist/assets', to: 'vendor/bpmn-js-properties-panel/assets' },
      { from: '**/*.{html,css}', context: 'app/' }
    ])
  ],
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      "@config": path.resolve(__dirname, './app/config'),
      "@models": path.resolve(__dirname, './app/models'),
      "@constants": path.resolve(__dirname, './app/constants'),
      "@hooks": path.resolve(__dirname, './app/hooks'),
    },
  },
};
