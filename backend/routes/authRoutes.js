const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const Produto = require("../models/produtos");

// registrando um usuário
router.post("/register", async(req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    //checando se todos os dados foram enviados
    if (name==null || email ==null || password == null){
        return res.status(400).json({error: "Por favor, preencha todos os campos"});
    }

    //conferindo se o usuário já existe
    const emailExists = await User.findOne({email: email});

    if(emailExists){
        return res.status(400).json({error: "O e-mail informado já existe."})
    }

    //criando a senha com bcrypt
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //criando o usuário após as validações no sistema
    const user = new User({
        name : name,
        email : email,
        password: passwordHash
    });

    //montando um try catch para pega outros erros e afins
    try{
        const newUser = await user.save();
        
        //criando o token do usuario
        const token = jwt.sign(
            //payload
            {
                name : newUser.name,
                id : newUser._id
            },
            "segredo" //isso torna o nosso token único
        );

        //retornar o token para o projeto e manda mensagem
        res.json({error: null, msg: "Você fez o cadastro com sucesso!!!", token: token, userId:
        newUser._id});
    } catch(error){
        res.status(400).json({error});
    }
});

//cadastro de produto
router.post("/register", async(req, res)=>{
    const codigo = req.body.codigo;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const dataImpressao = req.body.dataImpressao;
    const quantidadeEstoque = req.body.quantidadeEstoque 

    //checando se todos os dados foram enviados
    if (codigo==null || descricao ==null || fornecedor == null || dataImpressao == null || quantidadeEstoque == null){
        return res.status(400).json({error: "Por favor, preencha todos os campos"});
    }

    //conferindo se o usuário já existe
    const produtoExists = await User.findOne({codigo: codigo});

    if(produtoExists){
        return res.status(400).json({error: "O produto informado já está cadastrado."})
    }

    //criando o usuário após as validações no sistema
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

module.exports = router;