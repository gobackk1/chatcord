const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const enableSouceMap = isDevelopment

module.exports = {
  entry: './src/main.ts',
  // context: path.resolve(__dirname, './src'),
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: enableSouceMap
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true,
                sourceMap: enableSouceMap
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: enableSouceMap
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      grid: true
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src/'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  target: ['web', 'es5'],
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`
    }),
    ...(isProduction
      ? [
          new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          })
        ]
      : [
          new HtmlWebpackPlugin({
            template: './public/index.html'
          }),
          new ESLintPlugin({
            extensions: ['.ts', '.js', '.vue'],
            exclude: 'node_modules'
          }),
          new StylelintPlugin({
            extensions: ['.vue']
          })
        ])
  ],
  ...(isProduction
    ? {
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  // TODO: 効果がないので調べる。解決するまで eslint no-console: warn で代用する。
                  drop_console: true
                }
              }
            })
          ]
        }
      }
    : {
        devtool: isDevelopment ? 'source-map' : false,
        devServer: {
          static: {
            directory: path.join(__dirname, 'public')
          },
          port: 8081,
          open: true,
          hot: true,
          historyApiFallback: true
        }
      })
}
