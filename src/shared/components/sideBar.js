/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import { Link } from 'react-router-dom';
import SideBarAuth from './sideBar.authenticated.js';
import GlobalStore from '../stores/global.js';


class sideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSideBarOpen: false,
            authenticated:  props.staticContext && typeof props.staticContext.userID != 'undefined' ? true : GlobalStore.state.authenticated,            
            userID: props.staticContext && typeof props.staticContext.userID != 'undefined' ? props.staticContext.userID : GlobalStore.state.userID,
            btListState: false
        };        
        //for sidebar open/close on small screen
        this.toggleSidebar = this.toggleSidebar.bind(this);

        this.toggleBtList = this.toggleBtList.bind(this); 
        this.navItemClick = this.navItemClick.bind(this);    
        this.userLogout = this.userLogout.bind(this);   
    }
   
    toggleSidebar() {       
        //toggle side-bar on-off small screens
        this.setState({
            isSideBarOpen: !this.state.isSideBarOpen
        });
    }    

    toggleBtList() {     
        this.setState({
            btListState: !this.state.btListState         
        });
    }

    navItemClick(e) {        
        this.setState({
            selectedIndex: e.target.dataset.index,
            isSideBarOpen: !this.state.isSideBarOpen
        });
    }

    userLogout() {
        this.setState({ 
            authenticated: false
        });
    }

    componentDidMount() {       
        GlobalStore.on('userLogout', this.userLogout);
    }
    componentWillUnmount() {        
        GlobalStore.removeListener('userLogout', this.userLogout);
    }  

    render() {
        return (
            <div className="side-bar">
                <nav className="navbar navbar-dark bg-dark"> 
                    <button className="navbar-toggler d-lg-none" onClick={this.toggleSidebar} type="button" aria-controls="list-container" aria-expanded="false" aria-label="Toggle side-bar">
                        <span className="navbar-toggler-icon"></span>
                    </button>                   
                    <Link className="navbar-brand" to="/">UCP</Link>                    
                    <div className="list-container" id={this.state.isSideBarOpen ? 'sidebar-toggler' : ''}>
                        <ul>
                            <li>
                                <div style={{padding:'2rem'}}>
                                    {
                                        this.state.authenticated ?
                                        <SideBarAuth userID={this.state.userID} toggleSidebar={this.toggleSidebar} /> :
                                        <Link className="customB" to="/login"><h2>LOGIN</h2></Link>
                                    }
                                </div>
                            </li>
                            <li><Link to="/properties" data-index='0' onClick={this.navItemClick} className={this.state.selectedIndex == 0 ? 'active' : ''}><span className="navIcon"><i className="fa fa-home"></i></span>&nbsp;&nbsp;Properties</Link></li>  
                            <li><Link to="/search" data-index='1' onClick={this.navItemClick} className={this.state.selectedIndex == 1 ? 'active' : ''}><span className="navIcon"><i className="fa fa-search"></i></span>&nbsp;&nbsp;Search</Link></li>
                            <li><a href="javascript:void(0)" onClick={this.toggleBtList} className={this.state.selectedIndex == 2 ? 'active' : ''}><span className="navIcon"><i className="fa fa-star-half-o"></i></span>&nbsp;&nbsp;Top List</a></li>
                            <ul className={`top-bt-list ${this.state.btListState ? 'open' : ''}`}>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/score">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-star"></i></span>&nbsp;&nbsp;Score</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/cash">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-usd"></i></span>&nbsp;&nbsp;Cash</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/kills">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-hand-rock-o"></i></span>&nbsp;&nbsp;Kills</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/deaths">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-wheelchair"></i></span>&nbsp;&nbsp;Deaths</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/kd">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-hand-spock-o"></i></span>&nbsp;&nbsp;K/D Ratio</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/onlineTime">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-clock-o"></i></span>&nbsp;&nbsp;Online Time</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/races">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-trophy"></i></span>&nbsp;&nbsp;Races Won</Link></li>           
                            </ul>
                            <noscript>
                            <ul className='top-bt-list open'>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/score">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-star"></i></span>&nbsp;&nbsp;Score</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/cash">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-usd"></i></span>&nbsp;&nbsp;Cash</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/kills">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-hand-rock-o"></i></span>&nbsp;&nbsp;Kills</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/deaths">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-wheelchair"></i></span>&nbsp;&nbsp;Deaths</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/kd">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-hand-spock-o"></i></span>&nbsp;&nbsp;K/D Ratio</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/onlineTime">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-clock-o"></i></span>&nbsp;&nbsp;Online Time</Link></li>
                                    <li><Link data-index='2' onClick={this.navItemClick} to="/top/races">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="navIcon"><i className="fa fa-trophy"></i></span>&nbsp;&nbsp;Races Won</Link></li>           
                            </ul>
                            </noscript>
                            <li><Link to="/random" data-index='3' onClick={this.navItemClick} className={this.state.selectedIndex == 3 ? 'active' : ''}><span className="navIcon"><i className="fa fa-ban"></i></span>&nbsp;&nbsp;404</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default sideBar;