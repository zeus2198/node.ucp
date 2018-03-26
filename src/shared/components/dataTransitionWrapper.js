/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import { Transition } from 'react-transition-group';

class DataWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {      
        return (<Transition
            in={!this.props.loading}          
            timeout={300}
        >{(state) => (
            <div className={`data-wrapper ${(state == "entering" || state == "entered") && state}`}>
                <div className="data">
                    {this.props.data}                    
                </div>
                <div className={`loader ${this.props.alignment && this.props.alignment}`}></div>
            </div>
        )}
        </Transition>);
    }
}

export default DataWrapper;