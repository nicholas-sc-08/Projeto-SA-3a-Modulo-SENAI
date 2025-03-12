import { createBrowserRouter } from "react-router-dom"
import Tela_incial from "../pages/Tela_incial";
import Cadastro_cliente from "../pages/Cadastro/Cadastro_cliente";
import Login from "../pages/Login/Login";
import DashBoard from "../pages/DashBoard/DashBoard";
import Gestao_Estoque from "../pages/Gestao_Estoque/Gestao_Estoque";

const router = createBrowserRouter([
   {path: `/`, element: <Tela_incial/>},
   {path: `/cadastro_cliente`, element: <Cadastro_cliente/>},
   {path: `/login`, element: <Login/>},
   {path: `/dashboard`, element: <DashBoard/>},
   {path: `/gestao_estoque`, element: <Gestao_Estoque/>},
])

export default router;