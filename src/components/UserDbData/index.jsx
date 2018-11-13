import React from 'react'

import './index.css'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(profile, likes, comments, follows, unfollows, server_calls, created) {
  id += 1;
  return { id, profile, likes, comments, follows, unfollows, server_calls, created };
}

const rows = [
  createData('cycling_apparel', 3, 10, 11, 12, 13, '2018-11-13'),
  createData('cycling_apparel', 3, 10, 11, 12, 13, '2018-11-13'),
  createData('cycling_apparel', 3, 10, 11, 12, 13, '2018-11-13')
];

function UserDbData(props) {
  const { classes } = props;

  return (
    <div className="wrapper">
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell numeric>profile</TableCell>
            <TableCell numeric>likes</TableCell>
            <TableCell numeric>commnets</TableCell>
            <TableCell numeric>follows</TableCell>
            <TableCell numeric>unfollows</TableCell>
            <TableCell numeric>server calls</TableCell>
            <TableCell numeric>created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell numeric>{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.profile}
                </TableCell>
                <TableCell numeric>{row.likes}</TableCell>
                <TableCell numeric>{row.comments}</TableCell>
                <TableCell numeric>{row.follows}</TableCell>
                <TableCell numeric>{row.unfollows}</TableCell>
                <TableCell numeric>{row.server_calls}</TableCell>
                <TableCell numeric>{row.created}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    </div>
  );
}

UserDbData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDbData);