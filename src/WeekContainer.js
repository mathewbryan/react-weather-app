import React from 'react'
import apiKey from './apiKeys'
import DayCard from './dayCard'
import DegreeToggle from './DegreeToggle'
import Location from './LocationSearch'
class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: [],
        degreeType: "celsius",
        location: "London",
    }

    
    updateDegree = (event) => {
      this.setState({
        degreeType: event.target.value
        }, () => console.log(this.state.degreeType))
      }
    
    updateLocation = (event) => {
      this.setState({location: event.target.value},
      () => console.log(this.state.location))
      }
    
    componentDidMount = () => { 
      this.getWeather()
      }
    
    
    getWeather = () => {
      let weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.location}&units=imperial&APPID=${apiKey.openWeatherKey}`
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
        return (
          <div className="container">
            <h1 className="display-1 jumbotron">5-Day Forecast</h1>
        <h5 className="display-5 text-muted">{this.state.location}</h5>
            <DegreeToggle degreeType={this.state.degreeType} updateDegree={this.updateDegree} />
            <Location updateLocation={this.updateLocation} getWeather={this.getWeather}/>
            <button onClick={this.getWeather}>Submit</button>
            <div className="row justify-content-center"></div>
              {this.formatDayCard()}
            <div/>
            
          </div>
        )
      }
    }

export default WeekContainer