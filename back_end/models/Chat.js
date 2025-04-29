const mongoose = require(`mongoose`);

const chat_schema = new mongoose.Schema({

    mensagem: { type: String, required: true},
    hora: { type: String, required: true},
    data_da_mensagem: { type: String, required: true},
    id_dono_mensagem: { type: String, required: true},
    id_quem_recebeu_mensagem: { type: String, required: true},
    mensagem_lida_quem_recebeu: { type: Boolean, required: true}
}, {timestamps: true});

const Chat = mongoose.model(`Chat`, chat_schema);
module.exports = Chat;