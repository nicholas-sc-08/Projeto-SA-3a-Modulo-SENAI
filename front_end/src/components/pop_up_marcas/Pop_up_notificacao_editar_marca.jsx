import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'

function Pop_up_notificacao_editar_marca() {

    const { pop_up_notificacao_editar_marca, set_pop_up_notificacao_editar_marca } = useContext(GlobalContext)

    useEffect(() => {

        if (pop_up_notificacao_editar_marca) {

            setTimeout(() => {

                set_pop_up_notificacao_editar_marca(false);

            }, 2000);

        };

    }, [pop_up_notificacao_editar_marca]);

    return (
        <div className='container_pop_up_de_notificacao_categoria'>

            <div className="container_pop_up_dashboard_categoria">

                <img src="./img/Certificacao.svg" alt="check" />
                <p>Marca editada com sucesso!</p>

            </div>

        </div>
    )
}

export default Pop_up_notificacao_editar_marca
