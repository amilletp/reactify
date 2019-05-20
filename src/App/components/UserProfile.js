import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    paddingLeft: "35%",
    flexWrap: "wrap",
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const UserProfile = props => {
  const { classes } = props;
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: ""
  });

  const handleChange = field => event => {
    let modifiedUser = { ...user };
    modifiedUser[field] = event.target.value;
    setUser(modifiedUser);
    //    this.setState({
    //      [name]: event.target.value
    //    });
  };

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
    </form>
  );
};

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserProfile);
