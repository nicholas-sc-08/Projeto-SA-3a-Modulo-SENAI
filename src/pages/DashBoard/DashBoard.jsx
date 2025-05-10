import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import './DashBoard.css';
import Inicio_dashboard from '../../components/Inicio_dashboard';
import Clientes_dashboard from '../../components/Clientes_dashboard.jsx';
import Categorias_dashboard from '../../components/Categorias_dashboard.jsx';
import Produtos_dashboard from '../../components/Produtos_dashboard.jsx';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';
import Brechos_dashboard from '../../components/Brechos_dashboard.jsx';

function DashBoard() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { array_categorias, set_array_categorias } = useContext(GlobalContext);
    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { inicio_dashboard, set_incio_dashboard } = useContext(GlobalContext);
    const { clientes_dashboard, set_clientes_dashboard } = useContext(GlobalContext);
    const { categorias_dashboard, set_categorias_dashboard } = useContext(GlobalContext);
    const { produtos_dashboard, set_produtos_dashboard } = useContext(GlobalContext);
    const { brechos_dashboard, set_brechos_dashboard } = useContext(GlobalContext)
    const { erro_pagina, set_erro_pagina } = useContext(GlobalContext);
    const navegar = useNavigate(``);


    useEffect(() => {

        atualizar_clientes();
        atualizar_categorias();
        atualizar_produtos();
        atualizar_brechos()

    }, []);

    async function atualizar_clientes() {

        try {

            const resultado = await api.get(`/clientes`);
            set_array_clientes(resultado.data);

        } catch (erro) {

            console.error(erro);
            set_erro_pagina(erro);
            navegar(`/erro`);

        };
    };

    async function atualizar_categorias() {

        try {

            const categorias = await api.get(`/categorias`);
            set_array_categorias(categorias.data);

        } catch (erro) {

            console.error(erro);
            set_erro_pagina(erro);
            navegar(`/erro`);
        };
    };

    async function atualizar_produtos() {

        try {

            const produtos = await api.get(`/produtos`);
            set_array_produtos(produtos.data);

        } catch (erro) {

            console.error(erro);

        };
    };

    async function atualizar_brechos() {

        try {

            const brechos = await api.get(`/brechos`);
            set_array_brechos(brechos.data);

        } catch (erro) {

            console.error(erro);

        };
    };

    return (
    <div>
        { inicio_dashboard && <Inicio_dashboard/>}
        { clientes_dashboard && <Clientes_dashboard/>}
        { categorias_dashboard && <Categorias_dashboard/>}
        { produtos_dashboard && <Produtos_dashboard />}
        { brechos_dashboard && <Brechos_dashboard />}
    </div>
  )
}

export default DashBoard
