import React, { Component } from 'react'
import api from '../../services/api'

import './index.css'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { HashLoader } from 'react-spinners'
import { css } from 'react-emotion'

// emotion lib
const override = css`
    display: block;
    margin: 15px auto;`;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class UserDbData extends Component {

  state = {
    all_activities: [],
    loading: true
  }

  componentDidMount() {
    this.getAllActivities()
    // adds 5segs timer to reload database data
    this.timerId = setInterval(() => {
      this.getAllActivities()
    }, 5000);
  }

  componentWillUnmount() {
    // clean timer
    clearInterval(this.timeId)
  }

  getAllActivities = async () => {
    const response = await api.get('get_all_activities')
    this.setState({
      all_activities: response.data.data
    })
    this.setState({
      loading: false
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="wrapper">
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>profile</TableCell>
                <TableCell numeric>likes</TableCell>
                <TableCell numeric>comments</TableCell>
                <TableCell numeric>follows</TableCell>
                <TableCell numeric>unfollows</TableCell>
                <TableCell numeric>server calls</TableCell>
                <TableCell>created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.all_activities.map(row => {
                return (
                  <TableRow key={row.rowid}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell numeric>{row.likes}</TableCell>
                    <TableCell numeric>{row.comments}</TableCell>
                    <TableCell numeric>{row.follows}</TableCell>
                    <TableCell numeric>{row.unfollows}</TableCell>
                    <TableCell numeric>{row.server_calls}</TableCell>
                    <TableCell numeric>{row.day_filter}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <HashLoader
          className={override}
          sizeUnit={"px"}
          size={50}
          color={'#3f51b5'}
          loading={this.state.loading}
        />
        </Paper>
      </div>
    )
  }
}

UserDbData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDbData);