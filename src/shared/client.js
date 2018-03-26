import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MyRoutes from './routes';
import authenticated from './actions/login';
import axios from 'axios';

//this code runs on page load :

//authenticating user on lage load
let splash = document.getElementById("splashScreen");
window.onload = () => {
	axios.get('/api/auth').then((res) => {
		//user is authenticated
		if (res.data.authenticated) authenticated(res.data.id);
		//render our react rounter
		render( (<BrowserRouter><Route component={MyRoutes} /></BrowserRouter>), document.getElementById('main'), () => {
			//making load screen disapper after everything is initalized          
            splash.className += " fadeOut";
			setTimeout(() => {
				splash.style.display = "none";
			}, 700);
		});
	}).catch((err) => {
        console.log(err);
		//something went wrong lets add error class which will transit everything in loading screen to a nice error screen
		//edit /public/global.css for customization of error screen
		document.querySelector(".err-text").innerHTML = "<center>SOMETHING WENT WRONG<br>ERROR CODE "+err.response.status+"</center>";
		splash.className += " error";
	});
}