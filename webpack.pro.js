var webpack = require('webpack')
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcPath = path.join(__dirname, './src');
const versiony = require('versiony');
const ip = require("ip");

// 获取版本
var v = versiony.from('version.json').get();
console.log(`当前版本号：${v}`);

// 更新版本
versiony.from('version.json')
  .patch()
  .to('version.json').end();

console.log("版本更新成功");


module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[chunkhash].bundle.js',
    publicPath: `https://r.imuzhuang.com/static/youxuan/active/${v}/`,
    path: path.resolve(__dirname, `./dist/${v}`)
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
    host: ip.address(),
    port: 9099,
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
        /*  postcss: [
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
         /* {
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
              // name: "[path][hash][name].[ext]"
              name: "imgs/[sha512:hash:base64:7].[ext]?[hash]"
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
      title: '优选钱包',
      template: './src/index.html'
    }),
    new UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ // js、css都会压缩
      mangle: {
        except: ['$super', '$', 'exports', 'require', 'module', '_']
      },
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
};
