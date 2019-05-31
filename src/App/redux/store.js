import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import login from "./reducers/loginReducer";
import navigation from "./reducers/navigationReducer";
import profile from "./reducers/profileReducer";
import albums from "./reducers/albumsReducer";
import songs from "./reducers/songsReducer";
import floatPlayer from "./reducers/floatPlayerReducer";
import search from "./reducers/searchReducer";

// For integrating REDUX DEVTOOLS
// Set up our composeEnhancers function, based on the existence of the
// DevTools extension when creating the store
let storeTemp;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  storeTemp = createStore(
    combineReducers({
      login,
      navigation,
      profile,
      albums,
      songs,
      floatPlayer,
      search
    }),
    undefined, // or initial state provided by startup
    composeEnhancers(applyMiddleware(promise))
  );
} else {
  storeTemp = createStore(
    combineReducers({
      login,
      navigation,
      profile,
      albums,
      songs,
      floatPlayer,
      search
    }),
    applyMiddleware(promise)
  );
}

const store = { ...storeTemp };

export default store;
