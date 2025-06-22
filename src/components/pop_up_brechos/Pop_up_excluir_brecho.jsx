import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';

function Pop_up_excluir_brecho() {

    const { id_do_brecho_a_excluir, set_id_do_brecho_a_excluir } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext)
    const { array_enderecos, set_array_enderecos } = useContext(GlobalContext)

    const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useContext(GlobalContext);

    async function buscar_brechos() {

        try {

            const brechos = await api.get(`/brechos`);
            set_array_brechos(brechos.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function buscar_enderecos() {

        try {

            const enderecos = await api.get(`/enderecos`);
            set_array_enderecos(enderecos.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function excluir_brechos(id) {

        try {

            const brecho_a_excluir = await api.delete(`/brechos/${id}`);
            buscar_brechos();
            buscar_enderecos();
            set_abrir_pop_up_dashboard(false);
            set_pop_up_notificacao_excluir_dashboard(true);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function excluir_endereco(id) {

        try {

            const endereco_a_excluir = await api.delete(`/enderecos/${id}`);
            excluir_brechos(id);

        } catch (erro) {

            console.error(erro);
        };
    };

    useEffect(() => {

        buscar_brechos();
        buscar_enderecos();

    }, []);

    return (
        <div className='container_pop_up_de_excluir'>

            <div className="pop_up_de_excluir">

                <img src="./img/Ponto_de_interrogacao.svg" alt="" />
                <p>Tem certeza que deseja excluir essa conta de usuário?</p>

                <div className="pop_up_de_excluir_botoes">

                    <button className='pop_up_de_excluir_botao_sair' onClick={() => set_abrir_pop_up_dashboard(false)}>Sair</button>
                    <button className='pop_up_de_excluir_botao_excluir' onClick={() => excluir_endereco(id_do_brecho_a_excluir)}>Excluir</button>
                </div>

            </div>

        </div>
    )
}

export default Pop_up_excluir_brecho
