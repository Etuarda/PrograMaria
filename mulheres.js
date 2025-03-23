const express = require('express');
const router = express.Router();
const cors = require('cors');
const Mulher = require('./mulherModel');
const conectaBancoDeDados = require('./bancoDeDados');

conectaBancoDeDados();

const app = express();
app.use(express.json());
app.use(cors());

const porta = 3333;

// GET: Listar todas as mulheres
router.get('/mulheres', async (req, res) => {
    try {
        const mulheres = await Mulher.find();
        res.json(mulheres);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ message: 'Erro ao buscar mulheres.' });
    }
});

// POST: Criar nova mulher
router.post('/mulheres', async (req, res) => {
    const { nome, imagem, minibio, citacao } = req.body;
    const novaMulher = new Mulher({ nome, imagem, minibio, citacao });
    try {
        const mulherCriada = await novaMulher.save();
        res.status(201).json(mulherCriada);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ message: 'Erro ao criar mulher.' });
    }
});

// PATCH: Atualizar informações de uma mulher
router.patch('/mulheres/:id', async (req, res) => {
    try {
        const mulher = await Mulher.findById(req.params.id);
        if (mulher) {
            Object.assign(mulher, req.body);
            const mulherAtualizada = await mulher.save();
            res.json(mulherAtualizada);
        } else {
            res.status(404).json({ message: 'Mulher não encontrada.' });
        }
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ message: 'Erro ao atualizar mulher.' });
    }
});

// DELETE: Deletar uma mulher
router.delete('/mulheres/:id', async (req, res) => {
    try {
        await Mulher.findByIdAndDelete(req.params.id);
        res.json({ message: 'Mulher deletada com sucesso!' });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ message: 'Erro ao deletar mulher.' });
    }
});

app.use(router);

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
