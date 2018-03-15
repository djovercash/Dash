import React from 'react'
import UserEventsList from '../components/UserEventsList'
import UserFriendsContainer from './UserFriendsContainer'

const UserOptionsContainer = () => {
  return (
    <div id="userOptionsContainer">
      <UserFriendsContainer />
      <UserEventsList />
    </div>
  )
}

export default UserOptionsContainer
