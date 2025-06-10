import React, { useState } from 'react'
import "./Escolha_cadastro.css";
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Escolha_cadastro() {

    const [animandoCadastro, setAnimandoCadastro] = useState(false);
    const navegar = useNavigate()

    const LoginCadastro = () => {
        setAnimandoCadastro(true); // dispara animação de saída

        // espera 800ms pra redirecionar após a animação
        setTimeout(() => {
            navegar('/login');
        }, 600);
    };

    return (
        <div className='alinhamento-pagina-escolha-cadastro'>
            <div className="container-ir-para-tela-login-alinhamento">
                <AnimatePresence>
                    {!animandoCadastro && (
                        <motion.div
                            className="container-informacoes-login-cadastro-brecho"
                            initial={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 10, x: 755 }} // Se mueve a la derecha
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <img className='estrela-um-cadastro' src="./img/estrelaMenor.png" alt="" />

                            <h1>Bem-vindo de volta! Sentimos sua falta.</h1>
                            <p>A moda circular nunca para! Entre na sua conta e continue fazendo parte desse movimento incrível.</p>
                            <button onClick={LoginCadastro} type='button'>Entrar</button>

                            <img className='estrela-dois-cadastro' src="./img/estrelaGrande.png" alt="" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='ladoDireito-container-escolha-cadastro'>
                <h1>Crie sua conta Fly!</h1>
                <p>Qual caminho você quer seguir?</p>
                <div className='escolha-container'>
                    <div className='quero-comprar'>
                        <input type="radio" />
                        <div className='info-quero-comprar'>
                            <h3>Quero Comprar</h3>
                            <p>Explore peças únicas nos nossos brechós</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Escolha_cadastro
