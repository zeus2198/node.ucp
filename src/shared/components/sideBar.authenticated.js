/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import { Link } from 'react-router-dom';

import GlobalStore from '../stores/global.js';

/* component which shows link to user's profile and change password 
 * when logged in when he/she/it is logged in 
 */
class sidebar_authenticated extends React.Component {
    constructor(props) {
        super(props);
        this.state = {           
            userID: props.userID,
            toggleSidebar: props.toggleSidebar
        };
        this.avatarChange = this.avatarChange.bind(this);
    }

    avatarChange() {       
        this.forceUpdate();
    }

    componentDidMount() {
        GlobalStore.on('avatarChange', this.avatarChange);
    }
    componentWillUnmount() {
        GlobalStore.removeListener('avatarChange', this.avatarChange);
    }    

    render() {
        return (
            <center>
                <Link to={ "/user/" + this.state.userID } onClick={this.state.toggleSidebar}><img className="avatar" src={ GlobalStore.state.nAvatar ?  GlobalStore.state.nAvatar : "/api/avatars/"+this.state.userID } /></Link>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <Link className="customB2" to="/settings" onClick={this.state.toggleSidebar}>Settings</Link>
                    </div>
                    <div className="col-md-6">
                        <Link className="customB2" to="/logout" onClick={this.state.toggleSidebar}>Logout</Link>
                    </div>
                </div>
            </center>
        );
    }

}
export default sidebar_authenticated;