import React, {Component} from 'react';
import './App.css'
import {connect} from 'react-redux'
import {changedate} from '../actions/days.js'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import "react-day-picker/lib/style.css";
import {monthNames} from '../monthsList.js'
import {createShortDate} from '../singledayfunc'
import {firstdate, endingDate, calendarEndDate,threeDayView} from '../actions/types'
import {changeModeToWeek} from '../actions/weeks'
import Dropdown from './Dropdown'

export class Sidenavigator extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputDay: endingDate,
            labelDay: monthNames[endingDate.getMonth()] + " " + endingDate.getDate(),
            currentMode: this.props.dataMode 
        }
    }

    handleDayClick = day => {
        let selectDate = createShortDate(day)

        this.setState({
            inputDay: day,
            labelDay: selectDate
        })

        if (this.props.dataMode == threeDayView){
            var yesterday = new Date(day - 1000 * 60 * 60 * 24 * 1)
            var dayBeforeYesterday = new Date(day - 1000 * 60 * 60 * 24 * 2)
            
            if(day >= firstdate && day <= calendarEndDate){
                this.props.submitNewDate(day, yesterday, dayBeforeYesterday)
            }
        }
        else{
            var lastWeek = new Date(day - 1000 * 60 * 60 * 24 * 7)
            var twoWeeksAgo = new Date(day - 1000 * 60 * 60 * 24 * 14)
            if(day >= firstdate && day <= calendarEndDate){
                this.props.submitNewDateWeekMode(day, lastWeek, twoWeeksAgo)
            }
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.dataMode !== this.props.dataMode){
            if (this.props.dataMode == threeDayView){
                var yesterday = new Date(this.state.inputDay - 1000 * 60 * 60 * 24 * 1)
                var dayBeforeYesterday = new Date(this.state.inputDay - 1000 * 60 * 60 * 24 * 2)
                if(this.state.inputDay >= firstdate && this.state.inputDay <= calendarEndDate){
                    this.props.submitNewDate(this.state.inputDay, yesterday, dayBeforeYesterday)
                }
            }
            else{
                var lastWeek = new Date(this.state.inputDay - 1000 * 60 * 60 * 24 * 7)
                var twoWeeksAgo = new Date(this.state.inputDay - 1000 * 60 * 60 * 24 * 14)
                if(this.state.inputDay >= firstdate && this.state.inputDay <= calendarEndDate){
                    this.props.submitNewDateWeekMode(this.state.inputDay, lastWeek, twoWeeksAgo)
                }
            }
        }
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
                        initialMonth = {new Date(2020, 6)}
                        selectedDays = {this.state.inputDay}
                        disabledDays = {{before: new Date(2020, 3, 1), after: new Date(2020, 6, 31)}}/>
                    <p className = "sideNavText">Selected Date:  {this.state.labelDay}</p>
                    <Dropdown />
                    </div>
                    <div className = "bottomNav">
                        <p className = "sideNavText"><i>Last Updated: 8/1</i>  |  © Brian D.</p>
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
        },
        submitNewDateWeekMode:(newDate, lastWeek, twoWeeksAgo) => {
            dispatch(changeModeToWeek(newDate, lastWeek, twoWeeksAgo))
        }
    }
}


const mapStateToProps = (state) =>{
    return{
        dataMode: state.changedatamode.dataMode
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidenavigator);