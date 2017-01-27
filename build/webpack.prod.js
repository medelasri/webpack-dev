'use strict'
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const webpack_base = require('./webpack.base')
const config = require('./config')

webpack_base.plugins.push(
    new ProgressBarPlugin(),
    new webpack.optimize.UglifyJsPlugin(
        {
            sourceMap: true,
            comments: false,
            compress: {
                warnings: false
            }
        }
    )
)

module.exports = webpack_base
