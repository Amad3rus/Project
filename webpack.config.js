const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SendEmail = require('./src/services/send-email-service');

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
	"module":{
		"rules":[
			{
				"test":/\.js$/i,
				"exclude":/node_modules/,
				"loader":'babel-loader',
				"query":{
					"presets": ['es2015', 'stage-0'],
					"plugins": ['transform-custom-element-classes', 'transform-es2015-classes'],
					"compact" : true
				}
			},
			{
				"test":/\.html$/i,
				"exclude":/node_modules/,
				"loader":'html-loader',
			},
			{
				"test":/\.css$/i,
				"use":['style-loader', 'css-loader']
			}
		]
	},
	"devServer":{
		"compress":true,
		"port":9000,
		"historyApiFallback":true,
		"before":function(app) {
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({extended: true}));
			
			app.post('/api/v1/teste2', function(req, res) {
				console.log(req.body);
				res.send({status:true});
			});

			app.get('/api/v1/teste', function(req, res) {
				res.json({"status":'está funcionando.'});
			});
			
			app.post('/api/v1/reset_password', async function(req, res){
				const payload = { 
					req, 
					res, 
					from:'kakashi.kisura7@gmail.com',
					subject:'Teste de send e-mail',
					text:'This is a test!'
				};
				const response = await SendEmail.sendEmail(payload);
				res.send(response);
			});
			app.get('/mailer', function(req, res) {
				transporter.verify(function(error, success) {
					if (error) {
					  console.log(error);
					} else {
					  console.log("Server is ready to take our messages");
					}
				});
				
				res.json({"status":'está funcionando.'});
			});
		},
	},
	"plugins": [HTMLWebpackPluginConfig]
}
