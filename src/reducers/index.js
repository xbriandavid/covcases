// root reducer
import {combineReducers} from 'redux';
// dates reducer
import dates from './dates';
import changeDataMode from './changeMode'
export default combineReducers({
    datesReducer: dates,
    changedatamode: changeDataMode
});