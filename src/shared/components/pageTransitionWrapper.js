/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import pageExitStart from '../actions/pageExitStart';

class PageWrapper extends React.Component {
    constructor(props) {
        super(props);       
    }
    render() {       
        return (<CSSTransition  
            {...this.props}          
            classNames="pageTransition"
            timeout={850}
            onExit={() => {pageExitStart()}}       
            mountOnEnter={true}
            unmountOnExit={true}            
        />
       );        
    }
}

export default PageWrapper;