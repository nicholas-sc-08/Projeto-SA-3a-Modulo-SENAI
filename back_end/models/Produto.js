const mongoose = require(`mongoose`);

const produto_schema = new mongoose.Schema({

    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    condicao: { type: String, required: true },
    imagem: { type: Array, required: true},
    cor: { type: Array, required: true },
    marca: { type: String, required: true },
    fk_id_categoria: { type: String, required: true}
});

const novo_produto = mongoose.model(`Produto`, produto_schema);
module.exports = novo_produto;