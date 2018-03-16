import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../actions/users'

const Navbar = (props) => {
  return (
    <div id="navbar">
      <h3>WELCOME THE DASH LADIES AND GENTS</h3>
      {props.loggedIn ?
        <button onClick={props.logout}>Logout</button>
        :
        null
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, {logout})(Navbar)
