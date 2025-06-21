const mongoose = require("mongoose");
const EstoqueSchema = new mongoose.Schema({

    nome: { type: String, required: true },
}, { timestamps: true })

const Estoque = mongoose.model("Estoque", EstoqueSchema);
module.exports = Estoque