import { ReactNode, createContext, useContext, useState } from "react";

export const linkSpeedContext = createContext([]);

export function useLinkSpeedContext() {
    return useContext(linkSpeedContext);
  }

export function LinkSpeedProvider({ children }) {
    const [linkSpeeds, setLinkSpeeds] = useState([]);
  
    return (
      <linkSpeedContext.Provider value={[linkSpeeds, setLinkSpeeds]}>
        {children}
      </linkSpeedContext.Provider>
    );
  }