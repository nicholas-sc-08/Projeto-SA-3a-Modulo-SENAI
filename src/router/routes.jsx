import { createBrowserRouter } from "react-router-dom"
import Tela_incial from "../pages/Tela_incial";

const router = createBrowserRouter([
   {path: `/`, element: <Tela_incial/>}
])

export default router;