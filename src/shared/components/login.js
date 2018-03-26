/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import authenticated from '../actions/login';
import GlobalStore from '../stores/global';

class login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            errors: {},
            isChecking: false,
            remember: false,
            authenticated: GlobalStore.state.authenticated,
            title: props.title
        };

        //we need to bind the instance of current class explictly 
        //since it wont be binded automatically because react doesn't 
        //have auto binding, as of yet.
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleRemember = this.toggleRemember.bind(this);
    }

    componentDidMount() {
        document.title = this.state.title();
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({ isChecking: true });

        let errors = {};

        //now firstly we have to check if input fields are empty or not
        if (!this.state.userName) errors.userName = "This field cannot be empty!";
        if (!this.state.password) errors.password = "This field cannot be empty!";

        if (Object.keys(errors).length) return this.setState({ errors: errors, isChecking: false });

        //now lets send post request to api for authentication
        axios.post('/api/login', {
            userName: this.state.userName,
            password: this.state.password,
            remember: this.state.remember
        }).then((res) => {
            //user logged in successfully           
            //action to change authenticated value in global store                
            authenticated(res.data.userID);
            $.notiny({ text: 'You have been logged in!', position: 'right-top', theme: 'success' });
            this.setState({ authenticated: true, isChecking: false });

        }).catch((err) => {
            //failed to login                      
            if (err.response.status == 401) errors.auth = "Invalid credentials";
            else errors.auth = "Looks like our database is down, try again later";
            $.notiny({ text: errors.auth, position: 'right-top', theme:'alert'});
            this.setState({ isChecking: false });
        });

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleRemember(e) {
        this.setState({ remember: !this.state.remember });
    }

    render() {
        //equivalent of const userName = this.state.userName, password=...
        const { userName, password, errors, isChecking, remember, authenticated } = this.state;

        //if user is authenticated then redirect him to index page
        return authenticated ? (<div><Redirect to="/" /></div>) : (
            <div>
                <div className="form-container">
                    <form className="form-signin" onSubmit={this.onSubmit}>
                        <center><h2 className="form-signin-heading">LOGIN</h2></center>
                        <br />
                        <div className={`input-group ${errors.userName && "field-error"}`}>
                            <input type="text" className="form-control" placeholder="Username" aria-describedby="userName"
                                name="userName" value={userName} onChange={this.onChange} disabled={isChecking} />
                            <span className="input-group-addon" id="userName"><i className="fa fa-user"></i></span>
                        </div>

                        <div className={`input-group ${errors.password && "field-error"}`}>
                            <input type="password" className="form-control" placeholder="Password" aria-describedby="password"
                                name="password" value={password} onChange={this.onChange} disabled={isChecking} />
                            <span className="input-group-addon" id="password"><i className="fa fa-unlock-alt"></i></span>
                         </div>

                        <label><input type="checkbox" onChange={this.toggleRemember} checked={remember} disabled={isChecking} />&nbsp;&nbsp;Remember me</label>

                        <br /> <br />

                        <center><button type="submit" className="customB" disabled={isChecking}><h4 className="spacing">Submit</h4></button></center>
                    </form>
                </div>
            </div>
        );
    }
}
export default login;
