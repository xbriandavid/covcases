import {createDateString, createShortDate} from '../singledayfunc'

// TYPES FILE
const changeDate = "changeDate";

const today = new Date(2020, 4, 10)
const yesterdayDobj = createDateString(new Date(today - 1000 * 60 * 60 * 24 * 1))
const yesterday = createShortDate(new Date(today - 1000 * 60 * 60 * 24 * 1))
const dayBeforeDobj = createDateString(new Date(today - 1000 * 60 * 60 * 24 * 2))
const dayBeforeYesterday = createShortDate(new Date(today - 1000 * 60 * 60 * 24 * 2))
const currentDate = createShortDate(today)
const todayDobj = createDateString(today)

export {currentDate,
        yesterday, 
        dayBeforeYesterday, 
        changeDate, 
        yesterdayDobj, 
        dayBeforeDobj,
        todayDobj}