import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import L from 'leaflet'
import '/Users/fetch/lead-manager/leadmanager/frontend/src/App.css'
import {Provider} from 'react-redux'
import store from '/Users/fetch/lead-manager/leadmanager/frontend/src/store.js';

export class App extends Component {
    componentDidMount(){
        this.map();
    }
    map(){
        var mymap = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(mymap);
    }
    render(){
        return(
            <Provider store = {store}>
            <div id="map">
                x
            </div>
        </Provider>
        )
    }
}
require('/Users/fetch/lead-manager/leadmanager/frontend/src/App.css')
ReactDOM.render(<App />, document.getElementById('app'));