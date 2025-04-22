const express = require(`express`);
const cors = require(`cors`);
const body_parser = require(`body-parser`);
const http = require(`http`);
const { Server } = require(`socket.io`);

const app = express();
const conectar_com_mongo = require(`./mongo.js`);
const Cliente = require(`./models/Cliente.js`);

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
    
    res.send('Servidor de Usuários');
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