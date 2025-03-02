const express = require(`express`);
const cors = require(`cors`);
const body_parser = require(`body-parser`);

const app = express();
const pool = require(`./db`);

const porta = 3000;

app.use(body_parser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });
  

app.get('/', (req, res) => {
    res.send('Servidor de Usuários');
});

app.get(`/usuarios`, async (req, res) => {

    try {
        
        const resultado = await pool.query(`SELECT * FROM usuarios`);
        res.json(resultado.rows);

    } catch (erro) {
      
        console.log(erro);
    };
});

app.post(`/usuarios`, async (req, res) => {

    const { nome, email, senha, telefone, cpf, data_de_nascimento } = req.body;

    try{

        const resultado = await pool.query(`INSERT INTO usuarios (nome, email, senha, telefone, cpf, data_de_nascimento) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [nome, email, senha, telefone, cpf, data_de_nascimento]);
        res.status(200).json(resultado.rows[0]);

    } catch(erro){

        console.error(erro);
    };
});

app.listen(porta, () => console.log(`Servidor HTTP rodando na porta ${porta}`));