import React, { Fragment } from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import * as Constants from "../../constants/constants";
import { TextField } from "@material-ui/core";

const WithGridList = (WrappedComponent, gridListCols) => {
  // Retornamos un nuevo componente
  return props => {
    const { classes, sectionId, search, updateSearch, sectionTitle } = props;

    const handleChange = field => event => {
      updateSearch(field, event.target.value);
    };

    return (
      <div className={classes.root}>
        <GridList
          cols={gridListCols}
          spacing={12}
          cellHeight={620}
          className={classes.gridList}
        >
          <GridListTile
            key="Subheader"
            cols={gridListCols}
            style={{ height: "auto" }}
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
          <WrappedComponent {...props} />
        </GridList>
      </div>
    );
  };
};

WithGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default WithGridList;
