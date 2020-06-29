import React from 'react'
import apiKey from './apiKeys'
import DayCard from './dayCard'
import DegreeToggle from './DegreeToggle'

let weatherURL =
`http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiKey.openWeatherKey }`

class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: [],
        degreeType: "celsius",
    }
    
    updateForecastDegree = (event) => {
      this.setState({
        degreeType: event.target.value
        }, () => console.log(this.state.degreeType))
      }
    
    componentDidMount = () => {
       
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
          console.log("Data Loaded", data.list)
          let dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          this.setState({
            fullData: data.list,
            dailyData: dailyData
          }, () => console.log(this.state))
        })
      }

      formatDayCard = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={this.state.degreeType}  />)
      }
      
    
      render() {
          const {degreeType} = this.state.degreeType
        return (
          <div className="container">
            <h1 className="display-1 jumbotron">5-Day Forecast</h1>
            <h5 className="display-5 text-muted">New York, US</h5>
            <DegreeToggle degreeType={this.state.degreeType} updateForcastDegree={this.updateForecastDegree} />
            <div className="row justify-content-center"></div>
              {this.formatDayCard()}
            <div/>
            
          </div>
        )
      }
    }

export default WeekContainer