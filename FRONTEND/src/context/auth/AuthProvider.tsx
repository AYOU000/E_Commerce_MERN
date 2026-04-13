import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setusername] = useState<string | null>(
    localStorage.getItem("username"),
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const login = (username: string, token: string) => {
    setusername(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setusername(null);
  };
  const updated = (NewEmail: string, Newtoken: string) => {
    setusername(NewEmail); 
    setToken(Newtoken); 
    localStorage.setItem("username", NewEmail);
    localStorage.setItem("token", Newtoken);
  };
  const isauthenticated = !!token;
  return (
    <AuthContext.Provider
      value={{ username, token, login, isauthenticated, logout, updated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
