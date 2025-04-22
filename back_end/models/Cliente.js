const mongoose = require(`mongoose`);

const cliente_schema = new mongoose.Schema({

    nome: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    senha: { type: String, required: true},
    telefone: { type: String, required: true, unique: true},
    cpf: { type: String, required: true, unique: true},
    data_de_nascimento: { type: Date, required: true},
    imagem_de_perfil: { type: String, required: true}
}, { timestamps: true});

const Cliente = mongoose.model(`Cliente`, cliente_schema);
module.exports = Cliente;