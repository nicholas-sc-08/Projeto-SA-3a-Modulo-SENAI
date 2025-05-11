import { useEffect, useState } from 'react';
import './Filtro_de_pesquisa.css';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import api from '../services/api';

function Filtro_de_pesquisa() {

    const { array_categorias, set_array_categorias } = useContext(GlobalContext);
    const [ botao_titulo_precos_deg, set_botao_titulo_precos_deg ] = useState(`rotate(0deg)`);
    const [ botao_filtro_um_deg, set_botao_filtro_um_deg ] = useState(`rotate(0deg)`);
    const [ botao_filtro_dois_deg, set_botao_filtro_dois_deg ] = useState(`rotate(0deg)`);
    const [ botao_filtro_tres_deg, set_botao_filtro_tres_deg ] = useState(`rotate(0deg)`);
    const [ botao_titulo_tamanho_deg, set_botao_titulo_tamanho_deg ] = useState(`rotate(0deg)`);
    const [ preco_filtro_de_pesquisa, set_preco_filtro_de_pesquisa ] = useState(`25`);
    const [ exibir_filtro_do_preco, set_exibir_filtro_do_preco ] = useState(true);
    const [ exibir_filtro_do_tamanho, set_exibir_filtro_do_tamanho ] = useState(true);
    const [ exibir_filtro_um, set_exibir_filtro_um ] = useState(false);
    const [ exibir_filtro_dois, set_exibir_filtro_dois ] = useState(false);
    const [ exibir_filtro_tres, set_exibir_filtro_tres ] = useState(false);
    const [ array_de_tamanhos_de_roupa, set_array_de_tamanhos_de_roupa ] = useState([`PP`, `P`, `M`, `G`]);
    const [ tamanhos_selecionados, set_tamanhos_selecionados ] = useState([]);

    useEffect(() => {

        buscar_categorias();

    }, []);

    async function buscar_categorias(){

        try {

            const categorias = await api.get(`/categorias`);
            set_array_categorias(categorias.data);

        } catch (erro) {
          
            console.error(erro);
        };
    };

    function girar_botao_categorias_principais(categoria_principal){

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

        } else {

            set_tamanhos_selecionados(tamanhos_selecionados.splice(index_tamanho, 1));
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

                    <p>{categorias_principais(`camiseta`)}</p>
                    <button onClick={() => girar_botao_categorias_principais(`filtro_um`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{transform: botao_filtro_um_deg}}/></button>
                
                </div>

                <div className="container_pesquisa_filtro_dois">

                    <p>{categorias_principais(`shorts`)}</p>
                    <button onClick={() => girar_botao_categorias_principais(`filtro_dois`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{transform: botao_filtro_dois_deg}}/></button>
                
                </div>

                <div className="container_pesquisa_filtro_tres">

                    <p>{categorias_principais(`jeans`)}</p>
                    <button onClick={() => girar_botao_categorias_principais(`filtro_tres`)}><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" style={{transform: botao_filtro_tres_deg}}/></button>
                
                </div>    
            
            </div>


            <div className="container_preco_titulo_filtro_de_pesquisa">

                <h1>Preços</h1>
                <button onClick={() => girar_botao_titulo_preco()}><img src="./img/icons/seta_do_filtro_de_pesquisa_titulo.svg" alt="" style={{transform: botao_titulo_precos_deg}}/></button>
           
            </div>

            <div className="container_preco_filtro_de_pesquisa">

            { exibir_filtro_do_preco &&

            <div className="container_selecionar_preco_filtro_de_pesquisa">

                <input type="range" min={0} max={200} step={1} value={preco_filtro_de_pesquisa} onChange={e => set_preco_filtro_de_pesquisa(e.target.value)}/>
                
                <div className="container_exibir_preco_filtro_de_pesquisa">

                    <p>R$ 0,00</p>
                    <p>R$ {preco_filtro_de_pesquisa},00</p>

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

                    <p>{categorias_principais(`camiseta`)}</p>
                    <button><img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt=""/></button>
                
                </div>

                <div className="container_pesquisa_por_estilo_dois">

                    <p>{categorias_principais(`shorts`)}</p>
                    <img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" />
                
                </div>

                <div className="container_pesquisa_por_estilo_tres">

                    <p>{categorias_principais(`jeans`)}</p>
                    <img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" />
                
                </div>    
            
            </div>

        </div>
    );
}

export default Filtro_de_pesquisa;
