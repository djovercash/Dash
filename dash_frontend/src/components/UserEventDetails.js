import React from 'react'
import moment from 'moment-timezone'
import UserCreateEventForm from '../components/UserCreateEventForm'
import UserEditEventForm from '../components/UserEditEventForm'
import UserEventfulList from '../components/UserEventfulList'
import UserUpdateForm from '../components/UserUpdateForm'
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
    const dateTimeObj = new Date(time)
    const dateTimeString = dateTimeObj.toString()
    const momo = moment(dateTimeString).tz("America/New_York").format("MMM, Do YYYY, h:mm a")
    return momo
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

  const eventInvitations = () => {
    const pending = props.event.users.filter(user => user.invites[0].status === "pending" && user.id !== props.user.id)
    const confirmed = props.event.users.filter(user => user.invites[0].status === "confirmed" && user.id !== props.user.id)
    const declined = props.event.users.filter(user => user.invites[0].status === "declined" && user.id !== props.user.id)
    return (
      <div id="eventInvitationsLists">
        <div className="eventList">
          <h4>Pending</h4>
          <ul className="list">
          {pending.length > 0 ?
            pending.map(user => <li key={user.id}>{user.name}</li>)
            :
            <li>None Pending</li>
          }
          </ul>
        </div>
        <div className="eventList">
          <h4>Comfirmed</h4>
          <ul className="list">
          {confirmed.length > 0 ?
            confirmed.map(user => <li key={user.id}>{user.name}</li>)
            :
            <li>None Confirmed</li>
          }
          </ul>
        </div>
        <div className="eventList">
          <h4>Declined</h4>
          <ul className="list">
          {declined.length > 0 ?
            declined.map(user => <li key={user.id}>{user.name}</li>)
            :
            <li>None Declined</li>
          }
          </ul>
        </div>
      </div>
    )
  }

  const whatToRender = (props) => {
    if (props.event.title === "") {
      return (
        <div className="eventBox">
          <h1>DASH</h1>
        </div>
      )
    } else {
      return (
        <div className="eventBox">
          <h1>{props.event.title}</h1>
          <div className="eventDetails">
            <div>
              <h4>Created by: {findOwner(props)}</h4>
              <h4>Location: {props.event.location}</h4>
              <h4>Start Time: {fixTime(props.event.start_time)}</h4>
              <h4>End Time: {fixTime(props.event.end_time)}</h4>
              {eventOwner()}
            </div>
            <iframe
              src={props.event.google_map}
              title="Google Map"
              >
            </iframe>
          </div>
          <div>
            {eventInvitations()}
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
    eventful: state.eventfulSearch,
    updateAccount: state.updateAccount,
    isLoading: state.isLoading
  }
}


export default connect(mapStateToProps, { editEvent, deleteEvent, updateStatus })(UserEventDetails)
