const mongoose = require(`mongoose`);

const categoria_schema = new mongoose.Schema({

    nome: { type: String, required: true}
});

const nova_categoria = mongoose.model(`Categoria`, categoria_schema);
module.exports = nova_categoria;