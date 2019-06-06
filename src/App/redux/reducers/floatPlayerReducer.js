import actionTypes from "../actions/actionTypes";

const initialState = {
  prevSong: null,
  song: null,
  status: "hidden"
};

const floatPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_FLOAT_PLAYER:
      return { ...action };
    default:
      return state;
  }
};

export default floatPlayerReducer;
