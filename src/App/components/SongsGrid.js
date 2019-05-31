import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {
  getRecommendedSongs,
  mapStateToProps,
  fetchResourcesAndSaveToStore,
  getSongsAlbum,
  getRecentSongs
} from "../utils/utils";
import { connect } from "react-redux";
import { fetchAlbums, fetchSongs } from "../redux/actions/fetchActions";
import * as Constants from "../constants/constants";
import { TextField } from "@material-ui/core";
import { search } from "../redux/actions/userActions";

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
    alignItems: "center"
  },
  playIcon: {
    height: 38,
    width: 38
  },
  audio: {
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

const SongsGrid = props => {
  // De Material UI y Router
  const { classes, sectionId, sectionTitle } = props;

  // De Redux Store
  const { albums, songs, getAlbums, getSongs, search, updateSearch } = props;

  let songsToRender;

  switch (sectionId) {
    case Constants.START:
      songsToRender = getRecommendedSongs(songs.items);
      break;
    case Constants.RECENT:
      songsToRender = getRecentSongs(songs);
      break;
    case Constants.SEARCH:
    default:
      songsToRender = songs.items;
      break;
  }

  const handleChange = field => event => {
    updateSearch(field, event.target.value);
  };

  useEffect(() =>
    fetchResourcesAndSaveToStore(albums, songs, getAlbums, getSongs)
  );

  const matchesTerms = (stringToSearch, searchTerms) => {
    stringToSearch = stringToSearch.toLowerCase();
    searchTerms = "" + searchTerms;
    searchTerms = searchTerms.toLowerCase();
    const searchTermsArray = searchTerms.split(" ");

    let match = false;
    for (let term of searchTermsArray) {
      // Se descartan cadenas de 2 o 1 caracter
      if (term.length > 2) {
        if (!stringToSearch.includes(term)) {
          // Debe contener todos los terminos
          // Si alguno no cumple, no hace match
          return false;
        }

        // Si la cadena es mayor de 2 caracteres la contiene
        // hacemos match
        match = true;
      }
    }

    return match;
  };

  // Unir canciones con albums en mismo objeto
  let songsAlbum = getSongsAlbum(songsToRender, albums);

  if (sectionId === Constants.SEARCH) {
    const songsFilteredByName = songsAlbum.filter(({ name }) =>
      matchesTerms(name, search.song)
    );
    const songsFilteredByAlbum = songsAlbum.filter(({ album }) =>
      matchesTerms(album.name, search.album)
    );
    const songsFilteredByArtist = songsAlbum.filter(({ album }) =>
      matchesTerms(album.artist, search.artist)
    );

    const totalFiltered = [
      ...songsFilteredByName,
      ...songsFilteredByAlbum,
      ...songsFilteredByArtist
    ];
    const totalFilteredIds = totalFiltered.map(({ id }) => id);
    const matchingUniqueIds = totalFilteredIds.reduce(
      (acc, id) =>
        acc !== null && acc.includes(id) ? acc.concat() : acc.concat(id),
      []
    );

    songsAlbum = songsAlbum.filter(({ id }) => matchingUniqueIds.includes(id));
  }

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
          <ListSubheader component="div">
            <h2>{sectionTitle}</h2>
          </ListSubheader>
          {sectionId === Constants.SEARCH && (
            <Fragment>
              <TextField
                id="outlined-song"
                label="Canción"
                className={classes.textField}
                value={search.song}
                onChange={handleChange("song")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-album"
                label="Album"
                className={classes.textField}
                value={search.album}
                onChange={handleChange("album")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-artist"
                label="Artista"
                className={classes.textField}
                value={search.artist}
                onChange={handleChange("artist")}
                margin="normal"
                variant="outlined"
              />
            </Fragment>
          )}
        </GridListTile>
        {songsAlbum.length > 0 &&
          songsAlbum.map(tile => (
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
                    <source src={tile.audio} type="audio/mpeg" />
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

const mapDispatchToProps = dispatch => {
  return {
    getAlbums: () => dispatch(fetchAlbums()),
    getSongs: () => dispatch(fetchSongs()),
    updateSearch: (field, value) => dispatch(search(field, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SongsGrid));
