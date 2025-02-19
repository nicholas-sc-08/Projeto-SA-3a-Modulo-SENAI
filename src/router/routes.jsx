import { createBrowserRouter } from "react-router-dom"
import Tela_inicial from "../pages/Tela_inicial";


const router = createBrowserRouter([
   {path: `/`, element: <Tela_inicial/>}
])

export default router;