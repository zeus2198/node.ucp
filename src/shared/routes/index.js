/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { matchPath } from 'react-router';


import Footer from '../components/footer';
import SideBar from '../components/sideBar';
import NotFound from '../components/NotFound';
import PageWrapper from '../components/pageTransitionWrapper';
import SideBarWrapper from '../components/sideBarWrapper';

import routes from "./routes";
import ProtectedRoute from './ProtectedRoute';
import pageTransitionWrapper from '../components/pageTransitionWrapper';



export default (props) => {
    let pageWrapperKey;
    if (typeof window != 'undefined') {
        // here we will get current route
        // we do this to control remounting behaviour caused by PageTransition
        // using this we will get a key for same route with different params
        // say when you navigate from /search/one to /search/two 
        // the key in both cases should be same to prevent remounting
        const currentRoute = routes.find(r => matchPath(props.location.pathname, r)); // getting current route
        pageWrapperKey = currentRoute ? currentRoute.path : props.location.pathname;
    }
    else pageWrapperKey = props.location.pathname; 
    // to prevent sidebar animation on every route change
    const transformSideBar = props.location.pathname == "/login" ? "Y" : "N";
    return (
        <div>
            <TransitionGroup>
                <SideBarWrapper key={transformSideBar}>
                    <Switch location={props.location}>
                        <Route path="/login" render={() => (<div></div>)} />
                        <Route component={SideBar} />
                    </Switch>
                </SideBarWrapper>
            </TransitionGroup>
            <div className="bodyContent">
                <TransitionGroup>
                    <PageWrapper key={pageWrapperKey}>
                        <div>
                        <Switch location={props.location}>
                            {
                                routes.map((route, index) =>
                                    route.protected ?
                                        <ProtectedRoute key={index} component={route.component} path={route.path} exact={route.exact} title={route.title} userID={props.staticContext ? props.staticContext.userID : null} />
                                        :
                                        <Route key={index} path={route.path} exact={route.exact} render={props => React.createElement(route.component, { ...props, title: route.title })} />
                                )
                            }
                        </Switch>
                        </div>
                    </PageWrapper>
                </TransitionGroup>
            </div>
            <Footer />
        </div>
    )
};