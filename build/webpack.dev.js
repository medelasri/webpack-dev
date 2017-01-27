'use strict'
const path = require('path')
const webpack = require('webpack')
const webpack_base = require('./webpack.base')
const config = require('./config')

webpack_base.output.publicPath = 'http://' + config.client_hostname + ':' + config.client_port + '/'
webpack_base.output.path = '/tmp/'
for (var name in webpack_base.entry) {
    webpack_base.entry[name] = [path.resolve(__dirname, './server-client'), ...webpack_base.entry[name]]
}
webpack_base.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
)

module.exports = webpack_base
