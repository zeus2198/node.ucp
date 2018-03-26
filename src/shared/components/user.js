/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import DataWrapper from './dataTransitionWrapper';

const tabs = [
    {
        tab: "Stats", api: "/api/users/%ID%/stats",
        rows: [
            { header: "Kills", prop: "kills" }, // prop is the name of object porperty of the object retrived from API whose value should be put on row
            { header: "Deaths", prop: "deaths" },
            { header: "K/D", prop: "kdr" },
            { header: "Online Time", prop: "onlineTime", handler: (onlineTime) => `${onlineTime} hours` },
            /* if handler is mentioned(as above) then handler function will be called with 
             property value and the value returned by this function will be placed in row */
            { header: "Jobs done", prop: "jobsDone" },
            { header: "Races won", prop: "racesWon" },
            { header: "Bounty", prop: "bounty", handler: (bounty) => (<b className="text-outline" style={{ color: '#4ae08a' }}>${bounty}</b>) },
            { header: "Achievements", prop: "achs" }
        ]
    },
    {
        // default tab, always second one in the array will be the default
        tab: "Summary", api: "/api/users/%ID%",
        rows: [
            { header: "Account ID", prop: "id" },
            {
                header: "Status", prop: "banned", handler: (banned) => (
                    (banned ? <b className="text-outline" style={{ color: 'color:#ff4d4d' }}>Banned</b> : <b className="text-outline" style={{ color: '#4ae08a' }}>Enabled</b>)
                )
            },
            { header: "Admin Level", prop: "adminLevel" },
            { header: "Registered", prop: "registered" },
            { header: "Last Seen", prop: "lastLogin" }
        ]
    },
    {
        tab: "Vehicles", api: "/api/users/%ID%/vehicles",
        dynamicRowHandler: (loading, data) => { // if defined this function is used for fetching layout with the data got from API as a JSON object
            //useful where you don't know how many rows you will get like vehicles owned by player in this case
            //should return new layout in react form.
           
            const vehicles = loading ? '' :
                Object.keys(data).length == 0 ? <center><br /><br /><h3>No vehicle owned</h3><br /><br /></center> : (
                    <div className="tab-img-wrapper">
                        {
                            data.map((vehicle, i) => (
                                <div key={i} className="tab-img">
                                    <img src={`/public/img/vehicles/${vehicle.vid}.jpg`} />
                                    <div>{vehicle.vname}</div>
                                    <span><b className="pull-left">Lorem ipsum</b><font className="pull-right">ODO: <b>{vehicle.odo}km</b></font></span>
                                </div>
                            ))}
                    </div>
                );
            return (
                <center><DataWrapper loading={loading} data={loading ? "Loading" : vehicles} /></center>
            );

        }

    }
];

/* staticStats contains stats in profile page which doesn't change from one tab to another 
   Note that this array's length should ALWAYS be 5.
   First array element will contain the property name of user account ID.
   Second array element will contain the property name of user-name.
   Remaining three will contain the label name along with the property name, this is due to layout design.
   Also note that all of these stats are taken from default tab API which is mentioned above.
*/
const staticStats = [
    { prop: "id" },
    { prop: "name" },
    { label: "Rank", prop: "rank" },
    { label: "Score", prop: "score" },
    { label: "Cash", prop: "cash" },
];


class User extends React.Component {
    constructor(props) {
        super(props);
        //data prefetch code:
        let initialData;
        if (props.staticContext) {
            initialData = props.staticContext.initialData;
        }
        else {
            initialData = window.initialData;
            delete window.initialData;
        }

        this.tabChange = this.tabChange.bind(this);

        this.state = {
            data: initialData,
            tabs: () => (
                <div>
                    {tabs.map((item, i) =>
                        <span key={i} data-index={i} onClick={this.tabChange} className={i == 1 ? "active" : undefined}>{item.tab}</span>
                    )}
                </div>
            ),
            sliderPosition: 1, // used to keep track of tab slider
            params: props.match.params,
            title: props.title
        };
        this.staticStats = [];
    }

    tabChange(e) {
        // just tab change animation code:
        const { index } = e.target.dataset,
            translateX = (1 - this.state.sliderPosition) * 10,
            shiftDirection = this.state.sliderPosition - index < 0 ? "left" : "right";
        if (index == this.state.sliderPosition) return; // same tab clicked so do nothing
        this.setState({
            tabs: () => (
                <div style={{ 'transform': `translateX(${translateX}%)`, 'animation': `slide-${shiftDirection} 200ms ease-in forwards` }}>
                    {tabs.map((item, i) =>
                        <span key={i} data-index={i} onClick={this.tabChange} className={i == index ? "active" : undefined}>{item.tab}</span>
                    )}
                </div>
            ), sliderPosition: index, data: null
        });
        // fetching data for tab change:
        Promise.resolve(User.fetchData(null, this.state.params, tabs[index].api)).then(response => this.setState({ data: response }));
    }

    static fetchData(req, params, api) {
        const userid = params.userid;
        if (api) {
            return axios.get(api.replace("%ID%", userid)).then(response => response.data).catch((err) => {
                return { error: true };
            });
        }
        return axios.get(`${req ? `${req.protocol}://${req.headers.host}` : ""}/api/users/` + userid).then(response => response.data).catch((err) => {
            return { error: true };
        });
    }

    componentDidMount() {
        if (!this.state.data) {
            document.title = "Loading profile | node.ucp"
            Promise.resolve(User.fetchData(null, this.state.params)).then(response => {
                document.title = this.state.title(response);
                this.setState({ data: response });
            });
        }
    }

    render() {
        const loading = !this.state.data;
        if (!loading && this.state.data.error) return (<div><Redirect to="/search" /></div>);
        if (this.state.sliderPosition == 1 && !loading) {
            for (var i = 0; i < 5; i++)
                this.staticStats[i] = this.state.data[staticStats[i].prop];
        }
        const initialLoading = this.staticStats.length == 0;
        const Tabs = this.state.tabs;
        return (
            <div>
                <br />
                <div className="cont profile-cont">
                    <div className="col-md-12 justify-content-md-center header">
                        <img src={`/api/avatars/${initialLoading ? -1 : this.staticStats[0]}`} /> <br /> <br />
                        <h2><DataWrapper loading={initialLoading} data={initialLoading ? "Loading" : this.staticStats[1].replace('_', ' ')} /></h2>
                    </div>
                    <div className="row info-cont">
                        <div className="col-md-4">
                            <h3> <DataWrapper loading={initialLoading} data={initialLoading ? "Loading" : this.staticStats[2]} /></h3> <br />
                            {staticStats[2].label}
                        </div>
                        <div className="col-md-4">
                            <h3><DataWrapper loading={initialLoading} data={initialLoading ? "Loading" : this.staticStats[3]} /></h3> <br />
                            {staticStats[3].label}
                        </div>
                        <div className="col-md-4">
                            <h3><b><DataWrapper loading={initialLoading} data={initialLoading ? "Loading" : '$' + this.staticStats[4]} /></b></h3> <br />
                            {staticStats[4].label}
                        </div>
                    </div>
                    <div className="col-12 currentTab">
                        <Tabs />
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                {
                                    tabs[this.state.sliderPosition].dynamicRowHandler ?
                                        tabs[this.state.sliderPosition].dynamicRowHandler(loading, this.state.data) :
                                        tabs[this.state.sliderPosition].rows.map((row, i) => (
                                            <tr key={i}>
                                                <td>{row.header}</td>
                                                <td><DataWrapper loading={loading} data={loading ? "Loading" : (row.handler ? row.handler(this.state.data[row.prop]) : this.state.data[row.prop])} /></td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}
export default User;
