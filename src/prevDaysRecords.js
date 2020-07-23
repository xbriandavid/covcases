// Initial records for a county's previously 2-day cases count 
import {yesterdayDobj, dayBeforeDobj} from './actions/types'

var countyRecords = [
    {
        "county":"Alameda",
        "prevDay": null,
        "beforePrevDay":null
    },
    {
        "county":"Contra Costa",
        "prevDay": null,
        "beforePrevDay":null
    },
    {
        "county":"Marin",
        "prevDay": null,
        "beforePrevDay":null
    },
    {
        "county":"Napa",
        "prevDay": null,
        "beforePrevDay":null
    },
    {
        "county":"San Francisco",
        "prevDay": null,
        "beforePrevDay":null
    },
    {
        "county":"San Mateo",
        "prevDay": null,
        "beforePrevDay":null
    },
    {
        "county":"Santa Clara",
        "prevDay": null,
        "beforePrevDay":null
    },
    {
        "county":"Solano",
        "prevDay": null,
        "beforePrevDay":null
    },
    {
        "county":"Sonoma",
        "prevDay": null,
        "beforePrevDay":null
    }    
]




fetch("api/lead")
.then((response) => {
        if(response.status > 400){
            console.log("Connection Error")
        }
        return response.json()
    })
    .then((data) => {
        const yesterdayMatched = data.filter((value) => {return value.recordeddate == yesterdayDobj})
        const dayBeforeMatched = data.filter((value) => {return value.recordeddate == dayBeforeDobj})
        for (let i = 0; i < countyRecords.length; i++){
            countyRecords[i].prevDay = yesterdayMatched[i].numcases
            countyRecords[i].beforePrevDay = dayBeforeMatched[i].numcases
        }

    })
    .catch((error) => console.log(error))

export {countyRecords}
