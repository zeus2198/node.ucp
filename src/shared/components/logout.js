/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */

import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import logout from '../actions/logout';

class footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggingOutDone: false,
            title: props.title
        }
    }

    componentDidMount() {
        document.title = this.state.title();
        axios('/api/logout').then(() => {
            this.setState({loggingOutDone: true});
            logout();
        }).catch((err) => {
            $.notiny({ text: 'Something went wrong, maybe you are not loogged in', position: 'right-top', theme: 'alert' });
            this.setState({loggingOutDone: true});
            logout();
            console.log(err);
        });
    }

    render() {
        return this.state.loggingOutDone ? (
            <div><Redirect to="/" /></div>
        ) : (
                <div>
                    <br />
                    <div className="cont d-flex align-items-center justify-content-center">
                        <br /> <br />
                        <h4>Logging out...</h4>
                        <br /> <br />
                    </div>
                </div>
            );
    }
}
export default footer;