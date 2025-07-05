import { useEffect, useState } from 'react';
import './Filtro_de_pesquisa.css';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';

function Filtro_de_pesquisa() {

    const { array_categorias, set_array_categorias } = useContext(GlobalContext);
    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { id_categoria_selecionada, set_id_categoria_selecionada } = useContext(GlobalContext);
    const { filtro_de_pesquisa, set_filtro_de_pesquisa } = useContext(GlobalContext);
    const { pagina_atual, set_pagina_atual } = useContext(GlobalContext);
    const [array_produtos_original, set_array_produtos_original] = useState([]);
    const [botao_titulo_precos_deg, set_botao_titulo_precos_deg] = useState(`rotate(0deg)`);
    const [botao_filtro_um_deg, set_botao_filtro_um_deg] = useState(`rotate(0deg)`);
    const [botao_filtro_dois_deg, set_botao_filtro_dois_deg] = useState(`rotate(0deg)`);
    const [botao_filtro_tres_deg, set_botao_filtro_tres_deg] = useState(`rotate(0deg)`);
    const [botao_estilo_um_deg, set_botao_estilo_um_deg] = useState(`rotate(0deg)`);
    const [botao_estilo_dois_deg, set_botao_estilo_dois_deg] = useState(`rotate(0deg)`);
    const [botao_estilo_tres_deg, set_botao_estilo_tres_deg] = useState(`rotate(0deg)`);
    const [botao_titulo_tamanho_deg, set_botao_titulo_tamanho_deg] = useState(`rotate(0deg)`);
    const [exibir_filtro_do_preco, set_exibir_filtro_do_preco] = useState(true);
    const [exibir_filtro_do_tamanho, set_exibir_filtro_do_tamanho] = useState(true);
    const [exibir_filtro_um, set_exibir_filtro_um] = useState(false);
    const [exibir_filtro_dois, set_exibir_filtro_dois] = useState(false);
    const [exibir_filtro_tres, set_exibir_filtro_tres] = useState(false);
    const [exibir_estilo_um, set_exibir_estilo_um] = useState(false);
    const [exibir_estilo_dois, set_exibir_estilo_dois] = useState(false);
    const [exibir_estilo_tres, set_exibir_estilo_tres] = useState(false);
    const [array_de_tamanhos_de_roupa, set_array_de_tamanhos_de_roupa] = useState([`P`, `M`, `G`, `GG`]);
    const [preco_exibido, set_preco_exibido] = useState(``);
    const [preco_maximo, set_preco_maximo] = useState(300);

    useEffect(() => {

        buscar_categorias();
        buscar_produtos();
    }, []);

    useEffect(() => {

        if (filtro_de_pesquisa.preco == preco_maximo) {

            set_preco_exibido(`Qualquer preço`);
        } else {

            const preco_total = parseFloat(filtro_de_pesquisa.preco).toFixed(2).replace(`.`, `,`);
            set_preco_exibido(`R$${preco_total}`);
        };

    }, [filtro_de_pesquisa]);

    async function buscar_produtos() {

        try {

            const produtos = await api.get(`/produtos`);
            set_array_produtos(produtos.data)
            set_array_produtos_original(produtos.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function buscar_categorias() {

        try {

            const categorias = await api.get(`/categorias`);
            set_array_categorias(categorias.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    function exibir_sub_categorias(categoria_principal) {

        if (botao_filtro_um_deg == `rotate(0deg)` && categoria_principal == `filtro_um`) {

            set_botao_filtro_um_deg(`rotate(90deg)`);
            set_exibir_filtro_um(true);
            set_exibir_filtro_dois(false);
            set_exibir_filtro_tres(false);
        } else {

            set_botao_filtro_um_deg(`rotate(0deg)`);
            set_exibir_filtro_um(false);
        };

        if (botao_filtro_dois_deg == `rotate(0deg)` && categoria_principal == `filtro_dois`) {

            set_botao_filtro_dois_deg(`rotate(90deg)`);
            set_exibir_filtro_dois(true);
        } else {

            set_botao_filtro_dois_deg(`rotate(0deg)`);
            set_exibir_filtro_dois(false);
        };

        if (botao_filtro_tres_deg == `rotate(0deg)` && categoria_principal == `filtro_tres`) {

            set_botao_filtro_tres_deg(`rotate(90deg)`);
            set_exibir_filtro_tres(true);
        } else {

            set_botao_filtro_tres_deg(`rotate(0deg)`);
            set_exibir_filtro_tres(false);
        };

        if (botao_estilo_um_deg == `rotate(0deg)` && categoria_principal == `estilo_um`) {

            set_botao_estilo_um_deg(`rotate(90deg)`);
            set_exibir_estilo_um(true);
        } else {

            set_botao_estilo_um_deg(`rotate(0deg)`);
            set_exibir_estilo_um(false);
        };

        if (botao_estilo_dois_deg == `rotate(0deg)` && categoria_principal == `estilo_dois`) {

            set_botao_estilo_dois_deg(`rotate(90deg)`);
            set_exibir_estilo_dois(true);
        } else {

            set_botao_estilo_dois_deg(`rotate(0deg)`);
            set_exibir_estilo_dois(false);
        };

        if (botao_estilo_tres_deg == `rotate(0deg)` && categoria_principal == `estilo_tres`) {

            set_botao_estilo_tres_deg(`rotate(90deg)`);
            set_exibir_estilo_tres(true);
        } else {

            set_botao_estilo_tres_deg(`rotate(0deg)`);
            set_exibir_estilo_tres(false);
        };
    };

    function sub_categorias_das_principais(categoria_principal) {

        const encontrar_categoria = array_categorias.filter(categoria => categoria.nome.toUpperCase().includes(categoria_principal.toUpperCase()) && categoria.sub_categoria == true);
        const resultado = encontrar_categoria.slice(0, 2);

        return resultado;
    };

    function selecionar_tamanho(tamanho) {

        const index_tamanho = filtro_de_pesquisa.tamanhos.indexOf(tamanho);
        let tamanhos_novo = [];

        if (index_tamanho == -1) {

            tamanhos_novo = [...filtro_de_pesquisa.tamanhos, tamanho];
            set_filtro_de_pesquisa({ ...filtro_de_pesquisa, tamanhos: tamanhos_novo });

        } else {

            tamanhos_novo = filtro_de_pesquisa.tamanhos.filter(tamanho_analisar => tamanho_analisar != tamanho);
            set_filtro_de_pesquisa({ ...filtro_de_pesquisa, tamanhos: tamanhos_novo });
        };
    };

    function categorias_principais(categoria) {

        const index_da_cateogria = array_categorias.findIndex(categoria_principal => categoria_principal.nome.toUpperCase() == categoria.toUpperCase() && categoria_principal.sub_categoria == false);

        if (index_da_cateogria != -1) {

            return array_categorias[index_da_cateogria].nome;
        };
    };

    function limpar_filtro_de_pesquisa() {

        set_filtro_de_pesquisa({ preco: `0`, tamanhos: [], categoria_filtrada: `` });
        buscar_produtos();
        set_id_categoria_selecionada(null);
    };

    function aplicar_filtro() {

        const encontrar_categoria = array_categorias.find(categoria => categoria.nome.toUpperCase().includes(filtro_de_pesquisa.categoria_filtrada.toUpperCase()));

        const filtrar_produtos_selecionados = array_produtos_original.filter(p => {

            const filtrar_por_preco = p.preco <= parseFloat(filtro_de_pesquisa.preco);
            const filtrar_por_categoria = filtro_de_pesquisa.categoria_filtrada ? encontrar_categoria ? p.fk_id_categoria == encontrar_categoria._id : false : true;
            const filtrar_por_tamanho = filtro_de_pesquisa.tamanhos && filtro_de_pesquisa.tamanhos.length > 0 ? filtro_de_pesquisa.tamanhos.some(tamanho_selecionado => p.tamanho.includes(tamanho_selecionado)) : true;

            return filtrar_por_preco && filtrar_por_categoria && filtrar_por_tamanho;
        });

        set_pagina_atual(1);
        set_array_produtos(filtrar_produtos_selecionados);
    };

    function categoria_selecionada(categoria) {

        const esta_selecionada = filtro_de_pesquisa.categoria_filtrada.toUpperCase().includes(categoria.toUpperCase());

        return esta_selecionada;
    };

    return (
        <div className="container_filtro_de_pesquisa">

            <div className="container_titulo_filtro_de_pesquisa">

                <h1>Filtros</h1>
                <img src="./img/icons/icone-filtro-pesquisa.svg" alt="" />

            </div>

            <div className="container_pesquisa_por_categoria">

                <div className="container_pesquisa_filtro_um">

                    <p style={{ color: botao_filtro_um_deg == `rotate(90deg)` || categoria_selecionada(`camiseta`) ? `#3E2A21` : `#3e2a219e`, fontWeight: exibir_estilo_tres || categoria_selecionada(`camiseta`) ? `525` : `500` }}>{categorias_principais(`camiseta`)}</p>
                    <button onClick={() => exibir_sub_categorias(`filtro_um`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{ transform: botao_filtro_um_deg }} /></button>

                </div>

                {exibir_filtro_um &&

                    <div className="container_resultado_pesquisa_filtro_um">

                        {sub_categorias_das_principais(`camiseta`).map((sub_categoria) => (

                            <div key={sub_categoria._id}>

                                <button onClick={() => set_filtro_de_pesquisa({ ...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome })} style={{ color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500` }}>{sub_categoria.nome}</button>

                            </div>
                        ))}

                    </div>
                }

                <div className="container_pesquisa_filtro_dois">

                    <p style={{ color: botao_filtro_dois_deg == `rotate(90deg)` || categoria_selecionada(`short`) ? `#3E2A21` : `#3e2a219e`, fontWeight: exibir_estilo_tres || categoria_selecionada(`short`) ? `525` : `500` }}>{categorias_principais(`short`)}</p>
                    <button onClick={() => exibir_sub_categorias(`filtro_dois`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{ transform: botao_filtro_dois_deg }} /></button>

                </div>

                {exibir_filtro_dois &&

                    <div className="container_resultado_pesquisa_filtro_dois">

                        {sub_categorias_das_principais(`short`).map((sub_categoria) => (

                            <div key={sub_categoria._id}>

                                <button onClick={() => set_filtro_de_pesquisa({ ...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome })} style={{ color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500` }}>{sub_categoria.nome}</button>

                            </div>
                        ))}

                    </div>
                }

                <div className="container_pesquisa_filtro_tres">

                    <p style={{ color: botao_filtro_tres_deg == `rotate(90deg)` || categoria_selecionada(`tênis`) ? `#3E2A21` : `#3e2a219e`, fontWeight: exibir_estilo_tres || categoria_selecionada(`tênis`) ? `525` : `500` }}>{categorias_principais(`tênis`)}</p>
                    <button onClick={() => exibir_sub_categorias(`filtro_tres`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{ transform: botao_filtro_tres_deg }} /></button>

                </div>

                {exibir_filtro_tres &&

                    <div className="container_resultado_pesquisa_filtro_tres">

                        {sub_categorias_das_principais(`tênis`).map((sub_categoria) => (

                            <div key={sub_categoria._id}>

                                <button onClick={() => set_filtro_de_pesquisa({ ...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome })} style={{ color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500` }}>{sub_categoria.nome}</button>

                            </div>
                        ))}

                    </div>
                }

            </div>


            <div className="container_preco_titulo_filtro_de_pesquisa">

                <h1>Preços</h1>

            </div>

            <div className="container_preco_filtro_de_pesquisa">

                <div className="container_selecionar_preco_filtro_de_pesquisa">

                    <input type="range" min={0} max={preco_maximo} step={0.01} value={filtro_de_pesquisa.preco} onChange={e => set_filtro_de_pesquisa({ ...filtro_de_pesquisa, preco: e.target.value })} />

                    <div className="container_exibir_preco_filtro_de_pesquisa">

                        <p>R$ 0,00</p>
                        <p>{preco_exibido}</p>

                    </div>

                </div>

            </div>

            <div className="container_tamanho_titulo_filtro_de_pesquisa">

                <h1>Tamanhos</h1>

            </div>

            <div className="container_tamanho_filtro_de_pesquisa">

                <div className="container_selecionar_tamanho_filtro_de_pesquisa">

                    {array_de_tamanhos_de_roupa.map((tamanho, i) => (

                        <div key={i} className={filtro_de_pesquisa.tamanhos.includes(tamanho) ? `container_botao_selecionado_filtro` : `container_botao_filtro`}>

                            <button onClick={() => selecionar_tamanho(tamanho)}>{tamanho}</button>

                        </div>
                    ))}

                </div>

            </div>

            <div className="container_titulo_estilos">

                <h1>Estilos</h1>

            </div>

            <div className="container_pesquisa_por_estilos">

                <div className="container_pesquisa_por_estilo_um">

                    <p style={{ color: exibir_estilo_um || categoria_selecionada(`casual`) ? `#3E2A21` : `#3e2a219e`, fontWeight: exibir_estilo_tres || categoria_selecionada(`casual`) ? `525` : `500` }}>{categorias_principais(`casual`)}</p>
                    <button onClick={() => exibir_sub_categorias(`estilo_um`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{ transform: botao_estilo_um_deg }} /></button>

                </div>

                {exibir_estilo_um &&

                    <div className="container_resultado_pesquisa_estilo_um">

                        {sub_categorias_das_principais(`casual`).map((sub_categoria) => (

                            <div key={sub_categoria._id}>

                                <button onClick={() => set_filtro_de_pesquisa({ ...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome })} style={{ color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500` }}>{sub_categoria.nome}</button>

                            </div>
                        ))}

                    </div>
                }

                <div className="container_pesquisa_por_estilo_dois">

                    <p style={{ color: exibir_estilo_dois || categoria_selecionada(`esporte`) ? `#3E2A21` : `#3e2a219e`, fontWeight: exibir_estilo_tres || categoria_selecionada(`esporte`) ? `525` : `500` }}>{categorias_principais(`esporte`)}</p>
                    <button onClick={() => exibir_sub_categorias(`estilo_dois`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{ transform: botao_estilo_dois_deg }} /></button>

                </div>

                {exibir_estilo_dois &&

                    <div className="container_resultado_pesquisa_estilo_dois">

                        {sub_categorias_das_principais(`esport`).map((sub_categoria) => (

                            <div key={sub_categoria._id}>

                                <button onClick={() => set_filtro_de_pesquisa({ ...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome })} style={{ color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500` }}>{sub_categoria.nome}</button>

                            </div>
                        ))}

                    </div>
                }

                <div className="container_pesquisa_por_estilo_tres">

                    <p style={{ color: exibir_estilo_tres || categoria_selecionada(`jaqueta`) ? `#3E2A21` : `#3e2a219e`, fontWeight: exibir_estilo_tres || categoria_selecionada(`jaqueta`) ? `525` : `500` }}>{categorias_principais(`jaqueta`)}</p>
                    <button onClick={() => exibir_sub_categorias(`estilo_tres`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{ transform: botao_estilo_tres_deg }} /></button>

                </div>

                {exibir_estilo_tres &&

                    <div className="container_resultado_pesquisa_estilo_tres">

                        {sub_categorias_das_principais(`jaqueta`).map((sub_categoria) => (

                            <div key={sub_categoria._id}>

                                <button onClick={() => set_filtro_de_pesquisa({ ...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome })} style={{ color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500` }}>{sub_categoria.nome}</button>

                            </div>
                        ))}

                    </div>
                }

            </div>

            <div className="container_botao_filtro_de_pesquisa">

                <button className='botao_filtro_de_pesquisa_limpar' onClick={() => limpar_filtro_de_pesquisa()}>Limpar</button>
                <button className='botao_filtro_de_pesquisa_aplicar' onClick={() => aplicar_filtro()}>Aplicar Filtro</button>

            </div>

        </div>
    );
}

export default Filtro_de_pesquisa;
