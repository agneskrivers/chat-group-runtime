/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [{
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: ['ts-loader', 'eslint-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64:4]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
        new MiniCSSExtractPlugin({
            filename: 'css/style.css',
        }),
    ],
};