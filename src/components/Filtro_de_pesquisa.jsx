import { useEffect, useState } from 'react';
import './Filtro_de_pesquisa.css';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import api from '../services/api';

function Filtro_de_pesquisa() {

    const { array_categorias, set_array_categorias } = useContext(GlobalContext);
    const [ botao_titulo_precos_deg, set_botao_titulo_precos_deg ] = useState(`rotate(0deg)`);
    const [ preco_filtro_de_pesquisa, set_preco_filtro_de_pesquisa ] = useState(`25`);
    const [ exibir_filtro_do_preco, set_exibir_filtro_do_preco ] = useState(false);
    const [ altura_preco_filtro_de_pesquisa, set_altura_preco_filtro_de_pesquisa ] = useState(`0%`);

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

    function girar_botao_titulo_preco(){

        botao_titulo_precos_deg == `rotate(0deg)` ? set_botao_titulo_precos_deg(`rotate(180deg)`) : set_botao_titulo_precos_deg(`rotate(0deg)`);
        set_exibir_filtro_do_preco(!exibir_filtro_do_preco); 
        
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
                    <img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" />
                
                </div>

                <div className="container_pesquisa_filtro_dois">

                    <p>{categorias_principais(`shorts`)}</p>
                    <img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" />
                
                </div>

                <div className="container_pesquisa_filtro_tres">

                    <p>{categorias_principais(`jeans`)}</p>
                    <img src="./img/icons/seta_do_filtro_de_pesquisa.svg" alt="" />
                
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


        </div>
    );
}

export default Filtro_de_pesquisa;
