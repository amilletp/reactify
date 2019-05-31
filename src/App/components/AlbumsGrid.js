import React, { useState, useEffect } from "react";
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
import SongsTable from "./SongsTable";
import { Link } from "react-router-dom";
import { mapStateToProps, fetchResourcesAndSaveToStore } from "../utils/utils";
import { connect } from "react-redux";
import { initFloatPlayer } from "../redux/actions/floatPlayerActions";
import { fetchAlbums, fetchSongs } from "../redux/actions/fetchActions";
import { addFavoriteAlbum } from "../redux/actions/userActions";
import Modal from "../../Modal";
import { Typography } from "@material-ui/core";

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
  },
  favorited: {
    color: red[500]
  }
});

const AlbumsGrid = props => {
  // De Material UI y Router
  const { classes } = props;

  // De Redux Store
  const {
    albums,
    songs,
    getAlbums,
    getSongs,
    floatPlayer,
    handleFloatPlayer,
    handleFavoriteAlbum
  } = props;

  handleFloatPlayer(floatPlayer.prevSong, floatPlayer.song, floatPlayer.status);

  const handleFavorite = id => event => {
    const favoriteAlbum = albums.items.find(album => id === album.id);
    if (favoriteAlbum.favorited) {
      favoriteAlbum.favorited = false;
    } else {
      favoriteAlbum.favorited = true;
    }

    handleFavoriteAlbum(albums.items);
  };

  const [openModal, setOpenModal] = useState(false);

  const onClose = () => setOpenModal(false);

  const showModal = () => setOpenModal(true);

  useEffect(() =>
    fetchResourcesAndSaveToStore(albums, songs, getAlbums, getSongs)
  );

  return (
    <div className={classes.root}>
      <GridList
        cols={3}
        spacing={12}
        cellHeight={620}
        className={classes.gridList}
      >
        <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
          <ListSubheader component="div">
            <h2>Álbums</h2>
          </ListSubheader>
        </GridListTile>
        {albums.items.length > 0 &&
          albums.items.map(tile => (
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
                    songs={songs.items.filter(
                      song => song.album_id === tile.id
                    )}
                  />
                </CardContent>
                <CardActions className={classes.actions}>
                  <IconButton
                    aria-label="Add to favorites"
                    onClick={handleFavorite(tile.id)}
                  >
                    <FavoriteIcon
                      className={tile.favorited ? classes.favorited : null}
                    />
                  </IconButton>
                  <IconButton aria-label="Share" onClick={showModal}>
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </GridListTile>
          ))}
        <Modal open={openModal} onClose={onClose}>
          <Typography component="h6" variant="h6">
            Disponible pronto...
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            (y también los estilos de este modal.... :/)
          </Typography>
        </Modal>
      </GridList>
    </div>
  );
};

AlbumsGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    getAlbums: () => dispatch(fetchAlbums()),
    getSongs: () => dispatch(fetchSongs()),
    handleFloatPlayer: (prevSong, song, status) =>
      dispatch(initFloatPlayer(prevSong, song, status)),
    handleFavoriteAlbum: items => dispatch(addFavoriteAlbum(items))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AlbumsGrid));
