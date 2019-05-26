import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { getRecommendedSongs } from "../../utils/utils";
import WithGridList from "./WithGridList";

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

  // Unir canciones con albums en mismo objeto
  const songsAlbum = getRecommendedSongs(songs).reduce((result, song) => {
    song = {
      ...song,
      album: albums.find(album => song.album_id === album.id)
    };
    return [...result, song];
  }, []);

  return (
    <Fragment>
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
                <source src="/music/funky_energy_loop.mp3" type="audio/mpeg" />
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
    </Fragment>
  );
};

SongsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  WithGridList(SongsGrid, 3, "Temas recomendados")
);
