import React from 'react'
import { connect } from 'react-redux'
import {fetchUser} from '../actions/users'
import UserSidebarContainer from './UserSidebarContainer'

class UserContainer extends React.Component{

  componentDidMount() {
    this.props.fetchUser(61)
  }
  render() {
    return (
      <div>
        <h3>Yas Qween</h3>
        <UserSidebarContainer />
      </div>
    )
  }
}

export default connect(null, { fetchUser })(UserContainer)
