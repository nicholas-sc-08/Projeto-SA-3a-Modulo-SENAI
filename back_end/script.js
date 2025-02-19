const express = require(`express`);
const cors = require(`cors`);
const body_parser = require(`body-parser`);
const porta = 3000;

const app = express();
app.use(cors());
app.use(body_parser.json());

app.listen(porta, () => console.log(`Servidor HTTP rodando na porta ${porta}`));