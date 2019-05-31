const actions = [
  "INIT_LOGIN",
  "UPDATE_LOGIN_DATA",
  "VALIDATE_LOGIN",
  "INIT_PROFILE",
  "UPDATE_PROFILE_DATA",
  "INIT_FLOAT_PLAYER",
  "SEARCH",
  "FAVORITE_ALBUM",
  "NAVIGATE",
  "NAVIGATE_START",
  "NAVIGATE_RECENT",
  "NAVIGATE_ALBUMS",
  "NAVIGATE_ALBUM",
  "NAVIGATE_PLAYER",
  "NAVIGATE_LOGIN",
  "NAVIGATE_PROFILE"
];

// Las convertimos en un objeto
const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});
export default actionTypes;
