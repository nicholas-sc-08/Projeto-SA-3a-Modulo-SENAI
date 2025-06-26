import React, { useContext } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';

function Pop_up_excluir_marca() {

    const { array_marcas, set_array_marcas } = useContext(GlobalContext)
    const { pop_up_excluir_marca, set_pop_up_excluir_marca } = useContext(GlobalContext)
    const { id_marca, set_id_marca } = useContext(GlobalContext);
    const { pop_up_notificacao_excluir_marca, set_pop_up_notificacao_excluir_marca } = useContext(GlobalContext)

    async function buscar_marcas() {

        try {

            const marcas = await api.get(`/marcas`);
            set_array_marcas(marcas.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function excluir_marca() {

        try {

            await api.delete(`/marcas/${id_marca}`);
            buscar_marcas();
            set_pop_up_notificacao_excluir_marca(true)
            set_pop_up_excluir_marca(false);

        } catch (erro) {

            console.error(erro);
        };
    };

    return (
        <div className='container_pop_up_de_excluir'>

            <div className="pop_up_de_excluir">

                <img src="./img/Ponto_de_interrogacao.svg" alt="" />
                <p>Tem certeza que deseja excluir essa marca?</p>

                <div className="pop_up_de_excluir_botoes">

                    <button className='pop_up_de_excluir_botao_sair' onClick={() => set_pop_up_excluir_marca(false)}>Sair</button>
                    <button className='pop_up_de_excluir_botao_excluir' onClick={excluir_marca}>Excluir</button>
                </div>

            </div>

        </div>
    )
}

export default Pop_up_excluir_marca
