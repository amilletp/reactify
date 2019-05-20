import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    paddingLeft: "39%",
    flexWrap: "wrap",
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

const UserLogin = props => {
  const { classes } = props;
  const [user, setUser] = useState({
    login: "",
    password: ""
  });

  const handleChange = field => event => {
    let modifiedUser = { ...user };
    modifiedUser[field] = event.target.value;
    setUser(modifiedUser);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        required
        id="outlined-login"
        label="Login"
        className={classes.textField}
        value={user.login}
        onChange={handleChange("login")}
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
      />
    </form>
  );
};

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserLogin);
