import { createBrowserRouter } from "react-router-dom"
import Tela_inicial from '../pages/Inicio/Tela_incial.jsx';
import Cadastro_cliente from "../pages/Cadastro/Cadastro_cliente";
import Login from "../pages/Login/Login";
import DashBoard from "../pages/DashBoard/DashBoard";

import Footer from "../components/Footer";
import GestaoEstoque from "../pages/Gestao_Estoque/Gestao_Estoque";
import Cadastro_Produto from "../pages/Cadastro_Produto/Cadastro_Produto";
import Cadastro_brecho from "../pages/Cadastro/Cadastro_brecho";
import Perfil_Brecho from "../pages/Perfil_Brecho/Perfil_Brecho";
import Contato from "../pages/Contato/Contato";
import Sobre_nos from "../pages/Sobre_Nos/Sobre_nos";
import Erro from "../pages/Erro/Erro";
import Edicao_perfil_brecho from "../pages/Perfil_Brecho/Edicao_perfil_brecho";
import Perfil_cliente from "../pages/Perfil_Cliente/Perfil_cliente";
import Termos_de_uso from "../pages/Legal_Pages/Termos_de_uso";
import Politica_de_Privacidade from "../pages/Legal_Pages/Politica_de_Privacidade";
import Pesquisa_de_produtos from "../pages/Pesquisa_de_produtos/Pesquisa_de_produtos";
import Produto from "../pages/Produto/Produto";
import Detalhe_Pagamento from "../pages/CheckOut/Detalhe_Pagamento"
import Detalhe_Pagamento_etapa_dois from "../pages/CheckOut/Detalhe_Pagamento_etapa_dois";
import Detalhe_Pagamento_etapa_tres from "../pages/CheckOut/Detalhe_Pagamento_etapa_tres";
import Edicao_perfil_cliente from "../pages/Perfil_Cliente/Edicao_perfil_cliente";
import Escolha_cadastro from "../pages/Cadastro/Escolha_cadastro.jsx";


const router = createBrowserRouter([

   { path: `/`, element: <Tela_inicial /> },
   { path: `/cadastro_cliente`, element: <Cadastro_cliente /> },
   { path: `/cadastro_brecho`, element: <Cadastro_brecho /> },
   { path: `/escolha_cadastro`, element: <Escolha_cadastro /> },
   { path: `/login`, element: <Login /> },
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
])

export default router;