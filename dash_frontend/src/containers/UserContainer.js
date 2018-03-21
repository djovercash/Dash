import React from 'react'
import UserSidebarContainer from './UserSidebarContainer'
import UserDetailContainer from './UserDetailContainer'

const UserContainer = () => {
  return (
    <div id="userContainer">
      <UserSidebarContainer />
      <UserDetailContainer />
    </div>
  )
}

export default UserContainer
