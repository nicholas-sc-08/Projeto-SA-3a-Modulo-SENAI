import React, { useState, useEffect, useContext } from "react";
import "./Cadastro_Produto.css"; 
import HeaderBrecho from "../../components/HeaderBrecho"; 
import axios from "axios";
import { GlobalContext } from "../../contexts/GlobalContext";

function Cadastro_Produto() {
  // Define os estados necessários para armazenar informações do produto
  const [quantidade, setQuantidade] = useState(1); 
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(""); 
  const [imagens, setImagens] = useState([]); 
  const [imagemPrincipal, setImagemPrincipal] = useState(null); 
  const [nomeProduto, setNomeProduto] = useState("Nome do Produto"); 
  const [preco, setPreco] = useState(""); 
  const [descricao, setDescricao] = useState(""); 
  const [coresSelecionadas, setCoresSelecionadas] = useState([]); 
  const [editandoNome, setEditandoNome] = useState(false); 
  const [editandoPreco, setEditandoPreco] = useState(false); 
  const [nomeEditado, setNomeEditado] = useState(false); 
  const { array_produtos, set_array_produtos } = useContext(GlobalContext);
  const [array_cadastro_produto, setArray_cadastro_produto] = useState({
    nome: '', 
    descricao: '', 
    preco: '', 
    codigo: '', 
    condicao: '', 
    cor: [], 
    imagem: '', 
    marca: '', 
    categoria:'', 
    composicao: '' 
  });

  useEffect(() => {
    buscar_produtos();
  }, []);

  useEffect(() => {
    console.log(array_cadastro_produto);
  }, [array_cadastro_produto]);

  const [categorias, setCategorias] = useState([]); // Estado para armazenar categorias

  // Função para aumentar a quantidade do produto
  const aumentarQuantidade = () => setQuantidade(quantidade + 1);

  // Função para diminuir a quantidade do produto, mas não permite que vá abaixo de 1
  const diminuirQuantidade = () => quantidade > 1 && setQuantidade(quantidade - 1);

  // Função para alterar o tamanho do produto selecionado
  const selecionarTamanho = (tamanho) => setArray_cadastro_produto({...array_cadastro_produto, tamanho: tamanho});

  // Função para adicionar uma imagem ao produto
  const adicionarImagem = (event) => {
    const file = event.target.files[0]; // Pega o primeiro arquivo da entrada
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Cria um link temporário para o arquivo da imagem
      setImagens([...imagens, imageUrl]); // Adiciona a nova imagem na lista de imagens
      if (!imagemPrincipal) setImagemPrincipal(imageUrl); // Se não tiver imagem principal, define a nova imagem como principal
    }
  };

  // Função para definir a imagem principal do produto
  const selecionarImagemPrincipal = (imagem) => setImagemPrincipal(imagem);

  // Função para selecionar uma cor usando o EyeDropper (API para selecionar cores)
  const selecionarCorEyeDropper = async () => {
    if (window.EyeDropper) { 
      try {
        const eyeDropper = new window.EyeDropper(); 
        const result = await eyeDropper.open(); 
        if (coresSelecionadas.length < 3) {

          setCoresSelecionadas([...coresSelecionadas, result.sRGBHex]); 
          setArray_cadastro_produto({...array_cadastro_produto, cor: coresSelecionadas});
        
        } else {
          alert("Você já selecionou o número máximo de cores (3)."); 
        }
      } catch (error) {
        console.error("Erro ao selecionar cor", error); 
      }
    } else {
      alert("Seu navegador não suporta a EyeDropper API"); 
    }
  };

  const substituirCor = async (index) => {
    const corSelecionada = await selecionarCorEyeDropper(); 
    if (corSelecionada) {
      const newCores = [...coresSelecionadas]; 

      newCores[index] = corSelecionada;
      setCoresSelecionadas(newCores); 
    }
  };

  // Função que permite editar o nome do produto ao clicar nele
  const handleNomeProdutoClick = () => {
    setEditandoNome(true);
  };

  // Função para salvar o nome editado ao perder o foco
  const handleBlurNomeProduto = () => {
    setEditandoNome(false);
  };

  // Função para ativar a edição do preço
  const handlePrecoClick = () => {
    setEditandoPreco(true);
  };

  // Exibir o nome salvo no estado correto
  const nomeExibido = array_cadastro_produto.nome?.trim() || "Nome do Produto";

  async function buscar_produtos(){
    try {
      const produtos = await axios.get(`http://localhost:3000/Produto`);
      set_array_produtos(produtos.data);
    } catch (erro) {
      console.error(erro);
    };
  };

  // Postar produto no banco de dados
  async function cadastrar_produto() {
    const produtoComCores = { ...array_cadastro_produto, cor: coresSelecionadas };
    try {
      await axios.post("http://localhost:3000/Produto", produtoComCores);
    } catch (error) {
      console.error(error);
    }
  }

  // Buscar categorias já cadastradas
  useEffect(() => {
    async function buscarCategorias() {
      try {
        const resposta = await axios.get("http://localhost:3000/categorias");
        setCategorias(resposta.data); // Supondo que a resposta seja um array de categorias
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      }
    }
    buscarCategorias();
  }, []);

  

  return (
    <div>
      <HeaderBrecho /> {/* Exibe o cabeçalho */}
      <h2 className="titulo">Cadastro Produto</h2> {/* Título da página */}
      <div className="container-cadastro-produto"> {/* Container principal do formulário */}
        
        {/* Galeria de imagens */}
        <div className="galeria">
          {imagens.map((imagem, index) => (
            <div key={index} className="miniatura" onClick={() => selecionarImagemPrincipal(imagem)}>
              <img src={imagem} alt={`Imagem ${index}`} />
            </div>
          ))}
          {/* Se houver espaço para mais imagens, exibe o botão de adicionar imagem */}
          {imagens.length < 3 && (
            <label className="miniatura">
              <input type="file" onChange={adicionarImagem} hidden />
              <img className="AddImage" src="./img/ImagemAdd.svg" alt="Adicionar" />
            </label>
          )}
        </div>

        {/* Imagem principal */}
        <div className={`imagem-principal ${imagemPrincipal ? "has-image" : ""}`}>
          {imagemPrincipal ? (
            <img src={imagemPrincipal} alt="Imagem Principal" />
          ) : (
            <label className="botao-adicionar-imagem">
              <input type="file" onChange={adicionarImagem} hidden />
              <img src="./img/ImagemAdd.svg" alt="Adicionar Imagem" className="AddImage" />
            </label>
          )}
        </div>

        <div className="detalhes-produto">
          {/* Exibe o nome do produto */}
          {editandoNome ? (
            <input
              type="text"
              value={array_cadastro_produto.nome}
              onChange={(e) => setArray_cadastro_produto({...array_cadastro_produto, nome: e.target.value})}
              onBlur={() => setEditandoNome(false)}
              autoFocus
              className="inpt-edit"
            />
          ) : (
            <span className="nome-produto" onClick={handleNomeProdutoClick}>{nomeExibido}</span>
          )}

          {/* Exibe o preço do produto */}
          {editandoPreco ? (
            <input
              type="number"
              value={array_cadastro_produto.preco}
              onChange={(e) => setArray_cadastro_produto({...array_cadastro_produto, preco: e.target.value})}
              onBlur={() => setEditandoPreco(false)}
              autoFocus
              className="inpt-edit-preco"
            />
          ) : (
            <span className="preco-produto" onClick={handlePrecoClick}>R$ {array_cadastro_produto.preco || "Preço"}</span>
          )}

          {/* Campo de descrição */}
          <div className="input-group-descricao">
            <label>Descrição</label>
            <textarea 
              placeholder="Descrição do produto"
              value={array_cadastro_produto.descricao}
              onChange={(e) => setArray_cadastro_produto({...array_cadastro_produto, descricao: e.target.value})}
            ></textarea>
            <hr />
          </div>

          {/* Seleção de cores */}
          <div className="input-group-descricao">
            <label>Seleção de Cores</label>
            <div className="cores">
              <button className="cor-seletor" onClick={selecionarCorEyeDropper}>
                <img className="rodaDeCores" src="./img/roda-de-cores.svg" alt="Selecionar Cor" />
              </button>
              <div className="cores-selecionadas">
                {coresSelecionadas.map((cor, index) => (
                  <div
                    key={index}
                    className="cor-selecionada"
                    style={{ backgroundColor: cor }}
                    onClick={() => substituirCor(index)} // Permite clicar para trocar a cor
                  ></div>
                ))}
              </div>
            </div>
            <hr />
          </div>

          {/* Escolha do tamanho */}
          <p>Escolha o Tamanho</p>
          <div className="tamanhos">
            {["PP", "P", "M", "G", "GG"].map((tamanho) => (
              <button
                key={tamanho}
                className={`tamanho ${tamanhoSelecionado === tamanho ? "selecionado" : ""}`}
                onClick={() => selecionarTamanho(tamanho)}
              >
                {tamanho}
              </button>
            ))}
          </div>
          <hr />

          {/* Controle de quantidade */}
          <div className="quantidade">
            <button className="botao-quantidade" onClick={diminuirQuantidade}><img src="./img/menos.svg" alt="" /></button>
            <span className="quantidade-numero">{quantidade}</span>
            <button className="botao-quantidade" onClick={aumentarQuantidade}><img src="./img/mais.svg" alt="" /></button>
          </div>
        </div>
      </div>

      <h2 className="titulo2">Detalhes do Produto</h2> {/* Título da página */}
      <hr className="linha-titulo-2" />

      <div className="container-detalhes-produtos">   
        {/* Formulário de informações adicionais */}
        <div className="formulario">
          <div className="input-group">
            <label>Marca do produto</label>
            <input 
              type="text" 
              placeholder="Buscar marcas" 
              onChange={(e) => setArray_cadastro_produto({...array_cadastro_produto, marca: e.target.value})}
              value={array_cadastro_produto.marca}
            />
          </div>

          <div className="input-group">
            <label>Estado do produto</label>
            <input
              type="text"
              placeholder="Ex: Manchas, Tecido velho, etc"
              onChange={(e) => setArray_cadastro_produto({...array_cadastro_produto, condicao: e.target.value})}
              value={array_cadastro_produto.condicao}
            />
          </div>

          <div className="input-group">
            <label>Materiais e composição</label>
            <input 
              type="text" 
              placeholder=""
              onChange={(e) => setArray_cadastro_produto({...array_cadastro_produto, composicao: e.target.value})}
              value={array_cadastro_produto.composicao}
            />
          </div>
        </div>

        <div className="formulario-direito">
          <div className="input-group-direita">
            <label>Categoria</label>
            <select 
              value={array_cadastro_produto.categoria[0] || ""} 
              onChange={(e) => setArray_cadastro_produto({...array_cadastro_produto, categoria: [e.target.value]})}
              className="categoria-select"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nome}>
                  {categoria.nome}
                </option>
              ))}
            </select>
            <button onClick={cadastrar_produto} className="botao-cadastrar">Cadastrar Produto</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro_Produto;
