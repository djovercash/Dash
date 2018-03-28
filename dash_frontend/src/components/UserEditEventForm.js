import React from 'react'
import moment from 'moment-timezone'
import {connect} from 'react-redux'
import Calendar from 'react-calendar'
import {updateEvent} from '../actions/events'

class UserEditEventForm extends React.Component {

  state = {
    title: '',
    location: '',
    description: '',
    start_date: new Date(),
    start_time: '',
    end_date: new Date(),
    end_time: '',
    friendFilter: '',
    friends: [],
    invited: [],
    invitedFriends: [],
    userCategories: [],
    createCategory: []
  }

  componentDidMount() {
    const startDateTime = moment(this.props.event.start_time).tz("America/New_York").format()
    const endDateTime = moment(this.props.event.end_time).tz("America/New_York").format()
    const startDateTimeSplit = startDateTime.split("T")
    const startDateArray = startDateTimeSplit[0].split("-")
    const startTime = startDateTimeSplit[1].slice(0, -9)
    const endDateTimeSplit = endDateTime.split("T")
    const endDateArray = endDateTimeSplit[0].split("-")
    const endTime = endDateTimeSplit[1].slice(0, -9)
    this.setState({
      title: this.props.event.title,
      location: this.props.event.location,
      description: this.props.event.description,
      start_date: new Date(startDateArray[0], startDateArray[1] -1 , startDateArray[2]),
      start_time: startTime,
      end_date: new Date(endDateArray[0], endDateArray[1] -1 , endDateArray[2]),
      end_time: endTime,
      friends: this.props.user.friends,
      invited: this.props.event.users,
      userCategories: this.props.user.friend_categories.filter(category => category.name !== "All")
    })
  }


  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleStartDate = (e) => {
    this.setState({
      start_date: e
    })
  }

  handleEndDate = (e) => {
    this.setState({
      end_date: e
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    const startDateMoment = moment(this.state.start_date).format()
    const endDateMoment = moment(this.state.end_date).format()
    const startDateArray = startDateMoment.split("T")
    const endDateArray = endDateMoment.split("T")
    const startDateArraySplit = startDateArray[0].split("-")
    const endDateArraySplit = endDateArray[0].split("-")
    const startTimeElements = this.state.start_time.split(":")
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
      id: this.props.event.id,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      start_time: new Date(startDateArraySplit[0], startDateArraySplit[1] - 1, startDateArraySplit[2], startTimeElements[0], startTimeElements[1]),
      end_time: new Date(endDateArraySplit[0], endDateArraySplit[1] - 1, endDateArraySplit[2], endTimeElements[0], endTimeElements[1]),
      user_id: this.props.user.id,
      friends: finalInvites
    }
    this.props.updateEvent(action)
  }

  renderFriendsForEventInvites() {
    const filteredFriends = this.state.friends.filter(friend => friend.name.toUpperCase().includes(this.state.friendFilter.toUpperCase()))
    if (filteredFriends.length > 0 && this.state.friendFilter !== '') {
      let filteredFriend = filteredFriends[0]
      let invited = this.state.invited.filter(invite => invite.name === filteredFriend.name)
      if (invited.length === 0) {
        return (
          <div className="otherUsers">
            <div className="friendDashboardList">
              <div className="friendDashboardListImg">
                <img src={filteredFriends[0].photo} width="50px" height="50px" alt={filteredFriends[0].name} />
              </div>
              <div className="friendDashboardStatus">
                <h5>{filteredFriends[0].name} | </h5>
                {!this.state.invitedFriends.includes(filteredFriends[0]) ?
                  <button onClick={() => {this.handleInvite(filteredFriends[0])}}>Invite</button>
                  :
                  <h5>Invited</h5>
                }
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="otherUsers">
            <div className="friendDashboardList">
              <div className="friendDashboardListImg">
                <img src={filteredFriends[0].photo} width="50px" height="50px" alt={filteredFriends[0].name} />
              </div>
              <div className="friendDashboardStatus">
                <h5>{filteredFriends[0].name} | </h5>
                <h5>Invited</h5>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  handleInvite = (friend) => {
    this.setState({
      invitedFriends: [...this.state.invitedFriends, friend]
    })
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
    const userSelectedCategories = this.state.userCategories.filter(category => !this.state.createCategory.includes(category.id))
    const selectedUserCategories = this.state.userCategories.filter(category => this.state.createCategory.includes(category.id))
    return (
      <div id="formCategory">
        <div className="formCategorySelect">
          <h4>All</h4>
          <select className="formCategorySelectOption" multiple="multiple" onClick={this.handleOnClickAdd}>
            {userSelectedCategories.map(category => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="formCategorySelect">
          <h4>Selected</h4>
          <select className="formCategorySelectOption" multiple="multiple" onClick={this.handleOnClickRemove}>
            {selectedUserCategories.map(category => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })}
          </select>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="form">
        <h1>Edit {this.state.title}</h1>
        <div className="formFields">
          <div>
            <label>Title: </label>
            <input type="text" name="title" value={this.state.title} onChange={this.handleOnChange}/>
          </div>
          <div>
            <label>Location: </label>
            <input type="text" name="location" value={this.state.location} onChange={this.handleOnChange}/>
          </div>
          <div>
            <label>Description: </label>
            <input type="text" name="description" value={this.state.description} onChange={this.handleOnChange}/>
          </div>
        </div>
        <div id="dateTimeContainer">
          <div>
            <h3>Start Date and Time</h3>
            <Calendar
              onChange={this.handleStartDate}
              value={this.state.start_date}
              className="calendar"
            />
            <label>Start Time: </label>
            <input type="time" name="start_time" value={this.state.start_time} onChange={this.handleOnChange}/>
          </div>
          <div>
            <h3>End Date and Time</h3>
            <Calendar
              onChange={this.handleEndDate}
              value={this.state.end_date}
              className="calendar"
            />
            <label>End Time: </label>
            <input type="time" name="end_time" value={this.state.end_time} onChange={this.handleOnChange}/>
          </div>
        </div>
        <div id="friendInviteContainer">
          <div id="SpecificInvite">
            <h3>Invite Specific Friend</h3>
            <input type="text" name="friendFilter" onChange={this.handleOnChange} />
            <div>
              {this.renderFriendsForEventInvites()}
            </div>
          </div>
          <div id="BubbleInvite">
            <h3>Invite a Bubble</h3>
            {this.renderUserCategories()}
          </div>
        </div>
        <button className="formButton" onClick={this.handleOnSubmit}>Update</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    event: state.specific_event
  }
}

export default connect(mapStateToProps, {updateEvent})(UserEditEventForm)
