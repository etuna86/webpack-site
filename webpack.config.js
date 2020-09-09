var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const PrettierPlugin = require('prettier-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode === 'development';

    const paths = {
        src: 'resources',
        dev: 'assets',
        prod: 'assets'
    };

    const settings = {
        mode: devMode ? 'development' : 'production',
        outputDir: devMode ? paths.prod : paths.dev,
        fractal: {
            mode: devMode ? 'server' : 'build',
            sync: devMode ? true : false
        }
    };

    return {
        mode: settings.mode,
        entry: {
            style: [path.resolve(__dirname, `${paths.src}/sass/app.scss`)],
            script: [path.resolve(__dirname, `${paths.src}/scripts/app.js`)],
        },
        output: {
            path: path.resolve(__dirname, `./${settings.outputDir}`),
            filename: 'scripts/[name].js',
            chunkFilename: 'scripts/[name].chunk.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|mjs|jsx)$/,
                    loader: 'string-replace-loader',
                    options: {
                        search: '#!/usr/bin/env node',
                        replace: '',
                    }
                },
                {
                    parser: {
                        amd: false
                    }
                },
                {
                    test: /\.(sa|sc)ss$/i,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    //indentWidth: 2,
                                    outputStyle: 'compressed'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({
                filename: `css/[name].css`,
                chunkFilename: `css/[name].chunk.css`,
                allChunks: true
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: './node_modules/@fortawesome/fontawesome-free/webfonts', to: './fonts/font-awesome'}
                ]
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            })
        ],
        devtool: 'source-maps'
    }
}

