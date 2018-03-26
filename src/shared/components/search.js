/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import GlobalStore from '../stores/global';

class Search extends React.Component {
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
            searchText: '',
            searchResult: initialData,
            isSearching: false,
            params: props.match.params,
            history: props.history,
            title: props.title
        };

        this.onChange = this.onChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.onPageExit = this.onPageExit.bind(this);
    }

    static fetchData(req, params) {
        if (params && params.text)
            return axios.get(`${req ? `${req.protocol}://${req.headers.host}` : ""}/api/search/` + params.text).then(response => response.data).catch((err) => {
                return { error: true };
            });
        return null;
    }

    onPageExit() {
        // giving a nice flip animated exit       
        this.state.searchResult ? this.setState({ isSearching: true }) : this.setState({ searchResult: {} });
    }

    componentDidMount() {
        GlobalStore.on('pexit', this.onPageExit);
        if (!this.state.searchResult && this.state.params) {
            document.title = this.state.title(null, this.state.params);
            this.setState({
                isSearching: true
            });
            Promise.resolve(Search.fetchData(null, this.state.params)).then(response => this.setState({ searchResult: response, isSearching: false }));
        } 
        else document.title = this.state.title(null, this.state.params);
    }

    componentWillUnmount() {
        GlobalStore.removeListener('pexit', this.onPageExit);
    }

    componentWillReceiveProps(nextProps) {
        //checking if new search text is same as the current one, if yes then stop
        if (this.state.params.text == nextProps.match.params.text) return;
        document.title = this.state.title(null, nextProps.match.params);
        if (!nextProps.match.params.text) {
            this.setState({
                isSearching: false,
                searchResult: null,
                params: nextProps.match.params
            });            
        }
        else {
            this.setState({
                isSearching: true,
                searchResult: null
            });
            Promise.resolve(Search.fetchData(null, nextProps.match.params)).then(response => this.setState({ searchResult: response, isSearching: false, params: nextProps.match.params }));
        }
    }

    onChange(e) {
        this.setState({ searchText: e.target.value });
    }

    keyPress(e) {
        if (e.keyCode == 13) {
            this.state.history.push(`/search/${this.state.searchText}`);
        }
    }

    render() {
        const { searchResult, searchText, isSearching } = this.state;
        return (
            <div>
                <br />
                <div className="cont">
                    <div className="search-bar-cont">
                        <div className='input-group'>
                            <span className="input-group-addon" id="search"><i className="fa fa-search fa-lg"></i></span>
                            <input type="text" className="form-control" placeholder="Search.." aria-describedby="search"
                                name="searchText" value={searchText} onChange={this.onChange} onKeyDown={this.keyPress} disabled={isSearching} />
                        </div>
                    </div>
                    <div className='face-cont-wrapper'>
                        <div className={`face-cont ${(!isSearching && searchResult) ? 'flipped' : ''}`}>
                            <div className='face1'>
                                <div className={`zSearchAnim ${isSearching ? 'clock' : ''}`}>
                                    <div className='circle'></div>
                                    <div className='arm'></div>
                                    <div className='arm-s'></div>
                                    <br /> <br /> <br />
                                </div>
                            </div>
                            <div className='face2'>
                                <center>
                                    {(searchResult && searchResult.length) ? (
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Avatar</th>
                                                        <th>Acc. ID</th>
                                                        <th>Name</th>
                                                        <th>Score</th>
                                                        <th>Admin Level</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        searchResult.map(row => (
                                                            <tr key={row.id}>
                                                                <td><img src={`/api/avatars/x50/${row.id}`}/></td>
                                                                <td>{row.id}</td>
                                                                <td><Link to={`/user/${row.id}`}>{row.name}</Link></td>
                                                                <td>{row.score}</td>
                                                                <td>{row.adminLevel}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (<h2>No such user found!</h2>)}
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Search;