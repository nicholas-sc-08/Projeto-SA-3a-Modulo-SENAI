const express = require(`express`);
const cors = require(`cors`);
const body_parser = require(`body-parser`);
const porta = 3000;
const app = express();

app.use(body_parser.json());
app.use(cors());

app.listen(() => console.log(`Servidor HTTP rodando na porta ${porta}`));