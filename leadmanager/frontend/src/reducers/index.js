// root reducer
import {combineReducers} from 'redux';
// dates reducer
import dates from './dates';
export default combineReducers({
    datesReducer: dates
});