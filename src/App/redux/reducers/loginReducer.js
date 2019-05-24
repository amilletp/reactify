import actionTypes from "../actions/actionTypes";

const initialState = {
  login: "",
  password: "",
  errorLogin: false,
  errorPwd: false,
  denied: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_LOGIN:
      return {
        ...action.login
      };
    case actionTypes.UPDATE_LOGIN_DATA:
      return {
        ...state,
        ...action.login
      };
    case actionTypes.VALIDATE_LOGIN:
      return {
        ...state,
        ...action.login
      };
    default:
      return state;
  }
};

export default loginReducer;
