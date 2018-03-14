import React from 'react'
import { connect } from 'react-redux'


const UserAvatar = (props) => {
  const events = props.user.events.sort(function(a, b) {
    var c = new Date(a.start_time)
    var d = new Date(b.start_time)
    return c - d
  })
  console.log(props.user)
  console.log(events)
  return (
    <div>
      <img src={props.user.photo}  alt={props.user.name} />
      <h5>Welcome Back, {props.user.name}</h5>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserAvatar)
