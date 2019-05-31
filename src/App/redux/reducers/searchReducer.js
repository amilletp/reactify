import actionTypes from "../actions/actionTypes";

const initialState = {
  song: "",
  album: "",
  artist: ""
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH:
      return {
        ...state,
        ...action.search
      };
    default:
      return state;
  }
};

export default searchReducer;
