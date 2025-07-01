const mongoose = require(`mongoose`);

const cliente_schema = new mongoose.Schema({

    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: false, unique: false },
    cpf: { type: String, required: false, unique: false },
    data_de_nascimento: { type: Date, required: true },
    imagem_de_perfil: { type: String, required: true },
    conversas: { type: Array, required: false },
    sacola: { type: Array, required: false },
    produtos_comprados: { type: Array, required: false },
    buscasRecentes: {
        type: [
            {
                termo: String,
                data: Date
            }
        ],
        default: []
    }
}, { timestamps: true });

const Cliente = mongoose.model(`Clientes`, cliente_schema);
module.exports = Cliente;