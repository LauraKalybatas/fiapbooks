const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const Produto = require("../models/produtos");

//cadastro de produto
router.post("/registerProduto", async(req, res)=>{
    const codigo = req.body.codigo;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const dataImpressao = req.body.dataImpressao;
    const quantidadeEstoque = req.body.quantidadeEstoque 

    //checando se todos os dados foram enviados
    if (codigo==null || descricao ==null || fornecedor == null || dataImpressao == null || quantidadeEstoque == null){
        return res.status(400).json({error: "Por favor, preencha todos os campos"});
    }

    //conferindo se o produto já existe
    const produtoExists = await User.findOne({codigo: codigo});

    if(produtoExists){
        return res.status(400).json({error: "O produto informado já está cadastrado."})
    }

    //criando o produto após as validações no sistema
    const produto = new Produto({
        codigo: codigo,
        descricao: descricao,
        fornecedor: fornecedor,
        dataImpressao: dataImpressao,
        quantidadeEstoque: quantidadeEstoque
    });

    //montando um try catch para pega outros erros e afins
    try{
        const newProduto = await produto.save();
        
        //criando o token do usuario
        const token = jwt.sign(
            //payload
            {
                codigo: newProduto.codigo,
                id: newProduto._id
            },
            "segredo" //isso torna o nosso token único
        );

        //retornar o token para o projeto e manda mensagem
        res.json({error: null, msg: "Você fez o cadastro com sucesso!!!", token: token, produtoId:
        newProduto._id});
    } catch(error){
        res.status(400).json({error});
    }
});

module.exports= router;