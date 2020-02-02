import React, { Component } from 'react';
import axios from 'axios';
import './ScheduleList.css';
import { Link } from "react-router-dom";
import { getFormattedDate, tConvert } from "../../mixins/common"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

  getShowSchedules(url) {
    this.setState({ schedules: [] });
    // Fetch TV Schedules from tv maze api
    axios.get(`http://api.tvmaze.com/schedule?country=US&date=${getFormattedDate(this.today)}`)
      .then((response) => {
        const data = response.data;
        this.setState({ schedules: data });
      }).catch(error => {
        console.log(error);
      })
  }

  useStyles() {
    return makeStyles({
      table: {
        minWidth: 700,
      },
    });
  }

  render() {
    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    const StyledTableRow = withStyles(theme => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.default,
        },
      },
    }))(TableRow);
    const classes = this.useStyles();


    // Show Schedule List
    const scheduleList = this.state.schedules;
    let scheduleView = <div>Loading...</div>
    if (scheduleList && scheduleList.length > 1) {
      scheduleView = < TableContainer component={Paper} >
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Schedule Time</StyledTableCell>
              <StyledTableCell >Show Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduleList.map(row => (
              <StyledTableRow key={row.airtime}>
                <StyledTableCell component="th" scope="row">
                  {tConvert(row.airtime)}
                </StyledTableCell>
                <StyledTableCell >
                  <Link to={`/${row.show.id}`}>{row.show.name}</Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
    }

    // Render views
    return (
      <div className="container">
        <div className="row">
          <h5>For {getFormattedDate(this.today)} </h5>
          {scheduleView}
        </div>
      </div>
    )
  }
}


export default ScheduleList;