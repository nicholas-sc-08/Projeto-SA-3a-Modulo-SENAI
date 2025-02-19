import { createBrowserRouter } from "react-router-dom"
import Inicio from "../pages/Inicio";


const router = createBrowserRouter([
   {path: `/`, element: <Inicio/>}
])

export default router;