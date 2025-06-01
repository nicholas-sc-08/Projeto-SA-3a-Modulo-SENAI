import { useEffect, useState } from 'react';
import './Filtro_de_pesquisa.css';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import api from '../services/api';

function Filtro_de_pesquisa() {

    const { array_categorias, set_array_categorias } = useContext(GlobalContext);
    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { filtro_de_pesquisa, set_filtro_de_pesquisa } = useContext(GlobalContext);
    const { exibir_produtos_filtrados, set_exibir_produtos_filtrados } = useContext(GlobalContext);
    const [ botao_titulo_precos_deg, set_botao_titulo_precos_deg ] = useState(`rotate(0deg)`);
    const [ botao_filtro_um_deg, set_botao_filtro_um_deg ] = useState(`rotate(0deg)`);
    const [ botao_filtro_dois_deg, set_botao_filtro_dois_deg ] = useState(`rotate(0deg)`);
    const [ botao_filtro_tres_deg, set_botao_filtro_tres_deg ] = useState(`rotate(0deg)`);
    const [ botao_estilo_um_deg, set_botao_estilo_um_deg ] = useState(`rotate(0deg)`);
    const [ botao_estilo_dois_deg, set_botao_estilo_dois_deg ] = useState(`rotate(0deg)`);
    const [ botao_estilo_tres_deg, set_botao_estilo_tres_deg ] = useState(`rotate(0deg)`);
    const [ botao_titulo_tamanho_deg, set_botao_titulo_tamanho_deg ] = useState(`rotate(0deg)`);
    const [ exibir_filtro_do_preco, set_exibir_filtro_do_preco ] = useState(true);
    const [ exibir_filtro_do_tamanho, set_exibir_filtro_do_tamanho ] = useState(true);
    const [ exibir_filtro_um, set_exibir_filtro_um ] = useState(false);
    const [ exibir_filtro_dois, set_exibir_filtro_dois ] = useState(false);
    const [ exibir_filtro_tres, set_exibir_filtro_tres ] = useState(false);
    const [ exibir_estilo_um, set_exibir_estilo_um ] = useState(false);
    const [ exibir_estilo_dois, set_exibir_estilo_dois ] = useState(false);
    const [ exibir_estilo_tres, set_exibir_estilo_tres ] = useState(false);
    const [ array_de_tamanhos_de_roupa, set_array_de_tamanhos_de_roupa ] = useState([`PP`, `P`, `M`, `G`]);
    const [ tamanhos_selecionados, set_tamanhos_selecionados ] = useState([]);    
    const [ preco_exibido, set_preco_exibido ] = useState(``);  
    const [ preco_maximo, set_preco_maximo ] = useState(0);

    useEffect(() => {

        buscar_categorias();
        buscar_produtos();

        for(let i = 0; i < array_produtos.length; i++){

            if(array_produtos[i].preco > preco_maximo){

                set_preco_maximo(array_produtos[i].preco);                
            };
        };

    }, []);

    useEffect(() => {

        if(filtro_de_pesquisa.preco == preco_maximo){

            set_preco_exibido(`Qualquer preço`);
        } else {

            set_preco_exibido(`R$${filtro_de_pesquisa.preco}`);
        };
        console.log(preco_maximo);

    }, [filtro_de_pesquisa]);

    async function buscar_produtos(){

        try {

            const produtos = await api.get(`/produtos`);
            set_array_produtos(produtos.data);

        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function buscar_categorias(){

        try {

            const categorias = await api.get(`/categorias`);
            set_array_categorias(categorias.data);

        } catch (erro) {
          
            console.error(erro);
        };
    };

    function exibir_sub_categorias(categoria_principal){

        if(botao_filtro_um_deg == `rotate(0deg)` && categoria_principal == `filtro_um`){

            set_botao_filtro_um_deg(`rotate(90deg)`);
            set_exibir_filtro_um(true);
            set_exibir_filtro_dois(false);
            set_exibir_filtro_tres(false);
        } else {

            set_botao_filtro_um_deg(`rotate(0deg)`);
            set_exibir_filtro_um(false);
        };

        if(botao_filtro_dois_deg == `rotate(0deg)` && categoria_principal == `filtro_dois`){

            set_botao_filtro_dois_deg(`rotate(90deg)`);
            set_exibir_filtro_dois(true);
        } else {

            set_botao_filtro_dois_deg(`rotate(0deg)`);
            set_exibir_filtro_dois(false);
        };

        if(botao_filtro_tres_deg == `rotate(0deg)` && categoria_principal == `filtro_tres`){

            set_botao_filtro_tres_deg(`rotate(90deg)`);
            set_exibir_filtro_tres(true);
        } else {

            set_botao_filtro_tres_deg(`rotate(0deg)`);
            set_exibir_filtro_tres(false);
        };

        if(botao_estilo_um_deg == `rotate(0deg)` && categoria_principal == `estilo_um`){

            set_botao_estilo_um_deg(`rotate(90deg)`);
            set_exibir_estilo_um(true);
        } else {

            set_botao_estilo_um_deg(`rotate(0deg)`);
            set_exibir_estilo_um(false);
        };

        if(botao_estilo_dois_deg == `rotate(0deg)` && categoria_principal == `estilo_dois`){

            set_botao_estilo_dois_deg(`rotate(90deg)`);
            set_exibir_estilo_dois(true);
        } else {

            set_botao_estilo_dois_deg(`rotate(0deg)`);
            set_exibir_estilo_dois(false);
        };
        
        if(botao_estilo_tres_deg == `rotate(0deg)` && categoria_principal == `estilo_tres`){

            set_botao_estilo_tres_deg(`rotate(90deg)`);
            set_exibir_estilo_tres(true);
        } else {

            set_botao_estilo_tres_deg(`rotate(0deg)`);
            set_exibir_estilo_tres(false);
        };
    };

    function sub_categorias_das_principais(categoria_principal){

        const encontrar_categoria = array_categorias.filter(categoria => categoria.nome.toUpperCase().includes(categoria_principal.toUpperCase()) && categoria.sub_categoria == true);
        let array_a_ser_exibido = [];

        for(let i = 0; i < encontrar_categoria.length; i++){

            if(i < 2){

                array_a_ser_exibido.push(encontrar_categoria[i]);
            };
        };

        return array_a_ser_exibido;
    };

    function limpar_filtro_de_pesquisa(){

        set_filtro_de_pesquisa({preco: `20`, tamanho: []});
        set_tamanhos_selecionados([]);
    };

    function girar_botao_titulo_preco(){

        botao_titulo_precos_deg == `rotate(0deg)` ? set_botao_titulo_precos_deg(`rotate(180deg)`) : set_botao_titulo_precos_deg(`rotate(0deg)`);
        set_exibir_filtro_do_preco(!exibir_filtro_do_preco); 
    };

    function girar_botao_titulo_tamanho(){

        botao_titulo_tamanho_deg == `rotate(0deg)` ? set_botao_titulo_tamanho_deg(`rotate(180deg)`) : set_botao_titulo_tamanho_deg(`rotate(0deg)`);
        set_exibir_filtro_do_tamanho(!exibir_filtro_do_tamanho); 
    };

    function selecionar_tamanho(tamanho){

        const index_tamanho = tamanhos_selecionados.indexOf(tamanho);
        
        if(index_tamanho == -1){

            set_tamanhos_selecionados([...tamanhos_selecionados, tamanho]);
            set_filtro_de_pesquisa({...filtro_de_pesquisa, tamanhos: tamanhos_selecionados});

        } else {

            set_tamanhos_selecionados(tamanhos_selecionados.splice(index_tamanho, 1));
            set_filtro_de_pesquisa({...filtro_de_pesquisa, tamanhos: tamanhos_selecionados});
        };        
    };

    function categorias_principais(categoria){

        const index_da_cateogria = array_categorias.findIndex(categoria_principal => categoria_principal.nome.toUpperCase() == categoria.toUpperCase() && categoria_principal.sub_categoria == false);

        if(index_da_cateogria != -1){

            return array_categorias[index_da_cateogria].nome;
        };
    };

    return (
        <div className="container_filtro_de_pesquisa">

            <div className="container_titulo_filtro_de_pesquisa">

                <h1>Filtros</h1>
                <img src="./img/icons/icone-filtro-pesquisa.svg" alt="" />
           
            </div>
            
            <div className="container_pesquisa_por_categoria">

                <div className="container_pesquisa_filtro_um">

                    <p style={{color: botao_filtro_um_deg == `rotate(90deg)` ? `#3E2A21` : `#3e2a219e`}}>{categorias_principais(`camiseta`)}</p>
                    <button onClick={() => exibir_sub_categorias(`filtro_um`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{transform: botao_filtro_um_deg}}/></button>
                
                </div>

                { exibir_filtro_um && 
                
                    <div className="container_resultado_pesquisa_filtro_um">

                    {sub_categorias_das_principais(`camiseta`).map((sub_categoria) => (

                        <div key={sub_categoria._id}>

                            <button onClick={() => set_filtro_de_pesquisa({...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome})} style={{color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500`}}>{sub_categoria.nome}</button>

                        </div>
                    ))}

                    </div>  
                }

                <div className="container_pesquisa_filtro_dois">

                    <p style={{color: botao_filtro_dois_deg == `rotate(90deg)` ? `#3E2A21` : `#3e2a219e`}}>{categorias_principais(`short`)}</p>
                    <button onClick={() => exibir_sub_categorias(`filtro_dois`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{transform: botao_filtro_dois_deg}}/></button>
                
                </div>

                { exibir_filtro_dois && 
                
                    <div className="container_resultado_pesquisa_filtro_dois">

                    {sub_categorias_das_principais(`short`).map((sub_categoria) => (

                        <div key={sub_categoria._id}>

                            <button onClick={() => set_filtro_de_pesquisa({...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome})} style={{color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500`}}>{sub_categoria.nome}</button>

                        </div>
                    ))}

                    </div>
                }

                <div className="container_pesquisa_filtro_tres">

                    <p style={{color: botao_filtro_tres_deg == `rotate(90deg)` ? `#3E2A21` : `#3e2a219e`}}>{categorias_principais(`tênis`)}</p>
                    <button onClick={() => exibir_sub_categorias(`filtro_tres`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{transform: botao_filtro_tres_deg}}/></button>
                
                </div>    

                { exibir_filtro_tres && 
                
                <div className="container_resultado_pesquisa_filtro_tres">

                {sub_categorias_das_principais(`tênis`).map((sub_categoria) => (

                    <div key={sub_categoria._id}>

                        <button onClick={() => set_filtro_de_pesquisa({...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome})} style={{color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500`}}>{sub_categoria.nome}</button>

                    </div>
                ))}

                </div>
            }
            
            </div>


            <div className="container_preco_titulo_filtro_de_pesquisa">

                <h1>Preços</h1>
                <button onClick={() => girar_botao_titulo_preco()}><img src="./img/icons/seta_do_filtro_de_pesquisa_titulo.svg" alt="" style={{transform: botao_titulo_precos_deg}}/></button>
           
            </div>

            <div className="container_preco_filtro_de_pesquisa">

            { exibir_filtro_do_preco &&

            <div className="container_selecionar_preco_filtro_de_pesquisa">

                <input type="range" min={0} max={preco_maximo} step={0.01} value={filtro_de_pesquisa.preco} onChange={e => set_filtro_de_pesquisa({...filtro_de_pesquisa, preco: e.target.value})}/>

                <div className="container_exibir_preco_filtro_de_pesquisa">

                    <p>R$ 0,00</p>
                    <p>{preco_exibido}</p>

                </div>

            </div>

            }

            </div>

            <div className="container_tamanho_titulo_filtro_de_pesquisa">

                <h1>Tamanho</h1>
                <button onClick={() => girar_botao_titulo_tamanho()}><img src="./img/icons/seta_do_filtro_de_pesquisa_titulo.svg" alt="" style={{transform: botao_titulo_tamanho_deg}}/></button>

            </div>

            <div className="container_tamanho_filtro_de_pesquisa">

                { exibir_filtro_do_tamanho && 
                
                    <div className="container_selecionar_tamanho_filtro_de_pesquisa">

                        {array_de_tamanhos_de_roupa.map((tamanho, i) => (

                            <div key={i} className='container_selecionar_tamanho_do_botao'>

                                <button onClick={() => selecionar_tamanho(tamanho)} style={{backgroundColor: tamanhos_selecionados.includes(tamanho) ? `#466330` : `#FCF7E9`, color: tamanhos_selecionados.includes(tamanho) ? `#FCF7E9` : `#3E2A21`}}>{tamanho}</button>

                            </div>
                        ))}

                    </div>
                }

            </div>

            <div className="container_titulo_estilos">

                <h1>Estilos</h1>
           
            </div>
            
            <div className="container_pesquisa_por_estilos">

                <div className="container_pesquisa_por_estilo_um">

                    <p style={{color: exibir_estilo_um ? `#3E2A21` : `#3e2a219e`}}>{categorias_principais(`casual`)}</p>
                    <button onClick={() => exibir_sub_categorias(`estilo_um`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{transform: botao_estilo_um_deg}}/></button>
                
                </div>

                { exibir_estilo_um && 
                
                <div className="container_resultado_pesquisa_estilo_um">

                {sub_categorias_das_principais(`casual`).map((sub_categoria) => (

                    <div key={sub_categoria._id}>

                        <button onClick={() => set_filtro_de_pesquisa({...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome})} style={{color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500`}}>{sub_categoria.nome}</button>

                    </div>
                ))}

                </div>
                }

                <div className="container_pesquisa_por_estilo_dois">

                    <p style={{color: exibir_estilo_dois ? `#3E2A21` : `#3e2a219e`}}>{categorias_principais(`esporte`)}</p>
                    <button onClick={() => exibir_sub_categorias(`estilo_dois`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt=""  style={{transform: botao_estilo_dois_deg}}/></button>
                
                </div>

                { exibir_estilo_dois && 
                
                <div className="container_resultado_pesquisa_estilo_dois">

                {sub_categorias_das_principais(`esport`).map((sub_categoria) => (

                    <div key={sub_categoria._id}>

                        <button onClick={() => set_filtro_de_pesquisa({...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome})} style={{color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500`}}>{sub_categoria.nome}</button>

                    </div>
                ))}

                </div>
                }

                <div className="container_pesquisa_por_estilo_tres">

                    <p style={{color: exibir_estilo_tres ? `#3E2A21` : `#3e2a219e`}}>{categorias_principais(`jaqueta`)}</p>
                    <button onClick={() => exibir_sub_categorias(`estilo_tres`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt=""  style={{transform: botao_estilo_tres_deg}}/></button>
                
                </div>   

                { exibir_estilo_tres && 
                
                <div className="container_resultado_pesquisa_estilo_tres">

                {sub_categorias_das_principais(`jaqueta`).map((sub_categoria) => (

                    <div key={sub_categoria._id}>

                        <button onClick={() => set_filtro_de_pesquisa({...filtro_de_pesquisa, categoria_filtrada: sub_categoria.nome})} style={{color: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `#3E2A21` : `#3e2a219e`, fontWeight: filtro_de_pesquisa.categoria_filtrada == sub_categoria.nome ? `600` : `500`}}>{sub_categoria.nome}</button>

                    </div>
                ))}

                </div>
                } 
            
            </div>

            <div className="container_botao_filtro_de_pesquisa">
                
                <button className='botao_filtro_de_pesquisa_limpar' onClick={() => limpar_filtro_de_pesquisa()}>Limpar</button>
                <button className='botao_filtro_de_pesquisa_aplicar'onClick={() => set_exibir_produtos_filtrados(true)}>Aplicar Filtro</button>

            </div>

        </div>
    );
}

export default Filtro_de_pesquisa;
