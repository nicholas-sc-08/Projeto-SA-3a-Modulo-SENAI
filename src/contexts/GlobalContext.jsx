import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [array_usuarios, set_array_usuarios] = useState([]);
    const [array_brechos, set_array_brechos] = useState([]);

    return (
        <GlobalContext.Provider value={{

            array_usuarios,
            set_array_usuarios,
            array_brechos,
            set_array_brechos
        }}>
            {children}
        </GlobalContext.Provider>
    )
}