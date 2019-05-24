import actionTypes from "./actionTypes";

export const initLoginData = () => ({
  type: actionTypes.INIT_LOGIN,
  login: {
    login: "",
    password: "",
    errorLogin: false,
    errorPwd: false,
    denied: false
  }
});

export const updateLoginData = (field, value) => {
  let result = {
    type: actionTypes.UPDATE_LOGIN_DATA,
    login: {}
  };
  result.login[field] = value;
  return result;
};

export const validateLoginData = (login, password) => ({
  type: actionTypes.VALIDATE_LOGIN,
  login: {
    errorLogin: login === "",
    errorPwd: password === "",
    denied: !(login === "test" && password === "pwd")
  }
});

export const initProfileData = ({ name, surname, email }) => ({
  type: actionTypes.INIT_PROFILE,
  profile: {
    name,
    surname,
    email
  }
});

export const updateProfileData = (field, value) => {
  console.log("updateLoginData Field", value);
  let result = {
    type: actionTypes.UPDATE_PROFILE_DATA,
    profile: {}
  };
  result.profile[field] = value;
  console.log("updateLoginData Result", result);
  return result;
};
