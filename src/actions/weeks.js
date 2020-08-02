import {bayd} from '../components/density.js'
import {createDateString, createShortDate} from '../singledayfunc'
import {countyRecords} from '../prevDaysRecords.js'
import {changeDate} from './types.js'

export const changeModeToWeek = (submittedDate, day1, day2) => (dispatch) => {
    fetch("api/lead")
        .then((response) => {
            if(response.status > 400){
                console.log("Connection Error")
            }
            return response.json()
        })
        .then((data) => {

            const selectedDate = createDateString(submittedDate)
            var lastWeek = createDateString(day1)
            var twoWeeksAgo = createDateString(day2)
            // get the entries that match the selected date
            const dateMatched = data.filter((value) => {return value.recordeddate == selectedDate})
            const newData = Object.assign({}, bayd)

            // replace the values in the original file with the filtered values
            // and store into the object newData
            for(let i = 0; i < dateMatched.length; i++){
                newData.features[i].properties.density = dateMatched[i].numcases
            }

            // Filter the data that contains the date a week/two weeks ago 
            // from the submitted date
            const lastWeekMatched = data.filter((value) => {return value.recordeddate == lastWeek})
            const twoWeeksAgoMatched = data.filter((value) => {return value.recordeddate == twoWeeksAgo})

            // if the selected date's last week and 2 weeks ago date has a value
            if(lastWeekMatched.length !== 0 && twoWeeksAgoMatched.length !== 0){
                for(let i = 0; i < lastWeekMatched.length; i++){
                    countyRecords[i].prevDay = lastWeekMatched[i].numcases
                    countyRecords[i].beforePrevDay = twoWeeksAgoMatched[i].numcases
                }

                var clonedArray = JSON.parse(JSON.stringify(countyRecords))
                lastWeek = createShortDate(day1)
                twoWeeksAgo = createShortDate(day2)
            }
            else{
                if(lastWeekMatched.length == 0){
                    for(let i = 0; i < 9; i++){
                        countyRecords[i].prevDay = null
                        countyRecords[i].beforePrevDay = null
                    }
                    clonedArray = JSON.parse(JSON.stringify(countyRecords))
                    lastWeek = null
                    twoWeeksAgo = null
                } else {
                    for(let i = 0; i< 9; i++){
                        countyRecords[i].prevDay = lastWeekMatched[i].numcases
                        countyRecords[i].beforePrevDay = null
                    }
                    twoWeeksAgo = null
                    lastWeek = createShortDate(day1)
                    clonedArray = JSON.parse(JSON.stringify(countyRecords))
                }
            }
            dispatch({
                type: changeDate,
                payload: newData,
                payloadDate:{
                    "dayBeforeDate":twoWeeksAgo,
                    "yesterdayDate": lastWeek,
                    "selectedDate": createShortDate(submittedDate)
                },
                payloadPrevData: clonedArray
            })
        }).catch(error => console.log(error))
}