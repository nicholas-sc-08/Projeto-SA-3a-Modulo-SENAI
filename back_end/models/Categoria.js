const mongoose = require(`mongoose`);

const categoria_schema = new mongoose.Schema({

    nome: { type: String, required: true},
    sub_categoria: { type: Boolean, required: true}
}, {timestamps: true});

const nova_categoria = mongoose.model(`Categoria`, categoria_schema);
module.exports = nova_categoria;