import React, { Component } from 'react';
import axios from 'axios';
import './ShowDetail.css';

class ShowDetail extends Component {
  showId = null;
  showDetailApi = 'http://api.tvmaze.com/shows';
  constructor(props) {
    super(props);
    this.showId = this.props.match.params.id;
    this.state = {
      showMetadata: null
    };
  }

  componentDidMount() {
    this.fetchShowMetadata();
  }

  fetchShowMetadata() {
    this.setState({ showMetadata: null });
    // Fetch show metadata from tv maze api
    axios.get(`${this.showDetailApi}/${this.showId}`)
      .then((result) => {
        this.setState({ showMetadata: result.data });
      })
      .catch((e) => {
        console.error(e)
      });
  }

  render() {
    let showMetadataView = <div>Loading...</div>;
    if (this.state.showMetadata) {
      let showMetadata = this.state.showMetadata;
      showMetadataView = <div >
        <span className="detailRow">Show Name: {showMetadata.name}</span><br />
        <span className="detailRow">Air Time: {showMetadata.schedule.time} </span><br />
        <span className="detailRow">Duration: {showMetadata.runtime} Minutes</span><br />
        <span className="detailRow">Rating: {showMetadata.rating.average}/10</span><br />
        <span className="detailRow">Description: {showMetadata.summary} }</span><br />
      </div >
    }

    return (
      <div >
        {showMetadataView}
      </div>
    )
  }
}
export default ShowDetail;