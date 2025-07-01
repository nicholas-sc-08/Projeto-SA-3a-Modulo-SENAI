import { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [array_clientes, set_array_clientes] = useState([]);
    const [array_brechos, set_array_brechos] = useState([]);
    const [array_produtos, set_array_produtos] = useState([]);
    const [array_categorias, set_array_categorias] = useState([]);
    const [array_marcas, set_array_marcas] = useState([]);
    const [array_enderecos, set_array_enderecos] = useState([]);
    const [array_estoques, set_array_estoques] = useState([])
    const [array_chat, set_array_chat] = useState([]);
    const [conversa_atual, set_conversa_atual] = useState([]);
    const [conversa_aberta, set_conversa_aberta] = useState(false);
    const [usuario_logado, set_usuario_logado] = useState([]);
    const [pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando] = useState(null);
    const [endereco_do_cliente, set_endereco_do_cliente] = useState({ cep: ``, bairro: ``, logradouro: ``, cidade: ``, estado: ``, numero: ``, complemento: `` });
    const [form_de_cadastro_cliente, set_form_de_cadastro_cliente] = useState({ nome: ``, email: ``, senha: ``, telefone: ``, cpf: ``, data_de_nascimento: ``, imagem_de_perfil: `./img/icons/IconePerfil.svg`, conversas: [], sacola: [], produtos_comprados: [], confirmar_senha: `` });
    const [cadastro_parte_um_cliente, set_cadastro_parte_um_cliente] = useState(true);
    const [produto, set_produto] = useState(``);
    const [cadastro_parte_dois_cliente, set_cadastro_parte_dois_cliente] = useState(false);
    const [cadastro_parte_tres_cliente, set_cadastro_parte_tres_cliente] = useState(false);
    const [inicio_dashboard, set_inicio_dashboard] = useState(true);
    const [clientes_dashboard, set_clientes_dashboard] = useState(false);
    const [brechos_dashboard, set_brechos_dashboard] = useState(false);
    const [produtos_dashboard, set_produtos_dashboard] = useState(false);
    const [marcas_dashboard, set_marcas_dashboard] = useState(false);
    const [categorias_dashboard, set_categorias_dashboard] = useState(false);
    const [id_do_cliente_a_excluir, set_id_do_cliente_a_excluir] = useState(``);
    const [id_do_brecho_a_excluir, set_id_do_brecho_a_excluir] = useState(``);
    const [id_do_produto_a_excluir, set_id_do_produto_a_excluir] = useState(``);
    const [abrir_pop_up_dashboard, set_abrir_pop_up_dashboard] = useState(false);
    const [pop_up_notificacao_excluir_dashboard, set_pop_up_notificacao_excluir_dashboard] = useState(false);
    const [pop_up_de_cadastrar_categoria, set_pop_up_de_cadastrar_categoria] = useState(false);
    const [pop_up_notificacao_cadastro_categoria, set_pop_up_notificacao_cadastro_categoria] = useState(false);
    const [pop_up_de_editar_categoria, set_pop_up_de_editar_categoria] = useState(false);
    const [id_categoria, set_id_categoria] = useState(``);
    const [id_marca, set_id_marca] = useState(``);
    const [pop_up_notificacao_editar_categoria, set_pop_up_notificacao_editar_categoria] = useState(false);
    const [pop_up_de_excluir_categoria, set_pop_up_de_excluir_categoria] = useState(false);
    const [pop_up_notificacao_excluir_categoria, set_pop_up_notificacao_excluir_categoria] = useState(false);
    const [pop_up_notificacao_excluir_conversa, set_pop_up_notificacao_excluir_conversa] = useState(false);
    const [chat_aberto, set_chat_aberto] = useState(false);
    const [erro_pagina, set_erro_pagina] = useState(`404 Página não encontrada`);
    const [excluir_mensagens_chat, set_excluir_mensagens_chat] = useState(false);
    const [excluir_conversa_chat, set_excluir_conversa_chat] = useState(false);
    const [altura_inicial_chat, set_altura_inicial_chat] = useState(`10%`);
    const [altura_inicial_header_chat, set_altura_inicial_header_chat] = useState(`100%`);
    const [informacoes_editar_produto, set_informacoes_editar_produto] = useState(null);
    const [filtro_de_pesquisa, set_filtro_de_pesquisa] = useState({ preco: `0`, tamanhos: [], categoria_filtrada: `` });
    const [exibir_nome_brecho, set_exibir_nome_brecho] = useState(false);
    const [nome_do_brecho, set_nome_do_brecho] = useState(``);
    const [exibir_produtos_filtrados, set_exibir_produtos_filtrados] = useState(false);
    const [array_de_produtos_aleatorios, set_array_de_produtos_aleatorios] = useState([]);
    const [tipo_de_header, set_tipo_de_header] = useState(`usuario`);
    const [sacola_aberta, set_sacola_aberta] = useState(false);
    const [sacola, set_sacola] = useState([]);
    const [brecho_selecionado, set_brecho_selecionado] = useState(null);
    const [id_categoria_selecionada, set_id_categoria_selecionada] = useState(null);
    const [id_marca_selecionada, set_id_marca_selecionada] = useState(null);
    const [pagina_atual, set_pagina_atual] = useState(1);
    const [sacola_ou_produto, set_sacola_ou_produto] = useState(null);

    const [formCadastroBrecho, setFormCadastroBrecho] = useState({ nome_vendedor: ``, data_de_nascimento_vendedor: ``, nome_brecho: ``, email: ``, telefone: ``, cnpj: ``, logo: ``, conversas: [], senha: ``, confirmarSenha: ``, horario_funcionamento: `` });
    const [enderecoDoBrecho, setEnderecoDoBrecho] = useState({ cep: ``, bairro: ``, logradouro: ``, cidade: ``, estado: ``, numero: ``, complemento: `` })
    const [cadastroParteUmBrecho, setCadastroParteUmBrecho] = useState(true)
    const [cadastroParteDoisBrecho, setCadastroParteDoisBrecho] = useState(false)
    const [cadastroParteTresBrecho, setCadastroParteTresBrecho] = useState(false)
    const [endereco_cadastrado, set_endereco_cadastrado] = useState(false);
    const [arrayBrechos, setArrayBrechos] = useState([])
    const [imagemPerfilCadastroBrecho, setImagemPerfilCadastroBrecho] = useState(null)
    const [array_lancamentos, set_array_lancamnetos] = useState('')

    const [pop_up_notificacao_excluir_brechos_dashboard, set_pop_up_notificacao_excluir_brechos_dashboard] = useState(``)

    const [termoBuscado, setTermoBuscado] = useState('')

    const [pop_up_de_cadastrar_marca, set_pop_up_de_cadastrar_marca] = useState(false);
    const [pop_up_notificacao_cadastro_marca, set_pop_up_notificacao_cadastro_marca] = useState(false)
    const [imagemLogoMarca, setImagemLogoMarca] = useState(null)
    const [pop_up_notificacao_cadastro_produto, set_pop_up_notificacao_cadastro_produto] = useState(false);
    const [pop_up_editar_marca, set_pop_up_editar_marca] = useState(false);
    const [pop_up_notificacao_editar_marca, set_pop_up_notificacao_editar_marca] = useState(false);
    const [pop_up_excluir_marca, set_pop_up_excluir_marca] = useState(false);
    const [pop_up_notificacao_excluir_marca, set_pop_up_notificacao_excluir_marca] = useState(false);


    // função para quando alguém der F5/atualizar a página, os dados do usuário logado sejam guardados no localStorage
    useEffect(() => {

        const usuarioSalvo = localStorage.getItem('usuario_logado')

        if (usuarioSalvo) {
            set_usuario_logado(JSON.parse(usuarioSalvo))
        }
    }, []);

    // 
    useEffect(() => {

        if (usuario_logado && Object.keys(usuario_logado).length > 0) { // aqui garante que os valores de usuario_logado existam e que ele salva os dados sempre que o usuario_logado estiver com algum dado que não seja apenas um valor null ou undefined
            localStorage.setItem('usuario_logado', JSON.stringify(usuario_logado))
        } else {
            localStorage.removeItem('usuario_logado')  // quando o usuario fazer logout (sair da conta) o localStorage vai limpar os dados do cache, assim não acontece sobreposição de dados
        }
    }, [usuario_logado])


    return (
        <GlobalContext.Provider value={{

            informacoes_editar_produto,
            set_informacoes_editar_produto,
            array_clientes,
            set_array_clientes,
            array_enderecos,
            set_array_enderecos,
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
            set_categorias_dashboard,
            marcas_dashboard,
            set_marcas_dashboard,
            id_do_cliente_a_excluir,
            set_id_do_cliente_a_excluir,
            abrir_pop_up_dashboard,
            set_abrir_pop_up_dashboard,
            pop_up_notificacao_excluir_dashboard,
            set_pop_up_notificacao_excluir_dashboard,
            pop_up_de_cadastrar_categoria,
            set_pop_up_de_cadastrar_categoria,
            pop_up_notificacao_cadastro_categoria,
            set_pop_up_notificacao_cadastro_categoria,
            pop_up_de_editar_categoria,
            set_pop_up_de_editar_categoria,
            id_categoria,
            set_id_categoria,
            pop_up_notificacao_editar_categoria,
            set_pop_up_notificacao_editar_categoria,
            pop_up_de_excluir_categoria,
            set_pop_up_de_excluir_categoria,
            pop_up_notificacao_excluir_categoria,
            set_pop_up_notificacao_excluir_categoria,
            chat_aberto,
            set_chat_aberto,
            array_chat,
            set_array_chat,
            erro_pagina,
            set_erro_pagina,
            conversa_atual,
            set_conversa_atual,
            conversa_aberta,
            set_conversa_aberta,
            pessoa_com_quem_esta_conversando,
            set_pessoa_com_quem_esta_conversando,
            usuario_logado,
            set_usuario_logado,
            excluir_conversa_chat,
            set_excluir_conversa_chat,
            pop_up_notificacao_excluir_conversa,
            set_pop_up_notificacao_excluir_conversa,
            altura_inicial_chat,
            set_altura_inicial_chat,
            altura_inicial_header_chat,
            set_altura_inicial_header_chat,
            excluir_mensagens_chat,
            set_excluir_mensagens_chat,
            endereco_cadastrado,
            set_endereco_cadastrado,
            array_estoques,
            set_array_estoques,
            filtro_de_pesquisa,
            set_filtro_de_pesquisa,
            produto,
            set_produto,
            exibir_produtos_filtrados,
            set_exibir_produtos_filtrados,
            array_de_produtos_aleatorios,
            set_array_de_produtos_aleatorios,
            tipo_de_header,
            set_tipo_de_header,
            sacola_aberta,
            set_sacola_aberta,
            sacola,
            set_sacola,
            brecho_selecionado,
            set_brecho_selecionado,
            id_categoria_selecionada,
            set_id_categoria_selecionada,
            pagina_atual,
            set_pagina_atual,
            sacola_ou_produto,
            set_sacola_ou_produto,

            id_do_produto_a_excluir,
            set_id_do_produto_a_excluir,

            exibir_nome_brecho,
            set_exibir_nome_brecho,
            nome_do_brecho,
            set_nome_do_brecho,

            formCadastroBrecho,
            setFormCadastroBrecho,
            enderecoDoBrecho,
            setEnderecoDoBrecho,
            cadastroParteUmBrecho,
            setCadastroParteUmBrecho,
            cadastroParteDoisBrecho,
            setCadastroParteDoisBrecho,
            cadastroParteTresBrecho,
            setCadastroParteTresBrecho,
            arrayBrechos,
            setArrayBrechos,
            imagemPerfilCadastroBrecho,
            setImagemPerfilCadastroBrecho,
            id_do_brecho_a_excluir,
            set_id_do_brecho_a_excluir,
            pop_up_notificacao_excluir_brechos_dashboard,
            set_pop_up_notificacao_excluir_brechos_dashboard,
            termoBuscado,
            setTermoBuscado,
            array_marcas,
            set_array_marcas,
            id_marca,
            set_id_marca,
            pop_up_de_cadastrar_marca,
            set_pop_up_de_cadastrar_marca,
            imagemLogoMarca,
            setImagemLogoMarca,
            pop_up_notificacao_cadastro_marca,
            set_pop_up_notificacao_cadastro_marca,
            pop_up_notificacao_cadastro_produto,
            set_pop_up_notificacao_cadastro_produto,
            pop_up_editar_marca,
            set_pop_up_editar_marca,
            pop_up_notificacao_editar_marca,
            set_pop_up_notificacao_editar_marca,
            pop_up_excluir_marca,
            set_pop_up_excluir_marca,
            pop_up_notificacao_excluir_marca,
            set_pop_up_notificacao_excluir_marca,
            id_marca_selecionada,
            set_id_marca_selecionada,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}