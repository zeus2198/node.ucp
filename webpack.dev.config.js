const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {
    entry: path.join(__dirname, 'src', 'shared', 'client.js'),
	output: {
        path: "/",
        filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: path.join(__dirname, 'src'),
			exclude : /node_modules/,
			loader: ['babel-loader?presets[]=es2015,presets[]=react']
		}]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin()		
	]
};