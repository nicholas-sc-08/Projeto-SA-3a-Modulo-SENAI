const express = require(`express`);
const cors = require(`cors`);
const body_parser = require(`body-parser`);
<<<<<<< HEAD
const porta = 3000;

const app = express();
app.use(cors());
app.use(body_parser.json());
=======

const porta = 3000;
const app = express();
app.use(body_parser.json());
app.use(cors());
>>>>>>> c86fe8adfac2e885c89caa8fccf4fce9b3493e61

app.listen(porta, () => console.log(`Servidor HTTP rodando na porta ${porta}`));