import { createBrowserRouter } from "react-router-dom"
import Tela_incial from "../pages/Tela_incial";
import Cadastro_cliente from "../pages/Cadastro/Cadastro_cliente";
import Login from "../pages/Login/Login";
import DashBoard from "../pages/DashBoard/DashBoard";

import HeaderBrecho from "../components/HeaderBrecho";

import Footer from "../components/Footer";
import GestaoEstoque from "../pages/Gestao_Estoque/Gestao_Estoque";
import Cadastro_Produto from "../pages/Cadastro_Produto/Cadastro_Produto";
import Cadastro_brecho from "../pages/Cadastro/Cadastro_brecho";


const router = createBrowserRouter([
   { path: `/`, element: <Tela_incial /> },
   { path: `/cadastro_cliente`, element: <Cadastro_cliente /> },
   { path: `/cadastro_brecho`, element: <Cadastro_brecho /> },
   { path: `/login`, element: <Login /> },
   { path: `/dashboard`, element: <DashBoard /> },


   { path: `/footer`, element: <Footer /> },
   { path: `/gestao_estoque`, element: <GestaoEstoque /> },
   { path: `/cadastro_produto`, element: <Cadastro_Produto /> }

])

export default router;