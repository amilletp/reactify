import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = {
  root: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "white",
    flexGrow: 1
  }
};

const getInitialValueByPath = () => {
  let initialValue;
  switch (window.location.pathname) {
    case "/":
      initialValue = 0;
      break;
    case "/albums":
      initialValue = 1;
      break;
    case "/album":
      initialValue = 2;
      break;
    case "/player":
      initialValue = 3;
      break;
    case "/login":
      initialValue = 4;
      break;
    case "/profile":
      initialValue = 5;
      break;
    default:
      initialValue = 0;
  }
  return initialValue;
};

const TopBar = props => {
  const { classes } = props;
  const [value, setValue] = useState(getInitialValueByPath());
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Inicio" component={Link} to="/" />
        <Tab label="Álbums" component={Link} to="/albums" />
        <Tab label="Reproductor" component={Link} to="/player/1" />
        <Tab label="Inicio de sesión" component={Link} to="/login" />
        <Tab label="Perfil de usuario" component={Link} to="/profile" />
      </Tabs>
    </Paper>
  );
};

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopBar);
