'use strict'
const webpack = require('webpack')
const config = require('./config')
const path = require('path')
const ExtractCSSPlugin = require('./extractCSSPlugin')

const sassLoader = { includePaths: [path.resolve(__dirname, '../src') ]}
const postcss = {
    plugins: [
        require('autoprefixer')({
            browsers: config.browsers
        })
    ]
}
const eslint = { formatter: require('eslint-friendly-formatter') }

let webpack_base = {
	devtool: config.debug ? 'cheap-module-eval-source-map' : false,
	entry: config.entry,
    resolve: {
        modules: ["node_modules"],
        extensions: ['.js', '.vue', '.scss', '.html'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'vue$': 'vue/dist/vue'
        }
    },
	module: {
		rules: [{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            enforce: 'pre'
        }, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.vue$/,
        	loader: 'vue-loader',
		}, {
            test: /\.scss$/,
            loader: ExtractCSSPlugin.extract({
                fallbackLoader: "style-loader",
                loader: ['css-loader', 'postcss-loader', 'sass-loader']
            })
        }, {
            test: /\.css$/,
            loader: ExtractCSSPlugin.extract({
                fallbackLoader: "style-loader",
                loader: ['css-loader', 'postcss-loader']
            })
        }, {
            test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10,
                name: '[name].[hash:7].[ext]'
            }
        }, {
			test: /\.html$/,
			loader:  'html-loader'
		}]
	},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: config.debug ? false : true,
            options: {
                sassLoader: sassLoader,
                postcss: postcss,
                eslint: eslint,
                vue: {
                    loaders: {
                        scss: ExtractCSSPlugin.extract({
                            fallbackLoader: "vue-style-loader",
                            loader: ['css-loader', 'postcss-loader', 'sass-loader']
                        }),
                        js: 'babel-loader'
                    },
                    postcss: postcss
                },
                context: '/'
            }
        }),
        new ExtractCSSPlugin({
            filename: '[name].[contenthash:8].css',
            disable: config.debug
        })
    ],
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" }
    },
	output: {
		path: path.join(__dirname, '../' + config.assets_path),
		publicPath: config.assets_url,
		filename: config.debug ? '[name].js' : '[name].[chunkhash:8].js'
	}
}

module.exports = webpack_base
