import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";
import { navigate } from "../redux/actions/navigationActions";

const styles = {
  root: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "white",
    flexGrow: 1
  }
};

const TopBar = props => {
  // De Material UI
  const { classes } = props;
  // Del Store
  const { topBarValue, updateValue } = props;
  const handleChange = (event, value) => {
    updateValue(value);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={topBarValue}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Inicio" component={Link} to="/" />
        <Tab label="Recientes" component={Link} to="/recent" />
        <Tab label="Buscar" component={Link} to="/search" />
        <Tab label="Álbums" component={Link} to="/albums" />
        <Tab label="Reproductor" component={Link} to="player/1" />
        <Tab label="Inicio de sesión" component={Link} to="/login" />
        <Tab label="Perfil de usuario" component={Link} to="/profile" />
      </Tabs>
    </Paper>
  );
};

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    topBarValue: state.navigation.topBarValue
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateValue: topBarValue => dispatch(navigate(topBarValue))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TopBar));
