import React, { useState } from 'react'
import "./Escolha_cadastro.css";
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Escolha_cadastro() {
    const [animandoCadastro, setAnimandoCadastro] = useState(false);
    const [escolha, setEscolha] = useState(""); // novo estado pra controlar a escolha
    const navegar = useNavigate();

    const [mensagem_erro, set_mensagem_erro] = useState('')

    const LoginCadastro = () => {
        setAnimandoCadastro(true);
        setTimeout(() => {
            navegar('/login');
        }, 600);
    };

    const continuar = () => {

        if (!escolha) {
            set_mensagem_erro('Por favor, escolha o tipo de cadastro antes de continuar.');
            return;
        }

        if (escolha === "comprar") {
            navegar('/cadastro_cliente');
        } else if (escolha === "vender") {
            navegar('/cadastro_brecho');
        }
    };

    function mudarDeTela() {
        navegar('/')
    }

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }} className='alinhamento-pagina-escolha-cadastro'>
                <div className="container-ir-para-tela-login-alinhamento">
                    <AnimatePresence>
                        {!animandoCadastro && (
                            <motion.div
                                className="container-informacoes-login-cadastro-brecho"
                                initial={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 10, x: 755 }}
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
                    <img onClick={mudarDeTela} className='logo-ladoDireito' src="./img/logo-verdeCamadinha2.svg" alt="" />
                    <h1>Crie sua conta Fly!</h1>
                    <p>Qual caminho você quer seguir?</p>

                    <div className='escolha-container'>
                        <div className='quero-comprar'>
                            <input
                                type="radio"
                                id="comprar"
                                name="escolha"
                                value="comprar"
                                checked={escolha === "comprar"}
                                onChange={(e) => setEscolha(e.target.value)}
                            />
                            <label htmlFor="comprar" className='info-quero-comprar'>
                                <h3>Quero Comprar</h3>
                                <p>Explore peças únicas nos nossos brechós</p>
                            </label>
                        </div>

                        <div className='quero-vender'>
                            <input
                                type="radio"
                                id="vender"
                                name="escolha"
                                value="vender"
                                checked={escolha === "vender"}
                                onChange={(e) => setEscolha(e.target.value)}
                            />
                            <label htmlFor="vender" className='info-quero-vender'>
                                <h3>Quero Vender</h3>
                                <p>Compartilhe suas peças e dê uma nova vida à moda.</p>
                            </label>
                        </div>
                    </div>

                    <div className="container-button-mensagem-escolha-cadastro">
                        <button
                            className='but-continuar-escolha-cadastro'
                            onClick={continuar}

                        >
                            Continuar
                        </button>

                        {mensagem_erro && (
                            <p className="mensagem-erro-escolha-cadastro">{mensagem_erro}</p>
                        )}
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Escolha_cadastro
