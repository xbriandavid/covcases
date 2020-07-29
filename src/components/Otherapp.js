import React, {Component} from "react";
import ReactDOM from "react-dom";
import {bayd} from "./density.js";
import './App.css';
import Sidenavigator from "./Sidenavigator.js";
import MapHolder from "./MapHolder.js";
import {Provider} from 'react-redux';
import store from '../store.js'
import Mapobject from "./Mapobject.js"


export class Otherapp extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentUser: "",
            lastsubmitted:"",
            placeholder: "loading",
            data:bayd
        };
    }
    

      render() {
        return (
          <Provider store = {store}>
            <div>
              <div className = "Divider">
                <div className = "Sidebar">
                  <Sidenavigator />
                </div>
                <div>
                  <MapHolder />
                </div>
              </div>
            </div>
          </Provider>
        )
      }
    }
    
require('./App.css')
ReactDOM.render(<Otherapp />, document.getElementById('app'));
