import { createBrowserRouter } from "react-router-dom"
import Tela_inicial from '../pages/Inicio/Tela_incial.jsx';
import Cadastro_cliente from "../pages/Cadastro/Cadastro_cliente";
import Login from "../pages/Login/Login.jsx";
import DashBoard from "../pages/DashBoard/DashBoard.jsx";

import Footer from "../components/Footer/Footer.jsx";
import GestaoEstoque from "../pages/Gestao_Estoque/Gestao_Estoque.jsx";
import Cadastro_Produto from "../pages/Cadastro_Produto/Cadastro_Produto.jsx";
import Cadastro_brecho from "../pages/Cadastro/Cadastro_brecho.jsx";
import Perfil_Brecho from "../pages/Perfil_Brecho/Perfil_Brecho.jsx";
import Contato from "../pages/Contato/Contato.jsx";
import Sobre_nos from "../pages/Sobre_Nos/Sobre_nos.jsx";
import Erro from "../pages/Erro/Erro.jsx";
import Edicao_perfil_brecho from "../pages/Perfil_Brecho/Edicao_perfil_brecho.jsx";
import Perfil_cliente from "../pages/Perfil_Cliente/Perfil_cliente.jsx";
import Termos_de_uso from "../pages/Legal_Pages/Termos_de_uso.jsx";
import Politica_de_Privacidade from "../pages/Legal_Pages/Politica_de_Privacidade.jsx";
import Pesquisa_de_produtos from "../pages/Pesquisa_de_produtos/Pesquisa_de_produtos.jsx";
import Produto from "../pages/Produto/Produto.jsx";
import Detalhe_Pagamento from "../pages/CheckOut/Detalhe_Pagamento.jsx"
import Detalhe_Pagamento_etapa_dois from "../pages/CheckOut/Detalhe_Pagamento_etapa_dois.jsx";
import Detalhe_Pagamento_etapa_tres from "../pages/CheckOut/Detalhe_Pagamento_etapa_tres.jsx";
import Edicao_perfil_cliente from "../pages/Perfil_Cliente/Edicao_perfil_cliente.jsx";
import Escolha_cadastro from "../pages/Escolha_cadastro/Escolha_cadastro.jsx";
import TelaEmAndamento from "../pages/Em_andamento/TelaEmAndamento.jsx";
import Sacola_geral from "../pages/Sacola/Sacola_geral.jsx";



const router = createBrowserRouter([

   { path: `/`, element: <Tela_inicial /> },
   { path: `/cadastro_cliente`, element: <Cadastro_cliente /> },
   { path: `/cadastro_brecho`, element: <Cadastro_brecho /> },
   { path: `/escolha_cadastro`, element: <Escolha_cadastro /> },
   { path: `/login`, element: <Login /> },
   { path: `/sacola`, element: <Sacola_geral/>},
   { path: `/dashboard`, element: <DashBoard /> },

   { path: `/footer`, element: <Footer /> },

   { path: `/gestao_estoque`, element: <GestaoEstoque /> },
   { path: `/cadastro_produto`, element: <Cadastro_Produto /> },
   { path: `/buscarProdutos`, element: <Pesquisa_de_produtos /> },
   { path: `/produto`, element: <Produto /> },

   { path: `/contato`, element: <Contato /> },
   { path: `/sobre_nos`, element: <Sobre_nos /> },
   { path: `/erro`, element: <Erro /> },
   { path: `/TermosDeUso`, element: <Termos_de_uso /> },
   { path: `/PoliticaDePrivacidade`, element: <Politica_de_Privacidade /> },

   { path: `/perfil_brecho`, element: <Perfil_Brecho /> },
   { path: `/Edicao_perfil_brecho`, element: <Edicao_perfil_brecho /> },
   { path: `/perfil_cliente`, element: <Perfil_cliente /> },
   { path: `/detalhe_pagamento`, element: <Detalhe_Pagamento /> },
   { path: `/detalhe_pagamento_etapa_dois`, element: <Detalhe_Pagamento_etapa_dois /> },
   { path: `/detalhe_pagamento_etapa_tres`, element: <Detalhe_Pagamento_etapa_tres /> },
   { path: `/edicao_perfil_cliente`, element: <Edicao_perfil_cliente /> },


   { path: `/estamosChegando`, element: <TelaEmAndamento /> }
])

export default router;