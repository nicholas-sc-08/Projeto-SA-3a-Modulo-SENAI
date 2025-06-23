const mongoose = require("mongoose");
const MarcaSchema = new mongoose.Schema({

    logoMarca: { type: String, required: true },
    nome: { type: String, required: true },
}, { timestamps: true })

const Marca = mongoose.model("Marca", MarcaSchema);
module.exports = Marca;