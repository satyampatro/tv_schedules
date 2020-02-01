import React, { Component } from 'react';
import axios from 'axios';
import './ScheduleList.css';
import { Link, Route } from "react-router-dom";

class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: []
    };
  }

  componentDidMount() {
    this.getShowSchedules(this.props.default);
  }

  getShowSchedules(url) {
    this.setState({ schedules: [] });

    // Fetch TV Schedules from tv maze api
    axios.get(`http://api.tvmaze.com/schedule?country=US&date=2020-02-01`)
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

    return (
      <div className="container">
        <div className="row">
          <br />
          {scheduleView}
        </div>
      </div>
    )
  }
}


export default ScheduleList;