/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import { CSSTransition } from 'react-transition-group';

class SideBarWrapper extends React.Component {
    constructor(props) {
        super(props);       
    }
    render() {      
        return (<CSSTransition
            {...this.props}
            classNames="sideBarTransition"
            timeout={600}
            mountOnEnter={true}
            unmountOnExit={true}         
        />);        
    }
}

export default SideBarWrapper;