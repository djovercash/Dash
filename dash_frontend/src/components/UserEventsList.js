import React from 'react'
import { fetchEvent, fetchEvents } from '../actions/events'
import {connect} from 'react-redux'

class UserEventsList extends React.Component {

  componentDidMount() {
    this.props.fetchEvents()
  }

  confirmedAttendees = (id, mainUser) => {
    const event = this.props.events.find(event => event.id === id)
    if (!event) {
      return null
    } else {
      const attendeesNumber = event.users.filter(user => user.invites[0].status === "confirmed" && user.id !== mainUser.id).length
      return attendeesNumber
    }
  }

  findEvent = (id) => {
    this.props.fetchEvent(id)
  }

  render() {
    const userCreatedEvents = this.props.user.events.filter(event => event.invites[0].admin === true)
    const currentDate = new Date()
    const userNewCreatedEvents = []
    const userNewInvitedEvents = []
    for (const newCreatedEvent of userCreatedEvents) {
      let startTime = new Date(newCreatedEvent.start_time)
      if (startTime > currentDate) {
        userNewCreatedEvents.push(newCreatedEvent)
      }
    }
    const userInvitedEvents = this.props.user.events.filter(event => event.invites[0].admin !== true)
    for (const newInvitedEvent of userInvitedEvents) {
      let startTime = new Date(newInvitedEvent.start_time)
      if (startTime > currentDate) {
        userNewInvitedEvents.push(newInvitedEvent)
      }
    }

    return (
      <div>
        <div>
          <h4>Your Events</h4>
          <ul>
            {userNewCreatedEvents.map(event => {
              return <li key={event.id} onClick={() => {this.findEvent(event.id)}}>{event.title} | Confirmed: {this.confirmedAttendees(event.id, this.props.user)} </li>
            })}
          </ul>
        </div>
        <div>
          <h4>Invites</h4>
          <ul>
            {userNewInvitedEvents.map(event => {
              return <li key={event.id} onClick={() => {this.findEvent(event.id)}}>{event.title} | Status: {event.invites[0].status} </li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    events: state.events
  }
}

export default connect(mapStateToProps, { fetchEvent, fetchEvents })(UserEventsList)
