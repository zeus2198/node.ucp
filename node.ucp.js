/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/
process.env['UV_THREADPOOL_SIZE'] = 128;

import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Route } from 'react-router-dom';
import serialize from 'serialize-javascript';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fs from 'fs';

import './src/initialize.js';
import config from './src/config.js';
import routes from './src/shared/routes/routes.js';
import AppRoutes from './src/shared/routes';
import APIHandler from './src/api';
import generateMetaData from './src/utils/generateMetaData';

const app = Express();

// lets first load our index page template 
let template = fs.readFileSync('./public/index.template.html', 'utf8');
if (!template) {
    console.error('[ERROR]: Unable to read index template file, make sure ./public/index.template.html file exists and has right permissions.');
    process.exit();
}

app.use(compression()); // enable gzip compression
app.use(bodyParser.json()); // parse POST data, doesn't parse multi-part data for uploading files see upload avatar api for handling file uploads
app.use(cookieParser()); // parse cookies

//=====================================================================
// only for DEV mode
// does compiling on server restart(hot reloading)
// also modfies template to use global.css instead of global.min.css and to setup cache buster for bundle.js
// this cache buster is handled by service worker see /public/js/sw.js for seeing exactly how
if (process.env.NODE_ENV != 'production') {

    //editing our page template for cache busting and using global.css instead of minified version
    template = template.replace(/bundle\.js.*"/g, "bundle\.js\?v=" + Math.floor(Date.now() / 1000) + "\"")
        .replace(/css\/global.*?"/g, 'css\/global.css"');
  
    const webpack = require('webpack'), 
        MemoryFS = require('memory-fs');

    const webpackConfig = require(`./webpack${process.env.NODE_ENV == 'production' ? '' : '.dev'}.config.js`);
    let compiler = webpack(webpackConfig),
        mfs = new MemoryFS(),
        bundle = "";

    compiler.outputFileSystem = mfs;
    compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
            console.error("[Webpack failed to compile]:\n", err.details || stats.toString({ chunks: false, colors: true }));
        }
        else {
            console.log("[Webpack compiled sucessfully]:\n", stats.toString({ chunks: false, colors: true }));
            bundle = mfs.readFileSync("/bundle.js");
            mfs.unlink("/bundle.js", () => { });
        }
    });
    app.use('/public/bundle.js', (req, res, next) => {
        const checkBundle = () => {
            if (bundle.length == 0) {
                setTimeout(checkBundle, 50); // delaying reply until bundle is compiled
            } else {
                res.write(bundle);
                res.end();
            }
        }
        checkBundle();
    });
}

//=====================================================================

//due to scoping issue service worker must be served from root directory and not public
const serviceWorker = __dirname + '/public/js/sw.js';
app.get('/sw.js', (req, res) => {
    res.sendFile(serviceWorker);
});

app.use('/api', APIHandler); // this makes calls to /api* redirect to our module in /src/handlers/api.js
app.use('/public', Express.static(__dirname + '/public')); // making 'public' directory public

app.get('*', (req, res) => {   

    const currentRoute = routes.map(r => ({ match: matchPath(req.url, r), route: r })).find(r => (r.match)); // getting current route
    // checking if current route needs any data to be pre-fetched, if yes then do it:    
    const initialData = currentRoute && currentRoute.route.component.fetchData && currentRoute.route.component.fetchData(req, currentRoute.match.params);
    Promise.resolve(initialData).then(initialData => {
        const context = { initialData };
        const markup = template
            .replace('<!--METADATA-->', generateMetaData(currentRoute.route.title(initialData, currentRoute.match.params), currentRoute.route.keywords(initialData, currentRoute.match.params), currentRoute.route.description(initialData, currentRoute.match.params)))
            .replace("'<!--InitialData-->'", serialize(initialData))
            .replace('<!--REACTSTRING-->', ReactDOMServer.renderToString(<StaticRouter location={req.url} context={context}><Route component={AppRoutes} /></StaticRouter>));
        res.set('Content-Type', 'text/html');
        res.write(markup);     
        res.end();
    }).catch(er => {
        res.send(`Something went wrong<br>URL:${req.url}<br>Error: ${er}`);
        console.log(`Something went wrong while server side rendering, error: ${er}`, req.url);
    });
});

app.listen(config.appPort, () => {
    console.log('\x1b[36m', `node.ucp is now running and listening to port ${config.appPort}`, '\x1b[0m');
});