import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router";
import { parseSeconds } from "../utils/utils";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "darkblue",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    height: 239,
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    overflowY: "scroll"
  },
  table: {
    minWidth: "auto"
  },
  row: {
    cursor: "pointer",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const SongsTable = props => {
  const { classes, songs } = props;

  // Estado propio que no se usara nunca fuera del componente
  // Por eso no esta en Redux
  const [state, setState] = useState({ pathname: "", redirect: false });

  const handleClick = id => event => {
    setState({ pathname: "/player/" + id, redirect: true });
  };

  return (
    <Paper className={classes.root}>
      {/* En el TableBody no se permiten elementos <a> o <Link> 
        se hace el Redirect de esta forma con el handleClick */}
      {state.redirect === true && <Redirect to={state.pathname} />}
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Nombre</CustomTableCell>
            <CustomTableCell align="right">Duración</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map(row => (
            <TableRow
              onClick={handleClick(row.id)}
              className={classes.row}
              key={row.id}
            >
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right">
                {parseSeconds(row.seconds)}
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

SongsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SongsTable);
