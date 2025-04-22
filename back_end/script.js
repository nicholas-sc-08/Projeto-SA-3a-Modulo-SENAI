const express = require(`express`);
const cors = require(`cors`);
const body_parser = require(`body-parser`);
const http = require(`http`);
const { Server } = require(`socket.io`);

const app = express();
const conectar_com_mongo = require(`./mongo.js`);
const Cliente = require(`./models/Cliente.js`);
const Endereco = require(`./models/Endereco.js`);

conectar_com_mongo();

const porta = 3000;
const server = http.createServer(app);

const io = new Server(server, {

    cors: {

        origin: `*`,
        methods: [`GET`, `POST`, `PUT`]
    }
});

app.use(body_parser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

server.listen(porta, () => console.log(`Servidor HTTP rodando na porta ${porta}`));

io.on(`connection`, (socket) => {
        
    socket.on(`nova_mensagem`, (mensagem) => {

        socket.broadcast.emit(`receber_mensagem`, mensagem);
    });

    socket.on(`disconnect`, () => {

        console.log(`Usuário desconectado!`, socket.id);
    });
});

app.get('/', (req, res) => {
    
    res.send('Conexão com mongo funcionando!');
});

app.get(`/clientes`, async (req, res) => {

    try {
    
        const clientes = await Cliente.find();
        res.status(200).json(clientes);

    } catch (erro) {
        
        console.error(erro);
    };
});

app.get(`/clientes/:id`, async (req, res) => {

    const { id } = req.params;
   
    try {
    
    const cliente = await Cliente.findById(id);
    res.status(200).json(cliente);

   } catch (erro) {
    
    console.error(erro);
   };
});

app.post(`/clientes`, async (req, res) => {

    const cliente = new Cliente(req.body);

    try {
        
    await cliente.save();
    res.status(201).json(`Cliente cadastrado!`);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.delete(`/clientes/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
        await Cliente.findByIdAndDelete(id);
        res.status(200).json(`Cliente excluído`);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/enderecos`, async (req, res) => {

    try {
        
        const enderecos = await Endereco.find();
        res.status(200).json(enderecos);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.get(`/enderecos/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
    const endereco = await Endereco.findById(id);
    res.status(200).json(endereco);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.put(`/enderecos/:id`, async (req, res) => {

    const { id } = req.params;
    delete req.body._id;

    try {
        
       const endereco_atualizado = await Endereco.findByIdAndUpdate(id, req.body, {new: true});
       res.status(200).json(endereco_atualizado);

    } catch (erro) {
      
        console.error(erro);
    };
});

app.delete(`/enderecos/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        
        await Endereco.findByIdAndDelete(id);
        res.status(200).json(`Endereço excluído`);

    } catch (erro) {
      
        console.error(erro);
    };
});