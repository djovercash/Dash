import React from 'react'
import moment from 'moment-timezone'
import UserCreateEventForm from '../components/UserCreateEventForm'
import UserEditEventForm from '../components/UserEditEventForm'
import { editEvent, deleteEvent } from '../actions/events'
import { connect } from 'react-redux'

const UserEventDetails = (props) => {

  const findOwner = (props) => {
    const owner = props.event.users.filter(user => {
      return user.invites[0].admin === true
    })
    return owner[0].name
  }

  const fixTime = (time) => {
    const stringTime = time.toString()
    const fixedTime = stringTime.slice(0, -8)
    const splitT = fixedTime.split("T")
    const date = splitT[0]
    const oldTime = splitT[1]
    const arrayTime = oldTime.split("")
    const hour = (oldTime[1] - 5).toString()
    const newTime = arrayTime.splice(1, 1, hour)
    const newFixedTime = arrayTime.join("")
    const newFixedDateTime = date + " " + newFixedTime
    const momo = moment(newFixedDateTime).format("MMM, Do YYYY, h:mm a")
    return momo
  }


  const eventOwner = () => {
    const user = props.event.users.find(user => user.id === props.user.id)
    if (user.invites[0].host === true) {
      const pending = props.event.users.filter(user => user.invites[0].status === "pending" && user.id !== props.user.id).length
      const confirmed = props.event.users.filter(user => user.invites[0].status === "confirmed" && user.id !== props.user.id).length
      const declined = props.event.users.filter(user => user.invites[0].status === "declined" && user.id !== props.user.id).length
      return (
        <h4>Pending: {pending} | Confirmed: {confirmed} | Declined: {declined}</h4>
      )
    } else {
      return null
    }
  }

  const whatToRender = (props) => {
    if (props.createForm === true) {
      return (
        <UserCreateEventForm />
      )
    } else if (props.editForm === true) {
      return (
        <UserEditEventForm />
      )
    } else if (props.event.title === '') {
      return (
        <div>
          <h3>These are my event details, Lady</h3>
        </div>
      )
    } else {
      return (
        <div>
          <h1>{props.event.title}</h1>
          <div id="eventDetails">
            <div>
              <h4>Invited by: {findOwner(props)}</h4>
              <h4>Location: {props.event.location}</h4>
              <h4>Start Time: {fixTime(props.event.start_time)}</h4>
              <h4>End Time: {fixTime(props.event.end_time)}</h4>
              {eventOwner()}
            </div>
            <iframe
              src={props.event.google_map}
              title="Stop sending me errors"
              >
            </iframe>
          </div>
          <button onClick={props.editEvent}>Edit {props.event.title}</button>
          <button onClick={() => {props.deleteEvent(props.event)}}>Delete {props.event.title}</button>
        </div>
      )
    }
  }


  return (
    <div>
      {whatToRender(props)}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    event: state.specific_event,
    events: state.events,
    user: state.user,
    createForm: state.createForm,
    editForm: state.editForm
  }
}


export default connect(mapStateToProps, { editEvent, deleteEvent })(UserEventDetails)
