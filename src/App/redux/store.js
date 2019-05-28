import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import promise from "redux-promise-middleware";
import login from "./reducers/loginReducer";
import navigation from "./reducers/navigationReducer";
import profile from "./reducers/profileReducer";
import albums from "./reducers/albumsReducer";
import songs from "./reducers/songsReducer";

// For integrating REDUX DEVTOOLS
// Set up our composeEnhancers function, baed on the existence of the
// DevTools extension when creating the store
let storeTemp;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  storeTemp = createStore(
    combineReducers({ login, navigation, profile, albums, songs }),
    undefined, // or initial state provided by startup
    composeEnhancers(applyMiddleware(promise))
  );
} else {
  storeTemp = createStore(
    combineReducers({ login, navigation, profile, albums, songs }),
    applyMiddleware(promise)
  );
}

const store = { ...storeTemp };

export default store;
