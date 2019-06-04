import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  root: {
    position: "fixed",
    top: "15vh",
    left: "50vw",
    zIndex: 200
  }
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}
