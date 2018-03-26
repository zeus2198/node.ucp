/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/
import dispatcher from './dispatcher';
//this dispatches actions, which are recevied by stores

export default src => {
    dispatcher.dispatch({
        type: 'AVATAR_CHANGE',
        src: src
    });
}