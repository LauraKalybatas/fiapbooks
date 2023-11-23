const mongoose = require('mongoose');
const ProdutoSchema = new mongoose.Schema({
    codigo: {type: Number, required: true},
    descricao: {type: String},
    fornecedor: {type: String},
    dataImpressao: {type: Date},
    quantidadeEstoque: {type: Number}
});
const Produto = mongoose.model("Produto", ProdutoSchema);
module.exports = Produto;
