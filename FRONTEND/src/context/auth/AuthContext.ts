import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isauthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
  updated: (Newtoken: string, NewEmail: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  login: () => {},
  isauthenticated: false,
  logout: ()=> {},
  updated: () => {}
});

export const useAuth = () => useContext(AuthContext);
