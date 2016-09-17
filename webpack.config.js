var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		main: [
			'./src/content/main'
		]
	},
	output: {
		filename: './src/public/js/[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css!sass')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('./src/public/css/style.css', { allChunks:true })
	]
};
