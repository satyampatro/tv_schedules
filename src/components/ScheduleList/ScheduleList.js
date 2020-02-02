import React, { Component } from 'react';
import axios from 'axios';
import './ScheduleList.css';
import { Link } from "react-router-dom";

class ScheduleList extends Component {
  today = new Date();

  constructor(props) {
    super(props);
    this.state = {
      schedules: []
    };
  }

  componentDidMount() {
    this.getShowSchedules(this.props.default);
  }

  getFormattedDate() {
    let month = this.today.getMonth();
    if (month < 10) {
      month = `0${month}`
    }
    let day = this.today.getDate();
    if (day < 10) {
      day = `0${day}`
    }
    return `${this.today.getFullYear()}-${month}-${day}`;
  }

  getShowSchedules(url) {
    this.setState({ schedules: [] });
    // Fetch TV Schedules from tv maze api
    axios.get(`http://api.tvmaze.com/schedule?country=US&date=${this.getFormattedDate()}`)
      .then((response) => {
        const data = response.data;
        this.setState({ schedules: data });
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    // Show Schedule List
    const scheduleList = this.state.schedules;
    let scheduleView = <div>Loading...</div>
    if (scheduleList && scheduleList.length > 1) {
      scheduleView = scheduleList.map(schedule => (
        < div key={schedule.id} onClick={this.onShowDetailClick} className="showDetailRow" >
          <Link to={`/showDetails/${schedule.show.id}`}>{schedule.show.name}</Link>
        </div >
      ))
    }

    // Render views
    return (
      <div className="container">
        <div className="row">
          <h5>For {this.getFormattedDate()} </h5>
          {scheduleView}
        </div>
      </div>
    )
  }
}


export default ScheduleList;