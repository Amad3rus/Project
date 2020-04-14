const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
		template: './public/index.html'
	});

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '/dist'),
		publicPath:'/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'stage-0']
				}
			},
			{
				test:/\.html$/,
				exclude: /node_modules/,
				loader:'html-loader',
			}
		]
	  },
	plugins: [HTMLWebpackPluginConfig]
}
