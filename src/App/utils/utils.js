import * as Constants from "../constants/constants";
import { fetchAlbums, fetchSongs } from "../redux/actions/fetchActions";

export const findSong = (songs, id) => {
  const parsedId = parseInt(id, 10);
  let result = songs.find(song => song.id === parsedId);
  result = result === undefined ? [] : [result];
  return result;
};

export const getRecommendedSongs = songs => {
  let maxLength = 6;
  let length =
    songs.length >= maxLength ? maxLength : Math.floor(songs.length / 2);
  return songs.sort(() => Math.random() - 0.5).slice(0, length);
};

export const getInitialValueByPath = () => {
  let initialValue;
  let path = window.location.pathname;
  switch (path) {
    case "/":
      initialValue = Constants.START;
      break;
    case "/albums":
      initialValue = Constants.ALBUMS;
      break;
    case "/login":
      initialValue = Constants.LOGIN;
      break;
    case "/profile":
      initialValue = Constants.PROFILE;
      break;
    default:
      if (path.match(/\/player\/\d{1,}/)) {
        initialValue = Constants.PLAYER;
      } else {
        initialValue = Constants.START;
      }
  }
  return initialValue;
};

export const getSongsAlbum = (songs, albums) =>
  songs.reduce((result, song) => {
    song = {
      ...song,
      album: albums.items.find(album => song.album_id === album.id)
    };
    return [...result, song];
  }, []);

/**
 * Funcion comun para ejecutar las acciones Fetch
 * de Albums y Canciones y guardarlas en el store
 */
export const fetchResourcesAndSaveToStore = (
  albums,
  songs,
  getAlbums,
  getSongs
) => {
  // Comprobamos que no se esta haciendo ya la carga
  // o que haya finalizado
  if (
    !albums.isLoading &&
    !albums.error &&
    albums.items &&
    albums.items.length === 0
  ) {
    getAlbums();
  }
  if (
    !songs.isLoading &&
    !songs.error &&
    songs.items &&
    songs.items.length === 0
  ) {
    getSongs();
  }
};

/**
 * Funciones comunes para conectar componentes con
 * las acciones Fetch de Albums y Canciones
 */
export const fetchMapStateToProps = state => {
  return {
    ...state
  };
};

/**
 * Funciones comunes para conectar componentes con
 * las acciones Fetch de Albums y Canciones
 */
export const fetchMapDispatchToProps = dispatch => {
  return {
    getAlbums: () => dispatch(fetchAlbums()),
    getSongs: () => dispatch(fetchSongs())
  };
};

export const parseSeconds = seconds =>
  Number.isInteger(seconds)
    ? `${Math.floor(seconds / 60)}:${seconds % 60}`
    : "";
