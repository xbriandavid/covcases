import React, {Component} from 'react';
import './App.css'
import {connect} from 'react-redux'
import {changedate} from '../actions/days.js'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import "react-day-picker/lib/style.css";
import {monthNames} from '../monthsList.js'
import {createShortDate} from '../singledayfunc'
export class Sidenavigator extends Component {
    constructor(props){
        super(props)
        const today= new Date()
        this.state = {
            inputDay: null,
            labelDay: monthNames[today.getMonth()] + " " + today.getDate() 
        }
    }

    
    handleDayClick = day => {
        let selectDate = createShortDate(day)
        var yesterday = new Date(day - 1000 * 60 * 60 * 24 * 1)
        var dayBeforeYesterday = new Date(day - 1000 * 60 * 60 * 24 * 2)
        this.setState({
            inputDay: day,
            labelDay: selectDate
        })
        this.props.submitNewDate(day, yesterday, dayBeforeYesterday)
    }

    render(){
        return(
            <div className = "navBorder">
                <div className = "navTitleTrigger">
                    <h1 className = "navTitle">Bay Area COVID-19 Report</h1>
                 </div>
                 <div className = "navItemsHolder">
                    <div className="middleForm">
                    <DayPicker onDayClick = {this.handleDayClick.bind(this)}
                        selectedDays = {this.state.inputDay}
                        disabledDays = {{before: new Date(2020, 3, 1)}}/>
                    <p className = "sideNavText">Selected Date:  {this.state.labelDay}</p>
                    <div ref = "temperatures"></div>
                    </div>
                    <div className = "bottomNav">
                        <p className = "sideNavText"><i>Last Updated: 6/15</i>  |  © Brian D.</p>
                    </div>
                 </div>
            </div>
        )
    } 
}

const mapDispatchToProps = (dispatch) => {
    return{
        submitNewDate: (newDate, yest, daybefore) => {
            dispatch(changedate(newDate, yest, daybefore))
        }
    }
}

export default connect(null, mapDispatchToProps)(Sidenavigator);