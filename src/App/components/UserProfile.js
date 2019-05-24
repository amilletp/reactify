import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import UserContext from "../contexts/user";
import {
  updateProfileData,
  initProfileData
} from "../redux/actions/userActions";
import { connect } from "react-redux";

const styles = theme => ({
  container: {
    display: "flex",
    paddingLeft: "33%",
    flexWrap: "wrap",
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 223,
    height: 50
  },
  buttonContainer: {
    width: "62%",
    marginTop: 9
  }
});

const UserProfile = props => {
  // De Material UI
  const { classes } = props;

  // Del Store
  const { user, initProfile, updateProfile } = props;

  // La informacion del usuario la inicializamos en
  // desde el UserContext, al no tener back-end y
  // hacer click en Guardar, persistimos en el mismo
  let userContext = useContext(UserContext);

  // Probar inicializar con el useEffect
  //updateProfile("name", userContext.name);
  //updateProfile("surname", userContext.name);
  //updateProfile("email", userContext.name);
  //initProfile(userContext);

  //const nameFieldRef = useRef();

  const handleChange = field => event => {
    updateProfile(field, event.target.value);
  };

  const handleSaveProfile = () => {
    userContext.name = user.name;
    userContext.surname = user.surname;
    userContext.email = user.email;
  };

  //useEffect(() => nameFieldRef.current.firstChild.focus());

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="Nombre"
        className={classes.textField}
        value={user.name}
        onChange={handleChange("name")}
        margin="normal"
        variant="outlined"
        //ref={nameFieldRef}
      />
      <TextField
        id="outlined-surname"
        label="Apellidos"
        className={classes.textField}
        value={user.surname}
        onChange={handleChange("surname")}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-email"
        label="Email"
        className={classes.textField}
        value={user.email}
        onChange={handleChange("email")}
        margin="normal"
        variant="outlined"
      />
      <div className={classes.buttonContainer}>
        <Button
          onClick={handleSaveProfile}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: {
      name: state.profile.name,
      surname: state.profile.surname,
      email: state.profile.email
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initProfile: user => dispatch(initProfileData({ ...user })),
    updateProfile: (field, value) => dispatch(updateProfileData(field, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserProfile));
