import * as Constants from "../constants/constants";

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

export const parseSeconds = seconds =>
  Number.isInteger(seconds)
    ? `${Math.floor(seconds / 60)}:${seconds % 60}`
    : "";
