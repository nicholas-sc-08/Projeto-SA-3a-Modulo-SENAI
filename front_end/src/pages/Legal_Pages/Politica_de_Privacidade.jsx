import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Politica_de_Privacidade.css';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';

function Politica_de_Privacidade() {

    const { tipo_de_header, set_tipo_de_header } = useContext(GlobalContext);

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}>
                <Header tipo={tipo_de_header} />

                <div className="container-all-page-politica-privacidade">
                    <div className="alinhamento-titulo-subtitulo-politica-privacidade">
                        <h1>Política de Privacidade</h1>

                        <p><strong>A sua privacidade é muito importante para nós!</strong> Aqui explicamos como seus dados são coletados, usados e protegidos dentro da Fly.</p>
                    </div>

                    <div className="container-alinhamento-topicos-politica-privacidade">
                        <div className="topico-um-politica-privacidade">
                            <h1>1. Dados que coletamos</h1>

                            <p>Ao se cadastrar ou utilizar nossos serviços, podemos coletar:</p>

                            <ul>
                                <li>Nome, e-mail, senha, CPF, endereço e outras informações fornecidas por você.</li>
                                <li>Informações de navegação, como IP, tipo de navegador e páginas acessadas.</li>
                            </ul>
                        </div>

                        <div className="topico-dois-politica-privacidade">
                            <h1>2. Uso dos dados</h1>

                            <p>Usamos seus dados para:</p>

                            <ul>
                                <li>Criar e manter sua conta;</li>
                                <li>Melhorar sua experiência dentro da plataforma;</li>
                                <li>Enviar comunicações importantes sobre seu uso da Fly;</li>
                                <li>Garantir a segurança e autenticidade dos acessos.</li>
                            </ul>
                        </div>

                        <div className="topico-tres-politica-privacidade">
                            <h1>3. Compartilhamento de dados</h1>

                            <p><strong>Seus dados não são vendidos ou compartilhados com terceiros</strong>, exceto quando necessário para funcionamento do serviço (como processadores de pagamento ou serviços de autenticação), ou por obrigação legal.</p>
                        </div>

                        <div className="topico-quatro-politica-privacidade">
                            <h1>4. Armazenamento e segurança</h1>

                            <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados, perda ou destruição. No entanto, nenhum sistema é 100% seguro, e incentivamos que você também cuide da segurança da sua conta.</p>
                        </div>

                        <div className="topico-cinco-politica-privacidade">
                            <h1>5. Seus direitos</h1>

                            <p>Você pode a qualquer momento:</p>

                            <ul>
                                <li>Acessar e corrigir seus dados;</li>
                                <li>Solicitar a exclusão da sua conta e dos seus dados;</li>
                                <li>Solicitar esclarecimentos sobre o uso dos dados.</li>
                            </ul>
                        </div>

                        <div className="topico-seis-politica-privacidade">
                            <h1>6. Cookies</h1>

                            <p>Usamos cookies para melhorar a sua experiência. Ao continuar navegando, você concorda com o uso de cookies.</p>
                        </div>

                        <div className="topico-de-duvidas-contato-politica-privacidade">
                            <h1>Dúvidas?</h1>

                            <p>Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados,
                                <a href="/contato">
                                    entre em contato conosco.</a>
                            </p>
                        </div>

                        <div className="atualizacao-politica-privacidade">
                            <h1>Data da última atualização: 04 de maio de 2025</h1>
                        </div>
                    </div>
                </div>

                <Footer />
            </motion.div>
        </AnimatePresence>
    )
}

export default Politica_de_Privacidade
