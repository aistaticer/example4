console.log('webpack.config.js is loaded');

const path = require('path');
const os = require('os');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://' + os.hostname() + ':9090/',
    './app/javascript/packs/application.js' // ここにはあなたのメインのJavaScriptファイルのパスを入れてね
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9090
  },
  // babel-loaderの設定を追加
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!@hotwired\/turbo)/, // @hotwired/turboを除外から除外
        use:
          {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // スタイルをDOMに適用する
          'css-loader',   // CSSをCommonJSに変換する
          'sass-loader'   // SassをCSSにコンパイルする
        ]
      }
    ]
  }
  // その他の設定...
	
};
