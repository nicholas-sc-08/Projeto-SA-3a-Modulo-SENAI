import React from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { useEffect } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import '../pages/DashBoard/DashBoard.css';

function Inicio_dashboard() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { array_categorias, set_array_categorias } = useContext(GlobalContext);
    const { clientes_dashboard, set_clientes_dashboard } = useContext(GlobalContext);
    const { brechos_dashboard, set_brechos_dashboard } = useContext(GlobalContext);
    const { produtos_dashboard, set_produtos_dashboard } = useContext(GlobalContext);
    const { categorias_dashboard, set_categorias_dashboard } = useContext(GlobalContext);
    const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext);
    
    
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

    const ir_para_clientes = () => {

        set_clientes_dashboard(true);
        set_brechos_dashboard(false);
        set_produtos_dashboard(false);
        set_categorias_dashboard(false);
        set_inicio_dashboard(false);
        
    };

    const ir_para_brechos = () => {

        set_clientes_dashboard(false);
        set_brechos_dashboard(true);
        set_produtos_dashboard(false);
        set_categorias_dashboard(false);
        set_inicio_dashboard(false);
    };

    const ir_para_produtos = () => {

        set_clientes_dashboard(false);
        set_brechos_dashboard(false);
        set_produtos_dashboard(true);
        set_categorias_dashboard(false);
        set_inicio_dashboard(false);
    };

    const ir_para_categorias = () => {

        set_clientes_dashboard(false);
        set_brechos_dashboard(false);
        set_produtos_dashboard(false);
        set_categorias_dashboard(true);
        set_inicio_dashboard(false);
    };

  return (
<div>
    <h1 className='saudacoes_ao_admin'>Olá Administrador(a)!</h1>

    <div className="container_alinhamento_botoes_dashboard" onClick={ir_para_brechos}>

        <div className="dashboard_container_brechos">
            
            <div className="sombra_dashboard_container_brechos">

            <div className='dashboard_container_brechos_borda'>
                <div className='dashboard_container_brechos_img'>
                <img src="./img/icone_dashboard_brechos_v_um.svg" alt="Brechós" />
                </div>
            </div>

            </div>

            <h2>{array_brechos.length}</h2>
            <span>Brechós</span>

        </div>

        <div className="dashboard_container_clientes" onClick={ir_para_clientes}>
            
            <div className="sombra_dashboard_container_clientes">

            <div className='dashboard_container_clientes_borda'>
                <div className='dashboard_container_clientes_img'>
                <img src="./img/icone_dashboard_clientes_v_um.svg" alt="Clientes" />
                </div>
            </div>

            </div>

            <h2>{array_clientes.length}</h2>
            <span>Clientes</span>

        </div>

        <div className="dashboard_container_produtos" onClick={ir_para_produtos}>
            
            <div className="sombra_dashboard_container_produtos">

            <div className='dashboard_container_produtos_borda'>
                <div className='dashboard_container_produtos_img'>
                <img src="./img/icone_dashboard_produtos_v_um.svg" alt="Produtos" />
                </div>
            </div>

            </div>

            <h2>{array_produtos.length}</h2>
            <span>Produtos</span>

        </div>

        <div className="dashboard_container_categorias" onClick={ir_para_categorias}>
            
            <div className="sombra_dashboard_container_categorias">

            <div className='dashboard_container_categorias_borda'>
                <div className='dashboard_container_categorias_img'>
                <img src="./img/icone_dashboard_etiqueta_v_um.svg" alt="categorias" />
                </div>
            </div>

            </div>

            <h2>{array_categorias.length}</h2>
            <span>Categorias</span>

        </div>

    </div>
</div>

  )
}

export default Inicio_dashboard
