import React from 'react'
import { connect } from 'react-redux'
import {fetchUsers, addFriend} from '../actions/users'

class UserFriendDashboard extends React.Component{
  state = {
    friendFinder: ''
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFriendship = (friend) => {
    const friendship = {
      user: this.props.user,
      friend: friend
    }
    this.props.addFriend(friendship)
  }

  findFriends = () => {
    const filteredFriends = this.props.users.filter(user => user.name.toUpperCase().includes(this.state.friendFinder.toUpperCase()))
    if (filteredFriends.length > 0 && this.state.friendFinder !== '') {
      const filteredFriend = filteredFriends[0]
      const friendsAlready = this.props.user.friends.find(friend => friend.id === filteredFriend.id)
      return (
        <div className="friendFinder">
          <h3>Find Friends</h3>
          <input type="text" name="friendFinder" onChange={this.handleOnChange} />
            <h5><img src={filteredFriends[0].photo} width="50px" height="50px" alt={filteredFriends[0].name}/>{filteredFriends[0].name}</h5>
            {!friendsAlready ?
              <button onClick={() => {this.handleFriendship(filteredFriends[0])}}>Add Friend</button>
              :
              <h5>Already Friends</h5>
            }
        </div>
      )
    } else {
      return (
        <div className="friendFinder">
          <h3>Find Friends</h3>
          <input type="text" name="friendFinder" onChange={this.handleOnChange} />
        </div>
      )
    }
  }

  newestUsers = () => {
    const nearbyUsers = this.props.users.filter(user => user.hometown === this.props.user.hometown)
    const userFriends = this.props.user.friends
    const nearbyUsersIds = []
    const userFriendsIds = []
    const newNearbyUsers = []
    for (const friend of userFriends) {
      userFriendsIds.push(friend.id)
    }
    for (const user of nearbyUsers) {
      nearbyUsersIds.push(user.id)
    }

    for (let i = 0; i < nearbyUsersIds.length; i++) {
      if (!userFriendsIds.includes(nearbyUsersIds[i])) {
        let user = nearbyUsers.find(user => user.id === nearbyUsersIds[i])
        newNearbyUsers.push(user)
      }
    }
    console.log(newNearbyUsers) ///COME BACK TO US

    if (newNearbyUsers.length > 5) {
      const topTenUsers = newNearbyUsers.slice(0, 5)
      return topTenUsers
    } else {
      return newNearbyUsers
    }
  }

  render() {
    return (
      <div>
        <div>
          <h3>Other users near {this.props.user.hometown}</h3>
          {this.newestUsers(this.props.users).map(user => {
            return (
              <div key={user.name} className="friendDashboardList">
                <img src={user.photo} width="50px" height="50px" alt={user.name}/>
                <div className="friendDashboardStatus">
                  <h5>{user.name}</h5>
                  {!this.props.user.friends.find(friend => friend.id === user.id) ?
                    <button onClick={() => {this.handleFriendship(user)}}>Add Friend</button>
                    :
                    <h5>Already Friends</h5>
                  }
                </div>
              </div>
            )
          })}
        </div>
        {this.findFriends()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    user: state.user
  }
}

export default connect(mapStateToProps, {addFriend})(UserFriendDashboard)
