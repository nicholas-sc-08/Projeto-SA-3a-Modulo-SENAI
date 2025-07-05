import { useContext } from 'react';
import { useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext.jsx';
import { useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import '../../pages/DashBoard/DashBoard.css';
import Header from '../Header/Header.jsx';
import api from '../../services/api.js';


function Inicio_dashboard() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { array_categorias, set_array_categorias } = useContext(GlobalContext);
    const { array_marcas, set_array_marcas } = useContext(GlobalContext);

    const { clientes_dashboard, set_clientes_dashboard } = useContext(GlobalContext);
    const { brechos_dashboard, set_brechos_dashboard } = useContext(GlobalContext);
    const { produtos_dashboard, set_produtos_dashboard } = useContext(GlobalContext);
    const { categorias_dashboard, set_categorias_dashboard } = useContext(GlobalContext);
    const { inicio_dashboard, set_inicio_dashboard } = useContext(GlobalContext);
    const { marcas_dashboard, set_marcas_dashboard } = useContext(GlobalContext);

    const [caminho_imagem_clientes, set_caminho_imagem_clientes] = useState(`./img/icons/icone_dashboard_clientes_v_um.svg`);
    const [caminho_imagem_categorias, set_caminho_imagem_categorias] = useState(`./img/icons/icone_dashboard_etiqueta_v_um.svg`);
    const [caminho_imagem_marca, set_caminho_imagem_marca] = useState(`./img/icons/marcas-icon-branco.svg`);
    const [cor_icone_brecho, set_cor_icone_brecho] = useState(`#FFFFFF`);
    const [mudar_icone_brecho, set_mudar_icone_brecho] = useState(false);
    const [cor_icone_produtos, set_cor_icone_produtos] = useState(`#FFFFFF`);
    const [mudar_icone_produtos, set_mudar_icone_produtos] = useState(false);

    const contador_brechos = useMotionValue(0);
    const arredondar_valor_brechos = useTransform(() => Math.round(contador_brechos.get()));
    const contador_clientes = useMotionValue(0);
    const arredondar_valor_clientes = useTransform(() => Math.round(contador_clientes.get()));
    const contador_produtos = useMotionValue(0);
    const arredondar_valor_produtos = useTransform(() => Math.round(contador_produtos.get()));
    const contador_categorias = useMotionValue(0);
    const arredondar_valor_categorias = useTransform(() => Math.round(contador_categorias.get()));
    const contador_marcas = useMotionValue(0);
    const arredondar_valor_marcas = useTransform(() => Math.round(contador_marcas.get()));

    useEffect(() => {

        atualizar_clientes();
        atualizar_categorias();
        atualizar_marcas()
    }, []);

    useEffect(() => {

        const controle = animate(contador_brechos, array_brechos.length, { duration: 1 });
       
        return () => controle.stop();
    
    }, [array_brechos]);

    useEffect(() => {

        const controle = animate(contador_clientes, array_clientes.length, { duration: 1 });
    
        return () => controle.stop();
    
    }, [array_clientes]);

    useEffect(() => {

        const controle = animate(contador_produtos, array_produtos.length, { duration: 1 });
    
        return () => controle.stop();
    
    }, [array_produtos]);

    useEffect(() => {

        const controle = animate(contador_categorias, array_categorias.length, { duration: 1 });
    
        return () => controle.stop();
    
    }, [array_categorias]);

    useEffect(() => {

        const controle = animate(contador_marcas, array_marcas.length, { duration: 1 });
    
        return () => controle.stop();
    
    }, [array_marcas]);

    function ir_para_clientes() {

        set_clientes_dashboard(true);
        set_brechos_dashboard(false);
        set_produtos_dashboard(false);
        set_categorias_dashboard(false);
        set_inicio_dashboard(false);
        set_marcas_dashboard(false);

    };

    function ir_para_brechos() {

        set_clientes_dashboard(false);
        set_brechos_dashboard(true);
        set_produtos_dashboard(false);
        set_categorias_dashboard(false);
        set_inicio_dashboard(false);
        set_marcas_dashboard(false);
    };

    function ir_para_produtos() {

        set_clientes_dashboard(false);
        set_brechos_dashboard(false);
        set_produtos_dashboard(true);
        set_categorias_dashboard(false);
        set_inicio_dashboard(false);
        set_marcas_dashboard(false);

    };

    function ir_para_categorias() {

        set_clientes_dashboard(false);
        set_brechos_dashboard(false);
        set_produtos_dashboard(false);
        set_categorias_dashboard(true);
        set_inicio_dashboard(false);
        set_marcas_dashboard(false);
    };

    function ir_para_marcas() {

        set_clientes_dashboard(false);
        set_brechos_dashboard(false);
        set_produtos_dashboard(false);
        set_categorias_dashboard(false);
        set_inicio_dashboard(false);
        set_marcas_dashboard(true);
    };;

    useEffect(() => {

        if (mudar_icone_brecho) {

            set_cor_icone_brecho(`#466330`);
        } else {

            set_cor_icone_brecho(`#FFFFFF`);
        };

        if (mudar_icone_produtos) {

            set_cor_icone_produtos(`#466330`);
        } else {

            set_cor_icone_produtos(`#FFFFFF`);
        };

    }, [mudar_icone_brecho, mudar_icone_produtos]);

    async function atualizar_clientes() {

        try {

            const resultado = await api.get(`/clientes`);
            set_array_clientes(resultado.data);

        } catch (erro) {

            console.log(erro);
        };
    };

    async function atualizar_categorias() {

        try {

            const resultado = await api.get(`/categorias`);
            set_array_categorias(resultado.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function atualizar_marcas() {

        try {

            const resultado = await api.get(`/marcas`);
            set_array_marcas(resultado.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    return (
        <div>

            <Header tipo='admin' />

            <h1 className='saudacoes_ao_admin'>Olá Administrador(a)!</h1>

            <div className="container_alinhamento_botoes_dashboard">

                <div className="dashboard_container_brechos" onClick={ir_para_brechos} onMouseLeave={() => set_mudar_icone_brecho(false)} onMouseEnter={() => set_mudar_icone_brecho(true)}>

                    <div className="sombra_dashboard_container_brechos">

                        <div className='dashboard_container_brechos_borda'>
                            <div className='dashboard_container_brechos_img'>

                                <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M34.1416 5H27.4883L28.3216 13.3333C28.3216 13.3333 29.9883 15 32.4883 15C33.8006 15.0017 35.0684 14.524 36.0533 13.6567C36.1574 13.5594 36.235 13.4372 36.2787 13.3016C36.3224 13.166 36.3309 13.0214 36.3033 12.8817L35.1266 5.83333C35.0873 5.60049 34.9668 5.38909 34.7865 5.23656C34.6062 5.08404 34.3778 5.00024 34.1416 5V5Z" stroke={cor_icone_brecho} stroke-width="2" />
                                    <path d="M27.4883 5L28.3216 13.3333C28.3216 13.3333 26.6549 15 24.1549 15C21.6549 15 19.9883 13.3333 19.9883 13.3333V5H27.4883Z" stroke={cor_icone_brecho} stroke-width="2" />
                                    <path d="M19.9896 5V13.3333C19.9896 13.3333 18.3229 15 15.8229 15C13.3229 15 11.6562 13.3333 11.6562 13.3333L12.4896 5H19.9896Z" stroke={cor_icone_brecho} stroke-width="2" />
                                    <path d="M12.4892 5H5.83758C5.60091 4.99991 5.37187 5.08377 5.19121 5.23666C5.01054 5.38955 4.88997 5.60157 4.85091 5.835L3.67591 12.8833C3.64845 13.0231 3.65699 13.1676 3.70072 13.3032C3.74445 13.4387 3.82195 13.5609 3.92591 13.6583C4.47258 14.1417 5.69425 15.0017 7.48925 15.0017C9.98925 15.0017 11.6559 13.335 11.6559 13.335L12.4892 5.00167V5Z" stroke={cor_icone_brecho} stroke-width="2" />
                                    <path d="M5 15V31.6667C5 32.5507 5.35119 33.3986 5.97631 34.0237C6.60143 34.6488 7.44928 35 8.33333 35H31.6667C32.5507 35 33.3986 34.6488 34.0237 34.0237C34.6488 33.3986 35 32.5507 35 31.6667V15" stroke={cor_icone_brecho} stroke-width="2" />
                                    <path d="M24.7227 34.9993V24.9993C24.7227 24.1153 24.3715 23.2674 23.7463 22.6423C23.1212 22.0172 22.2734 21.666 21.3893 21.666H18.056C17.1719 21.666 16.3241 22.0172 15.699 22.6423C15.0738 23.2674 14.7227 24.1153 14.7227 24.9993V34.9993" stroke={cor_icone_brecho} stroke-width="2" stroke-miterlimit="16" />
                                </svg>

                            </div>
                        </div>

                    </div>

                    <motion.pre className='quantidade_de_brechos'>{arredondar_valor_brechos}</motion.pre>
                    <span>Brechós</span>

                </div>

                <div className="dashboard_container_clientes" onClick={ir_para_clientes} onMouseEnter={() => set_caminho_imagem_clientes(`./img/icons/icone_dashboard_clientes_v_dois.svg`)} onMouseLeave={() => set_caminho_imagem_clientes(`./img/icons/icone_dashboard_clientes_v_um.svg`)}>

                    <div className="sombra_dashboard_container_clientes">

                        <div className='dashboard_container_clientes_borda'>
                            <div className='dashboard_container_clientes_img'>

                                <img src={caminho_imagem_clientes} />

                            </div>
                        </div>

                    </div>

                    <motion.pre className='quantidade_de_clientes'>{arredondar_valor_clientes}</motion.pre>
                    <span>Clientes</span>

                </div>

                <div className="dashboard_container_produtos" onClick={ir_para_produtos} onMouseLeave={() => set_mudar_icone_produtos(false)} onMouseEnter={() => set_mudar_icone_produtos(true)}>

                    <div className="sombra_dashboard_container_produtos">

                        <div className='dashboard_container_produtos_borda'>

                            <div className='dashboard_container_produtos_img'>

                                <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.668 11.6672V8.33387C11.668 7.36867 11.9474 6.42411 12.4724 5.61419C12.9974 4.80428 13.7457 4.16364 14.6268 3.76961C15.5079 3.37558 16.4842 3.24499 17.4379 3.39362C18.3916 3.54225 19.2819 3.96374 20.0013 4.60721C20.7207 3.96374 21.611 3.54225 22.5647 3.39362C23.5184 3.24499 24.4947 3.37558 25.3758 3.76961C26.2569 4.16364 27.0052 4.80428 27.5302 5.61419C28.0552 6.42411 28.3346 7.36867 28.3346 8.33387V11.6672H30.8346C31.4977 11.6672 32.1336 11.9306 32.6024 12.3994C33.0712 12.8683 33.3346 13.5042 33.3346 14.1672V30.8422C33.3346 32.3871 32.7209 33.8687 31.6285 34.9611C30.5361 36.0535 29.0545 36.6672 27.5096 36.6672H13.3346C11.5665 36.6672 9.87083 35.9648 8.62059 34.7146C7.37035 33.4643 6.66797 31.7687 6.66797 30.0005V14.1672C6.66797 13.5042 6.93136 12.8683 7.4002 12.3994C7.86904 11.9306 8.50493 11.6672 9.16797 11.6672H11.668ZM22.7263 34.1672C22.0464 33.1919 21.6828 32.0311 21.6846 30.8422V14.1672H9.16797V30.0005C9.16797 30.5477 9.27574 31.0895 9.48514 31.5951C9.69453 32.1006 10.0014 32.5599 10.3884 32.9468C10.7753 33.3337 11.2346 33.6406 11.7401 33.85C12.2456 34.0594 12.7875 34.1672 13.3346 34.1672H22.7263ZM19.168 11.6672V8.33387C19.168 7.67083 18.9046 7.03495 18.4357 6.56611C17.9669 6.09727 17.331 5.83387 16.668 5.83387C16.0049 5.83387 15.369 6.09727 14.9002 6.56611C14.4314 7.03495 14.168 7.67083 14.168 8.33387V11.6672H19.168ZM21.668 11.6672H25.8346V8.33387C25.8347 7.81927 25.6759 7.31718 25.38 6.89615C25.0841 6.47512 24.6655 6.15566 24.1813 5.98137C23.6971 5.80709 23.1709 5.78648 22.6746 5.92235C22.1782 6.05822 21.7359 6.34395 21.408 6.74054C21.5763 7.24054 21.668 7.77721 21.668 8.33387V11.6672ZM24.1846 30.8422C24.1846 31.7241 24.5349 32.5698 25.1585 33.1933C25.7821 33.8169 26.6278 34.1672 27.5096 34.1672C28.3915 34.1672 29.2372 33.8169 29.8608 33.1933C30.4843 32.5698 30.8346 31.7241 30.8346 30.8422V14.1672H24.1846V30.8422Z" fill={cor_icone_produtos} />
                                </svg>

                            </div>
                        </div>

                    </div>

                    <motion.pre className='quantidade_de_produtos'>{arredondar_valor_produtos}</motion.pre>
                    <span>Produtos</span>

                </div>

                <div className="dashboard_container_categorias" onClick={ir_para_categorias} onMouseEnter={() => set_caminho_imagem_categorias(`./img/icons/icone_dashboard_etiqueta_v_dois.svg`)} onMouseLeave={() => set_caminho_imagem_categorias(`./img/icons/icone_dashboard_etiqueta_v_um.svg`)}>

                    <div className="sombra_dashboard_container_categorias">

                        <div className='dashboard_container_categorias_borda'>
                            <div className='dashboard_container_categorias_img'>
                                <img src={caminho_imagem_categorias} />
                            </div>
                        </div>

                    </div>

                    <motion.pre className='quantidade_de_categorias'>{arredondar_valor_categorias}</motion.pre>
                    <span>Categorias</span>

                </div>

                <div className="dashboard_container_categorias" onClick={ir_para_marcas} onMouseEnter={() => set_caminho_imagem_marca(`./img/icons/marcas-icon-verde.svg`)} onMouseLeave={() => set_caminho_imagem_marca(`./img/icons/marcas-icon-branco.svg`)}>

                    <div className="sombra_dashboard_container_categorias">

                        <div className='dashboard_container_categorias_borda'>
                            <div className='dashboard_container_marcas_img'>
                                <img src={caminho_imagem_marca} alt="marcas" />
                            </div>
                        </div>

                    </div>

                    <motion.pre className='quantidade_de_categorias'>{arredondar_valor_marcas}</motion.pre>
                    <span>Marcas</span>

                </div>

            </div>
        </div>

    )
}

export default Inicio_dashboard
