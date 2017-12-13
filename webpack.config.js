var webpack = require('webpack')
const path = require('path');
var ip = require("ip");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcPath = path.join(__dirname, './src');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: "/",
    path: path.resolve(__dirname, './dist')

  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), 'node_modules/'],
    extensions: [".js", '.vue', ".json"],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'public': path.resolve(__dirname, 'src/public')
    }
  },
  devServer: {
    contentBase: "/",
    compress: true,
    hot: true,
    historyApiFallback: true,
    host: "127.0.0.1",
    port: 9010,
    inline: true
  },
  //devtool:"cheap-module-eval-source-map",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /iview.src.*?js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          minimize: true,
       /*   postcss: [
            require('postcss-salad'),
            require('postcss-px2rem')({ remUnit: 75 }),
            require('postcss-cssnext')()
          ],*/
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader!less-loader',
              fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
            })
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
     /*     {
            loader: 'postcss-loader',
            options: {
              minimize: true,
              plugins: [
                require('postcss-salad'),
                require('postcss-px2rem')({ remUnit: 75 }),
                require('postcss-cssnext')()
              ]
            }
          }*/
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: "imgs/[hash:8].[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      inject: 'body',
      title: 'element-ui后端管理系统',
      template: './src/index.html'
    }),

    new webpack.HotModuleReplacementPlugin()

  ]
};
