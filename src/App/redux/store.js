import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import login from "./reducers/loginReducer";
import navigation from "./reducers/navigationReducer";
import profile from "./reducers/profileReducer";
import albums from "./reducers/albumsReducer";
import songs from "./reducers/songsReducer";

const store = createStore(
  combineReducers({ login, navigation, profile, albums, songs }),
  applyMiddleware(promise)
);

export default store;
