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
    /**
     * Determine if is production mode from the command executed
     */
    const devMode = argv.mode === 'development';

    /**
     * Common paths
     */
    const paths = {
        src: 'resources',
        dev: 'assets',
        prod: 'assets'
    };

    /**
     * Generate the settings for webpack depending on if it is
     * development or production mode.
     */
    const settings = {
        mode: devMode ? 'development' : 'production',
        outputDir: devMode ? paths.prod : paths.dev,
        fractal: {
            mode: devMode ? 'server' : 'build',
            sync: devMode ? true : false
        }
    };


    return {
        // Mode is set by --mode property in command
        // mode: settings.mode,
        /**
         * 3 entries:
         *      designSystem: This is Design System UI specific CSS
         *      website: This is website & component specific CSS
         *      app: This is the website & component specific JS
         */
        entry: {
            style: [path.resolve(__dirname, `${paths.src}/sass/app.scss`)],
            script: [path.resolve(__dirname, `${paths.src}/scripts/app.js`)],
        },

        /**
         * JS output goes into the scripts folder and depending on mode will
         * either go into the public or the dist folder with it's chunks
         */
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
                /*{
                    /**
                     * Load JS files with Babel Loader and set to transpile code to work
                     * in IE10 and above.
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                configFile: './babel.config.js',
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            useBuiltIns: 'entry',
                                            corejs: '^3.1.4',
                                            targets: {
                                                browsers: ['defaults, ie >= 10']
                                            }
                                        }
                                    ]
                                ]
                            }
                        },
                        {
                            loader: 'eslint-loader',
                            options: {
                                configFile: '.eslintrc.json'
                            }
                        }
                    ]
                },*/
                {
                    /**
                     * Load SASS files with 2 loaders
                     *      PostCSS: This converts the SCSS to CSS, adds in polyfills for flexbox,
                     *               auto prefixes and adds in normalise CSS.
                     *      SASS Loader: This generates source maps for CSS.
                     */
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
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    require('postcss-preset-env')({
                                        autoprefixer: {
                                            flexbox: 'no-2009'
                                        },
                                        stage: 3
                                    }),
                                    require('autoprefixer')()
                                ],
                                sourceMap: true,
                                minimize: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    minimize: false,
                                    indentWidth: 2,
                                    outputStyle: 'expanded'
                                }
                            }
                        }
                    ]
                },
                /**
                {
                     * This looks for all images and uses the File Loader to move them to
                     * the output directory. It excludes the fonts directory so there is no
                     * duplication of SVG files
                     
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    exclude: /fonts/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[folder]/[name].[ext]',
                                outputPath: '/images'
                            }
                        }
                    ]
                },
                */
                {
                    /**
                     * This looks for all font files and uses the File Loader to
                     * move hem to the output directory. It excludes the images directory
                     * so there is no duplication of SVG files
                     */
                    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                    /*exclude: /images/,*/
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[folder]/[name].[ext]',
                                outputPath: '/fonts'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            /**
             * This prevents webpack from generating a JS file for SCSS entries
             */
            new FixStyleOnlyEntriesPlugin(),
            /**
             * Runs SASS linting
             */
            //new StyleLintPlugin({
            //    configFile: '.stylelintrc.json',
            //    context: `${paths.src}`,
            //    files: '**/*.scss',
            //    failOnError: false,
            //    quiet: false,
            //    emitErrors: true
            //}),
            /**
             * This outputs SCSS entires into CSS files and thier chunks
             */
            new MiniCssExtractPlugin({
                filename: `css/[name].css`,
                chunkFilename: `css/[name].chunk.css`,
                allChunks: true
            }),
            /**
             * Copies images over to the output directory
            new CopyWebpackPlugin({
                patterns: [{
                    from: path.resolve(__dirname, `./${paths.src}/images`),
                    to: 'images'
                }]
            }),
             */
            /**
             * Copies fonts over to the output directory
             */
            new CopyWebpackPlugin({
                patterns: [{
                    from: path.resolve(__dirname, `./${paths.src}/fonts`),
                    to: 'fonts'
                }]
            }),
        ],

        /**
         * This only runs when in production mode and will minify JS and CSS
         */
        optimization: {
            minimize: true,
            minimizer: [
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /style\/(website|designSystem|style).css/,
                    cssProcessor: require('cssnano')
                }),
                new TerserPlugin({
                    include: /\/js/,
                    exclude: /\/scss/
                })
            ]
        },

        /**
         * Generates source maps
         */
        devtool: 'source-maps'
    }
}

