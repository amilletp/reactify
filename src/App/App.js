import React, { Component } from "react";
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

// Css
import "./App.css";

// Rompen la barra de navegacion en los primeros 5 o 10 segs de entrar a la app
// despues vuelve a funcnionar
//const SongsGrid = React.lazy(() => import("./components/SongsGrid"));
//const AlbumsGrid = React.lazy(() => import("./components/AlbumsGrid"));
//const AlbumDetail = React.lazy(() => import("./components/AlbumDetail"));
//const SongDetail = React.lazy(() => import("./components/SongDetail"));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      albums: [],
      songs: []
    };

    this.initialContext = {
      name: "",
      surname: "",
      email: "",
      signedIn: false
    };
  }

  async componentDidMount() {
    try {
      let res = await fetch("albums.json");
      //const res = await fetch('/albums');
      const albums = await res.json();
      res = await fetch("songs.json");
      //const res = await fetch('/songs');
      const songs = await res.json();
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        albums,
        songs
      }));
    } catch (err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  //         <CardsGrid albums={this.state.albums} songs={this.state.songs} />
  //        <CardDetail
  //          albums={this.state.albums.filter(album => album.id === 1)}
  //          songs={this.state.songs.filter(song => song.album_id === 1)}
  //        />
  //        <SongsGrid albums={this.state.albums} songs={this.state.songs} />
  //        <SongCard
  //          albums={this.state.albums}
  //          songs={this.findSong(1)}
  //        />

  // https://codepen.io/asommer70/pen/JGdGge
  render() {
    return (
      <React.StrictMode>
        <React.Suspense fallback="Cargando la aplicación">
          <div className="App">
            <Router>
              <UserContext.Provider value={this.initialContext}>
                <TopBar />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => <SongsGrid {...this.state} />}
                  />
                  <Route
                    exact
                    path="/albums"
                    render={props => <AlbumsGrid {...this.state} />}
                  />
                  <Route
                    path="/albums/:id"
                    render={routerProps => (
                      <AlbumDetail
                        albums={this.state.albums}
                        songs={this.state.songs}
                        {...routerProps}
                      />
                    )}
                  />
                  <Route
                    path="/player/:id"
                    render={routerProps => (
                      <SongDetail
                        albums={this.state.albums}
                        songs={this.state.songs}
                        {...routerProps}
                      />
                    )}
                  />
                  <Route path="/login" component={UserLogin} />
                  <PrivateRoute path="/profile" component={UserProfile} />
                </Switch>
              </UserContext.Provider>
            </Router>
          </div>
        </React.Suspense>
      </React.StrictMode>
    );
  }
}

export default App;
