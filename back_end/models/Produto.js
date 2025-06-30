const mongoose = require(`mongoose`);

const produto_schema = new mongoose.Schema({

    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    condicao: { type: String, required: true },
    imagem: { type: Array, required: false},
    cor: { type: Array, required: true },
    marca: { type: String, required: false },
    fk_id_categoria: { type: String, required: false},
    categoria: { type: String, required: false},
    fk_id_marca: { type: String, required: false},
    quantidade: { type: Number, required: true},
    descricao: { type: String, required: true },
    tamanho: {type: String, required: true},
    composicao: {type: String, required: true},
    fk_id_brecho: {type: String, requried: true}
});

const Produto = mongoose.model(`Produto`, produto_schema);
module.exports = Produto;
