// any actions we want to fire off will occur inside of this
// file.

// ACTION CREATOR 
// We will also make http requests. 
import {changeDate, threeDayView} from './types.js'
import {bayd} from '../components/density.js'
import {countyRecords} from '../prevDaysRecords.js'
const startingDate = "2020-04-01"
const secondDate = "2020-04-02"
import {createDateString, createShortDate} from '../singledayfunc'

//action creator method
export const changedate = (submittedDate, day1, day2) => dispatch => {
    fetch("api/lead")
        .then((response) => {
            if(response.status > 400){
                console.log("Connection Error")
            }
            return response.json()
        })
        .then((data) => {
            // Modify bayd object so that density values are obtained
            // by user inputed date

            const today = createDateString(submittedDate)
            var yesterday = createDateString(day1)
            var dayBeforeYest = createDateString(day2)

            const dateMatched = data.filter((value) => {return value.recordeddate == today})
            const newData = Object.assign({}, bayd)
            for(let i = 0; i < dateMatched.length; i++){
                newData.features[i].properties.density = dateMatched[i].numcases
            }
            // Filter the data
            const yesterdayMatched = data.filter((value) => {return value.recordeddate == yesterday})
            const dayBeforeMatched = data.filter((value) => {return value.recordeddate == dayBeforeYest})

            // if selected date is the starting date, send an empty payload for previous day records
            // -> clonedArray should be empty
            if(today !== startingDate && today !== secondDate){
                for(let i = 0; i < yesterdayMatched.length; i++){
                    countyRecords[i].prevDay = yesterdayMatched[i].numcases
                    countyRecords[i].beforePrevDay = dayBeforeMatched[i].numcases
                }
                var clonedArray = JSON.parse(JSON.stringify(countyRecords))
                yesterday = createShortDate(day1)
                dayBeforeYest = createShortDate(day2)
            }
            else{
                // if daybeforeMatched array is empty: first date is chosen
                // April 1
                if (yesterdayMatched.length == 0){
                    for(let i = 0; i < 9; i++){
                        countyRecords[i].prevDay = null
                        countyRecords[i].beforePrevDay = null
                    }
                    clonedArray = JSON.parse(JSON.stringify(countyRecords))
                    yesterday = null
                    dayBeforeYest = null
                } else{
                    // April 2
                    for(let i = 0; i < 9; i++){
                        countyRecords[i].prevDay = yesterdayMatched[i].numcases
                        countyRecords[i].beforePrevDay = null
                    }
                    dayBeforeYest = null
                    yesterday = createShortDate(day1)
                    clonedArray = JSON.parse(JSON.stringify(countyRecords))
                }
            }
            dispatch({
                type: changeDate,
                payload: newData,
                payloadDate: {
                    "dayBeforeDate": dayBeforeYest,
                    "yesterdayDate": yesterday,
                    "selectedDate": createShortDate(submittedDate)},
                payloadPrevData:clonedArray,
            })
        }).catch((error) => console.log(error))
}

