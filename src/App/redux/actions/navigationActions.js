import actionTypes from "./actionTypes";

export const navigate = topBarValue => ({
  type: actionTypes.NAVIGATE,
  topBarValue
});

export const navigateStart = () => ({
  type: actionTypes.NAVIGATE_START,
  topBarValue: 0
});

export const navigateAlbums = () => ({
  type: actionTypes.NAVIGATE_ALBUMS,
  topBarValue: 1
});

export const navigateAlbum = () => ({
  type: actionTypes.NAVIGATE_ALBUM
  // No tiene boton de barra superior
});

export const navigatePlayer = () => ({
  type: actionTypes.NAVIGATE_PLAYER,
  topBarValue: 2
});

export const navigateLogin = () => ({
  type: actionTypes.NAVIGATE_LOGIN,
  topBarValue: 3
});

export const navigateProfile = () => ({
  type: actionTypes.NAVIGATE_PROFILE,
  topBarValue: 4
});
