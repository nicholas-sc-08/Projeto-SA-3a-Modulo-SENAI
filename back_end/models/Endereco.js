const mongoose = require(`mongoose`);

const endereco_schema = new mongoose.Schema({

    cep: { type: String, required: true},
    bairro: { type: String, required: true},
    logradouro: { type: String, required: true},
    estado: { type: String, required: true},
    cidade: { type: String, required: true},
    numero: { type: String, required: true},
    complemento: { type: String, required: false},
    fk_id: { type: String, required: false},
    id_brecho: { type: String, required: false}
}, {timestamps: true});

const Endereco = mongoose.model(`Enderecos`, endereco_schema);
module.exports = Endereco;