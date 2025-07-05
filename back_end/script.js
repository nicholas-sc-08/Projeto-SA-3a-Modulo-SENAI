const express = require(`express`);
const cors = require(`cors`);
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const http = require(`http`);
const app = express();
const { Server } = require(`socket.io`);
const porta = 3000;
const server = http.createServer(app);
const conectar_com_mongo = require(`./mongo/mongo.js`);
const Cliente = require(`./models/Cliente.js`);
const Endereco = require(`./models/Endereco.js`);
const Chat = require(`./models/Chat.js`);
const Estoque = require(`./models/Estoque.js`);
const Categoria = require(`./models/Categoria.js`);
const Brecho = require(`./models/Brecho.js`);
const Produto = require(`./models/Produto.js`);
const Marca = require(`./models/Marca.js`);

conectar_com_mongo();
app.use(cors());

const io = new Server(server, {

    cors: {

        origin: `*`,
        methods: [`GET`, `POST`, `PUT`],
    }
});

app.use(express.json());
app.use(`/uploads`, express.static(`uploads`));

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});


//Stripe
app.post("/criar-checkout", async (req, res) => {
  const { itens } = req.body;

    if (!itens || !Array.isArray(itens)) {
        return res.status(400).json({ error: "Itens inválidos ou ausentes" });
    }
    console.log("Itens recebidos no backend:", itens);

    try {
        const line_items = itens.map((item) => ({
            price_data: {
                currency: "brl",
                product_data: {
                    name: item.nome,
                    images: [item.imagem[0]],
                },
                unit_amount: Math.round(item.preco * 100), // Valor em centavos
            },
            quantity: item.quantidade_selecionada,
        }));
        console.log("line_items para Stripe:", line_items);


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            success_url: "https://projeto-sa-3a-modulo-senai.vercel.app/?status=sucesso",
            cancel_url: "https://projeto-sa-3a-modulo-senai.vercel.app/?status=cancelado",
        });
        console.log("Sessão Stripe criada:", session);


        res.json({ url: session.url });

    } catch (error) {
        console.error("Erro ao criar checkout Stripe:", error);
        res.status(500).json({ error: error.message || "Erro ao criar checkout" });
    }

});


server.listen(porta, `0.0.0.0`, () => console.log(`Servidor HTTP rodando na porta ${porta}`));


// o io.on vai escuta novas conexões de clientes ou seja quando um usuário conectar, é criado um socket exclusivo para ele
io.on(`connection`, (socket) => {

    // aqui o cliente no caso o usuario logado ali, ele vai ta enviando uma mensagem com o evento "nova_mensagem"
    // o servidor recebendo essa mensagem enviada pelo usuario logado e retransmite para todos os outros usuarios conectados menos pra quem envio essa mensagem
    socket.on(`nova_mensagem`, (mensagem) => {

        socket.broadcast.emit(`receber_mensagem`, mensagem);
    });

    // esse aqui é a mesma coisa que o nova_mensagem mais tipo esse evento já seria para editar ou excluir

    socket.on(`mensagem_a_atualizar`, mensagem => {

        socket.broadcast.emit(`receber_mensagem`, mensagem);
    })

    //quando o cliente sai da pagina, no caso o chat. ele disconecta ele do servidor

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

        const cliente_cadastrado = await cliente.save();
        res.status(201).json(cliente_cadastrado);

    } catch (erro) {

        console.error(erro);
    };
});

app.put(`/clientes/:_id`, async (req, res) => {

    const { _id } = req.params;
    delete req.body._id;

    try {

        const cliente_atualizado = await Cliente.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json(cliente_atualizado);

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

app.post(`/enderecos`, async (req, res) => {

    const endereco = new Endereco(req.body);
    try {

        const cadastrar_endereco = endereco.save();
        res.status(201).json(cadastrar_endereco);

    } catch (erro) {

        console.error(erro);
    };
});

app.put(`/enderecos/:id`, async (req, res) => {

    const { id } = req.params;
    delete req.body._id;

    try {

        const endereco_atualizado = await Endereco.findByIdAndUpdate(id, req.body, { new: true });
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

app.get(`/chats`, async (req, res) => {

    try {

        const mensagens = await Chat.find();
        res.status(200).json(mensagens);

    } catch (erro) {

        console.error(erro);
    };
});

app.get(`/chats/:id`, async (req, res) => {

    const { id } = req.params;


    try {

        const conversa = await Chat.findById(id);
        res.status(200).json(conversa);

    } catch (erro) {

        console.error(erro);
    };
});

app.post(`/chats`, async (req, res) => {

    const mensagem = new Chat(req.body);

    try {

        const mensagem_postada = await mensagem.save();
        res.status(201).json(mensagem_postada);

    } catch (erro) {

        console.error(erro);
    };
});

app.put(`/chats/:id`, async (req, res) => {

    const { id } = req.params;
    delete req.body._id;

    try {

        const mensagem = await Chat.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(mensagem);

    } catch (erro) {

        console.error(erro);
    };
});

app.delete(`/chats/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        await Chat.findByIdAndDelete(id);
        res.status(200).json(`Mensagem excluída com sucesso!`);

    } catch (erro) {

        console.error(erro);
    };
});

app.get(`/estoques`, async (req, res) => {
    try {
        const estoque = await Estoque.find();
        res.status(200).json(estoque)
    } catch (error) {
        console.error(error)
    }
})

app.get(`/estoques/:id`, async (req, res) => {

    const { id } = req.params;

    try {
        const estoque = await Estoque.findById(id);
        res.status(200).json(estoque);
    } catch (error) {
        console.error(error);
    }
})

app.get(`/categorias`, async (req, res) => {

    try {

        const categorias = await Categoria.find();
        res.status(200).json(categorias);

    } catch (erro) {

        console.error(erro);
    };
});

app.get(`/categorias/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        const categoria = await Categoria.findById(id);
        res.status(200).json(categoria);

    } catch (erro) {

        console.error(erro);
    };
});

app.post(`/categorias`, async (req, res) => {

    const categoria = new Categoria(req.body);

    try {

        const nova_categoria = await categoria.save();
        res.status(201).json(nova_categoria);

    } catch (erro) {

        console.error(erro);
    };
});

app.put(`/categorias/:id`, async (req, res) => {

    const { id } = req.params;
    delete req.body._id;

    try {

        const categoria = await Categoria.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(categoria);

    } catch (erro) {

        console.error(erro);
    };
});

app.delete(`/categorias/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        const categoria = await Categoria.findByIdAndDelete(id);
        res.status(200).json(categoria);

    } catch (erro) {

        console.error(erro);
    };
});

// brechos

app.get(`/brechos`, async (req, res) => {

    try {

        const brechos = await Brecho.find();
        res.status(200).json(brechos);

    } catch (erro) {

        console.error(erro);
    };
});

app.get(`/brechos/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        const brecho = await Brecho.findById(id);
        res.status(200).json(brecho);

    } catch (erro) {

        console.error(erro);
    };
});

app.post(`/brechos`, async (req, res) => {

    const brecho = new Brecho(req.body);

    try {

        const novo_brecho = await brecho.save();
        res.status(201).json(novo_brecho);

    } catch (erro) {

        console.error(erro);
    };
});

app.put(`/brechos/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        const brecho = await Brecho.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(brecho);

    } catch (erro) {

        console.error(erro);
    };
});

app.delete(`/brechos/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        const brecho = await Brecho.findByIdAndDelete(id);
        res.status(200).json(brecho);

    } catch (erro) {

        console.error(erro);
    };
});

app.get(`/produtos`, async (req, res) => {

    try {
        const produtos = await Produto.find()
        res.status(200).json(produtos);

    } catch (error) {

        console.error(error)
    }
})

app.get(`/produtos/:id`, async (req, res) => {

    const { id } = req.params

    try {
        const produto = await Produto.findById(id)
        res.status(200).json(produto);

    } catch (error) {
        console.error(error)
    }
})

app.post('/produtos', async (req, res) => {
    try {
        // req.body já deve conter o array de URLs da imagem no campo "imagem"
        const produto = new Produto({ ...req.body });
        const novo_produto = await produto.save();
        res.status(201).json(novo_produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao salvar produto' });
    }
});


app.put(`/produtos/:id`, async (req, res) => {

    const { id } = req.params;
    delete req.body._id;

    try {

        const produto = await Produto.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(produto);

    } catch (error) {
        console.error(error)
    }
})

app.delete(`/produtos/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        const produto = await Produto.findByIdAndDelete(id)
        res.status(200).json(produto);

    } catch (error) {
        console.error(error)
    }
})

// Marcas

app.get(`/marcas`, async (req, res) => {

    try {

        const marcas = await Marca.find();
        res.status(200).json(marcas);

    } catch (erro) {

        console.error(erro);
    };
});

app.get(`/marcas/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        const marca = await Marca.findById(id);
        res.status(200).json(marca);

    } catch (erro) {

        console.error(erro);
    };
});

app.post(`/marcas`, async (req, res) => {

    const marca = new Marca(req.body);

    try {
        const nova_marca = await marca.save(); // Agora sim
        res.status(201).json(nova_marca);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar marca' });
    };
});

app.put(`/marcas/:id`, async (req, res) => {

    const { id } = req.params;
    delete req.body._id;

    try {

        const marca = await Marca.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(marca);

    } catch (erro) {

        console.error(erro);
    };
});

app.delete(`/marcas/:id`, async (req, res) => {

    const { id } = req.params;

    try {

        const marca = await Marca.findByIdAndDelete(id);
        res.status(200).json(marca);

    } catch (erro) {

        console.error(erro);
    };
});

// Marcas

// Buscas recentes - clientes

app.get(`/clientes/:id/buscasRecentes`, async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }

        res.status(200).json(cliente.buscasRecentes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar histórico." });
    }
});

app.post(`/clientes/:id/buscasRecentes`, async (req, res) => {
    const { id } = req.params;
    const { termo } = req.body;

    if (!termo || termo.trim() === "") {
        return res.status(400).json({ message: "Termo de busca inválido." });
    }

    try {
        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }

        // Remover duplicados
        cliente.buscasRecentes = cliente.buscasRecentes.filter(
            item => item.termo !== termo
        );

        // Inserir nova busca no início do array
        cliente.buscasRecentes.unshift({
            termo,
            data: new Date()
        });

        // Limitar a 10 buscas recentes
        if (cliente.buscasRecentes.length > 10) {
            cliente.buscasRecentes = cliente.buscasRecentes.slice(0, 10);
        }

        await cliente.save();

        res.status(200).json(cliente.buscasRecentes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao salvar busca recente." });
    }
});

app.delete(`/clientes/:id/buscasRecentes`, async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }

        cliente.buscasRecentes = [];
        await cliente.save();

        res.status(200).json({ message: "Histórico de buscas limpo com sucesso." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao limpar histórico de buscas." });
    }
});

// Buscas recentes - brechos

app.get(`/brechos/:id/buscasRecentes`, async (req, res) => {
    const { id } = req.params;

    try {
        const brecho = await Brecho.findById(id);

        if (!brecho) {
            return res.status(404).json({ message: "Brechó não encontrado." });
        }

        res.status(200).json(brecho.buscasRecentes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar histórico." });
    }
});

app.post(`/brechos/:id/buscasRecentes`, async (req, res) => {
    const { id } = req.params;
    const { termo } = req.body;

    if (!termo || termo.trim() === "") {
        return res.status(400).json({ message: "Termo de busca inválido." });
    }

    try {
        const brecho = await Brecho.findById(id);

        if (!brecho) {
            return res.status(404).json({ message: "Brechó não encontrado." });
        }

        // Remover duplicados
        brecho.buscasRecentes = brecho.buscasRecentes.filter(
            item => item.termo !== termo
        );

        // Inserir nova busca no início do array
        brecho.buscasRecentes.unshift({
            termo,
            data: new Date()
        });

        // Limitar a 10 buscas recentes
        if (brecho.buscasRecentes.length > 10) {
            brecho.buscasRecentes = brecho.buscasRecentes.slice(0, 10);
        }

        await brecho.save();

        res.status(200).json(brecho.buscasRecentes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao salvar busca recente." });
    }
});

app.delete(`/brechos/:id/buscasRecentes`, async (req, res) => {
    const { id } = req.params;

    try {
        const brecho = await Brecho.findById(id);

        if (!brecho) {
            return res.status(404).json({ message: "Brechó não encontrado." });
        }

        brecho.buscasRecentes = [];
        await brecho.save();

        res.status(200).json({ message: "Histórico de buscas limpo com sucesso." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao limpar histórico de buscas." });
    }
});
