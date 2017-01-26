const webpack = require('webpack')
const config = require('./config')
const path = require('path')

// Sass Loader Config
var sassLoaderConfig = {
    includePaths: [path.resolve(__dirname, '../src')]
};

// postCss Loader Config
var postcssConfig = [];
if (config.css.autoprefixer) {
    postcssConfig.push(
        require('autoprefixer')({
            browsers: ['last 2 versions']
        })
    )
}

// Eslint Config
var eslintConfig = { formatter: require('eslint-friendly-formatter') }

// Webpack Config
let webpack_base = {
	devtool: config.debug ? 'eval-cheap-module-source-map' : false,
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
        	options: {
	          	loaders: {
	            	scss: ['style-loader!css-loader?importLoaders=2?sourceMap!postcss-loader!sass-loader?sourceMap']
				}
	        }
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
                sassLoader: sassLoaderConfig,
                postcss: postcssConfig,
                eslint: eslintConfig,
                context: '/'
            }
        })
    ],
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" }
    },
	output: {
		path: path.join(__dirname, '../' + config.assets_path),
		publicPath: config.assets_url,
		filename: config.filename + '.[chunkhash].min.js'
	}
};

module.exports = webpack_base