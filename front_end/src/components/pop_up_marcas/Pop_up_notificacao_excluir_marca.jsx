import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'

function Pop_up_notificacao_excluir_marca() {

    const { pop_up_notificacao_excluir_marca, set_pop_up_notificacao_excluir_marca } = useContext(GlobalContext)

    useEffect(() => {
    
            if (pop_up_notificacao_excluir_marca) {
    
                setTimeout(() => {
    
                    set_pop_up_notificacao_excluir_marca(false);
    
                }, 2000);
    
            };
    
        }, [pop_up_notificacao_excluir_marca]);

    return (
        <div>
            <div className='container_pop_up_de_notificacao_categoria'>

                <div className="container_pop_up_dashboard_categoria">

                    <img src="./img/Certificacao.svg" alt="check" />
                    <p>Marca excluida com sucesso!</p>

                </div>

            </div>
        </div>
    )
}

export default Pop_up_notificacao_excluir_marca
