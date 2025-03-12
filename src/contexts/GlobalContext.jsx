import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [array_clientes, set_array_clientes] = useState([]);
    const [array_brechos, set_array_brechos] = useState([]);
    const [array_produtos, set_array_produtos] = useState([]);
    const [array_categorias, set_array_categorias] = useState([]);
    const [usuario_logado, set_usuario_logado] = useState([]);
    const [endereco_do_cliente, set_endereco_do_cliente] = useState({cep: ``, bairro: ``, logradouro: ``, cidade: ``, estado: ``, numero: ``, complemento: ``});
    const [form_de_cadastro_cliente, set_form_de_cadastro_cliente] = useState({nome: ``, email: ``, senha: ``, telefone: ``, cpf: ``, data_de_nascimento: ``, imagem_de_perfil: ``, confirmar_senha: ``});
    const [cadastro_parte_um_cliente, set_cadastro_parte_um_cliente] = useState(true);
    const [cadastro_parte_dois_cliente, set_cadastro_parte_dois_cliente] = useState(false);
    const [cadastro_parte_tres_cliente, set_cadastro_parte_tres_cliente] = useState(false);
    const [ inicio_dashboard, set_inicio_dashboard ] = useState(true);
    const [ clientes_dashboard, set_clientes_dashboard ] = useState(false);
    const [ brechos_dashboard, set_brechos_dashboard ] = useState(false);
    const [ produtos_dashboard, set_produtos_dashboard ] = useState(false);
    const [ categorias_dashboard, set_categorias_dashboard ] = useState(false);

    return (
        <GlobalContext.Provider value={{

            array_clientes,
            set_array_clientes,
            array_brechos,
            set_array_brechos,
            array_produtos,
            set_array_produtos,
            array_categorias,
            set_array_categorias,
            form_de_cadastro_cliente,
            set_form_de_cadastro_cliente,
            cadastro_parte_um_cliente,
            set_cadastro_parte_um_cliente,
            cadastro_parte_dois_cliente,
            set_cadastro_parte_dois_cliente,
            cadastro_parte_tres_cliente,
            set_cadastro_parte_tres_cliente,
            endereco_do_cliente,
            set_endereco_do_cliente,
            inicio_dashboard,
            set_inicio_dashboard,
            clientes_dashboard,
            set_clientes_dashboard,
            produtos_dashboard,
            set_produtos_dashboard,
            brechos_dashboard,
            set_brechos_dashboard,
            categorias_dashboard,
            set_categorias_dashboard
            }}>
            {children}
        </GlobalContext.Provider>
    )
}