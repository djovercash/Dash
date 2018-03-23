import React from 'react'
import { connect } from 'react-redux'
import {fetchUsers, addFriend, createCategory, updateFriendCategory} from '../actions/users'
import BubbleChart from './BubbleChart'

class UserFriendDashboard extends React.Component{
  state = {
    friendFinder: '',
    selectedFriend: {},
    createdCategory: '',
    categorySelection: 'All',
    userCategories: [],
    createCategory: [],
    destroyCategory: []
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUpdate = (e) => {
    this.props.updateFriendCategory(this.props.user, this.state.selectedFriend, this.state.createCategory, this.state.destroyCategory)
  }

  handleOnClickAdd = (e) => {
    const category = this.props.user.friend_categories.find(category => category.id === parseInt(e.target.value))
    const categoryId = parseInt(e.target.value)
    const nonAddedCategories = this.state.destroyCategory.filter(id => id !== categoryId)

    this.setState({
      selectedFriend: {
        ...this.state.selectedFriend,
        friend_category: [
          ...this.state.selectedFriend.friend_category,
          category
        ]
      },
      createCategory: [...this.state.createCategory, categoryId],
      destroyCategory: [...nonAddedCategories]
    })
  }

  handleOnClickRemove = (e) => {
    const selectedCategory = this.props.user.friend_categories.find(category => category.id === parseInt(e.target.value))
    const selectedCategoryId = parseInt(e.target.value)
    const nonRemovedCategories = this.state.selectedFriend.friend_category.filter(category => category.id !== selectedCategoryId)
    const nonRemovedCategoryIds = this.state.createCategory.filter(id => id !== selectedCategoryId)

    this.setState({
      selectedFriend: {
        ...this.state.selectedFriend,
        friend_category: [
          ...nonRemovedCategories
        ]
      },
      createCategory: [...nonRemovedCategoryIds],
      destroyCategory: [...this.state.destroyCategory, selectedCategoryId]
    })
  }

  handleFriendship = (friend) => {
    const friendship = {
      user: this.props.user,
      friend: friend
    }
    this.props.addFriend(friendship)
  }

  userFriends = (user) => {
    const userFriends = user.friends
    const userFriendsEdited = userFriends.filter(friend => friend.id !== user.id)
    const userCategories = user.friend_categories
    const userFriendsCategories = userFriendsEdited.filter(friend => {
      for (let i = 0; i < friend.friend_category.length; i++) {
        if (friend.friend_category[i].name === this.state.categorySelection) {
          return friend
        }
      }
    })
    return (
        <div id="userFriendList">
          <select name="categorySelection" onChange={this.handleOnChange}>
            {userCategories.map(category => {
              return <option key={category.id} value={category.name}>{category.name}</option>
            })}
          </select>
          {userFriendsCategories.map(friend => {
            return <h5 onClick={() => {this.selectFriend(friend)}} key={friend.id}>{friend.name}</h5>
          })}
        </div>
    )
  }

  createCategory = () => {
    this.props.createCategory(this.state.createdCategory, this.props.user.id)
  }

  selectFriend = (friend) => {
    const friendCategoryIds = friend.friend_category.map(category => category.id)
    const friendCategoryIdsWithoutOne = friendCategoryIds.filter(id => id !== 1)
    const nonFriendCategories = this.props.user.friend_categories.filter(category => !friendCategoryIdsWithoutOne.includes(category.id))
    const nonFriendCategoryIds = nonFriendCategories.map(category => category.id)
    const nonFriendCategoryIdsWithoutOne = nonFriendCategoryIds.filter(id => id !== 1)
    this.setState({
      selectedFriend: friend,
      userCategories: this.props.user.friend_categories.filter(category => category.name !== "All"),
      createCategory: friendCategoryIdsWithoutOne,
      destroyCategory: nonFriendCategoryIdsWithoutOne
    })
  }

  selectedFriend = () => {
    if (this.state.selectedFriend.name) {
      const selectedFriendCategories = this.state.selectedFriend.friend_category.filter(category => category.name !== "All")
      const userSelectedCategories = this.state.userCategories.filter(category => !this.state.createCategory.includes(category.id))
      return (
        <div>
          <div>
            <h3>{this.state.selectedFriend.name}</h3>
            <img src={this.state.selectedFriend.photo} alt={this.state.selectedFriend.name} width="100px" height="100px"/>
            <h4>Add or Remove a Category: </h4>
            <select multiple="multiple" name="createCategory" onClick={this.handleOnClickAdd}>
              {userSelectedCategories.map(category => {
                return <option key={category.id} value={category.id}>{category.name}</option>
              })}
            </select>
            <select multiple="multiple" name="createCategory" onClick={this.handleOnClickRemove}>
              {selectedFriendCategories.map(category => {
                return <option key={category.id} value={category.id}>{category.name}</option>
              })}
            </select>
          </div>
          <button onClick={this.handleUpdate}>Update Friend</button>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Welcome to your FriendDashboard</h3>
        </div>
      )
    }
  }

  findFriends = () => {
    let filteredFriends = this.props.users.filter(user => user.name.toUpperCase().includes(this.state.friendFinder.toUpperCase()))
    if (filteredFriends.length > 0 && this.state.friendFinder !== '') {
      const filteredFriend = filteredFriends[0]
      const friendsAlready = this.props.user.friends.find(friend => friend.id === filteredFriend.id)
      return (
        <div className="friendFinder">
          <h3>Find New Friends</h3>
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
          <h3>Find New Friends</h3>
          <input type="text" name="friendFinder" onChange={this.handleOnChange} />
        </div>
      )
    }
  }

///COME BACK TO THIS
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

    if (newNearbyUsers.length > 3) {
      const topThreeUsers = newNearbyUsers.slice(0, 3)
      return topThreeUsers
    } else {
      return newNearbyUsers
    }
  }

  render() {
    return (
      <div id="friendDashboard">
        <div id="userFriendsDashboard">
          <div>
            <BubbleChart />
          </div>
          <div>
            <h3>Your Friends</h3>
            {this.userFriends(this.props.user)}
          </div>
          <div>
            <h3>Create a Category</h3>
            <input type="text" name="createdCategory" onChange={this.handleOnChange} /><br />
            <input type="submit" value="Submit" onClick={this.createCategory}/>
          </div>
          <div>
            <h3>Friend Category/Stats</h3>
            {this.selectedFriend()}
          </div>
        </div>
        <div id="nonUserFriends">
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
          <div>
          {this.findFriends()}
          </div>
        </div>
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

export default connect(mapStateToProps, {addFriend, createCategory, updateFriendCategory})(UserFriendDashboard)
