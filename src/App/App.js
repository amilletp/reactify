import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserProfile from "./components/UserProfile";
import UserLogin from "./components/UserLogin";
import PrivateRoute from "./components/PrivateRoute";
import UserContext from "./contexts/user";
import SongsGrid from "./components/SongsGrid";
import AlbumsGrid from "./components/AlbumsGrid";
import AlbumDetail from "./components/AlbumDetail";
import SongDetail from "./components/SongDetail";
import ErrorBoundary from "./errors/ErrorBoundary";
import { Provider } from "react-redux";
import store from "./redux/store";
import FloatingPlayer from "./components/FloatingPlayer";
import * as Constants from "./constants/constants";

// Css
import "./App.css";

// El lazy loading no funciona bien, la barra de navegacion superior necesita
// comunicarse con el componente antes de que este se haya cargado
//const SongsGrid = React.lazy(() => import("./components/SongsGrid"));
//const AlbumsGrid = React.lazy(() => import("./components/AlbumsGrid"));
//const AlbumDetail = React.lazy(() => import("./components/AlbumDetail"));
//const SongDetail = React.lazy(() => import("./components/SongDetail"));

const App = props => {
  const initialContext = {
    name: "",
    surname: "",
    email: "",
    signedIn: false
  };

  const onReset = () => (window.location.href = "/");

  // La barra superior de Tabs de MaterialUI hace uso de un metodo
  // deprecado en el StrictMode. Lo deshabilitamos para quitar el
  // warning
  //<React.StrictMode>

  return (
    <React.Suspense fallback="Cargando la aplicación">
      <ErrorBoundary
        onReset={onReset}
        message="Se ha producido un error en la aplicación"
      >
        <Provider store={store}>
          <div className="App">
            <Router>
              <UserContext.Provider value={initialContext}>
                <TopBar />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={routerProps => (
                      <SongsGrid
                        sectionId={Constants.START}
                        sectionTitle="Temas recomendados"
                        {...routerProps}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/recent"
                    render={routerProps => (
                      <SongsGrid
                        sectionId={Constants.RECENT}
                        sectionTitle="Canciones recientes"
                        {...routerProps}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/search"
                    render={routerProps => (
                      <SongsGrid
                        sectionId={Constants.SEARCH}
                        sectionTitle="Búsqueda"
                        {...routerProps}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/albums"
                    render={routerProps => <AlbumsGrid />}
                  />
                  <Route
                    path="/albums/:id"
                    render={routerProps => <AlbumDetail {...routerProps} />}
                  />
                  <Route
                    path="/player/:id"
                    render={routerProps => (
                      <SongDetail onReset={onReset} {...routerProps} />
                    )}
                  />
                  <Route path="/login" component={UserLogin} />
                  <PrivateRoute path="/profile" component={UserProfile} />
                </Switch>
              </UserContext.Provider>
            </Router>
            <FloatingPlayer />
          </div>
        </Provider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default App;
