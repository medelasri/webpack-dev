const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

var pathRoot = path.resolve(__dirname, '../')

var entry = PRODUCTION
	?	config.entry
	:	[
			config.entry,
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://' + config.hostname +':' + config.client_port
		];

var plugins = PRODUCTION
	? 	[
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				comments: false,
				compress: {
		        	warnings: false
		      	}
			}),
			new ExtractTextPlugin('style-[contenthash:10].css')
		]
	: 	[ new webpack.HotModuleReplacementPlugin() ];

plugins.push(
	new webpack.DefinePlugin({
		DEVELOPMENT: JSON.stringify(DEVELOPMENT),
		PRODUCTION: JSON.stringify(PRODUCTION)
	}),
	new webpack.LoaderOptionsPlugin({
		minimize: PRODUCTION ? true : false,
  		options: {
    		postcss: [
				require('autoprefixer')({ 
					browsers: ['last 2 versions'] 
				})
			]
  		}
	})
);

const sassLoader = PRODUCTION
	? 	ExtractTextPlugin.extract({
      		loader: 'css-loader?importLoaders=1!sass-loader!postcss-loader',
      		fallbackLoader: 'vue-style-loader'
    	})
	:   'style-loader!css-loader?importLoaders=1!sass-loader!postcss-loader';

let webpack_config = {
	devtool: 'source-map',
	entry: entry,
	plugins: plugins,
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			include: pathRoot,
			exclude: /node_modules/
		}, {
			test: /\.vue$/,
        	loader: 'vue-loader',
        	options: {
	          	loaders: {
	            	sass: sassLoader
				}
	        }
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			query: {
          		limit: 10000,
          		name: '../assets/img/[name].[hash:7].[ext]'
        	}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	        loader: 'url-loader',
	        query: {
	          limit: 10000,
	          name: '../assets/fonts/[name].[hash:7].[ext]'
	        }
		}]
	},
	resolve: {
 		modules: ["node_modules"],
		extensions: ['.js', '.vue', '.scss'],
		alias: {
			'assets': path.resolve(__dirname, '../assets'),
			'vue$': 'vue/dist/vue'
		}
	},
	output: {
		path: path.join(__dirname, '../' + config.assets_path),
		publicPath: PRODUCTION ? config.assets_path : config.assets_url,
		filename: PRODUCTION ? config.filename + '.[hash:12].min.js' : config.filename + '.js'
	}
};

module.exports = webpack_config;