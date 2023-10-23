const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  entry: {
    app: path.join(__dirname, './index.js')
  },
  output: {
    chunkFilename: '[name].[chunkhash:8].js',
    filename: '[name].[contenthash:8].bundle.js'
  },
  target: ['web', 'es5'],
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        use: 'vue-loader'
      },
      {
        test: /\.(png|jpg|jpeg|webp|gif|bmp|svg)$/,
        type: "asset/resource"
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html')
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[chunk].css'
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    port: 1997,
    client: {
      logging: 'error',//只打印报错，其实只要这个配置就好了
      overlay: {  //有报错发生，直接覆盖浏览器视窗，显示错误
        errors: true,
        warnings: false,
      },
    },
  }
}