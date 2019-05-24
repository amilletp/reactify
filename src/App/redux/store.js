import { createStore, combineReducers } from "redux";
import login from "./reducers/loginReducer";
import navigation from "./reducers/navigationReducer";
import profile from "./reducers/profileReducer";

const store = createStore(combineReducers({ login, navigation, profile }));

export default store;
