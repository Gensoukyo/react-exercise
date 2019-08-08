const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: process.env.NODE_ENV,
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3000,
        hot: true,
        historyApiFallback: true,
        open: 'Chrome'
    },
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|svg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Just Build!',
            template: './src/index.html'
        })
    ]
}