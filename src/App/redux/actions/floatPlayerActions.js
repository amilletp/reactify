import actionTypes from "./actionTypes";

export const initFloatPlayer = (prevSong, song, status) => ({
  type: actionTypes.INIT_FLOAT_PLAYER,
  prevSong,
  song,
  status
});
