import "./Detalhe_Pagamento_etapa_tres.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Detalhe_Pagamento_etapa_tres() {
  return (
    <div className="container-tela">
      <Header tipo="usuario" />
      <h2 className="titulo">Detalhes do Pagamento</h2>
      <div className="container-principal">
        <div className="pagamento-conteudo">
          <div className="formulario-entrega">
            <p className="descricao-formulario">
              Você está prestes a finalizar sua compra! Por favor, preencha suas informações de entrega para que possamos garantir que seus produtos cheguem até você de forma rápida e segura.
            </p>

            <div className="indicador-etapas">
              <span className="etapa ativa"></span>
              <span className="etapa ativa"></span>
              <span className="etapa ativa"></span>
            </div>

            <form className="formulario">
              <label>Nome do Titular<strong>*</strong></label>
              <input type="text" placeholder="Digite o nome completo do titular" required />

              <label>Número do Cartão<strong>*</strong></label>
              <input type="text" placeholder="Digite o número do cartão" required />

              <div className="formulario-baixo">
                <div className="campo">
                  <label>Validade<strong>*</strong></label>
                  <input type="text" placeholder="MM/AA" required />
                </div>

                <div className="campo">
                  <label>CVV</label>
                  <input type="text" placeholder="Digite o código CVV" />
                </div>
              </div>

              <button type="submit" className="botao-seguinte">Comprar</button>
            </form>
          </div>

          <div className="resumo-produtos">
            <h3>Produtos</h3>

            <div className="produto">
              <img src="link-da-imagem" alt="Gradient Graphic T-shirt" />
              <div className="info">
                <p>Gradient Graphic T-shirt</p>
                <small>Tamanho: G</small><br />
                <small>Cor: Branco</small>
                <p className="preco">R$30,00</p>
              </div>
            </div>

            <div className="produto">
              <img src="link-da-imagem" alt="Checkered Shirt" />
              <div className="info">
                <p>Checkered Shirt</p>
                <small>Tamanho: M</small><br />
                <small>Cor: Vermelho</small>
                <p className="preco">R$52,99</p>
              </div>
            </div>

            <div className="produto">
              <img src="link-da-imagem" alt="Checkered Shirt" />
              <div className="info">
                <p>Checkered Shirt</p>
                <small>Tamanho: M</small><br />
                <small>Cor: Vermelho</small>
                <p className="preco">R$52,99</p>
              </div>
            </div>

            <div className="resumo-valores">
              <p>Subtotal: <span>R$82,99</span></p>
              <hr />
              <p>Frete: <span>Grátis</span></p>
              <hr />
              <p className="total">Total: <span>R$82,99</span></p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Detalhe_Pagamento_etapa_tres;
