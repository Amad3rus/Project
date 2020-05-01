const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
		"template": './public/index.html'
	});

module.exports = {
	// entry: ['regenerator-runtime/runtime', './src/app.js'], // sem pdf
	"entry":{
		"pdf.worker":"pdfjs-dist/build/pdf.worker.entry.js",
		"runtime":"regenerator-runtime/runtime",
		"app":"./src/app.js",
	},
	"output": {
		"filename":'[name].bundle.js',
		// "path": path.resolve(__dirname, '/dist'), // não junta os path
		"path":path.join(__dirname, 'dist'), // join junta os paths
		"publicPath":'/'
	},
	"module": {
		"rules": [
			{
				"test": /\.js$/,
				"exclude": /node_modules/,
				"loader": 'babel-loader',
				"query": {
					"presets": ['es2015', 'stage-0']
				}
			},
			{
				"test":/\.html$/,
				"exclude": /node_modules/,
				"loader":'html-loader',
			}
		]
	  },
	"plugins": [HTMLWebpackPluginConfig]
}
