/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/
import React from 'react';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            title: props.title
        };
    }

    componentDidMount() {            
        document.title =  this.state.title();
    }
    
    render() {
        return (
            <div>
                <br />
                <div className="cont notFound d-flex align-items-center justify-content-center">
                    <img className='img-fluid' alt='404 Page Not Found' src='/public/img/whoosh2.png' />
                </div>
            </div>
        )
    }
}

export default NotFound;
