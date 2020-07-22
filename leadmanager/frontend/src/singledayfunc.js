import {monthNames} from './monthsList'

function singleDay(day) {
    if (day.toString().length < 2){
        return '0'+day
    }
    else{
        return day
    }
}

/*
* @input day: a date object
returns a date in string format YYYY-MM-DD
*/
export function createDateString(day){
    return day.getFullYear()+"-"+singleDay(day.getMonth()+1)+"-"+singleDay(day.getDate())
}

/*
* @input day: a date object
* returns a date in string format (month) DD
*/
export function createShortDate(day){
   return  monthNames[day.getMonth()] + " " + day.getDate()
}