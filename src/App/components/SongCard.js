import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SongsTable from "./SongsTable";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

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
  }
});

const findSong = (songs, id) => {
  const parsedId = parseInt(id, 10);
  let result = songs.find(song => song.id === parsedId);
  result = result === undefined ? [] : [result];
  return result;
};

const SongCard = props => {
  const { classes, match } = props;
  let { albums, songs } = props;
  songs = findSong(songs, match.params.id);

  const songsAlbum = songs.reduce((result, song) => {
    song = {
      ...song,
      album: albums.find(album => song.album_id === album.id)
    };
    return [...result, song];
  }, []);

  return (
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
          <ListSubheader component="div">Reproductor</ListSubheader>
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
                <audio className={classes.audio} controls>
                  <source
                    src="/music/funky_energy_loop.mp3"
                    type="audio/mpeg"
                  />
                </audio>
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
    </div>
  );
};

SongCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SongCard);
