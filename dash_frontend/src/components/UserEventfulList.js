import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment-timezone'
import {addEvent} from '../actions/events'


class UserEventfulList extends React.Component{

  state = {
    event: {},
    eventNumber: 0,
    endOfList: false
  }

  componentDidMount() {
    this.setState({
      event: this.props.events[this.state.eventNumber]
    })
  }



  fixTime = (time) => {
    const momo = moment(this.state.event.start_time).format("h:mm a")
    return momo
  }

  fixDate = (date) => {
    const momo = moment(this.state.event.start_time).format("MMM, Do YYYY")
    return momo
  }

  fixDescription = (description) => {
    if (description) {
      const splitDescription = description.replace(/<\/?[^>]+(>|$)/g, "")
      if (splitDescription.length > 200) {
        const finalDescription = splitDescription.substring(0, 200) + "..."
        return finalDescription
      } else {
        return splitDescription
      }
    } else {
      return "No Description Offered"
    }
  }

  fixTitle = (title) => {
    if (title.length > 30) {
      const finalTitle = title.substring(0, 30) + "..."
      return finalTitle
    } else {
      return title
    }
  }

  nextEvent = () => {
    let newNumber = parseInt(this.state.eventNumber) + 1
    if (newNumber > 9) {
      this.setState({
        endOfList: true
      })
    } else {
      this.setState({
        event: this.props.events[newNumber],
        eventNumber: newNumber
      })
    }
  }

  createEvent = (event) => {
    const title = event.title ? event.title.substring(0, 30) + "..." : "No Title Offered"
    const address = event.venue_address ? event.venue_address : ""
    const city = event.city_name ? event.city_name : ""
    const region = event.region_abbr ? event.region_abbr : ""
    const location = address + " " + city + " " + region
    const start = event.start_time ? event.start_time : "01-01-2050 01:00:00"
    const startArray = start.split(" ")
    const startDateArray = startArray[0].split("-")
    const startTimeArray = startArray[1].split(":")
    const end = event.start_time ? event.start_time : "01-01-2050 01:00:00"
    const endArray = end.split(" ")
    const endDateArray = endArray[0].split("-")
    const endTimeArray = endArray[1].split(":")
    const description = event.description ? event.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 200) : "No Description Offered"
    const action = {
      title: title,
      location: location,
      start_time: new Date(startDateArray[0], startDateArray[1] - 1, startDateArray[2], startTimeArray[0], startTimeArray[1]),
      end_time: new Date(endDateArray[0], endDateArray[1] - 1, endDateArray[2], endTimeArray[0], endTimeArray[1]),
      description: description,
      user_id: this.props.user.id,
      friends: []
    }
    this.props.addEvent(action)
  }

  makeMap = () => {
    const mapAddress = this.state.event.venue_address + ' ' + this.state.event.city_name + ' ' + this.state.event.region_abbr
    const mapAddressArray = mapAddress.split(' ')
    for(const e in mapAddressArray) {
      if (!e) {
        let index = mapAddressArray.indexOf(e)
        mapAddressArray.slice(index, 1)
      }
    }
    const mapAddressStr = mapAddressArray.join("+")
    const googleMapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBKVFYXi0xh1ezi1fDswB5fLvvQXd6pSGA&q=${mapAddressStr}`
    return googleMapSrc
  }

  whatToRender() {
    if (this.state.endOfList === true) {
      return (
        <div className="noEventfulContainer">
          <h1>For more events listed for your hometown</h1>
          <h3>Please visit: <a href="http://eventful.com/events" target="_blank" rel="noopener noreferrer">Eventful</a></h3>
        </div>
      )
    } else if (this.state.event.title) {
      return (
        <div className="eventfulContainer">
          <h5><span>Powered by Eventful</span></h5>
          <h1>{this.fixTitle(this.state.event.title)}</h1>
          <div id="eventfulDetails">
            <div id="eventfulMap">
              <iframe
                src={this.makeMap()}
                title="Google Map"
                >
              </iframe>
            </div>
            <div>
              <h3>Location: <span>{this.state.event.venue_address + ", " + this.state.event.city_name + ", " + this.state.event.region_abbr}</span></h3>
              <h3>Description: <span>{this.fixDescription(this.state.event.description)}</span></h3>
              <div id="eventfulEventSpecs">
                <h3>Date: <span>{this.fixDate(this.state.event.start_time)}</span></h3>
                <h3>Start Time: <span>{this.fixTime(this.state.event.start_time)}</span></h3>
              </div>
              <p><a className="Button" href={this.state.event.url} target="_blank">Click Here for More Info</a></p>
              <button onClick={this.nextEvent}>Next Event</button>
              <button onClick={() => this.createEvent(this.state.event)}>Create Personal Event</button>
            </div>
          </div>
        </div>
      )
    }
  }

  render(){
    return (
      <div>
        {this.whatToRender()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.eventfulEvents,
    eventful: state.eventfulSearch,
    user: state.user
  }
}

export default connect(mapStateToProps, {addEvent})(UserEventfulList)
