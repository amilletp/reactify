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
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SongsTable from "../SongsTable";

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
  gridListTile: {},
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  card: {
    maxWidth: 400
  },
  cardContent: {
    padding: 0
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const getRecommendedSongs = songs => {
  let maxLength = 6;
  let length =
    songs.length >= maxLength ? maxLength : Math.floor(songs.length / 2);
  return songs.sort(() => Math.random() - 0.5).slice(0, length);
};

const WithGridList = (WrappedComponent, props) => {
  // Retornamos un nuevo componente
  return props => {
    const {
      classes,
      albums,
      songs,
      gridListCols,
      renderSongs,
      titleLabel
    } = props;

    let items = albums;

    if (renderSongs) {
      const songsAlbum = getRecommendedSongs(songs).reduce((result, song) => {
        song = {
          ...song,
          album: albums.find(album => song.album_id === album.id)
        };
        return [...result, song];
      }, []);

      items = songsAlbum;
    }

    return (
      <div className={classes.root}>
        <GridList
          cols={gridListCols}
          spacing={12}
          cellHeight={620}
          className={classes.gridList}
        >
          <GridListTile key="Subheader" cols={gridListCols}>
            <ListSubheader component="div">{titleLabel}</ListSubheader>
          </GridListTile>
          <WrappedComponent classes={classes} items={items} songs={songs} />
        </GridList>
      </div>
    );
  };
};

WithGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true });
//export default WithGridList;

//withStyles(styles)(CardsGrid);
