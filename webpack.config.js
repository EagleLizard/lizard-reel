/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */

const path = require("path");

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PUBLIC_DIR = path.join('public');
const DIST_DIR = path.resolve(__dirname, PUBLIC_DIR);
const CSS_DIR = 'css';

module.exports = (env, argv) => {
  let webpackConfig;
  const isDevelopment = argv.mode !== 'production';

  const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
  });
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: isDevelopment ? `[name].css` : `[name].[hash].css`,
    chunkFilename: isDevelopment ? `[id].css` : `[id].[hash].css`,
    publicPath: `./${CSS_DIR}`,
  });
  const cleanWebpackPlugin = new CleanWebpackPlugin({
    protectWebpackAssets: false,
    cleanOnceBeforeBuildPatterns: [
      '**/*', // Include recursively
    ]
  });
  
  webpackConfig = {
    entry: './src/main.tsx',
    output: {
      path: DIST_DIR,
      filename: 'bundle.js'
    },
    devtool: isDevelopment ? 'source-map' : false,
    devServer: {
      contentBase: DIST_DIR,
      historyApiFallback: true,
      hot: true,
      open: true,
      host: '0.0.0.0',
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
              // loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: { importLoaders: 2 }, // tell if that you are running your styles through two other loaders before this one should run
            },
            {
                loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader' // compiles Sass to CSS
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 8192, // 2^13
          },
        }
      ]
    },
    resolve: {      
      alias: {
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom')
      },
      extensions: ['.ts', '.tsx', '.js', '.scss'],
    },
    // externals: {
    //   'react': "React",
    //   "react-dom": "ReactDOM"
    // },
    plugins: [
      htmlPlugin,
      miniCssExtractPlugin,
      cleanWebpackPlugin
    ]
  };
  return webpackConfig;
}
