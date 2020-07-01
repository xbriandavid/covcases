// THIS FILE HOLDS THE DATES reducer 

import {changeDate} from 'leadmanager/frontend/src/actions/types.js'

const initialState = {
    chosenDate: ""
}

// Reducer for changing the date 
export default function(state = initialState, action){
    switch(action.type){
        case changeDate:
            return{
                chosenDate: action.payload
            };
        deafult:
            return state;
    }
}