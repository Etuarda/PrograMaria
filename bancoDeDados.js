const mongoose = require('mongoose');
require('dotenv').config();

async function conectaBancoDeDados() {
    try {
        console.log('Conectando ao banco de dados...');
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Banco de dados conectado com sucesso!');
    } catch (erro) {
        console.log('Erro ao conectar ao banco de dados:', erro);
    }
}

module.exports = conectaBancoDeDados;
