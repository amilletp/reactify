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
import { Link } from "react-router-dom";

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
    height: "auto!important"
  },
  gridListTile: {
    height: "250px!important",
    width: "50%!important"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  card: {
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
    //paddingLeft: theme.spacing.unit,
    //paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  },
  audio: {
    width: "100%"
  }
});

const getRecommendedSongs = songs => {
  let maxLength = 6;
  let length =
    songs.length >= maxLength ? maxLength : Math.floor(songs.length / 2);
  return songs.sort(() => Math.random() - 0.5).slice(0, length);
};

//                <div className={classes.controls}>
//                  <IconButton aria-label="Previous">
//                    {theme.direction === "rtl" ? (
//                      <SkipNextIcon />
//                    ) : (
//                      <SkipPreviousIcon />
//                    )}
//                  </IconButton>
//                  <IconButton aria-label="Play/pause">
//                    <PlayArrowIcon className={classes.playIcon} />
//                  </IconButton>
//                  <IconButton aria-label="Next">
//                    {theme.direction === "rtl" ? (
//                      <SkipPreviousIcon />
//                    ) : (
//                      <SkipNextIcon />
//                    )}
//                  </IconButton>
//                </div>

const SongsGrid = props => {
  const { classes, albums, songs } = props;

  const songsAlbum = getRecommendedSongs(songs).reduce((result, song) => {
    song = {
      ...song,
      album: albums.find(album => song.album_id === album.id)
    };
    return [...result, song];
  }, []);

  return (
    <div className={classes.root}>
      <GridList
        cols={2}
        spacing={12}
        cellHeight={620}
        className={classes.gridList}
      >
        <GridListTile
          key="Subheader"
          cols={2}
          className={classes.gridListTitle}
        >
          <ListSubheader component="div">Temas recomendados</ListSubheader>
        </GridListTile>
        {songsAlbum.map(tile => (
          <GridListTile key={tile.id} className={classes.gridListTile}>
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Link to={`/player/${tile.id}`}>
                    <Typography component="h6" variant="h6">
                      {tile.name}
                    </Typography>
                  </Link>
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

SongsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SongsGrid);
