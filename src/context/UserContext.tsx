import { ReactNode, createContext, useContext, useState } from "react";
import React from 'react'

//ReactNode is just what you give the children property in react
type UserContextProviderProps = {
  children: ReactNode;
};

const userContext = createContext([
  "",
  (value: string) => {},
  {},
  (value: string) => {},
]);

export function useUserContext() {
  return useContext(userContext);
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [key, setKey] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [backgroundColor, setBackgroundColor] = useState("black");

  return (
    <userContext.Provider value={[key, setKey, userInfo, setUserInfo, backgroundColor, setBackgroundColor]}>
      {children}
    </userContext.Provider>
  );
}
