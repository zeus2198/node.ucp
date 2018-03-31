# node.ucp
<img src="https://i.imgur.com/BEbdNkN.jpg" width="100%">

This is a full-fledged [isomorphic](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) javascript control panel written on top of [nodejs](https://nodejs.org/) and [react](https://reactjs.org/). The purpose of this control panel is to serve as an example or boilerplate code for others as it is fully-fledged and very flexible. I wrote the code to be easily adaptable for different use-cases and database types and structures.

You can find solutions written by me to many problems related to server side rendering, react, handling cache busting of volatile resources in [service workers](https://developers.google.com/web/fundamentals/primers/service-workers/) and handling sessions manually in the source code of this application.

The code uses ES6's [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) vastly, so get familiar with these concepts if you are not already!

I have tried to comment as much as possible to explain the working of the application in the source code, however if things are not clear feel free to ask.

## Demo
Login information:

**Username:** Jonas

**Password:** test

[Click here for the demo.](https://node-ucp.fgethell.xyz)

[Click here for the images in-case the demo is not working.](https://imgur.com/a/i90lF)

## Prerequisites
* [nodejs `v6.11.3` or later](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/) version `5.6.5` or later if you wish to use the sample database.
* If you are using windows, then you need to install windows build tools too for compiling and building some of the depedencies. Install it using the following command:
```bash
npm install --global --production windows-build-tools
```

## Installing 
1. Navigate to an empty folder where you want the source code to be placed.
2. Clone the repository using the following command:
```bash
git clone https://github.com/xxxZeus/node.ucp 
```
OR

Download the repository manually from the green `Clone or Download` button located in the top right part of the repository and extract the content in an empty folder.
3. Make sure you are in the root the project and type the following command to install the packages needed by the application:
```bash
npm install
```
Packages installation may take some time.
5. Import the sample database(`./sample-database.sql`) into your MySQL server.
4. Open `./config/config.json` file and edit the configuration file as per as your system settings.
## Starting the application
**Developer Mode:**

To start the application in developer mode use the following command:
```bash
npm run start-dev
```
In developer mode, the following things happen:
* The application automatically restarts whenever there is a change in the any file inside the `./src` folder.
* The client-server shared part of the application is automatically bundled on the application start.
* The application uses `global.css` instead of `global.min.css` which is not cached by default. Note that if you decide to use `nginx` for serving static file(as described later) it may cache the .css files depending on the nginx configuration.
* Automatic cache busting for the bundle file takes place on the application restart. This cache busting is detected by the service worker(`./public/js/sw.js`) and the bundle file is then replaced in our cache!

**Production Mode:**

Before starting the application in production mode you need to bundle the client-server shared part of the application under one file so that it can be served to the client, to do so use the following command:
```bash
npm run make
```
Note that the above command will also minify the `./public/css/global.css` file content and store it as `./public/css/global.min.css`.

After the bundling is done use the following command to start the application:
```bash
npm start
```
In production mode, the following things happen:
* The application uses `global.min.css` and not `global.css` which is a cached resource.
* Cache busting for bundle file will still take place but only for the bundle file created using the command `npm run make`.
* Express's(our web-server API used in the application) [production mode](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production) is enabled.

# Artwork
You can find the photoshop files of the artwork used in this project from [here](https://github.com/xxxZeus/xxxZeus.github.io/raw/master/node.ucp.artwork.rar)

# Notes
* The `./src/shared/` directory contains the code common in client and server part so be sure that you do not expose any sensitive information in this section.
* The application uses [service workers](https://developers.google.com/web/fundamentals/primers/service-workers/) which only works on localhost and https enabled domains, so make sure you are using https protocol with your domain.
* ~~Protected routes are not rendered on the server-side.~~
* To **clear cache**, open `./public/js/sw.js` and edit the version string. Then close all the application tab opened in browser and open the application again. Use this to clear `global.min.css` out of cache when you edit the `global.css` file.
* [Getting free SSL certificate and using nginx to reverse proxy a domain to your application.](https://youtu.be/kR06NoSzAXY?t=966)

### Using different databases

The `./src/db/db.api.abstract.js` file contains an [abstract class](http://www.theserverside.com/definition/abstract-class) for our database API, read the comments for method specifications. Then require this file in your custom database api layer and override the abstract methods. See `./src/db/mysql.api.js` file for implementation example. Note that each method should return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

After you are done with writing API for your DB, head to `./config/config.json` and edit `databaseAPI` option to match name of the file containing your DB API layer. The file should be placed in `./src/db/` directory.

### Serving static files using nginx

I recommend using nginx to serve static files instead of nodejs. To do so you can add the following location block to your sever block configuration:
```
location /public {
	alias  /path/to/your/app/public;
}
```
If you decide to go with nginx for serving static files you might wanna shift the gzip compression for your application to nginx too. If you do so, which you should, then disable compression on the application side by commenting out the following two lines from `./node.ucp.js` file:
```javascript
//./node.ucp.js
// comment out the following lines if you use nginx for gzip compression
import compression from 'compression';

app.use(compression());
```

### Using process manager to make sure app runs forever in production mode
 
In production mode, you might want to have a process manager that can restart application if it crashes, I recommend using [pm2](http://pm2.keymetrics.io/) for this purpose. 
Install the pm2 using the following command:
```bash
npm install pm2 -g
```
Now before using pm2 to start your application in production mode make sure that the application actually starts and runs else your application will get stuck in start and restart loop.

I have already created a configuration file for pm2 to start the application, to start the application in production mode with pm2 type:
```bash
pm2 start node.ucp.pm2.json
```