import React, { useEffect } from "react";
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
import { fetchResourcesAndSaveToStore } from "../utils/utils";
import { connect } from "react-redux";
import * as Constants from "../constants/constants";
import { navigate } from "../redux/actions/navigationActions";
import { fetchAlbums, fetchSongs } from "../redux/actions/fetchActions";
import { Redirect } from "react-router";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "50%",
    height: "auto"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  card: {
    maxWidth: "98%"
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

function AlbumDetail(props) {
  // De Material UI y Router
  const { classes, match, location } = props;

  // De Redux Store
  const {
    topBarValue,
    updateValue,
    albums,
    songs,
    getAlbums,
    getSongs
  } = props;

  if (topBarValue !== Constants.ALBUMS) {
    updateValue(Constants.ALBUMS);
  }

  useEffect(() =>
    fetchResourcesAndSaveToStore(albums, songs, getAlbums, getSongs)
  );

  const id = parseInt(match.params.id, 10);

  let foundAlbums = [];

  if (albums.items) {
    foundAlbums = albums.items.filter(album => album.id === id);
  }

  return (
    <div className={classes.root}>
      {location.pathname.includes("/albums/player/") && (
        <Redirect to={location.pathname.substring(7)} />
      )}
      <GridList
        cols={1}
        spacing={12}
        cellHeight={1100}
        className={classes.gridList}
      >
        <GridListTile key="Subheader" cols={1} style={{ height: "auto" }}>
          <ListSubheader component="div">Álbum</ListSubheader>
        </GridListTile>
        {foundAlbums.length > 0 &&
          foundAlbums.map(tile => (
            <GridListTile key={tile.id}>
              <Card className={classes.card}>
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
                  <SongsTable
                    songs={songs.items.filter(
                      song => song.album_id === tile.id
                    )}
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
      </GridList>
    </div>
  );
}

AlbumDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    ...state,
    topBarValue: state.navigation.topBarValue
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateValue: topBarValue => dispatch(navigate(topBarValue)),
    getAlbums: () => dispatch(fetchAlbums()),
    getSongs: () => dispatch(fetchSongs())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AlbumDetail));
