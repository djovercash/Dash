import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

const UserEventDetails = (props) => {

  const findOwner = (props) => {
    const owner = props.event.users.filter(user => {
      return user.invite[0].admin === true
    })
    return owner[0].name
  }

  const fixTime = (time) => {
    const stringTime = time.toString()
    const fixedTime = stringTime.slice(0, -8)
    return moment(fixedTime).format("MMM, Do YYYY, h:mm a")
  }


  const eventOwner = () => {
    const user = props.event.users.find(user => user.id === props.user.id)
    if (user.invite[0].host === true) {
      const pending = props.event.users.filter(user => user.invite[0].status === "pending" && user.id !== props.user.id).length
      const confirmed = props.event.users.filter(user => user.invite[0].status === "confirmed" && user.id !== props.user.id).length
      const declined = props.event.users.filter(user => user.invite[0].status === "declined" && user.id !== props.user.id).length
      return (
        <h4>Pending: {pending} | Confirmed: {confirmed} | Declined: {declined}</h4>
      )
    } else {
      return null
    }
  }

  const whatToRender = (props) => {
    if (props.event.title === '') {
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
              src={props.event.google_map}>
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
    user: state.user
  }
}


export default connect(mapStateToProps)(UserEventDetails)
