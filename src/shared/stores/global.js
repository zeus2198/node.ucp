/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/

import { EventEmitter } from 'events';
import dispatcher from '../actions/dispatcher';

//this is store to share info that is shared between different components in react
//this is also used to emit some events globally that various components can subscribe to.
class GlobalStore extends EventEmitter {
    constructor() {
        super();
        this.state = {
            authenticated: false,           
            userID: null,//userid of logged in user
            nAvatar: null //new avatar src when a new avatar is uploaded
        };
        this.handleActions = this.handleActions.bind(this);
    }

    handleActions(action) {
        switch(action.type) {
            case 'AUTHENTICATED': {
                //called when user is logged in
                this.state = {
                    authenticated: true,                   
                    userID: action.userID
                };
                break;
            }
            case 'P_EXIT': {                
                this.emit('pexit');//emitted when a page starts to exit
                break;
            }
            case 'AVATAR_CHANGE': {
                this.state = { 
                    ...this.state,
                    nAvatar: action.src        
                }
                this.emit('avatarChange');  
                break;              
            }
            case 'LOGOUT': {               
                this.state = {
                    authenticated: false
                };
                this.emit('userLogout');
                break;
            }
            
        }
    }
}

const gStore = new GlobalStore();
dispatcher.register(gStore.handleActions);//bind handleActions to handle actions whenever it is disptached by dispatcher

export default gStore;