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
    end_time: ''
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
    const action = {
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      start_time: new Date(startDateElements[0], startDateElements[1], startDateElements[2], startTimeElements[0], startTimeElements[1]),
      end_time: new Date(endDateElements[0], endDateElements[1], endDateElements[2], endTimeElements[0], endTimeElements[1]),
      user_id: this.props.user.id
    }
    this.props.addEvent(action)
  }

  render() {
    console.log(this.state)
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
