import { useContext, useEffect } from 'react';
import './Produto.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';

function Produto() {

    const { array_produtos, set_array_produtos } = useContext(GlobalContext);
    const { produto, set_produto } = useContext(GlobalContext);

    useEffect(() => {

        buscar_produtos();

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
    <div className='container_produto'>
      
        <div className="container_info_do_produto">

            <div className="container_info_do_produto_imagens">

                <div className="container_imagens_do_produto">

                    {produto.imagem.map((imagem, i) => (

                        <div key={i}>

                            <img src={imagem} alt="" />

                        </div>
                    ))}

                </div>

                <div className="container_imagem_principal_produto">

                    <img src={produto.imagem[0]} alt="" />

                </div>

            </div>

            <div className="containerinfo_do_produto_conteudo">



            </div>

        </div>

    </div>
  )
}

export default Produto
