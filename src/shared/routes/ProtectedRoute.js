/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import GlobalStore from '../stores/global.js';

//a type of super component used to wrap content which 
//should be accessible only if user is logged in

const ProtectedRoute = (pProps) => {
    return (
        <Route
            path={pProps.path}
            exact={pProps.exact}
            render={props =>
                typeof document == "undefined" ? (
                    typeof pProps.userID == "undefined" ?
                        (<div><h2>You are not allowed to view this page</h2></div>) :
                        React.createElement(pProps.component, { ...props, title: pProps.title })
                ) : GlobalStore.state.authenticated ?
                        React.createElement(pProps.component, { ...props, title: pProps.title })
                        : (
                            <div><h2>You are not allowed to view this page</h2>
                                <Redirect to="/" /></div>
                        )
            }
        />
    )
};

export default ProtectedRoute;