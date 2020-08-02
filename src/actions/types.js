import {createDateString, createShortDate} from '../singledayfunc'

// TYPES FILE
const changeDate = "changeDate";
const threeDayView = "3-Day View"
const twoWeekView = "2-week View"
const firstdate = new Date(2020, 3, 1)
//
const today = new Date(2020, 6, 31)
const endingDate = new Date(2020, 6, 31)
const calendarEndDate = new Date(2020, 7, 31)
const yesterdayDobj = createDateString(new Date(endingDate - 1000 * 60 * 60 * 24 * 1))
const yesterday = createShortDate(new Date(endingDate - 1000 * 60 * 60 * 24 * 1))
const dayBeforeDobj = createDateString(new Date(endingDate - 1000 * 60 * 60 * 24 * 2))
const dayBeforeYesterday = createShortDate(new Date(endingDate - 1000 * 60 * 60 * 24 * 2))
const currentDate = createShortDate(endingDate)
const todayDobj = createDateString(endingDate)
const xAxisSpacing = {1:[125], 2:[25, 215], 3: [25, 125, 215]}
const dataModes = [
        {
                key: '3-Day View',
                text:'3-Day View',
                value:'3-Day View'
        },
        {
                key: '2-week View',
                text:'2-week View',
                value:'2-week View'
        }
]

export {currentDate,
        calendarEndDate,
        yesterday, 
        dayBeforeYesterday, 
        changeDate, 
        yesterdayDobj, 
        dayBeforeDobj,
        todayDobj,
        firstdate,
        today,
        endingDate,
        xAxisSpacing,
        dataModes, threeDayView, twoWeekView}