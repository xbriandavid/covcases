import React, {Component} from 'react'
import './App.css'
import { IoIosArrowDropdownCircle} from "react-icons/io";
import $ from 'jquery'
import {threeDayView, twoWeekView} from '../actions/types'
import {connect} from 'react-redux'
import {changeDataMode} from '../actions/dataMode'

class Dropdown extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu: false,
            currentMode: threeDayView
        }
    }
    componentDidMount(){
        $('.next-icon svg').css({
            'stroke': 'currentcolor',
            'fill': 'currentcolor',
            'stroke-width': '0px',
            'height': '1.5em',
            'width': '1.5em',
        })
        $('#slidemenu').css({"display":"none"})

    }

    showMenu = (event) => {
        event.preventDefault();
        $('#slidemenu').css({"display":"flex"})
        $('#slidemenu').addClass("menu")
        $('#slidemenu').removeClass("menu-close")
        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu)
            $('.next-icon svg').addClass('next-icon-clicked') 
            $('.next-icon svg').removeClass('next-icon-close')
        })
        if(this.state.currentMode == twoWeekView){
            $("#btn2").css({"background":"aliceblue"})
            $("#btn1").css({"background":"transparent"})
        }
        else{
            $("#btn1").css({"background":"aliceblue"})
            $("#btn2").css({"background":"transparent"})
        }
    }
    closeMenu = (event) => {
        if(!this.dropdownMenu.contains(event.target)){
            this.setState({...this.state, showMenu: false}, () => {
                //$('.menu').css({"display":"none"})
                document.removeEventListener('click', this.closeMenu)
                $('.next-icon svg').addClass('next-icon-close') 
                $('.next-icon svg').removeClass('next-icon-clicked')
                $('#slidemenu').removeClass("menu")
                $('#slidemenu').addClass("menu-close")
            })
        }
    }

    hanldeDataMode = event => {
        if(event.target.value == twoWeekView){
            // change btn1 background to transparent
            // fill btn2 background 
            $("#btn2").css({"background":"aliceblue"})
            $("#btn1").css({"background":"transparent"})
        } else {
            // change btn2 
            $("#btn1").css({"background":"aliceblue"})
            $("#btn2").css("background","transparent")
        }
        this.setState({...this.state, currentMode: event.target.value})
        this.props.changeMode(event.target.value)
    }
    render(){
        return(
            <div id = "dropdown">
                 <button onClick = {this.showMenu.bind(this)} className = "button">
                    <div className = "mode-selector">
                        <div className = "mode-selector-bttn">
                            <p>Change Data View</p> 
                        </div>
                        <div className = "next-icon">
                            <IoIosArrowDropdownCircle />
                        </div>
                    </div>
                 </button>
                     
                    <div id = "slidemenu" ref = {(element) => {this.dropdownMenu = element}}>
                        <button className = "menu-button" id = "btn1" value = {threeDayView} onClick = {this.hanldeDataMode.bind(this)}> 3 Day View</button>
                        <button  className = "menu-button" id = "btn2" value = {twoWeekView} onClick = {this.hanldeDataMode.bind(this)}> 2 Week View</button>
                    </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMode: (newMode) => {
            dispatch(changeDataMode(newMode))
        }
    }
}
export default connect(null, mapDispatchToProps)(Dropdown)


