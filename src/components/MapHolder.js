import React, {Component} from 'react'
import './App.css';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
// action creator
import {changedate} from '../actions/days.js'
import Mapobject from './Mapobject.js'

export class MapHolder extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: ''
        }
    }

/*
    handleChange(event){
        this.setState({
            inputValue: event.target.value
        })
    }

    handleSubmit(event){
        this.props.submitNewDate(this.state.inputValue)
        this.setState({inputValue: ''})
        event.preventDefault()
    }

    shouldComponentUpdate(prevProps){
        console.log(this.props.covdata.features[0].properties.density)
        console.log(prevProps.covdata.features[0].properties.density)
          return true
    }
*/
    render(){
        return(
            <div className = "mapblock">
                <Mapobject />
            </div>
        )
    }
}


export default MapHolder