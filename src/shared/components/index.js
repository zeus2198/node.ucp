/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/
import React from 'react';
import axios from 'axios';

import DataWrapper from './dataTransitionWrapper';

class Index extends React.Component {
    constructor(props) {
        super(props);

        let initialData;
        if (props.staticContext) {
            initialData = props.staticContext.initialData;
        }
        else {
            initialData = window.initialData;
            delete window.initialData;
        }

        this.state = {
            stats: initialData,
            title: props.title
        };

    }

    static fetchData(req, params) {
        return axios.get(`${req ? `${req.protocol}://${req.headers.host}` : ""}/api/indexStats`).then(response => response.data).catch((err) => {
            return { error: true };
        });
    }

    componentDidMount() {            
        document.title =  this.props.title();
            
        if (!this.state.stats) {
            Promise.resolve(Index.fetchData(null, this.state.params)).then(response => this.setState({ stats: response }));
        }
    }

    render() {
        const loading = !this.state.stats;
        return (
            <div>
                <br />
                <div className="cont">
                    <div className="indexWrapper">
                        <div className="logoWrapper">
                            <img src='/public/img/nodeLogo.png' alt="Logo.png" />
                        </div>
                        <div className="statsWrapper">
                            <div className="row">
                                <div className="col-12 col-md-4 ">
                                    <span className="stat"><DataWrapper loading={loading} data={loading ? "Loading" : this.state.stats.error ? 'N/A' : this.state.stats.stat1} /></span>
                                    <span className="label">Properties</span>
                                </div>
                                <div className="col-12 col-md-4">
                                    <span className="stat"><DataWrapper loading={loading} data={loading ? "Loading" : this.state.stats.error ? 'N/A' : this.state.stats.stat2} /></span>
                                   <span className="label">Players Registered</span>
                                </div>
                                <div className="col-12 col-md-4">
                                    <span className="stat"><DataWrapper loading={loading} data={loading ? "Loading" : this.state.stats.error ? 'N/A' : this.state.stats.stat3} /></span>
                                   <span className="label">Something</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Index;