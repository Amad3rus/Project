var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlwebpackPlugin({
		template: './public/index.html'
	});

module.exports = {
	entry: './src/main.js',
	output: {
		filename: './public/assets/js/bundle.js'
	},
	module:{
		loaders:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query:{
					presets:['es2015', 'stage-0']
				}
			}
		]
	},
	plugins: [HTMLWebpackPluginConfig]
}
