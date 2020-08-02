import {threeDayView, twoWeekView} from '../actions/types'

const initialState = {
    dataMode: threeDayView
}

export default function changeDataMode(state = initialState, action){
    switch(action.type){
        case threeDayView:
            return {
                ...state,
                dataMode: action.payloadDataMode
            }
        case twoWeekView:
            return {
                ...state,
                dataMode: action.payloadDataMode
            }
        default:
            return state
    }
}