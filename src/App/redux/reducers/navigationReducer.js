import actionTypes from "../actions/actionTypes";
import { getInitialValueByPath } from "../../utils/utils";

const initialState = {
  topBarValue: getInitialValueByPath()
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NAVIGATE:
    case actionTypes.NAVIGATE_START:
    case actionTypes.NAVIGATE_ALBUMS:
    case actionTypes.NAVIGATE_PLAYER:
    case actionTypes.NAVIGATE_LOGIN:
    case actionTypes.NAVIGATE_PROFILE:
      return {
        topBarValue: action.topBarValue
      };
    default:
      return state;
  }
};

export default navigationReducer;
