import React, { useState, Fragment } from "react";
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
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SongsTable from "../SongsTable";
import { Link } from "react-router-dom";
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
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  card: {
    maxWidth: 400,
    textDecoration: "none"
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
    backgroundColor: red[500],
    textDecoration: "none"
  }
});

const Albums = props => {
  const { classes, albums, songs } = props;

  return (
    <Fragment>
      {albums.map(tile => (
        <GridListTile key={tile.id}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Album" className={classes.avatar}>
                  {tile.name.charAt(0)}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              component={Link}
              to={`/albums/${tile.id}`}
              title={tile.name}
              subheader={tile.artist}
            />
            <CardMedia
              className={classes.media}
              image={tile.cover}
              title={tile.name}
            />
            <CardContent className={classes.cardContent}>
              <SongsTable
                songs={songs.filter(song => song.album_id === tile.id)}
              />
            </CardContent>
            <CardActions className={classes.actions}>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </GridListTile>
      ))}
    </Fragment>
  );
};

Albums.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WithGridList(Albums, 3, "Álbums"));
