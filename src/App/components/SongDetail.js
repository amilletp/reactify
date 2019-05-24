import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ErrorBoundary from "../errors/ErrorBoundary";
import { Button } from "@material-ui/core";
import { findSong } from "../utils/utils";
import { connect } from "react-redux";
import { navigate } from "../redux/actions/navigationActions";
import * as Constants from "../constants/constants";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "63%",
    height: "auto"
  },
  gridListTitle: {
    //marginTop: 57,
    height: "auto!important"
  },
  gridListTile: {
    height: "800px!important",
    width: "100%!important"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  card: {
    height: "50%",
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "55%"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "45%"
  },
  controls: {
    display: "flex",
    alignItems: "center" //,
    //    paddingLeft: theme.spacing.unit,
    //    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  },
  audio: {
    width: "100%"
  },
  button: {
    position: "absolute",
    top: "62%",
    left: "19%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 223,
    height: 50
  }
});

const SongDetail = props => {
  // De Material UI y del Router
  const { classes, match } = props;

  // Desde App
  let { albums, songs } = props;

  // Del Store de Redux
  const { topBarValue, updateValue } = props;

  if (topBarValue !== Constants.PLAYER) {
    updateValue(Constants.PLAYER);
  }

  // Este state unicamente es para provocar error en la aplicacion
  const [state, updateState] = useState([""]);

  songs = findSong(songs, match.params.id);

  // Unir canciones con albums en mismo objeto
  let songsAlbum = songs.reduce((result, song) => {
    song = {
      ...song,
      album: albums.find(album => song.album_id === album.id)
    };
    return [...result, song];
  }, []);

  const handleErrorClick = e => {
    updateState([]);
  };

  const handlePlay = e => {
    e.target.className = "pepito";
    console.log(e.target);
  };

  return (
    <ErrorBoundary
      onReset={props.onReset}
      message="Se ha producido un error cargando el reproductor"
    >
      <div className={classes.root}>
        <GridList
          cols={1}
          spacing={12}
          cellHeight={620}
          className={classes.gridList}
        >
          <GridListTile
            key="Subheader"
            cols={1}
            className={classes.gridListTitle}
          >
            <ListSubheader component="div">
              <h2>Reproductor</h2>
            </ListSubheader>
          </GridListTile>
          {songsAlbum.map(tile => (
            <GridListTile key={tile.id} className={classes.gridListTile}>
              <Card className={classes.card}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                      {tile.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {tile.album.artist}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Álbum: <br />
                      {tile.album.name}
                    </Typography>
                  </CardContent>
                  <div>
                    <audio
                      className={classes.audio}
                      onPlay={handlePlay}
                      controls
                    >
                      <source
                        src="/music/funky_energy_loop.mp3"
                        type="audio/mpeg"
                      />
                    </audio>
                  </div>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={tile.album.cover}
                  title={tile.album.name}
                />
              </Card>
            </GridListTile>
          ))}
        </GridList>
        <Button
          onClick={handleErrorClick}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Error{state[0].toLowerCase()}
        </Button>
      </div>
    </ErrorBoundary>
  );
};

SongDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
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
)(withStyles(styles, { withTheme: true })(SongDetail));
