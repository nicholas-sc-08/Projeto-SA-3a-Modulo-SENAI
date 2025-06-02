import React, { useContext } from 'react';
import { useState } from 'react';
import './Sacola.css';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { GlobalContext } from '../../contexts/GlobalContext';

function Sacola() {

    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);    

  return (
    <div className='container_sacola'>

        <div className="container_header_sacola">

            <h1>Sacola</h1>

        </div>

        <div className="container_produtos_no_carrinho">

            {/* {usuario_logado.sacola.map((produto, i) => (

                <div key={i}>
                    


                </div>
            ))} */}

        </div>

    </div>
  )
}

export default Sacola
