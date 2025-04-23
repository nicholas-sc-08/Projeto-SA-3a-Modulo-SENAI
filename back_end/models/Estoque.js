const mongoose = require("mongoose");
const EstoqueSchema = new mongoose.Schema({

    quantidade: { type:Number, required: true }, produto_id: {type:String, required:true}
}, {timestamps: true})

const Estoque = mongoose.model("Estoque", EstoqueSchema);
module.exports = Estoque