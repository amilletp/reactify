import React, { useContext, Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import UserContext from "../contexts/user";
import { Redirect } from "react-router";
import {
  initLoginData,
  updateLoginData,
  validateLoginData
} from "../redux/actions/userActions";
import { connect } from "react-redux";

const styles = theme => ({
  container: {
    display: "flex",
    paddingLeft: "36%",
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
  },
  message: {
    marginTop: 18
  },
  deniedMessage: {
    marginTop: 20,
    color: "red"
  }
});

const UserLogin = props => {
  // De Material UI y Router
  const { classes, location } = props;

  // De Redux Store
  const { login, updateLogin, validateLogin } = props;

  // Utilizamos el contexto de usuario para
  // almacenar el valor de signedIn
  let userContext = useContext(UserContext);

  const loginFieldRef = useRef();

  const handleChange = field => event => {
    updateLogin(field, event.target.value);
  };

  const handleLogin = e => {
    validateLogin(login.login, login.password);
    userContext.signedIn = login.login === "test" && login.password === "pwd";
  };

  useEffect(() => {
    if (login.login.length === 0 && login.password.length === 0) {
      loginFieldRef.current.firstChild.focus();
    }
  });

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        {userContext.signedIn && (
          <Typography
            className={classes.message}
            variant="subtitle1"
            color="textSecondary"
          >
            Usuario identificado correctamente
          </Typography>
        )}
        {!userContext.signedIn && (
          <Fragment>
            {location.state && location.state.redirected && (
              <Typography
                className={classes.message}
                variant="subtitle1"
                color="textSecondary"
              >
                Estás intentando acceder a un área privada. Por favor, haz login
                primero.
              </Typography>
            )}
            {login.denied && (
              <Typography className={classes.deniedMessage} variant="subtitle1">
                Usuario y/o contraseña incorrectos
              </Typography>
            )}
            <TextField
              required
              error={login.errorLogin}
              id="outlined-login"
              label="Login"
              className={classes.textField}
              value={login.login}
              onChange={handleChange("login")}
              margin="normal"
              variant="outlined"
              ref={loginFieldRef}
            />
            <TextField
              required
              error={login.errorPwd}
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              value={login.password}
              onChange={handleChange("password")}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />
          </Fragment>
        )}{" "}
      </div>

      {!userContext.signedIn && (
        <div className={classes.buttonContainer}>
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Acceder
          </Button>
        </div>
      )}

      {userContext.signedIn === true &&
        location.state &&
        location.state.protectedPath && (
          <Redirect to={location.state.protectedPath} />
        )}
    </form>
  );
};

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    login: {
      login: state.login.login,
      password: state.login.password,
      errorLogin: state.login.errorLogin,
      errorPwd: state.login.errorPwd,
      denied: state.login.denied
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initLogin: () => dispatch(initLoginData()),
    updateLogin: (field, value) => dispatch(updateLoginData(field, value)),
    validateLogin: (login, password) =>
      dispatch(validateLoginData(login, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserLogin));
