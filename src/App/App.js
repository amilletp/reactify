import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopBar from "./components/TopBar";
import CardsGrid from "./components/CardsGrid";
import CardDetail from "./components/CardDetail";
import SongsGrid from "./components/SongsGrid";
import SongCard from "./components/SongCard";
import UserProfile from "./components/UserProfile";
import UserLogin from "./components/UserLogin";
import PrivateRoute from "./components/PrivateRoute";

// Css
import "./App.css";
import UserContext from "./contexts/user";

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
      //const res = await fetch('/albums');
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

  findSong(id) {
    let result = this.state.songs.find(song => song.id === id);
    result = result === undefined ? [] : [result];
    return result;
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
                path="/albums"
                render={props => <CardsGrid {...this.state} />}
              />
              <Route
                path="/album"
                render={props => (
                  <CardDetail
                    albums={this.state.albums.filter(album => album.id === 1)}
                    songs={this.state.songs.filter(song => song.album_id === 1)}
                  />
                )}
              />
              <Route
                path="/player"
                render={props => (
                  <SongCard
                    albums={this.state.albums}
                    songs={this.findSong(1)}
                  />
                )}
              />
              <Route path="/login" component={UserLogin} />
              <PrivateRoute path="/profile" component={UserProfile} />
            </Switch>
          </UserContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
