import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';

function Pop_up_excluir_produto_dashboard() {

    const { id_do_produto_a_excluir, set_id_do_produto_a_excluir } = useContext(GlobalContext);
    const { array_produtos, set_array_produtos } = useContext(GlobalContext);

    const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useContext(GlobalContext);
    const { pop_up_notificacao_excluir_dashboard, set_pop_up_notificacao_excluir_dashboard } = useContext(GlobalContext);

    async function buscar_produtos() {

        try {

            const produtos = await api.get(`/produtos`);
            set_array_produtos(produtos.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function excluir_produtos(id) {

        try {

            const produto_a_excluir = await api.delete(`/produtos/${id}`);
            buscar_produtos();
            set_abrir_pop_up_dashboard(false);
            set_pop_up_notificacao_excluir_dashboard(true);

        } catch (erro) {

            console.error(erro);
        };
    };

    useEffect(() => {

        buscar_produtos();
    }, [])

    return (
        <div className='container_pop_up_de_excluir'>

            <div className="pop_up_de_excluir">

                <img src="./img/Ponto_de_interrogacao.svg" alt="" />
                <p>Tem certeza que deseja excluir este produto?</p>

                <div className="pop_up_de_excluir_botoes">

                    <button className='pop_up_de_excluir_botao_sair' onClick={() => set_abrir_pop_up_dashboard(false)}>Sair</button>
                    <button className='pop_up_de_excluir_botao_excluir' onClick={() => excluir_produtos(id_do_produto_a_excluir)}>Excluir</button>
                </div>

            </div>

        </div>
    )
}

export default Pop_up_excluir_produto_dashboard
