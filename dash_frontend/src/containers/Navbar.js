import React from 'react'
import {connect} from 'react-redux'
import {logout, account, home} from '../actions/users'

const Navbar = (props) => {
  const firstName = props.user.name.split(" ")

  const logout = () => {
    props.logout()
    props.history.push("/login")
  }

  return (
    <div id="navbar">
      <div className="navbarItem">
        <h3 onClick={() => props.home()}>DASH</h3>
      </div>
      <div className="navbarItem">
        <h5 onClick={() => {props.home()}}>Welcome back, {firstName[0]}</h5>
        <img onClick={() => {props.account()}} src="three_dots.png" alt="dropdown options" height="20px"/>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    user: state.user
  }
}

export default connect(mapStateToProps, {logout, account, home})(Navbar)
