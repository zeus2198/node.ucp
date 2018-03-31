import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MyRoutes from './routes';
import authenticated from './actions/login';
import axios from 'axios';

render( (<BrowserRouter><Route component={MyRoutes} /></BrowserRouter>), document.getElementById('main'));