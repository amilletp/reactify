import React, { useState, Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SongsTable from "./SongsTable";
import WithGridList from "./WithGridList";

const AlbumsCardsGrid = ({ classes, tile, songs }) => {
  return (
    <Fragment>
      <CardHeader
        avatar={
          <Avatar aria-label="Album" className={classes.avatar}>
            A
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={tile.name}
        subheader={tile.artist}
      />
      <CardMedia
        className={classes.media}
        image={tile.cover}
        title={tile.name}
      />
      <CardContent className={classes.cardContent}>
        <SongsTable songs={songs.filter(song => song.album_id === tile.id)} />
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Fragment>
  );
};

export default WithGridList(AlbumsCardsGrid);
