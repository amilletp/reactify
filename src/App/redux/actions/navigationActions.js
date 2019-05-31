import actionTypes from "./actionTypes";
import * as Constants from "../../constants/constants";

export const navigate = topBarValue => ({
  type: actionTypes.NAVIGATE,
  topBarValue
});

export const navigateStart = () => ({
  type: actionTypes.NAVIGATE_START,
  topBarValue: Constants.START
});

export const navigateRecent = () => ({
  type: actionTypes.NAVIGATE_RECENT,
  topBarValue: Constants.RECENT
});

export const navigateSearch = () => ({
  type: actionTypes.NAVIGATE_RECENT,
  topBarValue: Constants.SEARCH
});

export const navigateAlbums = () => ({
  type: actionTypes.NAVIGATE_ALBUMS,
  topBarValue: Constants.ALBUMS
});

export const navigateAlbum = () => ({
  type: actionTypes.NAVIGATE_ALBUM
  // No tiene boton de barra superior
});

export const navigatePlayer = () => ({
  type: actionTypes.NAVIGATE_PLAYER,
  topBarValue: Constants.PLAYER
});

export const navigateLogin = () => ({
  type: actionTypes.NAVIGATE_LOGIN,
  topBarValue: Constants.LOGIN
});

export const navigateProfile = () => ({
  type: actionTypes.NAVIGATE_PROFILE,
  topBarValue: Constants.PROFILE
});
