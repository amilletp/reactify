import { createContext } from "react";

const UserContext = createContext({
  name: "",
  surname: "",
  email: "",
  signedIn: false
});

export default UserContext;
