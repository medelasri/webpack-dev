'use strict'
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack_base = require('./webpack.base')
const config = require('./config')

webpack_base.sassLoader = [
    ExtractTextPlugin.extract({
        loader: 'css-loader?importLoaders=2!postcss-loader!sass-loader',
        fallbackLoader: 'vue-style-loader'
    })
]

webpack_base.plugins.push(
    new ProgressBarPlugin(),
    new webpack.optimize.UglifyJsPlugin(config.uglifyJs),
    new ExtractTextPlugin('style-[contenthash:10].css'),
    new ProgressBarPlugin()
)

module.exports = webpack_base