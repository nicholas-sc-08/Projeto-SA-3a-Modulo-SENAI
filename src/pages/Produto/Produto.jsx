import { useContext, useRef } from 'react';
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
import Pop_up_conversa_adicionada from '../../components/Pop_up_conversa_adicionada';
import Pop_up_usuario_nao_logado from '../../components/Pop_up_usuario_nao_logado';

function Produto() {

    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { produto, set_produto } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { nome_do_brecho, set_nome_do_brecho } = useContext(GlobalContext);
    const { exibir_nome_brecho, set_exibir_nome_brecho } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { array_de_produtos_aleatorios, set_array_de_produtos_aleatorios } = useContext(GlobalContext);
    const [ imagem_selecionada, set_imagem_selecionada ] = useState(0);
    const [ produto_visualiazado, set_produto_visualizado ] = useState(`0.1vw solid var(--cor_um)`);
    const [ pop_de_chat_ja_adicionado, set_pop_de_chat_ja_adicionado ] = useState(false);
    const [ pop_up_de_usuario_nao_logado, set_pop_up_de_usuario_nao_logado ] = useState(false);
    const refencia_do_produto = useRef(null);
    const cores_simplificadas = [
        { nome: "Preto", hex: "#000000" },
        { nome: "Branco", hex: "#FFFFFF" },
        { nome: "Vermelho", hex: "#FF0000" },
        { nome: "Verde", hex: "#008000" },
        { nome: "Azul", hex: "#0000FF" },
        { nome: "Amarelo", hex: "#FFFF00" },
        { nome: "Laranja", hex: "#FFA500" },
        { nome: "Roxo", hex: "#800080" },
        { nome: "Marrom", hex: "#8B4513" },
        { nome: "Cinza", hex: "#808080" },
        { nome: "Rosa", hex: "#FFC0CB" },
        { nome: "Ciano", hex: "#00FFFF" },
        { nome: "Magenta", hex: "#FF00FF" },
        { nome: "Vinho", hex: "#800000" },
        { nome: "Dourado", hex: "#FFD700" },
        { nome: "Prateado", hex: "#C0C0C0" },
        { nome: "Bege", hex: "#F5F5DC" },
        { nome: "Turquesa", hex: "#40E0D0" },
        { nome: "Lima", hex: "#00FF00" },
        { nome: "Lavanda", hex: "#E6E6FA" },
      ];

    useEffect(() => {

        console.log(usuario_logado);
    }, []);

    useEffect(() => {

        buscar_produtos();
        buscar_brechos();   
        buscar_clientes();     
        sortear_produtos();   
        
    }, []);

    useEffect(() => {

        if(pop_de_chat_ja_adicionado){

            setTimeout(() => {

                set_pop_de_chat_ja_adicionado(false);

            }, 2000);
        };

        if(pop_up_de_usuario_nao_logado){

            setTimeout(() => {

                set_pop_up_de_usuario_nao_logado(true);

            }, 2000);
        };

    }, [pop_de_chat_ja_adicionado, pop_up_de_usuario_nao_logado]);

    async function atualizar_cliente(){

        try {

           const usuario_atualiado = await api.put(`/clientes/${usuario_logado._id}`, usuario_logado);
            console.log(usuario_atualiado.data);
            
        } catch (erro) {
          
            console.error(erro);
        };
    };

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

    async function buscar_clientes(){

        try {

            const clientes = await api.get(`/clientes`);
            set_array_clientes(clientes.data);
            
        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function adicionar_conversa_ao_chat(){
        
        try {            

            if(usuario_logado){
                
                const conversa_com_usuario = array_brechos.find(brecho => brecho._id == produto.fk_id_brecho);

                if(usuario_logado._id != produto.fk_id_brecho){
    
                    const conversa_ja_existente = usuario_logado.conversas.find(conversa => conversa._id == produto.fk_id_brecho);

                    if(conversa_ja_existente){

                        set_pop_de_chat_ja_adicionado(true);

                    } else {

                        let info_do_brecho = {_id: conversa_com_usuario._id, nome_brecho: conversa_com_usuario.nome_brecho, logo: conversa_com_usuario.logo}
                        set_usuario_logado({...usuario_logado, conversas: [...usuario_logado.conversas, info_do_brecho]});
                        atualizar_cliente();
                    };
                };

            };

        } catch (erro) {
          
            console.error(erro);
        };
    };

    function ir_para_produto_selecionado(produto_selecionado){

        refencia_do_produto.current.scrollIntoView({behavior: `smooth`});
        set_produto(produto_selecionado);
    };

    function sortear_produtos(){

        for(let i = 0; i < 2; i++){

            const numero_sorteado = Math.floor(Math.random() * 2);
            set_array_de_produtos_aleatorios([...array_de_produtos_aleatorios, array_produtos[numero_sorteado]]);
        };        
    };

    function imagem_do_brecho(_id){

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);

        if(encontrar_brecho){

            return encontrar_brecho.logo;
        };
    };

    function exibir_preco(preco){

        const preco_convertido = String(preco).split(`.`);
        const decimal = preco_convertido[preco_convertido.length - 1];

        return decimal < 10 ? `${preco_convertido[0]},${decimal}0` : `${preco_convertido[0]},${decimal}`;
    };

    function exibir_nome_do_brecho(_id){

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);

        if(exibir_nome_brecho == false){

            set_exibir_nome_brecho(true);
            set_nome_do_brecho(encontrar_brecho.nome_brecho);
        };
    };

    function imagem_de_perfil_brecho(_id){

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);

        return encontrar_brecho.logo;
    };

    function preco_do_produto_vitrine(preco){

        const separar_preco = String(preco).split(`.`);
        const decimal = separar_preco[separar_preco.length - 1];

        return decimal < 10 ? `R$${separar_preco[0]},${decimal}0` : `R$${separar_preco[0]},${decimal}`;
    };
    
      function hexParaRGB(hex) {
        if (typeof hex !== "string") return null;
        if (!hex.startsWith("#")) hex = "#" + hex;
    
        const match = hex.match(/^#([0-9a-fA-F]{6})$/);
        if (!match) return null;
    
        const bigint = parseInt(match[1], 16);
        return {
          r: (bigint >> 16) & 255,
          g: (bigint >> 8) & 255,
          b: bigint & 255,
        };
      };

    function cor_mais_proxima(hex) {
        const rgb = hexParaRGB(hex);
        if (!rgb) return "Cor desconhecida";
    
        let corMaisPerto = null;
        let menorDiferenca = Infinity;
    
        cores_simplificadas.forEach((cor) => {
          const corRGB = hexParaRGB(cor.hex);
          const diferenca =
            Math.abs(rgb.r - corRGB.r) +
            Math.abs(rgb.g - corRGB.g) +
            Math.abs(rgb.b - corRGB.b);
    
          if (diferenca < menorDiferenca) {
            menorDiferenca = diferenca;
            corMaisPerto = cor.nome;
          }
        });
    
        return corMaisPerto || "Cor desconhecida";
      }

  return (
    <div className='container_visualizar_produto' ref={refencia_do_produto}>

        {pop_de_chat_ja_adicionado && <Pop_up_conversa_adicionada/>}
        {pop_de_chat_ja_adicionado && <div className='fundo_do_pop_up_conversa_adicionada'></div>}
        {pop_up_de_usuario_nao_logado && <Pop_up_usuario_nao_logado/>}
        {pop_up_de_usuario_nao_logado && <div className='fundo_do_pop_up_conversa_adicionada'></div>}

        <Header tipo = "usuario"/>

        <div className="container_info_do_produto">

            <div className="container_info_do_produto_imagens">

                <div className="container_imagens_do_produto">

                    {produto.imagem.map((url, i) => (

                        <div key={i} className='container_outras_opcoes_de_imagens' style={{border: imagem_selecionada == i ? produto_visualiazado : ``}}>

                            <img src={url} alt="" onClick={() => set_imagem_selecionada(i)}/>

                        </div>
                    ))}

                </div>

                <div className="container_imagem_principal_produto">

                    <img src={produto.imagem[imagem_selecionada]} alt=""/>

                </div>

            </div>

            <div className="container_info_do_produto_conteudo">

                <div className="container_info_do_produto_titulo">

                    <h1>{produto.nome}</h1>
                    
                    <div className='container_info_brecho_do_produto'>
                    
                    <div className='container_info_brecho_logo'>

                        <img src={imagem_do_brecho(produto.fk_id_brecho)} alt="" onMouseEnter={() => exibir_nome_do_brecho(produto.fk_id_brecho)} onMouseLeave={() => setTimeout(() => {set_exibir_nome_brecho(false)}, 1000)}/>
                    
                    </div>
                    {exibir_nome_brecho && <Pop_up_nome_brecho/>}
                    </div>

                </div>

                <div className="container_info_do_produto_preco">

                    <h2>R${exibir_preco(produto.preco)}</h2>

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
                    
                    <div className="container_info_do_produto_composto">

                        <h3>Tipo do tecido</h3>
                        
                        <div className='container_fundo_info_do_produto_composto'>

                            <span>{produto.composicao}</span>

                        </div>

                    </div>

                    <div className="container_info_do_produto_cor">

                        <h3>Cor do Tecido</h3>
                        
                        <div className='container_fundo_info_do_produto_cor'>

                            <div className='cor_do_produto' style={{backgroundColor: produto.cor}}></div>
                            <span>{cor_mais_proxima(produto.cor[0])}</span>

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
        
        <div className="container_roupas_que_usuario_possa_gostar">

            <div className='container_roupas_titulo'>

                <h1>Você também pode gostar</h1>
            
            </div>

            <div className="container_roupas_vitrine">
                
                 {array_de_produtos_aleatorios.map((produto, i) => (

                    <div key={i} className='container_produto_vitrine' onClick={() => ir_para_produto_selecionado(produto)}>
                    
                        <div className="container_imagem_do_produto_vitrine">

                            <img src={produto.imagem[0]} alt="" />

                        </div>

                        <div className="container_titulo_produto_vitrine">

                            <h4>{produto.nome}</h4>
                            <img src={imagem_de_perfil_brecho(produto.fk_id_brecho)} alt="" />
                        
                        </div>
                    
                        <div className="container_preco_produto_vitrine">

                            <span>{preco_do_produto_vitrine(produto.preco)}</span>

                        </div>
                    </div>
                ))}

            </div>
            
        </div>

        {usuario_logado != `` && !conversa_aberta && <Chat />}
        {conversa_aberta && <Chat_conversa />}

        <Footer/>

    </div>
  )
}

export default Produto
