import React from 'react'
import './WeekContainer'

const Location = ({location, updateLocation, getWeather}) => {


    return(
        <form>
            <input
            type="text" 
            placeholder="Location..."
            onChange={updateLocation}
            >
            </input>
         
        </form>
    )
}

export default Location