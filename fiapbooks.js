const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const read = require("body-parser/lib/read");


const dbName = "dbooks";
const port = 3000;
const app = express();

const UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required : true},
    password: {type: String}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;


const produtoSchema = new mongoose.Schema({
    codigo: {type: Number, required: true},
    descricao: {type: String},
    fornecedor: {type: String},
    dataImpressao: {type: Date},
    quantidadeEstoque: {type: Number}
})

const Produto = mongoose.model("Produto", produtoSchema);
modules.exports = Produto;

app.post("/cadastroproduto"), async (req, res) => {
    const codigo = req.body.codigo;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const dataImpressao = req.body.dataImpressao;
    const quantidadeEstoque = req.body.quantidadeEstoque

    if(codigo == null || dataImpressao == null || quantidadeEstoque == null){
        return res.status(400).json({error : "Preencher todos os campos!!"});
    }
    const codigoExiste = await Produto.findOne({codigo : codigo});
    if(codigoExiste){
        return res.status(400).json({error : "O codigo informado já existe"});
    }
    const produto = new produtoSchema({
        codigo: codigo,
        descricao: descricao,
        fornecedor: fornecedor,
        dataImpressao: dataImpressao,
        quantidadeEstoque: quantidadeEstoque
    })
    try {
        const newproduto = await produto.save();
        res.json({error : null, msg: "Cadastro do produto ok", ProdutoId : newproduto._id});
    } catch(error) {};
}
app.get("/cadastroproduto", async (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
    
app.post("/cadastrousuario", async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;
    //validação de campos
    if(nome == null || email == null || password == null){
        return res.status(400).json({error : "Preencher todos os campos!!!"});
    }
    //teste de duplicidade
    const emailExiste = await Usuario.findOne({email : email});
    if(emailExiste){
        return res.status(400).json({error : "O email informado já existe"});
    }
})
    
const usuario = new UserSchema({
    nome: nome,
    email: email,
    password: password
});
try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
} catch (error) {};
//rota de get de formulario
app.get("/cadastrousuario", async (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/", (req, res)=> {
    //primeira rota de teste
    res.json({message : "Rota de teste será trocada!!!"});
});
//escutando a porta
app.listen(port, ()=>{
    console.log(`O backend está rodando na porta ${port}`)
});