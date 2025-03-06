import React from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { useEffect } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

function Inicio_dashboard() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    
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
    <div className="container_alinhamento_botoes_dashboard">

    <div className="dashboard_container_brechos">
        
        <img src="./img/icone_dashboard_brechos_v_um.svg" alt="Brechós" />
        <h2>{array_brechos.length}</h2>
        <span>Brechós</span>

    </div>

    <div className="dashboard_container_clientes">
        
        <img src="./img/icone_dashboard_clientes_v_um.svg" alt="Clientes" />
        <h2>{array_clientes.length}</h2>
        <span>Clientes</span>

    </div>

    <div className="dashboard_container_produtos">
        
        <img src="./img/icone_dashboard_produtos_v_um.svg" alt="Produtos" />
        <h2>{array_clientes.length}</h2>
        <span>Produtos</span>

    </div>

    <div className="dashboard_container_categorias">
        
        <img src="./img/icone_dashboard_etiqueta_v_um.svg" alt="Categorias" />
        <h2>{array_clientes.length}</h2>
        <span>Categorias</span>

    </div>

</div>
  )
}

export default Inicio_dashboard
