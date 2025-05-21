import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Produto.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';
import Header from '../../components/Header';
import Chat_conversa from '../../components/chat/Chat_conversa';
import Chat from '../../components/chat/Chat';
import Pop_up_nome_brecho from '../../components/Pop_up_nome_brecho';
import Footer from '../../components/Footer';

function Produto() {

    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { produto, set_produto } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { nome_do_brecho, set_nome_do_brecho } = useContext(GlobalContext);
    const { exibir_nome_brecho, set_exibir_nome_brecho } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const [ imagem_selecionada, set_imagem_selecionada ] = useState(0);
    const [ produto_visualiazado, set_produto_visualizado ] = useState(`0.1vw solid var(--cor_um)`);

    useEffect(() => {

        buscar_produtos();
        buscar_brechos();
        
    }, []);

    async function buscar_brechos(){

        try {

            const brechos = await api.get(`/brechos`);
            set_array_brechos(brechos.data);
            
        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function buscar_produtos() {
        
        try {

            const produtos = await api.get(`/produtos`);
            set_array_produtos(produtos.data);
            
        } catch (erro) {
          
            console.error(erro);
        };
    };

    function adicionar_conversa_ao_chat(){

        if(usuario_logado != null){

            console.log(produto.fk_id_brecho);
            if(usuario_logado._id != produto.fk_id_brecho){

                
            };            
        };
    };

    function imagem_do_brecho(_id){

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);

        if(encontrar_brecho){

            return encontrar_brecho.logo;
        };
    };

    function exibir_nome_do_brecho(_id){

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);

        if(exibir_nome_brecho == false){

            set_exibir_nome_brecho(true);
            set_nome_do_brecho(encontrar_brecho.nome_brecho);
        };
    };

  return (
    <div className='container_visualizar_produto'>

        <Header/>

        <div className="container_info_do_produto">

            <div className="container_info_do_produto_imagens">

                <div className="container_imagens_do_produto">

                    {produto.imagem.map((url, i) => (

                        <div key={i} className='container_outras_opcoes_de_imagens'>

                            <img src={url} alt="" onClick={() => set_imagem_selecionada(i)} style={{border: imagem_selecionada == i ? produto_visualiazado : ``}}/>

                        </div>
                    ))}

                </div>

                <div className="container_imagem_principal_produto">

                    <img src={produto.imagem[imagem_selecionada]} alt="" />

                </div>

            </div>

            <div className="container_info_do_produto_conteudo">

                <div className="container_info_do_produto_titulo">

                    <h1>{produto.nome}</h1>
                    
                    <div className='container_info_brecho_do_produto'>

                    <img src={imagem_do_brecho(produto.fk_id_brecho)} alt="" onMouseEnter={() => exibir_nome_do_brecho(produto.fk_id_brecho)} onMouseLeave={() => setTimeout(() => {set_exibir_nome_brecho(false)}, 1000)}/>
                    {exibir_nome_brecho && <Pop_up_nome_brecho/>}
                    </div>

                </div>

                <div className="container_info_do_produto_preco">

                    <h2>R${produto.preco}</h2>

                </div>

                <div className="container_info_do_produto_descricao">

                    <p>{produto.descricao}</p>

                </div>

                <div className="container_info_do_produto_tamanho_e_cor">

                    <div className="container_info_do_produto_tamanho">

                        <h3>Tamanho</h3>
                        
                        <div className="container_fundo_info_do_produto_tamanho">

                            <span>{produto.tamanho}</span>
                        
                        </div>

                    </div>

                    <div className="container_info_do_produto_quantidade">

                        <h3>Quantidade</h3>

                        <div className="container_fundo_info_do_produto_quantidade">

                            <span>{produto.quantidade}</span>

                        </div>
                        
                    </div>
                    
                    <div className="container_info_do_produto_cor">

                        <h3>Cor do tecido</h3>
                        
                        <div className='container_fundo_info_do_produto_cor'>

                            <div className='cor_do_produto' style={{backgroundColor: produto.cor}}></div>
                            <span>Verde musgo</span>

                        </div>

                    </div>

                </div>

                <div className="container_info_do_produto_botoes">
                    
                    <div className='container_botoes_do_produto'>

                        <button className='botao_comprar_produto'>Adicionar a Sacola</button>
                        <button className='botao_conversar_com_brecho' onClick={() => adicionar_conversa_ao_chat()}><img src="./img/icons/icone_chat.png" alt=""/>Chat</button>
                    
                    </div>

                </div>

            </div>

        </div>

        {usuario_logado != `` && !conversa_aberta && <Chat />}
        {conversa_aberta && <Chat_conversa />}

        <Footer/>

    </div>
  )
}

export default Produto
