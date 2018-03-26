/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import GlobalStore from '../stores/global';

function getFullCatName(cat) {
    switch(cat.toLowerCase()) {
        case 'cash':        
        case 'score': 
        case 'kills': 
        case 'deaths':
            return cat.charAt(0).toUpperCase() + cat.substring(1);
        case 'kd': return 'K/D';
        case 'races': return 'Races won';
        case 'onlinetime': return 'Online Time';
        default: return 'N/A';
    }
}

class Top extends React.Component {
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
            params: props.match.params,
            topList1: initialData,
            topList2: [],
            currentFace: 1,
            faceChangeOrder:1,// 1: increasing, -1:decreasing
            currentList: 1,
            isLoading: false,
            lastCat: props.match.params.cat,
            title: props.title
        };

        this.onPageExit = this.onPageExit.bind(this);
    }

    static fetchData(req, params) {
        return axios.get(`${req ? `${req.protocol}://${req.headers.host}` : ""}/api/top/` + params.cat).then(response => response.data).catch((err) => {
            return { error: true };
        });
    }

    onPageExit() {
        this.setState({
            currentList: this.state.currentList == 1 ? 2 : 1
        });
    }

    componentDidMount() {
        GlobalStore.on('pexit', this.onPageExit);
        if (!this.state.topList1) {
            document.title = this.state.title(null, this.state.params);
            this.setState({
                currentFace: 0,
                currentList: 2
            });
            Promise.resolve(Top.fetchData(null, this.state.params)).then(response => this.setState({ topList1:response, currentList:1, currentFace: 1 }));
        }
    }

    componentWillUnmount() {
        GlobalStore.removeListener('pexit', this.onPageExit);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.params.cat == nextProps.match.params.cat) return;  
        document.title = this.state.title(null, nextProps.match.params);  
        this.setState({
            currentFace: this.state.currentFace == 3 ? 2 :  this.state.currentFace + this.state.faceChangeOrder,
            faceChangeOrder: this.state.currentFace == 3 ? this.state.faceChangeOrder*-1 : this.state.faceChangeOrder, 
            lastCat: this.state.params.cat,
            params: nextProps.match.params
        });
        setTimeout(() => {
            Promise.resolve(Top.fetchData(null, nextProps.match.params)).then(response => {               
                this.state.currentList == 1 ?
                    this.setState({ topList2: response, currentList: 2, params: nextProps.match.params, currentFace: this.state.currentFace == 0 ? 1 :  this.state.currentFace + this.state.faceChangeOrder, faceChangeOrder: this.state.currentFace == 0 ? this.state.faceChangeOrder*-1 : this.state.faceChangeOrder }) :
                    this.setState({ topList1: response, currentList: 1, params: nextProps.match.params, currentFace: this.state.currentFace == 0 ? 1 :  this.state.currentFace + this.state.faceChangeOrder, faceChangeOrder: this.state.currentFace == 0 ? this.state.faceChangeOrder*-1 : this.state.faceChangeOrder })
            });
        }, 500);
    }

    render() {
        return (
            <div>
                <br />
                <div className="cont">
                    <div className="top-header">
                        <h2>
                            <span className="static">Top 30 -</span>
                            <span className={`cuboid rot${this.state.currentFace}`}>
                                {                                    
                                    [1, 2, 3, 4].map((d, i) => {
                                       return (

                                            <span key={i} className={`face${i + 1}`}>
                                                {
                                                    i == 0 || i == 2 ?
                                                        (<i className="fa fa-spinner fa-spin"></i>) :
                                                        i == this.state.currentFace ?
                                                            (<span>{getFullCatName(this.state.params.cat)}</span>)
                                                            :
                                                            (<span>{getFullCatName(this.state.lastCat)}</span>)
                                                }
                                            </span>
                                        )
                                    })
                                }
                            </span>
                        </h2>
                    </div>
                    <div className='face-cont-wrapper top-list'>
                        <div className={`face-cont ${(this.state.currentList == 2) ? 'flipped' : ''}`}>
                            <div className='face1'>
                                <center>
                                    {this.state.topList1 && this.state.topList1.error ? (<h2>Something went wrong!</h2>) : (
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Value</th>
                                                    <th>Avatar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.topList1 && this.state.topList1.map((row, i) => (
                                                        <tr key={i}>
                                                            <td>{i}</td>                                                            
                                                            <td><Link to={`/user/${row.id}`}>{row.name}</Link></td>
                                                            <td>{row.val}</td>
                                                            <td><img src={`/api/avatars/x50/${row.id}`}/></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>)}
                                </center>
                            </div>
                            <div className='face2'>
                                <center>
                                {this.state.topList2 && this.state.topList2.error ? (<h2>Something went wrong!</h2>) : (
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>                                                    
                                                    <th>Name</th>
                                                    <th>Value</th>
                                                    <th>Avatar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                     this.state.topList2 && this.state.topList2.map((row, i) => (
                                                        <tr key={i}>
                                                            <td>{i}</td>                                                           
                                                            <td><Link to={`/user/${row.id}`}>{row.name}</Link></td>
                                                            <td>{row.val}</td>
                                                            <td><img src={`/api/avatars/x50/${row.id}`}/></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>)}
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Top;