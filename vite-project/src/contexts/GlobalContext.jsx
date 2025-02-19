import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [usuarios, set_usuarios] = useState([]);
    return (
        <GlobalContext.Provider value={{

            usuarios,
            set_usuarios

        }}>
            {children}
        </GlobalContext.Provider>
    )
}