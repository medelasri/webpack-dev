const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpack_config = require('./webpack.config');
const config = require('./config');
const path = require('path');

var compiler = webpack(webpack_config);
var server = new WebpackDevServer(compiler, {
	hot: true,
	filename: webpack_config.output.filename,
	publicPath: webpack_config.output.publicPath,
	noInfo: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: /node_modules/
	},
	stats: { colors: true, warnings: true }
});

server.listen(config.server_port, config.hostname, function(err) {
	if(err){
		console.log(err);
	} else {
		console.log("Server listen on: " + config.hostname +":" + config.server_port);
	}
});