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
    /*
    handleChange(event){
      this.setState({currentUser:event.target.value})
    }
    
    submitChange(event){
      fetch("api/lead")
        .then((response) => {
          if(response.status > 400){
            return this.setState(() => {
              return {placeholder: "Something went wrong!"}
            })
          }
          return response.json();
        })
        .then((data) => {
          return data.filter((value) => {return value.recordeddate == this.state.currentUser})
        })
        .then((newData) => {
          for(let i = 0; i < newData.length; i++){
            bayd.features[i].properties.density = newData[i].numcases
          }
          this.setState(() => {
            return {data:bayd}
          })
          this.setState({currentUser: ""})
        })
        event.preventDefault();
    }*/

    /*
    componentDidMount(){
      fetch("api/lead")
      .then((response) => {
        if(response.status > 400){
          return this.setState(() => {
            return {placeholder: "Something went wrong!"}
          })
        }
        return response.json();
      })
      .then((data) => {
        console.log(data[0])
      })
    }*/
    componentDidMount(){
      //console.log(bayd.features[0].properties.density)
      //bayd.features[0].properties.density = 0
      //console.log(bayd.features[0].properties.density)
      
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
