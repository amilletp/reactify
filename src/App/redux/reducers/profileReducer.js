import actionTypes from "../actions/actionTypes";

const initialState = {
  name: "",
  surname: "",
  email: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PROFILE:
      return {
        ...action.profile
      };
    case actionTypes.UPDATE_PROFILE_DATA:
      return {
        ...state,
        ...action.profile
      };
    default:
      return state;
  }
};

export default profileReducer;
