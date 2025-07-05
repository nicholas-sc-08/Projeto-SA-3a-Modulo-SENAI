import React, { useContext } from 'react'
import './TelaEmAndamento.css'
import Header from '../../components/Header/Header'
import { GlobalContext } from '../../contexts/GlobalContext'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

function TelaEmAndamento() {

    const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }} className='alinhamento-tela-em-andamento'>

                <Header tipo={tipo_de_header} />

                <div className="container-alinhamento-um-tela-em-andamento">
                    <img src="./img/logo/logo-verdeCamadinha.svg" alt="Logo Fly" className='logo-fly-tela-em-andamento' />

                    <div className="alinhamento-letras-tela-em-andamento">
                        <h1>Calma aí! Estamos chegando...</h1>
                        <p>Em breve: A maior rede de brechós online!</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default TelaEmAndamento
