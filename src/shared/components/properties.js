/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import axios from 'axios';

import loadScript from '../loadScript';

const filters = [
    {
        label: 'For Sale',
        icon: 'map-signs'
    },
    {
        label: 'Owned',
        icon: 'home'
    },
    {
        label: 'Businesses',
        icon: 'building-o'
    },
    {
        label: 'Garages',
        icon: 'car'
    }
]

class Properties extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: 'San Andreas',
            loading: true,
            properties: null,
            filterEnabled: [true, true, true, true],
            title: props.title
        };

        this.createMap = this.createMap.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    componentDidMount() {
        document.title = this.state.title();
        
        Promise.all([
            loadScript('https://maps.google.com/maps/api/js'),
            loadScript('/public/js/SanMap.min.js'),
            axios.get('/api/properties')
        ]).then(results => {
            this.setState({ properties: results[2].data });
            setTimeout(() => this.createMap(), 100);
        }).catch((err) => {
            console.log(err);
            $.notiny({ text: 'Something went wrong!', position: 'right-top', theme: 'alert' });
        });
    }

    createMap() {
        //different types of maps:
        const mapType = new SanMapType(0, 1, function (zoom, x, y) {
            return x == -1 && y == -1
                ? "/public/img/tiles/Standard.outer.jpg"
                : "/public/img/tiles/Standard." + zoom + "." + x + "." + y + ".png";
        });

        const satType = new SanMapType(0, 3, function (zoom, x, y) {
            return x == -1 && y == -1
                ? "/public/img/tiles/Rendered.outer.jpg"
                : "/public/img/tiles/Rendered." + zoom + "." + x + "." + y + ".png";
        });

        const xray = new SanMapType(0, 6, function (zoom, x, y) {
            return x == -1 && y == -1
                ? "/public/img/tiles/map.outer.jpg"
                : "/public/img/tiles/map." + zoom + "." + x + "." + y + ".png";
        });

        //initializing map
        const map = SanMap.createMap(document.getElementById('map'),
            { 'Standard': mapType, 'Rendered': satType, 'X-Ray': xray }, 2, null, false, 'X-Ray');

        // code for changing location on bottom-left corner when user browse through map
        google.maps.event.addListener(map, 'center_changed', () => {
            if (map.getZoom() < 2)
                this.setState({ location: 'San Andreas' });
            else {
                const cen = SanMap.getPosFromLatLng(map.getCenter());
                axios.get(`/api/san-location/${cen.x}/${cen.y}`).then((res) => {
                    this.setState({ location: res.data });
                });
            }
        });

        //creating markers for houses
        //first lets define icons for our markers
        const icons = [
            //in order of type, type 0: on sale, type 1: owned, type 2: business, type 3: garage
            '/public/img/map-signs.png',
            '/public/img/home.png',
            '/public/img/building-o.png',
            '/public/img/car.png'
        ],
            properties = this.state.properties,
            infowindow = new google.maps.InfoWindow;// dialog/tooltip to show property info

        this.markers = [];// used for filtering purpose when filters are changed
        let pInfoA = [];// used for holding info in form of html on properties
        for (let i = 0; i < properties.length; i++) {
            let pinfo = `<div class='gInfoWindow'<h2>Property Information</h2><br><b>ID:</b> ${properties[i].id}<br><b>Type: </b>
            ${properties[i].type == 0 ? 'House(on sale)' : (properties[i].type == 1 ? 'House(owned)' : (properties[i].type == 2 ? 'Business' : 'Garage'))}
            <br><b>Price: <span style="color:#00cc00;">$${properties[i].price}</span></b></div>`;
            pInfoA.push(pinfo);

            let pMarker = new google.maps.Marker({
                position: SanMap.getLatLngFromPos(properties[i].x, properties[i].y),
                map: map,
                icon: icons[properties[i].type]
            });
            this.markers.push(pMarker);

            //binding a listner to marker click function:
            google.maps.event.addListener(pMarker, 'click', (function (pMarker, i) {
                return function () {
                    infowindow.setContent(pInfoA[i]);
                    map.setCenter(pMarker.position);
                    infowindow.open(map, pMarker);
                }
            })(pMarker, i));
        }
        this.setState({ loading: false });
    }

    toggleFilter(e) {
        const { index } = e.currentTarget.dataset;
        for (let i = 0, l = this.state.properties.length; i < l; i++) {
            if (this.state.properties[i].type == index) this.markers[i].setVisible(!this.state.filterEnabled[index]);
        }
        let nfilterEnabled = this.state.filterEnabled;
        nfilterEnabled[index] = !nfilterEnabled[index];
        this.setState({ filterEnabled: nfilterEnabled });
    }

    render() {
        return (
            <div>
                <br />
                <div className="cont">
                    <div className="propWrapper">
                        <div className="propFilters">
                            <ul>
                                {
                                    filters.map((filt, i) => (
                                        <li key={i} data-index={i} onClick={this.toggleFilter} className={this.state.filterEnabled[i] ? 'active' : ''}>
                                            <i className={`fa fa-${filt.icon} fa-3x`}></i> <br />
                                            <span>{filt.label}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div id="mapWrapper">
                            <div id="map"></div>
                            {this.state.loading ? (<div id="mapLoading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i></div>) : (<div />)}
                            <div id="loc">Location: {this.state.location}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Properties;