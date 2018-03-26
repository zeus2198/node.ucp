/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/
import dispatcher from './dispatcher';
//this dispatches actions, which are recevied by stores

export default () => {
    dispatcher.dispatch({
        type: 'LOGOUT'
    });
}