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
				"test": /\.js$/i,
				"exclude": /node_modules/,
				"loader": 'babel-loader',
				"query": {
					"presets": ['es2015', 'stage-0'],
					"plugins": ['transform-custom-element-classes', 'transform-es2015-classes']
				}
			},
			{
				"test":/\.html$/i,
				"exclude": /node_modules/,
				"loader":'html-loader',
			},
			{
				"test": /\.css$/i,
				"use":['style-loader', 'css-loader']
			}
		]
	},
	"devServer":{
		"compress":true,
		"port":9000,
		"historyApiFallback": {
			"rewrites": [
			  { "from": /^\/$/, to: 'landing.html' },
			//   { "from": /^\/subpage/, to: 'index.html' },
			  { "from": /./, to: '404.html' }
			]
		},
		// "before": function(app, server, compile){
			
		// 	app.get('/routes', function(req, res){
		// 		res.json({"status":'está funcionando.'});
		// 	});

		// 	app.get('/', function(req, res){
		// 		res.json({"status":'está funcionando.'});
		// 	});

		// 	app.use(function(req, res, next){
		// 		res.status(404).send({"message":'404 page not found'});
		// 	});
		// },
	},
	"plugins": [
		HTMLWebpackPluginConfig
	]
}
