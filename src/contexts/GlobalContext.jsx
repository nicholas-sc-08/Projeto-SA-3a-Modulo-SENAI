import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [array_clientes, set_array_clientes] = useState([]);
    const [array_brechos, set_array_brechos] = useState([]);
    const [usuario_logado, set_usuario_logado] = useState([]);
    const [form_de_cadastro_cliente, set_form_de_cadastro_cliente] = useState({nome: ``, email: ``, senha: ``, telefone: ``, cpf: ``, data_de_nascimento: ``, confirmar_senha: ``});
    const [cadastro_parte_um_cliente, set_cadastro_parte_um_cliente] = useState(true);
    const [cadastro_parte_dois_cliente, set_cadastro_parte_dois_cliente] = useState(false);
    const [cadastro_parte_tres_cliente, set_cadastro_parte_tres_cliente] = useState(false);

    return (
        <GlobalContext.Provider value={{

            array_clientes,
            set_array_clientes,
            array_brechos,
            set_array_brechos,
            form_de_cadastro_cliente,
            set_form_de_cadastro_cliente,
            cadastro_parte_um_cliente,
            set_cadastro_parte_um_cliente,
            cadastro_parte_dois_cliente,
            set_cadastro_parte_dois_cliente,
            cadastro_parte_tres_cliente,
            set_cadastro_parte_tres_cliente
            }}>
            {children}
        </GlobalContext.Provider>
    )
}