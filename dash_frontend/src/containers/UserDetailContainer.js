import React from 'react'
import {connect} from 'react-redux'
import UserEventDetails from '../components/UserEventDetails'
import UserOptionsContainer from './UserOptionsContainer'
import UserCreateEventForm from '../components/UserCreateEventForm'
import UserEditEventForm from '../components/UserEditEventForm'
import UserEventfulList from '../components/UserEventfulList'
import UserDashboard from '../components/UserDashboard'
import UserFriendDashboard from '../components/UserFriendDashboard'
import UserUpdateForm from '../components/UserUpdateForm'
import UserEventsList from '../components/UserEventsList'
import {fetchEvents} from '../actions/events'

class UserDetailContainer extends React.Component{

  componentDidMount() {
    this.props.fetchEvents()
  }

  whatToRender = (props) => {
    if (props.isLoading) {
      return (
        <img src="loading.gif" alt="loading"/>
      )
    } else if (props.createForm) {
      return (
        <UserCreateEventForm />
      )
    } else if (props.editForm) {
      return (
        <UserEditEventForm />
      )
    } else if (props.eventful) {
      return (
        <UserEventfulList />
      )
    } else if (props.findFriends) {
      return (
        <UserFriendDashboard />
      )
    } else if (props.updateAccount) {
      return (
        <UserUpdateForm />
      )
    } else if (props.event.title !== '') {
      return (
        <UserEventDetails />
      )
    } else {
      return (
        <UserDashboard />
      )
    }
  }

  render() {
    return (
      <div id="userDetailContainer">
        {this.whatToRender(this.props)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    event: state.specific_event, 
    createForm: state.createForm,
    editForm: state.editForm,
    eventful: state.eventfulSearch,
    updateAccount: state.updateAccount,
    isLoading: state.isLoading,
    findFriends: state.findFriends
  }
}

export default connect(mapStateToProps, {fetchEvents})(UserDetailContainer)
