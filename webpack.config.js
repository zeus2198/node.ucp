const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const fs = require('fs');
const csso = require('csso');

// editing index.template.html file
// to do a cache buster for bundle.js as bundle.js is cached by service worker
// this cache buster is detected by service worker and it replaces bundle.js in cahce
fs.readFile('./public/index.template.html', function (err, data) {
    if (err) return console.log('Unable to read index.template file', err);
    // cache buster:
    fs.writeFile('./public/index.template.html',
        data.toString('utf8').replace(/bundle\.js.*"/g, "bundle\.js\?v=" + Math.floor(Date.now() / 1000) + "\"")
            .replace(/css\/global.*?"/g, 'css\/global.min.css"'),
        (err) => {
            if (err) console.log("Unable to write to index.template.html", err);
        });
});

// minify css:
fs.readFile('./public/css/global.css', function (err, data) {
    if (err) return console.log('Unable to read global.css', err);
    fs.writeFile('./public/css/global.min.css',
        csso.minify(data.toString('utf8'), { restructure: false }).css,
        (err) => {
            if (err) console.log("Unable to write to global.min.css", err);
        });
});

module.exports = {
    entry: [
        path.join(__dirname, 'src', 'shared', 'client.js')
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            loader: ['babel-loader?presets[]=es2015,presets[]=react']
        }]
    },
    plugins: [
        new WriteFilePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};