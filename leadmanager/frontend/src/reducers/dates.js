// THIS FILE HOLDS THE DATES reducer 

import {changeDate, currentDate, yesterday, dayBeforeYesterday} from '../actions/types.js'
import {bayd} from '../components/density.js'
import {countyRecords} from '../prevDaysRecords.js'

const initialState = {
    data: bayd,
    displaydate: {
        "selectedDate":currentDate,
        "yesterdayDate": yesterday,
        "dayBeforeDate": dayBeforeYesterday
    },
    prevData: countyRecords
};

// Reducer for changing the date 

export default function dates(state = initialState, action){
    switch(action.type){
        case changeDate:
            return {
                ...state,
                data: action.payload,
                displaydate: action.payloadDate,
                prevData: action.payloadPrevData
            };
        default:
            return state;
    }
}