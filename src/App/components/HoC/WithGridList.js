import React from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";

const WithGridList = (WrappedComponent, gridListCols, titleLabel) => {
  // Retornamos un nuevo componente
  return props => {
    const { classes } = props;

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
              <h2>{titleLabel}</h2>
            </ListSubheader>
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
