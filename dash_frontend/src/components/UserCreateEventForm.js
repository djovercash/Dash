import React from 'react'
import {connect} from 'react-redux'
import {addEvent} from '../actions/events'

class UserCreateEventForm extends React.Component {

  state = {
    title: '',
    location: '',
    description: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    friendFilter: '',
    friends: [...this.props.user.friends],
    invitedFriends: [],
    userCategories: [],
    createCategory: []
  }

  componentDidMount() {
    this.setState({
      userCategories: this.props.user.friend_categories.filter(category => category.name !== "All")
    })
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    const startDateElements = this.state.start_date.split("-")
    const startTimeElements = this.state.start_time.split(":")
    const endDateElements = this.state.end_date.split("-")
    const endTimeElements = this.state.end_time.split(":")
    this.state.friends.filter(friend => {
      for (const category of friend.friend_category) {
        if (this.state.createCategory.includes(category.id)) {
          this.state.invitedFriends.push(friend)
        }
      }
    })
    const userFriends = this.state.invitedFriends.filter(friend => friend.id !== this.props.user.id)
    const finalInvites = userFriends.map(friend => friend.id).filter((value, index, self) => self.indexOf(value) === index)
    const action = {
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      start_time: new Date(startDateElements[0], startDateElements[1] - 1, startDateElements[2], startTimeElements[0], startTimeElements[1]),
      end_time: new Date(endDateElements[0], endDateElements[1] - 1, endDateElements[2], endTimeElements[0], endTimeElements[1]),
      user_id: this.props.user.id,
      friends: finalInvites
    }
    this.props.addEvent(action)
  }

  renderFriendsForEventInvites() {
    const filteredFriends = this.state.friends.filter(friend => friend.name.toUpperCase().includes(this.state.friendFilter.toUpperCase()))
    if (filteredFriends.length > 0 && this.state.friendFilter !== '') {
      return (
        <div>
          <h4>{filteredFriends[0].name} | </h4>
          {!this.state.invitedFriends.includes(filteredFriends[0]) ?
            <button onClick={() => {this.handleInvite(filteredFriends[0])}}>Invite</button>
            :
            <h5>Invited</h5>
           }
        </div>
      )
    } else {
      null
    }
  }

  handleOnClickAdd = (e) => {
    const categoryId = parseInt(e.target.value)
    this.setState({
      createCategory: [...this.state.createCategory, categoryId]
    })
  }

  handleOnClickRemove = (e) => {
    const categoryId = parseInt(e.target.value)
    const remainingCategoryIds = this.state.createCategory.filter(id => id !== categoryId)
    this.setState({
      createCategory: [...remainingCategoryIds]
    })
  }

  renderUserCategories() {
    console.log(this.state.friends)
    const userSelectedCategories = this.state.userCategories.filter(category => !this.state.createCategory.includes(category.id))
    const selectedUserCategories = this.state.userCategories.filter(category => this.state.createCategory.includes(category.id))
    console.log(userSelectedCategories)
    return (
      <div>
        <h3>Here are the categories</h3>
        <div>
          <h4>All Categories</h4>
          <select multiple="multiple" onClick={this.handleOnClickAdd}>
            {userSelectedCategories.map(category => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div>
          <h4>Selected Categories</h4>
          <select multiple="multiple" onClick={this.handleOnClickRemove}>
            {selectedUserCategories.map(category => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })}
          </select>
        </div>
      </div>
    )
  }

  handleInvite = (friend) => {
    this.setState({
      invitedFriends: [...this.state.invitedFriends, friend]
    })
  }

  render() {
    console.log(this.props.user)
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <h3>Create a new Event</h3>
          <label>Title: </label>
          <input type="text" name="title" onChange={this.handleOnChange}/>
          <label>Location: </label>
          <input type="text" name="location" onChange={this.handleOnChange}/>
          <label>Description: </label>
          <input type="text" name="description" onChange={this.handleOnChange}/>
          <label>Start Date: </label>
          <input type="date" name="start_date" onChange={this.handleOnChange}/>
          <label>Start Time: </label>
          <input type="time" name="start_time" onChange={this.handleOnChange}/>
          <label>End Date: </label>
          <input type="date" name="end_date" onChange={this.handleOnChange}/>
          <label>End Time: </label>
          <input type="time" name="end_time" onChange={this.handleOnChange}/>
          <input type="submit" value="Submit" />
        </form>
        <label>Invite Friends</label>
        <input type="text" name="friendFilter" onChange={this.handleOnChange} />
        <div>
          {this.renderFriendsForEventInvites()}
        </div>
        <div>
          <h3>Invite A Group</h3>
          {this.renderUserCategories()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, { addEvent })(UserCreateEventForm)
