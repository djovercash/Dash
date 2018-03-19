import React from 'react'
import moment from 'moment-timezone'
import UserCreateEventForm from '../components/UserCreateEventForm'
import UserEditEventForm from '../components/UserEditEventForm'
import UserEventfulList from '../components/UserEventfulList'
import { editEvent, deleteEvent } from '../actions/events'
import {updateStatus} from '../actions/users'
import { connect } from 'react-redux'

const UserEventDetails = (props) => {

  const findOwner = (props) => {
    const owner = props.event.users.filter(user => {
      return user.invites[0].admin === true
    })
    return owner[0].name
  }

  const fixTime = (time) => {
    const startDateTimeObj = new Date(props.event.start_time)
    const startDateTimeString = startDateTimeObj.toString()
    const timeZone = startDateTimeString.slice(startDateTimeObj.length - 5)
    console.log(startDateTimeString[36])
    if (startDateTimeString[36] === "D") {
      const fixedTime = time.slice(0, -8)
      const splitT = fixedTime.split("T")
      const date = splitT[0]
      const arrayTime = splitT[1].split(":")
      const hour = parseInt(arrayTime[0])
      const fixedHour = hour - 4
      if (fixedHour < 12) {
        const finalHour = `0${fixedHour}`
        const newTime = finalHour + ":" + arrayTime[1]
        const newDateTime = date + " " + newTime
        const momo = moment(newDateTime).tz("America/New_York").format("MMM, Do YYYY, h:mm a")
        return momo
      } else {
        const finalHour = fixedHour.toString()
        const newTime = finalHour + ":" + arrayTime[1]
        const newDateTime = date + " " + newTime
        const momo = moment(newDateTime).tz("America/New_York").format("MMM, Do YYYY, h:mm a")
        return momo
      }
    } else {
      const fixedTime = time.slice(0, -8)
      const splitT = fixedTime.split("T")
      const date = splitT[0]
      const arrayTime = splitT[1].split(":")
      const hour = parseInt(arrayTime[0])
      const fixedHour = hour - 5
      if (fixedHour < 12) {
        const finalHour = `0${fixedHour}`
        const newTime = finalHour + ":" + arrayTime[1]
        const newDateTime = date + " " + newTime
        const momo = moment(newDateTime).tz("America/New_York").format("MMM, Do YYYY, h:mm a")
        return momo
      } else {
        const finalHour = fixedHour.toString()
        const newTime = finalHour + ":" + arrayTime[1]
        const newDateTime = date + " " + newTime
        const momo = moment(newDateTime).tz("America/New_York").format("MMM, Do YYYY, h:mm a")
        return momo
      }
    }
  }


  const eventOwner = () => {
    const user = props.event.users.find(user => user.id === props.user.id)
    if (user.invites[0].host === true) {
      const pending = props.event.users.filter(user => user.invites[0].status === "pending" && user.id !== props.user.id).length
      const confirmed = props.event.users.filter(user => user.invites[0].status === "confirmed" && user.id !== props.user.id).length
      const declined = props.event.users.filter(user => user.invites[0].status === "declined" && user.id !== props.user.id).length
      return (
        <div>
          <h4>Pending: {pending} | Confirmed: {confirmed} | Declined: {declined}</h4>
          <button onClick={props.editEvent}>Edit {props.event.title}</button>
          <button onClick={() => {props.deleteEvent(props.event)}}>Delete {props.event.title}</button>
        </div>
      )
    } else {
      const event = user.invites.filter(invite => invite.event_id === props.event.id)
      return (
        <div>
          <h4> Currently: {event[0].status}</h4>
          <button onClick={() => {props.updateStatus(event, "confirmed")}}>Confirm</button>
          <button onClick={() => {props.updateStatus(event, "declined")}}>Decline</button>
        </div>
      )
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
    } else if (props.eventful === true) {
      return (
        <UserEventfulList />
      )
    } else if (props.event.title === "") {
      return (
        <div>
          <h3>These are my event details, Lady</h3>
        </div>
      )
    } else {
      console.log(props.event)
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
    editForm: state.editForm,
    eventful: state.eventfulSearch
  }
}


export default connect(mapStateToProps, { editEvent, deleteEvent, updateStatus })(UserEventDetails)
