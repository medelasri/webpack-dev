const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpack_dev = require('./webpack.dev')
const compiler = webpack(webpack_dev)
const hotMiddleware = require('webpack-hot-middleware')(compiler)
const config = require('./config')

var server = new WebpackDevServer(compiler, {
	hot: true,
	publicPath: webpack_dev.output.publicPath,
	noInfo: false,
	quiet: false,
	// Important for Vagrant
	watchOptions: {
		aggregateTimeout: 300,
		poll: 50,
		ignored: /node_modules/
	},
	stats: { colors: true, chunks: false }
})

server.use(hotMiddleware)

server.listen(config.server_port, function(err) {
	if(err){
		console.log(err);
		return
	} else {
		console.log("Server listen on: " + config.server_hostname + ":" + config.server_port);
	}
})
