/* eslint-disable react/prop-types */
import { useState } from "react";

import { AuthContext } from "../context";
import { getInfo } from "../utils/saveUserData";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInfo() || {});
  console.log(auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
