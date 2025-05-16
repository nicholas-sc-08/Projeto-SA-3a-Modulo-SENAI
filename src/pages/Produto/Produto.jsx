import { useContext, useEffect } from 'react';
import './Produto.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';
import Header from '../../components/Header';

function Produto() {

    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { produto, set_produto } = useContext(GlobalContext);

    useEffect(() => {

        buscar_produtos();
        console.log(produto);
        
    }, []);

    async function buscar_produtos() {
        
        try {

            const produtos = await api.get(`/produtos`);
            set_array_produtos(produtos.data);
            
        } catch (erro) {
          
            console.error(erro);
        };
    };

  return (
    <div className='container_visualizar_produto'>

        <Header/>

        <div className="container_info_do_produto">

            <div className="container_info_do_produto_imagens">

                <div className="container_imagens_do_produto">

                    {/* {produto.imagem.map((url_imagem, i) => (

                        <div key={i}>

                            <img src={url_imagem} alt="" />

                        </div>
                    ))}  */}

                    <div className='container_outras_opcoes_de_imagens'>

                        <img src="./img/Frame 75.svg" alt="" />

                    </div>

                    <div className='container_outras_opcoes_de_imagens'>

                        <img src="./img/Frame 75.svg" alt="" />

                    </div>

                    <div className='container_outras_opcoes_de_imagens'>

                        <img src="./img/Frame 75.svg" alt="" />

                    </div>

                </div>

                <div className="container_imagem_principal_produto">

                    <img src="./img/Frame 75.svg" alt="" />

                </div>

            </div>

            <div className="container_info_do_produto_conteudo">

                <div className="container_info_do_produto_titulo">

                    <h1>Camiseta OneLife</h1>
                    <img src="./img/image 53.svg" alt="" />

                </div>

                <div className="container_info_do_produto_preco">

                    <h2>R$39,90</h2>

                </div>

                <div className="container_info_do_produto_descricao">

                    <p>This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</p>

                </div>

                <div className="container_info_do_produto_tamanho_e_cor">

                    <div className="container_info_do_produto_tamanho">

                        <h3>Tamanho</h3>
                        
                        <div className="container_fundo_info_do_produto_tamanho">

                            <span>PP</span>
                        
                        </div>

                    </div>
                    
                    <div className="container_info_do_produto_cor">

                        <h3>Cor do tecido</h3>
                        
                        <div className='container_fundo_info_do_produto_cor'>

                            <div></div>
                            <span>Verde musgo</span>

                        </div>

                    </div>

                </div>

                <div className="container_info_do_produto_botoes">

                    <button>Comprar</button>
                    <button><img src="./img/icons/icone_chat.svg" alt="" />Chat</button>

                </div>

            </div>

        </div>

    </div>
  )
}

export default Produto
