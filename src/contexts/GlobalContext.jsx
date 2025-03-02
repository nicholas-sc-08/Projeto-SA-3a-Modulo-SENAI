import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [array_clientes, set_array_clientes] = useState([]);
    const [array_brechos, set_array_brechos] = useState([]);
    const [usuario_logado, set_usuario_logado] = useState([]);

    return (
        <GlobalContext.Provider value={{

            array_clientes,
            set_array_clientes,
            array_brechos,
            set_array_brechos
        }}>
            {children}
        </GlobalContext.Provider>
    )
}