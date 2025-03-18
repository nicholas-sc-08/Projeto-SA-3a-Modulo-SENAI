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

app.get(`/clientes`, async (req, res) => {

    try {
        
        const resultado = await pool.query(`SELECT * FROM clientes`);
        res.json(resultado.rows);

    } catch (erro) {
      
        console.log(erro);
    };
});

app.get(`/clientes/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
        const resultado = await pool.query(`SELECT * FROM clientes WHERE id = $1`, [id]);
        res.status(200).json(resultado.rows);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.post(`/clientes`, async (req, res) => {

    const { nome, email, senha, telefone, cpf, data_de_nascimento, imagem_de_perfil } = req.body;

    try{

        const resultado = await pool.query(`INSERT INTO clientes (nome, email, senha, telefone, cpf, data_de_nascimento, imagem_de_perfil) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [nome, email, senha, telefone, cpf, data_de_nascimento, imagem_de_perfil]);
        
        res.status(200).json(resultado.rows[0]);

    } catch(erro){

        console.error(erro);
    };
});

app.put(`/clientes/:id`, async (req, res) => {

    const { id } = req.params;
    const { nome, email, senha, telefone, cpf, data_de_nascimento, imagem_de_perfil } = req.body;

    try {
        
        const resultado = await pool.query(`UPDATE clientes SET nome = $1, email = $2, senha = $3, telefone = $4, cpf = $5, data_de_nascimento = $6, imagem_de_perfil = $7`, [nome, email, senha, telefone, cpf, data_de_nascimento, imagem_de_perfil]);

        res.status(200).json(resultado.rows[0]);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.delete(`/clientes/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
        const excluir = await pool.query(`DELETE FROM clientes WHERE id = $1`, [id]);
        
        res.status(200).json(`Usuário excluído: ${excluir.rows}`);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/enderecos`, async (req, res) => {

    try {
        
    const resultado = await pool.query(`SELECT * FROM enderecos`);
    res.json(resultado.rows);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/enderecos/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
        const resultado = await pool.query(`SELECT * FROM enderecos WEHRE id = $1`, [id]);
        res.status(200).json(resultado.rows);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.post(`/enderecos`, async (req, res) => {

    const { cep, bairro, logradouro, estado, cidade, numero, complemento, fk_id } = req.body;

    try {

        const resultado = await pool.query(`INSERT INTO enderecos (cep, bairro, logradouro, estado, cidade, numero, complemento, fk_id) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [cep, bairro, logradouro, estado, cidade, numero, complemento, fk_id]);
        res.status(200).json(resultado.rows[0]);
        
    } catch (erro) {
      
        console.error(erro);
    };
});

app.delete(`/enderecos/:fk_id`, async (req, res) => {

    const { fk_id } = req.params;

    try {
        
        const endereco_a_excluir = await pool.query(`DELETE FROM enderecos WHERE fk_id = $1`, [fk_id]);
        res.status(200).json(`Endereço excluído com sucesso: ${endereco_a_excluir.rows}`);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.listen(porta, () => console.log(`Servidor HTTP rodando na porta ${porta}`));

app.get("/produto", async (req, res)=> {
    try {
        const resultado = await pool.query('SELECT * FROM produto')
        res.status(200).json(resultado.rows)
    } catch (error) {
        console.error(error)
    }
})
app.delete("/produto/:id", async(req, res)=> {
    const {id} = req.params
    try {
        const excluir = await pool.query("DELETE FROM produto WHERE id = $1", [id])
        res.status(200).json(excluir.rows)
    } catch (error) {
        console.error(error)

    }
})