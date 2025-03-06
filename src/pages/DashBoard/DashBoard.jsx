import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import axios from 'axios';
import './DashBoard.css';
import Inicio_dashboard from '../../components/Inicio_dashboard';

function DashBoard() {
  
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { incio_dashboard, set_incio_dashboard } = useContext(GlobalContext);
    
    useEffect(() => {

        atualizar_clientes();

    }, []);

    const atualizar_clientes = async () => {

        try {
            
            const resultado = await axios.get(`http://localhost:3000/clientes`);
            set_array_clientes(resultado.data);            
        
        } catch (erro) {
          
            console.log(erro);
        };
    };

    return (
    <div>

        <p>Olá Administrador(a)!</p>

        {incio_dashboard && <Inicio_dashboard/>}
    </div>
  )
}

export default DashBoard
