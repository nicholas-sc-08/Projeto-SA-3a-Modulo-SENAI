const mongoose = require(`mongoose`);

const brecho_schema = new mongoose.Schema({

    nome_vendedor: { type: String, required: true },
    data_de_nascimento_vendedor: { type: Date, required: true },
    senha: { type: String, required: true },
    nome_brecho: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    cnpj: { type: String, required: false },
    logo: { type: String, required: true },
    conversas: { type: Array, required: true },
    horario_funcionamento: { type: String, required: false },
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

const novo_brecho = mongoose.model(`Brecho`, brecho_schema);
module.exports = novo_brecho;