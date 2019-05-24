import React from "react";
import {
  GridListTile,
  ListSubheader,
  GridList,
  Typography,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    marginTop: 40,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    height: 200
  },
  gridList: {
    width: "63%",
    height: "auto"
  },
  gridListTile: {
    height: "800px!important",
    width: "100%!important"
  },
  button: {
    position: "absolute",
    top: "14%",
    left: "19%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 223,
    height: 50
  }
});

/**
 * Componente de tipo ErrorBoundary ya que define los métodos
 * - getDerivedStateFromError
 * - componentDidCatch
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;

    this.onClick = this.onClick.bind(this);

    this.state = {
      error: false
    };
  }

  /**
   * Este método se ejecuta en la fase de "render". Permite actualizar el estado
   * durante el proceso de reconciliación.
   *
   * El objetivo de este método es modificar el estado para mostrar renderizar un
   * mensaje de error u otro componente en la interfaz
   */
  static getDerivedStateFromError() {
    return {
      error: true
    };
  }

  /**
   * Este método se ejecuta durante la fase de commit. Se utiliza para acciones
   * posteriores a la recuperación del error como enviar este y su traza a
   * servicios externos como Airbrake o Sentry
   */
  componentDidCatch(error, info) {
    console.log(error, info);
  }

  /**
   * Llama al método onReset que recibe por las propiedades y reinicia el error
   */
  onClick() {
    this.props.onReset();
    this.setState({ error: false });
  }

  render() {
    // Si ha habido un error, mostramos el mensaje y un botón para reiniciar el estado
    if (this.state.error === true) {
      return (
        <div className={this.classes.root}>
          <GridList
            cols={1}
            spacing={12}
            cellHeight={620}
            className={this.classes.gridList}
          >
            <GridListTile key="Subheader" cols={3}>
              <Typography component="h6" variant="h6">
                {this.props.message}
              </Typography>
            </GridListTile>
          </GridList>
          <Button
            onClick={this.onClick}
            variant="contained"
            color="primary"
            className={this.classes.button}
          >
            Restablecer
          </Button>
        </div>
      );
    }

    // Si no hay errores, mostramos los nodos descendientes
    return this.props.children;
  }
}

export default withStyles(styles, { withTheme: true })(ErrorBoundary);
