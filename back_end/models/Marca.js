const mongoose = require("mongoose");
const MarcaSchema = new mongoose.Schema({

    nome: { type: String, required: true },
}, { timestamps: true })

const Marca = mongoose.model("Marca", MarcaSchema);
module.exports = Marca;