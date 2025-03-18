import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import axios from 'axios';
import './DashBoard.css';
import Inicio_dashboard from '../../components/Inicio_dashboard';
import Clientes_dashboard from '../../components/Clientes_dashboard.jsx';
import Categorias_dashboard from '../../components/Categorias_dashboard.jsx';

function DashBoard() {
  
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { array_categorias, set_array_categorias } = useContext(GlobalContext);
    const { inicio_dashboard, set_incio_dashboard } = useContext(GlobalContext);
    const { clientes_dashboard, set_clientes_dashboard } = useContext(GlobalContext);
    const { categorias_dashboard, set_categorias_dashboard } = useContext(GlobalContext);
    
    useEffect(() => {

        atualizar_clientes();
        atualizar_categorias();
        
    }, []);

    async function atualizar_clientes(){

        try {
            
            const resultado = await axios.get(`http://localhost:3000/clientes`);
            set_array_clientes(resultado.data);            
        
        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function atualizar_categorias(){

        try {
            
            const categorias = await axios.get(`http://localhost:3000/categorias`);
            set_array_categorias(categorias.data);

        } catch (erro) {
          
            console.error(erro);
            
        };
    };

    return (
    <div>
        { inicio_dashboard && <Inicio_dashboard/>}
        { clientes_dashboard && <Clientes_dashboard/>}
        { categorias_dashboard && <Categorias_dashboard/>}
    </div>
  )
}

export default DashBoard
